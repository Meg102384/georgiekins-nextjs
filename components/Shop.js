'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from './CartContext';
import { PET_PRODUCTS, PRODUCT_TYPES } from '@/lib/data';
import { Check, Star } from 'lucide-react';

const INDIVIDUAL_TYPES = PRODUCT_TYPES.filter((t) => t.key !== 'kit');
const KIT_TYPE = PRODUCT_TYPES.find((t) => t.key === 'kit');

function priceFor(pet, typeKey) {
  if (typeKey === 'kit') return pet.kitPrice;
  return PRODUCT_TYPES.find((t) => t.key === typeKey).price;
}

function labelFor(typeKey) {
  return PRODUCT_TYPES.find((t) => t.key === typeKey).label;
}

function toggleLocalType(checked, typeKey) {
  if (typeKey === 'kit') {
    return checked.includes('kit') ? [] : ['kit'];
  }
  const withoutKit = checked.filter((t) => t !== 'kit');
  return withoutKit.includes(typeKey)
    ? withoutKit.filter((t) => t !== typeKey)
    : [...withoutKit, typeKey];
}

function theme(pet) {
  return pet.gender === 'female'
    ? { border: 'border-line-pink', rowSelected: 'bg-blush border-line-pink', check: 'bg-coral-deep border-coral-deep', ring: 'focus-within:ring-line-pink' }
    : { border: 'border-line-blue', rowSelected: 'bg-blue-deep/50 border-line-blue', check: 'bg-navy-soft border-navy-soft', ring: 'focus-within:ring-line-blue' };
}

