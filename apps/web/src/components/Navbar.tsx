'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { name: 'AI', href: '/category/artificial-intelligence' },
    { name: 'Technology', href: '/category/technology' },
    { name: 'Science', href: '/category/science' },
    { name: 'Innovation', href: '/category/innovation' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F8FAFC]/80 backdrop-blur-lg border-b border-[#E2E8F0]/60 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] py-3'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-1 group">
          <span className="font-space-grotesk font-bold text-2xl sm:text-3xl tracking-tight text-[#172554] group-hover:text-[#2563EB] transition-colors">
            KEIGO<span className="text-[#2563EB]">.</span>
          </span>
        </Link>

        {/* Center Categories (Minimalist Editorial Style) */}
        <nav className="hidden md:flex items-center gap-7 font-inter text-sm font-medium text-[#172554]">
          {categories.map((cat) => {
            const isActive = pathname === cat.href;
            return (
              <Link
                key={cat.href}
                href={cat.href}
                className={`transition-colors py-1 relative hover:text-[#2563EB] ${
                  isActive ? 'text-[#2563EB] font-semibold' : 'text-[#334155]'
                }`}
              >
                {cat.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-5 text-sm font-inter">
          <Link
            href="/about"
            className="hidden sm:inline-block text-[#64748B] hover:text-[#172554] transition-colors font-medium text-xs tracking-wide"
          >
            About
          </Link>
          <Link
            href="/editorial-policy"
            className="hidden lg:inline-block text-[#64748B] hover:text-[#172554] transition-colors font-medium text-xs tracking-wide"
          >
            Standards
          </Link>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#172554] text-[#F8FAFC] hover:bg-[#2563EB] px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all shadow-sm hover:shadow"
          >
            FOLLOW IG
          </a>
        </div>
      </div>
    </header>
  );
}
