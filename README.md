# KEIGO
> **Curiosity. Clarity. Discovery.**  
> *Technology, AI, Science & Innovation Media*

KEIGO is an independent global digital media platform focused on discovering, researching, explaining, and publishing developments in technology, artificial intelligence, science, and innovation.

---

## 🏛️ System Architecture

KEIGO operates on a **hybrid local-cloud architecture**:

```
 ┌────────────────────────────────────────────────────────┐
 │                    CLOUD ENVIRONMENT                   │
 │                                                        │
 │   ┌───────────────────────┐   ┌────────────────────┐   │
 │   │  Next.js App (Vercel) │   │ Supabase Postgres  │   │
 │   │  - Public Front-end   │◄──┤ - Articles (RLS)   │   │
 │   │  - Server Components  │   │ - Public Read-only │   │
 │   └───────────────────────┘   └─────────▲──────────┘   │
 └─────────────────────────────────────────┼──────────────┘
                                           │ Service Role / API
 ┌─────────────────────────────────────────┼──────────────┐
 │                    LOCAL ENVIRONMENT    │              │
 │                                         ▼              │
 │   ┌─────────────────┐         ┌────────────────────┐   │
 │   │ Python Service  │────────►│ n8n Orchestrator   │   │
 │   │ - Ingestion     │         │ - Batch Scheduling │   │
 │   │ - Deduplication │         │ - Editorial Flow   │   │
 │   │ - Normalization │         │ - Risk Gate        │   │
 │   └─────────────────┘         └─────────▲──────────┘   │
 │                                         │ OpenAI API   │
 │                               ┌─────────▼──────────┐   │
 │                               │ 9Router AI Gateway │   │
 │                               │ - Free-Tier Models │   │
 │                               │ - Fallback & Quotas│   │
 │                               └────────────────────┘   │
 └────────────────────────────────────────────────────────┘
```

---

## 📁 Repository Structure

```
KEIGO/
├── apps/
│   └── web/                   # Next.js 15+ App Router, Tailwind CSS, TypeScript
├── services/
│   └── ingestion/             # Python RSS/API collectors, cleaners, deduplicators
├── supabase/
│   ├── migrations/            # Version-controlled SQL schemas and RLS policies
│   └── seeds/                 # Initial approved sources & category seeds
├── n8n/
│   └── workflows/             # Exportable n8n workflow JSON blueprints
├── config/
│   ├── 9router/               # AI Gateway model routing & quota configurations
│   └── editorial/             # Editorial prompts, risk rubrics & quality checks
└── docs/
    └── MASTER_PROJECT_CONTEXT.md # Authoritative Master Project Context specification
```

---

## 🚀 Content Production Lifecycle

1. **Discovery & Ingestion:** Python pulls approved RSS feeds and official APIs.
2. **Normalization & Dedup:** URL canonicalization, title similarity hashing, and Supabase staging.
3. **Topic Selection & Research:** n8n orchestrates topic evaluation and primary source extraction.
4. **Draft Generation:** 9Router queries available free-tier models with structured markdown schemas.
5. **Quality & Risk Classification:** Deterministic checks + AI consistency scoring (`low`, `medium`, `high`).
6. **Publishing Gate:** Only `low_risk` and approved articles move to `status = 'published'`.
7. **Public Display:** Next.js Server Components query published content directly with ISR caching.

---

## 🎨 Visual Identity
- **Background / Contrast:** Deep Midnight Navy (`#101426`), Off White (`#F8FAFC`)
- **Accents:** Electric Violet (`#8B5CF6`), Neon Cyan (`#22D3EE`)
- **Typography:** Space Grotesk (Headings), Inter (Body)
