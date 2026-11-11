# Python Ingestion & Deduplication Service (Fase 2)

Service ini bertugas mengambil (*ingest*) artikel berita dan riset sains terkini dari 20+ sumber primer yang terdaftar di tabel `sources` Supabase secara otomatis dan deterministik.

---

## ⚡ Fitur Utama

1. **Feed Ingestion Paralel:** Mendukung format RSS 2.0, Atom, dan XML dari sumber resmi/akademik.
2. **URL Canonicalization & Normalisasi:** Menghapus parameter tracking kotor (`utm_*`, `fbclid`, `gclid`) dan menstandarisasi path URL.
3. **Pembersihan Konten:** Mengonversi tag HTML kotor menjadi teks bersih menggunakan BeautifulSoup.
4. **Deterministic Deduplication (SHA-256):** Menghasilkan hash unik `SHA-256(normalized_url + title)`. Sebelum insert, sistem memeriksa database untuk memastikan artikel yang sama **tidak pernah** dimasukkan dua kali.
5. **Zero AI Token Waste:** Semua proses kurasi awal, hashing, dan deduplikasi dikerjakan oleh Python murni tanpa membuang token model AI.

---

## 🚀 Cara Menjalankan

### 1. Dry Run (Uji Coba Pengambilan Tanpa Tulis ke Database)
```bash
& "services\ingestion\.venv\Scripts\python.exe" services\ingestion\run.py --dry-run
```

### 2. Live Ingestion (Ambil & Simpan ke `raw_articles` di Supabase)
```bash
& "services\ingestion\.venv\Scripts\python.exe" services\ingestion\run.py
```

### 3. Filter Berdasarkan Kategori
```bash
& "services\ingestion\.venv\Scripts\python.exe" services\ingestion\run.py --category artificial_intelligence
```
