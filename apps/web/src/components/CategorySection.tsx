import Link from 'next/link';
import { Article, ContentCategory } from '@/types';
import { ArticleCard } from './ArticleCard';

interface CategorySectionProps {
  category: ContentCategory;
  title: string;
  description: string;
  articles: Article[];
}

export function CategorySection({
  category,
  title,
  description,
  articles,
}: CategorySectionProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  const slug = category.replace('_', '-');

  return (
    <section className="py-8 border-t border-[#E2E8F0]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <span className="font-space-grotesk text-xs font-bold uppercase tracking-wider text-[#2563EB]">
            DISCOVER
          </span>
          <h2 className="font-space-grotesk font-bold text-2xl sm:text-3xl text-[#172554] mt-1">
            {title}
          </h2>
          <p className="font-inter text-sm text-[#64748B] mt-1">
            {description}
          </p>
        </div>
        <Link
          href={`/category/${slug}`}
          className="font-space-grotesk text-sm font-bold text-[#2563EB] hover:text-[#1E40AF] inline-flex items-center gap-1 shrink-0"
        >
          View all in {title} <span>➔</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.slice(0, 3).map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
