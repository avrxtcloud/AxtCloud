import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { EC2Client, DescribeInstancesCommand } from "@aws-sdk/client-ec2";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const { instanceId } = await req.json();
        const supabase = await createClient();

        // 1. Get User
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        // 2. AWS Client
        const ec2Client = new EC2Client({
            region: process.env.AXT_AWS_REGION || 'ap-south-1',
            credentials: {
                accessKeyId: process.env.AXT_AWS_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.AXT_AWS_SECRET_ACCESS_KEY || '',
            }
        });

        // 3. Fetch from AWS
        const command = new DescribeInstancesCommand({ InstanceIds: [instanceId] });
        const response = await ec2Client.send(command);
        const awsInstance = response.Reservations?.[0]?.Instances?.[0];

        if (!awsInstance) {
            return NextResponse.json({ error: "Instance not found on provider" }, { status: 404 });
        }

        const currentStatus = awsInstance.State?.Name || 'unknown';
        const publicIp = awsInstance.PublicIpAddress || null;

        // 4. Update Supabase
        const { error: updateError } = await supabase
            .from('user_instances')
            .update({
                status: currentStatus,
                ip_address: publicIp
            })
            .eq('instance_id', instanceId)
            .eq('user_id', user.id);

        if (updateError) {
            console.error('Sync DB Error:', updateError);
        }

        return NextResponse.json({
            status: currentStatus,
            ip: publicIp
        });

    } catch (error: any) {
        console.error('Sync API Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
