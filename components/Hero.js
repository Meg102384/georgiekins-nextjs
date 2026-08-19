import Image from 'next/image';

export default function Hero() {
  return (
    <header
      id="top"
      className="relative overflow-hidden px-5 pt-14 pb-20"
      style={{ background: 'linear-gradient(180deg,#FDE9EF 0%,#FBE0E8 55%,#DDECFA 100%)' }}
    >
      <div className="max-w-[780px] mx-auto flex flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 bg-cream border-2 border-line-pink rounded-full px-4 py-1.5 text-sm font-bold text-coral-deep mb-4 tracking-wide">
          🐱 Hosted by Georgie the cat
        </span>
        <h1 className="font-fredoka font-bold text-cocoa leading-[1.08] mb-4 text-[2.5rem] sm:text-[3.2rem] lg:text-[3.9rem] max-w-[22ch]">
          A cozy corner for <span className="text-coral-deep">pet lovers</span>, big &amp; small
        </h1>
        <p className="text-lg text-navy-soft max-w-[33rem] mx-auto mb-7 font-medium">
          Hi, I&apos;m Georgie! I share adorable animal facts, helpful care tips, sweet stories, and
          everything that makes life with pets special — from whiskers and wags to feathers and
          tiny scaly toes.
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          <a
            href="#facts"
            className="font-fredoka font-semibold rounded-full px-7 py-3 text-white bg-coral shadow-[0_4px_0_#EE7295] hover:-translate-y-0.5 hover:shadow-[0_6px_0_#EE7295] transition"
          >
            Get a fun fact 🐾
          </a>
          <a
            href="#shop"
            className="font-fredoka font-semibold rounded-full px-7 py-3 text-navy bg-cream border-2 border-dashed border-line-blue hover:-translate-y-0.5 transition"
          >
            Browse goodies
          </a>
        </div>
        <div className="mt-9">
          <Image
            src="/images/georgie.png"
            alt="Georgie the cat"
            width={220}
            height={220}
            className="w-[min(60vw,220px)] h-auto animate-hero-bob drop-shadow-[0_14px_26px_rgba(238,114,149,0.28)]"
            priority
          />
        </div>
      </div>
    </header>
  );
}
