-- ============================================================================
-- KEIGO: Master Database Schema Migration
-- Migration: 001_initial_schema.sql
-- Description: Core 8 tables, Enums, Indexes, RLS Policies, and Storage Setup
-- ============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUM TYPES
DO $$ BEGIN
    CREATE TYPE content_category AS ENUM (
        'artificial_intelligence',
        'technology',
        'science',
        'innovation'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE article_status AS ENUM (
        'discovered',
        'selected',
        'researching',
        'draft',
        'quality_check',
        'pending_review',
        'approved',
        'published',
        'rejected',
        'pending_retry'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE risk_level AS ENUM (
        'low',
        'medium',
        'high',
        'uncertain'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE source_credibility AS ENUM (
        'primary',
        'official',
        'academic',
        'high',
        'medium'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE social_publish_status AS ENUM (
        'none',
        'pending',
        'processing',
        'published',
        'failed'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. HELPER FUNCTIONS
-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 4. CORE TABLES
-- ============================================================================

-- TABLE 1: sources
-- Approved information sources (RSS feeds, APIs, official announcement channels)
CREATE TABLE IF NOT EXISTS sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    url VARCHAR(1024) NOT NULL,
    feed_url VARCHAR(1024) NOT NULL UNIQUE,
    source_type VARCHAR(50) NOT NULL DEFAULT 'rss', -- 'rss', 'api', 'scrape'
    category content_category NOT NULL,
    credibility_level source_credibility NOT NULL DEFAULT 'high',
    active BOOLEAN NOT NULL DEFAULT true,
    fetch_interval_minutes INTEGER NOT NULL DEFAULT 60,
    last_fetched_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_sources_updated_at
    BEFORE UPDATE ON sources
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- TABLE 2: raw_articles
-- Ingested raw source material collected deterministically by Python
CREATE TABLE IF NOT EXISTS raw_articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_id UUID NOT NULL REFERENCES sources(id) ON DELETE CASCADE,
    original_url TEXT NOT NULL,
    normalized_url TEXT NOT NULL,
    title TEXT NOT NULL,
    author VARCHAR(255),
    published_at TIMESTAMPTZ,
    description TEXT,
    raw_content TEXT,
    content_hash VARCHAR(64) NOT NULL UNIQUE, -- SHA-256 hash to prevent duplicate ingestion
    status VARCHAR(50) NOT NULL DEFAULT 'new', -- 'new', 'processed', 'ignored'
    collected_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TABLE 3: content_queue
-- Topics curated and selected for production research & writing
CREATE TABLE IF NOT EXISTS content_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    raw_article_id UUID REFERENCES raw_articles(id) ON DELETE SET NULL,
    topic TEXT NOT NULL,
    category content_category NOT NULL,
    priority INTEGER NOT NULL DEFAULT 1, -- 1 (normal) to 5 (breaking/major)
    status VARCHAR(50) NOT NULL DEFAULT 'queued', -- 'queued', 'in_progress', 'completed', 'dropped'
    relevance_score NUMERIC(4, 2), -- 0.00 to 10.00 score evaluated by AI/rules
    research_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_content_queue_updated_at
    BEFORE UPDATE ON content_queue
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- TABLE 4: articles
-- Generated, reviewed, and published articles (Web & Instagram channels)
CREATE TABLE IF NOT EXISTS articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(255) NOT NULL UNIQUE,
    title VARCHAR(512) NOT NULL,
    excerpt TEXT NOT NULL,
    category content_category NOT NULL,
    body_markdown TEXT NOT NULL,
    seo_description VARCHAR(320) NOT NULL,
    status article_status NOT NULL DEFAULT 'draft',
    risk_level risk_level NOT NULL DEFAULT 'low',
    key_facts JSONB DEFAULT '[]'::jsonb, -- Array of verified key takeaways
    reading_time_minutes INTEGER NOT NULL DEFAULT 3,
    
    -- Visual & Instagram distribution fields
    cover_image_url TEXT, -- Public URL of the generated branded card (1080x1350)
    social_caption TEXT, -- Instagram caption with hook, summary, CTA, and hashtags
    visual_bullets JSONB DEFAULT '[]'::jsonb, -- 3 bullet points rendered onto the visual card
    instagram_status social_publish_status NOT NULL DEFAULT 'none',
    instagram_post_id VARCHAR(128), -- Meta Graph API post ID
    instagram_published_at TIMESTAMPTZ,
    
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_articles_updated_at
    BEFORE UPDATE ON articles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- TABLE 5: article_sources
-- Traceable primary source attributions connected to an article
CREATE TABLE IF NOT EXISTS article_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
    source_id UUID REFERENCES sources(id) ON DELETE SET NULL,
    source_url TEXT NOT NULL,
    source_title VARCHAR(512) NOT NULL,
    relationship_type VARCHAR(50) NOT NULL DEFAULT 'primary_reference', -- 'primary_reference', 'supporting', 'quote'
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TABLE 6: editorial_reviews
-- Quality control, factual consistency checks, and risk classification audits
CREATE TABLE IF NOT EXISTS editorial_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
    factual_score NUMERIC(4, 2), -- 0.00 to 10.00
    consistency_score NUMERIC(4, 2), -- 0.00 to 10.00
    unsupported_claims JSONB DEFAULT '[]'::jsonb, -- List of flagged claims without verified sources
    risk_level risk_level NOT NULL DEFAULT 'low',
    review_status VARCHAR(50) NOT NULL DEFAULT 'passed', -- 'passed', 'flagged', 'rejected'
    review_reason TEXT,
    automated BOOLEAN NOT NULL DEFAULT true, -- true if evaluated by QC prompt, false if human
    reviewer_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TABLE 7: api_usage
-- AI model token tracking, provider cost estimation & quota health
CREATE TABLE IF NOT EXISTS api_usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider VARCHAR(100) NOT NULL, -- 'gemini', 'groq', 'mistral', 'openrouter', etc.
    model VARCHAR(100) NOT NULL,
    operation VARCHAR(100) NOT NULL, -- 'topic_selection', 'draft_generation', 'qc_check'
    prompt_tokens INTEGER NOT NULL DEFAULT 0,
    completion_tokens INTEGER NOT NULL DEFAULT 0,
    total_tokens INTEGER NOT NULL DEFAULT 0,
    estimated_cost NUMERIC(10, 6) DEFAULT 0.000000,
    status VARCHAR(50) NOT NULL DEFAULT 'success', -- 'success', 'rate_limited', 'failed'
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TABLE 8: automation_logs
-- System execution logs for n8n orchestrator and Python ingestion
CREATE TABLE IF NOT EXISTS automation_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_name VARCHAR(255) NOT NULL,
    execution_status VARCHAR(50) NOT NULL, -- 'started', 'completed', 'failed', 'retrying'
    execution_details JSONB DEFAULT '{}'::jsonb,
    error_message TEXT,
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

-- ============================================================================
-- 5. PERFORMANCE INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_sources_active_category ON sources(active, category);
CREATE INDEX IF NOT EXISTS idx_raw_articles_content_hash ON raw_articles(content_hash);
CREATE INDEX IF NOT EXISTS idx_raw_articles_status ON raw_articles(status);
CREATE INDEX IF NOT EXISTS idx_content_queue_status_priority ON content_queue(status, priority DESC);

-- Articles indexes for public site querying
CREATE INDEX IF NOT EXISTS idx_articles_status_published_at ON articles(status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_category_published_at ON articles(category, published_at DESC) WHERE status = 'published';
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_instagram_status ON articles(instagram_status);

CREATE INDEX IF NOT EXISTS idx_article_sources_article_id ON article_sources(article_id);
CREATE INDEX IF NOT EXISTS idx_editorial_reviews_article_id ON editorial_reviews(article_id);
CREATE INDEX IF NOT EXISTS idx_api_usage_created_at ON api_usage(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_automation_logs_created_at ON automation_logs(started_at DESC);

-- ============================================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE raw_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE editorial_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_logs ENABLE ROW LEVEL SECURITY;

-- Service Role policies: Automation backend has full access to all tables
DO $$ 
DECLARE
    t text;
    tables text[] := ARRAY[
        'sources', 'raw_articles', 'content_queue', 'articles', 
        'article_sources', 'editorial_reviews', 'api_usage', 'automation_logs'
    ];
BEGIN
    FOREACH t IN ARRAY tables LOOP
        EXECUTE format('DROP POLICY IF EXISTS "service_role_all_%s" ON %I', t, t);
        EXECUTE format('CREATE POLICY "service_role_all_%s" ON %I FOR ALL TO service_role USING (true) WITH CHECK (true)', t, t);
    END LOOP;
END $$;

-- Public (anon & authenticated) policies:
-- Only published articles and their sources can be viewed by the public web visitor
DROP POLICY IF EXISTS "public_read_published_articles" ON articles;
CREATE POLICY "public_read_published_articles" ON articles
    FOR SELECT TO anon, authenticated
    USING (status = 'published');

DROP POLICY IF EXISTS "public_read_published_article_sources" ON article_sources;
CREATE POLICY "public_read_published_article_sources" ON article_sources
    FOR SELECT TO anon, authenticated
    USING (
        EXISTS (
            SELECT 1 FROM articles 
            WHERE articles.id = article_sources.article_id 
            AND articles.status = 'published'
        )
    );

-- ============================================================================
-- 7. SUPABASE STORAGE BUCKET: media-assets
-- ============================================================================
-- Insert public storage bucket for article cover banners & Instagram visual cards
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'media-assets',
    'media-assets',
    true,
    10485760, -- 10MB limit
    ARRAY['image/png', 'image/jpeg', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 10485760,
    allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/webp'];

-- Storage bucket RLS policies
DROP POLICY IF EXISTS "public_can_view_media_assets" ON storage.objects;
CREATE POLICY "public_can_view_media_assets" ON storage.objects
    FOR SELECT TO anon, authenticated
    USING (bucket_id = 'media-assets');

DROP POLICY IF EXISTS "service_role_can_manage_media_assets" ON storage.objects;
CREATE POLICY "service_role_can_manage_media_assets" ON storage.objects
    FOR ALL TO service_role
    USING (bucket_id = 'media-assets')
    WITH CHECK (bucket_id = 'media-assets');
