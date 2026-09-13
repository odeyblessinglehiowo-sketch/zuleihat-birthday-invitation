"use client";

export default function FinalSection() {
  return (
    <footer className="relative isolate overflow-hidden bg-[#080808] px-5 py-8 text-white sm:px-8 sm:py-10">
      {/* Floating balloons */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="final-balloon balloon-gold balloon-left-one">
          <span className="balloon-string string-gold" />
          <span className="balloon-ribbon ribbon-gold" />
        </div>

        <div className="final-balloon balloon-white balloon-left-two">
          <span className="balloon-string string-white" />
          <span className="balloon-ribbon ribbon-white" />
        </div>

        <div className="final-balloon balloon-white balloon-right-one">
          <span className="balloon-string string-white" />
          <span className="balloon-ribbon ribbon-white" />
        </div>

        <div className="final-balloon balloon-gold balloon-right-two">
          <span className="balloon-string string-gold" />
          <span className="balloon-ribbon ribbon-gold" />
        </div>

        {/* Subtle background glow */}
        <div className="absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9a24d]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">

        {/* Main highlight */}
        <h2
          className="mx-auto max-w-2xl text-5xl leading-[1.05] text-[#f3d58b] sm:text-7xl"
          style={{
            fontFamily: "cursive",
            fontStyle: "italic",
          }}
        >
          Oyarazi Zuleihat
        </h2>

        <p className="mt-3 text-sm uppercase tracking-[0.3em] text-white/65 sm:text-base">
          October 3, 2026
        </p>

        <div className="mx-auto my-3 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-[#c9a24d]" />
          <span className="text-lg text-[#d7b45a]">✦</span>
          <span className="h-px w-12 bg-[#c9a24d]" />
        </div>

        {/* Advertising-style brand credit */}
        <div className="mx-auto max-w-xl rounded-xl border border-[#c9a24d]/60 bg-white/[0.04] px-5 py-4 shadow-[0_0_35px_rgba(201,162,77,0.12)]">
          <p className="text-sm leading-5 text-white/65 sm:text-sm">
            Made with love, thoughtful details, and a little celebration
            magic by
          </p>

          <a
            href="https://www.blessingodey.com"
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-block text-xl font-bold tracking-wide text-[#f3d58b] transition hover:text-white sm:text-2xl"
          >
            blessingodey.com
          </a>

        </div>

        <p className="mt-5 text-[9px] uppercase tracking-[0.3em] text-white/45">
          Celebrate · Create · Invite · Remember
        </p>
      </div>
    </footer>
  );
}