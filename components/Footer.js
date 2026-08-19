'use client';

import { useState } from 'react';
import Link from 'next/link';
import ContactForm from './ContactForm';

const LEGAL = {
  digital: {
    title: 'Digital Download Policy',
    body: "All Georgiekins products are instant digital downloads (PDF format). No physical items are shipped. After checkout, you'll receive a download link by email — please save your files, as this is your permanent access.",
  },
  refund: {
    title: 'Refund Policy',
    body: "Because our products are instant digital downloads, all sales are generally final. If you experience a technical issue, contact us and we'll make it right.",
  },
  disclaimer: {
    title: 'Pet Care Disclaimer',
    body: "Georgiekins printables are organizational and educational tools, not veterinary advice. Always consult a licensed veterinarian about your pet's health.",
  },
};

export default function Footer() {
  const [modal, setModal] = useState(null);

  return (
    // Plain block-level footer — no `sticky`/`fixed` positioning, so it only
    // appears at the bottom of the page content and never pins while scrolling.
    <footer className="relative bg-blush border-t-2 border-line-pink pt-8 pb-8 px-5 text-center">
      <div className="font-fredoka font-semibold text-xl text-cocoa">Georgiekins</div>
      <p className="mt-1 text-sm text-navy-soft font-semibold">
        Made with love for furry, feathered, and scaly friends everywhere.
      </p>
      <nav className="flex flex-wrap justify-center gap-x-4 gap-y-1 my-4" aria-label="Footer">
        <button type="button" onClick={() => setModal('contact')} className="footlink">Contact</button>
        <Link href="/#faq" className="footlink">FAQ</Link>
        <button type="button" onClick={() => setModal('digital')} className="footlink">Digital Download Policy</button>
        <button type="button" onClick={() => setModal('refund')} className="footlink">Refund Policy</button>
        <Link href="/terms" className="footlink">Terms &amp; Conditions</Link>
        <Link href="/privacy" className="footlink">Privacy Policy</Link>
        <button type="button" onClick={() => setModal('disclaimer')} className="footlink">Pet Care Disclaimer</button>
      </nav>
      <p className="text-sm text-navy-soft font-semibold">© 2026 Georgiekins · support@georgiekins.com</p>
      <div className="mt-2 opacity-60 tracking-[0.6rem] text-sm" aria-hidden="true">🐾 💗 🐾</div>

      {modal && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-navy/45"
          onClick={() => setModal(null)}
        >
          <div
            className="relative bg-cream border-2 border-line-blue rounded-[26px] max-w-md w-full max-h-[80vh] overflow-y-auto p-8 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setModal(null)}
              aria-label="Close"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-blush text-navy-soft"
            >
              ✕
            </button>
            {modal === 'contact' ? (
              <ContactForm />
            ) : (
              <>
                <h3 className="font-fredoka font-semibold text-xl text-cocoa mb-3">{LEGAL[modal].title}</h3>
                <p className="text-sm text-navy leading-relaxed">{LEGAL[modal].body}</p>
              </>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .footlink {
          font-size: 0.8rem;
          color: #4B679B;
          font-weight: 700;
          background: none;
          border: none;
          cursor: pointer;
          text-decoration: none;
        }
        .footlink:hover {
          color: #EE7295;
          text-decoration: underline;
        }
      `}</style>
    </footer>
  );
}
