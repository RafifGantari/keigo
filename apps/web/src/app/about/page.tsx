import { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'About KEIGO — Curiosity. Clarity. Discovery.',
  description:
    'The philosophy, inspiration, and editorial commitment behind KEIGO.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 sm:px-10 py-10 sm:py-16 space-y-12">
        {/* Header */}
        <header className="space-y-3 border-b border-[#E2E8F0] pb-8">
          <span className="font-space-grotesk text-xs font-bold uppercase tracking-wider text-[#2563EB]">
            About KEIGO
          </span>
          <h1 className="font-space-grotesk font-bold text-4xl sm:text-5xl text-[#172554] tracking-tight">
            Curiosity. Clarity. Discovery.
          </h1>
        </header>

        {/* Narrative */}
        <div className="space-y-6 font-inter text-[#334155] text-base sm:text-lg leading-relaxed">
          <p>
            <strong className="text-[#172554] font-semibold">KEIGO</strong> is an independent media platform dedicated to discovering, researching, and explaining foundational developments across Artificial Intelligence, Frontier Technology, and Science.
          </p>

          <h2 className="font-space-grotesk font-bold text-2xl text-[#172554] pt-4">
            The Name & Philosophy
          </h2>
          <p>
            Inspired by the spirit of intellectual deduction and methodical inquiry epitomized by master detective literature, we approach complex scientific and engineering breakthroughs not as marketing claims, but as questions to be understood from first principles.
          </p>
          <p>
            Every breakthrough has a foundation. Our goal is to connect readers directly to primary sources, research papers, and verified technical announcements with complete clarity and zero sensationalism.
          </p>

          <h2 className="font-space-grotesk font-bold text-2xl text-[#172554] pt-4">
            Core Editorial Pillars
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl border border-[#E2E8F0] bg-white shadow-sm space-y-1">
              <h3 className="font-space-grotesk font-bold text-sm text-[#172554]">
                Artificial Intelligence
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Frontier models, agent architectures, safety, and foundational machine learning.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-[#E2E8F0] bg-white shadow-sm space-y-1">
              <h3 className="font-space-grotesk font-bold text-sm text-[#172554]">
                Engineering & Tech
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Semiconductors, distributed systems, infrastructure, and hardware accelerators.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-[#E2E8F0] bg-white shadow-sm space-y-1">
              <h3 className="font-space-grotesk font-bold text-sm text-[#172554]">
                Scientific Breakthroughs
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Quantum systems, biotechnology, materials science, and physics preprints.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-[#E2E8F0] bg-white shadow-sm space-y-1">
              <h3 className="font-space-grotesk font-bold text-sm text-[#172554]">
                Future Innovation
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Robotics, aerospace, advanced energy transition, and emerging paradigms.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-[#E2E8F0] flex items-center justify-between">
            <Link
              href="/"
              className="font-space-grotesk text-sm font-bold text-[#2563EB] hover:underline"
            >
              ← Back to Stories
            </Link>
            <span className="font-space-grotesk text-xs text-[#64748B]">
              KEIGO Media
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
