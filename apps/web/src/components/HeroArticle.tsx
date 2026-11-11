import Link from 'next/link';
import { Article } from '@/types';

interface HeroArticleProps {
  article: Article;
}

export function HeroArticle({ article }: HeroArticleProps) {
  const categoryLabel = article.category.replace('_', ' ').toUpperCase();
  const year = article.published_at 
    ? new Date(article.published_at).getFullYear() 
    : '2026';

  const heroImage = 
    article.image_url || 
    article.cover_image_url || 
    'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1600&auto=format&fit=crop';

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 my-4 sm:my-6">
      <Link
        href={`/article/${article.slug}`}
        className="group relative block w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.12] bg-[#1C1C1C] aspect-[16/10] sm:aspect-[21/9] transition-all duration-700 hover:border-white/[0.25]"
      >
        {/* Full-Bleed Authentic News Photo */}
        <img
          src={heroImage}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-1000 ease-out brightness-[0.75] group-hover:brightness-[0.85]"
        />

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent"></div>

        {/* Viewfinder Header Badges */}
        <div className="absolute top-5 sm:top-8 left-5 sm:left-8 right-5 sm:right-8 flex items-center justify-between text-xs font-space-grotesk tracking-widest text-white/80">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse"></span>
            <span>{categoryLabel}</span>
          </div>

          <div className="text-white/60 tabular-nums font-mono text-xs">
            [ {year} INVESTIGATION ]
          </div>
        </div>

        {/* Content Lockup at Bottom */}
        <div className="absolute bottom-5 sm:bottom-8 left-5 sm:left-8 right-5 sm:right-8 max-w-4xl space-y-3">
          <h2 className="font-space-grotesk font-bold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] group-hover:text-[#38BDF8] transition-colors duration-300 uppercase">
            {article.title}
          </h2>

          <p className="font-inter text-sm sm:text-base text-[#A8A8A8] line-clamp-2 max-w-3xl leading-relaxed">
            {article.excerpt}
          </p>

          <div className="pt-2 flex items-center gap-3 text-xs font-space-grotesk uppercase tracking-wider text-white">
            <span className="inline-flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300">
              Read Investigation <span>➔</span>
            </span>
            <span className="text-white/30">•</span>
            <span className="text-[#A8A8A8]">{article.reading_time_minutes} MIN READ</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
