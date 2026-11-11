import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticlesByCategory } from '@/lib/supabase';
import { ArticleCard } from '@/components/ArticleCard';
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
    <div className="w-full px-6 sm:px-10 lg:px-14 py-6 sm:py-10 space-y-12">
      {/* Header */}
      <header className="border-b border-white/[0.08] pb-10 max-w-4xl space-y-4">
        <nav className="flex items-center gap-2 text-xs font-mono text-[#737373]">
          <Link href="/" className="hover:text-white transition-colors">
            INDEX
          </Link>
          <span>/</span>
          <span className="text-[#38BDF8] uppercase font-bold">{categoryInfo.name}</span>
        </nav>

        <h1 className="font-space-grotesk font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
          {categoryInfo.name}
        </h1>
        <p className="font-inter text-base sm:text-lg text-[#A8A8A8] font-light max-w-2xl leading-relaxed">
          {categoryInfo.description}
        </p>
      </header>

      {/* Grid */}
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {articles.map((article, idx) => (
            <ArticleCard key={article.id} article={article} index={idx} />
          ))}
        </div>
      ) : (
        <div className="bg-[#1C1C1C] rounded-2xl border border-white/[0.08] p-12 text-center max-w-xl mx-auto space-y-4">
          <p className="font-space-grotesk font-bold text-lg text-white uppercase tracking-wider">
            Continuous Ingestion in Progress
          </p>
          <p className="font-inter text-xs sm:text-sm text-[#A8A8A8] leading-relaxed">
            Our autonomous pipeline monitors 20+ primary journals and labs in {categoryInfo.name}. Stories passing our verification gate will appear here automatically.
          </p>
          <Link
            href="/"
            className="inline-block font-mono text-xs text-[#38BDF8] hover:underline uppercase"
          >
            ← Back to Index
          </Link>
        </div>
      )}
    </div>
  );
}
