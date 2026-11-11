import os
from pathlib import Path
from typing import Optional, Union, List
from PIL import Image, ImageDraw, ImageFont, ImageOps

# ==============================================================================
# KEIGO ARCTIC INTELLIGENCE PALETTE (HUMAN EDITORIAL DESIGN)
# ==============================================================================
COLOR_SNOW_WHITE   = (248, 250, 252) # #F8FAFC (Base Canvas)
COLOR_ICE_BG       = (240, 249, 255) # #F0F9FF (Very light ice)
COLOR_FACET_1      = (224, 242, 254) # #E0F2FE (Soft Blue facet)
COLOR_FACET_2      = (186, 230, 253) # #BAE6FD (Ice Cyan facet)
COLOR_DEEP_NAVY    = (23, 37, 84)    # #172554 (Deep Navy Headline & Text)
COLOR_ARCTIC_BLUE  = (37, 99, 235)   # #2563EB (Brand Blue)
COLOR_ROYAL_BLUE   = (30, 64, 175)   # #1E40AF (Primary Headline)
COLOR_COOL_GRAY    = (100, 116, 139) # #64748B (Secondary / Meta Text)
COLOR_MUTED_LINE   = (203, 213, 225) # #CBD5E1

FONTS_DIR = Path(__file__).resolve().parent / "fonts"

def get_font(font_name: str, size: int) -> ImageFont.ImageFont:
    font_path = FONTS_DIR / font_name
    if font_path.exists():
        try:
            return ImageFont.truetype(str(font_path), size)
        except Exception:
            pass
    # Windows system fallbacks
    fallbacks = {
        "SpaceGrotesk-Bold.ttf": ["C:\\Windows\\Fonts\\segoeuib.ttf", "C:\\Windows\\Fonts\\arialbd.ttf"],
        "Inter-Regular.ttf": ["C:\\Windows\\Fonts\\segoeui.ttf", "C:\\Windows\\Fonts\\arial.ttf"],
    }
    for candidate in fallbacks.get(font_name, []):
        if os.path.exists(candidate):
            try:
                return ImageFont.truetype(candidate, size)
            except Exception:
                continue
    return ImageFont.load_default()

def wrap_text(text: str, font: ImageFont.ImageFont, max_width: int, draw: ImageDraw.ImageDraw) -> List[str]:
    words = text.split()
    lines = []
    current_line = []

    for word in words:
        test_line = " ".join(current_line + [word])
        bbox = draw.textbbox((0, 0), test_line, font=font)
        line_w = bbox[2] - bbox[0]
        if line_w <= max_width:
            current_line.append(word)
        else:
            if current_line:
                lines.append(" ".join(current_line))
                current_line = [word]
            else:
                lines.append(word)
                current_line = []
    if current_line:
        lines.append(" ".join(current_line))
    return lines

