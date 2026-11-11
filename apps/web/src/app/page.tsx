import { getFeaturedArticle, getLatestArticles, getArticlesByCategory } from '@/lib/supabase';
import { HeroArticle } from '@/components/HeroArticle';
import { ArticleCard } from '@/components/ArticleCard';
import { CategorySection } from '@/components/CategorySection';
import Link from 'next/link';

export default async function HomePage() {
  const featured = await getFeaturedArticle();
  const latestArticles = await getLatestArticles(6, featured?.id);

  const [aiArticles, techArticles, scienceArticles, innovationArticles] =
    await Promise.all([
      getArticlesByCategory('artificial_intelligence', 3),
      getArticlesByCategory('technology', 3),
      getArticlesByCategory('science', 3),
      getArticlesByCategory('innovation', 3),
    ]);

  const allArticles = featured ? [featured, ...latestArticles] : latestArticles;

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Cinematic Hero Section */}
      {featured ? (
        <section>
          <HeroArticle article={featured} />
        </section>
      ) : (
        <section className="px-6 sm:px-12 py-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.02] text-xs font-mono text-[#38BDF8] tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse"></span>
            INGESTION ENGINE ACTIVE
          </div>
          <h1 className="font-space-grotesk font-bold text-4xl sm:text-6xl text-white tracking-tight uppercase leading-[1.05]">
            Curiosity. Clarity. Discovery.
          </h1>
          <p className="font-inter text-[#A8A8A8] text-base sm:text-lg mt-4 max-w-xl mx-auto leading-relaxed">
            Investigating foundational developments in frontier intelligence, scientific breakthroughs, and technical architectures.
          </p>
        </section>
      )}

      {/* 2. Signature MilleDollars-style Tabular Investigation Index */}
      {allArticles.length > 0 && (
        <section className="w-full px-6 sm:px-10 lg:px-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-white/[0.12] gap-4">
            <div>
              <span className="font-mono text-xs text-[#38BDF8] tracking-widest uppercase">
                [ INDEX 01 — {String(allArticles.length).padStart(2, '0')} ]
              </span>
              <h2 className="font-space-grotesk font-bold text-2xl sm:text-4xl text-white tracking-tight uppercase mt-1">
                Active Investigations
              </h2>
            </div>
            <span className="font-mono text-xs text-[#737373] uppercase tracking-wider">
              Autonomous Verification Log
            </span>
          </div>

          {/* Interactive Row Table */}
          <div className="divide-y divide-white/[0.08] group/table">
            {allArticles.map((article, idx) => {
              const year = article.published_at 
                ? new Date(article.published_at).getFullYear() 
                : '2026';
              const categoryLabel = article.category.replace('_', ' ').toUpperCase();

              return (
                <Link
                  key={article.id}
                  href={`/article/${article.slug}`}
                  className="group relative flex flex-col md:flex-row md:items-center justify-between py-6 sm:py-8 transition-all duration-300 hover:pl-2 group-hover/table:opacity-40 hover:!opacity-100"
                >
                  {/* Left: Index & Title */}
                  <div className="flex items-start md:items-center gap-4 sm:gap-8 flex-1 pr-6">
                    <span className="font-mono text-xs sm:text-sm text-[#737373] group-hover:text-[#38BDF8] transition-colors tabular-nums">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-space-grotesk font-bold text-lg sm:text-2xl text-white group-hover:text-[#38BDF8] transition-colors uppercase tracking-tight">
                      {article.title}
                    </h3>
                  </div>

                  {/* Right: Meta & Arrow */}
                  <div className="flex items-center justify-between md:justify-end gap-6 sm:gap-10 mt-3 md:mt-0 shrink-0 font-mono text-xs text-[#A8A8A8]">
                    <span className="uppercase text-[11px] px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.02]">
                      {categoryLabel}
                    </span>
                    <span className="text-[#737373] hidden sm:inline">{year}</span>
                    <span className="text-white group-hover:translate-x-2 transition-transform duration-300 text-sm font-bold">
                      ➔
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* 3. Categorized Pillar Grids */}
      <div className="w-full px-6 sm:px-10 lg:px-14 space-y-8">
        <CategorySection
          category="artificial_intelligence"
          title="Artificial Intelligence"
          description="Frontier models, autonomous agent frameworks, safety architectures, and computational limits."
          articles={aiArticles}
        />

        <CategorySection
          category="technology"
          title="Engineering & Infrastructure"
          description="Semiconductor design, distributed systems, open-source infrastructure, and developer ecosystems."
          articles={techArticles}
        />

        <CategorySection
          category="science"
          title="Scientific Breakthroughs"
          description="Quantum computing, astrophysics, bio-engineering, materials science, and clean energy."
          articles={scienceArticles}
        />

        <CategorySection
          category="innovation"
          title="Future Innovation"
          description="Novel hardware form factors, aerospace systems, robotics, and emerging industrial paradigms."
          articles={innovationArticles}
        />
      </div>
    </div>
  );
}
