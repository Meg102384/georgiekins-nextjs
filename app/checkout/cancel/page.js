import Link from 'next/link';

export const metadata = {
  title: 'Checkout Canceled — Georgiekins',
};

export default function CheckoutCancelPage() {
  return (
    <section className="bg-cream px-5 py-20 min-h-[60vh]">
      <div className="max-w-2xl mx-auto text-center">
        <span className="inline-block font-fredoka font-semibold text-xs tracking-widest uppercase text-navy bg-blush rounded-full px-4 py-1 mb-4">
          Basket saved
        </span>
        <h1 className="font-fredoka font-bold text-cocoa text-4xl mb-3">Checkout canceled</h1>
        <p className="text-navy-soft font-semibold mb-7">
          No payment was taken. You can return to the shop and try again whenever you are ready.
        </p>
        <Link href="/#shop" className="inline-block font-fredoka font-semibold rounded-full px-6 py-3 text-white bg-coral shadow-[0_4px_0_#EE7295]">
          Return to shop
        </Link>
      </div>
    </section>
  );
}
