import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#172554] text-[#F8FAFC] border-t border-[#1E40AF]/30 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-[#334155]/60">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <span className="font-space-grotesk font-bold text-3xl tracking-tight text-[#F8FAFC]">
              KEIGO<span className="text-[#2563EB]">.</span>
            </span>
            <p className="font-inter text-sm text-[#94A3B8] max-w-md leading-relaxed">
              An independent global media platform discovering, researching, and explaining the critical developments in Artificial Intelligence, Technology, Science, and Innovation.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs font-inter text-[#BAE6FD]">
              <span className="inline-block w-2 h-2 rounded-full bg-[#2563EB] animate-pulse"></span>
              Autonomous Research Pipeline Active
            </div>
          </div>

          {/* Pillars */}
          <div>
            <h4 className="font-space-grotesk font-semibold text-sm tracking-wider uppercase text-[#BAE6FD] mb-4">
              Pillars
            </h4>
            <ul className="space-y-2.5 font-inter text-sm text-[#94A3B8]">
              <li>
                <Link href="/category/artificial-intelligence" className="hover:text-[#F8FAFC] transition-colors">
                  Artificial Intelligence
                </Link>
              </li>
              <li>
                <Link href="/category/technology" className="hover:text-[#F8FAFC] transition-colors">
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/category/science" className="hover:text-[#F8FAFC] transition-colors">
                  Science & Research
                </Link>
              </li>
              <li>
                <Link href="/category/innovation" className="hover:text-[#F8FAFC] transition-colors">
                  Future Innovation
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Standards */}
          <div>
            <h4 className="font-space-grotesk font-semibold text-sm tracking-wider uppercase text-[#BAE6FD] mb-4">
              Standards
            </h4>
            <ul className="space-y-2.5 font-inter text-sm text-[#94A3B8]">
              <li>
                <Link href="/about" className="hover:text-[#F8FAFC] transition-colors">
                  About KEIGO
                </Link>
              </li>
              <li>
                <Link href="/editorial-policy" className="hover:text-[#F8FAFC] transition-colors">
                  Editorial Verification
                </Link>
              </li>
              <li>
                <Link href="/editorial-policy#risk-gate" className="hover:text-[#F8FAFC] transition-colors">
                  Risk Gate Architecture
                </Link>
              </li>
              <li>
                <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F8FAFC] transition-colors">
                  Supabase Cloud DB
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B] font-inter gap-4">
          <p>© {new Date().getFullYear()} KEIGO Media. All rights reserved.</p>
          <p className="tracking-wide">
            Inspired by curiosity, rigorous investigation, and intellectual clarity.
          </p>
        </div>
      </div>
    </footer>
  );
}
