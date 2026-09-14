"use client";

import { FormEvent, useState } from "react";

type RSVPResponse = {
  success: boolean;
  message?: string;
  attendance?: boolean;
  allocatedTable?: number | null;
};

const MAX_ADDITIONAL_GUESTS = 3;
const MAX_TOTAL_SEATS = 4;

export default function BirthdayRSVP() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [attendance, setAttendance] = useState("");
  const [guestsBringing, setGuestsBringing] = useState("0");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState<RSVPResponse | null>(null);

  const submitRSVP = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!fullName.trim() || !email.trim() || !attendance) {
      setResponse({
        success: false,
        message: "Please complete all required fields.",
      });

      return;
    }

    if (!message.trim()) {
      setResponse({
        success: false,
        message: "Please leave a birthday message before submitting.",
      });

      return;
    }

    const numberOfGuests = Number(guestsBringing);

    if (
      attendance === "ATTENDING" &&
      (numberOfGuests < 0 ||
        numberOfGuests > MAX_ADDITIONAL_GUESTS ||
        !Number.isInteger(numberOfGuests))
    ) {
      setResponse({
        success: false,
        message: `You can bring a maximum of ${MAX_ADDITIONAL_GUESTS} additional guests, making ${MAX_TOTAL_SEATS} people in total.`,
      });

      return;
    }

    setIsSubmitting(true);
    setResponse(null);

    try {
      const result = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          attendance,
          guestsBringing: attendance === "ATTENDING" ? numberOfGuests : 0,
          message: message.trim(),
        }),
      });

      const data: RSVPResponse = await result.json();

      setResponse(data);

      if (data.success) {
        setFullName("");
        setEmail("");
        setAttendance("");
        setGuestsBringing("0");
        setMessage("");
      }
    } catch {
      setResponse({
        success: false,
        message:
          "Unable to submit your RSVP. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isAttending = attendance === "ATTENDING";
  const isBringingGuests =
    isAttending && Number(guestsBringing) > 0;

  return (
    <section
      id="attendance"
      className="relative isolate overflow-hidden bg-[#050505] px-5 py-4 text-[#fff8e8] sm:px-8 sm:py-10"
      aria-labelledby="rsvp-title"
    >
      {/* Gold glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#d9ad59]/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[760px]">
        <div className="mb-2 text-center sm:mb-14">
          <p className="font-sans text-sm uppercase tracking-[0.35em] text-[#d9ad59]">
            Save Your Seat
          </p>

          <h2
            id="rsvp-title"
            className="mt-2 font-serif text-[clamp(2rem,8vw,5.5rem)] italic leading-none tracking-[0.05em]"
          >
            Join Me
          </h2>

          <p className="mx-auto mt-2 max-w-[660px] font-serif text-base italic leading-8 text-[#d0c6b9] sm:text-lg">
            I would love to celebrate this beautiful milestone with you.
            Kindly confirm your attendance and let me know if you will be
            bringing someone along.
          </p>
        </div>

        <form
          onSubmit={submitRSVP}
          className="rounded-[1rem] border border-[#d9ad59]/40 bg-[#0d0d0d] p-5 shadow-[0_0_60px_rgba(217,173,89,0.08)] sm:p-10"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Full name */}
            <label className="flex flex-col gap-2">
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#d9ad59]">
                Full name
              </span>

              <input
                type="text"
                required
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Enter your name"
                className="w-full rounded-sm border border-white/65 bg-black px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#d9ad59]"
              />
            </label>

            {/* Email */}
            <label className="flex flex-col gap-2">
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#d9ad59]">
                Email address
              </span>

              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-sm border border-white/65 bg-black px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#d9ad59]"
              />
            </label>

            {/* Attendance */}
            <fieldset className="sm:col-span-2">
              <legend className="mb-3 font-sans text-xs uppercase tracking-[0.2em] text-[#d9ad59]">
                Will you attend?
              </legend>

              <div className="grid gap-3 sm:grid-cols-2">
                <label
                  className={`cursor-pointer rounded-sm border px-4 py-4 text-sm transition ${
                    attendance === "ATTENDING"
                      ? "border-[#d9ad59] bg-[#d9ad59] text-black"
                      : "border-white/65 bg-black text-white hover:border-[#d9ad59]"
                  }`}
                >
                  <input
                    type="radio"
                    name="attendance"
                    value="ATTENDING"
                    checked={attendance === "ATTENDING"}
                    onChange={(event) =>
                      setAttendance(event.target.value)
                    }
                    className="sr-only"
                  />

                  <span>Joyfully accept 🎉</span>
                </label>

                <label
                  className={`cursor-pointer rounded-sm border px-4 py-4 text-sm transition ${
                    attendance === "NOT_ATTENDING"
                      ? "border-[#d9ad59] bg-[#d9ad59] text-black"
                      : "border-white/65 bg-black text-white hover:border-[#d9ad59]"
                  }`}
                >
                  <input
                    type="radio"
                    name="attendance"
                    value="NOT_ATTENDING"
                    checked={attendance === "NOT_ATTENDING"}
                    onChange={(event) =>
                      setAttendance(event.target.value)
                    }
                    className="sr-only"
                  />

                  <span>Regretfully decline</span>
                </label>
              </div>
            </fieldset>

            {/* Additional guests */}
            {isAttending && (
              <label className="flex flex-col gap-2 sm:col-span-2">
                <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#d9ad59]">
                  How many people are you bringing?
                </span>

                <select
                  value={guestsBringing}
                  onChange={(event) =>
                    setGuestsBringing(event.target.value)
                  }
                  className="w-full rounded-sm border border-white/65 bg-black px-4 py-3 text-sm text-white outline-none transition focus:border-[#d9ad59]"
                >
                  <option value="0">I am coming alone</option>
                  <option value="1">1 additional person</option>
                  <option value="2">2 additional people</option>
                  <option value="3">3 additional people</option>
                </select>

                <p className="text-xs leading-6 text-[#d0c6b9]">
                  Each table accommodates a maximum of{" "}
                  <strong className="text-[#d9ad59]">
                    {MAX_TOTAL_SEATS} people
                  </strong>
                  . Your table will be allocated automatically after
                  submission.
                </p>

                {isBringingGuests && (
                  <p className="text-xs leading-6 text-[#d0c6b9]">
                    Your group will require{" "}
                    <strong className="text-[#d9ad59]">
                      {Number(guestsBringing) + 1} seats
                    </strong>
                    . A table will be allocated automatically after
                    submission.
                  </p>
                )}
              </label>
            )}

            {/* Birthday message */}
            <label className="flex flex-col gap-2 sm:col-span-2">
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#d9ad59]">
                Birthday Goodwill{" "}
                <span className="text-[#e9bd68]">*</span>
              </span>

              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                rows={4}
                required
                minLength={2}
                placeholder="Leave a birthday message..."
                className="w-full resize-none rounded-sm border border-white/65 bg-black px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#d9ad59]"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !attendance}
            className="mt-8 w-full rounded-sm bg-[#d9ad59] px-5 py-4 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-[#f0cd83] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSubmitting ? "Sending RSVP..." : "Send RSVP"}
          </button>
        </form>
      </div>

      {/* Confirmation popup */}
      {response && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="rsvp-response-title"
        >
          <div className="w-full max-w-[400px] rounded-[2rem] border border-[#d9ad59]/50 bg-[#111111] p-7 text-center text-[#fff8e8] shadow-[0_0_80px_rgba(217,173,89,0.18)] sm:p-10">
            {response.success ? (
              <>
                <p className="text-4xl">
                  {response.attendance ? "🎉" : "💛"}
                </p>

                <h3
                  id="rsvp-response-title"
                  className="mt-2 font-serif text-xl italic text-[#d9ad59]"
                >
                  {response.attendance
                    ? "You're on the Guest List!"
                    : "I'll Miss You"}
                </h3>

                <p className="mt-2 font-serif text-sm italic leading-5 text-[#d0c6b9]">
                  {response.attendance
                    ? response.allocatedTable
                      ? "Thank you for confirming your attendance. Your table is"
                      : "Thank you for confirming your attendance. I can't wait to celebrate with you!"
                    : "Thank you for letting me know. I understand you can't make it. You'll be in my thoughts, and I hope to see you very soon."}
                </p>

                {response.attendance && response.allocatedTable && (
                  <p className="mt-4 font-sans text-2xl font-bold text-[#d9ad59]">
                    Table {response.allocatedTable}
                  </p>
                )}

                {response.attendance && response.allocatedTable && (
                  <p className="mt-2 text-sm text-[#d0c6b9]">
                    Please don't forget your table number.
                  </p>
                )}
              </>
            ) : (
              <>
                <p className="text-4xl">⚠️</p>

                <h3
                  id="rsvp-response-title"
                  className="mt-5 font-serif text-3xl italic text-[#d9ad59]"
                >
                  Almost there
                </h3>

                <p className="mt-5 text-sm leading-7 text-[#d0c6b9]">
                  {response.message}
                </p>
              </>
            )}

            <button
              type="button"
              onClick={() => setResponse(null)}
              className="mt-5 rounded-sm border border-[#d9ad59] px-7 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#d9ad59] transition hover:bg-[#d9ad59] hover:text-black"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}