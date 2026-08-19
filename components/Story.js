'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function Story() {
  const lastWordRef = useRef(null);
  const [spin, setSpin] = useState(false);

  useEffect(() => {
    const el = lastWordRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSpin(true);
          observer.disconnect();
        }
      },
      { threshold: 1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function replaySpin() {
    setSpin(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setSpin(true));
    });
  }

  return (
    <section id="story" className="bg-blue px-5 py-14">
      <div className="max-w-[1050px] mx-auto flex flex-col md:flex-row items-center gap-10">
        <button
          type="button"
          onClick={replaySpin}
          aria-label="Georgie the cat — tap for a spin"
          className="flex-shrink-0 cursor-pointer rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral focus-visible:outline-offset-4"
        >
          <Image
            src="/images/realgeorge.png"
            alt="Georgie, the real cat behind Georgiekins"
            width={220}
            height={275}
            className={`w-[220px] h-auto drop-shadow-lg pointer-events-none ${spin ? 'animate-spin-flip' : ''}`}
          />
        </button>
        <div className="flex-1 text-center md:text-left">
          <span className="inline-block font-fredoka font-semibold text-xs tracking-widest uppercase text-navy bg-blue-deep rounded-full px-4 py-1 mb-3">
            How Georgiekins Began
          </span>
          <h2 className="font-fredoka font-bold text-cocoa text-3xl sm:text-4xl mb-4">Meet the real Georgie</h2>
          <p className="text-navy font-medium leading-relaxed mb-4">
            Georgie isn&apos;t just a mascot — he&apos;s a real, very opinionated cat who supervises
            every part of this business from the top of the couch. Georgiekins started as a
            handful of care notes scribbled for a pet sitter, and turned into a whole cozy corner
            for pet lovers <span ref={lastWordRef}>everywhere.</span>
          </p>
          <p className="text-navy font-medium leading-relaxed mb-4">
            I wanted pet care to feel a little less overwhelming and a lot more joyful — less
            &quot;frantic sticky notes before a trip,&quot; more &quot;cute journal you actually
            enjoy filling out.&quot; Every printable is made the way I wished pet care resources
            looked when I brought my own first pet home.
          </p>
          <p className="text-navy-soft font-medium">
            With purrs,
            <br />
            <b className="font-fredoka text-cocoa">The human behind Georgiekins</b> 🐾
          </p>
        </div>
      </div>
    </section>
  );
}
