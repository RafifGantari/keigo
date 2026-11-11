import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Editorial Standards & Risk Gate — KEIGO',
  description:
    'Our verification policies, primary source rules, and multi-stage Quality Control Risk Gate.',
};

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-10 py-8 sm:py-16 space-y-16">
      {/* Header */}
      <header className="space-y-4 border-b border-white/[0.08] pb-10">
        <span className="font-mono text-xs text-[#38BDF8] uppercase tracking-widest">
          [ PROTOCOL SPECIFICATION ]
        </span>
        <h1 className="font-space-grotesk font-bold text-4xl sm:text-6xl text-white tracking-tight uppercase">
          Editorial Standards & Risk Gate
        </h1>
        <p className="font-inter text-xl text-[#A8A8A8] font-light">
          Evidentiary hierarchy, automated audits, and primary verification protocols.
        </p>
      </header>

      {/* Main Principles */}
      <div className="space-y-10 font-inter text-[#CCCCCC] text-base sm:text-lg leading-relaxed font-light">
        <section className="space-y-4">
          <h2 className="font-space-grotesk font-bold text-2xl text-white uppercase tracking-tight">
            1. Primary Source Evidentiary Hierarchy
          </h2>
          <p>
            We adhere to a strict evidentiary standard. We do not recycle secondary blog posts or clickbait summaries. Every article must trace directly to:
          </p>
          <ul className="space-y-3 font-mono text-xs sm:text-sm text-[#A8A8A8] pt-2">
            <li className="p-4 rounded-xl border border-white/[0.08] bg-[#1C1C1C]">
              <strong className="text-white uppercase font-space-grotesk block text-sm mb-1">Primary Tier A:</strong>
              Peer-reviewed journal papers (Nature, Science, Cell, IEEE, ACM) and verified preprints (arXiv, bioRxiv).
            </li>
            <li className="p-4 rounded-xl border border-white/[0.08] bg-[#1C1C1C]">
              <strong className="text-white uppercase font-space-grotesk block text-sm mb-1">Primary Tier B:</strong>
              Official engineering whitepapers and technical disclosures from frontier research labs (DeepMind, OpenAI, Anthropic, MIT CSAIL, CERN, NASA).
            </li>
            <li className="p-4 rounded-xl border border-white/[0.08] bg-[#1C1C1C]">
              <strong className="text-white uppercase font-space-grotesk block text-sm mb-1">Primary Tier C:</strong>
              Verified open-source code repositories, commit histories, benchmark logs, and pull request documentation.
            </li>
          </ul>
        </section>

        <section id="risk-gate" className="space-y-6 pt-6 border-t border-white/[0.08]">
          <h2 className="font-space-grotesk font-bold text-2xl text-white uppercase tracking-tight">
            2. The 4-Stage Risk Gate Architecture
          </h2>
          <p>
            Before any article is published, it passes through an automated 4-tier inspection:
          </p>

          <div className="space-y-4 pt-2">
            <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#1C1C1C] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-space-grotesk font-bold text-sm text-white uppercase">
                  Stage 1: Source Completeness Audit
                </span>
                <span className="font-mono text-xs text-[#38BDF8]">[ PASS/FAIL ]</span>
              </div>
              <p className="text-xs sm:text-sm text-[#A8A8A8]">
                Ensures input is a full-text report or paper. If the input is merely a 1-sentence paywall teaser, it is held in <span className="font-mono text-amber-400">pending_review</span> to prevent hallucinations.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#1C1C1C] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-space-grotesk font-bold text-sm text-white uppercase">
                  Stage 2: Claim-Evidence Reconciliation
                </span>
                <span className="font-mono text-xs text-[#38BDF8]">[ PASS/FAIL ]</span>
              </div>
              <p className="text-xs sm:text-sm text-[#A8A8A8]">
                Cross-references every quantitative benchmark against the source document to eliminate hype and unsupported metrics.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#1C1C1C] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-space-grotesk font-bold text-sm text-white uppercase">
                  Stage 3: Technical Integrity & Clarity Score
                </span>
                <span className="font-mono text-xs text-[#38BDF8]">[ THRESHOLD ≥ 8.5/10 ]</span>
              </div>
              <p className="text-xs sm:text-sm text-[#A8A8A8]">
                Evaluates architectural depth and explanatory value. If an explanation fails to illuminate how the mechanism functions, it is held.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#1C1C1C] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-space-grotesk font-bold text-sm text-white uppercase">
                  Stage 4: Media Verification & Context Integrity
                </span>
                <span className="font-mono text-xs text-[#38BDF8]">[ VERIFIED ]</span>
              </div>
              <p className="text-xs sm:text-sm text-[#A8A8A8]">
                Ensures high-resolution primary photography matches the investigated laboratory apparatus and includes precise contextual captioning.
              </p>
            </div>
          </div>
        </section>

        <div className="pt-10 border-t border-white/[0.08] flex items-center justify-between font-mono text-xs">
          <Link
            href="/about"
            className="text-[#38BDF8] hover:underline uppercase font-bold"
          >
            ← Learn More About Our Manifesto
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
