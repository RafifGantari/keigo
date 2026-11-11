import os
import io
import textwrap
from pathlib import Path
from typing import List, Optional, Union
from PIL import Image, ImageDraw, ImageFont, ImageOps

# ==============================================================================
# KEIGO ARCTIC INTELLIGENCE PALETTE
# ==============================================================================
COLOR_SNOW_WHITE   = (248, 250, 252) # #F8FAFC (Latar Belakang)
COLOR_DEEP_NAVY    = (23, 37, 84)    # #172554 (Teks Utama & Heading)
COLOR_ARCTIC_BLUE  = (37, 99, 235)   # #2563EB (Aksen Utama)
COLOR_ICE_CYAN     = (186, 230, 253) # #BAE6FD (Aksen Sekunder / Pill)
COLOR_COOL_GRAY    = (100, 116, 139) # #64748B (Teks Sekunder)
COLOR_CARD_WHITE   = (255, 255, 255) # Pure White untuk Container
COLOR_CARD_BORDER  = (226, 232, 240) # #E2E8F0 Garis Tepi Halus

FONTS_DIR = Path(__file__).resolve().parent / "fonts"

def get_font(font_name: str, size: int) -> ImageFont.ImageFont:
    """Loads Space Grotesk or Inter with system fallbacks."""
    font_path = FONTS_DIR / font_name
    if font_path.exists():
        try:
            return ImageFont.truetype(str(font_path), size)
        except Exception:
            pass

    # Windows System Fallbacks
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
    """Wraps text precisely according to pixel dimensions."""
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
    """Creates smooth rounded corners with anti-aliasing mask."""
    mask = Image.new("L", image.size, 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle([(0, 0), image.size], radius=radius, fill=255)
    result = image.copy()
    result.putalpha(mask)
    return result

def create_arctic_instagram_card(
    title: str,
    category: str,
    bullets: List[str],
    photo_input: Optional[Union[str, Image.Image]] = None,
    source_label: str = "PRIMARY SOURCE VERIFIED",
    output_path: Optional[str] = None
) -> Image.Image:
    """
    Generates a 1080x1350 (4:5) Instagram card using the Arctic Intelligence palette:
    - Snow White (#F8FAFC) background
    - Deep Navy (#172554) main text & headings
    - Arctic Blue (#2563EB) primary accent
    - Ice Cyan (#BAE6FD) secondary accent
    - Cool Gray (#64748B) secondary text
    - Space Grotesk (Headings) & Inter (Body)
    - Full photo embed support with rounded frame
    """
    width, height = 1080, 1350
    canvas = Image.new("RGB", (width, height), COLOR_SNOW_WHITE)
    draw = ImageDraw.Draw(canvas)

    margin_x = 64
    content_width = width - (margin_x * 2)

    # Fonts
    font_logo = get_font("SpaceGrotesk-Bold.ttf", 36)
    font_tagline = get_font("Inter-Regular.ttf", 16)
    font_pill = get_font("Inter-Regular.ttf", 18)
    font_source = get_font("Inter-Regular.ttf", 14)
    font_section = get_font("SpaceGrotesk-Bold.ttf", 16)
    font_bullet = get_font("Inter-Regular.ttf", 20)
    font_footer_brand = get_font("SpaceGrotesk-Bold.ttf", 20)
    font_footer_text = get_font("Inter-Regular.ttf", 16)

    # --------------------------------------------------------------------------
    # 1. TOP BRAND HEADER
    # --------------------------------------------------------------------------
    header_y = 60

    # Brand Logo (KEIGO)
    draw.text((margin_x, header_y), "KEIGO", fill=COLOR_DEEP_NAVY, font=font_logo)
    
    # Dot accent in Arctic Blue
    logo_bbox = draw.textbbox((margin_x, header_y), "KEIGO", font=font_logo)
    draw.ellipse((logo_bbox[2] + 4, header_y + 18, logo_bbox[2] + 12, header_y + 26), fill=COLOR_ARCTIC_BLUE)

    draw.text((logo_bbox[2] + 20, header_y + 12), "GLOBAL MEDIA", fill=COLOR_COOL_GRAY, font=font_tagline)

    # Category Pill (Ice Cyan Background + Arctic Blue Text)
    category_label = category.replace("_", " ").upper()
    pill_text_bbox = draw.textbbox((0, 0), category_label, font=font_pill)
    pill_w = (pill_text_bbox[2] - pill_text_bbox[0]) + 32
    pill_h = 38
    pill_x = width - margin_x - pill_w
    pill_y = header_y + 2

    # Draw rounded pill
    draw.rounded_rectangle(
        [(pill_x, pill_y), (pill_x + pill_w, pill_y + pill_h)],
        radius=19,
        fill=COLOR_ICE_CYAN,
        outline=COLOR_ARCTIC_BLUE,
        width=1
    )
    draw.text((pill_x + 16, pill_y + 8), category_label, fill=COLOR_ARCTIC_BLUE, font=font_pill)

    # --------------------------------------------------------------------------
    # 2. HERO PHOTO FRAME (Rounded Card)
    # --------------------------------------------------------------------------
    photo_y = 130
    photo_h = 500
    photo_w = content_width

    photo_img = None
    if photo_input:
        if isinstance(photo_input, str) and os.path.exists(photo_input):
            photo_img = Image.open(photo_input)
        elif isinstance(photo_input, Image.Image):
            photo_img = photo_input

    if photo_img:
        # Fit image to cover photo_w x photo_h maintaining aspect ratio
        fitted_photo = ImageOps.fit(photo_img.convert("RGBA"), (photo_w, photo_h), method=Image.Resampling.LANCZOS)
        rounded_photo = round_corners(fitted_photo, radius=20)
        
        # Paste rounded photo onto canvas
        canvas.paste(rounded_photo, (margin_x, photo_y), rounded_photo)
    else:
        # Subtle default geometric tech backdrop if no photo provided
        draw.rounded_rectangle(
            [(margin_x, photo_y), (margin_x + photo_w, photo_y + photo_h)],
            radius=20,
            fill=COLOR_CARD_WHITE,
            outline=COLOR_CARD_BORDER,
            width=2
        )
        draw.text((margin_x + 40, photo_y + 220), "KEIGO VISUAL ARCHIVE", fill=COLOR_COOL_GRAY, font=font_logo)

    # Photo border outline
    draw.rounded_rectangle(
        [(margin_x, photo_y), (margin_x + photo_w, photo_y + photo_h)],
        radius=20,
        outline=COLOR_CARD_BORDER,
        width=1
    )

    # Source Attribution Badge inside photo (Bottom-Right)
    badge_text = source_label.upper()
    badge_bbox = draw.textbbox((0, 0), badge_text, font=font_source)
    badge_w = (badge_bbox[2] - badge_bbox[0]) + 24
    badge_h = 28
    badge_x = (margin_x + photo_w) - badge_w - 16
    badge_y = (photo_y + photo_h) - badge_h - 16

    badge_overlay = Image.new("RGBA", (badge_w, badge_h), (23, 37, 84, 210)) # Deep Navy with alpha
    badge_draw = ImageDraw.Draw(badge_overlay)
    badge_draw.text((12, 6), badge_text, fill=COLOR_SNOW_WHITE, font=font_source)
    canvas.paste(badge_overlay, (badge_x, badge_y), badge_overlay)

    # --------------------------------------------------------------------------
    # 3. DYNAMIC EDITORIAL HEADLINE
    # --------------------------------------------------------------------------
    title_start_y = photo_y + photo_h + 32

    # Scale font size based on length
    if len(title) < 75:
        headline_size = 48
    elif len(title) < 110:
        headline_size = 40
    else:
        headline_size = 34

    font_headline = get_font("SpaceGrotesk-Bold.ttf", headline_size)
    wrapped_title = wrap_text(title, font_headline, content_width, draw)
    if len(wrapped_title) > 3:
        wrapped_title = wrapped_title[:3]
        wrapped_title[-1] = wrapped_title[-1].rstrip("., ") + "..."

    curr_title_y = title_start_y
    line_h = int(headline_size * 1.25)
    for line in wrapped_title:
        draw.text((margin_x, curr_title_y), line, fill=COLOR_DEEP_NAVY, font=font_headline)
        curr_title_y += line_h

    # --------------------------------------------------------------------------
    # 4. KEY CONTEXT / TAKEAWAYS CARD
    # --------------------------------------------------------------------------
    card_y = curr_title_y + 24
    footer_reserve = 80
    card_max_bottom = height - footer_reserve
    card_h = card_max_bottom - card_y

    # White Container with subtle border
    draw.rounded_rectangle(
        [(margin_x, card_y), (margin_x + content_width, card_y + card_h)],
        radius=18,
        fill=COLOR_CARD_WHITE,
        outline=COLOR_CARD_BORDER,
        width=1
    )

    # Left accent vertical border in Arctic Blue (#2563EB)
    draw.rounded_rectangle(
        [(margin_x, card_y), (margin_x + 8, card_y + card_h)],
        radius=4,
        fill=COLOR_ARCTIC_BLUE
    )

    # Section Label inside card
    section_y = card_y + 20
    draw.text((margin_x + 28, section_y), "KEY TAKEAWAYS • ANALYSIS", fill=COLOR_ARCTIC_BLUE, font=font_section)

    # Bullets
    bullets_y = section_y + 34
    display_bullets = (bullets[:2] if card_h < 260 else bullets[:3])

    for i, bullet_text in enumerate(display_bullets):
        dot_cy = bullets_y + 11
        draw.ellipse((margin_x + 28, dot_cy - 4, margin_x + 36, dot_cy + 4), fill=COLOR_ARCTIC_BLUE)

        wrapped_bullet = wrap_text(bullet_text, font_bullet, content_width - 70, draw)
        b_text_y = bullets_y
        for b_line in wrapped_bullet[:2]:
            draw.text((margin_x + 48, b_text_y), b_line, fill=COLOR_DEEP_NAVY, font=font_bullet)
            b_text_y += 28
        bullets_y = b_text_y + 10

    # --------------------------------------------------------------------------
    # 5. BOTTOM BRAND FOOTER
    # --------------------------------------------------------------------------
    footer_y = height - 58

    draw.text((margin_x, footer_y), "keigo.media", fill=COLOR_DEEP_NAVY, font=font_footer_brand)
    draw.text((margin_x + 130, footer_y + 3), "•  Curiosity. Clarity. Discovery.", fill=COLOR_COOL_GRAY, font=font_footer_text)

    # Right side indicator (Swipe Pill)
    swipe_text = "SWIPE TO READ  ➔"
    swipe_bbox = draw.textbbox((0, 0), swipe_text, font=font_footer_brand)
    swipe_w = swipe_bbox[2] - swipe_bbox[0]
    draw.text((width - margin_x - swipe_w, footer_y), swipe_text, fill=COLOR_ARCTIC_BLUE, font=font_footer_brand)

    if output_path:
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        canvas.save(output_path, "PNG", quality=95)

    return canvas
