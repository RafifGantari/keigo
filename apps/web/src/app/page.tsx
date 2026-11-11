import { getFeaturedArticle, getLatestArticles } from '@/lib/supabase';
import { InfiniteStoryStream } from '@/components/InfiniteStoryStream';

export default async function HomePage() {
  const featured = await getFeaturedArticle();
  const latestArticles = await getLatestArticles(12, featured?.id);

  const allArticles = featured ? [featured, ...latestArticles] : latestArticles;

  return (
    <div className="w-full h-screen h-dvh overflow-hidden bg-[#F8FAFC]">
      {allArticles.length > 0 ? (
        <InfiniteStoryStream articles={allArticles} />
      ) : (
        <section className="h-screen flex flex-col items-center justify-center p-6 text-center">
          <span className="font-space-grotesk font-bold text-3xl text-[#172554]">
            KEIGO<span className="text-[#2563EB]">.</span>
          </span>
          <p className="font-inter text-sm text-[#64748B] mt-2 max-w-sm">
            Curiosity. Clarity. Discovery.
          </p>
        </section>
      )}
    </div>
  );
}
