'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none w-full px-6 sm:px-12 py-5 sm:py-7 flex items-center justify-between text-xs tracking-wider transition-colors duration-300">
      {/* Brand Left: Pure Text */}
      <Link
        href="/"
        className={`pointer-events-auto font-space-grotesk font-bold text-2xl sm:text-3xl tracking-tight transition-colors drop-shadow-sm ${
          isHome
            ? 'text-white hover:text-[#BAE6FD]'
            : 'text-[#172554] dark:text-[#FFFFFF] hover:text-[#2563EB]'
        }`}
      >
        KEIGO<span className={isHome ? 'text-[#38BDF8]' : 'text-[#2563EB]'}>.</span>
      </Link>

      {/* Nav links Right: Articles, About, and Theme Toggle */}
      <nav
        className={`pointer-events-auto flex items-center gap-6 sm:gap-8 font-space-grotesk font-semibold drop-shadow-sm text-xs sm:text-sm ${
          isHome ? 'text-white/90' : 'text-[#64748B] dark:text-[#A8A8A8]'
        }`}
      >
        <Link
          href="/"
          className={`transition-colors uppercase tracking-wider ${
            isHome
              ? 'text-[#BAE6FD] font-bold'
              : 'hover:text-[#172554] dark:hover:text-white'
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
              : 'hover:text-[#172554] dark:hover:text-white'
          }`}
        >
          ABOUT
        </Link>

        {/* Theme Toggle Button: Pure Text Minimalist */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className={`cursor-pointer uppercase tracking-widest font-mono text-[11px] px-2.5 py-1 rounded transition-colors ${
            isHome
              ? 'text-white/80 hover:text-white hover:bg-white/10'
              : 'text-[#64748B] dark:text-[#A8A8A8] hover:text-[#172554] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10'
          }`}
        >
          {theme === 'light' ? 'DARK' : 'LIGHT'}
        </button>
      </nav>
    </header>
  );
}
