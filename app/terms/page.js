import Link from 'next/link';

export const metadata = {
  title: 'Terms & Conditions | Georgiekins',
  description: 'The terms and conditions for using georgiekins.com and purchasing Georgiekins digital printables.',
};

const SECTIONS = [
  {
    h: 'Acceptance of Terms',
    body: [
      'By using georgiekins.com or purchasing from our shop, you agree to these Terms & Conditions. If you don\'t agree, please don\'t use the site.',
    ],
  },
  {
    h: 'Digital Products & License',
    body: [
      "Every Georgiekins printable is an instant digital download (PDF). No physical product is ever shipped. When you purchase or claim a free printable, you're buying a license for personal, non-commercial use only.",
    ],
    list: [
      { h: 'You may', d: 'print copies for your own household and personal pet-care use, as many times as you like.' },
      { h: 'You may not', d: 'resell, redistribute, share, or repost the files (or the content within them) in any form, including on other websites, marketplaces, or social media.' },
    ],
  },
  {
    h: 'Payments & Pricing',
    body: [
      'All payments are processed securely through Stripe. Prices are listed in USD and may change at any time; the price shown at checkout is the price you pay. We do not store your card details.',
    ],
  },
  {
    h: 'Delivery of Digital Files',
    body: [
      "After checkout, you'll receive a download link on the confirmation page and by email. Please save your files somewhere safe — that email is your permanent record of access. If you never receive your files, contact us and we'll help right away.",
    ],
  },
  {
    h: 'Refund Policy',
    body: [
      'Because our products are instant digital downloads, all sales are generally final. If you experience a technical issue (like a broken download link), contact support@georgiekins.com and we\'ll make it right.',
    ],
  },
  {
    h: 'Pet Care Disclaimer',
    body: [
      "Georgiekins printables and any pet care content on this site (including our Pet Care Library and Fact Corner) are organizational and educational tools only — not veterinary advice. Always consult a licensed veterinarian about your pet's health.",
    ],
  },
  {
    h: 'Acceptable Use',
    body: [
      "You agree not to misuse the site — including attempting to disrupt it, submit false information at checkout, or use our printables for any unlawful purpose.",
    ],
  },
  {
    h: 'Intellectual Property',
    body: [
      'All artwork, characters, writing, and designs on georgiekins.com and within our printables belong to Georgiekins. Our license lets you print and use them personally — it doesn\'t transfer ownership or any commercial rights.',
    ],
  },
  {
    h: 'Limitation of Liability',
    body: [
      'Georgiekins provides this site and its printables "as is." To the fullest extent permitted by law, we aren\'t liable for any indirect or incidental damages arising from your use of the site or our products.',
    ],
  },
  {
    h: 'Changes to These Terms',
    body: [
      'We may update these Terms from time to time. Continued use of the site after changes are posted means you accept the updated Terms.',
    ],
  },
  {
    h: 'Contact Us',
    body: [
      'Questions about these Terms? Reach us any time at support@georgiekins.com.',
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="bg-blush">
      <div className="max-w-[760px] mx-auto px-5 py-14">
        <p className="text-sm text-navy-soft font-semibold mb-4">
          <Link href="/" className="hover:text-coral-deep">Home</Link>
          {' / '}
          Terms &amp; Conditions
        </p>

        <div className="bg-cream border-[2.5px] border-dashed border-line-blue rounded-[28px] p-7 sm:p-9">
          <span className="inline-block font-fredoka font-semibold text-xs text-coral-deep bg-blush rounded-full px-4 py-1.5 mb-4">
            📄 Legal
          </span>
          <h1 className="font-fredoka font-bold text-cocoa text-3xl sm:text-4xl leading-tight mb-2">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm text-navy-soft font-semibold mb-8">Effective August 13, 2026</p>

          <div className="flex flex-col gap-7 text-navy text-[1.02rem] font-medium leading-relaxed">
            {SECTIONS.map((s) => (
              <div key={s.h}>
                <h2 className="font-fredoka text-cocoa font-semibold text-lg mb-2">{s.h}</h2>
                {s.body && s.body.map((p, i) => <p key={i} className="mb-2 last:mb-0">{p}</p>)}
                {s.list && (
                  <ul className="flex flex-col gap-2 list-disc ml-5">
                    {s.list.map((item) => (
                      <li key={item.h}>
                        <b className="font-fredoka text-cocoa font-semibold">{item.h}:</b> {item.d}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
