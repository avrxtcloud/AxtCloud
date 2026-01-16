import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { EC2Client, StartInstancesCommand, StopInstancesCommand, TerminateInstancesCommand } from "@aws-sdk/client-ec2";

const ec2Client = new EC2Client({
    region: process.env.AXT_AWS_REGION,
    credentials: {
        accessKeyId: process.env.AXT_AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AXT_AWS_SECRET_ACCESS_KEY!,
    }
});

export async function POST(req: Request) {
    try {
        const { instanceId, action } = await req.json();
        const supabase = createClient();

        // Check authentication
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        // Verify instance belongs to user
        const { data: instance, error: dbError } = await supabase
            .from('user_instances')
            .select('*')
            .eq('instance_id', instanceId)
            .eq('user_id', user.id)
            .single();

        if (dbError || !instance) {
            return NextResponse.json({ error: "Instance not found or unauthorized" }, { status: 404 });
        }

        let command;
        switch (action) {
            case 'start':
                command = new StartInstancesCommand({ InstanceIds: [instanceId] });
                break;
            case 'stop':
                command = new StopInstancesCommand({ InstanceIds: [instanceId] });
                break;
            case 'terminate':
                command = new TerminateInstancesCommand({ InstanceIds: [instanceId] });
                break;
            default:
                return NextResponse.json({ error: "Invalid action" }, { status: 400 });
        }

        await ec2Client.send(command);

        // Update local status (optional, usually takes time to reflect from AWS)
        if (action === 'terminate') {
            await supabase.from('user_instances').delete().eq('instance_id', instanceId);
        } else {
            await supabase.from('user_instances').update({ status: action === 'start' ? 'running' : 'stopped' }).eq('instance_id', instanceId);
        }

        return NextResponse.json({ success: true, action });
    } catch (error) {
        console.error('Action Error:', error);
        return NextResponse.json({ error: 'Failed to perform action' }, { status: 500 });
    }
}
