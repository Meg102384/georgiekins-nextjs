'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', message: '', company: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  function update(field) {
    return (e) => setValues((v) => ({ ...v, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Could not send your message.');
      }

      setStatus('sent');
    } catch (err) {
      setError(err.message);
      setStatus('idle');
    }
  }

  if (status === 'sent') {
    return (
      <div className="text-center py-4">
        <p className="text-3xl mb-2">🐾</p>
        <h3 className="font-fredoka font-semibold text-xl text-cocoa mb-2">Message sent!</h3>
        <p className="text-sm text-navy leading-relaxed">
          Thanks for reaching out — we&apos;ll get back to you within 1-2 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="font-fredoka font-semibold text-xl text-cocoa mb-3">Contact Us</h3>
      <p className="text-sm text-navy leading-relaxed mb-4">
        We&apos;d love to hear from you! Send us a message and we&apos;ll get back to you within 1-2 business days.
      </p>

      <input
        type="text"
        name="company"
        value={values.company}
        onChange={update('company')}
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        className="hidden"
      />

      <label className="block text-sm font-semibold text-navy mb-1" htmlFor="contact-name">
        Name
      </label>
      <input
        id="contact-name"
        type="text"
        required
        value={values.name}
        onChange={update('name')}
        className="w-full bg-white border-2 border-line-blue rounded-full px-4 py-2 text-sm font-semibold text-navy mb-3"
      />

      <label className="block text-sm font-semibold text-navy mb-1" htmlFor="contact-email">
        Email
      </label>
      <input
        id="contact-email"
        type="email"
        required
        value={values.email}
        onChange={update('email')}
        className="w-full bg-white border-2 border-line-blue rounded-full px-4 py-2 text-sm font-semibold text-navy mb-3"
      />

      <label className="block text-sm font-semibold text-navy mb-1" htmlFor="contact-message">
        Message
      </label>
      <textarea
        id="contact-message"
        required
        rows={4}
        value={values.message}
        onChange={update('message')}
        className="w-full bg-white border-2 border-line-blue rounded-[20px] px-4 py-2 text-sm font-semibold text-navy mb-3 resize-none"
      />

      {error && <p className="text-sm text-coral-deep font-semibold mb-3">{error}</p>}

      <button
        type="submit"
        disabled={status === 'sending'}
        className={`w-full font-fredoka font-semibold rounded-full py-3 text-white bg-coral shadow-[0_4px_0_#EE7295] transition ${
          status === 'sending' ? 'opacity-70 cursor-wait' : 'hover:-translate-y-0.5'
        }`}
      >
        {status === 'sending' ? 'Sending...' : 'Send message'}
      </button>
    </form>
  );
}
