import Link from 'next/link';

export const metadata = {
  title: 'Order Complete — Georgiekins',
};

export default function CheckoutSuccessPage() {
  return (
    <section className="bg-cream px-5 py-20 min-h-[60vh]">
      <div className="max-w-2xl mx-auto text-center">
        <span className="inline-block font-fredoka font-semibold text-xs tracking-widest uppercase text-navy bg-blue rounded-full px-4 py-1 mb-4">
          Checkout
        </span>
        <h1 className="font-fredoka font-bold text-cocoa text-4xl mb-3">Thank you for your order!</h1>
        <p className="text-navy-soft font-semibold mb-7">
          Your payment was completed successfully. Check your inbox — we&apos;ve emailed your digital downloads to the address you provided.
        </p>
        <Link href="/" className="inline-block font-fredoka font-semibold rounded-full px-6 py-3 text-white bg-coral shadow-[0_4px_0_#EE7295]">
          Back to Georgiekins
        </Link>
      </div>
    </section>
  );
}
