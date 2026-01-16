import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@/lib/supabase-server';
import { EC2Client, RunInstancesCommand } from "@aws-sdk/client-ec2";

function generatePassword(length = 12) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    // Ensure it meets Windows complexity (at least one upper, one lower, one digit, one special)
    return retVal + "Aa1!";
}

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
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 3. Generate Credentials
        const password = generatePassword();
        let username = "ubuntu";
        let userData = "";

        if (config.os.toLowerCase().includes('windows')) {
            username = "Administrator";
            userData = Buffer.from(`<powershell>
$Password = "${password}"
$User = [adsi]"WinNT://localhost/Administrator,user"
$User.SetPassword($Password)
</powershell>`).toString('base64');
        } else if (config.os.toLowerCase().includes('debian')) {
            username = "admin";
            userData = Buffer.from(`#!/bin/bash
echo "admin:${password}" | chpasswd
sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config
sed -i 's/PasswordAuthentication no/PasswordAuthentication yes/' /etc/ssh/sshd_config
systemctl restart ssh
`).toString('base64');
        } else {
            username = "ubuntu";
            userData = Buffer.from(`#!/bin/bash
echo "ubuntu:${password}" | chpasswd
sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config
sed -i 's/PasswordAuthentication no/PasswordAuthentication yes/' /etc/ssh/sshd_config
systemctl restart ssh
`).toString('base64');
        }

        // 4. Provision AWS EC2 Instance
        const runCommand = new RunInstancesCommand({
            ImageId: config.ami,
            InstanceType: (config.type || "t3.micro") as any,
            MinCount: 1,
            MaxCount: 1,
            UserData: userData,
            TagSpecifications: [
                {
                    ResourceType: "instance",
                    Tags: [{ Key: "Name", Value: config.name || "AXT-Server" }],
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

        // 5. Save to Supabase
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
                payment_id: razorpay_payment_id,
                username: username,
                password: password
            });

        if (dbError) console.error('DB Error:', dbError);

        // 6. Send Notification Email
        if (user.email) {
            try {
                const { sendProvisioningEmail } = await import('@/lib/email');
                await sendProvisioningEmail(user.email, config.name, {
                    os: config.os,
                    plan: config.plan,
                    cpu: config.cpu,
                    ram: config.ram,
                    disk: config.disk,
                    username,
                    password,
                    ip: 'Fetching (Check Panel shortly)'
                });
            } catch (emailErr) {
                console.error('Email Error:', emailErr);
            }
        }

        return NextResponse.json({ message: "Provisioning started successfully", instanceId: instance.InstanceId });
    } catch (error: any) {
        console.error('GLOBAL VERIFY ERROR:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
