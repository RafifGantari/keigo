import sys
from pathlib import Path

# Add services/ingestion to sys.path
sys.path.insert(0, str(Path(__file__).resolve().parent))

from src.runner import run_ingestion
import argparse

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="KEIGO Feed Ingestion Service")
    parser.add_argument("--category", type=str, default=None, help="Filter by category (artificial_intelligence, technology, science, innovation)")
    parser.add_argument("--dry-run", action="store_true", help="Test run without saving to Supabase")
    args = parser.parse_args()

    run_ingestion(category_filter=args.category, dry_run=args.dry_run)
