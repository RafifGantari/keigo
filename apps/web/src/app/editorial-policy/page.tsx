import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Editorial Standards & Risk Gate — KEIGO',
  description:
    'Our verification policies, primary source rules, and multi-stage Quality Control Risk Gate.',
};

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-10 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <header className="space-y-4 border-b border-[#E2E8F0] pb-8">
        <span className="font-space-grotesk text-xs font-bold uppercase tracking-wider text-[#2563EB]">
          EDITORIAL INTEGRITY
        </span>
        <h1 className="font-space-grotesk font-bold text-4xl sm:text-5xl text-[#172554] tracking-tight">
          Editorial Standards & Risk Gate
        </h1>
        <p className="font-inter text-xl text-[#64748B] leading-relaxed">
          How KEIGO ensures factual accuracy, technical depth, and transparent source attribution.
        </p>
      </header>

      {/* Main Principles */}
      <div className="space-y-8 font-inter text-[#334155] text-base sm:text-lg leading-relaxed">
        <section className="space-y-4">
          <h2 className="font-space-grotesk font-bold text-2xl text-[#172554]">
            1. Primary Source Evidentiary Hierarchy
          </h2>
          <p>
            We adhere to a strict evidentiary standard. We do not recycle secondary blog posts or clickbait summaries. Every article must trace directly to:
          </p>
          <ul className="space-y-3 pt-2">
            <li className="p-4 rounded-xl border border-[#E2E8F0] bg-white shadow-sm">
              <strong className="text-[#172554] font-space-grotesk block text-sm mb-1">Primary Tier A:</strong>
              <span className="text-sm text-[#475569]">Peer-reviewed journal papers (Nature, Science, Cell, IEEE, ACM) and verified preprints (arXiv, bioRxiv).</span>
            </li>
            <li className="p-4 rounded-xl border border-[#E2E8F0] bg-white shadow-sm">
              <strong className="text-[#172554] font-space-grotesk block text-sm mb-1">Primary Tier B:</strong>
              <span className="text-sm text-[#475569]">Official engineering whitepapers and technical disclosures from frontier research labs (DeepMind, OpenAI, Anthropic, MIT CSAIL, CERN, NASA).</span>
            </li>
            <li className="p-4 rounded-xl border border-[#E2E8F0] bg-white shadow-sm">
              <strong className="text-[#172554] font-space-grotesk block text-sm mb-1">Primary Tier C:</strong>
              <span className="text-sm text-[#475569]">Verified open-source code repositories, commit histories, benchmark logs, and pull request documentation.</span>
            </li>
          </ul>
        </section>

        <section id="risk-gate" className="space-y-6 pt-6 border-t border-[#E2E8F0]">
          <h2 className="font-space-grotesk font-bold text-2xl text-[#172554]">
            2. The 4-Stage Risk Gate Architecture
          </h2>
          <p>
            Before any article can be marked as <code className="bg-[#EFF6FF] text-[#2563EB] px-2 py-0.5 rounded text-sm font-mono">published</code>, it must pass through an automated 4-tier inspection:
          </p>

          <div className="space-y-4 pt-2">
            <div className="p-5 rounded-xl border border-[#E2E8F0] bg-white shadow-sm space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-space-grotesk font-bold text-base text-[#172554]">
                  Stage 1: Source Completeness Audit
                </h3>
                <span className="text-xs font-mono px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded font-semibold">PASS/FAIL</span>
              </div>
              <p className="text-sm text-[#64748B]">
                Ensures input is a full-text report or paper. If the input is merely a 1-sentence paywall teaser, it is held in <span className="font-mono text-amber-600">pending_review</span> to prevent hallucinations.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-[#E2E8F0] bg-white shadow-sm space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-space-grotesk font-bold text-base text-[#172554]">
                  Stage 2: Claim-Evidence Reconciliation
                </h3>
                <span className="text-xs font-mono px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded font-semibold">PASS/FAIL</span>
              </div>
              <p className="text-sm text-[#64748B]">
                Cross-references every quantitative benchmark against the source document to eliminate hype and unsupported metrics.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-[#E2E8F0] bg-white shadow-sm space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-space-grotesk font-bold text-base text-[#172554]">
                  Stage 3: Technical Integrity & Clarity Score
                </h3>
                <span className="text-xs font-mono px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded font-semibold">THRESHOLD ≥ 8.5/10</span>
              </div>
              <p className="text-sm text-[#64748B]">
                Evaluates reading clarity, architectural accuracy, and explanatory value. If an explanation fails to illuminate how a mechanism functions, it is held.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-[#E2E8F0] bg-white shadow-sm space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-space-grotesk font-bold text-base text-[#172554]">
                  Stage 4: Media Verification & Context Integrity
                </h3>
                <span className="text-xs font-mono px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded font-semibold">VERIFIED</span>
              </div>
              <p className="text-sm text-[#64748B]">
                Ensures high-resolution primary photography matches the investigated laboratory apparatus and includes precise contextual captioning.
              </p>
            </div>
          </div>
        </section>

        <div className="pt-8 border-t border-[#E2E8F0] flex items-center justify-between">
          <Link
            href="/about"
            className="font-space-grotesk text-sm font-bold text-[#2563EB] hover:underline"
          >
            ← Learn More About Our Philosophy
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
