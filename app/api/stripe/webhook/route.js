import fs from 'node:fs/promises';
import path from 'node:path';
import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { getLogoAttachment, getTransporter, isSmtpConfigured, notifyOwner, renderEmailHtml } from '@/lib/mailer';
import { getStripeCatalogItem } from '@/lib/stripeCatalog';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const PRODUCT_LABELS = {
  sitter: 'Sitter Guide',
  new_pet_parent: 'New Pet Parent',
  journal: 'Pet Journal',
};

function titleCase(value) {
  return value
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function labelForCode(code) {
  const [petKey, ...productParts] = code.split('-');
  const productKey = productParts.join('-');
  return `${titleCase(petKey)} ${PRODUCT_LABELS[productKey] || titleCase(productKey)}`;
}

async function getPdfAttachment(code) {
  const filePath = path.join(process.cwd(), 'fulfillment-pdfs', `${code}.pdf`);
  const content = await fs.readFile(filePath);

  return {
    filename: `${labelForCode(code)}.pdf`,
    content,
  };
}

function describePurchasedSkus(purchasedSkusMeta) {
  if (!purchasedSkusMeta) return [];

  return purchasedSkusMeta
    .split(',')
    .filter(Boolean)
    .map((entry) => {
      const [sku, quantity] = entry.split(':');
      const catalogItem = getStripeCatalogItem(sku);
      const name = catalogItem?.name || titleCase(sku);
      return `${name} x${quantity || 1}`;
    });
}

async function sendFulfillmentEmail({ to, fulfillmentCodes }) {
  if (!isSmtpConfigured()) {
    console.log('Stripe fulfillment skipped: add SMTP_HOST, SMTP_PORT, and FULFILLMENT_FROM_EMAIL to send PDF emails.');
    console.log({ to, fulfillmentCodes });
    return { sent: false, reason: 'email_provider_not_configured' };
  }

  const attachments = [];
  const missingPdfs = [];

  for (const code of fulfillmentCodes) {
    try {
      attachments.push(await getPdfAttachment(code));
    } catch {
      missingPdfs.push(`${code}.pdf`);
    }
  }

  if (missingPdfs.length > 0) {
    throw new Error(`Missing PDF files in fulfillment-pdfs: ${missingPdfs.join(', ')}`);
  }

  await getTransporter().sendMail({
    from: process.env.FULFILLMENT_FROM_EMAIL,
    to,
    subject: 'Your Georgiekins downloads are here! 🎉',
    html: renderEmailHtml({
      heading: 'Thank you for your order! 🎉',
      bodyHtml: `
        <p>Thank you for shopping with Georgiekins!</p>
        <p>Your PDF downloads are attached to this email — save them somewhere safe, they're yours to keep forever.</p>
        <p>If anything looks off, just reply to this email and we'll help. 💌</p>
      `,
      footerNote: 'Made with love for furry, feathered, and scaly friends everywhere.',
    }),
    attachments: [...attachments, getLogoAttachment()],
  });

  return { sent: true };
}

export async function POST(request) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: 'Stripe webhook is missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET.' },
      { status: 500 }
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const signature = request.headers.get('stripe-signature');
  const body = await request.text();
  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    return NextResponse.json({ error: `Webhook signature verification failed: ${error.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const email = session.customer_details?.email || session.customer_email;
    const fulfillmentCodes = session.metadata?.fulfillment_codes
      ? session.metadata.fulfillment_codes.split(',').filter(Boolean)
      : [];

    if (!email || fulfillmentCodes.length === 0) {
      return NextResponse.json({ received: true, fulfilled: false, reason: 'missing_email_or_fulfillment_codes' });
    }

    const result = await sendFulfillmentEmail({ to: email, fulfillmentCodes });

    if (result.sent) {
      const products = describePurchasedSkus(session.metadata?.purchased_skus);
      const amount = typeof session.amount_total === 'number' ? `$${(session.amount_total / 100).toFixed(2)}` : null;

      await notifyOwner({
        subject: `💰 New order: ${products.join(', ') || 'Georgiekins purchase'}`,
        html: `
          <p>You&apos;ve got a new order!</p>
          <p><strong>Customer:</strong> ${email}</p>
          <p><strong>Product(s):</strong> ${products.length ? products.join(', ') : '(unknown)'}</p>
          ${amount ? `<p><strong>Total:</strong> ${amount}</p>` : ''}
        `,
      });
    }

    return NextResponse.json({ received: true, fulfilled: result.sent, reason: result.reason });
  }

  return NextResponse.json({ received: true });
}
