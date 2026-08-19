import Image from 'next/image';
import { PET_PRODUCTS } from '@/lib/data';
import {
  NotebookPen,
  Utensils,
  Pill,
  Stethoscope,
  Siren,
  CheckSquare,
  StickyNote,
  Heart,
  PawPrint,
  ShoppingCart,
} from 'lucide-react';

const PREVIEWS = [
  { src: '/images/prev_activity_daily_routine.png', alt: 'My Daily Routine page' },
  { src: '/images/prev_activity_at_a_glance.png', alt: 'My Cat at a Glance profile page' },
  { src: '/images/prev_activity_feeding.png', alt: 'Feeding Basics page' },
  { src: '/images/prev_activity_vet.png', alt: 'Health and Vet Care page' },
  { src: '/images/prev_activity_emergency.png', alt: 'In Case of Emergency page' },
  { src: '/images/prev_activity_bucket_list.png', alt: 'My Bucket List page' },
];

const TOTAL_PAGES = 33;
const MORE_PAGES = TOTAL_PAGES - PREVIEWS.length;

const INCLUDES = [
  { Icon: NotebookPen, label: 'Pet profile' },
  { Icon: Utensils, label: 'Feeding schedule' },
  { Icon: Pill, label: 'Medication tracker' },
  { Icon: Stethoscope, label: 'Vet information' },
  { Icon: Siren, label: 'Emergency contacts' },
  { Icon: CheckSquare, label: 'Daily care checklist' },
  { Icon: StickyNote, label: 'Sitter notes' },
  { Icon: Heart, label: 'Favorite things' },
];

export default function Peek() {
  return (
    <section id="peek" className="bg-blue px-5 py-14">
      <div className="max-w-[1050px] mx-auto text-center">
        <span className="inline-block font-fredoka font-semibold text-xs tracking-widest uppercase text-navy bg-blue-deep rounded-full px-4 py-1 mb-3">
          See Before You Buy — Available for 6 Pets
        </span>
        <h2 className="font-fredoka font-bold text-cocoa text-3xl sm:text-4xl mb-3">
          Peek inside a Georgiekins Care Kit
        </h2>

        <div className="flex items-start justify-center gap-4 sm:gap-6 flex-wrap mb-5">
          {PET_PRODUCTS.map((pet) => (
            <div key={pet.key} className="flex flex-col items-center gap-1">
              <Image src={`/images/${pet.img}`} alt="" width={32} height={32} className="w-8 h-8 object-contain" />
              <span className="font-fredoka font-semibold text-[0.65rem] text-navy-soft whitespace-nowrap">
                {pet.species}
              </span>
            </div>
          ))}
        </div>
        <p className="text-sm text-navy-soft font-semibold max-w-xl mx-auto mb-6">
          Every pet above gets a matching Care Kit — the <strong>Cat Care Kit</strong> is shown
          below as our example since its previews are ready first.
        </p>

        <p className="text-navy-soft font-medium max-w-xl mx-auto mb-6">
          Real pages from the actual PDFs — not mockups. This kit is a mix of all three
          printables: the <strong>Pet Journal</strong>, <strong>Sitter Guide</strong>, and{' '}
          <strong>New Pet Parent Guide</strong> — here&apos;s a page from each.
        </p>

        <div className="flex gap-4 overflow-x-auto py-6 px-1 snap-x">
          {PREVIEWS.map((p) => (
            <Image
              key={p.src}
              src={p.src}
              alt={p.alt}
              width={220}
              height={280}
              className="h-[260px] w-auto flex-none rounded-2xl border-4 border-white shadow-lg snap-start bg-white"
            />
          ))}
          <div className="h-[260px] w-[180px] flex-none flex flex-col items-center justify-center gap-1 rounded-2xl border-[2.5px] border-dashed border-line-blue bg-cream snap-start">
            <span className="font-fredoka font-bold text-3xl text-coral-deep">+{MORE_PAGES}</span>
            <span className="text-xs font-bold text-navy-soft text-center px-4">more pages inside the full kit</span>
          </div>
        </div>

        <div className="flex justify-center gap-9 flex-wrap my-6">
          {[
            [String(TOTAL_PAGES), 'pages total'],
            ['PDF', 'instant download'],
            ['US Letter', '8.5" × 11"'],
            ['∞', 'reprint at home'],
          ].map(([big, small]) => (
            <div key={small} className="flex flex-col items-center gap-0.5">
              <b className="font-fredoka text-2xl text-cocoa">{big}</b>
              <span className="text-xs font-bold text-navy-soft">{small}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {INCLUDES.map(({ Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 bg-cream border-2 border-line-blue rounded-full px-4 py-1.5 text-sm font-bold text-navy"
            >
              <Icon className="w-4 h-4 text-coral-deep" strokeWidth={2.25} />
              {label}
            </span>
          ))}
        </div>
        <p className="text-sm text-navy-soft font-semibold max-w-xl mx-auto mb-5">
          Works on any device — print at home or fill in digitally on an iPad or tablet with an
          annotation app.
        </p>
        <a
          href="#shop"
          className="inline-flex items-center gap-2 font-fredoka font-semibold rounded-full px-7 py-3 text-white bg-coral shadow-[0_4px_0_#EE7295] hover:-translate-y-0.5 transition"
        >
          <ShoppingCart className="w-4 h-4" strokeWidth={2.5} />
          See everything included
        </a>
        <p className="mt-5 inline-flex items-center gap-1.5 text-sm text-navy-soft italic font-medium">
          <PawPrint className="w-4 h-4" strokeWidth={2.25} />
          Dog, gecko, guinea pig, bird &amp; bunny kits are available now too — page previews for
          them are on the way, the crew is working on it!
        </p>
      </div>
    </section>
  );
}
