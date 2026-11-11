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
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | KEIGO",
    default: "KEIGO — Curiosity. Clarity. Discovery.",
  },
  description:
    "Independent global media discovering, researching, and explaining key breakthroughs in Artificial Intelligence, Technology, Science, and Innovation.",
  keywords: [
    "Artificial Intelligence",
    "Technology",
    "Science",
    "Innovation",
    "Research",
    "Engineering",
  ],
  authors: [{ name: "KEIGO Editorial Team" }],
  openGraph: {
    title: "KEIGO — Curiosity. Clarity. Discovery.",
    description:
      "Deep technical journalism and verified breakthroughs in AI, Tech, Science, and Innovation.",
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
      <body className="min-h-full flex flex-col bg-[#F8FAFC] text-[#172554] font-inter">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