def round_corners(image: Image.Image, radius: int) -> Image.Image:
    mask = Image.new("L", image.size, 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle([(0, 0), image.size], radius=radius, fill=255)
    result = image.copy()
    result.putalpha(mask)
    return result

def create_editorial_card(
    title: str,
    category: str,
    subtitle: str,
    date_str: str = "11 NOV 2026",
    photo_input: Optional[Union[str, Image.Image]] = None,
    output_path: Optional[str] = None
) -> Image.Image:
    """
    Creates a human-designed, clean editorial cover matching the ITS KSTI style:
    - Snow White background with subtle geometric ice facets
    - Top Left: Just 'KEIGO' (clean, bold, human, no 'global media')
    - Top Right: Date / Edition stamp
    - Category kicker as clean plain typography (NO AI rounded pill box)
    - Commanding, massive headline in Arctic Blue / Deep Navy (Space Grotesk)
    - Optional photo embedded cleanly with human editorial proportions
    - Subtitle / context placed with generous whitespace (NO AI bullet card containers)
    """
    width, height = 1080, 1350
    canvas = Image.new("RGB", (width, height), COLOR_SNOW_WHITE)
    draw = ImageDraw.Draw(canvas)

    # 1. Subtle Human Geometric Background Facets (like the reference ITS poster)
    # Top-right angular diagonal overlay
    facet_overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    facet_draw = ImageDraw.Draw(facet_overlay)

    # Large gentle triangular/polygonal shapes in ice blue
    facet_draw.polygon([(650, 0), (width, 0), (width, 420)], fill=(224, 242, 254, 180)) # Light facet
    facet_draw.polygon([(780, 0), (width, 0), (width, 320)], fill=(186, 230, 253, 140)) # Deeper cyan facet
    
    # Bottom-left subtle angular shape
    facet_draw.polygon([(0, 1100), (450, height), (0, height)], fill=(240, 249, 255, 220))
    facet_draw.polygon([(0, 1220), (280, height), (0, height)], fill=(224, 242, 254, 150))

    canvas.paste(facet_overlay, (0, 0), facet_overlay)
    draw = ImageDraw.Draw(canvas)

    margin_x = 88
    content_w = width - (margin_x * 2)

    # Fonts
    font_logo = get_font("SpaceGrotesk-Bold.ttf", 44)
    font_meta = get_font("Inter-Regular.ttf", 20)
    font_kicker = get_font("SpaceGrotesk-Bold.ttf", 26)
    font_headline = get_font("SpaceGrotesk-Bold.ttf", 64)
    font_subtitle = get_font("Inter-Regular.ttf", 26)

    # --------------------------------------------------------------------------
    # 2. TOP HEADER (Simple, Clean, Human)
    # --------------------------------------------------------------------------
    header_y = 88

    # Logo: Just "KEIGO" (Pure, confident, no extra labels)
    draw.text((margin_x, header_y), "KEIGO", fill=COLOR_DEEP_NAVY, font=font_logo)

    # Top Right: Clean date / edition mark (like sponsor logos in the reference)
    date_bbox = draw.textbbox((0, 0), date_str, font=font_meta)
    date_w = date_bbox[2] - date_bbox[0]
    draw.text((width - margin_x - date_w, header_y + 12), date_str, fill=COLOR_COOL_GRAY, font=font_meta)

    # --------------------------------------------------------------------------
    # 3. PHOTO SECTION (If photo provided, clean editorial frame)
    # --------------------------------------------------------------------------
    photo_img = None
    if photo_input:
        if isinstance(photo_input, str) and os.path.exists(photo_input):
            photo_img = Image.open(photo_input)
        elif isinstance(photo_input, Image.Image):
            photo_img = photo_input

    if photo_img:
        photo_y = 190
        photo_h = 440
        photo_w = content_w

        # Fit photo maintaining aspect ratio
        fitted = ImageOps.fit(photo_img.convert("RGBA"), (photo_w, photo_h), method=Image.Resampling.LANCZOS)
        rounded = round_corners(fitted, radius=16)
        canvas.paste(rounded, (margin_x, photo_y), rounded)

        # Subtle crisp photo border
        draw.rounded_rectangle([(margin_x, photo_y), (margin_x + photo_w, photo_y + photo_h)], radius=16, outline=COLOR_MUTED_LINE, width=1)
        
        main_content_y = photo_y + photo_h + 50
    else:
        main_content_y = 380

    # --------------------------------------------------------------------------
    # 4. CATEGORY KICKER (Clean Plain Typography, NOT an AI pill!)
    # --------------------------------------------------------------------------
    category_text = category.replace("_", " ").upper()
    draw.text((margin_x, main_content_y), category_text, fill=COLOR_ARCTIC_BLUE, font=font_kicker)

    # --------------------------------------------------------------------------
    # 5. COMMANDING HEADLINE (Large Space Grotesk, Royal/Arctic Blue)
    # --------------------------------------------------------------------------
    headline_y = main_content_y + 46
    
    # Dynamic sizing for headline
    if len(title) > 90:
        font_headline = get_font("SpaceGrotesk-Bold.ttf", 52)
        line_spacing = 64
    else:
        font_headline = get_font("SpaceGrotesk-Bold.ttf", 60)
        line_spacing = 74

    wrapped_title = wrap_text(title, font_headline, content_w, draw)
    curr_y = headline_y
    for line in wrapped_title[:4]:
        draw.text((margin_x, curr_y), line, fill=COLOR_ROYAL_BLUE, font=font_headline)
        curr_y += line_spacing

    # --------------------------------------------------------------------------
    # 6. SUBTITLE / EDITORIAL CONTEXT (Lower-Right or Bottom Left - Generous Whitespace!)
    # --------------------------------------------------------------------------
    # Like in the ITS poster: "GRHA Sepuluh Nopember. Institut Teknologi Sepuluh Nopember."
    # Pure clean text with generous breathing room. NO boxed takeaways!
    desc_start_y = max(curr_y + 40, height - 260)
    desc_w = int(content_w * 0.75) # 75% width for asymmetric human editorial feel
    
    wrapped_sub = wrap_text(subtitle, font_subtitle, desc_w, draw)
    sub_y = desc_start_y
    for s_line in wrapped_sub[:3]:
        draw.text((margin_x, sub_y), s_line, fill=COLOR_DEEP_NAVY, font=font_subtitle)
        sub_y += 36

    # --------------------------------------------------------------------------
    # 7. MINIMAL BOTTOM WATERMARK
    # --------------------------------------------------------------------------
    footer_y = height - 70
    draw.text((margin_x, footer_y), "keigo.media", fill=COLOR_COOL_GRAY, font=font_meta)

    if output_path:
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        canvas.save(output_path, "PNG", quality=95)

    return canvas
