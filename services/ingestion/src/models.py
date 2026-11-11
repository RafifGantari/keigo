from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field

class SourceModel(BaseModel):
    id: str
    name: str
    url: str
    feed_url: str
    source_type: str = "rss"
    category: str
    credibility_level: str = "high"
    active: bool = True
    fetch_interval_minutes: int = 60
    last_fetched_at: Optional[datetime] = None

class RawArticleModel(BaseModel):
    source_id: str
    original_url: str
    normalized_url: str
    title: str
    author: Optional[str] = None
    published_at: Optional[datetime] = None
    description: Optional[str] = None
    raw_content: Optional[str] = None
    content_hash: str
    status: str = "new"

class IngestionReport(BaseModel):
    source_name: str
    feed_url: str
    fetched_count: int = 0
    new_count: int = 0
    duplicate_count: int = 0
    error: Optional[str] = None
