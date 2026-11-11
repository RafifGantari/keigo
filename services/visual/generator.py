import os
import textwrap
from pathlib import Path
from typing import List, Optional
from PIL import Image, ImageDraw, ImageFont

# ==============================================================================
# KEIGO DESIGN SYSTEM PALETTE
# ==============================================================================
COLOR_BG = (16, 20, 38)            # Deep Midnight Navy #101426
COLOR_CARD_BG = (24, 31, 56)       # Dark Slate #181F38
COLOR_CARD_BORDER = (45, 55, 92)   # Card Border #2D375C
COLOR_TEXT_WHITE = (248, 250, 252) # Off-White #F8FAFC
COLOR_TEXT_MUTED = (160, 174, 192) # Slate Muted #A0AEC0
COLOR_CYAN = (34, 211, 238)        # Neon Cyan #22D3EE
COLOR_VIOLET = (139, 92, 246)      # Electric Violet #8B5CF6

CATEGORY_THEMES = {
    "artificial_intelligence": {
        "label": "ARTIFICIAL INTELLIGENCE",
        "accent": (34, 211, 238),    # Neon Cyan
        "secondary": (139, 92, 246), # Electric Violet
    },
    "technology": {
        "label": "TECHNOLOGY",
        "accent": (56, 189, 248),    # Sky Blue
        "secondary": (99, 102, 241), # Indigo
    },
    "science": {
        "label": "SCIENCE",
        "accent": (52, 211, 153),    # Emerald Mint
        "secondary": (34, 211, 238), # Cyan
    },
    "innovation": {
        "label": "INNOVATION",
        "accent": (244, 114, 182),   # Pink Glow
        "secondary": (139, 92, 246), # Violet
    },
}

def get_font(size: int, bold: bool = False) -> ImageFont.ImageFont:
    """Tries loading modern system fonts (Segoe UI / Arial) with fallback."""
    font_candidates = []
    if bold:
        font_candidates = [
            "C:\\Windows\\Fonts\\segoeuib.ttf",
            "C:\\Windows\\Fonts\\arialbd.ttf",
            "segoeuib.ttf",
            "arialbd.ttf",
        ]
    else:
        font_candidates = [
            "C:\\Windows\\Fonts\\segoeui.ttf",
            "C:\\Windows\\Fonts\\arial.ttf",
            "segoeui.ttf",
            "arial.ttf",
        ]
    
    for candidate in font_candidates:
        if os.path.exists(candidate):
            try:
                return ImageFont.truetype(candidate, size)
            except Exception:
                continue
    
    # Fallback to default
    try:
        return ImageFont.load_default()
    except Exception:
        return ImageFont.load_default()

def wrap_text(text: str, font: ImageFont.ImageFont, max_width: int, draw: ImageDraw.ImageDraw) -> List[str]:
    """Wraps text to fit within max_width in pixels."""
    words = text.split()
    lines = []
    current_line = []

    for word in words:
        test_line = " ".join(current_line + [word])
        bbox = draw.textbbox((0, 0), test_line, font=font)
        line_width = bbox[2] - bbox[0]
        
        if line_width <= max_width:
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

