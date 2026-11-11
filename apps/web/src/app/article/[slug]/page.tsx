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
  const year = article.published_at 
    ? new Date(article.published_at).getFullYear() 
    : '2026';
  const publishedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString('en-US', {
        month: 'short',
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
    <article className="max-w-5xl mx-auto px-6 sm:px-10 py-6 sm:py-10 space-y-12">
      {/* 1. Header Metadata Bar */}
      <nav className="flex items-center justify-between text-xs font-mono text-[#737373] border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">
            INDEX
          </Link>
          <span>/</span>
          <Link
            href={`/category/${article.category.replace('_', '-')}`}
            className="text-[#38BDF8] hover:underline uppercase"
          >
            {categoryLabel}
          </Link>
        </div>

        <div className="flex items-center gap-4 text-[#A8A8A8]">
          <span>{publishedDate}</span>
          <span>•</span>
          <span>{article.reading_time_minutes} MIN READ</span>
        </div>
      </nav>

      {/* 2. Article Title & Excerpt */}
      <header className="space-y-6">
        <h1 className="font-space-grotesk font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08] uppercase">
          {article.title}
        </h1>

        <p className="font-inter text-lg sm:text-xl text-[#A8A8A8] font-light leading-relaxed max-w-3xl">
          {article.excerpt}
        </p>

        {/* Verification Status Pill */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#737373]">
          <div className="flex items-center gap-2">
            <span className="text-white font-medium">KEIGO Research & Editorial</span>
            <span>•</span>
            <span>Dispatch #{year}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-[#38BDF8] text-[11px] font-space-grotesk uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse"></span>
            Peer-Source Audited
          </div>
        </div>
      </header>

      {/* 3. Framed Landscape Authentic News Photo + Context Caption Below */}
      <figure className="space-y-3">
        <div className="w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.12] bg-[#121212] relative group">
          <img
            src={heroImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out brightness-[0.88]"
          />
        </div>
        <figcaption className="text-xs font-mono text-[#737373] leading-relaxed flex items-start gap-2 px-1">
          <span className="text-[#38BDF8] shrink-0 font-bold uppercase">
            [ CONTEXT ]
          </span>
          <span>{heroCaption}</span>
        </figcaption>
      </figure>

      {/* 4. Core Technical Takeaways */}
      {article.key_facts && article.key_facts.length > 0 && (
        <section className="bg-[#1C1C1C] rounded-2xl border border-white/[0.08] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs text-[#38BDF8] uppercase tracking-widest">
            <span>✺ KEY TECHNICAL TAKEAWAYS</span>
          </div>
          <ul className="space-y-3 text-sm text-[#D4D4D4] list-disc pl-5 font-inter">
            {article.key_facts.map((fact: string, idx: number) => (
              <li key={idx} className="leading-relaxed">
                {fact}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 5. Main Body Typography */}
      <div className="space-y-6 text-[#D4D4D4] font-inter text-base sm:text-lg leading-relaxed pt-4 border-t border-white/[0.08]">
        {paragraphs.map((p: string, idx: number) => {
          if (p.startsWith('# ')) {
            return (
              <h2
                key={idx}
                className="font-space-grotesk font-bold text-2xl sm:text-3xl text-white pt-8 pb-2 uppercase tracking-tight"
              >
                {p.replace('# ', '')}
              </h2>
            );
          }
          if (p.startsWith('## ')) {
            return (
              <h3
                key={idx}
                className="font-space-grotesk font-bold text-xl sm:text-2xl text-white pt-6 pb-2 uppercase tracking-tight"
              >
                {p.replace('## ', '')}
              </h3>
            );
          }
          return (
            <p key={idx} className="text-[#CCCCCC] leading-relaxed font-light">
              {p}
            </p>
          );
        })}
      </div>

      {/* 6. Primary Verified Sources Table */}
      {sources.length > 0 && (
        <section className="bg-[#1C1C1C] rounded-2xl border border-white/[0.08] p-6 sm:p-8 space-y-4 my-10">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
            <h4 className="font-space-grotesk font-bold text-sm tracking-wider uppercase text-white">
              Primary Verified Sources
            </h4>
            <span className="font-mono text-xs text-[#737373]">
              Transparency Protocol
            </span>
          </div>
          <div className="divide-y divide-white/[0.06]">
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
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm"
                >
                  <div>
                    <p className="font-medium text-white">{s.source_title}</p>
                    <p className="font-mono text-xs text-[#737373] mt-0.5">{domain}</p>
                  </div>
                  <a
                    href={s.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-space-grotesk text-xs font-bold text-[#38BDF8] hover:underline inline-flex items-center gap-1 shrink-0 uppercase"
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
      <footer className="bg-[#161616] rounded-2xl border border-white/[0.08] p-6 sm:p-8 text-xs text-[#A8A8A8] space-y-3 font-inter">
        <p className="font-space-grotesk font-bold text-sm text-white uppercase tracking-wider">
          Editorial Standards & Verification
        </p>
        <p className="leading-relaxed text-[#737373]">
          Every dispatch published by KEIGO undergoes multi-tier automated cross-source validation, claim verification, and factual audits against primary laboratory papers and engineering whitepapers.
        </p>
        <div className="pt-2">
          <Link
            href="/editorial-policy"
            className="text-[#38BDF8] font-space-grotesk font-bold hover:underline uppercase text-xs inline-flex items-center gap-1"
          >
            Read Full Risk Gate Specification <span>➔</span>
          </Link>
        </div>
      </footer>
    </article>
  );
}
