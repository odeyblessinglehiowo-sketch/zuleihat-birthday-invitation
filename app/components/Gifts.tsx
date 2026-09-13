"use client";

import { useState } from "react";

export default function Gifts() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      id="gifts"
      className="relative overflow-hidden bg-white px-5 py-10 text-black sm:px-8"
    >
      {/* Decorative gold accents */}
      <div className="pointer-events-none absolute left-[-70px] top-24 h-40 w-40 rounded-full border border-[#c9a24d]/30" />
      <div className="pointer-events-none absolute right-[-80px] bottom-20 h-48 w-48 rounded-full border border-[#c9a24d]/30" />

      <div className="relative mx-auto max-w-4xl">
        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-[15px] uppercase tracking-[0.45em] text-[#b18a36]">
            A little something
          </p>

          <h2
            className="text-4xl leading-none text-black sm:text-6xl"
            style={{
              fontFamily: "cursive",
              fontStyle: "italic",
            }}
          >
            Gifts
          </h2>

          <div className="mx-auto mt-5 h-px w-16 bg-[#c9a24d]" />
        </div>

        {/* Content card */}
        <div className="rounded-[1rem] border border-black/5 bg-white px-6 py-6 text-center shadow-[0_15px_60px_rgba(0,0,0,0.08)] sm:px-10 sm:py-8">
          <p className="mx-auto max-w-2xl text-base leading-8 text-black/65 sm:text-xl">
            Your presence at my birthday celebration is the greatest gift
            of all.
          </p>

          <p className="mx-auto mt-2 max-w-2xl text-base leading-7 text-black/75 sm:text-lg">
            If you wish to honour me with a gift, you may do so through the
            details below. Your love, prayers, and presence mean more than
            words can say.
          </p>

          {/* Toggle button */}
          <button
            type="button"
            onClick={() => setIsOpen((previous) => !previous)}
            className="mx-auto mt-5 flex w-full max-w-md items-center justify-between rounded-md border border-black bg-black px-6 py-3 text-left text-white transition hover:bg-[#c9a24d] hover:text-black sm:px-8"
          >
            <span className="flex items-center gap-4">
              <span className="text-xl text-[#d7b45a]">✦</span>

              <span className="text-xs uppercase tracking-[0.2em] sm:text-base">
                {isOpen ? "Hide Gift Details" : "View Gift Details"}
              </span>
            </span>

            <span
              className={`text-2xl text-[#d7b45a] transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            >
             ⌄
            </span>
          </button>

          {/* Gift details */}
          <div
            className={`grid transition-all duration-500 ${
              isOpen
                ? "mt-3 grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="rounded-xl border border-[#c9a24d]/40 bg-[#faf8f2] px-5 py-4 text-center">
                <p className="text-base uppercase tracking-[0.3em] text-[#b18a36]">
                  Gift Details
                </p>

                <div className="mx-auto my-2 h-px w-12 bg-[#c9a24d]" />

                <p className="text-base leading-8 text-black/70">
                  You can send your gift using the details below.
                </p>

                <div className="mt-5 space-y-2 text-md leading-7 text-black">
                  <p>
                    <span className="font-semibold">Account Name:</span>{" "}
                    Yusuf Oyarazi Zuleihat
                  </p>

                  <p>
                    <span className="font-semibold">Bank:</span>{" "}
                    {/* Replace with bank name */}
                    United Bank of Africa
                  </p>

                  <p>
                    <span className="font-semibold">Account Number:</span>{" "}
                    {/* Replace with account number */}
                    2265945337
                  </p>
                </div>

                <p className="mt-5 text-md italic text-black/60">
                  Thank you for celebrating this special moment with me.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}