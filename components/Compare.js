import { NotebookPen, Briefcase, GraduationCap, Package, Check, ShoppingCart } from 'lucide-react';

const PRODUCTS = [
  {
    Icon: NotebookPen,
    badge: 'bg-blue-deep text-navy',
    name: 'Pet Journal',
    desc: 'Tracking memories, routines, and milestones',
    price: '$5',
    features: [
      'Pet profile & "at a glance" page',
      'Daily & weekly care trackers',
      'Vet visit log',
      'Fun milestones & bucket list pages',
    ],
  },
  {
    Icon: Briefcase,
    badge: 'bg-blush text-coral-deep',
    name: 'Sitter Guide',
    desc: 'Leaving clear instructions for a pet sitter',
    price: '$5',
    features: [
      'Daily routine schedule (fed, water, litter, play)',
      'Feeding instructions & do-not-feed list',
      'In-case-of-emergency contacts page',
      'Care & cost authorization page',
    ],
  },
  {
    Icon: GraduationCap,
    badge: 'bg-[#EFF6EA] text-[#5B7A4C]',
    name: 'New Pet Parent Guide',
    desc: 'Preparing for a new pet',
    price: '$5',
    features: [
      'Getting-started checklist',
      'Feeding basics & safety tips',
      'Health & vet care schedule',
      'Common questions, answered',
    ],
  },
  {
    Icon: Package,
    badge: 'bg-coral-deep text-white',
    name: 'Full Kit',
    desc: 'Sitter kit, new pet parent kit, and pet journal together',
    price: '$12',
    features: [
      'Everything in the Journal',
      'Everything in the Sitter Guide',
      'Everything in the New Pet Parent Guide',
      'One combined download, ready to print',
    ],
    highlight: true,
  },
];

export default function Compare() {
  return (
    <section id="compare" className="bg-blue px-5 py-14">
      <div className="max-w-[1050px] mx-auto text-center">
        <span className="inline-block font-fredoka font-semibold text-xs tracking-widest uppercase text-coral-deep bg-blush rounded-full px-4 py-1 mb-3">
          Not Sure Where to Start?
        </span>
        <h2 className="font-fredoka font-bold text-cocoa text-3xl sm:text-4xl mb-2">
          Pick your perfect printable
        </h2>
        <p className="text-navy-soft font-medium max-w-xl mx-auto mb-2">
          A quick guide to help you choose — or just grab the Full Kit and get everything at once.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-[1050px] mx-auto my-8 items-stretch">
          {PRODUCTS.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col items-center text-center rounded-[22px] border-[2.5px] border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
                p.highlight ? 'bg-blush border-line-pink' : 'bg-cream border-line-blue'
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap font-fredoka font-semibold text-[0.68rem] text-white bg-coral-deep rounded-full px-3 py-1 shadow">
                  Best Value
                </span>
              )}
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${p.badge}`}>
                <p.Icon className="w-7 h-7" strokeWidth={2} />
              </div>
              <b className="font-fredoka text-cocoa text-base mb-3">{p.name}</b>
              <span className="font-fredoka font-semibold text-[0.65rem] tracking-wide uppercase text-navy-soft/70 mb-1">
                Best for
              </span>
              <p className="text-sm text-navy font-semibold leading-snug mb-4">{p.desc}</p>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-fredoka font-bold text-coral-deep text-xl">{p.price}</span>
                {p.priceNote && <span className="text-[0.65rem] font-bold text-sage">{p.priceNote}</span>}
              </div>

              <div className={`w-full border-t ${p.highlight ? 'border-line-pink' : 'border-line-blue/70'} pt-4`}>
                <span className="font-fredoka font-semibold text-[0.65rem] tracking-wide uppercase text-navy-soft/70 mb-2 block">
                  What&apos;s included
                </span>
                <ul className="space-y-1.5 text-left w-full">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-1.5 text-xs text-navy font-medium leading-snug">
                      <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-sage" strokeWidth={3} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <a
          href="#shop"
          className="inline-flex items-center gap-2 font-fredoka font-semibold rounded-full px-7 py-3 text-navy bg-cream border-2 border-dashed border-line-blue hover:-translate-y-0.5 transition"
        >
          <ShoppingCart className="w-4 h-4" strokeWidth={2.5} />
          Browse the shop
        </a>
      </div>
    </section>
  );
}
