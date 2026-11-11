import os
import re
import io
import requests
from typing import Optional, Tuple
from PIL import Image

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
}

# Fallback curated topic photos if source website has no og:image
TOPIC_FALLBACKS = {
    'artificial_intelligence': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop',
    'technology': 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop',
    'science': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1600&auto=format&fit=crop',
    'innovation': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1600&auto=format&fit=crop',
}

def extract_og_image_url(article_url: str) -> Optional[str]:
    """
    Extracts high-resolution OpenGraph or Twitter cover image from article webpage
    """
    if not article_url:
        return None
    try:
        resp = requests.get(article_url, headers=HEADERS, timeout=12)
        if resp.status_code == 200:
            html = resp.text
            # Look for og:image
            og_match = re.search(r'<meta[^>]+property=[\'"]og:image[\'"][^>]+content=[\'"]([^\'"]+)[\'"]', html, re.IGNORECASE)
            if not og_match:
                og_match = re.search(r'<meta[^>]+content=[\'"]([^\'"]+)[\'"][^>]+property=[\'"]og:image[\'"]', html, re.IGNORECASE)
            
            # Look for twitter:image
            if not og_match:
                og_match = re.search(r'<meta[^>]+name=[\'"]twitter:image[\'"][^>]+content=[\'"]([^\'"]+)[\'"]', html, re.IGNORECASE)

            if og_match:
                img_url = og_match.group(1).strip()
                # Resolve relative url if any
                if img_url.startswith('/'):
                    from urllib.parse import urlparse
                    parsed = urlparse(article_url)
                    img_url = f"{parsed.scheme}://{parsed.netloc}{img_url}"
                return img_url
    except Exception as e:
        print(f"[MediaFetcher] Warning extracting og:image from {article_url}: {e}")
    return None

def fetch_and_save_article_photo(
    article_url: Optional[str],
    category: str = 'technology',
    output_dir: str = 'services/visual/output'
) -> Tuple[Optional[str], Optional[Image.Image]]:
    """
    Downloads authentic news photo from article source or curated editorial fallback.
    Returns (image_source_url, PIL Image object).
    """
    os.makedirs(output_dir, exist_ok=True)
    target_img_url = None

    if article_url:
        target_img_url = extract_og_image_url(article_url)

    if not target_img_url:
        target_img_url = TOPIC_FALLBACKS.get(category.lower(), TOPIC_FALLBACKS['technology'])

    try:
        resp = requests.get(target_img_url, headers=HEADERS, timeout=15)
        if resp.status_code == 200:
            img = Image.open(io.BytesIO(resp.content))
            # Verify and convert to RGB
            img = img.convert('RGB')
            local_save_path = os.path.join(output_dir, 'current_article_photo.jpg')
            img.save(local_save_path, 'JPEG', quality=90)
            return target_img_url, img
    except Exception as e:
        print(f"[MediaFetcher] Error downloading image from {target_img_url}: {e}")

    return None, None
