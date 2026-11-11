import Link from 'next/link';
import { Article } from '@/types';

interface ArticleCardProps {
  article: Article;
  index?: number;
}

export function ArticleCard({ article, index }: ArticleCardProps) {
  const categoryLabel = article.category.replace('_', ' ').toUpperCase();
  const year = article.published_at 
    ? new Date(article.published_at).getFullYear() 
    : '2026';

  const displayImage =
    article.image_url ||
    article.cover_image_url ||
    'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop';

  const indexStr = index !== undefined ? String(index + 1).padStart(2, '0') : '';

  return (
    <article className="group relative flex flex-col bg-[#1C1C1C] rounded-2xl border border-white/[0.08] overflow-hidden hover:border-white/[0.2] transition-all duration-500">
      {/* Landscape Authentic Image Container */}
      <Link
        href={`/article/${article.slug}`}
        className="block relative aspect-[16/10] w-full overflow-hidden bg-[#121212]"
      >
        <img
          src={displayImage}
          alt={article.title}
          className="w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform duration-700 ease-out brightness-[0.85] group-hover:brightness-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-transparent to-transparent opacity-80"></div>
        
        {/* Floating index & category badge */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[11px] font-space-grotesk tracking-widest text-white/90">
          <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 uppercase">
            {categoryLabel}
          </span>
          {indexStr && (
            <span className="font-mono text-white/50">{indexStr}</span>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#737373] uppercase tracking-wider">
            <span>{year}</span>
            <span>•</span>
            <span>{article.reading_time_minutes} MIN READ</span>
          </div>

          <h3 className="font-space-grotesk font-bold text-lg sm:text-xl text-white leading-snug group-hover:text-[#38BDF8] transition-colors duration-200 uppercase tracking-tight">
            <Link href={`/article/${article.slug}`}>
              {article.title}
            </Link>
          </h3>

          <p className="font-inter text-xs sm:text-sm text-[#A8A8A8] leading-relaxed line-clamp-3">
            {article.excerpt}
          </p>
        </div>

        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-space-grotesk tracking-wider">
          <span className="text-[#737373] uppercase">KEIGO Editorial</span>
          <Link
            href={`/article/${article.slug}`}
            className="text-white hover:text-[#38BDF8] inline-flex items-center gap-1.5 transition-colors uppercase font-semibold"
          >
            DISCOVER <span>➔</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
