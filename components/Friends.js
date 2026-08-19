import Image from 'next/image';
import { CREW } from '@/lib/data';
import { Box, Sun, Leaf, Popcorn, Music, Carrot, PawPrint } from 'lucide-react';

const DOODLES = {
  georgie: Box,
  maple: Sun,
  sprout: Leaf,
  cleo: Popcorn,
  felix: Music,
  winnie: Carrot,
};

const ACCENT_STYLES = {
  yellow: { bg: 'bg-pale-yellow', border: 'border-line-yellow', ink: 'text-[#8A6D14]' },
  mint: { bg: 'bg-mint', border: 'border-line-mint', ink: 'text-[#2F6B4C]' },
  peach: { bg: 'bg-peach', border: 'border-line-peach', ink: 'text-[#A15A22]' },
  teal: { bg: 'bg-teal', border: 'border-line-teal', ink: 'text-[#2E7B72]' },
};

function cardStyle(c) {
  if (c.accent) return ACCENT_STYLES[c.accent];
  if (c.gender === 'female') return { bg: 'bg-blush', border: 'border-line-pink', ink: 'text-coral-deep' };
  return { bg: 'bg-cream', border: 'border-line-blue', ink: 'text-navy-soft' };
}

function ScrapbookCard({ c, rotate, size = 'md' }) {
  const style = cardStyle(c);
  const Doodle = DOODLES[c.key];
  const big = size === 'lg';

  return (
    <div className="relative">
      <Doodle
        className={`absolute -top-4 -left-3 w-7 h-7 ${style.ink} opacity-70 -rotate-12 hidden sm:block`}
        strokeWidth={1.75}
      />

      <div
        className={`relative ${style.bg} border-[2.5px] ${style.border} rounded-[26px] px-6 pt-8 pb-6 text-center shadow-[3px_4px_0_rgba(107,70,50,0.08)] transition hover:-translate-y-1 hover:shadow-[4px_6px_0_rgba(107,70,50,0.12)]`}
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        <span
          className="absolute -top-4 left-1/2 -translate-x-1/2 inline-block bg-white border-2 border-cocoa/10 rounded-lg px-3 py-1 shadow-[2px_3px_0_rgba(0,0,0,0.1)] font-fredoka font-bold text-[0.7rem] tracking-wide text-cocoa whitespace-nowrap"
          style={{ transform: `translateX(-50%) rotate(${-rotate * 1.4}deg)` }}
        >
          {c.emoji} {c.title.toUpperCase()}
        </span>

        <Image
          src={`/images/${c.img}`}
          alt={c.name}
          width={big ? 260 : 190}
          height={big ? 260 : 190}
          className={`mx-auto mb-2 object-contain drop-shadow-md ${big ? 'w-[210px] h-[210px]' : 'w-[180px] h-[180px]'}`}
        />

        <h3 className="font-fredoka font-bold text-cocoa text-2xl mb-1">{c.name}</h3>
        <p className="text-sm text-navy font-medium leading-snug mb-3">{c.bio}</p>

        <p className="font-fredoka font-semibold text-[0.7rem] tracking-wide uppercase text-navy-soft/80">
          Likes: <span className="normal-case font-medium">{c.likes.join(' • ')}</span>
        </p>

        <span
          className="absolute -bottom-3 right-3 font-handwritten text-2xl text-coral-deep whitespace-nowrap"
          style={{ transform: `rotate(${rotate < 0 ? 4 : -4}deg)` }}
        >
          {c.note}
        </span>
      </div>
    </div>
  );
}

const PAW_SCATTER = [
  { top: '3%', left: '6%', size: 20, rotate: -18, color: 'peach' },
  { top: '6%', left: '92%', size: 16, rotate: 24, color: 'pink' },
  { top: '16%', left: '46%', size: 14, rotate: -10, color: 'pink' },
  { top: '20%', left: '16%', size: 16, rotate: 8, color: 'pink' },
  { top: '18%', left: '80%', size: 18, rotate: -14, color: 'peach' },
  { top: '35%', left: '3%', size: 18, rotate: 18, color: 'peach' },
  { top: '40%', left: '96%', size: 16, rotate: -22, color: 'pink' },
  { top: '55%', left: '9%', size: 18, rotate: 12, color: 'pink' },
  { top: '58%', left: '90%', size: 16, rotate: -10, color: 'peach' },
  { top: '75%', left: '18%', size: 16, rotate: 20, color: 'peach' },
  { top: '78%', left: '80%', size: 18, rotate: -16, color: 'pink' },
  { top: '92%', left: '42%', size: 16, rotate: 10, color: 'peach' },
  { top: '95%', left: '65%', size: 14, rotate: -20, color: 'pink' },
];

const PAW_COLORS = {
  peach: 'text-[#A15A22]',
  pink: 'text-coral-deep',
};

function PawTrail() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {PAW_SCATTER.map((p, i) => (
        <PawPrint
          key={i}
          className={`absolute opacity-20 ${PAW_COLORS[p.color]}`}
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            transform: `rotate(${p.rotate}deg)`,
          }}
          strokeWidth={2}
        />
      ))}
    </div>
  );
}

export default function Friends() {
  const georgie = CREW.find((c) => c.key === 'georgie');
  const maple = CREW.find((c) => c.key === 'maple');
  const sprout = CREW.find((c) => c.key === 'sprout');
  const felix = CREW.find((c) => c.key === 'felix');
  const winnie = CREW.find((c) => c.key === 'winnie');
  const cleo = CREW.find((c) => c.key === 'cleo');

  return (
    <section id="friends" className="relative bg-blue px-5 py-16 overflow-hidden">
      <div className="max-w-[1050px] mx-auto text-center relative">
        <span className="inline-block font-fredoka font-semibold text-xs tracking-widest uppercase text-coral-deep bg-blush rounded-full px-4 py-1 mb-3">
          Meet the Crew
        </span>
        <h2 className="font-fredoka font-bold text-cocoa text-3xl sm:text-4xl mb-2">Georgie&apos;s friends</h2>
        <p className="text-navy-soft font-medium max-w-2xl mx-auto mb-12">
          Georgiekins isn&apos;t just about cats! Meet the whole family — six best friends with six
          very different personalities, hosted by Georgie himself.
        </p>

        <PawTrail />

        {/* Featured: Georgie */}
        <div className="relative z-10 flex flex-col items-center mb-16">
          <p className="font-handwritten text-3xl text-coral-deep -rotate-2 mb-7">
            Hi, I&apos;m Georgie! Meet my crew ↓
          </p>
          <div className="max-w-xs">
            <ScrapbookCard c={georgie} rotate={-1} size="lg" />
          </div>
        </div>

        {/* Maple + Sprout + Felix */}
        <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 max-w-4xl mx-auto mb-16">
          <ScrapbookCard c={maple} rotate={-2} />
          <ScrapbookCard c={sprout} rotate={2} />
          <ScrapbookCard c={felix} rotate={-1.5} />
        </div>

        {/* Winnie + Cleo */}
        <div className="relative z-10 grid sm:grid-cols-2 gap-x-8 gap-y-16 max-w-2xl mx-auto">
          <ScrapbookCard c={winnie} rotate={1.5} />
          <ScrapbookCard c={cleo} rotate={-1} />
        </div>
      </div>
    </section>
  );
}
