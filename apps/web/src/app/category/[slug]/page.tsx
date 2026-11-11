import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticlesByCategory } from '@/lib/supabase';
import { CinematicStoryFrame } from '@/components/CinematicStoryFrame';
import { ContentCategory } from '@/types';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const CATEGORY_MAP: Record<
  string,
  { key: ContentCategory; name: string; description: string }
> = {
  'artificial-intelligence': {
    key: 'artificial_intelligence',
    name: 'Artificial Intelligence',
    description:
      'Rigorous coverage of frontier models, autonomous agent frameworks, mechanistic interpretability, and AI safety architectures.',
  },
  technology: {
    key: 'technology',
    name: 'Engineering & Technology',
    description:
      'Deep architectural breakdowns of distributed systems, open-source infrastructure, hardware accelerators, and software engineering.',
  },
  science: {
    key: 'science',
    name: 'Science & Breakthroughs',
    description:
      'Peer-reviewed discoveries across quantum computing, biotechnology, physics, materials science, and energy transition.',
  },
  innovation: {
    key: 'innovation',
    name: 'Future Innovation',
    description:
      'Emerging paradigms in robotics, aerospace, advanced manufacturing, and novel computational substrates.',
  },
};

export async function generateStaticParams() {
  return Object.keys(CATEGORY_MAP).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORY_MAP[slug];

  if (!cat) {
    return { title: 'Category Not Found | KEIGO' };
  }

  return {
    title: `${cat.name} | KEIGO`,
    description: cat.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categoryInfo = CATEGORY_MAP[slug];

  if (!categoryInfo) {
    notFound();
  }

  const articles = await getArticlesByCategory(categoryInfo.key, 24);

  return (
    <div className="w-full space-y-8 sm:space-y-12">
      {/* Header */}
      <header className="px-6 sm:px-10 lg:px-14 pb-6 border-b border-[#E2E8F0] max-w-4xl space-y-3">
        <nav className="flex items-center gap-2 text-xs font-inter text-[#64748B]">
          <Link href="/" className="hover:text-[#172554] transition-colors">
            Home
          </Link>
          <span className="text-[#CBD5E1]">/</span>
          <span className="text-[#2563EB] uppercase font-bold">{categoryInfo.name}</span>
        </nav>

        <h1 className="font-space-grotesk font-bold text-3xl sm:text-5xl text-[#172554] tracking-tight">
          {categoryInfo.name}
        </h1>
        <p className="font-inter text-base sm:text-lg text-[#64748B] font-normal max-w-2xl leading-relaxed">
          {categoryInfo.description}
        </p>
      </header>

      {/* Visual Stream of Articles in Category */}
      {articles.length > 0 ? (
        <section className="w-full">
          {articles.map((article, idx) => (
            <CinematicStoryFrame key={article.id} article={article} index={idx} />
          ))}
        </section>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center max-w-xl mx-auto space-y-4 shadow-sm">
          <p className="font-space-grotesk font-bold text-lg text-[#172554]">
            Continuous Ingestion in Progress
          </p>
          <p className="font-inter text-sm text-[#64748B] leading-relaxed">
            Our automated pipeline regularly indexes research feeds in {categoryInfo.name}. Stories passing our verification gate will appear here automatically.
          </p>
          <Link
            href="/"
            className="inline-block font-space-grotesk text-xs font-bold text-[#2563EB] hover:underline"
          >
            ← Back to Homepage
          </Link>
        </div>
      )}
    </div>
  );
}