function ProductRow({ id, checked, onChange, label, desc, price, t }) {
  return (
    <label
      htmlFor={id}
      className={`flex items-start gap-2.5 rounded-2xl border-2 px-3 py-2 cursor-pointer transition focus-within:ring-2 focus-within:ring-offset-1 ${t.ring} ${
        checked ? t.rowSelected : 'bg-white border-line-blue/40 hover:border-line-blue'
      }`}
    >
      <input type="checkbox" id={id} checked={checked} onChange={onChange} className="sr-only" />
      <span
        aria-hidden="true"
        className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition ${
          checked ? t.check : 'bg-white border-navy-soft/40'
        }`}
      >
        {checked && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block font-fredoka font-semibold text-sm text-cocoa leading-snug">{label}</span>
        <span className="block text-xs text-navy-soft leading-snug">{desc}</span>
      </span>
      <span className="font-fredoka font-bold text-coral-deep text-sm flex-shrink-0">${price}</span>
    </label>
  );
}

function PetCard({ pet, onAddToCart }) {
  const [checked, setChecked] = useState([]);
  const [flash, setFlash] = useState(false);
  const t = theme(pet);

  const total = checked.reduce((s, key) => s + priceFor(pet, key), 0);
  const nonKitCount = checked.filter((k) => k !== 'kit').length;
  const missingType = nonKitCount === 2 ? INDIVIDUAL_TYPES.find((it) => !checked.includes(it.key)) : null;

  function toggle(typeKey) {
    setChecked((prev) => toggleLocalType(prev, typeKey));
  }

  function handleAddToCart() {
    if (checked.length === 0) return;
    checked.forEach((typeKey) => {
      const sku = `${pet.key}-${typeKey}`;
      onAddToCart(sku, `${pet.species} ${labelFor(typeKey)}`, pet.emoji || '🐾', priceFor(pet, typeKey));
    });
    setFlash(true);
    setChecked([]);
    setTimeout(() => setFlash(false), 1200);
  }

  return (
    <div className={`flex flex-col p-5 rounded-[28px] border-[2.5px] border-dashed bg-cream transition ${t.border}`}>
      <div className="flex items-center gap-3 mb-3">
        <Image src={`/images/${pet.img}`} alt="" width={56} height={56} className="w-14 h-14 object-contain flex-shrink-0 drop-shadow" />
        <div>
          <h3 className="font-fredoka font-semibold text-cocoa text-lg leading-tight">{pet.species} Goodies</h3>
          <p className="text-xs text-navy-soft font-medium">Hosted by {pet.host}</p>
        </div>
      </div>

      <p className="font-fredoka font-semibold text-xs tracking-wide uppercase text-navy-soft/80 mb-1.5">
        Choose what you need
      </p>
      <div className="flex flex-col gap-1.5 mb-2">
        {INDIVIDUAL_TYPES.map((pt) => (
          <ProductRow
            key={pt.key}
            id={`${pet.key}-${pt.key}`}
            checked={checked.includes(pt.key)}
            onChange={() => toggle(pt.key)}
            label={pt.label}
            desc={pt.desc}
            price={pt.price}
            t={t}
          />
        ))}
      </div>

      {missingType && (
        <p className="text-xs text-navy-soft font-medium mb-2 leading-snug">
          You&apos;ve selected 2 guides for ${total}.{' '}
          <button
            type="button"
            onClick={() => setChecked(['kit'])}
            className="text-coral-deep font-bold underline underline-offset-2"
          >
            Add the {missingType.label} and get the complete Full Kit for ${pet.kitPrice} instead
          </button>
          .
        </p>
      )}

      <div className="flex items-center gap-1.5 mb-1.5 mt-1">
        <Star className="w-3.5 h-3.5 text-gold" fill="currentColor" strokeWidth={0} />
        <span className="font-fredoka font-semibold text-xs tracking-wide uppercase text-navy-soft/80">
          Best value
        </span>
      </div>
      <ProductRow
        id={`${pet.key}-kit`}
        checked={checked.includes('kit')}
        onChange={() => toggle('kit')}
        label={KIT_TYPE.label}
        desc={KIT_TYPE.desc}
        price={pet.kitPrice}
        t={t}
      />

      <div className="mt-3 pt-3 border-t border-line-blue/40">
        {checked.length > 0 && (
          <p className="font-fredoka font-semibold text-sm text-cocoa mb-2">
            {checked.length} selected · <span className="text-coral-deep">${total}</span>
          </p>
        )}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={checked.length === 0}
          className={`font-fredoka font-semibold text-sm rounded-full px-4 py-2 text-white transition ${
            checked.length === 0
              ? 'bg-coral/40 cursor-not-allowed'
              : flash
              ? 'bg-sage shadow-[0_3px_0_#8CAB7E]'
              : 'bg-coral shadow-[0_3px_0_#EE7295] hover:-translate-y-0.5'
          }`}
        >
          {flash ? 'Added! ✓' : 'Add selected to cart'}
        </button>
        <a href="#compare" className="block mt-2 text-xs font-bold text-navy-soft underline underline-offset-2 hover:text-coral-deep">
          See what&apos;s inside →
        </a>
      </div>
    </div>
  );
}

export default function Shop() {
  const { addItem } = useCart();

  return (
    <section id="shop" className="bg-blue px-5 py-14">
      <div className="max-w-[1050px] mx-auto text-center">
        <span className="inline-block font-fredoka font-semibold text-xs tracking-widest uppercase text-navy bg-blue-deep rounded-full px-4 py-1 mb-3">
          Georgiekins Goodies
        </span>
        <h2 className="font-fredoka font-bold text-cocoa text-3xl sm:text-4xl mb-2">Shop by your pet</h2>
        <p className="text-navy-soft font-medium max-w-2xl mx-auto">
          Every family is different! Pick any mix of printables for each pet and add them straight
          to your cart.
        </p>

        <p className="mt-6 mb-7 text-sm font-bold text-coral-deep">
          📥 Instant digital download. No physical product will be shipped.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
          {PET_PRODUCTS.map((p) => (
            <PetCard key={p.key} pet={p} onAddToCart={addItem} />
          ))}
        </div>
      </div>
    </section>
  );
}
