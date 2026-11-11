'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { name: 'AI', href: '/category/artificial-intelligence' },
    { name: 'TECH', href: '/category/technology' },
    { name: 'SCIENCE', href: '/category/science' },
    { name: 'INNOVATION', href: '/category/innovation' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#161616]/80 backdrop-blur-xl border-b border-white/[0.08] py-4'
          : 'bg-transparent border-b border-transparent py-6'
      }`}
    >
      <div className="w-full px-6 sm:px-10 lg:px-14 flex items-center justify-between">
        
        {/* Brand Left: Milledollars Split/Bold Style */}
        <Link href="/" className="flex items-center gap-1 group">
          <span className="font-space-grotesk font-bold text-2xl sm:text-3xl tracking-tighter text-white group-hover:text-[#60A5FA] transition-colors">
            KEIGO<span className="text-[#38BDF8]">.</span>
          </span>
        </Link>

        {/* Center Pill Badge (Signature MilleDollars Element) */}
        <div className="hidden lg:flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.12] bg-white/[0.02] backdrop-blur-md text-[11px] font-space-grotesk text-[#A8A8A8] tracking-wider uppercase">
          <span className="text-[#38BDF8] animate-pulse">✺</span>
          <span>Autonomous Frontier Science & AI Intelligence</span>
        </div>

        {/* Right Navigation Links */}
        <div className="flex items-center gap-6 sm:gap-8 font-space-grotesk text-xs tracking-wider">
          <nav className="hidden md:flex items-center gap-6 text-[#A8A8A8]">
            {categories.map((cat) => {
              const isActive = pathname === cat.href;
              return (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className={`hover:text-white transition-colors uppercase ${
                    isActive ? 'text-white font-semibold' : ''
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
            <Link
              href="/about"
              className="hover:text-white transition-colors uppercase text-[#737373]"
            >
              ABOUT
            </Link>
          </nav>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 rounded-full border border-white/[0.2] bg-white text-[#161616] hover:bg-[#38BDF8] hover:border-[#38BDF8] hover:text-[#000000] text-xs font-bold tracking-wider transition-all duration-300"
          >
            DISPATCH ↗
          </a>
        </div>

      </div>
    </header>
  );
}
