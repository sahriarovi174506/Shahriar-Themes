import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "name, email, and message are required." });
    }

    try {
        await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL,
            to: process.env.RESEND_TO_EMAIL,
            replyTo: email,
            subject: subject ? `[Shahriar Themes] ${subject}` : `[Shahriar Themes] New message from ${name}`,
            html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#00e5c8">New Contact Form Submission</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px;font-weight:bold;color:#666">Name</td><td style="padding:8px">${name}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;color:#666">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px;font-weight:bold;color:#666">Subject</td><td style="padding:8px">${subject || "(none)"}</td></tr>
          </table>
          <div style="margin-top:20px;padding:16px;background:#f4f4f4;border-radius:8px">
            <p style="margin:0;white-space:pre-wrap">${message}</p>
          </div>
        </div>
      `,
        });
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Contact email error:", error);
        return res.status(500).json({ error: "Failed to send email. Please try again." });
    }
}
