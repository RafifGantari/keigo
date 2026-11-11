import Link from 'next/link';
import { Article } from '@/types';

interface CinematicStoryFrameProps {
  article: Article;
  index: number;
}

export function CinematicStoryFrame({ article }: CinematicStoryFrameProps) {
  const categoryLabel = article.category.replace('_', ' ').toUpperCase();

  const heroImage =
    article.image_url ||
    article.cover_image_url ||
    'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1600&auto=format&fit=crop';

  return (
    <section className="w-full h-screen h-dvh p-0 sm:p-3 flex flex-col justify-center snap-start snap-always shrink-0">
      <Link
        href={`/article/${article.slug}`}
        className="group relative block w-full h-full rounded-none sm:rounded-[28px] overflow-hidden border-0 sm:border border-white/20 shadow-none sm:shadow-2xl bg-[#172554]"
      >
        {/* Full 1 Screen Authentic Photo (Edge-to-edge on Mobile) */}
        <img
          src={heroImage}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-1000 ease-out"
        />

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none"></div>

        {/* Center Content Row: Minimalist Category & Headline */}
        <div className="absolute top-1/2 -translate-y-1/2 left-6 sm:left-14 right-6 sm:right-14 flex flex-col md:flex-row md:items-center justify-between gap-6 pointer-events-none">
          
          {/* Left: Category Only */}
          <div className="text-white">
            <span className="font-space-grotesk font-bold text-lg sm:text-2xl uppercase tracking-wider text-white">
              {categoryLabel}
            </span>
          </div>

          {/* Right: Big Editorial Headline */}
          <div className="text-left md:text-right max-w-2xl">
            <h2 className="font-space-grotesk font-bold text-2xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight leading-[1.12] group-hover:text-[#BAE6FD] transition-colors duration-300 drop-shadow-md">
              {article.title}
            </h2>
          </div>

        </div>

        {/* Bottom Action Right: Pure Read Callout */}
        <div className="absolute bottom-8 sm:bottom-10 right-6 sm:right-14 text-white z-10 pointer-events-auto">
          <div className="font-space-grotesk text-xs sm:text-sm uppercase tracking-widest text-white font-bold group-hover:text-[#BAE6FD] flex items-center gap-2 transition-colors">
            <span>READ STORY</span>
            <span className="group-hover:translate-x-1.5 transition-transform duration-300">➔</span>
          </div>
        </div>
      </Link>
    </section>
  );
}
