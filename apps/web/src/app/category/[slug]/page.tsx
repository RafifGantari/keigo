import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticlesByCategory } from '@/lib/supabase';
import { CinematicStoryFrame } from '@/components/CinematicStoryFrame';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
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
    <div className="w-full min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <header className="px-6 sm:px-12 py-4 max-w-4xl space-y-2">
        <h1 className="font-space-grotesk font-bold text-3xl sm:text-5xl text-[#172554] tracking-tight">
          {categoryInfo.name}
        </h1>
        <p className="font-inter text-sm sm:text-base text-[#64748B] font-normal max-w-2xl">
          {categoryInfo.description}
        </p>
      </header>

      {/* Visual Stream of Articles */}
      {articles.length > 0 ? (
        <section className="w-full">
          {articles.map((article, idx) => (
            <CinematicStoryFrame key={article.id} article={article} index={idx} />
          ))}
        </section>
      ) : (
        <div className="py-24 text-center max-w-xl mx-auto space-y-3">
          <p className="font-space-grotesk font-bold text-xl text-[#172554]">
            Stories in {categoryInfo.name} are being prepared.
          </p>
          <Link
            href="/"
            className="inline-block font-space-grotesk text-xs font-bold text-[#2563EB] hover:underline"
          >
            ← Back to Homepage
          </Link>
        </div>
      )}

      <Footer />
    </div>
  );
}
