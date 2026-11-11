import argparse
import logging
import sys
from typing import List

from .config import settings
from .models import IngestionReport, RawArticleModel
from .collector import fetch_feed
from .storage import StorageClient

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger("keigo.ingestion")

def run_ingestion(category_filter: str = None, dry_run: bool = False) -> List[IngestionReport]:
    """
    Main ingestion execution workflow:
    1. Fetch active sources from Supabase
    2. Collect and normalize feed items
    3. Filter out existing hashes (deterministic deduplication)
    4. Store new items in raw_articles
    5. Log execution metrics
    """
    logger.info("=" * 60)
    logger.info("KEIGO INGESTION SERVICE STARTING")
    logger.info(f"Target Database: {settings.SUPABASE_URL}")
    logger.info(f"Dry Run Mode: {dry_run}")
    if category_filter:
        logger.info(f"Category Filter: {category_filter}")
    logger.info("=" * 60)

    try:
        storage = StorageClient()
    except Exception as e:
        logger.critical(f"Database connection failed: {e}")
        logger.critical("Please ensure SUPABASE_SERVICE_ROLE_KEY is provided in your .env file.")
        return []

    try:
        sources = storage.get_active_sources()
    except Exception as e:
        logger.error(f"Failed to query active sources: {e}")
        return []

    if category_filter:
        sources = [s for s in sources if s.category.lower() == category_filter.lower()]

    logger.info(f"Found {len(sources)} active source feeds to process.")

    reports: List[IngestionReport] = []
    total_fetched = 0
    total_new = 0
    total_duplicates = 0

    for source in sources:
        report = IngestionReport(source_name=source.name, feed_url=source.feed_url)
        try:
            logger.info(f"Processing feed [{source.category}]: {source.name}")
            articles: List[RawArticleModel] = fetch_feed(source)
            report.fetched_count = len(articles)
            total_fetched += len(articles)

            if not articles:
                reports.append(report)
                continue

            # Check existing hashes in Supabase
            hashes = [a.content_hash for a in articles]
            existing_hashes = storage.filter_existing_hashes(hashes)
            
            # Filter only new articles
            new_articles = [a for a in articles if a.content_hash not in existing_hashes]
            report.duplicate_count = len(articles) - len(new_articles)
            report.new_count = len(new_articles)
            
            total_duplicates += report.duplicate_count
            total_new += report.new_count

            logger.info(
                f"-> {source.name}: {len(articles)} fetched, {report.new_count} new, {report.duplicate_count} skipped duplicates"
            )

            if new_articles and not dry_run:
                storage.insert_raw_articles(new_articles)
                storage.update_source_last_fetched(source.id)
                logger.info(f"-> Successfully inserted {len(new_articles)} items to raw_articles table.")

        except Exception as e:
            logger.error(f"Error processing {source.name}: {e}", exc_info=True)
            report.error = str(e)

        reports.append(report)

    summary = {
        "sources_processed": len(sources),
        "total_fetched": total_fetched,
        "total_new_inserted": total_new,
        "total_duplicates_skipped": total_duplicates,
        "dry_run": dry_run
    }

    logger.info("=" * 60)
    logger.info(f"INGESTION COMPLETE: {total_new} new articles inserted, {total_duplicates} duplicates skipped.")
    logger.info("=" * 60)

    if not dry_run:
        storage.record_automation_log(
            workflow_name="python_source_ingestion",
            status="completed",
            details=summary
        )

    return reports

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="KEIGO Feed Ingestion & Deduplication Service")
    parser.add_argument("--category", type=str, default=None, help="Filter sources by category")
    parser.add_argument("--dry-run", action="store_true", help="Fetch feeds and test deduplication without writing to database")
    args = parser.parse_args()

    run_ingestion(category_filter=args.category, dry_run=args.dry_run)
