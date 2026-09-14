import { NextResponse } from "next/server";
import { Resend } from "resend";

import { prisma } from "@/app/lib/prisma";
import { AttendanceStatus } from "@prisma/client";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ||
  "Zuleihat's Birthday <onboarding@resend.dev>";

const RSVP_RECEIVER_EMAIL =
  process.env.RSVP_RECEIVER_EMAIL?.trim();

const TOTAL_TABLES = 15;
const SEATS_PER_TABLE = 4;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function shuffleNumbers(numbers: number[]) {
  const shuffled = [...numbers];

  for (let index = shuffled.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(
      Math.random() * (index + 1)
    );

    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled;
}

async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error(
      "RESEND_API_KEY is missing from the environment variables."
    );
  }

  const result = await resend.emails.send({
    from: FROM_EMAIL,
    to: [to],
    subject,
    html,
  });

  if (result.error) {
    console.error("Resend email error:", result.error);

    throw new Error(
      `Resend failed to send email: ${result.error.message}`
    );
  }

  console.log("Email sent successfully:", {
    to,
    subject,
    emailId: result.data?.id,
  });

  return result.data;
}

export async function POST(request: Request) {
  try {
    if (!RSVP_RECEIVER_EMAIL) {
      console.error(
        "RSVP_RECEIVER_EMAIL is missing from the environment variables."
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "The RSVP receiver email has not been configured.",
        },
        { status: 500 }
      );
    }

    const body = await request.json();

    const fullName = String(body.fullName ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const attendance = String(body.attendance ?? "").trim();
    const guestsBringing = Number(body.guestsBringing ?? 0);
    const message = String(body.message ?? "").trim();

    /*
     * Required field validation
     */
    if (!fullName || !email || !attendance || !message) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please complete all required fields, including your birthday message.",
        },
        { status: 400 }
      );
    }

    /*
     * Birthday message validation
     */
    if (message.length < 2) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a meaningful birthday message.",
        },
        { status: 400 }
      );
    }

    /*
     * Email validation
     */
    const emailIsValid =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailIsValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    /*
     * Attendance validation
     */
    if (
      attendance !== "ATTENDING" &&
      attendance !== "NOT_ATTENDING"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select your attendance status.",
        },
        { status: 400 }
      );
    }

    /*
     * A table has 4 seats:
     *
     * Guest alone = 1 person
     * Guest + 1 = 2 people
     * Guest + 2 = 3 people
     * Guest + 3 = 4 people
     *
     * Therefore, guestsBringing cannot exceed 3.
     */
    if (
      !Number.isInteger(guestsBringing) ||
      guestsBringing < 0 ||
      guestsBringing > SEATS_PER_TABLE - 1
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You can bring a maximum of 3 additional guests, making 4 people in total.",
        },
        { status: 400 }
      );
    }

    const isAttending =
      attendance === AttendanceStatus.ATTENDING;

    const safeGuestsBringing = isAttending
      ? guestsBringing
      : 0;

    const totalPartySize = isAttending
      ? safeGuestsBringing + 1
      : 0;

    /*
     * Extra safety check.
     */
    if (
      isAttending &&
      totalPartySize > SEATS_PER_TABLE
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Each table has a maximum capacity of 4 people.",
        },
        { status: 400 }
      );
    }

    let allocatedTable: number | null = null;

    /*
     * A table is allocated when the guest is attending
     * and bringing at least one additional person.
     *
     * Guests attending alone will be confirmed without
     * a table allocation under the current system.
     */
    if (isAttending && safeGuestsBringing > 0) {
      allocatedTable = await prisma.$transaction(
        async (transaction) => {
          const availableTables =
            await transaction.birthdayTable.findMany({
              where: {
                tableNumber: {
                  gte: 1,
                  lte: TOTAL_TABLES,
                },
                capacity: {
                  gte: totalPartySize,
                },
                occupiedSeats: {
                  lte: SEATS_PER_TABLE - totalPartySize,
                },
              },
              select: {
                tableNumber: true,
              },
            });

          if (availableTables.length === 0) {
            throw new Error("NO_TABLE_AVAILABLE");
          }

          const randomizedTables = shuffleNumbers(
            availableTables.map(
              (table) => table.tableNumber
            )
          );

          for (const tableNumber of randomizedTables) {
            const updatedTable =
              await transaction.birthdayTable.updateMany({
                where: {
                  tableNumber,
                  occupiedSeats: {
                    lte: SEATS_PER_TABLE - totalPartySize,
                  },
                },
                data: {
                  occupiedSeats: {
                    increment: totalPartySize,
                  },
                },
              });

            if (updatedTable.count === 1) {
              return tableNumber;
            }
          }

          throw new Error("NO_TABLE_AVAILABLE");
        },
        {
          maxWait: 15000,
          timeout: 30000,
        }
      );
    }

    /*
     * Save the RSVP
     */
    const rsvp = await prisma.rSVP.create({
      data: {
        fullName,
        email,
        attendance: isAttending
          ? AttendanceStatus.ATTENDING
          : AttendanceStatus.NOT_ATTENDING,
        guestsBringing: safeGuestsBringing,
        totalPartySize,
        allocatedTable,
        message,
      },
    });

    const guestMessage = !isAttending
      ? `
        <h2 style="color: #b58a3a;">
          I'll Miss You 💛
        </h2>

        <p>
          Thank you for letting me know.
          I understand you can't make it.
        </p>

        <p>
          You'll be in my thoughts, and I hope to see you
          very soon.
        </p>
      `
      : allocatedTable
        ? `
          <h2 style="color: #b58a3a;">
            Your RSVP is Confirmed! 🎉
          </h2>

          <p>
            Thank you for confirming your attendance.
          </p>

          <p>
            Your allocated table is:
            <strong style="font-size: 20px;">
              Table ${allocatedTable}
            </strong>
          </p>

          <p>
            Please don't forget your table number.
            I can't wait to celebrate this special day with you!
          </p>
        `
        : `
          <h2 style="color: #b58a3a;">
            You're on the Guest List! 🎉
          </h2>

          <p>
            Thank you for confirming your attendance.
          </p>

          <p>
            I can't wait to celebrate this special day with you!
          </p>
        `;

    /*
     * Email sent to the birthday celebrant
     */
    await sendEmail({
      to: RSVP_RECEIVER_EMAIL,
      subject: `New Birthday RSVP — ${fullName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <body
            style="
              margin: 0;
              padding: 24px;
              background: #f7f3eb;
              font-family: Arial, sans-serif;
              color: #222;
              line-height: 1.7;
            "
          >
            <div
              style="
                max-width: 650px;
                margin: 0 auto;
                padding: 30px;
                background: #ffffff;
                border: 1px solid #d4af37;
                border-radius: 14px;
              "
            >
              <h1
                style="
                  margin-top: 0;
                  color: #b58a3a;
                  text-align: center;
                "
              >
                New Birthday RSVP 🎉
              </h1>

              <p>
                Someone has submitted an RSVP through the
                birthday invitation website.
              </p>

              <hr />

              <p>
                <strong>Full name:</strong>
                ${escapeHtml(fullName)}
              </p>

              <p>
                <strong>Email:</strong>
                ${escapeHtml(email)}
              </p>

              <p>
                <strong>Attendance:</strong>
                ${
                  isAttending
                    ? "Attending"
                    : "Not attending"
                }
              </p>

              <p>
                <strong>Guests bringing:</strong>
                ${safeGuestsBringing}
              </p>

              <p>
                <strong>Total party size:</strong>
                ${totalPartySize}
              </p>

              <p>
                <strong>Allocated table:</strong>
                ${
                  allocatedTable
                    ? `<strong>Table ${allocatedTable}</strong>`
                    : "No table allocated"
                }
              </p>

              <p>
                <strong>Message:</strong><br />
                ${escapeHtml(message)}
              </p>

              <hr />

              <p
                style="
                  margin-bottom: 0;
                  color: #777;
                  font-size: 13px;
                "
              >
                Submitted from the birthday invitation website.
              </p>
            </div>
          </body>
        </html>
      `,
    });

    /*
     * Confirmation email sent to the guest
     */
    await sendEmail({
      to: email,
      subject: "Your Birthday RSVP Confirmation 🎉",
      html: `
        <!DOCTYPE html>
        <html>
          <body
            style="
              margin: 0;
              padding: 24px;
              background: #f7f3eb;
              font-family: Arial, sans-serif;
              color: #222;
              line-height: 1.7;
            "
          >
            <div
              style="
                max-width: 650px;
                margin: 0 auto;
                padding: 30px;
                background: #ffffff;
                border: 1px solid #d4af37;
                border-radius: 14px;
              "
            >
              ${guestMessage}

              <hr />

              <p>
                <strong>
                  Zuleihat's Birthday Celebration
                </strong>
              </p>

              <p>
                <strong>Date:</strong> October 3rd, 2026
                <br />

                <strong>Time:</strong> 3:00 PM
                <br />

                <strong>Venue:</strong>
                Divino Pool Bar and Grills,
                beside Los Angeles Mall, Wuse 2.
              </p>

              <p
                style="
                  margin-bottom: 0;
                  color: #b58a3a;
                  font-weight: bold;
                "
              >
                Thank you for being part of the celebration.
              </p>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({
      success: true,
      attendance: isAttending,
      allocatedTable,
      message: isAttending
        ? allocatedTable
          ? "Your RSVP is confirmed."
          : "Your RSVP is confirmed. No table allocation was needed."
        : "Thank you for letting us know.",
      rsvpId: rsvp.id,
    });
  } catch (error) {
    console.error("RSVP submission error:", error);

    if (
      error instanceof Error &&
      error.message === "NO_TABLE_AVAILABLE"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "We're sorry, there are no tables with enough available seats for your group.",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error &&
          error.message.includes("Resend failed")
            ? "Your RSVP was saved, but the email could not be sent. Please contact the celebrant directly."
            : "Something went wrong while submitting your RSVP. Please try again.",
      },
      { status: 500 }
    );
  }
}