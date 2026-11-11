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
    <div className="w-full px-4 sm:px-8 lg:px-12 my-6 sm:my-10">
      <Link
        href={`/article/${article.slug}`}
        className="group relative block w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E2E8F0] bg-white aspect-[16/10] sm:aspect-[21/9] transition-all duration-500 hover:shadow-xl hover:border-[#2563EB]/40 shadow-sm"
      >
        {/* Full-Bleed Authentic News Photo */}
        <img
          src={heroImage}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
        />

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#172554]/95 via-[#172554]/30 to-black/35"></div>

        {/* Viewfinder Top Editorial Typography (Pure Text, NO Pill, NO Capsules) */}
        <div className="absolute top-6 sm:top-9 left-6 sm:left-10 right-6 sm:right-10 flex items-center justify-between text-xs font-space-grotesk tracking-widest text-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-[#BAE6FD] font-bold">{indexStr}</span>
            <span className="text-white/40 font-light">/</span>
            <span className="font-bold tracking-wider uppercase text-white text-xs">{categoryLabel}</span>
          </div>

          <div className="font-mono text-xs text-white/80 tracking-wider">
            {year}
          </div>
        </div>

        {/* Content Lockup at Bottom */}
        <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 max-w-4xl space-y-3">
          <h2 className="font-space-grotesk font-bold text-2xl sm:text-4xl lg:text-5xl text-[#F8FAFC] tracking-tight leading-[1.12] group-hover:text-[#BAE6FD] transition-colors duration-300 uppercase">
            {article.title}
          </h2>

          <p className="font-inter text-xs sm:text-base text-[#E2E8F0] line-clamp-2 max-w-3xl leading-relaxed font-normal">
            {article.excerpt}
          </p>

          <div className="pt-2 flex items-center gap-3 text-xs font-space-grotesk uppercase tracking-wider text-[#F8FAFC]">
            <span className="inline-flex items-center gap-2 font-bold text-[#BAE6FD] group-hover:translate-x-1.5 transition-transform duration-300">
              Read Technical Analysis <span>➔</span>
            </span>
            <span className="text-white/40">•</span>
            <span className="text-[#CBD5E1] font-mono text-[11px]">
              {article.reading_time_minutes} MIN READ
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
