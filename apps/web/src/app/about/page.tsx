import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About KEIGO — Curiosity. Clarity. Discovery.',
  description:
    'The philosophy, inspiration, and technical architecture behind KEIGO — an autonomous science and technology intelligence publication.',
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 sm:py-12 space-y-12">
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
            <strong className="text-[#172554]">Space Grotesk & Inter:</strong> Modern, high-legibility typographic geometry designed for deep focus.
          </li>
        </ul>

        <h2 className="font-space-grotesk font-bold text-2xl text-[#172554] pt-6">
          Autonomous Architecture
        </h2>
        <p>
          KEIGO operates on a modern autonomous stack:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl border border-[#E2E8F0] bg-white">
            <h3 className="font-space-grotesk font-bold text-sm text-[#172554] mb-1">
              Multi-Source Ingestion
            </h3>
            <p className="text-xs text-[#64748B]">
              Real-time monitoring of 20+ primary RSS, preprint, and laboratory feeds with SHA-256 deduplication.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-[#E2E8F0] bg-white">
            <h3 className="font-space-grotesk font-bold text-sm text-[#172554] mb-1">
              Automated Visual Engine
            </h3>
            <p className="text-xs text-[#64748B]">
              Headless Pillow 4:5 editorial card generation deployed to Supabase Storage CDN.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-[#E2E8F0] bg-white">
            <h3 className="font-space-grotesk font-bold text-sm text-[#172554] mb-1">
              Fact-Checking Risk Gate
            </h3>
            <p className="text-xs text-[#64748B]">
              Multi-stage hallucination and claim audit preventing publication of unverified or paywalled teasers.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-[#E2E8F0] bg-white">
            <h3 className="font-space-grotesk font-bold text-sm text-[#172554] mb-1">
              Next.js 15+ & Supabase
            </h3>
            <p className="text-xs text-[#64748B]">
              Global edge caching, Row-Level Security, and instant ISR page revalidation.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-[#E2E8F0] flex items-center justify-between">
          <Link
            href="/editorial-policy"
            className="font-space-grotesk text-sm font-bold text-[#2563EB] hover:underline"
          >
            Review Our Verification Standards →
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
