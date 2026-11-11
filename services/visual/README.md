# Automated Visual Card Generator (Fase 3)

Modul ini bertanggung jawab untuk menghasilkan grafis poster/banner visual otomatis beresolusi tinggi rasio **4:5 (1080 x 1350 piksel)** untuk kebutuhan postingan **Instagram Feed** dan **Web Cover** artikel KEIGO.

---

## 🎨 Spesifikasi Desain Brand KEIGO

- **Dimensi:** 1080 x 1350 piksel (Optimal untuk feed Instagram portrait).
- **Background:** Deep Midnight Navy (`#101426`) dengan efek *ambient radial glow* halus di sudut kanan atas.
- **Header:** Logo tipografi `K E I G O MEDIA` dan *Category Pill* dengan warna aksen dinamis per kategori (*AI: Neon Cyan, Tech: Sky Blue, Science: Emerald Mint, Innovation: Pink Glow*).
- **Headline:** Tipografi tegas dengan algoritma auto-wrap responsif dan penyesuaian ukuran font dinamis.
- **Aksen:** Garis pemisah bergradasi (*Cyan to Violet*).
- **Key Takeaways Box:** 3 kartu berpenomoran `01`, `02`, `03` berisi intisari poin penting fakta terverifikasi.
- **Footer:** Watermark `keigo.media`, tagline brand *"Curiosity. Clarity. Discovery."*, dan call-to-action *"READ FULL REPORT ↗"*.

---

## 🚀 Cara Menjalankan

### Uji Coba Generator & Upload ke Supabase Storage:
```bash
& "services\ingestion\.venv\Scripts\python.exe" services\visual\run.py
```
Output gambar lokal akan tersimpan di `services/visual/output/`, dan URL publik langsung dikembalikan dari Supabase Storage CDN (`https://...supabase.co/storage/v1/object/public/media-assets/cards/...png`).
