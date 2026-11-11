import logging
import sys
from pathlib import Path
from datetime import datetime, timezone
from typing import Optional, Dict, Any

# Path setup
ROOT_DIR = Path(__file__).resolve().parent.parent.parent
sys.path.insert(0, str(ROOT_DIR / "services" / "ingestion"))
sys.path.insert(0, str(ROOT_DIR / "services" / "visual"))

from src.config import settings
from supabase import create_client, Client
from client import AIGatewayClient
from generator import create_editorial_card
from uploader import upload_card_to_storage

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")
logger = logging.getLogger("keigo.pipeline")

class ContentProductionPipeline:
    def __init__(self):
        self.supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
        self.ai = AIGatewayClient()
        self.prompts_dir = ROOT_DIR / "config" / "editorial"

    def _read_prompt(self, filename: str) -> str:
        with open(self.prompts_dir / filename, "r", encoding="utf-8") as f:
            return f.read()

    def process_next_story(self, target_category: Optional[str] = None) -> Optional[Dict[str, Any]]:
        """
        Picks the highest priority unprocessed raw article and runs the full editorial lifecycle:
        1. Fetch Candidate from raw_articles
        2. Editorial Synthesis & Multi-Channel Content Generation
        3. Fact-checking & Risk Gate Audit
        4. Arctic Intelligence Visual Card Generation & CDN Upload
        5. Publishing to Supabase Database (or hold for human review)
        """
        logger.info("=" * 60)
        logger.info("STARTING KEIGO EDITORIAL PRODUCTION PIPELINE")
        logger.info("=" * 60)

        # 1. Fetch one new raw article
        query = self.supabase.table("raw_articles").select("*, sources(name, category)").eq("status", "new").order("collected_at", desc=True)
        if target_category:
            query = query.eq("sources.category", target_category)
        
        candidates = query.limit(1).execute().data
        if not candidates:
            logger.info("No unprocessed raw articles found in queue.")
            return None

        raw = candidates[0]
        source_name = raw.get("sources", {}).get("name", "Primary Source")
        category = raw.get("sources", {}).get("category", "technology")
        logger.info(f"Selected Candidate: [{category}] '{raw['title']}' from {source_name}")

        # 2. Generate Full Multi-Channel Article
        gen_system_prompt = self._read_prompt("02_article_generation.md")
        user_input = (
            f"SOURCE NAME: {source_name}\n"
            f"SOURCE URL: {raw['original_url']}\n"
            f"CATEGORY: {category}\n"
            f"RAW TITLE: {raw['title']}\n"
            f"RAW DESCRIPTION / CONTENT:\n{raw.get('raw_content') or raw.get('description') or raw['title']}\n"
        )

        logger.info("Generating multi-channel editorial content...")
        article_data = self.ai.chat_completion(
            system_prompt=gen_system_prompt,
            user_prompt=user_input,
            temperature=0.3,
            operation_name="article_generation"
        )

        # 3. Quality Control & Risk Gate Evaluation
        qc_system_prompt = self._read_prompt("03_quality_control_risk_gate.md")
        qc_input = (
            f"RAW SOURCE MATERIAL:\n{raw.get('raw_content') or raw['title']}\n\n"
            f"GENERATED ARTICLE TO AUDIT:\n"
            f"Title: {article_data.get('title')}\n"
            f"Body:\n{article_data.get('body_markdown')}\n"
        )

        logger.info("Running Fact-Checking and Risk Gate Audit...")
        qc_result = self.ai.chat_completion(
            system_prompt=qc_system_prompt,
            user_prompt=qc_input,
            temperature=0.1,
            operation_name="quality_control"
        )

        is_auto_publish = qc_result.get("publish_approved", False) and qc_result.get("risk_level") == "low"
        final_status = "published" if is_auto_publish else "pending_review"
        logger.info(f"Risk Level: {qc_result.get('risk_level')}. Review Status: {qc_result.get('review_status')}. Final Article Status: {final_status}")

        # 4. Fetch Authentic News Photo & Generate Arctic Intelligence Visual Card
        slug = article_data.get("slug", "keigo-story-" + str(int(datetime.now().timestamp())))
        local_card_path = str(ROOT_DIR / "services" / "visual" / "output" / f"{slug}.png")

        # Fetch authentic photo from source news article (NOT abstract purple gradient!)
        from services.visual.media_fetcher import fetch_and_save_article_photo
        logger.info(f"Fetching authentic news photo from {raw.get('original_url')}...")
        news_image_url, news_photo_img = fetch_and_save_article_photo(
            article_url=raw.get("original_url"),
            category=category,
            output_dir=str(ROOT_DIR / "services" / "visual" / "output")
        )

        logger.info("Generating branded Arctic visual card with authentic news photo...")
        card_img = create_editorial_card(
            title=article_data.get("title", raw["title"]).upper(),
            category=category,
            subtitle=article_data.get("visual_subtitle", article_data.get("excerpt", "")),
            date_str=datetime.now().strftime("%d %b %Y").upper(),
            photo_input=news_photo_img,
            output_path=local_card_path
        )

        # Upload Card to Supabase Storage CDN
        logger.info("Uploading visual card to Supabase Storage CDN...")
        ig_card_url = upload_card_to_storage(card_img, slug=slug)

        # 5. Insert into Supabase 'articles' table
        article_record = {
            "slug": slug,
            "title": article_data.get("title", raw["title"]),
            "excerpt": article_data.get("excerpt", ""),
            "category": category,
            "body_markdown": article_data.get("body_markdown", ""),
            "seo_description": article_data.get("seo_description", ""),
            "status": final_status,
            "risk_level": qc_result.get("risk_level", "low"),
            "key_facts": article_data.get("key_facts", []),
            "reading_time_minutes": article_data.get("reading_time_minutes", 3),
            "cover_image_url": ig_card_url,
            "instagram_card_url": ig_card_url,
            "image_url": news_image_url,
            "image_caption": f"Primary visual reporting on {article_data.get('title', raw['title'])}.",
            "social_caption": article_data.get("social_caption", ""),
            "visual_bullets": article_data.get("key_facts", []),
            "published_at": datetime.now(timezone.utc).isoformat() if final_status == "published" else None
        }

        inserted_article = self.supabase.table("articles").upsert(article_record, on_conflict="slug").execute().data[0]
        article_id = inserted_article["id"]

        # 6. Insert Source Reference
        self.supabase.table("article_sources").insert({
            "article_id": article_id,
            "source_id": raw.get("source_id"),
            "source_url": raw.get("original_url"),
            "source_title": raw.get("title"),
            "relationship_type": "primary_reference"
        }).execute()

        # 7. Insert Editorial Review Audit Log
        self.supabase.table("editorial_reviews").insert({
            "article_id": article_id,
            "factual_score": qc_result.get("factual_score", 9.0),
            "consistency_score": qc_result.get("consistency_score", 9.0),
            "unsupported_claims": qc_result.get("unsupported_claims", []),
            "risk_level": qc_result.get("risk_level", "low"),
            "review_status": qc_result.get("review_status", "passed"),
            "review_reason": qc_result.get("review_reason", "Verified via automated QC"),
            "automated": True
        }).execute()

        # 8. Mark raw article as processed
        self.supabase.table("raw_articles").update({"status": "processed"}).eq("id", raw["id"]).execute()

        logger.info("=" * 60)
        logger.info(f"EDITORIAL PIPELINE COMPLETED SUCCESSFULLY!")
        logger.info(f"Article ID: {article_id}")
        logger.info(f"Article Slug: {slug}")
        logger.info(f"Status: {final_status}")
        logger.info(f"Cover CDN: {cover_image_url}")
        logger.info("=" * 60)

        return inserted_article

if __name__ == "__main__":
    pipeline = ContentProductionPipeline()
    pipeline.process_next_story()
