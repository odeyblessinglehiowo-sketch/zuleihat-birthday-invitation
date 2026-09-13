"use client";

import Image from "next/image";

const menuSections = [
  {
    number: "I.",
    title: "Starters",
    items: [
      {
        name: "Fruit Salad",
        description: "A fresh mix of seasonal fruits.",
      },
      {
        name: "Mocktail",
        description: "A chilled, refreshing blend to set the mood.",
      },
    ],
  },
  {
    number: "II.",
    title: "Main Courses",
    items: [
      {
        name: "Smokey Jollof",
        description: "Rich, smoky and full of flavour.",
      },
      {
        name: "Grilled Beef",
        description: "Tender, juicy and perfectly grilled.",
      },
      {
        name: "Salad",
        description: "A crisp and refreshing complement to your meal.",
      },
    ],
  },
  {
    number: "III.",
    title: "Desserts",
    items: [
      {
        name: "Cakes",
        description:
          "A selection of delicious cakes in different flavours, because every celebration deserves something sweet.",
      },
    ],
  },
];

function GoldDivider() {
  return (
    <div className="my-7 flex items-center justify-center gap-3">
      <span className="h-px w-14 bg-[#c69a45]" />
      <span className="h-2 w-2 rotate-45 bg-[#c69a45]" />
      <span className="h-px w-14 bg-[#c69a45]" />
    </div>
  );
}

function DecorativeLeaves({
  position,
}: {
  position: "top" | "bottom";
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${
        position === "top"
          ? "-right-7 top-8"
          : "-bottom-8 -left-8"
      } z-10 w-32 sm:w-40`}
    >
      <svg
        viewBox="0 0 180 220"
        className="h-auto w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M91 210C88 164 89 113 108 66"
          stroke="#C69A45"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        <path
          d="M92 164C57 153 35 123 40 87C76 94 98 121 92 164Z"
          fill="#17130D"
          stroke="#C69A45"
          strokeWidth="1.5"
        />

        <path
          d="M99 119C112 81 140 61 166 67C164 99 140 124 99 119Z"
          fill="#17130D"
          stroke="#C69A45"
          strokeWidth="1.5"
        />

        <path
          d="M91 165L42 89M99 119L164 69"
          stroke="#C69A45"
          strokeWidth="1"
          strokeLinecap="round"
        />

        <path
          d="M102 72C90 48 93 25 109 8"
          stroke="#C69A45"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        <circle cx="109" cy="8" r="4" fill="#C69A45" />
        <circle cx="166" cy="67" r="3" fill="#C69A45" />
        <circle cx="40" cy="87" r="3" fill="#C69A45" />
      </svg>
    </div>
  );
}

export default function BirthdayMenu() {
  return (
    <section
      id="menu"
      className="relative overflow-hidden bg-[#fbfaf7] px-5 py-6 text-[#17130d] sm:px-8 sm:py-10"
    >
      <div className="mx-auto w-full max-w-xl">
        {/* Header image */}
        <div className="mx-auto max-w-xs">
          <Image
            src="/images/birthday-table.png"
            alt="Elegant black and gold birthday dinner table"
            width={1200}
            height={700}
            className="h-40 w-full object-contain"
          />
        </div>

        {/* Section heading */}
        <div className="mt-2 text-center sm:mt-0">
          <p className="font-serif text-4xl leading-none tracking-wide sm:text-6xl">
            Menu
          </p>

          <p className="mt-2 text-xs font-medium uppercase tracking-[0.38em] text-[#756f68] sm:text-sm sm:tracking-[0.5em]">
            A Taste of What Awaits You
          </p>

          <div className="mt-1 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-[#c69a45]" />
            <span className="h-2 w-2 rotate-45 bg-[#c69a45]" />
            <span className="h-px w-16 bg-[#c69a45]" />
          </div>
        </div>

        {/* Menu card */}
        <div className="relative mx-auto mt3 max-w-4xl rounded-[2.0rem] bg-white p-3 shadow-[0_18px_60px_rgba(23,19,13,0.08)] sm:mt-3 sm:p-4">
          <DecorativeLeaves position="top" />
          <DecorativeLeaves position="bottom" />

          <div className="relative rounded-[2rem] border border-[#c69a45] px-6 py-2 sm:px-10 sm:py-2">
            {/* Inner corner accents */}
            <span className="absolute left-0 top-0 h-10 w-10 rounded-tl-[1rem] border-l border-t border-[#c69a45]" />
            <span className="absolute bottom-0 right-0 h-10 w-10 rounded-br-[1rem] border-b border-r border-[#c69a45]" />

            {menuSections.map((section, sectionIndex) => (
              <div key={section.title} className="relative text-center">
                <p className="font-serif text-sm italic tracking-[0.3em] text-[#c69a45] sm:text-base">
                  {section.number}
                </p>

                <h2 className="mt-1 font-serif text-2xl italic leading-wide sm:text-3xl">
                  {section.title}
                </h2>

                <div className="mx-auto mt-2 max-w-2xl">
                  {section.items.map((item, itemIndex) => (
                    <div key={item.name}>
                      <div className="px-1">
                        <h3 className="font-serif text-base leading-snug sm:text-base">
                          {item.name}
                        </h3>

                        <p className="mx-auto mt-1 max-w-2xl font-sans text-sm italic leading-relaxed text-[#77716b] sm:text-sm">
                          {item.description}
                        </p>
                      </div>

                      {itemIndex !== section.items.length - 1 && (
                        <GoldDivider />
                      )}
                    </div>
                  ))}
                </div>

                {sectionIndex !== menuSections.length - 1 && (
                  <div className="mx-auto mt-1 max-w-xs">
                    <GoldDivider />
                  </div>
                )}
              </div>
            ))}

            {/* Closing line */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[8px] font-medium uppercase tracking-[0.2em] text-[#765322] sm:text-xs sm:tracking-[0.25em]">
              <span className="h-px w-12 bg-[#c69a45]" />
              <span>Good Food</span>
              <span className="h-1.5 w-1.5 rotate-45 bg-[#c69a45]" />
              <span>Great Company</span>
              <span className="h-1.5 w-1.5 rotate-45 bg-[#c69a45]" />
              <span>More Memories</span>
              <span className="h-px w-12 bg-[#c69a45]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}