# Dashboard Transparansi Anggaran & E-Budgeting APBD Provinsi Lampung

Proyek Ujian Tengah Semester (UTS) Perancangan Perangkat Lunak & Sistem Informasi (PPSI).
- **Pengembang:** Rafly Iqbal Maulana (NPM: 24311130)
- **Dosen Pembimbing:** Dr. Erliyan Redy Susanto, M.Kom
- **Institusi Kerjasama:** Bappeda Provinsi Lampung & Universitas Teknokrat Indonesia
- **Tahun Anggaran:** 2026 (APBD Murni & Perubahan)
- **Repositori GitHub:** [https://github.com/jutkepirit-lang/UTS-PPSI-24311130-raflyiqbalmaulana](https://github.com/jutkepirit-lang/UTS-PPSI-24311130-raflyiqbalmaulana)

---

## 1. Pemenuhan Persyaratan PRD & Desain Sistem (`SKILL.md`)

Aplikasi ini dibangun menggunakan arsitektur antarmuka modern satu berkas (`index.html`) berbasis **Tailwind CSS CDN**, **3 Font Google Resmi** (*Plus Jakarta Sans*, *Inter*, dan *JetBrains Mono*), serta ikonografi **Material Symbols Outlined** sesuai ketentuan desain institusional Pemprov Lampung:

| Fitur PRD | Nama Fitur | Status Implementasi & Pengujian |
|---|---|---|
| **F1** | **Dashboard Publik** | Kartu KPI Utama, Gauge Semi-Lingkaran SVG 3 busur serapan, Bar Komparasi Belanja per OPD, Badge Verifikasi BPKAD berkedip (`animate-pulse`). Guard pembagian nol (`alokasi = 0` menghasilkan `n/a`). |
| **F2** | **Hierarki Anggaran** | Penelusuran berjenjang OPD → Program (`pl-4`) → Kegiatan (`pl-10`) → Sub Kegiatan (`pl-16`) dengan toggle ekspansi dan filter OPD. |
| **F3** | **Pencarian, Filter & Ekspor** | Penapisan teks multi-kriteria, filter kategori belanja & serapan, sort table interaktif (A-Z, nominal), serta ekspor CSV nyata dengan proteksi Formula Injection. |
| **F4** | **Impor Data & Validasi** | Stepper 3 tahap, dropzone pembacaan file CSV nyata (`FileReader`), validasi baris galat (`#FEE2E2` & badge Galat) vs valid, perhitungan hash SHA-256 asli kriptografis, dan tombol unduh template CSV. |
| **F5** | **Manajemen Versi & Publikasi** | Siklus `draft` → `published` → `retracted`, hash SHA-256 ringkas, modal otorisasi publikasi, modal penarikan data wajib alasan minimal 10 karakter. |
| **F6** | **Autentikasi & RBAC** | Dashboard analis Bappeda (Rina Noviana, S.E.), status sinkronisasi SIPD Kemendagri, serta layar login split-screen (5:7) dengan enkripsi Argon2id. |
| **F7** | **Notifikasi & Langganan** | Formulir langganan publik, preview surel digest, banner peringatan OPD serapan kritis, panel slider ambang batas serapan (`accent-primary`), dan modal berhenti berlangganan 1 klik. |
| **F8** | **Audit Log Append-Only** | Banner Merkle Root kriptografi integritas, pencatatan waktu UTC + WIB, strikethrough perubahan nilai lama, dan proteksi mutlak dari edit/hapus. |
| **F9** | **Header & Footer Institusional** | Header dual-logo (Kiri: Pemprov Lampung, Kanan: Teknokrat) dengan garis gradien 3px 3-warna, serta footer hak cipta statis persis sesuai dokumen. |

---

## 2. Laporan Pengujian, Debugging & Audit Keamanan (.docx)

Dokumentasi akademik formal dalam format Microsoft Word (`.docx`) telah disusun lengkap dan tersedia di direktori proyek:

1. **`LAPORAN_TESTING_DAN_DEBUGGING.docx`**:
   - Berisi metodologi pengujian (Black-Box, Boundary Value Analysis, Usability).
   - Analisis 8 defect hasil *vibe coding* awal (upload berkas tidak nyata, division by zero, sort table, dsb.).
   - Matriks 20 kasus uji (*Test Cases*) dengan hasil 100% **PASSED**.
   - Dokumentasi refactoring dan perbaikan kode.

2. **`LAPORAN_SECURITY_AUDIT.docx`**:
   - Berisi audit keamanan berdasarkan OWASP Top 10 (2021), NIST SP 800-115, dan regulasi UU PDP.
   - Analisis 6 temuan celah keamanan (DOM-based XSS, CSV Formula Injection, CSP Misconfiguration, Hash Integrity, Access Control).
   - Dokumentasi mitigasi dan status pasca-remediasi (100% **FIXED**).

---

## 3. Struktur Berkas Repositori

```
UTS-PPSI-24311130-raflyiqbalmaulana/
├── index.html                     # Kode utama web aplikasi terpadu (F1–F9, responsif & secure)
├── vercel.json                    # Konfigurasi deployment & HTTP Security Headers Vercel
├── schema.sql                     # Skema database PostgreSQL (NUMERIC(20,2), rule append-only)
├── template_anggaran_lampung.csv  # Berkas template CSV resmi Bappeda untuk uji coba impor
├── LAPORAN_TESTING_DAN_DEBUGGING.docx # Laporan formal Pengujian & Debugging (.docx)
├── LAPORAN_SECURITY_AUDIT.docx        # Laporan formal Audit Keamanan & Analisis Kerentanan (.docx)
├── Lampung_coa.png                # Lambang Daerah Pemerintah Provinsi Lampung (Header Kiri)
├── UNIVERSITASTEKNOKRAT.png       # Logo Universitas Teknokrat Indonesia (Header Kanan)
├── PRD-Dashboard-APBD-Lampung.md   # Dokumen Spesifikasi Kebutuhan Produk (PRD)
├── SKILL (1).md                   # Sistem Desain Transparansi Fiskal Pemprov Lampung
├── scripts/                       # Skrip generator dokumen laporan (.docx)
├── .gitignore                     # Filter pengecualian dependensi lokal
└── README.md                      # Dokumentasi teknis proyek
```

---

## 4. Cara Menjalankan Aplikasi

### Opsi A: Langsung di Browser (Offline / Lokal)
Buka berkas `index.html` dengan peramban web modern apa pun (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).

### Opsi B: Menggunakan Local Web Server (VS Code / Python)
```bash
# Menggunakan Python:
python -m http.server 3000

# Atau menggunakan npx serve:
npx serve .
```
Akses melalui peramban di `http://localhost:3000`.

### Opsi C: Deployment ke Vercel (Produksi)
```bash
vercel --prod
```

---

## 5. Teks Hak Cipta Wajib (PRD Bagian 6 - F9.2)
> **Copyright © 2026 by Rafly Iqbal Maulana dan Dr. Erliyan Redy Susanto, M.Kom**
