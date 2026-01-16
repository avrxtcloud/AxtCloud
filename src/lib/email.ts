import { Resend } from 'resend';

const getResendClient = () => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        // Return a dummy client during build to prevent crash
        return new Resend('re_dummy_123');
    }
    return new Resend(apiKey);
};

export async function sendWelcomeEmail(email: string, name: string) {
    try {
        const resend = getResendClient();
        if (!process.env.RESEND_API_KEY) return;

        await resend.emails.send({
            from: 'AXTCloud <hello@co.goaxt.cloud>',
            to: email,
            subject: 'Welcome to AXTCloud!',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h1 style="color: #ff0000;">Welcome to AXTCloud, ${name}!</h1>
                    <p>We're thrilled to have you on board. Your infrastructure journey begins here.</p>
                    <p>With AXTCloud, you can:</p>
                    <ul>
                        <li>Deploy high-performance AWS instances in seconds.</li>
                        <li>Manage your servers with a sleek, intuitive dashboard.</li>
                        <li>Enjoy enterprise-grade security and support.</li>
                    </ul>
                    <p>Get started by deploying your first server today!</p>
                    <a href="https://axt.co.in/deploy" style="display: inline-block; padding: 12px 24px; background-color: #ff0000; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">Deploy Now</a>
                    <p style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; color: #888; font-size: 12px;">
                        &copy; ${new Date().getFullYear()} AXTCloud. All rights reserved.
                    </p>
                </div>
            `
        });
    } catch (error) {
        console.error('Error sending welcome email:', error);
    }
}

export async function sendProvisioningEmail(email: string, instanceName: string, specs: any) {
    try {
        const resend = getResendClient();
        if (!process.env.RESEND_API_KEY) return;

        await resend.emails.send({
            from: 'AXTCloud <notifications@co.goaxt.cloud>',
            to: email,
            subject: 'Your Server is Ready!',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h1 style="color: #42b836;">Provisioning Complete!</h1>
                    <p>Your new server <strong>${instanceName}</strong> has been successfully deployed on AWS.</p>
                    <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0;">Server Specs:</h3>
                        <p><strong>OS:</strong> ${specs.os}</p>
                        <p><strong>Plan:</strong> ${specs.plan}</p>
                        <p><strong>Specs:</strong> ${specs.cpu} CPU / ${specs.ram} RAM / ${specs.disk} Storage</p>
                    </div>
                    <p>You can manage your server from your dashboard:</p>
                    <a href="https://axt.co.in/dashboard" style="display: inline-block; padding: 12px 24px; background-color: #000; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">View Dashboard</a>
                </div>
            `
        });
    } catch (error) {
        console.error('Error sending provisioning email:', error);
    }
}

export async function sendActionEmail(email: string, instanceName: string, action: string) {
    try {
        const resend = getResendClient();
        if (!process.env.RESEND_API_KEY) return;

        await resend.emails.send({
            from: 'AXTCloud <notifications@co.goaxt.cloud>',
            to: email,
            subject: `Server Alert: ${action.toUpperCase()}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2>Server Action Notification</h2>
                    <p>An action has been performed on your server <strong>${instanceName}</strong>:</p>
                    <p style="font-size: 18px; font-weight: bold; color: ${action === 'stop' || action === 'terminate' ? '#ff0000' : '#42b836'}; text-transform: uppercase;">
                        Action: ${action}
                    </p>
                    <p>If you did not perform this action, please contact support immediately.</p>
                    <p style="margin-top: 30px; color: #888; font-size: 12px;">
                        Sent automatically by AXTCloud Security System.
                    </p>
                </div>
            `
        });
    } catch (error) {
        console.error('Error sending action email:', error);
    }
}
