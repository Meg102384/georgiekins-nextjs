import { NextResponse } from 'next/server';
import { getTransporter, isSmtpConfigured } from '@/lib/mailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  if (!isSmtpConfigured()) {
    return NextResponse.json(
      { error: 'Contact form is missing SMTP configuration.' },
      { status: 500 }
    );
  }

  const body = await request.json().catch(() => null);
  const name = body?.name?.trim();
  const email = body?.email?.trim();
  const message = body?.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email, and message are all required.' }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'That email address doesn’t look right.' }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field, bots usually do.
  if (body?.company) {
    return NextResponse.json({ ok: true });
  }

  try {
    await getTransporter().sendMail({
      from: process.env.FULFILLMENT_FROM_EMAIL,
      to: process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER,
      replyTo: email,
      subject: `Contact form: ${name}`,
      html: `
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Could not send your message. Please try again.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
