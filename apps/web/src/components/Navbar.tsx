'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const categories = [
    { name: 'AI', href: '/category/artificial-intelligence' },
    { name: 'Tech', href: '/category/technology' },
    { name: 'Science', href: '/category/science' },
    { name: 'Innovation', href: '/category/innovation' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none w-full px-5 sm:px-12 py-4 sm:py-7 flex items-center justify-between text-xs tracking-wider transition-colors duration-300">
      {/* Brand Left: Pure Text */}
      <Link
        href="/"
        className={`pointer-events-auto font-space-grotesk font-bold text-2xl sm:text-3xl tracking-tight transition-colors drop-shadow-sm ${
          isHome ? 'text-white hover:text-[#BAE6FD]' : 'text-[#172554] hover:text-[#2563EB]'
        }`}
      >
        KEIGO<span className={isHome ? 'text-[#38BDF8]' : 'text-[#2563EB]'}>.</span>
      </Link>

      {/* Nav links Right: Pure Text, functional links */}
      <nav
        className={`pointer-events-auto flex items-center gap-6 sm:gap-8 font-space-grotesk font-medium drop-shadow-sm ${
          isHome ? 'text-white/90' : 'text-[#64748B]'
        }`}
      >
        {categories.map((cat) => {
          const isActive = pathname === cat.href;
          return (
            <Link
              key={cat.href}
              href={cat.href}
              className={`transition-colors uppercase ${
                isHome
                  ? isActive
                    ? 'text-[#BAE6FD] font-bold'
                    : 'hover:text-white'
                  : isActive
                  ? 'text-[#2563EB] font-bold'
                  : 'hover:text-[#172554]'
              }`}
            >
              {cat.name}
            </Link>
          );
        })}
        <Link
          href="/about"
          className={`transition-colors uppercase ${
            isHome ? 'hover:text-white' : 'hover:text-[#172554]'
          }`}
        >
          ABOUT
        </Link>
      </nav>
    </header>
  );
}
