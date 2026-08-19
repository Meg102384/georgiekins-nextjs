'use client';

import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState({}); // sku -> {name, icon, price, qty}
  const [open, setOpen] = useState(false);

  function addItem(sku, name, icon, price) {
    setItems((prev) => {
      const next = { ...prev };
      if (next[sku]) {
        next[sku] = { ...next[sku], qty: next[sku].qty + 1 };
      } else {
        next[sku] = { name, icon, price, qty: 1 };
      }
      return next;
    });
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
