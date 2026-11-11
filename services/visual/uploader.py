import io
import logging
from typing import Optional
from PIL import Image
from supabase import create_client, Client
import sys
from pathlib import Path

# Load settings from services/ingestion/src/config.py
ROOT_DIR = Path(__file__).resolve().parent.parent.parent
sys.path.insert(0, str(ROOT_DIR / "services" / "ingestion"))
from src.config import settings

logger = logging.getLogger(__name__)

def upload_card_to_storage(
    image: Image.Image,
    slug: str,
    bucket_name: str = "media-assets"
) -> Optional[str]:
    """
    Uploads a PIL image directly to the Supabase Storage bucket and returns
    its public HTTPS URL.
    """
    if not settings.SUPABASE_URL or not settings.SUPABASE_KEY:
        logger.error("Supabase credentials not configured in environment.")
        return None

    client: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
    file_path = f"cards/{slug}.png"

    # Save PIL image to in-memory bytes buffer
    buffer = io.BytesIO()
    image.save(buffer, format="PNG", optimize=True)
    image_bytes = buffer.getvalue()

    try:
        # Check if file already exists in bucket, delete/overwrite if necessary
        try:
            client.storage.from_(bucket_name).remove([file_path])
        except Exception:
            pass

        # Upload image to bucket
        response = client.storage.from_(bucket_name).upload(
            path=file_path,
            file=image_bytes,
            file_options={"content-type": "image/png", "upsert": "true"}
        )
        
        # Retrieve public URL
        public_url = client.storage.from_(bucket_name).get_public_url(file_path)
        logger.info(f"Successfully uploaded card to Supabase Storage: {public_url}")
        return public_url

    except Exception as e:
        logger.error(f"Failed to upload image to Supabase Storage bucket '{bucket_name}': {e}", exc_info=True)
        return None
