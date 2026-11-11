import sys
from pathlib import Path

CURRENT_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(CURRENT_DIR))

from editorial_generator import create_editorial_card
from uploader import upload_card_to_storage

def main():
    title = "DEEPMIND UNVEILS NEXT-GEN NEURAL ARCHITECTURE"
    category = "ARTIFICIAL INTELLIGENCE"
    subtitle = "Recursive verification loop achieves 42% accuracy boost in complex multi-step reasoning."
    sample_photo = str(CURRENT_DIR / "sample_photo.jpg")

    # Variant 1: Pure Typographic Editorial (Matching the ITS KSTI Reference 1:1)
    out_v1 = str(CURRENT_DIR / "output" / "keigo-clean-editorial-cover.png")
    img_v1 = create_editorial_card(
        title="DEEPMIND UNVEILS NEXT-GEN NEURAL ARCHITECTURE",
        category="ARTIFICIAL INTELLIGENCE",
        subtitle="Recursive verification benchmarks published in Nature with open-source verification code.",
        date_str="11 NOV 2026",
        photo_input=None, # Pure typographic like ITS KSTI cover
        output_path=out_v1
    )
    url_v1 = upload_card_to_storage(img_v1, slug="keigo-clean-editorial-cover")

    # Variant 2: Editorial with Embedded Photo
    out_v2 = str(CURRENT_DIR / "output" / "keigo-editorial-with-photo.png")
    img_v2 = create_editorial_card(
        title="DEEPMIND UNVEILS NEXT-GEN NEURAL ARCHITECTURE",
        category="ARTIFICIAL INTELLIGENCE",
        subtitle="Recursive verification benchmarks published in Nature with open-source verification code.",
        date_str="11 NOV 2026",
        photo_input=sample_photo,
        output_path=out_v2
    )
    url_v2 = upload_card_to_storage(img_v2, slug="keigo-editorial-with-photo")

    print("\n" + "=" * 60)
    print("VARIANT 1 (PURE TYPOGRAPHY 1:1 ITS STYLE):")
    print(url_v1)
    print("\nVARIANT 2 (WITH EMBEDDED PHOTO):")
    print(url_v2)
    print("=" * 60 + "\n")

if __name__ == "__main__":
    main()
