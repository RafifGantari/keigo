'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const pathname = usePathname();

  const categories = [
    { name: 'AI', href: '/category/artificial-intelligence' },
    { name: 'Tech', href: '/category/technology' },
    { name: 'Science', href: '/category/science' },
    { name: 'Innovation', href: '/category/innovation' },
  ];

  return (
    <header className="w-full px-6 sm:px-12 py-6 flex items-center justify-between text-xs tracking-wider z-40">
      {/* Brand: Pure text */}
      <Link href="/" className="font-space-grotesk font-bold text-2xl tracking-tight text-[#172554] hover:text-[#2563EB] transition-colors">
        KEIGO<span className="text-[#2563EB]">.</span>
      </Link>

      {/* Nav links: Pure text */}
      <nav className="flex items-center gap-6 sm:gap-8 font-space-grotesk font-semibold text-[#64748B]">
        {categories.map((cat) => {
          const isActive = pathname === cat.href;
          return (
            <Link
              key={cat.href}
              href={cat.href}
              className={`hover:text-[#172554] transition-colors uppercase ${
                isActive ? 'text-[#2563EB] font-bold' : ''
              }`}
            >
              {cat.name}
            </Link>
          );
        })}
        <Link
          href="/about"
          className="hover:text-[#172554] transition-colors uppercase text-[#64748B]"
        >
          ABOUT
        </Link>
      </nav>
    </header>
  );
}
