import logging
from datetime import datetime, timezone
from typing import List, Set, Optional
from supabase import create_client, Client
from .config import settings
from .models import SourceModel, RawArticleModel

logger = logging.getLogger(__name__)

class StorageClient:
    def __init__(self):
        if not settings.SUPABASE_URL or not settings.SUPABASE_KEY:
            raise ValueError(
                "Missing Supabase configuration. Ensure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set."
            )
        self.client: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

    def get_active_sources(self) -> List[SourceModel]:
        """Fetches all active sources from the sources table."""
        response = self.client.table("sources").select("*").eq("active", True).execute()
        sources_data = response.data or []
        return [SourceModel(**item) for item in sources_data]

    def filter_existing_hashes(self, content_hashes: List[str]) -> Set[str]:
        """Queries raw_articles table and returns a set of hashes that already exist."""
        if not content_hashes:
            return set()

        # Batch check hashes (chunks of 100 to avoid URL query length limits)
        existing: Set[str] = set()
        chunk_size = 100
        for i in range(0, len(content_hashes), chunk_size):
            chunk = content_hashes[i:i + chunk_size]
            response = (
                self.client.table("raw_articles")
                .select("content_hash")
                .in_("content_hash", chunk)
                .execute()
            )
            for row in response.data or []:
                existing.add(row["content_hash"])
        return existing

    def insert_raw_articles(self, articles: List[RawArticleModel]) -> int:
        """Batch inserts new unique raw articles into raw_articles table."""
        if not articles:
            return 0

        payload = [
            {
                "source_id": a.source_id,
                "original_url": a.original_url,
                "normalized_url": a.normalized_url,
                "title": a.title,
                "author": a.author,
                "published_at": a.published_at.isoformat() if a.published_at else None,
                "description": a.description,
                "raw_content": a.raw_content,
                "content_hash": a.content_hash,
                "status": a.status,
            }
            for a in articles
        ]

        # Supabase allows upsert or batch insert
        response = self.client.table("raw_articles").insert(payload).execute()
        return len(response.data) if response.data else len(payload)

    def update_source_last_fetched(self, source_id: str):
        """Updates last_fetched_at timestamp for a source."""
        self.client.table("sources").update({
            "last_fetched_at": datetime.now(timezone.utc).isoformat()
        }).eq("id", source_id).execute()

    def record_automation_log(
        self,
        workflow_name: str,
        status: str,
        details: dict,
        error: Optional[str] = None
    ):
        """Records an execution log entry to the automation_logs table."""
        try:
            self.client.table("automation_logs").insert({
                "workflow_name": workflow_name,
                "execution_status": status,
                "execution_details": details,
                "error_message": error,
                "started_at": datetime.now(timezone.utc).isoformat(),
                "completed_at": datetime.now(timezone.utc).isoformat() if status != "started" else None,
            }).execute()
        except Exception as e:
            logger.warning(f"Could not write to automation_logs table: {e}")
