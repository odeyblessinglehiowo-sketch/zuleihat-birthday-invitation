"use client";

import Image from "next/image";

type BirthdayHeroProps = {
  onConfirmAttendance: () => void;
};

const particlePositions = [
  "left-[8%]",
  "left-[18%]",
  "left-[32%]",
  "left-[45%]",
  "left-[58%]",
  "left-[70%]",
  "left-[82%]",
  "left-[92%]",
  "left-[25%]",
  "left-[64%]",
  "left-[38%]",
];

const particleDelays = [
  "0s",
  "2s",
  "4s",
  "1s",
  "5s",
  "3s",
  "6s",
  "1.5s",
  "7s",
  "8s",
  "9s",
];

const particleSizes = [
  "h-[5px] w-[5px]",
  "h-[3px] w-[3px]",
  "h-[5px] w-[5px]",
  "h-[4px] w-[4px]",
  "h-[5px] w-[5px]",
  "h-[3px] w-[3px]",
  "h-[5px] w-[5px]",
  "h-[4px] w-[4px]",
  "h-[5px] w-[5px]",
  "h-[5px] w-[5px]",
  "h-[5px] w-[5px]",
];

export default function BirthdayHero({
  onConfirmAttendance,
}: BirthdayHeroProps) {
  return (
    <section
      className="relative isolate flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#160d0a] text-white"
      aria-labelledby="birthday-hero-title"
    >
      {/* Optimized hero image */}
      <div className="absolute inset-0 -z-40 overflow-hidden">
        <Image
          src="/images/yusuf-hero.webp"
          alt=""
          fill
          priority
          quality={85}
          sizes="100vw"
          className="scale-[1.04] object-cover object-center animate-[heroImageReveal_2.5s_ease-out_both] motion-reduce:animate-none"
        />
      </div>

      {/* Dark luxury overlay */}
      <div
        className="absolute inset-0 -z-30 bg-[linear-gradient(to_bottom,rgba(8,5,4,0.35),rgba(8,5,4,0.2)_35%,rgba(8,5,4,0.72)_100%),linear-gradient(90deg,rgba(15,8,5,0.35),transparent_50%,rgba(15,8,5,0.4))] max-sm:bg-[linear-gradient(to_bottom,rgba(8,5,4,0.28),rgba(8,5,4,0.4)_5%,rgba(8,5,4,0.92)_100%),linear-gradient(90deg,rgba(15,8,5,0.22),transparent_50%,rgba(15,8,5,0.28))]"
        aria-hidden="true"
      />

      {/* Fine luxury texture */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-50 [background-image:radial-gradient(circle_at_20%_20%,rgba(255,213,115,0.15)_0_1px,transparent_2px),radial-gradient(circle_at_80%_70%,rgba(255,213,115,0.12)_0_1px,transparent_2px)] [background-size:90px_90px,130px_130px]"
        aria-hidden="true"
      />

      {/* Animated gold glows */}
      <div
        className="pointer-events-none absolute -left-40 -top-44 -z-20 h-[420px] w-[420px] animate-[goldGlowMove_12s_ease-in-out_infinite_alternate] rounded-full bg-[rgba(218,165,66,0.18)] blur-[90px] motion-reduce:animate-none"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -bottom-44 -right-44 -z-20 h-[420px] w-[420px] animate-[goldGlowMove_12s_2s_ease-in-out_infinite_alternate] rounded-full bg-[rgba(218,165,66,0.18)] blur-[90px] motion-reduce:animate-none"
        aria-hidden="true"
      />

      {/* Floating particles */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
        aria-hidden="true"
      >
        {particlePositions.map((position, index) => (
          <span
            key={index}
            className={`absolute bottom-[-10%] block rounded-full bg-[#f5d58c] opacity-0 shadow-[0_0_14px_rgba(245,213,140,0.8)] animate-[particleFloat_8s_linear_infinite] motion-reduce:animate-none ${position} ${particleSizes[index]}`}
            style={{
              animationDelay: particleDelays[index],
            }}
          />
        ))}
      </div>

      {/* Main hero content */}
      <div className="relative z-[3] mx-auto w-[92%] max-w-[900px] animate-[heroContentReveal_1.8s_0.35s_ease-out_both] px-0 pb-[100px] text-center motion-reduce:animate-none sm:w-[90%] sm:pb-[110px]">
        <p className="mb-[22px] font-sans text-[1.4rem] font-normal uppercase leading-[1.8] tracking-[0.15em] text-[#fff8e8] sm:mb-[18px] sm:text-[clamp(0.65rem,1.3vw,0.95rem)] sm:tracking-[0.42em]">
          IT IS MY BIRTHDAY!
        </p>

        <h1
          id="birthday-hero-title"
          className="m-0 flex flex-col items-center gap-0 font-serif text-[clamp(3rem,14vw,5.2rem)] font-medium leading-[0.92] tracking-[-0.04em] text-[#fff8e8] [text-shadow:0_2px_20px_rgba(0,0,0,0.35),0_0_35px_rgba(255,215,120,0.12)] sm:text-[clamp(2.8rem,7vw,6.8rem)] sm:leading-none"
        >
          <span className="animate-[titleLineReveal_1.2s_0.55s_ease-out_both] motion-reduce:animate-none">
            Yusuf Oyarazi
          </span>

          <span className="animate-[titleLineReveal_1.2s_0.8s_ease-out_both] motion-reduce:animate-none">
            Zuleihat
          </span>
        </h1>

        {/* Divider */}
        <div className="mx-auto my-[36px] flex w-[70%] max-w-[280px] items-center justify-center gap-[14px] sm:my-[42px_28px] sm:gap-[22px]">
          <span className="block h-px flex-1 bg-gradient-to-r from-transparent to-[rgba(255,241,197,0.95)]" />

          <strong className="animate-[starPulse_2.2s_ease-in-out_infinite] text-[1.35rem] font-normal text-[#fff1c5] motion-reduce:animate-none">
            ✦
          </strong>

          <span className="block h-px flex-1 bg-gradient-to-l from-transparent to-[rgba(255,241,197,0.95)]" />
        </div>

        <p className="m-0 font-sans text-[1.3rem] font-normal uppercase leading-[1.8] tracking-[0.18em] text-[#fff8e8] sm:text-[clamp(0.75rem,1.8vw,1.15rem)] sm:tracking-[0.28em]">
          OCTOBER 3RD, 2026
        </p>
      </div>

      {/* Confirm attendance */}
      <button
        type="button"
        onClick={onConfirmAttendance}
        className="absolute bottom-[30px] left-1/2 z-[4] flex -translate-x-1/2 flex-col items-center gap-[14px] whitespace-nowrap border-0 bg-transparent px-5 py-2 font-sans text-[0.58rem] font-normal uppercase tracking-[0.2em] text-[#fff8e8] transition-[color,transform] duration-300 hover:-translate-x-1/2 hover:-translate-y-1 hover:text-[#e9bd68] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e9bd68] sm:bottom-[42px] sm:text-[clamp(0.62rem,1.2vw,0.82rem)] sm:tracking-[0.3em]"
      >
        <span>CONFIRM ATTENDANCE</span>

        <span className="animate-[arrowBounce_1.8s_ease-in-out_infinite] text-[1.6rem] leading-[0.6] tracking-normal motion-reduce:animate-none sm:text-[1.8rem]">
          ⌄
        </span>
      </button>
    </section>
  );
}