import Link from 'next/link';
import { Article } from '@/types';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const categoryLabel = article.category.replace('_', ' ').toUpperCase();
  const publishedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    : 'Recent';

  const displayImage = article.image_url || article.cover_image_url;

  return (
    <article className="group bg-white rounded-xl border border-[#E2E8F0] overflow-hidden hover:border-[#2563EB]/40 hover:shadow-md transition-all duration-200 flex flex-col h-full">
      {/* Cover Image */}
      <Link
        href={`/article/${article.slug}`}
        className="block aspect-[16/10] bg-[#F8FAFC] overflow-hidden border-b border-[#E2E8F0] relative"
      >
        {displayImage ? (
          <img
            src={displayImage}
            alt={article.title}
            className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#F8FAFC] to-[#EFF6FF]">
            <span className="font-space-grotesk font-bold text-xl text-[#172554] tracking-tight">
              KEIGO<span className="text-[#2563EB]">.</span>
            </span>
            <span className="font-space-grotesk text-xs uppercase tracking-wider text-[#2563EB] mt-2">
              {categoryLabel}
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2.5">
          <span className="font-space-grotesk text-[11px] font-bold tracking-wider uppercase text-[#2563EB]">
            {categoryLabel}
          </span>
          <span className="text-[#CBD5E1] text-xs">•</span>
          <span className="font-inter text-xs text-[#64748B]">
            {publishedDate}
          </span>
          <span className="text-[#CBD5E1] text-xs">•</span>
          <span className="font-inter text-xs text-[#64748B]">
            {article.reading_time_minutes}m
          </span>
        </div>

        <h3 className="font-space-grotesk font-bold text-lg text-[#172554] leading-snug group-hover:text-[#2563EB] transition-colors mb-2.5">
          <Link href={`/article/${article.slug}`}>
            {article.title}
          </Link>
        </h3>

        <p className="font-inter text-sm text-[#64748B] leading-relaxed line-clamp-3 mb-4 flex-1">
          {article.excerpt}
        </p>

        <div className="pt-2 border-t border-[#F1F5F9] flex items-center justify-between text-xs font-inter text-[#64748B]">
          <span className="font-medium">KEIGO Editorial</span>
          <Link
            href={`/article/${article.slug}`}
            className="text-[#2563EB] font-space-grotesk font-bold hover:underline inline-flex items-center gap-1"
          >
            Read <span>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
