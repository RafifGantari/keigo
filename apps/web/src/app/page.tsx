import { getFeaturedArticle, getLatestArticles } from '@/lib/supabase';
import { CinematicStoryFrame } from '@/components/CinematicStoryFrame';
import Link from 'next/link';

export default async function HomePage() {
  const featured = await getFeaturedArticle();
  const latestArticles = await getLatestArticles(12, featured?.id);

  const allArticles = featured ? [featured, ...latestArticles] : latestArticles;

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC]">
      {allArticles.length > 0 ? (
        <div>
          {/* Visual Cinematic Stream: Full 1 Screen per Story */}
          {allArticles.map((article, idx) => (
            <CinematicStoryFrame key={article.id} article={article} index={idx} />
          ))}

          {/* Minimalist End Note */}
          <footer className="w-full py-12 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between text-xs font-space-grotesk text-[#64748B] border-t border-[#E2E8F0] mt-8 gap-4">
            <span className="font-bold text-[#172554]">KEIGO.</span>
            <div className="flex items-center gap-6">
              <Link href="/about" className="hover:text-[#172554] uppercase">About</Link>
              <Link href="/editorial-policy" className="hover:text-[#172554] uppercase">Standards</Link>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#172554] uppercase">Instagram ↗</a>
            </div>
            <span>© {new Date().getFullYear()} KEIGO.</span>
          </footer>
        </div>
      ) : (
        <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
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
