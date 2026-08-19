import fs from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { CREW } from '@/lib/data';
import { getLogoAttachment, getTransporter, isSmtpConfigured, notifyOwner, renderEmailHtml } from '@/lib/mailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CREW_KEYS = new Set(CREW.map((c) => c.key));

async function getPdfAttachment(petKey) {
  const pet = CREW.find((c) => c.key === petKey);
  const filePath = path.join(process.cwd(), 'freebie-pdfs', `${petKey}.pdf`);
  const content = await fs.readFile(filePath);

  return { filename: `${pet.name} - All About My Pet.pdf`, content };
}

export async function POST(request) {
  if (!isSmtpConfigured()) {
    return NextResponse.json({ error: 'Freebie signup is missing SMTP configuration.' }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  const email = body?.email?.trim();
  const pets = Array.isArray(body?.pets) ? [...new Set(body.pets)].filter((key) => CREW_KEYS.has(key)) : [];

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'That email address doesn’t look right.' }, { status: 400 });
  }

  if (pets.length === 0) {
    return NextResponse.json({ error: 'Pick at least one pet so we know what to send.' }, { status: 400 });
  }

  const attachments = [];
  const missing = [];

  for (const key of pets) {
    try {
      attachments.push(await getPdfAttachment(key));
    } catch {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Sorry, that printable isn't ready yet (missing: ${missing.join(', ')}). Please try again later.` },
      { status: 500 }
    );
  }

  const names = CREW.filter((c) => pets.includes(c.key)).map((c) => c.name);
  const plural = attachments.length > 1;

  try {
    await getTransporter().sendMail({
      from: process.env.FULFILLMENT_FROM_EMAIL,
      to: email,
      subject: 'Your free Georgiekins printable' + (plural ? 's' : '') + ' 🐾',
      html: renderEmailHtml({
        heading: 'Yay! Your printable is here 🐾',
        bodyHtml: `
          <p>Thank you for joining the Georgiekins family! 💌</p>
          <p>Your free "All About My Pet" printable${plural ? 's' : ''} for
            <strong>${names.join(', ')}</strong> ${plural ? 'are' : 'is'} attached below —
            print it out and get organized in style!</p>
        `,
        footerNote: 'Free forever. One-click unsubscribe. No spam, just paw-some content.',
      }),
      attachments: [...attachments, getLogoAttachment()],
    });
  } catch (error) {
    return NextResponse.json({ error: 'Could not send your freebie. Please try again.' }, { status: 502 });
  }

  await notifyOwner({
    subject: `🐾 New freebie signup: ${names.join(', ')}`,
    html: `
      <p>Someone just claimed a free printable.</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Pet(s):</strong> ${names.join(', ')}</p>
    `,
  });

  return NextResponse.json({ ok: true });
}
