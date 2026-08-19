'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CREW, FACTS } from '@/lib/data';
import { MousePointerClick, Shuffle, Quote } from 'lucide-react';

export default function Facts() {
  const [pet, setPet] = useState('georgie');
  const [idx, setIdx] = useState(0);

  const current = CREW.find((c) => c.key === pet);
  const facts = FACTS[pet];
  const fact = facts[idx];

  function pick(key) {
    if (key === pet) {
      setIdx((i) => (i + 1) % FACTS[key].length);
    } else {
      setPet(key);
      setIdx(0);
    }
  }

  function surprise() {
    const keys = CREW.map((c) => c.key);
    const key = keys[Math.floor(Math.random() * keys.length)];
    setPet(key);
    setIdx((prev) => (key === pet ? (prev + 1) % FACTS[key].length : 0));
  }

  return (
    <section id="facts" className="bg-blue px-5 py-14">
      <div className="max-w-[1050px] mx-auto text-center">
        <span className="inline-block font-fredoka font-semibold text-xs tracking-widest uppercase text-navy bg-blue-deep rounded-full px-4 py-1 mb-3">
          Georgie&apos;s Fact Corner
        </span>
        <h2 className="font-fredoka font-bold text-cocoa text-3xl sm:text-4xl mb-2">Did you know…?</h2>
        <p className="text-navy-soft font-medium max-w-xl mx-auto mb-8">
          Tap a friend below and they&apos;ll share one of their own surprising little facts — or hit shuffle for a surprise!
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="inline-flex items-center gap-2 font-fredoka font-semibold text-cocoa text-xl mb-4">
              <MousePointerClick className="w-5 h-5 text-coral-deep" strokeWidth={2.25} />
              Tap a friend to hear their fact!
            </p>
            <div className="grid grid-cols-3 gap-3">
              {CREW.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => pick(c.key)}
                  className={`flex flex-col items-center gap-1 rounded-[22px] py-3 px-2 font-fredoka font-semibold text-sm text-cocoa bg-cream border-[2.5px] transition hover:-translate-y-1 ${
                    pet === c.key
                      ? c.gender === 'female'
                        ? 'border-solid border-line-pink bg-white shadow-lg -translate-y-1'
                        : 'border-solid border-line-blue bg-white shadow-lg -translate-y-1'
                      : c.gender === 'female'
                      ? 'border-dashed border-line-pink'
                      : 'border-dashed border-line-blue'
                  }`}
                >
                  <Image src={`/images/${c.img}`} alt="" width={64} height={64} className="w-16 h-16 object-contain" />
                  {c.name}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={surprise}
              className="mt-5 inline-flex items-center gap-2 font-fredoka font-semibold rounded-full px-6 py-2.5 text-white bg-coral shadow-[0_4px_0_#EE7295] hover:-translate-y-0.5 transition"
            >
              <Shuffle className="w-4 h-4" strokeWidth={2.5} />
              Surprise me!
            </button>
          </div>

          <div className="relative bg-cream rounded-[30px] border-[2.5px] border-dashed border-line-pink p-7 min-h-[220px] flex flex-col items-center justify-center text-center">
            <Quote className="w-7 h-7 text-line-pink mb-2" strokeWidth={2} fill="currentColor" />
            <Image
              src={`/images/${current.img}`}
              alt=""
              width={72}
              height={72}
              className="w-[72px] h-[72px] object-contain mb-2 drop-shadow"
            />
            <span className="font-fredoka font-semibold text-coral-deep text-base mb-2">{current.name} says…</span>
            <p key={`${pet}-${idx}`} className="text-lg font-semibold text-navy fact-fade">
              {fact}
            </p>

            {facts.length > 1 && (
              <p className="text-xs text-navy-soft font-semibold mt-2">
                Tap {current.name} again for another fact →
              </p>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .fact-fade {
          animation: factFadeIn 0.35s ease-out;
        }
        @keyframes factFadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
