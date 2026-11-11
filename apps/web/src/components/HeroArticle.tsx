import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/types';

interface HeroArticleProps {
  article: Article;
}

export function HeroArticle({ article }: HeroArticleProps) {
  const categoryLabel = article.category.replace('_', ' ').toUpperCase();
  const publishedDate = article.published_at 
    ? new Date(article.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Recently Published';

  return (
    <article className="relative bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 lg:p-10">
        
        {/* Left Column: Metadata & Title */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-3">
            <span className="font-space-grotesk text-xs font-bold text-[#2563EB] tracking-wider uppercase">
              {categoryLabel}
            </span>
            <span className="text-[#CBD5E1]">•</span>
            <span className="font-inter text-xs text-[#64748B]">{publishedDate}</span>
            <span className="text-[#CBD5E1]">•</span>
            <span className="font-inter text-xs text-[#64748B]">{article.reading_time_minutes} min read</span>
          </div>

          <h2 className="font-space-grotesk font-bold text-2xl sm:text-3xl lg:text-4xl text-[#172554] leading-[1.2] group-hover:text-[#2563EB] transition-colors">
            <Link href={`/article/${article.slug}`}>
              {article.title}
            </Link>
          </h2>

          <p className="font-inter text-base text-[#64748B] leading-relaxed line-clamp-3">
            {article.excerpt}
          </p>

          <div className="pt-2 flex items-center gap-4">
            <Link
              href={`/article/${article.slug}`}
              className="inline-flex items-center gap-2 font-space-grotesk text-sm font-bold text-[#2563EB] hover:text-[#1E40AF] transition-colors"
            >
              Read Full Technical Analysis <span>➔</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Visual Card Cover */}
        <div className="lg:col-span-5 flex justify-center">
          <Link href={`/article/${article.slug}`} className="block relative w-full aspect-[4/5] max-w-sm rounded-xl overflow-hidden border border-[#E2E8F0] bg-[#F8FAFC]">
            {article.cover_image_url ? (
              <img
                src={article.cover_image_url}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                loading="eager"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#F8FAFC] text-[#64748B] font-space-grotesk font-bold text-lg">
                KEIGO
              </div>
            )}
          </Link>
        </div>

      </div>
    </article>
  );
}
