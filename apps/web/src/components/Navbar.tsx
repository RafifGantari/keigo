import Link from 'next/link';

export function Navbar() {
  const categories = [
    { name: 'AI', href: '/category/artificial-intelligence' },
    { name: 'Technology', href: '/category/technology' },
    { name: 'Science', href: '/category/science' },
    { name: 'Innovation', href: '/category/innovation' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#F8FAFC]/90 backdrop-blur-md border-b border-[#E2E8F0]">
      {/* Top Banner Ticker */}
      <div className="bg-[#172554] text-[#F8FAFC] text-xs py-1.5 px-4 sm:px-8 text-center font-inter tracking-wider">
        <span className="font-semibold text-[#BAE6FD]">KEIGO</span> • Curiosity. Clarity. Discovery.
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-space-grotesk font-bold text-3xl tracking-tight text-[#172554] group-hover:text-[#2563EB] transition-colors">
            KEIGO<span className="text-[#2563EB]">.</span>
          </span>
        </Link>

        {/* Categories */}
        <nav className="hidden md:flex items-center gap-8 font-inter text-sm font-medium text-[#172554]">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="hover:text-[#2563EB] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-[#2563EB] after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              {cat.name}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4 text-sm font-inter">
          <Link
            href="/about"
            className="hidden sm:inline-block text-[#64748B] hover:text-[#172554] transition-colors font-medium"
          >
            About
          </Link>
          <Link
            href="/editorial-policy"
            className="hidden lg:inline-block text-[#64748B] hover:text-[#172554] transition-colors font-medium"
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
