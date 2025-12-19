import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

// Configure your email credentials here
// For Gmail: use app-specific password (not your regular password)
// Enable 2FA and create app password: https://myaccount.google.com/apppasswords

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'abimanyudans@gmail.com',
    pass: process.env.EMAIL_PASSWORD || '',
  },
});

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, subject, message } = await request.json();

    // Validate input
    if (!fullName || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Send email to your inbox
    await transporter.sendMail({
      from: process.env.EMAIL_USER || 'abimanyudans@gmail.com',
      to: 'abimanyudans@gmail.com',
      subject: `New Message: ${subject}`,
      html: `
        <h2>New Message from Portfolio Contact Form</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email,
    });

    // Optional: Send confirmation email to the sender
    await transporter.sendMail({
      from: process.env.EMAIL_USER || 'abimanyudans@gmail.com',
      to: email,
      subject: 'I received your message - Thanks for reaching out!',
      html: `
        <h2>Hi ${fullName},</h2>
        <p>Thank you for reaching out! I've received your message and will get back to you as soon as possible.</p>
        <p><strong>Your message details:</strong></p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <br>
        <p>Best regards,<br>Abimanyu Danendra Andarfebano</p>
      `,
    });

    return NextResponse.json(
      { message: 'Email sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}
