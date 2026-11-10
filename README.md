# Dashboard Transparansi Anggaran & E-Budgeting APBD Provinsi Lampung

Proyek Ujian Tengah Semester (UTS) Perancangan Perangkat Lunak & Sistem Informasi (PPSI).
- **Pengembang:** Rafly Iqbal Maulana (NPM: 24311130)
- **Dosen Pembimbing:** Dr. Erliyan Redy Susanto, M.Kom
- **Institusi Kerjasama:** Bappeda Provinsi Lampung & Universitas Teknokrat Indonesia
- **Tahun Anggaran:** 2026 (APBD Murni & Perubahan)

---

## 1. Pemenuhan Persyaratan PRD & Desain Sistem (`SKILL.md`)

Aplikasi ini dibangun menggunakan arsitektur antarmuka modern satu berkas (`index.html`) berbasis **Tailwind CSS CDN**, **3 Font Google Resmi** (*Plus Jakarta Sans*, *Inter*, dan *JetBrains Mono*), serta ikonografi **Material Symbols Outlined** sesuai ketentuan desain institusional Pemprov Lampung:

| Fitur PRD | Nama Fitur | Status Implementasi |
|---|---|---|
| **F1** | **Dashboard Publik** | Kartu KPI Utama, Gauge Semi-Lingkaran SVG 3 busur serapan, Bar Komparasi Belanja per OPD, Badge Verifikasi BPKAD berkedip (`animate-pulse`). |
| **F2** | **Hierarki Anggaran** | Penelusuran berjenjang OPD → Program (`pl-4`) → Kegiatan (`pl-10`) → Sub Kegiatan (`pl-16`) dengan toggle ekspansi dan filter OPD. |
| **F3** | **Pencarian, Filter & Ekspor** | Penapisan teks multi-kriteria, filter kategori belanja & serapan, serta ekspor CSV nyata dengan format UTF-8 BOM (`\uFEFF`) dan titik koma. |
| **F4** | **Impor Data & Validasi** | Stepper 3 tahap, dropzone berkas berstatus DRAFT, visualisasi baris galat (`#FEE2E2` & badge Galat) vs valid, tombol terkunci otomatis bila ada galat. |
| **F5** | **Manajemen Versi & Publikasi** | Siklus `draft` → `published` → `retracted`, hash SHA-256 ringkas, modal otorisasi publikasi, modal penarikan data wajib alasan di audit log. |
| **F6** | **Autentikasi & RBAC** | Dashboard analis Bappeda (Rina Noviana, S.E.), status sinkronisasi SIPD Kemendagri, serta layar login split-screen (5:7) dengan enkripsi Argon2id. |
| **F7** | **Notifikasi & Langganan** | Formulir langganan publik, preview surel digest, banner peringatan OPD serapan kritis, dan modal berhenti berlangganan 1 klik. |
| **F8** | **Audit Log Append-Only** | Banner Merkle Root kriptografi integritas, pencatatan waktu UTC + WIB, strikethrough perubahan nilai lama, dan proteksi mutlak dari edit/hapus. |
| **F9** | **Header & Footer Institusional** | Header dual-logo (Kiri: Pemprov Lampung, Kanan: Teknokrat) dengan garis gradien 3px 3-warna, serta footer hak cipta statis persis sesuai dokumen. |

---

## 2. Struktur Berkas

```
UTS-PPSI-raflyiqbalmaulana-24311130/
├── index.html                   # Kode utama web aplikasi terpadu (F1–F9, responsif desktop & mobile)
├── vercel.json                  # Konfigurasi deployment & security headers Vercel
├── Lampung_coa.png              # Lambang Daerah Pemerintah Provinsi Lampung (Header Kiri)
├── UNIVERSITASTEKNOKRAT.png     # Logo Universitas Teknokrat Indonesia (Header Kanan)
├── PRD-Dashboard-APBD-Lampung.md # Dokumen Spesifikasi Kebutuhan Produk (PRD)
├── SKILL (1).md                 # Sistem Desain Transparansi Fiskal Pemprov Lampung
└── README.md                    # Dokumentasi teknis proyek
```

---

## 3. Cara Menjalankan Aplikasi

### Opsi A: Langsung di Browser (Offline / Lokal)
Cukup buka berkas `index.html` dengan peramban web modern apa pun (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).

### Opsi B: Menggunakan Local Web Server (VS Code / Python)
Jalankan salah satu perintah berikut pada terminal:
```bash
# Menggunakan Python:
python -m http.server 3000

# Atau menggunakan npx serve:
npx serve .
```
Akses melalui peramban di `http://localhost:3000`.

### Opsi C: Deployment ke Vercel (Produksi)
1. Pasang Vercel CLI (jika belum):
   ```bash
   npm i -g vercel
   ```
2. Jalankan perintah deploy:
   ```bash
   vercel --prod
   ```
3. Proyek akan langsung live di domain Vercel dengan seluruh fitur fungsional.

---

## 4. Teks Hak Cipta Wajib (PRD Bagian 6 - F9.2)
> **Copyright © 2026 by Rafly Iqbal Maulana dan Dr. Erliyan Redy Susanto, M.Kom**

