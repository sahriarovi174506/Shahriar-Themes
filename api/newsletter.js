import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
    const { email } = req.body;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: "A valid email address is required." });
    }
    try {
        await resend.contacts.create({
            email,
            audienceId: process.env.RESEND_AUDIENCE_ID,
            unsubscribed: false,
        });
        await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL,
            to: email,
            subject: "You're on the Shahriar Themes list! ✦",
            html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#0a0a0f;color:#f1f1f1;padding:40px;border-radius:12px">
          <h1 style="color:#00e5c8;font-size:28px;margin-bottom:8px">Thanks for subscribing! ✦</h1>
          <p style="color:#a0a0b0;font-size:16px;line-height:1.7">
            You'll be the first to know when new free templates drop, plus tips on building high-converting websites.
          </p>
          <p style="color:#a0a0b0;font-size:14px;margin-top:32px">
            — Shahriar Themes<br/>
            <a href="https://shahriar-themes.com" style="color:#00e5c8">shahriar-themes.com</a>
          </p>
        </div>
      `,
        });

        return res.status(200).json({ success: true });
    } catch (error) {
        if (error?.statusCode === 422) {
            return res.status(200).json({ success: true, alreadySubscribed: true });
        }
        console.error("Newsletter signup error:", error);
        return res.status(500).json({ error: "Failed to subscribe. Please try again." });
    }
}
