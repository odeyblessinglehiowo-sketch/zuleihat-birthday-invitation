"use client";

export default function BirthdayDetails() {
  return (
    <section
      className="relative overflow-hidden bg-[#fdfcf9] px-[18px] py-10 text-center text-[#302b26] sm:px-8 sm:py-10"
      aria-labelledby="birthday-details-title"
    >
        {/* Floating balloons */}
<div
  className="pointer-events-none absolute inset-0 overflow-hidden"
  aria-hidden="true"
>
  <span className="birthday-balloon balloon-one" />
  <span className="birthday-balloon balloon-two" />
  <span className="birthday-balloon balloon-three" />
  <span className="birthday-balloon balloon-four" />
</div>
      <div className="relative z-[2] mx-auto flex w-full max-w-[900px] flex-col items-center">
        <p className="mb-4 font-serif text-[0.9rem] font-semibold tracking-[0.18em] text-[#b18a43] sm:text-base sm:tracking-[0.28em]">
          YOU ARE INVITED
        </p>

        <h2
          id="birthday-details-title"
          className="m-0 font-serif text-[clamp(2rem,7vw,4.5rem)] font-normal leading-[0.55] text-[#b18a43]"
        >
          <span className="block italic">Capt_Zuuuu</span>

          <small className="mt-[14px] block text-[clamp(1.60rem,3vw,2.8rem)] font-medium italic leading-[0.95] text-[#5e5a56]">
            is celebrating her Golden 24 birthday
          </small>
        </h2>

        <p className="mx-auto mt-2 font-serif text-[1.35rem] leading-[1.2] text-[#45413d] sm:text-[clamp(1.35rem,2.4vw,2rem)]">
          at{" "}
          <strong className="font-semibold text-[#9d762f]">
            Divino Pool bar and grills
          </strong>
          ,
          <br />
          Beside Los Angeles Mall, Wuse 2.
        </p>

        {/* Cake illustration: custom CSS remains here */}
        <div className="birthday-cake scale-[0.72] sm:scale-[0.72]"

          aria-label="Birthday cake with flickering candles"
        >
          <div className="cake-candles">
            {Array.from({ length: 6 }).map((_, index) => (
              <div className="candle" key={index}>
                <span className="flame" />
                <span className="candle-stick" />
              </div>
            ))}
          </div>

          <div className="cake-top">
            <span className="cake-decoration cake-decoration-one" />
            <span className="cake-decoration cake-decoration-two" />
            <span className="cake-decoration cake-decoration-three" />
            <span className="cake-decoration cake-decoration-four" />
          </div>

          <div className="cake-body">
            <div className="cake-writing">
              <span>Golden</span>
              <strong>24</strong>
            </div>

            <span className="cake-drip cake-drip-one" />
            <span className="cake-drip cake-drip-two" />
            <span className="cake-drip cake-drip-three" />
            <span className="cake-drip cake-drip-four" />
          </div>

          <div className="cake-base">
            <div className="cake-base-top" />
            <div className="cake-base-stem" />
            <div className="cake-base-foot" />
          </div>

          <div className="cake-confetti cake-confetti-one">✦</div>
          <div className="cake-confetti cake-confetti-two">✧</div>
          <div className="cake-confetti cake-confetti-three">✦</div>
          <div className="cake-confetti cake-confetti-four">✧</div>
        </div>

        {/* Bottom divider */}
        <div className="mt-[6px] flex items-center justify-center gap-5">
          <span className="h-px w-[70px] bg-[#c9a15a] sm:w-[120px]" />

          <strong className="text-[1.3rem] font-normal text-[#b18a43]">
            ✦
          </strong>

          <span className="h-px w-[70px] bg-[#c9a15a] sm:w-[120px]" />
        </div>
      </div>
    </section>
  );
}