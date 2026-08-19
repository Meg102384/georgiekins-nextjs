import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { getFulfillmentCodesForSku, getStripeCatalogItem } from '@/lib/stripeCatalog';

export const dynamic = 'force-dynamic';

function getBaseUrl(request) {
  return process.env.NEXT_PUBLIC_SITE_URL || request.headers.get('origin') || 'http://localhost:3000';
}

export async function POST(request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: 'Stripe is missing STRIPE_SECRET_KEY. Add it to .env.local before taking payments.' },
      { status: 500 }
    );
  }

  const body = await request.json().catch(() => null);
  const cartItems = body?.items && typeof body.items === 'object' ? body.items : null;

  if (!cartItems || Object.keys(cartItems).length === 0) {
    return NextResponse.json({ error: 'Your basket is empty.' }, { status: 400 });
  }

  const lineItems = [];
  const missingPriceIds = [];
  const purchasedSkus = [];
  const fulfillmentCodes = [];

  for (const [sku, item] of Object.entries(cartItems)) {
    const catalogItem = getStripeCatalogItem(sku);
    const quantity = Number(item?.qty || 0);

    if (!catalogItem || !Number.isInteger(quantity) || quantity < 1) {
      return NextResponse.json({ error: `Cart item "${sku}" is not valid.` }, { status: 400 });
    }

    const price = process.env[catalogItem.envKey];
    if (!price || price.startsWith('price_placeholder')) {
      missingPriceIds.push(catalogItem.envKey);
      continue;
    }

    lineItems.push({ price, quantity });
    purchasedSkus.push(`${sku}:${quantity}`);

    for (let i = 0; i < quantity; i += 1) {
      fulfillmentCodes.push(...getFulfillmentCodesForSku(sku));
    }
  }

  if (missingPriceIds.length > 0) {
    return NextResponse.json(
      {
        error: `Add real Stripe Price IDs for: ${missingPriceIds.join(', ')}`,
      },
      { status: 500 }
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const baseUrl = getBaseUrl(request);
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: lineItems,
    success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/checkout/cancel`,
    billing_address_collection: 'auto',
    allow_promotion_codes: true,
    customer_creation: 'if_required',
    managed_payments: { enabled: false },
    metadata: {
      purchased_skus: purchasedSkus.join(','),
      fulfillment_codes: [...new Set(fulfillmentCodes)].join(','),
    },
    payment_intent_data: {
      metadata: {
        purchased_skus: purchasedSkus.join(','),
        fulfillment_codes: [...new Set(fulfillmentCodes)].join(','),
      },
    },
  });

  return NextResponse.json({ url: session.url });
}
