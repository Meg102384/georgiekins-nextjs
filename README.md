# Georgiekins — Next.js + Tailwind

This is the Georgiekins site rebuilt as a Next.js 14 (App Router) app styled
with Tailwind CSS, converted from the original single-file static HTML site.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

To build for production:

```bash
npm run build
npm run start
```

## Stripe checkout setup

The cart is wired to Stripe Checkout through `app/api/checkout/route.js`.
Product placeholders live in `.env.example`; copy that file to `.env.local`
and replace the placeholder values with real Stripe Price IDs.

```bash
cp .env.example .env.local
```

### What you need to do in Stripe

1. Create or log in to your Stripe account and make sure you are in **Test
   mode** while setting things up.
2. Go to **Developers → API keys** and copy your **Secret key** into
   `STRIPE_SECRET_KEY` in `.env.local`.
3. Go to **Product catalog** and create products/prices for each Georgiekins
   item listed below. Use one-time prices, not subscriptions.
4. Copy each Stripe Price ID, which starts with `price_`, into the matching
   placeholder in `.env.local`.
5. Set `NEXT_PUBLIC_SITE_URL` to your local URL while testing
   (`http://localhost:3000`) and to your real domain when deployed.
6. Run `npm run dev`, add products to the cart, and click **Checkout with
   Stripe**. In test mode, use Stripe's test card `4242 4242 4242 4242`.
7. Add your PDF files to `fulfillment-pdfs/` using the filenames listed below.
8. Create a Stripe webhook endpoint pointing to
   `https://yourdomain.com/api/stripe/webhook` and listen for
   `checkout.session.completed`.
9. Copy the webhook signing secret, which starts with `whsec_`, into
   `STRIPE_WEBHOOK_SECRET`.
10. Add your Gmail SMTP settings: `SMTP_HOST=smtp.gmail.com`,
   `SMTP_PORT=587`, `SMTP_SECURE=false`, `SMTP_USER=your Gmail address`,
   `SMTP_PASSWORD=your Gmail App Password`, and
   `FULFILLMENT_FROM_EMAIL`. The webhook uses these to email the purchased PDFs
   to the email address the customer enters in Stripe.
11. When everything works, repeat the product/price setup in Stripe live mode,
   swap in live API keys and live Price IDs in your hosting provider's
   environment variables, then deploy.

### Stripe product placeholders

Create these four products for each pet:

- Cat Sitter Kit ($5): `STRIPE_PRICE_CAT_SITTER`
- Cat New Pet Parent ($5): `STRIPE_PRICE_CAT_NEW_PET_PARENT`
- Cat Pet Journal ($5): `STRIPE_PRICE_CAT_JOURNAL`
- Cat Full Kit ($14): `STRIPE_PRICE_CAT_KIT`
- Dog Sitter Kit ($5): `STRIPE_PRICE_DOG_SITTER`
- Dog New Pet Parent ($5): `STRIPE_PRICE_DOG_NEW_PET_PARENT`
- Dog Pet Journal ($5): `STRIPE_PRICE_DOG_JOURNAL`
- Dog Full Kit ($14): `STRIPE_PRICE_DOG_KIT`
- Gecko Sitter Kit ($5): `STRIPE_PRICE_GECKO_SITTER`
- Gecko New Pet Parent ($5): `STRIPE_PRICE_GECKO_NEW_PET_PARENT`
- Gecko Pet Journal ($5): `STRIPE_PRICE_GECKO_JOURNAL`
- Gecko Full Kit ($12): `STRIPE_PRICE_GECKO_KIT`
- Guinea Pig Sitter Kit ($5): `STRIPE_PRICE_GUINEAPIG_SITTER`
- Guinea Pig New Pet Parent ($5): `STRIPE_PRICE_GUINEAPIG_NEW_PET_PARENT`
- Guinea Pig Pet Journal ($5): `STRIPE_PRICE_GUINEAPIG_JOURNAL`
- Guinea Pig Full Kit ($12): `STRIPE_PRICE_GUINEAPIG_KIT`
- Bird Sitter Kit ($5): `STRIPE_PRICE_BIRD_SITTER`
- Bird New Pet Parent ($5): `STRIPE_PRICE_BIRD_NEW_PET_PARENT`
- Bird Pet Journal ($5): `STRIPE_PRICE_BIRD_JOURNAL`
- Bird Full Kit ($12): `STRIPE_PRICE_BIRD_KIT`
- Bunny Sitter Kit ($5): `STRIPE_PRICE_BUNNY_SITTER`
- Bunny New Pet Parent ($5): `STRIPE_PRICE_BUNNY_NEW_PET_PARENT`
- Bunny Pet Journal ($5): `STRIPE_PRICE_BUNNY_JOURNAL`
- Bunny Full Kit ($12): `STRIPE_PRICE_BUNNY_KIT`

The Full Kit is the bundle of that pet's Sitter Kit, New Pet Parent, and Pet
Journal.

Bundle products:

- 2-Pet Full Kit Bundle ($22): `STRIPE_PRICE_BUNDLE_2_PETS`
- 3-Pet Full Kit Bundle ($30): `STRIPE_PRICE_BUNDLE_3_PETS`
- 4-Pet Full Kit Bundle ($38): `STRIPE_PRICE_BUNDLE_4_PETS`
- 5-Pet Full Kit Bundle ($44): `STRIPE_PRICE_BUNDLE_5_PETS`
- 6-Pet Full Kit Bundle ($49): `STRIPE_PRICE_BUNDLE_6_PETS`

