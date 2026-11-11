-- ============================================================================
-- KEIGO: Initial Approved Sources Seed
-- File: 001_initial_sources.sql
-- Description: High-credibility RSS feeds for the 4 core editorial categories
-- ============================================================================

INSERT INTO sources (name, url, feed_url, source_type, category, credibility_level, active, fetch_interval_minutes)
VALUES
    -- ========================================================================
    -- CATEGORY: ARTIFICIAL INTELLIGENCE
    -- ========================================================================
    (
        'Google DeepMind Blog',
        'https://deepmind.google/discover/blog/',
        'https://deepmind.google/blog/rss.xml',
        'rss',
        'artificial_intelligence',
        'official',
        true,
        120
    ),
    (
        'OpenAI News',
        'https://openai.com/news/',
        'https://openai.com/news/rss.xml',
        'rss',
        'artificial_intelligence',
        'official',
        120
    ),
    (
        'arXiv AI (cs.AI)',
        'https://arxiv.org/list/cs.AI/recent',
        'https://rss.arxiv.org/rss/cs.AI',
        'rss',
        'artificial_intelligence',
        'academic',
        true,
        360
    ),
    (
        'MIT CSAIL Research News',
        'https://www.csail.mit.edu/news',
        'https://www.csail.mit.edu/rss.xml',
        'rss',
        'artificial_intelligence',
        'academic',
        true,
        240
    ),
    (
        'Hugging Face Blog',
        'https://huggingface.co/blog',
        'https://huggingface.co/blog/feed.xml',
        'rss',
        'artificial_intelligence',
        'primary',
        true,
        180
    ),

    -- ========================================================================
    -- CATEGORY: TECHNOLOGY
    -- ========================================================================
    (
        'Ars Technica',
        'https://arstechnica.com/information-technology/',
        'https://feeds.arstechnica.com/arstechnica/technology-lab',
        'rss',
        'technology',
        'high',
        true,
        60
    ),
    (
        'TechCrunch',
        'https://techcrunch.com/',
        'https://techcrunch.com/feed/',
        'rss',
        'technology',
        'high',
        true,
        60
    ),
    (
        'The Verge - Tech',
        'https://www.theverge.com/tech',
        'https://www.theverge.com/rss/index.xml',
        'rss',
        'technology',
        'high',
        true,
        60
    ),
    (
        'GitHub Blog',
        'https://github.blog/',
        'https://github.blog/feed/',
        'rss',
        'technology',
        'official',
        true,
        240
    ),
    (
        'Hacker News (Top)',
        'https://news.ycombinator.com/',
        'https://news.ycombinator.com/rss',
        'rss',
        'technology',
        'medium',
        true,
        60
    ),

    -- ========================================================================
    -- CATEGORY: SCIENCE
    -- ========================================================================
    (
        'Nature News',
        'https://www.nature.com/news',
        'https://www.nature.com/nature.rss',
        'rss',
        'science',
        'academic',
        true,
        180
    ),
    (
        'Science Magazine (AAAS)',
        'https://www.science.org/news',
        'https://www.science.org/rss/news_current.xml',
        'rss',
        'science',
        'academic',
        true,
        180
    ),
    (
        'Quanta Magazine',
        'https://www.quantamagazine.org/',
        'https://api.quantamagazine.org/feed/',
        'rss',
        'science',
        'high',
        true,
        240
    ),
    (
        'Phys.org News',
        'https://phys.org/',
        'https://phys.org/rss-feed/',
        'rss',
        'science',
        'high',
        true,
        120
    ),
    (
        'NASA News',
        'https://www.nasa.gov/news/',
        'https://www.nasa.gov/rss/dyn/breaking_news.rss',
        'rss',
        'science',
        'official',
        true,
        180
    ),

    -- ========================================================================
    -- CATEGORY: INNOVATION
    -- ========================================================================
    (
        'MIT Technology Review',
        'https://www.technologyreview.com/',
        'https://www.technologyreview.com/feed/',
        'rss',
        'innovation',
        'primary',
        true,
        120
    ),
    (
        'IEEE Spectrum',
        'https://spectrum.ieee.org/',
        'https://spectrum.ieee.org/feeds/feed.rss',
        'rss',
        'innovation',
        'high',
        true,
        180
    ),
    (
        'World Economic Forum Agenda',
        'https://www.weforum.org/agenda/',
        'https://www.weforum.org/agenda/rss/',
        'rss',
        'innovation',
        'official',
        true,
        360
    ),
    (
        'Singularity Hub',
        'https://singularityhub.com/',
        'https://singularityhub.com/feed/',
        'rss',
        'innovation',
        'high',
        true,
        240
    ),
    (
        'New Scientist - Technology',
        'https://www.newscientist.com/subject/technology/',
        'https://www.newscientist.com/subject/technology/feed/',
        'rss',
        'innovation',
        'high',
        true,
        180
    )
ON CONFLICT (feed_url) DO UPDATE SET
    name = EXCLUDED.name,
    url = EXCLUDED.url,
    category = EXCLUDED.category,
    credibility_level = EXCLUDED.credibility_level,
    active = EXCLUDED.active,
    fetch_interval_minutes = EXCLUDED.fetch_interval_minutes;
