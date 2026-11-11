import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticleBySlug, getAllPublishedSlugs } from '@/lib/supabase';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPublishedSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const { article } = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found | KEIGO',
    };
  }

  const socialImage = article.image_url || article.cover_image_url;

  return {
    title: `${article.title} | KEIGO`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.published_at || undefined,
      images: socialImage ? [{ url: socialImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: socialImage ? [socialImage] : [],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const { article, sources } = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const categoryLabel = article.category.replace('_', ' ').toUpperCase();
  const publishedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '2026';

  const paragraphs = article.body_markdown
    ? article.body_markdown.split('\n\n').filter((p: string) => p.trim().length > 0)
    : [article.excerpt];

  const heroImage =
    article.image_url ||
    article.cover_image_url ||
    'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1600&auto=format&fit=crop';
  
  const heroCaption =
    article.image_caption ||
    'Primary visual telemetry and physical architecture verified during technical investigation.';

  return (
    <article className="max-w-4xl mx-auto px-6 sm:px-10 py-6 sm:py-10 space-y-10">
      {/* 1. Header Metadata Bar */}
      <nav className="flex items-center justify-between text-xs font-inter text-[#64748B] border-b border-[#E2E8F0] pb-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-[#172554] transition-colors font-medium">
            Home
          </Link>
          <span className="text-[#CBD5E1]">/</span>
          <Link
            href={`/category/${article.category.replace('_', '-')}`}
            className="text-[#2563EB] font-bold uppercase tracking-wider"
          >
            {categoryLabel}
          </Link>
        </div>

        <div className="flex items-center gap-3 text-[#64748B]">
          <span>{publishedDate}</span>
          <span className="text-[#CBD5E1]">•</span>
          <span>{article.reading_time_minutes} min read</span>
        </div>
      </nav>

      {/* 2. Article Title & Excerpt */}
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BAE6FD] text-[#2563EB] text-xs font-space-grotesk font-semibold tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"></span>
          <span>{categoryLabel}</span>
        </div>

        <h1 className="font-space-grotesk font-bold text-3xl sm:text-5xl text-[#172554] tracking-tight leading-[1.12]">
          {article.title}
        </h1>

        <p className="font-inter text-lg sm:text-xl text-[#64748B] font-normal leading-relaxed pt-2">
          {article.excerpt}
        </p>

        {/* Verification Status Pill */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 text-xs font-inter text-[#64748B] border-t border-[#F1F5F9]">
          <div className="flex items-center gap-2">
            <span className="text-[#172554] font-semibold">Reported by KEIGO Editorial</span>
            <span className="text-[#CBD5E1]">•</span>
            <span>Frontier Research Desk</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BAE6FD] text-[#2563EB] text-[11px] font-space-grotesk font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Peer-Source Audited
          </div>
        </div>
      </header>

      {/* 3. Framed Landscape Authentic News Photo + Context Caption Below */}
      <figure className="space-y-3 my-6">
        <div className="w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-sm bg-[#FFFFFF] relative group">
          <img
            src={heroImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out"
          />
        </div>
        <figcaption className="text-xs font-inter text-[#64748B] leading-relaxed flex items-start gap-2 px-1">
          <span className="text-[#172554] font-semibold uppercase tracking-wider font-space-grotesk text-[11px] shrink-0">
            Context:
          </span>
          <span>{heroCaption}</span>
        </figcaption>
      </figure>

      {/* 4. Core Technical Takeaways */}
      {article.key_facts && article.key_facts.length > 0 && (
        <section className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 space-y-3 shadow-sm">
          <h4 className="font-space-grotesk font-bold text-sm tracking-wider uppercase text-[#172554]">
            Core Technical Takeaways
          </h4>
          <ul className="space-y-2.5 text-sm text-[#334155] list-disc pl-5 font-inter leading-relaxed">
            {article.key_facts.map((fact: string, idx: number) => (
              <li key={idx}>
                {fact}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 5. Main Body Typography */}
      <div className="space-y-6 text-[#172554] font-inter text-base sm:text-lg leading-relaxed pt-2">
        {paragraphs.map((p: string, idx: number) => {
          if (p.startsWith('# ')) {
            return (
              <h2
                key={idx}
                className="font-space-grotesk font-bold text-2xl sm:text-3xl text-[#172554] pt-6 pb-2"
              >
                {p.replace('# ', '')}
              </h2>
            );
          }
          if (p.startsWith('## ')) {
            return (
              <h3
                key={idx}
                className="font-space-grotesk font-bold text-xl sm:text-2xl text-[#172554] pt-4 pb-2"
              >
                {p.replace('## ', '')}
              </h3>
            );
          }
          return (
            <p key={idx} className="text-[#334155] leading-relaxed font-normal">
              {p}
            </p>
          );
        })}
      </div>

      {/* 6. Primary Verified Sources Table */}
      {sources.length > 0 && (
        <section className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 space-y-4 my-10 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
            <h4 className="font-space-grotesk font-bold text-sm tracking-wider uppercase text-[#172554]">
              Primary Verified Sources
            </h4>
            <span className="font-inter text-xs text-[#64748B]">
              Editorial Transparency
            </span>
          </div>
          <div className="divide-y divide-[#F1F5F9]">
            {sources.map((s, idx) => {
              let domain = s.source_url;
              try {
                domain = new URL(s.source_url).hostname.replace('www.', '');
              } catch {
                domain = s.source_url;
              }

              return (
                <div
                  key={idx}
                  className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm"
                >
                  <div>
                    <p className="font-medium text-[#172554]">{s.source_title}</p>
                    <p className="text-xs text-[#64748B] mt-0.5">{domain}</p>
                  </div>
                  <a
                    href={s.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-space-grotesk text-xs font-bold text-[#2563EB] hover:underline inline-flex items-center gap-1 shrink-0"
                  >
                    Verify Source <span>➔</span>
                  </a>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 7. Verification Risk Gate Footer Card */}
      <footer className="bg-[#EFF6FF] rounded-2xl border border-[#BAE6FD] p-6 sm:p-8 text-xs text-[#1E40AF] space-y-2 font-inter">
        <p className="font-space-grotesk font-bold text-sm text-[#172554]">
          KEIGO Editorial & Verification Policy
        </p>
        <p className="text-[#334155] leading-relaxed">
          Every story published by KEIGO undergoes automated cross-source validation, claim verification, and factual audits against primary laboratory papers and engineering whitepapers.
        </p>
        <div className="pt-2">
          <Link
            href="/editorial-policy"
            className="text-[#2563EB] font-semibold hover:underline"
          >
            Read full Risk Gate specification →
          </Link>
        </div>
      </footer>
    </article>
  );
}
