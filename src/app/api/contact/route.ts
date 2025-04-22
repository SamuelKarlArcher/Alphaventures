import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const data = await req.json();

  const {
    name,
    email,
    phone,
    company,
    serviceInterest,
    projectDetails,
    budget,
    timeline,
  } = data;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Company: ${company}
        Service Interest: ${serviceInterest}
        Project Details: ${projectDetails}
        Budget: ${budget}
        Timeline: ${timeline}
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email sending error:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to send email' }),
      { status: 500 }
    );
  }
}
