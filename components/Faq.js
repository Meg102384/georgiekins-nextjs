'use client';

import { useState } from 'react';
import {
  Download,
  Mail,
  Tablet,
  Printer,
  Ruler,
  RefreshCw,
  PawPrint,
  FileText,
  ShieldCheck,
  Stethoscope,
  ChevronDown,
} from 'lucide-react';

const CATEGORIES = [
  {
    label: 'Digital Downloads',
    Icon: Download,
    badge: 'bg-blue-deep text-navy',
    items: [
      {
        q: 'Is this a physical product?',
        a: "No — every Georgiekins printable is a digital PDF download. Nothing is mailed to you; you'll print at home (or use it digitally) as soon as you check out.",
        Icon: Download,
      },
      {
        q: 'How will I receive my files?',
        a: "Right after checkout you'll get a download link on the confirmation page and by email. Keep that email safe — it's your permanent access to the files.",
        Icon: Mail,
      },
    ],
  },
  {
    label: 'Printing & Devices',
    Icon: Printer,
    badge: 'bg-blush text-coral-deep',
    items: [
      {
        q: 'Can I use the kit on an iPad?',
        a: 'Absolutely! Our printables work beautifully with annotation apps like GoodNotes, Notability, or the Apple Notes markup tool — fill them in digitally with no printing needed.',
        Icon: Tablet,
      },
      {
        q: 'Can I print the pages at home?',
        a: 'Yes! Every page is formatted for standard home printers on US Letter paper. No special paper or printer required.',
        Icon: Printer,
      },
      {
        q: 'What size are the pages?',
        a: 'All Georgiekins PDFs are sized at 8.5" × 11" (US Letter), the standard size for home and office printers.',
        Icon: Ruler,
      },
    ],
  },
  {
    label: 'Multi-Pet Families',
    Icon: PawPrint,
    badge: 'bg-[#EFF6EA] text-[#5B7A4C]',
    items: [
      {
        q: 'Can I reuse the printables?',
        a: 'Yes — trackers, checklists, and journal pages are designed to be printed again and again for your own personal, non-commercial use.',
        Icon: RefreshCw,
      },
      {
        q: 'What if I have more than one pet?',
        a: 'Print an extra copy of the profile, tracker, or journal pages for each pet! Or check out our multi-pet bundles in the shop for a discount.',
        Icon: PawPrint,
      },
      {
        q: 'Can I purchase individual pages?',
        a: 'Not yet — printables are currently sold as full journals, trackers, guides, or kits. Individual à la carte pages may be added in the future!',
        Icon: FileText,
      },
    ],
  },
  {
    label: 'Purchases & Policies',
    Icon: ShieldCheck,
    badge: 'bg-blush-deep text-coral-deep',
    items: [
      {
        q: 'Are refunds available for digital downloads?',
        a: "Because these are instant digital downloads, all sales are generally final. If something's gone wrong on our end, reach out — we'll always make it right. See our full Refund Policy in the footer.",
        Icon: ShieldCheck,
      },
    ],
  },
  {
    label: 'Health & Safety',
    Icon: Stethoscope,
    badge: 'bg-cream text-navy border-2 border-line-blue',
    items: [
      {
        q: 'Is the care information veterinary advice?',
        a: 'No. Georgiekins printables are organizational tools and general educational content, not veterinary advice. Always consult a licensed veterinarian for medical questions about your pet.',
        Icon: Stethoscope,
      },
    ],
  },
];

export default function Faq() {
  const [openKey, setOpenKey] = useState(null);

  return (
    <section id="faq" className="bg-blue px-5 py-14">
      <div className="max-w-[1050px] mx-auto text-center">
        <span className="inline-block font-fredoka font-semibold text-xs tracking-widest uppercase text-coral-deep bg-blush rounded-full px-4 py-1 mb-3">
          Good to Know
        </span>
        <h2 className="font-fredoka font-bold text-cocoa text-3xl sm:text-4xl mb-4">Frequently asked questions</h2>
        <p className="text-sm font-bold text-coral-deep mb-8">
          📥 Instant digital download. No physical product will be shipped.
        </p>

        <div className="max-w-[700px] mx-auto text-left space-y-8">
          {CATEGORIES.map((cat) => (
            <div key={cat.label}>
              <div
                className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-fredoka font-bold uppercase tracking-wide mb-3 ${cat.badge}`}
              >
                <cat.Icon className="w-4 h-4" strokeWidth={2.25} />
                {cat.label}
              </div>
              <div className="space-y-3">
                {cat.items.map((item) => {
                  const key = `${cat.label}-${item.q}`;
                  const open = openKey === key;
                  return (
                    <div
                      key={key}
                      className={`bg-cream rounded-2xl border-2 transition ${
                        open ? 'border-coral shadow-md' : 'border-line-blue hover:border-coral/60'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenKey(open ? null : key)}
                        className="w-full flex items-center gap-3 px-5 py-4 text-left"
                      >
                        <item.Icon className="w-5 h-5 text-coral-deep flex-shrink-0" strokeWidth={2} />
                        <span className="flex-1 font-quicksand font-bold text-cocoa">{item.q}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-coral-deep flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
                          strokeWidth={2.5}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-[max-height] duration-300 ${
                          open ? 'max-h-52' : 'max-h-0'
                        }`}
                      >
                        <p className="pl-[3.25rem] pr-5 pb-4 text-sm text-navy-soft font-medium leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
