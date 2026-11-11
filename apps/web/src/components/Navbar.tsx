'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none w-full px-6 sm:px-12 py-5 sm:py-7 flex items-center justify-between text-xs tracking-wider transition-colors duration-300">
      {/* Brand Left: Pure Text */}
      <Link
        href="/"
        className={`pointer-events-auto font-space-grotesk font-bold text-2xl sm:text-3xl tracking-tight transition-colors drop-shadow-sm ${
          isHome
            ? 'text-white hover:text-[#BAE6FD]'
            : 'text-[#172554] hover:text-[#2563EB]'
        }`}
      >
        KEIGO<span className={isHome ? 'text-[#38BDF8]' : 'text-[#2563EB]'}>.</span>
      </Link>

      {/* Nav links Right: Articles and About Only */}
      <nav
        className={`pointer-events-auto flex items-center gap-6 sm:gap-8 font-space-grotesk font-semibold drop-shadow-sm text-xs sm:text-sm ${
          isHome ? 'text-white/90' : 'text-[#64748B]'
        }`}
      >
        <Link
          href="/"
          className={`transition-colors uppercase tracking-wider ${
            isHome
              ? 'text-[#BAE6FD] font-bold'
              : 'hover:text-[#172554]'
          }`}
        >
          ARTICLES
        </Link>
        <Link
          href="/about"
          className={`transition-colors uppercase tracking-wider ${
            pathname === '/about'
              ? 'text-[#2563EB] font-bold'
              : isHome
              ? 'hover:text-white'
              : 'hover:text-[#172554]'
          }`}
        >
          ABOUT
        </Link>
      </nav>
    </header>
  );
}
