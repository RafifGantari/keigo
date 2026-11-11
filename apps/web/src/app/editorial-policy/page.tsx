import { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Editorial Standards — KEIGO',
  description:
    'Our commitment to primary source verification, clarity, and factual accuracy.',
};

export default function EditorialPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 sm:px-10 py-10 sm:py-16 space-y-12">
        {/* Header */}
        <header className="space-y-3 border-b border-[#E2E8F0] pb-8">
          <span className="font-space-grotesk text-xs font-bold uppercase tracking-wider text-[#2563EB]">
            Editorial Standards
          </span>
          <h1 className="font-space-grotesk font-bold text-4xl sm:text-5xl text-[#172554] tracking-tight">
            Verification & Integrity
          </h1>
          <p className="font-inter text-lg text-[#64748B] leading-relaxed">
            How KEIGO ensures factual accuracy, technical depth, and transparent source attribution.
          </p>
        </header>

        {/* Content */}
        <div className="space-y-8 font-inter text-[#334155] text-base sm:text-lg leading-relaxed">
          <section className="space-y-4">
            <h2 className="font-space-grotesk font-bold text-2xl text-[#172554]">
              Primary Source Commitment
            </h2>
            <p>
              We do not aggregate third-party rumors or sensationalist press releases. Every story published by KEIGO is anchored in primary documentation:
            </p>
            <ul className="space-y-3 pt-2 text-sm text-[#475569]">
              <li className="p-4 rounded-xl border border-[#E2E8F0] bg-white shadow-sm">
                <strong className="text-[#172554] block mb-1">Academic Research & Preprints:</strong>
                Peer-reviewed papers (Nature, Science, IEEE, ACM) and open preprint servers (arXiv, bioRxiv).
              </li>
              <li className="p-4 rounded-xl border border-[#E2E8F0] bg-white shadow-sm">
                <strong className="text-[#172554] block mb-1">Laboratory Technical Disclosures:</strong>
                Official engineering whitepapers, benchmark datasets, and technical documentation released by research teams.
              </li>
              <li className="p-4 rounded-xl border border-[#E2E8F0] bg-white shadow-sm">
                <strong className="text-[#172554] block mb-1">Source Transparency:</strong>
                Every story lists its underlying primary sources so readers can inspect the data directly.
              </li>
            </ul>
          </section>

          <section className="space-y-4 pt-6 border-t border-[#E2E8F0]">
            <h2 className="font-space-grotesk font-bold text-2xl text-[#172554]">
              Corrections & Updates
            </h2>
            <p>
              When a research paper is amended, refuted, or retracted by its authors, KEIGO promptly updates the corresponding article to reflect the revised findings.
            </p>
          </section>

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
