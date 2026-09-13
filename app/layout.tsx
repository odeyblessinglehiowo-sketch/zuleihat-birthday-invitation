import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Yusuf Oyarazi Zuleihat | Birthday Celebration",
  description:
    "Join Yusuf Oyarazi Zuleihat as she celebrates her birthday on October 3rd, 2026.",
  keywords: [
    "Yusuf Oyarazi Zuleihat",
    "Zuleihat birthday",
    "birthday invitation",
    "October 3rd 2026",
  ],
  openGraph: {
    title: "Yusuf Oyarazi Zuleihat | Birthday Celebration",
    description:
      "You are warmly invited to celebrate a beautiful new chapter with Zuleihat.",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#fffdf9] font-sans text-[#2a2a2a]">
        {children}
      </body>
    </html>
  );
}