import Link from 'next/link';
import { Article } from '@/types';

interface CinematicStoryFrameProps {
  article: Article;
  index: number;
}

export function CinematicStoryFrame({ article, index }: CinematicStoryFrameProps) {
  const categoryLabel = article.category.replace('_', ' ').toUpperCase();
  const year = article.published_at 
    ? new Date(article.published_at).getFullYear() 
    : '2026';

  const heroImage =
    article.image_url ||
    article.cover_image_url ||
    'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1600&auto=format&fit=crop';

  const indexStr = String(index + 1).padStart(2, '0');

  return (
    <div className="w-full h-[calc(100dvh-1.25rem)] sm:h-[calc(100dvh-1.75rem)] p-2 sm:p-3 flex flex-col justify-center">
      <Link
        href={`/article/${article.slug}`}
        className="group relative block w-full h-full rounded-[22px] sm:rounded-[32px] overflow-hidden border border-white/20 shadow-lg bg-[#172554]"
      >
        {/* Full 1 Screen Authentic Photo */}
        <img
          src={heroImage}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-1000 ease-out"
        />

        {/* Subtle Vignette Overlay for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none"></div>

        {/* Top Corners: Pure Text Branding & Minimalist Nav */}
        <div className="absolute top-6 sm:top-9 left-6 sm:left-12 right-6 sm:right-12 flex items-center justify-between text-white z-10 pointer-events-auto">
          {/* Top Left: KEIGO. */}
          <span className="font-space-grotesk font-bold text-2xl sm:text-3xl tracking-tight text-white">
            KEIGO<span className="text-[#38BDF8]">.</span>
          </span>

          {/* Top Center: Minimal Tagline */}
          <span className="hidden md:inline font-space-grotesk text-xs tracking-widest text-white/80 uppercase">
            Curiosity • Clarity • Discovery
          </span>

          {/* Top Right: Pure text categories */}
          <div className="flex items-center gap-6 sm:gap-8 font-space-grotesk text-xs tracking-wider text-white/90">
            <span className="hidden sm:inline hover:text-white transition-colors uppercase">
              {categoryLabel}
            </span>
            <span className="hover:text-white transition-colors uppercase">
              {year}
            </span>
          </div>
        </div>

        {/* Center Lateral Row: Index & Category on Left, Big Title on Right */}
        <div className="absolute top-1/2 -translate-y-1/2 left-6 sm:left-12 right-6 sm:right-12 flex flex-col md:flex-row md:items-center justify-between gap-6 pointer-events-none">
          {/* Left: Index & Category */}
          <div className="flex items-center gap-4 text-white">
            <span className="font-mono text-sm sm:text-base text-white/70 font-semibold">{indexStr}</span>
            <span className="font-space-grotesk font-bold text-lg sm:text-2xl uppercase tracking-wider text-white">
              {categoryLabel}
            </span>
          </div>

          {/* Right: Big Editorial Headline */}
          <div className="text-left md:text-right max-w-2xl space-y-2">
            <h2 className="font-space-grotesk font-bold text-2xl sm:text-3xl lg:text-5xl text-white uppercase tracking-tight leading-[1.1] group-hover:text-[#BAE6FD] transition-colors duration-300 drop-shadow-md">
              {article.title}
            </h2>
            <p className="font-inter text-xs sm:text-sm text-white/85 line-clamp-2 max-w-xl md:ml-auto leading-relaxed hidden sm:block">
              {article.excerpt}
            </p>
          </div>
        </div>

        {/* Bottom Corners: Vertical Navigation Left, Read Action Right */}
        <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-12 right-6 sm:right-12 flex items-end justify-between text-white z-10 pointer-events-auto">
          {/* Bottom Left: Vertical Minimalist Links (As in Milledollars screenshot) */}
          <div className="flex flex-col text-[11px] font-space-grotesk tracking-widest text-white/80 space-y-1">
            <span className="text-white font-bold mb-0.5">+ KEIGO</span>
            <span className="hover:text-white transition-colors">AI & INTELLIGENCE</span>
            <span className="hover:text-white transition-colors">FRONTIER TECH</span>
            <span className="hover:text-white transition-colors">SCIENCE BREAKTHROUGHS</span>
          </div>

          {/* Bottom Right: Read Callout */}
          <div className="font-space-grotesk text-xs sm:text-sm uppercase tracking-widest text-white font-bold group-hover:text-[#BAE6FD] flex items-center gap-2 transition-colors">
            <span>READ STORY</span>
            <span className="group-hover:translate-x-1.5 transition-transform duration-300">➔</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
