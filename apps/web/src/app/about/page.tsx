import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About KEIGO — Curiosity. Clarity. Discovery.',
  description:
    'The philosophy, inspiration, and technical architecture behind KEIGO — an autonomous science and technology intelligence publication.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-10 py-8 sm:py-16 space-y-16">
      {/* Header */}
      <header className="space-y-4 border-b border-white/[0.08] pb-10">
        <span className="font-mono text-xs text-[#38BDF8] uppercase tracking-widest">
          [ MANIFESTO & ORIGINS ]
        </span>
        <h1 className="font-space-grotesk font-bold text-4xl sm:text-6xl text-white tracking-tight uppercase">
          About KEIGO<span className="text-[#38BDF8]">.</span>
        </h1>
        <p className="font-inter text-xl text-[#A8A8A8] font-light">
          Curiosity. Clarity. Discovery.
        </p>
      </header>

      {/* Narrative */}
      <div className="space-y-8 font-inter text-[#CCCCCC] text-base sm:text-lg leading-relaxed font-light">
        <p className="text-white text-xl sm:text-2xl font-normal leading-snug">
          KEIGO was founded to cut through the sensationalism and shallow summaries dominating modern technology reporting, providing readers with deeply reasoned, technically precise, and verifiable intelligence.
        </p>

        <section className="space-y-4 pt-6 border-t border-white/[0.08]">
          <h2 className="font-space-grotesk font-bold text-2xl text-white uppercase tracking-tight">
            The Name & Spirit
          </h2>
          <p>
            Inspired by the spirit of intellectual deduction and relentless inquiry epitomized by master detective fiction—most notably Keigo Higashino—we approach frontier science and engineering not as mere press releases, but as mysteries to be methodically disassembled, understood, and verified.
          </p>
          <p>
            Every scientific claim has a foundation. Every machine learning breakthrough has architectural trade-offs. Our mission is to trace those foundations to their primary sources: peer-reviewed preprints, engineering whitepapers, hardware telemetry, and direct laboratory disclosures.
          </p>
        </section>

        <section className="space-y-6 pt-6 border-t border-white/[0.08]">
          <h2 className="font-space-grotesk font-bold text-2xl text-white uppercase tracking-tight">
            Autonomous Technical Architecture
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#1C1C1C] space-y-2">
              <span className="font-mono text-xs text-[#38BDF8]">[ 01 ]</span>
              <h3 className="font-space-grotesk font-bold text-base text-white uppercase">
                Multi-Source Ingestion
              </h3>
              <p className="text-xs text-[#A8A8A8] leading-relaxed">
                Real-time monitoring of 20+ primary journals, preprints, and research feeds with SHA-256 deduplication.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#1C1C1C] space-y-2">
              <span className="font-mono text-xs text-[#38BDF8]">[ 02 ]</span>
              <h3 className="font-space-grotesk font-bold text-base text-white uppercase">
                Fact-Checking Risk Gate
              </h3>
              <p className="text-xs text-[#A8A8A8] leading-relaxed">
                Automated multi-stage claim verification and hallucination auditing preventing publication of unverified teasers.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#1C1C1C] space-y-2">
              <span className="font-mono text-xs text-[#38BDF8]">[ 03 ]</span>
              <h3 className="font-space-grotesk font-bold text-base text-white uppercase">
                Authentic Media Fetcher
              </h3>
              <p className="text-xs text-[#A8A8A8] leading-relaxed">
                Automated extraction of high-resolution laboratory and equipment photography with contextual verification.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#1C1C1C] space-y-2">
              <span className="font-mono text-xs text-[#38BDF8]">[ 04 ]</span>
              <h3 className="font-space-grotesk font-bold text-base text-white uppercase">
                Next.js & Supabase Cloud
              </h3>
              <p className="text-xs text-[#A8A8A8] leading-relaxed">
                Edge-cached global rendering, Row-Level Security, and instant static site generation.
              </p>
            </div>
          </div>
        </section>

        <div className="pt-10 border-t border-white/[0.08] flex items-center justify-between font-mono text-xs">
          <Link
            href="/editorial-policy"
            className="text-[#38BDF8] hover:underline uppercase font-bold"
          >
            Review Verification Standards →
          </Link>
          <Link
            href="/"
            className="text-[#737373] hover:text-white uppercase"
          >
            Back to Index
          </Link>
        </div>
      </div>
    </div>
  );
}
