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
    <section className="py-12 border-t border-white/[0.08]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8] uppercase tracking-widest mb-1.5">
            <span>[ PILLAR ARCHIVE ]</span>
          </div>
          <h2 className="font-space-grotesk font-bold text-2xl sm:text-3xl text-white tracking-tight uppercase">
            {title}
          </h2>
          <p className="font-inter text-xs sm:text-sm text-[#A8A8A8] mt-1 max-w-xl">
            {description}
          </p>
        </div>

        <Link
          href={`/category/${slug}`}
          className="font-space-grotesk text-xs uppercase tracking-widest text-[#A8A8A8] hover:text-white inline-flex items-center gap-1.5 transition-colors shrink-0"
        >
          VIEW ALL {title} <span>➔</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.slice(0, 3).map((article, idx) => (
          <ArticleCard key={article.id} article={article} index={idx} />
        ))}
      </div>
    </section>
  );
}
