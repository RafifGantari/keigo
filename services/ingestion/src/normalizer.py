import hashlib
import re
from datetime import datetime, timezone
from urllib.parse import urlparse, urlunparse, parse_qsl, urlencode
from typing import Optional
from bs4 import BeautifulSoup
from dateutil import parser as date_parser

TRACKING_PARAMS = {
    "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
    "fbclid", "gclid", "ref", "source", "ref_src", "mc_cid", "mc_eid"
}

def normalize_url(raw_url: str) -> str:
    """Removes tracking query parameters, hashes, and normalizes URL path."""
    if not raw_url:
        return ""
    
    parsed = urlparse(raw_url.strip())
    # Filter out tracking query params
    clean_query = [
        (k, v) for k, v in parse_qsl(parsed.query, keep_blank_values=False)
        if k.lower() not in TRACKING_PARAMS
    ]
    
    # Sort query params for deterministic canonical representation
    clean_query.sort()
    normalized_query = urlencode(clean_query)
    
    # Strip trailing slash from path (unless it's just root '/')
    path = parsed.path
    if len(path) > 1 and path.endswith("/"):
        path = path[:-1]
        
    normalized = urlunparse((
        parsed.scheme.lower() or "https",
        parsed.netloc.lower(),
        path,
        "",  # params
        normalized_query,
        ""   # fragment
    ))
    return normalized

def clean_html(html_content: Optional[str]) -> str:
    """Strips HTML tags, scripts, and whitespace to extract clean readable text."""
    if not html_content:
        return ""
    
    soup = BeautifulSoup(html_content, "html.parser")
    
    # Remove script, style, nav, footer elements
    for element in soup(["script", "style", "nav", "footer", "aside", "noscript"]):
        element.extract()
        
    text = soup.get_text(separator=" ", strip=True)
    # Collapse multiple whitespaces
    cleaned = re.sub(r"\s+", " ", text).strip()
    return cleaned

def compute_content_hash(normalized_url: str, title: str) -> str:
    """Generates a deterministic SHA-256 hash from normalized URL and title."""
    canonical_input = f"{normalized_url.strip().lower()}::{title.strip().lower()}"
    return hashlib.sha256(canonical_input.encode("utf-8")).hexdigest()

def normalize_published_date(date_obj) -> Optional[datetime]:
    """Parses various date representations into timezone-aware UTC datetime."""
    if not date_obj:
        return None
    
    if isinstance(date_obj, datetime):
        if date_obj.tzinfo is None:
            return date_obj.replace(tzinfo=timezone.utc)
        return date_obj.astimezone(timezone.utc)
        
    if isinstance(date_obj, (tuple, list)):
        try:
            import time
            timestamp = time.mktime(date_obj)
            return datetime.fromtimestamp(timestamp, tz=timezone.utc)
        except Exception:
            pass

    if isinstance(date_obj, str):
        try:
            dt = date_parser.parse(date_obj)
            if dt.tzinfo is None:
                return dt.replace(tzinfo=timezone.utc)
            return dt.astimezone(timezone.utc)
        except Exception:
            return None

    return None
