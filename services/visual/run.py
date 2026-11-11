import argparse
import logging
import sys
from pathlib import Path

# Setup pathing
CURRENT_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(CURRENT_DIR))

from generator import create_instagram_card
from uploader import upload_card_to_storage

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("keigo.visual")

def run_test():
    title = "Google DeepMind Unveils Next-Gen Neural Architecture for Autonomous Scientific Discovery"
    category = "artificial_intelligence"
    bullets = [
        "Recursive verification loop achieves a 42% accuracy boost in complex multi-step reasoning benchmarks.",
        "Peer-reviewed methodology published in Nature with open-source verification code available.",
        "Engineered to accelerate quantum materials simulation and molecular synthesis pipelines."
    ]
    slug = "deepmind-neural-architecture-discovery"
    output_local = str(CURRENT_DIR / "output" / f"{slug}.png")

    logger.info("Generating 1080x1350 Instagram branded card...")
    img = create_instagram_card(
        title=title,
        category=category,
        bullets=bullets,
        reading_time_min=4,
        output_path=output_local
    )
    logger.info(f"Local card saved to: {output_local}")

    logger.info("Uploading card to Supabase Storage bucket 'media-assets'...")
    public_url = upload_card_to_storage(img, slug=slug)
    
    if public_url:
        logger.info("=" * 60)
        logger.info("CARD GENERATION & UPLOAD SUCCESSFUL!")
        logger.info(f"Public CDN URL: {public_url}")
        logger.info("=" * 60)
    else:
        logger.warning("Upload failed or Supabase Storage not accessible with current credentials.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="KEIGO Instagram Visual Card Generator")
    parser.add_argument("--test", action="store_true", default=True, help="Run sample generator & upload test")
    args = parser.parse_args()

    run_test()
