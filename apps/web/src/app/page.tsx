import { getFeaturedArticle, getLatestArticles } from '@/lib/supabase';
import { CinematicStoryFrame } from '@/components/CinematicStoryFrame';

export default async function HomePage() {
  const featured = await getFeaturedArticle();
  const latestArticles = await getLatestArticles(12, featured?.id);

  const allArticles = featured ? [featured, ...latestArticles] : latestArticles;

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      {/* Visual Cinematic Stream: Frame demi frame gambar artikel */}
      {allArticles.length > 0 ? (
        <section className="w-full">
          {allArticles.map((article, idx) => (
            <CinematicStoryFrame key={article.id} article={article} index={idx} />
          ))}
        </section>
      ) : (
        <section className="px-6 sm:px-12 py-24 text-center max-w-2xl mx-auto">
          <div className="font-space-grotesk font-bold text-2xl text-[#2563EB] mb-3">
            KEIGO.
          </div>
          <h1 className="font-space-grotesk font-bold text-3xl sm:text-4xl text-[#172554] tracking-tight">
            Curiosity. Clarity. Discovery.
          </h1>
          <p className="font-inter text-[#64748B] text-base mt-3 leading-relaxed">
            The autonomous ingestion engine is actively processing 220+ verified research feeds. Technical investigations will appear here once cleared through the Fact-Checking Risk Gate.
          </p>
        </section>
      )}
    </div>
  );
}
