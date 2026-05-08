import nodemailer from "nodemailer";

/**
 * POST /api/contact
 * Expected payload: { name: string, email: string, message: string }
 * Sends an email to the portfolio owner using Gmail SMTP.
 */
export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();
    
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "All fields are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Gmail SMTP configuration – use environment variables for credentials
    if (!(process.env.GMAIL_USER || process.env.EMAIL_USER) || !(process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_PASS)) {
      console.error("Missing EMAIL_USER or EMAIL_PASS environment variables.");
      return new Response(JSON.stringify({ error: "Server configuration error: Email not set up." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // TLS
      auth: {
        user: process.env.EMAIL_USER || process.env.GMAIL_USER, // e.g., your Gmail address
        pass: process.env.EMAIL_PASS || process.env.GMAIL_APP_PASSWORD, // Gmail App Password (not your normal password)
      },
    });

    const receiverEmail = process.env.RECEIVER_EMAIL || process.env.EMAIL_USER || process.env.GMAIL_USER;

    const mailOptions = {
      from: `"Smart Portfolio" <${process.env.EMAIL_USER || process.env.GMAIL_USER}>`,
      to: receiverEmail, // send to RECEIVER_EMAIL
      subject: "New Portfolio Contact Message",
      replyTo: email,
      html: `
        <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: "Message sent successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return new Response(JSON.stringify({ error: "Failed to send message" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
