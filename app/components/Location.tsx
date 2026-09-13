"use client";

import Image from "next/image";

export default function BirthdayDetails() {
  const openMaps = () => {
    window.open(
      "https://www.google.com/maps/search/?api=1&query=Divino+Pool+Bar+and+Grills+Beside+Los+Angeles+Mall+Wuse+2+Abuja",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const addToCalendar = () => {
    const calendarUrl =
      "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      "&text=Yusuf%27s+Birthday+Celebration" +
      "&dates=20261003T150000/20261003T200000" +
      "&details=Come+celebrate+Yusuf%27s+special+day+with+him!" +
      "&location=Divino+Pool+Bar+and+Grills%2C+Beside+Los+Angeles+Mall%2C+Wuse+2%2C+Abuja";

    window.open(calendarUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      className="relative overflow-hidden bg-[#050505] px-5 py-6 text-center text-[#fff8e8] sm:px-8 sm:py-10"
      aria-labelledby="event-details-title"
    >
      {/* Subtle background glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(218,165,66,0.12),transparent_38%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[700px]">
        {/* Section heading */}
        <p className="font-sans text-sm font-medium uppercase tracking-[0.4em] text-[#d9ad59] sm:text-xl">
          Join Me
        </p>

        <h2
          id="event-details-title"
          className="mt-2 font-serif text-[clamp(1.8rem,7vw,4rem)] italic leading-none tracking-[-0.055em] text-[#fff8e8]"
        >
          Let’s Celebrate Me
        </h2>

        <p className="mx-auto mt-2 max-w-[600px] font-sans text-sm leading-5 text-[#c8c0b5] sm:text-lg sm:leading-6">
          I can’t wait to celebrate my special day with you. Here’s
          everything you need to know as we make beautiful memories
          together.
        </p>

        {/* Gold divider */}
        <div className="mx-auto mt-2 flex max-w-[220px] items-center justify-center gap-5 sm:mt-2 sm:max-w-[280px]">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#c89a45]" />

          <span className="text-3xl font-light text-[#d9ad59]">♡</span>

          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#c89a45]" />
        </div>

        {/* Event card */}
        <div className="mx-auto mt-3 overflow-hidden rounded-[2rem] bg-[#e0ad45] px-5 py-4 text-[#17130d] shadow-[0_20px_80px_rgba(218,165,66,0.08)] sm:mt-6 sm:px-10 sm:py-5">
          {/* Card icon */}
          <div className="mx-auto flex h-15 w-15 items-center justify-center rounded-full bg-[#17130d] text-5xl text-[#ffffff]">
            ✦
          </div>

          <p className="mt-3 font-serif text-2xl italic leading-none sm:text-3xl">
            Birthday Celebration
          </p>

          {/* Time */}
          <div className="mt-3 flex items-center justify-center gap-3 text-2xl text-[#17130d] sm:text-3xl">
            <span>3:00 PM</span>
          </div>

          {/* Location */}
          <div className="mt-2 flex items-start justify-center gap-3 text-xl leading-5 text-[#17130d] sm:text-lg">
    

            <div>
              <p className="font-medium text-[#403a34]">
                Divino Pool Bar and Grills
              </p>

              <p>Beside Los Angeles Mall</p>
              <p>Wuse 2, Abuja</p>
            </div>
          </div>

          {/* Map */}
          <div className="mt-5 overflow-hidden rounded-2xl border border-[#ded4c7] bg-[#e9e0d5]">
            <iframe
              title="Map showing Divino Pool Bar and Grills"
              src="https://www.google.com/maps?q=Divino+Pool+Bar+and+Grills,+Beside+Los+Angeles+Mall,+Wuse+2,+Abuja&output=embed"
              className="h-[260px] w-full border-0 sm:h-[360px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-[700px] font-sans text-sm leading-5 text-[#17130d] sm:text-base sm:leading-5">
            Come celebrate with me at Divino Pool Bar and Grills as I
            step into another beautiful year surrounded by good people,
            laughter, love, and unforgettable memories.
          </p>

          {/* Action buttons */}
<div className="mt-5 flex w-full flex-col gap-3 sm:flex-row sm:items-stretch sm:justify-center">
  {/* Maps button */}
  <button
    type="button"
    onClick={openMaps}
    className="inline-flex min-h-10 w-full items-center justify-center gap-3 rounded-xl border border-[#17130d] bg-transparent px-5 py-3 font-sans text-sm font-medium text-[#29231d] transition duration-300 hover:border-[#a77a2d] hover:bg-[#e9dfd2] focus:outline-none focus:ring-2 focus:ring-[#c89a45] focus:ring-offset-2 sm:flex-1"
  >
    <span aria-hidden="true" className="text-base">
      ➤
    </span>
    <span>Open in Maps</span>
  </button>

  {/* Calendar button */}
  <button
    type="button"
    onClick={addToCalendar}
    className="inline-flex min-h-10 w-full items-center justify-center gap-3 rounded-xl bg-[#17130d] px-5 py-3 font-sans text-sm font-medium text-[#f7f0e6] transition duration-300 hover:bg-[#d9ad59] hover:text-[#17130d] focus:outline-none focus:ring-2 focus:ring-[#c89a45] focus:ring-offset-2 sm:flex-1"
  >
    <span aria-hidden="true" className="text-base">
      ▣
    </span>
    <span>Add to Calendar</span>
  </button>
</div>
</div>
       
      </div>

      {/* Candlestick image section */}
      <div className="relative z-10 mx-auto mt-5 flex min-h-[300px] w-full max-w-[600px] items-center justify-center sm:mt-15 sm:min-h-[220px]">
        <Image
          src="/images/candlestick.webp"
          alt="Decorative black candlestick"
          width={600}
          height={600}
          className="h-80 w-full max-w-[320px] object-contain"
        />
      </div>
    </section>
  );
}