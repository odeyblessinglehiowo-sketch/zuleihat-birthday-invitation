"use client";

import Image from "next/image";

export default function DressCode() {
  return (
    <section
      className="relative overflow-hidden bg-[#050505] px-5 py-6 text-center text-[#fff8e8] sm:px-8 sm:py-10"
      aria-labelledby="dress-code-title"
    >
      {/* Subtle gold background glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(218,165,66,0.13),transparent_40%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[900px]">
        {/* Heading */}
        <p className="font-sans text-sm font-medium uppercase tracking-[0.4em] text-[#d9ad59] sm:text-xl">
          Dress Code
        </p>

        <h2
          id="dress-code-title"
          className="mt-2 font-serif text-[clamp(2rem,8vw,4.5rem)] italic leading-none tracking-[0.04em] text-[#fff8e8]"
        >
          Dress to Impress
        </h2>

        <p className="mt-2 font-sans text-xs uppercase tracking-[0.3em] text-[#b9b0a5] sm:text-sm sm:tracking-[0.4em]">
          Elegant, Refined & Polished
        </p>

        {/* Gold divider */}
        <div className="mx-auto mt-2 flex max-w-[220px] items-center justify-center gap-5 sm:mt-2 sm:max-w-[280px]">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#c89a45]" />

          <span className="text-2xl font-light text-[#d9ad59]">✦</span>

          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#c89a45]" />
        </div>

        {/* Dress code image */}
        <div className="mx-auto mt-1 flex min-h-[260px] w-full max-w-[480px] items-center justify-center sm:mt-2 sm:min-h-[200px]">
          <Image
            src="/images/dress-code.webp"
            alt="Elegant black and gold dress code inspiration"
            width={900}
            height={700}
            className="h-auto w-full object-contain"
          />
        </div>

        {/* Dress code card */}
        <div className="mx-auto mt-2 max-w-[700px] rounded-[1.6rem] border border-[#c89a45]/40 bg-[#11100e] px-4 py-3 shadow-[0_20px_80px_rgba(218,165,66,0.08)] sm:px-8 sm:py-5">
          <p className="font-serif text-2xl italic leading-tight text-[#d9ad59] sm:text-3xl">
            Black & Gold
          </p>

          <p className="mx-auto mt-2 max-w-[670px] font-sans text-sm leading-6 text-[#e1d8cc] sm:text-lg sm:leading-7">
            Guests are encouraged to dress to impress — refined, polished,
            and effortlessly elegant. Think black or gold
            for a look that matches the celebration.
          </p>

          <div className="mx-auto mt-3 h-px w-16 bg-[#c89a45]" />

          <p className="mt-3 font-serif text-base italic leading-5 text-[#b9b0a5] sm:text-xl">
            Come dressed in your finest and let’s make this birthday
            unforgettable.
          </p>
        </div>
      </div>
    </section>
  );
}