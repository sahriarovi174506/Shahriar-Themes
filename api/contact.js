import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "name, email, and message are required." });
  }

  // Configure Nodemailer with Gmail App Password
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_USER}>`, // Gmail requires sender to be the authenticated user
    to: process.env.CONTACT_TO_EMAIL,
    replyTo: email,
    subject: subject ? `[Shahriar Themes] ${subject}` : `[Shahriar Themes] New message from ${name}`,
    html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;border:1px solid #eee;border-radius:10px;overflow:hidden">
          <div style="background:#00e5c8;padding:20px;text-align:center;color:#fff">
            <h2 style="margin:0">New Contact Form Submission</h2>
          </div>
          <div style="padding:20px;color:#333">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject || "(none)"}</p>
            <hr style="border:0;border-top:1px solid #eee;margin:20px 0">
            <p style="white-space:pre-wrap">${message}</p>
          </div>
          <div style="background:#f9f9f9;padding:15px;text-align:center;color:#999;font-size:12px">
            Sent from Shahriar Themes Contact Form
          </div>
        </div>
      `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Contact email error:", error);
    return res.status(500).json({ error: "Failed to send email. Please try again." });
  }
}
