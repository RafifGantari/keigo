import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About KEIGO — Curiosity. Clarity. Discovery.',
  description:
    'The philosophy, inspiration, and technical architecture behind KEIGO — an autonomous science and technology intelligence publication.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-10 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <header className="space-y-4 border-b border-[#E2E8F0] pb-8">
        <span className="font-space-grotesk text-xs font-bold uppercase tracking-wider text-[#2563EB]">
          PHILOSOPHY & ORIGINS
        </span>
        <h1 className="font-space-grotesk font-bold text-4xl sm:text-5xl text-[#172554] tracking-tight">
          About KEIGO<span className="text-[#2563EB]">.</span>
        </h1>
        <p className="font-inter text-xl text-[#64748B] leading-relaxed">
          Curiosity. Clarity. Discovery.
        </p>
      </header>

      {/* Main Narrative */}
      <div className="space-y-6 font-inter text-[#334155] text-base sm:text-lg leading-relaxed">
        <p>
          <strong className="text-[#172554] font-semibold">KEIGO</strong> was founded with a singular purpose: to cut through the sensationalism and shallow summaries dominating modern technology reporting, providing readers with deeply reasoned, technically precise, and verifiable intelligence.
        </p>

        <h2 className="font-space-grotesk font-bold text-2xl text-[#172554] pt-6">
          The Name & Spirit
        </h2>
        <p>
          Inspired by the spirit of intellectual deduction and relentless inquiry epitomized by master detective fiction—most notably Keigo Higashino—we approach frontier science and engineering not as mere press releases, but as mysteries to be methodically disassembled, understood, and verified.
        </p>
        <p>
          Every scientific claim has a foundation. Every machine learning breakthrough has architectural trade-offs. Our mission is to trace those foundations to their primary sources: peer-reviewed preprints, engineering whitepapers, hardware telemetry, and direct laboratory disclosures.
        </p>

        <h2 className="font-space-grotesk font-bold text-2xl text-[#172554] pt-6">
          The Arctic Intelligence Visual System
        </h2>
        <p>
          Our visual aesthetic reflects our editorial creed: absolute clarity and zero unnecessary noise.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-[#475569]">
          <li>
            <strong className="text-[#172554]">Snow White (#F8FAFC):</strong> The clean foundation of open scientific inquiry.
          </li>
          <li>
            <strong className="text-[#172554]">Deep Navy (#172554):</strong> The gravity of rigorous analytical reporting.
          </li>
          <li>
            <strong className="text-[#172554]">Arctic Blue (#2563EB):</strong> The precision spark of discovery and intelligence.
          </li>
          <li>
            <strong className="text-[#172554]">Ice Cyan (#BAE6FD):</strong> The secondary accent for highlights and luminous indicators.
          </li>
          <li>
            <strong className="text-[#172554]">Space Grotesk & Inter:</strong> Modern, high-legibility geometric typography.
          </li>
        </ul>

        <h2 className="font-space-grotesk font-bold text-2xl text-[#172554] pt-6">
          Autonomous Architecture
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-5 rounded-2xl border border-[#E2E8F0] bg-white shadow-sm space-y-1">
            <h3 className="font-space-grotesk font-bold text-sm text-[#172554]">
              Multi-Source Ingestion
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Real-time monitoring of 20+ primary journals, preprints, and research feeds with SHA-256 deduplication.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-[#E2E8F0] bg-white shadow-sm space-y-1">
            <h3 className="font-space-grotesk font-bold text-sm text-[#172554]">
              Fact-Checking Risk Gate
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Automated multi-stage claim verification and hallucination auditing preventing publication of unverified teasers.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-[#E2E8F0] bg-white shadow-sm space-y-1">
            <h3 className="font-space-grotesk font-bold text-sm text-[#172554]">
              Authentic Media Fetcher
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Automated extraction of high-resolution laboratory and equipment photography with contextual verification.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-[#E2E8F0] bg-white shadow-sm space-y-1">
            <h3 className="font-space-grotesk font-bold text-sm text-[#172554]">
              Next.js 15+ & Supabase
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Global edge caching, Row-Level Security, and instant static site generation.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-[#E2E8F0] flex items-center justify-between">
          <Link
            href="/editorial-policy"
            className="font-space-grotesk text-sm font-bold text-[#2563EB] hover:underline"
          >
            Review Verification Standards →
          </Link>
          <Link
            href="/"
            className="font-space-grotesk text-sm font-bold text-[#64748B] hover:text-[#172554]"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
