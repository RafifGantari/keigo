export type ContentCategory = 
  | 'artificial_intelligence' 
  | 'technology' 
  | 'science' 
  | 'innovation';

export type ArticleStatus = 
  | 'draft' 
  | 'quality_check' 
  | 'pending_review' 
  | 'approved' 
  | 'published' 
  | 'rejected';

export type RiskLevel = 'low' | 'medium' | 'high' | 'uncertain';

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: ContentCategory;
  body_markdown: string;
  seo_description: string;
  status: ArticleStatus;
  risk_level: RiskLevel;
  key_facts: string[];
  reading_time_minutes: number;
  cover_image_url: string | null;
  social_caption: string | null;
  visual_bullets: string[];
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ArticleSource {
  id: string;
  article_id: string;
  source_id: string | null;
  source_url: string;
  source_title: string;
  relationship_type: string;
  created_at: string;
}
