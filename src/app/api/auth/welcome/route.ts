import { NextResponse } from 'next/server';
import { sendWelcomeEmail } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const { email, name } = await req.json();

        if (!email || !name) {
            return NextResponse.json({ error: "Missing email or name" }, { status: 400 });
        }

        await sendWelcomeEmail(email, name);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Welcome Email Error:', error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