def create_instagram_card(
    title: str,
    category: str,
    bullets: List[str],
    reading_time_min: int = 3,
    output_path: Optional[str] = None
) -> Image.Image:
    """
    Generates a 1080x1350 (4:5 portrait) Instagram card formatted with KEIGO branding.
    """
    width, height = 1080, 1350
    img = Image.new("RGBA", (width, height), COLOR_BG)
    draw = ImageDraw.Draw(img)

    theme = CATEGORY_THEMES.get(category.lower(), CATEGORY_THEMES["technology"])
    accent_color = theme["accent"]
    secondary_color = theme["secondary"]

    # 1. Background subtle ambient glow (radial gradient at top-right)
    glow_overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_overlay)
    center_x, center_y = 900, 150
    for r in range(400, 0, -8):
        alpha = int(45 * (1 - r / 400))
        glow_draw.ellipse(
            (center_x - r, center_y - r, center_x + r, center_y + r),
            fill=(secondary_color[0], secondary_color[1], secondary_color[2], alpha)
        )
    img = Image.alpha_composite(img, glow_overlay)
    draw = ImageDraw.Draw(img)

    # 2. Top Header (Brand + Category Pill)
    margin_x = 72
    header_y = 72

    # Brand Title
    font_brand = get_font(32, bold=True)
    draw.text((margin_x, header_y), "K E I G O", fill=COLOR_CYAN, font=font_brand)

    font_subbrand = get_font(18, bold=False)
    draw.text((margin_x + 170, header_y + 10), "MEDIA", fill=COLOR_TEXT_MUTED, font=font_subbrand)

    # Category Pill
    category_label = theme["label"]
    font_pill = get_font(20, bold=True)
    pill_bbox = draw.textbbox((0, 0), category_label, font=font_pill)
    pill_w = (pill_bbox[2] - pill_bbox[0]) + 36
    pill_h = 44
    pill_x = width - margin_x - pill_w
    pill_y = header_y - 4

    draw.rounded_rectangle(
        (pill_x, pill_y, pill_x + pill_w, pill_y + pill_h),
        radius=22,
        fill=COLOR_CARD_BG,
        outline=accent_color,
        width=2
    )
    draw.text(
        (pill_x + 18, pill_y + 11),
        category_label,
        fill=accent_color,
        font=font_pill
    )

    # 3. Dynamic Headline
    title_start_y = 170
    content_width = width - (margin_x * 2)

    # Determine optimal font size based on title length
    if len(title) < 70:
        font_headline_size = 52
    elif len(title) < 110:
        font_headline_size = 44
    else:
        font_headline_size = 38

    font_headline = get_font(font_headline_size, bold=True)
    wrapped_title = wrap_text(title, font_headline, content_width, draw)
    
    # Cap to max 4 lines
    if len(wrapped_title) > 4:
        wrapped_title = wrapped_title[:4]
        wrapped_title[-1] = wrapped_title[-1].rstrip("., ") + "..."

    curr_y = title_start_y
    line_spacing = int(font_headline_size * 1.25)
    for line in wrapped_title:
        draw.text((margin_x, curr_y), line, fill=COLOR_TEXT_WHITE, font=font_headline)
        curr_y += line_spacing

    # 4. Gradient Accent Divider Line
    divider_y = curr_y + 24
    line_length = content_width
    for step in range(line_length):
        ratio = step / line_length
        r = int(accent_color[0] * (1 - ratio) + secondary_color[0] * ratio)
        g = int(accent_color[1] * (1 - ratio) + secondary_color[1] * ratio)
        b = int(accent_color[2] * (1 - ratio) + secondary_color[2] * ratio)
        draw.line([(margin_x + step, divider_y), (margin_x + step, divider_y + 3)], fill=(r, g, b))

    # 5. Key Takeaways Section Header
    takeaways_header_y = divider_y + 28
    font_section_header = get_font(18, bold=True)
    draw.text(
        (margin_x, takeaways_header_y),
        f"ESSENTIAL CONTEXT • {reading_time_min} MIN READ",
        fill=accent_color,
        font=font_section_header
    )

    # 6. Three Bullet Cards
    bullets_start_y = takeaways_header_y + 40
    card_spacing = 20
    available_height = (height - 130) - bullets_start_y
    card_h = min(170, int((available_height - (card_spacing * 2)) / 3))

    display_bullets = (bullets[:3] if bullets else [
        "Primary source verified report detailing technical breakthroughs.",
        "Analysis of experimental methodology, verified evidence, and limitations.",
        "Direct implications for future research and technological adoption."
    ])

    font_card_num = get_font(28, bold=True)
    font_card_text = get_font(22, bold=False)

    for i, bullet_text in enumerate(display_bullets):
        card_top = bullets_start_y + (i * (card_h + card_spacing))
        card_bottom = card_top + card_h

        # Card Container
        draw.rounded_rectangle(
            (margin_x, card_top, width - margin_x, card_bottom),
            radius=16,
            fill=COLOR_CARD_BG,
            outline=COLOR_CARD_BORDER,
            width=1
        )

        # Left Accent Number Pill
        draw.text((margin_x + 24, card_top + 20), f"0{i+1}", fill=accent_color, font=font_card_num)

        # Bullet Text Content
        text_max_w = content_width - 100
        wrapped_bullet = wrap_text(bullet_text, font_card_text, text_max_w, draw)
        
        b_y = card_top + 20
        for b_line in wrapped_bullet[:3]:
            draw.text((margin_x + 85, b_y), b_line, fill=COLOR_TEXT_WHITE, font=font_card_text)
            b_y += 30

    # 7. Bottom Brand Footer
    footer_y = height - 76
    font_footer_brand = get_font(18, bold=True)
    font_footer_tagline = get_font(18, bold=False)

    draw.text((margin_x, footer_y), "keigo.media", fill=COLOR_CYAN, font=font_footer_brand)
    draw.text((margin_x + 130, footer_y), "•  Curiosity. Clarity. Discovery.", fill=COLOR_TEXT_MUTED, font=font_footer_tagline)

    # Right side indicator
    font_read_cta = get_font(16, bold=True)
    cta_text = "READ FULL REPORT ↗"
    cta_bbox = draw.textbbox((0, 0), cta_text, font=font_read_cta)
    cta_w = cta_bbox[2] - cta_bbox[0]
    draw.text((width - margin_x - cta_w, footer_y), cta_text, fill=COLOR_TEXT_WHITE, font=font_read_cta)

    # Convert to RGB (for JPEG/PNG export)
    final_img = img.convert("RGB")
    
    if output_path:
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        final_img.save(output_path, "PNG", quality=95)

    return final_img
