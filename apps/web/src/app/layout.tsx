import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | KEIGO",
    default: "KEIGO — Curiosity. Clarity. Discovery.",
  },
  description:
    "Independent science, frontier AI, and deep technology intelligence publication.",
  keywords: [
    "Artificial Intelligence",
    "Quantum Computing",
    "Autonomous Agents",
    "Science",
    "Deep Technology",
  ],
  authors: [{ name: "KEIGO Editorial" }],
  openGraph: {
    title: "KEIGO — Curiosity. Clarity. Discovery.",
    description: "Deep technical journalism and verified breakthroughs in AI, Tech, Science, and Innovation.",
    siteName: "KEIGO",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#161616] text-[#EDEDED] font-inter selection:bg-[#38bdf8] selection:text-[#000000]">
        <Navbar />
        <main className="flex-1 w-full pt-20 sm:pt-24 pb-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
