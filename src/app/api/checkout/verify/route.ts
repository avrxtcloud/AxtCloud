import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@/lib/supabase-server';
import { EC2Client, RunInstancesCommand } from "@aws-sdk/client-ec2";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, config } = body;

        console.log('Starting verification...', { razorpay_payment_id });

        const ec2Client = new EC2Client({
            region: process.env.AXT_AWS_REGION || 'ap-south-1',
            credentials: {
                accessKeyId: process.env.AXT_AWS_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.AXT_AWS_SECRET_ACCESS_KEY || '',
            }
        });

        const supabase = await createClient();

        // 1. Verify Signature (Skip if TEST_MODE)
        if (razorpay_payment_id !== 'TEST_MODE') {
            console.log('Verifying signature...');
            const sign = razorpay_order_id + "|" + razorpay_payment_id;
            const expectedSign = crypto
                .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
                .update(sign.toString())
                .digest("hex");

            if (razorpay_signature !== expectedSign) {
                console.error('Invalid signature');
                return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
            }
        }

        // 2. Get Authenticated User
        console.log('Fetching user...');
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            console.error('Auth Error:', authError);
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 3. Provision AWS EC2 Instance
        console.log('Provisioning EC2...', { ami: config.ami, type: config.type || "t3.medium" });
        const runCommand = new RunInstancesCommand({
            ImageId: config.ami,
            InstanceType: (config.type || "t3.medium") as any,
            MinCount: 1,
            MaxCount: 1,
            TagSpecifications: [
                {
                    ResourceType: "instance",
                    Tags: [{ Key: "Name", Value: config.name || "AXT-User-Server" }],
                },
            ],
        });

        let instance;
        try {
            const ec2Response = await ec2Client.send(runCommand);
            instance = ec2Response.Instances?.[0];
            console.log('EC2 Instance Created:', instance?.InstanceId);
        } catch (ec2Err: any) {
            console.error('AWS EC2 Error:', ec2Err);
            return NextResponse.json({ error: `AWS Error: ${ec2Err.message}` }, { status: 500 });
        }

        if (!instance) {
            throw new Error("Failed to provision instance - no instance returned");
        }

        // 4. Save to Supabase
        console.log('Saving to Database...');
        const { error: dbError } = await supabase
            .from('user_instances')
            .insert({
                user_id: user.id,
                instance_id: instance.InstanceId,
                name: config.name,
                os: config.os,
                plan: config.plan,
                specs: { cpu: config.cpu, ram: config.ram, disk: config.disk },
                status: 'provisioning',
                payment_id: razorpay_payment_id
            });

        if (dbError) {
            console.error('Database INSERT Error:', dbError);
        }

        // 5. Send Notification Email
        if (user.email) {
            try {
                console.log('Sending email to:', user.email);
                const { sendProvisioningEmail } = await import('@/lib/email');
                await sendProvisioningEmail(user.email, config.name, {
                    os: config.os,
                    plan: config.plan,
                    cpu: config.cpu,
                    ram: config.ram,
                    disk: config.disk
                });
            } catch (emailErr) {
                console.error('Email Notification Error:', emailErr);
            }
        }

        // 6. Success!
        return NextResponse.json({ message: "Verification successful", instanceId: instance.InstanceId });
    } catch (error: any) {
        console.error('GLOBAL VERIFY ERROR:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
