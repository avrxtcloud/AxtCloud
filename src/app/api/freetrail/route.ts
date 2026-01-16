import { NextRequest, NextResponse } from 'next/server';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { Resend } from 'resend';

// --- Configuration ---
const AWS_REGION = process.env.AXT_AWS_REGION;
const AWS_ACCESS_KEY_ID = process.env.AXT_AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AXT_AWS_SECRET_ACCESS_KEY;
const DYNAMODB_TABLE_NAME = process.env.DYNAMODB_TABLE_NAME;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const SENDER_EMAIL = 'updates@mailer.goaxt.cloud';

// Initialize AWS DynamoDB Document Client
let docClient: any = null;
if (AWS_REGION && AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY) {
    const dbClient = new DynamoDBClient({
        region: AWS_REGION,
        credentials: {
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY,
        }
    });
    docClient = DynamoDBDocumentClient.from(dbClient);
}

// Initialize Resend Client
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

function generateReferenceNumber() {
    const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomPart = Math.random().toString(16).slice(2, 6).toUpperCase();
    return `AXT-${datePart}-${randomPart}`;
}

async function sendConfirmationEmail(userData: any, referenceNumber: string) {
    if (!resend) return;

    const textContent = `
Dear ${userData.name},

Thank you for requesting a 30-Day Free VPS Trial with AXTCloud. Your unique reference number is ${referenceNumber}.

Your Requested Specifications:
- Location: ${userData.location}
- OS: ${userData.os}

Our team is provisioning your high-performance VPS instance now. You will receive a separate email within the next 12-24 hours with your login credentials and full details.

If you have any questions, please contact us.

The AXTCloud Team
`;

    const htmlContent = `
        <div style="font-family: 'Poppins', Helvetica, Arial, sans-serif; color: #f0f0f0; background-color: #050505; padding: 20px; border-radius: 8px;">
            <h2 style="color: #ff0000; font-family: 'Audiowide', cursive; margin-top: 0;">&#x1F389; Welcome to AXTCloud!</h2>
            <p>Dear ${userData.name},</p>
            <p>Thank you for requesting a <strong style="color: #ff0000;">30-Day Free VPS Trial</strong> with AXTCloud. We are excited to help you launch your dream project!</p>
            
            <p style="margin-top: 20px;"><strong>Your Trial Details:</strong></p>
            <table style="width: 100%; max-width: 400px; border-collapse: collapse; margin-bottom: 20px; background: #111; border: 1px solid #222;">
                <tr><td style="padding: 10px; border-bottom: 1px solid #222;">Reference Number:</td><td style="padding: 10px; border-bottom: 1px solid #222; color: #ff0000; font-weight: bold;">${referenceNumber}</td></tr>
                <tr><td style="padding: 10px; border-bottom: 1px solid #222;">Preferred Location:</td><td style="padding: 10px; border-bottom: 1px solid #222;">${userData.location}</td></tr>
                <tr><td style="padding: 10px;">Preferred OS:</td><td style="padding: 10px;">${userData.os}</td></tr>
            </table>
            
            <p>Our team is now provisioning your high-performance VPS instance. You will receive a separate email within the next 12-24 hours with your login credentials and full details on how to access your server.</p>
            
            <p style="margin-top: 30px;">If you have any questions, please reply to this email or contact us at <a href="mailto:sales@mail.axt.co.in" style="color: #ff0000;">sales@mail.axt.co.in</a>.</p>
            <p>Happy Hosting!</p>
            <p style="margin-top: 10px; font-size: 0.9em; color: #888;">The AXTCloud Team</p>
        </div>
    `;

    try {
        await resend.emails.send({
            from: `AXTCloud <${SENDER_EMAIL}>`,
            to: userData.email,
            subject: `Your 30-Day Free VPS Trial Request (Ref: ${referenceNumber})`,
            html: htmlContent,
            text: textContent,
            tags: [{ name: 'category', value: 'free_trial_confirmation' }],
        });
    } catch (err) {
        console.error('Resend Error:', err);
    }
}

export async function POST(req: NextRequest) {
    if (!docClient || !resend) {
        return NextResponse.json({ error: 'Server initialization failed due to missing secrets.' }, { status: 500 });
    }

    try {
        const body = await req.json();
        const { name, email, phone, location, os } = body;

        if (!name || !email || !phone || !location || !os) {
            return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
        }

        const referenceNumber = generateReferenceNumber();
        const timestamp = new Date().toISOString();
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 30);

        const item = {
            "VPS Free Trail": referenceNumber,
            Name: name,
            Email: email,
            Phone: phone,
            ServerLocation: location,
            OperatingSystem: os,
            TrialStartDate: timestamp,
            TrialExpiryDate: expiryDate.toISOString(),
            VPSCores: 1,
            VPSRAM: '2GB DDR5 @ 5200MHz',
            VPSStorage: '20GB NVMe SSD',
            Status: 'Pending Provisioning',
        };

        const params = {
            TableName: DYNAMODB_TABLE_NAME,
            Item: item,
        };

        await docClient.send(new PutCommand(params));

        // Email sending is non-critical
        await sendConfirmationEmail({ name, email, location, os }, referenceNumber);

        return NextResponse.json({
            message: 'Free trial request successfully submitted.',
            referenceNumber: referenceNumber,
            status: item.Status,
        });
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ error: error.message || 'Failed to process request.' }, { status: 500 });
    }
}
