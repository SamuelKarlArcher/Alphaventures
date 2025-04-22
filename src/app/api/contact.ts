import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, serviceInterest, projectDetails } = req.body;

    if (!name || !email || !serviceInterest || !projectDetails) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Alpha Ventures" <${process.env.EMAIL_USER}>`,
        to: process.env.TO_EMAIL,
        subject: 'New Contact Form Submission',
        html: `
          <h3>New Contact Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Service Interest:</strong> ${serviceInterest}</p>
          <p><strong>Project Details:</strong> ${projectDetails}</p>
        `,
      });

      return res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
      console.error('Email error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
