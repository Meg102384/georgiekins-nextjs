'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'georgiekins-cart';

export function CartProvider({ children }) {
  const [items, setItems] = useState({}); // sku -> {name, img, price, qty}
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load any saved cart once on mount (client-only — localStorage isn't available during SSR).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {
      // ignore corrupt/unavailable storage
    }
    setHydrated(true);
  }, []);

  // Persist on every change, but only after the initial load above has committed —
  // otherwise this would fire on mount with the empty default state and immediately
  // overwrite the saved cart before it's had a chance to load. Using state (not a
  // ref) for the hydrated flag matters here: it defers this effect's stale-`items`
  // run until the loaded data has actually flowed through a render.
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore unavailable storage (e.g. private browsing quota)
    }
  }, [items, hydrated]);

  function addItem(sku, name, img, price) {
    setItems((prev) => {
      const next = { ...prev };
      if (next[sku]) {
        next[sku] = { ...next[sku], qty: next[sku].qty + 1 };
      } else {
        next[sku] = { name, img, price, qty: 1 };
      }
      return next;
    });
    setOpen(true);
  }

  function changeQty(sku, delta) {
    setItems((prev) => {
      const next = { ...prev };
      if (!next[sku]) return prev;
      const qty = Math.max(1, next[sku].qty + delta);
      next[sku] = { ...next[sku], qty };
      return next;
    });
  }

  function removeItem(sku) {
    setItems((prev) => {
      const next = { ...prev };
      delete next[sku];
      return next;
    });
  }

  const count = Object.values(items).reduce((s, i) => s + i.qty, 0);
  const total = Object.values(items).reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, changeQty, removeItem, count, total, open, setOpen }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
