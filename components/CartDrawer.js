'use client';

import { useState } from 'react';
import { useCart } from './CartContext';

export default function CartDrawer() {
  const { items, changeQty, removeItem, count, total, open, setOpen } = useCart();
  const [notice, setNotice] = useState(null);
  const [checkingOut, setCheckingOut] = useState(false);
  const skus = Object.keys(items);

  async function checkout() {
    if (skus.length === 0) {
      setNotice('Your basket is empty! Add a goodie or two first.');
      return;
    }

    setCheckingOut(true);
    setNotice(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Checkout could not be started.');
      }

      window.location.href = data.url;
    } catch (error) {
      setNotice(error.message);
      setCheckingOut(false);
    }
  }

  return (
    <>
      <div
        className={`fixed inset-0 bg-navy/35 z-[90] transition-opacity ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`fixed top-0 right-0 h-dvh w-[min(400px,92vw)] z-[100] bg-cream border-l-2 border-line-pink flex flex-col transition-transform ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b-2 border-line-pink">
          <h3 className="font-fredoka text-cocoa text-xl">Your basket 🧺</h3>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close cart" className="text-navy-soft text-xl">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
          {skus.length === 0 ? (
            <div className="m-auto text-center text-navy-soft font-semibold px-4">
              <span className="text-4xl block mb-2">🐾</span>
              Your basket is empty!
              <br />
              Georgie recommends building a bundle.
            </div>
          ) : (
            skus.map((sku) => {
              const it = items[sku];
              return (
                <div key={sku} className="bg-white border-2 border-line-blue rounded-2xl px-4 py-3 flex items-center gap-3">
                  <span className="text-2xl">{it.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-fredoka font-semibold text-cocoa text-sm">{it.name}</div>
                    <div className="text-xs text-navy-soft font-semibold">${it.price} each</div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => changeQty(sku, -1)}
                      aria-label="Decrease quantity"
                      className="w-6.5 h-6.5 w-[26px] h-[26px] rounded-full bg-blush text-coral-deep font-bold"
                    >
                      −
                    </button>
                    <span className="font-fredoka font-semibold min-w-[1.2rem] text-center">{it.qty}</span>
                    <button
                      type="button"
                      onClick={() => changeQty(sku, 1)}
                      aria-label="Increase quantity"
                      className="w-[26px] h-[26px] rounded-full bg-blush text-coral-deep font-bold"
                    >
                      +
                    </button>
                  </div>
                  <button type="button" onClick={() => removeItem(sku)} aria-label="Remove item" className="text-navy-soft">
                    🗑️
                  </button>
                </div>
              );
            })
          )}
        </div>

        <div className="px-5 py-4 border-t-2 border-line-pink">
          <div className="flex justify-between font-fredoka font-semibold text-lg text-cocoa mb-3">
            <span>Total</span>
            <span>${total}</span>
          </div>
          <button
            type="button"
            onClick={checkout}
            disabled={checkingOut}
            className={`w-full font-fredoka font-semibold text-lg rounded-full py-3.5 text-white bg-coral shadow-[0_4px_0_#EE7295] transition ${
              checkingOut ? 'opacity-70 cursor-wait' : 'hover:-translate-y-0.5'
            }`}
          >
            {checkingOut ? 'Opening checkout...' : 'Checkout'}
          </button>
          <p className="text-center text-xs text-navy-soft font-semibold mt-2">
            🔒 Secure checkout · Instant digital download. No physical product will be shipped.
          </p>
        </div>
      </aside>

      {notice && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-navy/40" onClick={() => setNotice(null)}>
          <div className="bg-cream border-2 border-line-blue rounded-[26px] max-w-md p-7 text-center" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-fredoka text-cocoa text-xl mb-2">Almost there!</h3>
            <p className="text-sm text-navy-soft font-medium mb-4">{notice}</p>
            <button
              type="button"
              onClick={() => setNotice(null)}
              className="font-fredoka font-semibold rounded-full px-6 py-2.5 text-white bg-coral shadow-[0_4px_0_#EE7295]"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  );
}
