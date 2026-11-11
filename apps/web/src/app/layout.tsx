import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/context/ThemeContext";

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
    "Discover, research, and explore verified breakthroughs in Artificial Intelligence, Technology, Science, and Innovation.",
  keywords: [
    "Artificial Intelligence",
    "Quantum Computing",
    "Science",
    "Technology",
    "Innovation",
  ],
  authors: [{ name: "KEIGO" }],
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
      <body className="min-h-full flex flex-col bg-[#F8FAFC] dark:bg-[#121212] text-[#172554] dark:text-[#EDEDED] font-inter selection:bg-[#BAE6FD] selection:text-[#172554]">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 w-full">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
