# KEIGO
## MASTER PROJECT CONTEXT
### Global Technology, Artificial Intelligence, Science & Innovation Media Platform

---

# 1. PROJECT IDENTITY

**Project Name:** KEIGO

**Industry:** Digital Media, Technology, Artificial Intelligence, Science, and Innovation.

**Business Type:** AI-powered digital media and information platform.

**Primary Market:** Global.

**Primary Language:** English.

**Brand Tagline:**
"Curiosity. Clarity. Discovery."

**Brand Descriptor:**
"Technology, AI, Science & Innovation Media."

**Website:** To be determined.

**Primary Website Framework:** Next.js.

**Website Hosting:** Vercel.

**Database:** Supabase PostgreSQL.

**Automation Engine:** n8n.

**Data Processing:** Python.

**AI Gateway:** 9Router.

**AI Model Strategy:** Free-tier AI models from supported providers.

**Source Control:** GitHub.

**Development Environment:** Google Antigravity.

KEIGO is an independent global digital media platform focused on discovering, researching, explaining, and publishing developments in technology, artificial intelligence, science, and innovation.

The platform is designed around an AI-powered content production system that minimizes manual daily operations while maintaining editorial accuracy, source transparency, and responsible publishing standards.

KEIGO is intended to become more than a conventional technology news website. Its long-term direction is a global information and media company that helps people understand technological developments and their implications.

---

# 2. BRAND PHILOSOPHY

The name KEIGO is inspired by the name of Japanese novelist Keigo Higashino.

The inspiration is associated with intellectual curiosity, logical thinking, careful investigation, attention to detail, and the ability to make complex subjects understandable.

This inspiration is conceptual. KEIGO is an independent media brand and is not affiliated with, endorsed by, or officially associated with Keigo Higashino.

The brand's editorial philosophy is built around five principles:

**Curiosity**
Continuously discovering new ideas, developments, technologies, and scientific breakthroughs.

**Logic**
Prioritizing evidence, reasoning, and factual consistency.

**Investigation**
Examining information rather than simply repeating what other publications report.

**Clarity**
Explaining complicated subjects in a way that readers can understand.

**Discovery**
Helping readers discover new perspectives, knowledge, and possibilities.

The brand personality is:
- Bold.
- Futuristic.
- Innovative.
- Intelligent.
- Curious.
- Independent.
- Analytical.
- Forward-thinking.

KEIGO should feel like an ambitious, modern, independent global media organization.

---

# 3. VISION AND MISSION

## Vision
To become a global media platform that helps people understand the technologies, scientific discoveries, and innovations shaping the future.

## Mission
1. Discover important developments in technology, AI, science, and innovation.
2. Deliver accurate, relevant, and understandable information.
3. Explain the context and implications behind technological developments.
4. Make complex developments accessible to a global audience.
5. Use artificial intelligence to improve media production efficiency.
6. Maintain responsible editorial standards and transparent source attribution.
7. Build an independent and sustainable global digital media company.

## Core Value Proposition
KEIGO does not simply report what happens.

KEIGO helps readers understand:
- What happened.
- What is new.
- How it works.
- Why it matters.
- What its implications could be.
- What developments may come next.

---

# 4. TARGET AUDIENCE

KEIGO serves a global English-speaking audience, including:
- Technology enthusiasts.
- Artificial intelligence enthusiasts.
- AI researchers and practitioners.
- Software developers.
- Engineers.
- Researchers and academics.
- Startup founders.
- Entrepreneurs.
- Technology professionals.
- Investors interested in emerging technologies.
- Readers interested in future developments.

Content should be accessible to both technically experienced readers and general readers.
The writing style should avoid unnecessary jargon while preserving technical accuracy.

---

# 5. CONTENT PILLARS

