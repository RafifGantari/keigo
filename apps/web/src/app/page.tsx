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

  return (
    <div className="space-y-16">
      {/* Editorial Mission Header */}
      <section className="pt-4 pb-2 border-b border-[#E2E8F0]">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BAE6FD] text-[#2563EB] text-xs font-space-grotesk font-semibold tracking-wider uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse"></span>
            Independent Science & Tech Journalism
          </div>
          <h1 className="font-space-grotesk font-bold text-4xl sm:text-5xl lg:text-6xl text-[#172554] tracking-tight leading-[1.1]">
            Curiosity. Clarity. Discovery.
          </h1>
          <p className="font-inter text-lg sm:text-xl text-[#64748B] mt-4 leading-relaxed">
            Investigating foundational developments in frontier intelligence, scientific breakthroughs, and technical architectures shaping humanity.
          </p>
        </div>
      </section>

      {/* Featured / Hero Article */}
      {featured ? (
        <section>
          <div className="flex items-center justify-between mb-4">
            <span className="font-space-grotesk text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              FEATURED INVESTIGATION
            </span>
          </div>
          <HeroArticle article={featured} />
        </section>
      ) : (
        /* Graceful placeholder when pipeline is running */
        <section className="bg-white rounded-2xl border border-[#E2E8F0] p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-sm">
          <div className="w-12 h-12 rounded-full bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center mx-auto mb-4 font-space-grotesk font-bold text-xl">
            K
          </div>
          <h2 className="font-space-grotesk font-bold text-2xl text-[#172554] mb-2">
            Research & Ingestion Engine Active
          </h2>
          <p className="font-inter text-sm text-[#64748B] leading-relaxed mb-6">
            The KEIGO editorial pipeline has indexed 220+ global research feeds. Verified technical investigations will appear here once cleared through the Fact-Checking Risk Gate.
          </p>
          <div className="inline-flex items-center gap-2 text-xs font-space-grotesk font-semibold text-[#2563EB] bg-[#F8FAFC] px-4 py-2 rounded-full border border-[#E2E8F0]">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Supabase PostgreSQL • Gemini 3.8 Flash • Visual Generator
          </div>
        </section>
      )}

      {/* Latest Stories Grid */}
      {latestArticles.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-end justify-between border-b border-[#E2E8F0] pb-4">
            <div>
              <span className="font-space-grotesk text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                RECENT DISPATCHES
              </span>
              <h2 className="font-space-grotesk font-bold text-2xl sm:text-3xl text-[#172554] mt-1">
                Latest Investigations
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Categorized Pillars */}
      <div className="space-y-12">
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
