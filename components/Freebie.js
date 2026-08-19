"use client";

import { useState } from "react";
import Image from "next/image";
import { CREW } from "@/lib/data";

export default function Freebie() {
  const [chosen, setChosen] = useState(["georgie"]);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [note, setNote] = useState(
    "Pick at least one pet so we know what tips to send! 🐾",
  );
  const [sentNames, setSentNames] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function toggle(key) {
    setChosen((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (chosen.length === 0) {
      setNote("Pick at least one pet so we know what tips to send! 🐾");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/freebie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, pets: chosen }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not send your freebie.");
      }

      const names = CREW.filter((c) => chosen.includes(c.key)).map(
        (c) => c.name,
      );
      let joined;
      if (names.length === 1) joined = names[0];
      else if (names.length === 2) joined = names.join(" & ");
      else
        joined =
          names.slice(0, -1).join(", ") + " & " + names[names.length - 1];

      setSentNames(joined);
      setStatus("sent");
      setEmail("");
    } catch (error) {
      setErrorMessage(error.message);
      setStatus("error");
    }
  }

  function closeModal() {
    setStatus("idle");
  }

  return (
    <section id="freebie" className="bg-blue px-5 py-20">
      <div className="max-w-[1050px] mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-9 bg-cream border-[2.5px] border-dashed border-line-pink rounded-[32px] p-9">
          <div className="flex-shrink-0">
            <Image
              src="/images/georgie.png"
              alt="Georgie the cat"
              width={150}
              height={150}
              className="w-[150px] h-auto drop-shadow-lg"
            />
          </div>
          <div className="flex-1">
            <span className="inline-block font-fredoka font-semibold text-xs tracking-widest uppercase text-coral-deep bg-blush rounded-full px-4 py-1 mb-3">
              A little gift from Georgie 🐾
            </span>
            <h2 className="font-fredoka font-bold text-cocoa text-2xl sm:text-3xl mb-3">
              Download a free pet care printable
            </h2>
            <p className="text-navy font-medium mb-4">
              Join the Georgiekins family and get a free &quot;All About My
              Pet&quot; profile page — a cozy little printable to make caring
              for your best friend a little easier. Have more than one pet? Pick
              everyone who applies and we&apos;ll send tips for each.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <fieldset className="border-0 m-0 p-0 min-w-0">
                <legend className="w-full text-center font-fredoka font-semibold text-cocoa mb-3">
                  Who&apos;s in your family? Get tips from…
                </legend>
                <div className="flex flex-wrap justify-center gap-3">
                  {CREW.map((c) => {
                    const on = chosen.includes(c.key);
                    return (
                      <label
                        key={c.key}
                        className={`relative flex flex-col items-center gap-1 cursor-pointer bg-white rounded-[18px] border-[2.5px] w-[88px] px-3.5 pt-3 pb-2.5 font-fredoka font-semibold text-[0.82rem] text-cocoa transition hover:-translate-y-1 ${
                          on
                            ? "border-solid border-sage bg-[#EFF6EA] shadow-[0_5px_14px_rgba(140,171,126,0.3)] -translate-y-1"
                            : "border-solid border-line-blue"
                        }`}
                      >
                        {on && (
                          <span className="absolute -top-2 -right-1.5 w-[22px] h-[22px] rounded-full bg-sage text-white text-xs font-bold flex items-center justify-center shadow">
                            ✓
                          </span>
                        )}
                        <input
                          type="checkbox"
                          className="absolute opacity-0 w-px h-px pointer-events-none"
                          checked={on}
                          onChange={() => toggle(c.key)}
                        />
                        <Image
                          src={`/images/${c.img}`}
                          alt=""
                          width={40}
                          height={40}
                          className="w-10 h-10 object-contain"
                        />
                        {c.name}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
              <div className="flex gap-2.5 flex-wrap">
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  aria-label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "sending"}
                  className="flex-1 min-w-[200px] border-2 border-line-blue rounded-full px-4 py-3 text-sm font-semibold bg-white"
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className={`font-fredoka font-semibold rounded-full px-6 py-3 text-white bg-coral shadow-[0_4px_0_#EE7295] transition ${
                    status === "sending"
                      ? "opacity-70 cursor-wait"
                      : "hover:-translate-y-0.5"
                  }`}
                >
                  Send me the freebie 💌
                </button>
              </div>
            </form>
            <p className="text-xs text-navy-soft font-semibold mt-3">{note}</p>
          </div>
        </div>
      </div>

      {status !== "idle" && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-navy/45"
          onClick={() => status !== "sending" && closeModal()}
        >
          <div
            className="relative bg-cream border-2 border-line-pink rounded-[26px] max-w-sm w-full p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {status === "sending" && (
              <>
                <div className="mx-auto mb-5 w-14 h-14 rounded-full border-4 border-line-blue border-t-coral animate-spin" />
                <h3 className="font-fredoka font-semibold text-xl text-cocoa mb-2">
                  Sending your printable...
                </h3>
              </>
            )}

            {status === "sent" && (
              <>
                <p className="text-4xl mb-3">🐾💌</p>
                <h3 className="font-fredoka font-semibold text-xl text-cocoa mb-2">
                  Yay! Check your inbox!
                </h3>
                <p className="text-sm text-navy leading-relaxed mb-6">
                  We just sent tips from <strong>{sentNames}</strong> to your
                  email.
                </p>
                <button
                  type="button"
                  onClick={closeModal}
                  className="font-fredoka font-semibold rounded-full px-6 py-2.5 text-white bg-coral shadow-[0_4px_0_#EE7295] hover:-translate-y-0.5 transition"
                >
                  Got it!
                </button>
              </>
            )}

            {status === "error" && (
              <>
                <p className="text-4xl mb-3">😿</p>
                <h3 className="font-fredoka font-semibold text-xl text-cocoa mb-2">
                  Oh no, something went wrong
                </h3>
                <p className="text-sm text-navy leading-relaxed mb-6">
                  {errorMessage}
                </p>
                <button
                  type="button"
                  onClick={closeModal}
                  className="font-fredoka font-semibold rounded-full px-6 py-2.5 text-white bg-coral shadow-[0_4px_0_#EE7295] hover:-translate-y-0.5 transition"
                >
                  Try again
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
