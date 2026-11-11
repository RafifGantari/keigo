import { createClient } from '@supabase/supabase-js';
import { Article, ArticleSource, ContentCategory } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Fetch the latest published featured story
 */
export async function getFeaturedArticle(): Promise<Article | null> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    return null;
  }
  return data as Article;
}

/**
 * Fetch latest published stories excluding the featured one
 */
export async function getLatestArticles(limit: number = 8, excludeId?: string): Promise<Article[]> {
  let query = supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit);

  if (excludeId) {
    query = query.neq('id', excludeId);
  }

  const { data, error } = await query;
  if (error || !data) {
    return [];
  }
  return data as Article[];
}

/**
 * Fetch stories by category
 */
export async function getArticlesByCategory(category: ContentCategory, limit: number = 10): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .eq('category', category)
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error || !data) {
    return [];
  }
  return data as Article[];
}

/**
 * Fetch single article by slug along with verified sources
 */
export async function getArticleBySlug(slug: string): Promise<{ article: Article | null; sources: ArticleSource[] }> {
  const { data: article, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error || !article) {
    return { article: null, sources: [] };
  }

  const { data: sources } = await supabase
    .from('article_sources')
    .select('*')
    .eq('article_id', article.id);

  return {
    article: article as Article,
    sources: (sources || []) as ArticleSource[],
  };
}

/**
 * Fetch all published slugs for static generation & sitemap
 */
export async function getAllPublishedSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('slug')
    .eq('status', 'published');

  if (error || !data) {
    return [];
  }
  return data.map((item: { slug: string }) => item.slug);
}
