// api/send-email.js
import { Resend } from 'resend';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const {
        to,
        subject,
        html,
        sendToTrustpilot
    } = req.body;

    if (!to || !subject || !html) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const emailPayload = {
        from: 'Olymp AI Invest <noreply@olympaiinvest.com>',
        to,
        subject,
        html
    };

    if (sendToTrustpilot === true) {
        emailPayload.bcc = 'www.olympaiinvest.com+d1fc978185@invite.trustpilot.com';
    }

    try {
        const result = await resend.emails.send(emailPayload);
        return res.status(200).json({ success: true, result });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
