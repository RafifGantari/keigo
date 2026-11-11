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
    <section className="w-full h-screen h-dvh p-2.5 sm:p-4 flex flex-col justify-center snap-start snap-always shrink-0">
      <Link
        href={`/article/${article.slug}`}
        className="group relative block w-full h-full rounded-[20px] sm:rounded-[32px] overflow-hidden border border-white/20 shadow-2xl bg-[#172554]"
      >
        {/* Full 1 Screen Authentic Photo */}
        <img
          src={heroImage}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-1000 ease-out"
        />

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/75 pointer-events-none"></div>

        {/* Center Content Row: Left is Index & Category, Right is Big Title & Year */}
        <div className="absolute top-1/2 -translate-y-1/2 left-6 sm:left-14 right-6 sm:right-14 flex flex-col md:flex-row md:items-center justify-between gap-6 pointer-events-none">
          
          {/* Left: Index & Category Only */}
          <div className="flex items-center gap-4 text-white">
            <span className="font-mono text-xs sm:text-sm text-white/60 font-semibold">{indexStr}</span>
            <span className="font-space-grotesk font-bold text-lg sm:text-2xl uppercase tracking-wider text-white">
              {categoryLabel}
            </span>
          </div>

          {/* Right: Big Editorial Headline & Year */}
          <div className="text-left md:text-right max-w-2xl space-y-3">
            <h2 className="font-space-grotesk font-bold text-2xl sm:text-3xl lg:text-5xl text-white uppercase tracking-tight leading-[1.12] group-hover:text-[#BAE6FD] transition-colors duration-300 drop-shadow-md">
              {article.title}
            </h2>
            <div className="flex items-center md:justify-end gap-3 font-mono text-xs text-white/80">
              <span>{year}</span>
              <span>•</span>
              <span>{article.reading_time_minutes} MIN READ</span>
            </div>
          </div>

        </div>

        {/* Bottom Action Right: Pure Read Callout */}
        <div className="absolute bottom-6 sm:bottom-10 right-6 sm:right-14 text-white z-10 pointer-events-auto">
          <div className="font-space-grotesk text-xs sm:text-sm uppercase tracking-widest text-white font-bold group-hover:text-[#BAE6FD] flex items-center gap-2 transition-colors">
            <span>READ STORY</span>
            <span className="group-hover:translate-x-1.5 transition-transform duration-300">➔</span>
          </div>
        </div>
      </Link>
    </section>
  );
}
