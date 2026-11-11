import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t border-[#E2E8F0] bg-[#F8FAFC] py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-space-grotesk text-[#64748B]">
        {/* Brand */}
        <Link href="/" className="font-bold text-lg tracking-tight text-[#172554] hover:text-[#2563EB] transition-colors">
          KEIGO<span className="text-[#2563EB]">.</span>
        </Link>

        {/* Essential Links Only */}
        <div className="flex items-center gap-8 uppercase tracking-wider text-xs font-medium">
          <Link href="/about" className="hover:text-[#172554] transition-colors">
            About
          </Link>
          <Link href="/editorial-policy" className="hover:text-[#172554] transition-colors">
            Standards
          </Link>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#172554] transition-colors"
          >
            Instagram ↗
          </a>
        </div>

        {/* Copyright */}
        <span className="font-mono text-[11px] text-[#94A3B8]">
          © {new Date().getFullYear()} KEIGO.
        </span>
      </div>
    </footer>
  );
}
