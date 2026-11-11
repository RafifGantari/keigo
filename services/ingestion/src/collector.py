import logging
from typing import List, Optional
import requests
import feedparser

from .config import settings
from .models import SourceModel, RawArticleModel
from .normalizer import (
    normalize_url,
    clean_html,
    compute_content_hash,
    normalize_published_date,
)

logger = logging.getLogger(__name__)

def fetch_feed(source: SourceModel) -> List[RawArticleModel]:
    """
    Fetches and parses an RSS/Atom feed from a given source.
    Returns a list of parsed RawArticleModel instances.
    """
    articles: List[RawArticleModel] = []
    headers = {"User-Agent": settings.USER_AGENT}

    try:
        # Download raw feed content with timeout & user-agent headers
        response = requests.get(
            source.feed_url,
            headers=headers,
            timeout=settings.REQUEST_TIMEOUT
        )
        response.raise_for_status()
        raw_xml = response.content
    except Exception as e:
        logger.warning(f"Failed to fetch HTTP feed for {source.name} ({source.feed_url}): {e}")
        # Fallback directly to feedparser url fetching
        raw_xml = source.feed_url

    parsed_feed = feedparser.parse(raw_xml)
    
    if parsed_feed.bozo and not parsed_feed.entries:
        logger.error(f"Malformed or empty feed for {source.name}: {parsed_feed.bozo_exception}")
        return []

    entries = parsed_feed.entries[:settings.MAX_ARTICLES_PER_FEED]
    
    for entry in entries:
        raw_url = getattr(entry, "link", "")
        if not raw_url:
            continue
            
        title = clean_html(getattr(entry, "title", "Untitled"))
        if not title:
            continue

        normalized_url = normalize_url(raw_url)
        content_hash = compute_content_hash(normalized_url, title)

        # Extract published date
        pub_date = (
            getattr(entry, "published_parsed", None)
            or getattr(entry, "updated_parsed", None)
            or getattr(entry, "published", None)
            or getattr(entry, "updated", None)
        )
        published_at = normalize_published_date(pub_date)

        # Extract author
        author = getattr(entry, "author", None)

        # Extract description / summary / content
        description_raw = getattr(entry, "summary", "") or getattr(entry, "description", "")
        description = clean_html(description_raw)

        # Extract full content if available
        raw_content = ""
        if hasattr(entry, "content") and entry.content:
            raw_content = clean_html(entry.content[0].get("value", ""))
        elif not raw_content:
            raw_content = description

        article = RawArticleModel(
            source_id=source.id,
            original_url=raw_url,
            normalized_url=normalized_url,
            title=title,
            author=author,
            published_at=published_at,
            description=description[:1500] if description else None,
            raw_content=raw_content[:8000] if raw_content else None,
            content_hash=content_hash,
            status="new"
        )
        articles.append(article)

    logger.info(f"Successfully collected {len(articles)} items from {source.name}")
    return articles
