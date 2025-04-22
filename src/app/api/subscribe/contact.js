// pages/api/contact.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail', // Change this to your email provider
      auth: {
        user: process.env.EMAIL_USERNAME, // Your email address
        pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
      },
    });

    try {
      // Send email
      await transporter.sendMail({
        from: `"${name}" <${email}>`, // Sender address
        to: process.env.RECEIVER_EMAIL, // Recipient address (your email)
        subject: 'New Contact Form Message', // Subject line
        text: message, // Plain text body
        html: `<p>${message}</p>`, // HTML body content
      });

      return res.status(200).json({ success: true, message: 'Email sent successfully.' });
    } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ success: false, message: 'Failed to send email.' });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
