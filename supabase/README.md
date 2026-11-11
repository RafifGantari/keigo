# Supabase Database & Storage Setup (Fase 1)

Folder ini berisi seluruh file migrasi skema database, seed data sumber berita awal, dan konfigurasi keamanan Row Level Security (RLS) untuk platform **KEIGO**.

---

## 📁 Struktur File

```
supabase/
├── migrations/
│   └── 001_initial_schema.sql      # 8 tabel inti, enums, triggers, RLS, storage bucket
├── seeds/
│   └── 001_initial_sources.sql     # 20 feed RSS primer terverifikasi untuk 4 kategori
└── README.md                       # Petunjuk instalasi & verifikasi
```

---

## 🚀 Cara Menjalankan Migrasi ke Supabase

Ada 2 cara untuk menerapkan skema ini ke project Supabase Anda:

### Cara 1: Lewat Dashboard Supabase (Paling Mudah & Cepat)

1. Buka dashboard project Anda di [supabase.com](https://supabase.com/dashboard).
2. Di menu navigasi sebelah kiri, klik **SQL Editor**.
3. Klik **New query**.
4. Buka file [`001_initial_schema.sql`](./migrations/001_initial_schema.sql), salin seluruh isinya, lalu tempel ke SQL Editor.
5. Klik tombol **Run** (atau tekan `Ctrl + Enter`).
   - *Hasil:* Seluruh 8 tabel, enums, fungsi trigger, kebijakan RLS, dan storage bucket `media-assets` berhasil dibuat.
6. Buka kembali query baru, buka file [`001_initial_sources.sql`](./seeds/001_initial_sources.sql), salin isinya, tempel, lalu klik **Run**.
   - *Hasil:* 20 sumber berita primer terpercaya untuk 4 kategori terdaftar di tabel `sources`.

---

### Cara 2: Lewat Supabase CLI (Jika Supabase CLI Terpasang)

```bash
# Login ke akun Supabase
supabase login

# Tautkan dengan project id Anda
supabase link --project-ref your-project-id

# Jalankan migrasi
supabase db push
```

---

## 🔍 Checklist Verifikasi di Dashboard Supabase

Setelah query dijalankan, periksa hal-hal berikut di dashboard:

- [ ] **Table Editor**:
  - `sources` (berisi 20 baris data sumber awal)
  - `raw_articles`
  - `content_queue`
  - `articles` (termasuk kolom Instagram: `social_caption`, `cover_image_url`, `instagram_status`, dll.)
  - `article_sources`
  - `editorial_reviews`
  - `api_usage`
  - `automation_logs`
- [ ] **Authentication -> Policies (RLS)**:
  - Pastikan semua tabel memiliki label **RLS Enabled**.
  - Tabel `articles` memiliki policy `public_read_published_articles` (`status = 'published'`).
- [ ] **Storage**:
  - Bucket `media-assets` berstatus **Public Bucket**.

---

## 🔑 Kredensial untuk Tahap Berikutnya

Ambil kredensial dari dashboard Supabase Anda di menu **Project Settings -> API**:
1. **Project URL** -> masukkan ke `SUPABASE_URL` di file `.env`.
2. **Project API keys (anon / public)** -> masukkan ke `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. **Project API keys (service_role / secret)** -> masukkan ke `SUPABASE_SERVICE_ROLE_KEY`.
