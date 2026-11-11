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
    <div className="space-y-10 py-4 sm:py-8">
      {/* Header */}
      <header className="border-b border-[#E2E8F0] pb-8 max-w-3xl">
        <nav className="flex items-center gap-2 text-xs font-inter text-[#64748B] mb-4">
          <Link href="/" className="hover:text-[#2563EB] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#172554] font-medium">Categories</span>
          <span>/</span>
          <span className="text-[#2563EB] font-bold">{categoryInfo.name}</span>
        </nav>

        <span className="font-space-grotesk text-xs font-bold uppercase tracking-wider text-[#2563EB]">
          EDITORIAL PILLAR
        </span>
        <h1 className="font-space-grotesk font-bold text-3xl sm:text-4xl lg:text-5xl text-[#172554] mt-2 tracking-tight">
          {categoryInfo.name}
        </h1>
        <p className="font-inter text-base sm:text-lg text-[#64748B] mt-3 leading-relaxed">
          {categoryInfo.description}
        </p>
      </header>

      {/* Grid */}
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-12 text-center max-w-xl mx-auto space-y-4">
          <p className="font-space-grotesk font-bold text-lg text-[#172554]">
            Continuous Monitoring in Progress
          </p>
          <p className="font-inter text-sm text-[#64748B] leading-relaxed">
            Our automated ingestion pipeline regularly analyzes 20+ primary journals and labs in {categoryInfo.name}. Stories passing our verification gate will appear here automatically.
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
