import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Georgiekins',
  description: 'How Georgiekins collects, uses, and protects your information.',
};

const SECTIONS = [
  {
    h: 'Overview',
    body: [
      "This Privacy Policy explains what information Georgiekins (\"we,\" \"us,\" or \"our\") collects when you visit georgiekins.com, sign up for a free printable, or purchase a digital product, and how that information is used and protected.",
    ],
  },
  {
    h: 'Information We Collect',
    list: [
      { h: 'Email address', d: 'Collected when you check out, sign up for a freebie, or use our contact form, so we can deliver your files and respond to you.' },
      { h: 'Name and message', d: 'Collected only if you submit our contact form, so we can reply to your question.' },
      { h: 'Payment information', d: "Handled entirely by Stripe, our payment processor. We never see or store your full card number — Stripe's own privacy policy governs how they handle it." },
      { h: 'Basic technical data', d: 'Like most websites, our hosting provider automatically logs standard technical information (such as IP address and browser type) for security and performance purposes.' },
    ],
  },
  {
    h: 'How We Use Your Information',
    list: [
      { h: 'Order fulfillment', d: 'To email you the digital printables you purchased or requested for free.' },
      { h: 'Customer support', d: 'To respond to questions submitted through our contact form.' },
      { h: 'Order notifications', d: "To confirm your purchase and keep a record in case you need help later." },
    ],
  },
  {
    h: 'Cookies & Tracking',
    body: [
      "Georgiekins does not use advertising cookies or third-party analytics/tracking scripts. Your shopping cart is stored temporarily in your browser's memory for your current visit only and is not saved to a cookie or file.",
    ],
  },
  {
    h: 'Third-Party Services',
    list: [
      { h: 'Stripe', d: 'Processes all payments securely. See stripe.com/privacy for details.' },
      { h: 'Email delivery', d: 'We use a standard email service to send order confirmations, freebie downloads, and replies to contact form messages.' },
    ],
  },
  {
    h: 'Data Retention',
    body: [
      'We keep order and contact records only as long as needed to provide support, fulfill legal or accounting obligations, and improve our shop. You can request deletion of your information at any time (see "Your Rights" below).',
    ],
  },
  {
    h: 'Your Rights',
    body: [
      "You can ask us to access, correct, or delete the personal information we hold about you, or ask us to stop emailing you, at any time by contacting support@georgiekins.com. We never sell your personal information to anyone.",
    ],
  },
  {
    h: "Children's Privacy",
    body: [
      "Georgiekins is not directed at children, and we do not knowingly collect personal information from anyone under 13. If you believe a child has provided us with personal information, please contact us and we will delete it.",
    ],
  },
  {
    h: 'Changes to This Policy',
    body: [
      'We may update this Privacy Policy from time to time. Any changes will be posted on this page with a new effective date.',
    ],
  },
  {
    h: 'Contact Us',
    body: [
      'Questions about this policy? Reach us any time at support@georgiekins.com.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="bg-blush">
      <div className="max-w-[760px] mx-auto px-5 py-14">
        <p className="text-sm text-navy-soft font-semibold mb-4">
          <Link href="/" className="hover:text-coral-deep">Home</Link>
          {' / '}
          Privacy Policy
        </p>

        <div className="bg-cream border-[2.5px] border-dashed border-line-pink rounded-[28px] p-7 sm:p-9">
          <span className="inline-block font-fredoka font-semibold text-xs text-coral-deep bg-blush rounded-full px-4 py-1.5 mb-4">
            🔒 Legal
          </span>
          <h1 className="font-fredoka font-bold text-cocoa text-3xl sm:text-4xl leading-tight mb-2">
            Privacy Policy
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