Stripe only handles payment at this point. For automatic delivery of the
digital downloads, the Stripe webhook reads the purchased PDF codes from the
Checkout Session metadata and emails the matching files to the customer email
Stripe collected.

### PDF fulfillment files

### Gmail SMTP setup

Use a Gmail App Password for `SMTP_PASSWORD`, not your normal Gmail password.
In your Google account, turn on 2-Step Verification, then create an App
Password for this website. Google will show a 16-character password; paste that
into `.env.local` without spaces.

Example:

```env
FULFILLMENT_FROM_EMAIL="Georgiekins <yourgmail@gmail.com>"
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=yourgmail@gmail.com
SMTP_PASSWORD=your16characterapppassword
```

Put the paid PDFs in `fulfillment-pdfs/`. This folder is intentionally not
inside `public/`, because paid files should not be directly downloadable.

Use these exact filenames:

- `cat-sitter.pdf`
- `cat-new_pet_parent.pdf`
- `cat-journal.pdf`
- `dog-sitter.pdf`
- `dog-new_pet_parent.pdf`
- `dog-journal.pdf`
- `gecko-sitter.pdf`
- `gecko-new_pet_parent.pdf`
- `gecko-journal.pdf`
- `guineapig-sitter.pdf`
- `guineapig-new_pet_parent.pdf`
- `guineapig-journal.pdf`
- `bird-sitter.pdf`
- `bird-new_pet_parent.pdf`
- `bird-journal.pdf`
- `bunny-sitter.pdf`
- `bunny-new_pet_parent.pdf`
- `bunny-journal.pdf`

When a customer buys a Full Kit, the checkout metadata expands it to all three
PDFs for that pet. When they buy a multi-pet bundle, it expands to all three
PDFs for every selected pet. For example, a Cat + Dog bundle sends:

```txt
cat-sitter.pdf
cat-new_pet_parent.pdf
cat-journal.pdf
dog-sitter.pdf
dog-new_pet_parent.pdf
dog-journal.pdf
```

This was verified with a real `npm run build` — the home page, checkout
success/cancel pages, Pet Care Library hub, 6 pet index pages, and 30
individual article pages generate successfully.

> **Note on fonts:** the app loads Fredoka & Quicksand from Google Fonts via a
> `<link>` tag in `app/layout.js` (not `next/font/google`), so it works in any
> sandboxed/offline build environment. If you have full internet access during
> your own builds, you can switch to `next/font/google` for automatic font
> optimization if you prefer — just swap the `<link>` tags for the
> `next/font` import shown in Next.js's docs.

## Project structure

```
app/
  layout.js              Root layout — fonts, Nav, CartDrawer, Footer
  page.js                Home page (assembles all sections)
  globals.css            Tailwind directives + a few brand utility classes
  library/
    page.js               Pet Care Library hub
    [pet]/page.js          Per-pet article index (6 pets)
    [pet]/[slug]/page.js   Individual article page (30 articles total)

components/
  Nav.js, Footer.js        Site chrome
  CartContext.js            Cart state (React Context)
  CartDrawer.js              Slide-out cart panel
  Hero.js, Peek.js, Compare.js, Friends.js, Facts.js, Share.js,
  Shop.js, Reviews.js, Story.js, Faq.js, Freebie.js
                             One component per homepage section

lib/
  data.js                  Crew, facts, shop products, and article helpers
  articles.json             The 30 Pet Care Library articles (data only)

public/images/             Character art, logo, and product preview photos
fulfillment-pdfs/          Private paid PDF files attached by the Stripe webhook
```

## Notes on behavior carried over from the original site

- **Cart** — global React Context (`CartContext.js`), so the cart works from
  any page (home or library). Checkout now posts to a server route that creates
  a Stripe Checkout Session once real Price IDs are configured.
- **Bundle builder** — pick 2+ pets to unlock bundle pricing, same tiers as
  before ($22 for 2 pets up to $49 for all 6). Stripe receives the selected
  pet PDF codes in Checkout Session metadata for email fulfillment.
- **Fact Corner** — tap a crew member to hear one of their facts; tap again
  to cycle to their next one, or hit "Surprise me!" for a random pick.
- **Freebie signup** — multi-select checkbox chips (not a dropdown), so
  multi-pet households can request tips for every pet they have.
- **Footer** — intentionally plain, static, block-level. It is **not**
  `position: sticky` or `fixed`, so it only appears once you've scrolled to
  the bottom of the page content, same as a normal page footer.
- **Pet Care Library** — real, statically-generated pages with their own
  URLs and per-page SEO metadata (`<title>`, meta description, Open Graph
  tags), unlike a JS-only modal. Update `SITE_URL`-style canonical logic if
  you add real canonical tags later — none are set yet in this version, so
  add them in each page's `generateMetadata()` once you have a real domain.

## Known gaps / next steps

- Add real Stripe Price IDs in `.env.local` and in your production hosting
  environment.
- The freebie form does not call a real backend/email service yet.
- Sitemap.xml / robots.txt are not yet included — add `app/sitemap.js` and
  `app/robots.js` (Next.js supports both natively) once you have a real
  domain to point them at.
