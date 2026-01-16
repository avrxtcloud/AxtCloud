import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@/lib/supabase-server';
import { EC2Client, RunInstancesCommand } from "@aws-sdk/client-ec2";

export async function POST(req: Request) {
    try {
        const ec2Client = new EC2Client({
            region: process.env.AXT_AWS_REGION,
            credentials: {
                accessKeyId: process.env.AXT_AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AXT_AWS_SECRET_ACCESS_KEY!,
            }
        });

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, config } = await req.json();
        const supabase = await createClient();

        // 1. Verify Signature (Skip if TEST_MODE)
        if (razorpay_payment_id !== 'TEST_MODE') {
            const sign = razorpay_order_id + "|" + razorpay_payment_id;
            const expectedSign = crypto
                .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
                .update(sign.toString())
                .digest("hex");

            if (razorpay_signature !== expectedSign) {
                return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
            }
        }

        // 2. Get Authenticated User
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        // 3. Provision AWS EC2 Instance
        const runCommand = new RunInstancesCommand({
            ImageId: config.ami, // Use AMI from config
            InstanceType: "t3.medium", // Map plan to instance type
            MinCount: 1,
            MaxCount: 1,
            TagSpecifications: [
                {
                    ResourceType: "instance",
                    Tags: [{ Key: "Name", Value: config.name || "AXT-User-Server" }],
                },
            ],
        });

        const ec2Response = await ec2Client.send(runCommand);
        const instance = ec2Response.Instances?.[0];

        if (!instance) {
            throw new Error("Failed to provision instance");
        }

        // 4. Save to Supabase
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
            console.error('Database Error:', dbError);
            // Even if DB fails, instance is created. Should ideally have a rollback or retry mechanism.
        }

        // 5. Send Notification Email
        if (user.email) {
            const { sendProvisioningEmail } = await import('@/lib/email');
            await sendProvisioningEmail(user.email, config.name, {
                os: config.os,
                plan: config.plan,
                cpu: config.cpu,
                ram: config.ram,
                disk: config.disk
            });
        }

        // 6. Success!
        return NextResponse.json({ message: "Verification successful", instanceId: instance.InstanceId });
    } catch (error) {
        console.error('Verification Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
