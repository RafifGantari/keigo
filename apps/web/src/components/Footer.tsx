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
    <footer className="w-full border-t border-white/[0.08] bg-[#121212] text-white pt-16 sm:pt-24 pb-12 mt-20">
      <div className="w-full px-6 sm:px-10 lg:px-14">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/[0.08]">
          
          {/* Left: MilleDollars-style Split Brandmark Lockup */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div>
              <span className="font-space-grotesk font-bold text-4xl sm:text-6xl tracking-tighter text-white block">
                KEIGO<span className="text-[#38BDF8]">.</span>
              </span>
              <p className="font-mono text-xs text-[#A8A8A8] uppercase tracking-widest mt-4 max-w-md leading-relaxed">
                Autonomous science, artificial intelligence & deep technology intelligence. Based on primary documentation, verified preprints, and reproducible breakthroughs.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-[#38BDF8]">
              <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse"></span>
              <span>AUTONOMOUS INGESTION ENGINE ACTIVE</span>
            </div>
          </div>

          {/* Right Columns: Minimalist Navigation Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs font-space-grotesk">
            
            {/* Pillars */}
            <div className="space-y-4">
              <span className="font-mono text-[#737373] tracking-widest uppercase text-[11px] block">
                [ PILLARS ]
              </span>
              <ul className="space-y-2.5">
                {pillars.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[#A8A8A8] hover:text-white transition-colors uppercase tracking-wider"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Verification */}
            <div className="space-y-4">
              <span className="font-mono text-[#737373] tracking-widest uppercase text-[11px] block">
                [ PROTOCOLS ]
              </span>
              <ul className="space-y-2.5">
                {standards.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[#A8A8A8] hover:text-white transition-colors uppercase tracking-wider"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Channels */}
            <div className="space-y-4 col-span-2 sm:col-span-1">
              <span className="font-mono text-[#737373] tracking-widest uppercase text-[11px] block">
                [ DISPATCHES ]
              </span>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#A8A8A8] hover:text-[#38BDF8] transition-colors uppercase tracking-wider inline-flex items-center gap-1"
                  >
                    Instagram <span>↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/RafifGantari/keigo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#A8A8A8] hover:text-[#38BDF8] transition-colors uppercase tracking-wider inline-flex items-center gap-1"
                  >
                    GitHub <span>↗</span>
                  </a>
                </li>
                <li>
                  <Link
                    href="/sitemap.xml"
                    className="text-[#737373] hover:text-white transition-colors uppercase tracking-wider"
                  >
                    Sitemap XML
                  </Link>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Bar: Clean & Minimal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#737373] gap-4">
          <p>© {new Date().getFullYear()} KEIGO. ALL RIGHTS RESERVED.</p>
          <p className="tracking-widest uppercase text-[11px]">
            CURIOSITY. CLARITY. DISCOVERY.
          </p>
        </div>

      </div>
    </footer>
  );
}
