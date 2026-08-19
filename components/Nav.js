'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useCart } from './CartContext';

const LINKS = [
  { href: '/#friends', label: 'Meet the Crew' },
  { href: '/#peek', label: 'Peek Inside' },
  { href: '/#shop', label: 'Shop' },
  { href: '/library', label: 'Pet Care Library' },
  { href: '/#freebie', label: 'Freebies' },
  { href: '/#faq', label: 'FAQ' },
];

function CartButton({ count, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open shopping cart"
      className="relative rounded-full bg-blush border-2 border-dashed border-line-pink px-3 py-1.5 text-lg hover:bg-blush-deep hover:-translate-y-0.5 transition"
    >
      🛒
      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 rounded-full bg-coral-deep text-white text-xs font-fredoka font-semibold flex items-center justify-center px-1">
          {count}
        </span>
      )}
    </button>
  );
}

export default function Nav() {
  const { count, setOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b-2 border-dashed border-line-pink">
      <div className="max-w-[1100px] mx-auto flex items-center justify-between gap-4 px-5 py-3">
        <Link href="/" className="flex items-center" onClick={() => setMenuOpen(false)}>
          <Image src="/images/logo.png" alt="Georgiekins — home" width={160} height={52} className="h-11 w-auto" priority />
        </Link>

        <div className="hidden md:flex items-center gap-1 flex-wrap">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="navlink">
              {l.label}
            </Link>
          ))}
          <div className="ml-1">
            <CartButton count={count} onClick={() => setOpen(true)} />
          </div>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <CartButton count={count} onClick={() => setOpen(true)} />
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="p-2"
          >
            {menuOpen ? (
              <X className="w-5 h-5 text-coral-deep" strokeWidth={2.5} />
            ) : (
              <Menu className="w-5 h-5 text-coral-deep" strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t-2 border-dashed border-line-pink px-5 py-3 flex flex-col gap-1 bg-cream"
        >
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="navlink-mobile">
              {l.label}
            </Link>
          ))}
        </div>
      )}

      <style jsx global>{`
        .navlink {
          text-decoration: none;
          color: #2E4C7E;
          font-weight: 600;
          font-size: 0.92rem;
          padding: 0.45rem 0.85rem;
          border-radius: 999px;
          transition: background 0.2s, color 0.2s;
        }
        .navlink:hover {
          background: #FBE0E8;
          color: #EE7295;
        }
        .navlink-mobile {
          text-decoration: none;
          color: #2E4C7E;
          font-weight: 600;
          font-size: 1rem;
          padding: 0.75rem 0.9rem;
          border-radius: 14px;
          transition: background 0.2s, color 0.2s;
        }
        .navlink-mobile:hover,
        .navlink-mobile:active {
          background: #FBE0E8;
          color: #EE7295;
        }
      `}</style>
    </nav>
  );
}
