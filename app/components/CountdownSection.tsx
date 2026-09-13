"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const targetDate = new Date("2026-10-03T00:00:00").getTime();

function calculateTimeLeft(): TimeLeft {
  const difference = targetDate - new Date().getTime();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function formatNumber(value: number) {
  return String(value).padStart(2, "0");
}

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    calculateTimeLeft
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const countdownItems = [
    {
      value: timeLeft.days,
      label: "DAYS",
    },
    {
      value: timeLeft.hours,
      label: "HOURS",
    },
    {
      value: timeLeft.minutes,
      label: "MINUTES",
    },
    {
      value: timeLeft.seconds,
      label: "SECONDS",
    },
  ];

  const journeyItems = [
    {
      number: "01",
      title: "The Beginning",
      text: "It all started on a Thursday, Oyarazi Zuleihat (Capt_Zuuuu) was born into the family of Late Mr Diyo Ozi Naijo as the third child.",
      side: "left",
    },
    {
      number: "02",
      title: "Still Becoming",
      text: "From a baby with curious hands to a 24-year-old with a steady heart — my life has been a mix of growth, grace, and God. I’ve cried, healed, learned, and loved. Some years broke me, others built me. And here I am now, still becoming, still believing, still choosing me.",
      side: "right",
    },
  ];

  const dayProgramItems = [
    {
      time: "3:00 PM",
      title: "Guest Arrival",
      description:
        "Welcome to the Golden Era — find your seat and settle in.",
      icon: "♧",
    },
    {
      time: "5:00 PM",
      title: "Red Carpet",
      description:
        "Step into the spotlight, take your pictures, and make an entrance worthy of the Golden Era.",
      icon: "✦",
    },
    {
      time: "5:30 PM",
      title: "Ceremony",
      description:
        "A celebrant moment surrounded by the people I love most.",
      icon: "♡",
    },
    {
      time: "6:00 PM",
      title: "Cake Cutting",
      description:
        "A sweet moment to share before the feast begins.",
      icon: "♛",
    },
    {
      time: "7:00 PM",
      title: "Dinner",
      description:
        "A long-table dinner with toasts and good company.",
      icon: "♨",
    },
    {
      time: "9:00 PM",
      title: "Party",
      description:
        "Drinks flow, music starts — the celebration begins.",
      icon: "✧",
    },
    {
      time: "10:00 PM",
      title: "Dancing",
      description:
        "Dance the night away in remembrance of a love made 24 years ago. 😉",
      icon: "♫",
    },
  ];

  return (
    <section
      className="relative isolate overflow-hidden bg-[#090909] px-0 pt-8 text-center text-[#fff8e8] sm:pt-12"
      aria-labelledby="countdown-title"
    >
      {/* Shiny black background */}
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_0%,rgba(218,165,66,0.13),transparent_38%),linear-gradient(115deg,#050505,#17130d_48%,#050505)]"
        aria-hidden="true"
      />

      {/* Moving gold shine */}
      <div
        className="pointer-events-none absolute -left-1/2 top-0 -z-10 h-full w-[200%] animate-[countdownShine_14s_linear_infinite] bg-[linear-gradient(110deg,transparent_35%,rgba(255,215,120,0.045)_48%,rgba(255,215,120,0.09)_50%,rgba(255,215,120,0.045)_52%,transparent_65%)] motion-reduce:animate-none"
        aria-hidden="true"
      />

      {/* Countdown content */}
      <div className="relative mx-auto max-w-[900px] px-5 pb-10 sm:px-8 sm:pb-6">
        <p
          id="countdown-title"
          className="font-serif text-[clamp(2.4rem,6vw,4.5rem)] italic leading-none tracking-[-0.045em] text-[#fff8e8]"
        >
          Counting the days
        </p>

        <p className="mt-3 font-sans text-sm italic tracking-[0.04em] text-[#d8d0c5] sm:text-lg">
          to the most special day of my life!
        </p>

        {/* Countdown numbers */}
        <div className="mx-auto mt-4 grid max-w-[760px] grid-cols-4 gap-x-2 px-1 sm:gap-8">
          {countdownItems.map((item) => (
            <div
              key={item.label}
              className="flex min-w-0 flex-col items-center"
            >
              <span className="font-serif text-[clamp(2rem,10vw,4.5rem)] italic leading-none tracking-[-0.06em] text-[#fff8e8] [text-shadow:0_0_25px_rgba(255,215,120,0.08)]">
                {formatNumber(item.value)}
              </span>

              <span className="mt-4 font-sans text-[0.55rem] font-medium tracking-[0.18em] text-[#b9b0a5] sm:text-xs sm:tracking-[0.28em]">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Gold divider */}
        <div className="mx-auto mt-8 flex max-w-[220px] items-center justify-center gap-5 sm:mt-14 sm:max-w-[280px] sm:gap-7">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#c89a45]" />

          <span className="text-2xl font-light text-[#d9ad59]">
            ♡
          </span>

          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#c89a45]" />
        </div>
      </div>

      {/* Journey section */}
      <div className="relative mx-auto mt-4 w-full max-w-[800px] overflow-hidden rounded-[50%/27%] bg-[#e0ad45] px-5 pb-10 pt-12 text-[#17130d] shadow-[0_-15px_70px_rgba(218,165,66,0.12)] sm:mt-8 sm:rounded-[50%/32%] sm:px-12 sm:pb-14 sm:pt-16 lg:px-20">
        {/* Subtle gold texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35)_0_1px,transparent_2px),radial-gradient(circle_at_80%_70%,rgba(80,45,5,0.16)_0_1px,transparent_2px)] [background-size:90px_90px,130px_130px]"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto w-full max-w-[1000px]">
          {/* Journey heading */}
          <p className="font-serif text-lg italic leading-none sm:text-2xl">
            My Journey
          </p>

          <h2 className="mt-2 font-serif text-[clamp(2.7rem,8vw,4.5rem)] italic leading-[0.95] tracking-[-0.06em]">
            My Story
          </h2>

          <div className="mx-auto mt-2 flex max-w-[190px] items-center justify-center gap-4 sm:max-w-[280px] sm:gap-4">
            <span className="h-px flex-1 bg-black/30" />

            <span className="text-2xl font-light sm:text-3xl">
              ♡
            </span>

            <span className="h-px flex-1 bg-black/30" />
          </div>

          {/* Timeline */}
          <div className="relative mx-auto mt-10 w-full max-w-[1000px] sm:mt-6">
            {/* Timeline line */}
            <div className="absolute bottom-0 left-[18px] top-0 w-px bg-black/25 sm:left-1/2 sm:-translate-x-1/2" />

            <div className="space-y-10 sm:space-y-4">
              {journeyItems.map((item) => (
                <article
                  key={item.number}
                  className={`relative pl-12 text-left sm:grid sm:grid-cols-2 sm:gap-16 sm:pl-0 ${
                    item.side === "right"
                      ? "sm:text-left"
                      : "sm:text-right"
                  }`}
                >
                  {/* Timeline dot */}
                  <span className="absolute left-[7px] top-2 z-10 h-5 w-5 rounded-full border-4 border-[#e0ad45] bg-[#17130d] sm:left-1/2 sm:-translate-x-1/2" />

                  {/* Empty desktop side */}
                  <div
                    className={`hidden sm:block ${
                      item.side === "right"
                        ? "sm:order-1"
                        : "sm:order-2"
                    }`}
                  />

                  {/* Story content */}
                  <div
                    className={`min-w-0 ${
                      item.side === "right"
                        ? "sm:order-2"
                        : "sm:order-1"
                    }`}
                  >
                    <p className="mb-2 font-sans text-[0.6rem] font-semibold tracking-[0.25em] text-black/50">
                      {item.number}
                    </p>

                    <h3 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] italic leading-none tracking-[-0.045em]">
                      {item.title}
                    </h3>

                    <p className="mt-2 font-serif text-[0.95rem] italic leading-[1.75] text-black/85 sm:text-lg sm:leading-[1.8]">
                      {item.text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Closing statement */}
          <div className="mx-auto mt-8 max-w-[280px] border-t border-black/25 pt-5 sm:mt-10 sm:max-w-[600px] sm:pt-10">
            <p className="font-serif text-xl italic leading-[1.3] sm:text-3xl">
              My parents made Love...
            </p>

            <p className="mt-2 font-serif text-3xl italic leading-none sm:text-5xl">
              I am Love! <span aria-hidden="true">❤️</span>
            </p>
          </div>
        </div>
      </div>

      {/* Day Program Section */}
      <section
        className="relative  px-5 pb-16 pt-10 text-[#fff8e8] sm:px-8 sm:pb-2 sm:pt-15"
        aria-labelledby="day-program-title"
      >
        {/* Section heading */}
        <div className="mx-auto max-w-[1100px] text-center">
          <h2
            id="day-program-title"
            className="font-serif text-[clamp(2.0rem,7vw,4.5rem)] italic leading-none tracking-[-0.055em] text-[#fff8e8]"
          >
            Day Program
          </h2>

          <p className="mt-2 font-sans text-base text-[#bdb7af] sm:text-xl">
            What we have planned for you
          </p>
        </div>

        {/* Desktop day program */}
        <div className="relative mx-auto mt-9 hidden max-w-[1150px] lg:block">
          {/* Horizontal timeline */}
          <div className="absolute left-0 right-0 top-[76px] h-px bg-white/25" />

          <div className="grid grid-cols-7 gap-5">
            {dayProgramItems.map((item) => (
              <article
                key={item.time}
                className="relative flex min-w-0 flex-col items-center text-center"
              >
                {/* Time */}
                <span className="relative z-10 rounded-full bg-[#fff8e8] px-4 py-2 font-sans text-sm font-semibold text-[#292929]">
                  {item.time}
                </span>

                {/* Icon circle */}
                <div className="relative z-10 mt-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#fff8e8] bg-[#fff8e8] text-3xl text-[#292929]">
                  <span aria-hidden="true">{item.icon}</span>
                </div>

                {/* Text */}
                <h3 className="mt-6 font-serif text-xl leading-tight text-[#fff8e8]">
                  {item.title}
                </h3>

                <p className="mt-2 max-w-[150px] font-sans text-sm leading-6 text-[#bdb7af]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Mobile and tablet day program */}
        <div className="relative mx-auto mt-8 max-w-[650px] lg:hidden">
          {/* Vertical timeline */}
          <div className="absolute bottom-5 left-[30px] top-5 w-px bg-white/25" />

          <div className="space-y-5">
            {dayProgramItems.map((item) => (
              <article
                key={item.time}
                className="relative grid grid-cols-[47px_minmax(0,1fr)] gap-2 text-left"
              >
                {/* Icon circle */}
                <div className="relative z-10 flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#fff8e8] bg-[#fff8e8] text-2xl text-[#292929]">
                  <span aria-hidden="true">{item.icon}</span>
                </div>

                {/* Program details */}
                <div className="min-w-0 pt-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-md bg-[#fff8e8] px-3 py-0.5 font-sans text-sm font-semibold text-[#292929]">
                      {item.time}
                    </span>

                    <h3 className="font-serif text-xl leading-tight tracking-[0.055em]  text-[#fff8e8]">
                      {item.title}
                    </h3>
                  </div>

                  <p className="mt-2 max-w-[500px] font-sans text-sm leading-5 text-[#bdb7af]">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Balloon image space */}
     
<div className="mx-auto mt-2 flex min-h-[220px] w-full max-w-[420px] items-center justify-center sm:mt-2 sm:min-h-[10px]">
  <Image
    src="/images/gold-balloons2.webp"
    alt="Golden birthday balloons"
    width={420}
    height={300}
    className="h-50 w-100px object-contain"
  />
</div>
      </section>
    </section>
  );
}