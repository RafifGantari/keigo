'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { name: 'AI', href: '/category/artificial-intelligence' },
    { name: 'Tech', href: '/category/technology' },
    { name: 'Science', href: '/category/science' },
    { name: 'Innovation', href: '/category/innovation' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F8FAFC]/85 backdrop-blur-md border-b border-[#E2E8F0]/80 py-3.5 shadow-sm'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="w-full px-6 sm:px-10 lg:px-14 flex items-center justify-between">
        
        {/* Brand Left: Space Grotesk in Deep Navy with Arctic Blue dot */}
        <Link href="/" className="flex items-center gap-1 group">
          <span className="font-space-grotesk font-bold text-2xl sm:text-3xl tracking-tight text-[#172554] group-hover:text-[#2563EB] transition-colors">
            KEIGO<span className="text-[#2563EB]">.</span>
          </span>
        </Link>

        {/* Right Navigation Links (Clean, No AI pill) */}
        <div className="flex items-center gap-6 sm:gap-8 font-inter text-xs tracking-wider">
          <nav className="hidden md:flex items-center gap-7 text-[#64748B]">
            {categories.map((cat) => {
              const isActive = pathname === cat.href;
              return (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className={`hover:text-[#172554] transition-colors uppercase font-medium ${
                    isActive ? 'text-[#2563EB] font-bold' : ''
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
            <Link
              href="/about"
              className="hover:text-[#172554] transition-colors uppercase text-[#64748B] font-medium"
            >
              ABOUT
            </Link>
          </nav>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-[#172554] text-[#F8FAFC] hover:bg-[#2563EB] text-xs font-semibold tracking-wider transition-all duration-200 shadow-sm"
          >
            DISPATCH ↗
          </a>
        </div>

      </div>
    </header>
  );
}