KEIGO has four primary editorial categories:
- **5.1 Artificial Intelligence:** Research, LLMs, GenAI, AI Agents, Machine Learning, Robotics, Infrastructure, Hardware, Industry.
- **5.2 Technology:** Software, Hardware, Semiconductors, Cloud, OS, Cybersecurity, Developer Tools, Open-Source, Consumer Tech.
- **5.3 Science:** Space Exploration, Astronomy, Physics, Quantum Computing, Biotech, Genetics, Chemistry, Neuroscience, Materials Science.
- **5.4 Innovation:** Breakthroughs, Inventions, Future Tech, Automation, Robotics, Smart Infrastructure, Emerging Models.

---

# 6. CONTENT FORMATS

- **Short News:** Concise, timely, verified facts with original source references.
- **News Articles:** Standard editorial reports explaining context, evidence, and significance.
- **Explainers:** Educational deep dives making complicated systems understandable.
- **Research Summaries:** Accessible distillations of papers, reports, methodology, and limitations.
- **Analysis:** Synthesizing industry trends and connecting developments with rigorous evidence.
- **Daily Briefings:** Curated digests of essential developments within a timeframe.

---

# 7. EDITORIAL IDENTITY AND WRITING STYLE

- Professional, clear, objective, informative, evidence-based, concise.
- Zero tolerance for sensationalism, clickbait, hallucinations, or unverified claims.
- Primary sources prioritized (official announcements, research papers, technical docs).
- Compliance with copyright, terms of service, and API policies.

---

# 8. AUTOMATED CONTENT PRODUCTION SYSTEM

1. Discover information.
2. Collect source material.
3. Normalize source data.
4. Detect duplicate information.
5. Evaluate topics.
6. Select suitable topics.
7. Conduct research.
8. Prepare research evidence.
9. Generate original articles.
10. Perform editorial quality checks.
11. Classify editorial risk.
12. Publish eligible articles.
13. Display articles on the public website.
14. Record operational activity and AI usage.

Target production volume: 3–5 articles per day. Quality & evidence always take precedence over volume.

---

# 9. TECHNICAL ARCHITECTURE

- **Website (Cloud):** Next.js (App Router, Server Components, TypeScript, Tailwind CSS) deployed on Vercel.
- **Database (Cloud):** Supabase PostgreSQL with Row Level Security (RLS).
- **Orchestration (Local):** n8n running scheduled/manual workflows.
- **Data Engine (Local):** Python for RSS/API ingestion, deduplication, URL & text normalization.
- **AI Gateway (Local):** 9Router connecting to free-tier model providers with fallback and quota handling.
- **Dev & Ops:** Google Antigravity & GitHub.

---

# 10. CONTENT STATUS LIFECYCLE

`discovered` -> `selected` -> `researching` -> `draft` -> `quality_check` -> (`pending_review` | `approved`) -> `published` (or `rejected`, `pending_retry`).

---

# 11. RISK CLASSIFICATION

- **Low Risk:** General tech updates, product releases, public research. Automated publishing allowed once quality checks pass.
- **Medium Risk:** Disputed claims, ambiguous info, sensitive business items. Held for human review.
- **High Risk:** Serious allegations, leaks, legal/medical/security advice, privacy risks. Held for human review.
- **Uncertain:** Defaults to hold. Never bypass risk gate for quotas.

---

# 12. DATABASE ENTITIES

- `sources`: Approved source feeds/APIs, credibility tiers, categories.
- `raw_articles`: Ingested articles with hash, raw data, publication timestamps.
- `content_queue`: Prioritized candidate topics undergoing research/generation.
- `articles`: Final generated and published articles (markdown, metadata, SEO, status, risk).
- `article_sources`: Multi-source attribution relationships.
- `editorial_reviews`: Systematic quality, factual consistency, and risk check logs.
- `api_usage`: Model token counters, provider quotas, operation tracking.
- `automation_logs`: Workflow execution details and error reporting.

---

# 13. DESIGN SYSTEM & VISUAL IDENTITY

- **Colors:** Deep Midnight Navy (`#101426`), Electric Violet (`#8B5CF6`), Neon Cyan (`#22D3EE`), Off White (`#F8FAFC`).
- **Typography:** Space Grotesk (Headings), Inter (Body).
- **Aesthetic:** Modern, bold, editorial, restrained gradients, generous whitespace, high readability. No cheap AI gimmicks.
