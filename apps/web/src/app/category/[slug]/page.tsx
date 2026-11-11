import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticlesByCategory } from '@/lib/supabase';
import { InfiniteStoryStream } from '@/components/InfiniteStoryStream';
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
    <div className="w-full h-screen h-dvh overflow-hidden bg-[#F8FAFC]">
      {articles.length > 0 ? (
        <InfiniteStoryStream articles={articles} />
      ) : (
        <div className="h-screen flex flex-col items-center justify-center p-6 text-center max-w-xl mx-auto space-y-4">
          <p className="font-space-grotesk font-bold text-2xl text-[#172554]">
            {categoryInfo.name}
          </p>
          <p className="font-inter text-sm text-[#64748B] leading-relaxed">
            Stories in this category are being prepared.
          </p>
          <Link
            href="/"
            className="inline-block font-space-grotesk text-xs font-bold text-[#2563EB] hover:underline uppercase"
          >
            ← Back to Stories
          </Link>
        </div>
      )}
    </div>
  );
}
