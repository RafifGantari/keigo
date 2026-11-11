import Link from 'next/link';

export function Footer() {
  const pillars = [
    { name: 'Artificial Intelligence', href: '/category/artificial-intelligence' },
    { name: 'Engineering & Tech', href: '/category/technology' },
    { name: 'Scientific Research', href: '/category/science' },
    { name: 'Future Innovation', href: '/category/innovation' },
  ];

  const standards = [
    { name: 'About KEIGO', href: '/about' },
    { name: 'Editorial Verification', href: '/editorial-policy' },
    { name: 'Risk Gate Architecture', href: '/editorial-policy#risk-gate' },
  ];

  return (
    <footer className="w-full border-t border-[#E2E8F0] bg-[#172554] text-[#F8FAFC] pt-16 sm:pt-20 pb-12 mt-16">
      <div className="w-full px-6 sm:px-10 lg:px-14">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          
          {/* Left: Brand Identity */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <span className="font-space-grotesk font-bold text-3xl sm:text-5xl tracking-tight text-[#F8FAFC] block">
                KEIGO<span className="text-[#2563EB]">.</span>
              </span>
              <p className="font-inter text-sm text-[#94A3B8] mt-3 max-w-md leading-relaxed">
                Autonomous science, artificial intelligence & deep technology intelligence. Tracing breakthroughs directly to primary laboratory papers and engineering whitepapers.
              </p>
            </div>
          </div>

          {/* Right Columns: Minimalist Navigation Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs font-inter">
            
            {/* Pillars */}
            <div className="space-y-3.5">
              <span className="font-space-grotesk font-semibold text-[#BAE6FD] tracking-wider uppercase text-xs block">
                Pillars
              </span>
              <ul className="space-y-2.5 text-[#94A3B8]">
                {pillars.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Verification */}
            <div className="space-y-3.5">
              <span className="font-space-grotesk font-semibold text-[#BAE6FD] tracking-wider uppercase text-xs block">
                Standards
              </span>
              <ul className="space-y-2.5 text-[#94A3B8]">
                {standards.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Channels */}
            <div className="space-y-3.5 col-span-2 sm:col-span-1">
              <span className="font-space-grotesk font-semibold text-[#BAE6FD] tracking-wider uppercase text-xs block">
                Channels
              </span>
              <ul className="space-y-2.5 text-[#94A3B8]">
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    Instagram <span>↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/RafifGantari/keigo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    GitHub <span>↗</span>
                  </a>
                </li>
                <li>
                  <Link
                    href="/sitemap.xml"
                    className="hover:text-white transition-colors"
                  >
                    Sitemap XML
                  </Link>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Bar: Clean & Minimal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B] font-inter gap-4">
          <p>© {new Date().getFullYear()} KEIGO Media. All rights reserved.</p>
          <p className="tracking-wide">
            Curiosity. Clarity. Discovery.
          </p>
        </div>

      </div>
    </footer>
  );
}
