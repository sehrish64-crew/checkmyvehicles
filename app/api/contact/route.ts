
import nodemailer from 'nodemailer';
import type { ResultSetHeader } from 'mysql2';
import { z } from 'zod';
import { getContactDatabase } from '@/lib/contact-database';

export const runtime = 'nodejs';

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(8).max(20),
  message: z.string().trim().min(10).max(1000),
});

export async function POST(request: Request) {
  const rawBody = await request.text();
  if (Buffer.byteLength(rawBody, 'utf8') > 16_384) {
    return Response.json({ error: 'Request body is too large' }, { status: 413 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return Response.json(
      { error: 'Please provide valid contact details' },
      { status: 422 },
    );
  }

  const { name, email, phone, message } = parsed.data;
  try {
    const database = getContactDatabase();
    const [result] = await database.execute<ResultSetHeader>(
      'INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)',
      [name, email, phone, message],
    );
    const messageId = result.insertId;
    let emailStatus: 'sent' | 'failed' = 'failed';
    let emailError: 'not-configured' | 'delivery-failed' = 'delivery-failed';

    const smtpPassword = process.env.SMTP_PASSWORD;
    if (!smtpPassword) {
      console.error('Contact email delivery failed: SMTP_PASSWORD is not configured.');
      emailError = 'not-configured';
    } else {
      const smtpUsername = process.env.SMTP_USERNAME || 'autoscanora@gmail.com';
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT || 587) === 465,
        auth: { user: smtpUsername, pass: smtpPassword },
      });

      try {
        await transporter.sendMail({
          from: `"Website Contact Form" <${smtpUsername}>`,
          to: process.env.CONTACT_TO_EMAIL || 'autoscanora@gmail.com',
          replyTo: { name, address: email },
          subject: 'New website contact form message',
          text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
        });
        emailStatus = 'sent';
      } catch (error) {
        console.error(
          'Contact email delivery failed:',
          error instanceof Error ? error.message : 'Unknown email error',
        );
      }
    }

    await database.execute(
      'UPDATE contact_messages SET email_status = ? WHERE id = ?',
      [emailStatus, messageId],
    );

    if (emailStatus === 'failed') {
      console.warn(
        emailError === 'not-configured'
          ? 'Contact message was saved; email is not configured.'
          : 'Contact message was saved; email delivery failed.',
      );
    }

    return Response.json({ success: true, emailSent: emailStatus === 'sent' });
  } catch (error) {
    console.error(
      'Contact database operation failed:',
      error instanceof Error ? error.message : 'Unknown database error',
    );
    return Response.json(
      { error: 'Contact service is temporarily unavailable. Please try again.' },
      { status: 503 },
    );
  }
}
