---
name: apbd-lampung-design
description: Sistem desain "Transparansi Fiskal Pemprov Lampung" untuk dashboard APBD / e-budgeting (portal publik, mobile, dan dashboard internal Bappeda/BPKAD). Gunakan skill ini setiap kali pengguna meminta halaman, komponen, mockup, atau HTML/Tailwind untuk dashboard APBD, realisasi OPD, struktur anggaran, impor data, audit log, notifikasi, atau halaman admin Bappeda, bahkan jika tidak menyebut "desain sistem". Memastikan palet hijau-emas institusional, tipografi, kartu KPI, status serapan, tabel anggaran, dan pola halaman konsisten dengan 13 halaman referensi.
---

# Desain Dashboard APBD Provinsi Lampung

Pedoman ini diekstrak dari 13 halaman referensi (Beranda publik, Realisasi per OPD, Pencarian, Notifikasi publik, Status layanan, Mobile, Login, Dashboard analis, Impor, Validasi, Versi & Publikasi, Notifikasi admin, Audit Log). Output harus terasa **institusional, tenang, tepercaya, padat data**.

## 1. Stack & Aturan Dasar

- HTML tunggal + **Tailwind CDN** (`https://cdn.tailwindcss.com`) dengan `tailwind.config` kustom (Bagian 2). `darkMode: "class"`.
- Font Google: **Plus Jakarta Sans** (judul), **Inter** (isi/label), **JetBrains Mono** (angka rupiah, kode rekening, hash, persentase).
- Ikon: **Material Symbols Outlined** (`<span class="material-symbols-outlined text-[20px]">`).
- Bahasa UI: **Indonesia**. `<html lang="id">`.
- Reset: `html,body{margin:0;padding:0} body{overscroll-behavior:none} ::-webkit-scrollbar{display:none}`.
- **Tanpa border solid** untuk memisahkan kartu. Gunakan perbedaan tonal (`bg-surface-container-lowest` di atas `bg-surface` / `bg-surface-container-low`) + `shadow-sm`. Border hanya hairline `border-outline-variant/30` untuk header, sidebar, dan pemisah footer.
- Semua angka uang, kode rekening, hash, persentase memakai font mono (`font-currency-*`).

## 2. Token (salin ke tailwind.config)

```js
tailwind.config={darkMode:"class",theme:{extend:{
colors:{
"primary":"#00450d","primary-container":"#1b5e20","on-primary":"#ffffff","primary-fixed":"#acf4a4","primary-fixed-dim":"#91d78a","on-primary-fixed":"#002203","on-primary-fixed-variant":"#0c5216","on-primary-container":"#90d689","inverse-primary":"#91d78a",
"secondary":"#835400","secondary-container":"#fcab28","on-secondary":"#ffffff","on-secondary-container":"#694300","secondary-fixed":"#ffddb5","secondary-fixed-dim":"#ffb957","on-secondary-fixed":"#2a1800","on-secondary-fixed-variant":"#643f00",
"tertiary":"#003a75","tertiary-container":"#00509f","on-tertiary":"#ffffff","tertiary-fixed":"#d6e3ff","tertiary-fixed-dim":"#a9c7ff","on-tertiary-fixed":"#001b3d","on-tertiary-fixed-variant":"#00468c","on-tertiary-container":"#a6c5ff",
"error":"#ba1a1a","on-error":"#ffffff","error-container":"#ffdad6","on-error-container":"#93000a",
"background":"#fcf9f8","surface":"#fcf9f8","surface-bright":"#fcf9f8","surface-dim":"#dcd9d9","surface-tint":"#2a6b2c",
"surface-container-lowest":"#ffffff","surface-container-low":"#f6f3f2","surface-container":"#f0eded","surface-container-high":"#eae7e7","surface-container-highest":"#e5e2e1","surface-variant":"#e5e2e1",
"on-surface":"#1c1b1b","on-surface-variant":"#41493e","on-background":"#1c1b1b","outline":"#717a6d","outline-variant":"#c0c9bb","inverse-surface":"#313030","inverse-on-surface":"#f3f0ef"},
borderRadius:{DEFAULT:"0.25rem",lg:"0.5rem",xl:"0.75rem",full:"9999px"},
spacing:{"space-xs":"0.25rem","space-sm":"0.5rem","space-md":"1rem","space-lg":"1.5rem","space-xl":"2.5rem","gutter":"1.5rem","gutter-mobile":"0.75rem","margin":"2rem","margin-mobile":"1rem"},
fontFamily:{"headline-xl":["Plus Jakarta Sans"],"headline-lg":["Plus Jakarta Sans"],"headline-md":["Plus Jakarta Sans"],"headline-xl-mobile":["Plus Jakarta Sans"],"headline-lg-mobile":["Plus Jakarta Sans"],"title-md":["Plus Jakarta Sans"],
"body-lg":["Inter"],"body-md":["Inter"],"body-sm":["Inter"],"label-md":["Inter"],"label-sm":["Inter"],
"currency-display":["JetBrains Mono"],"currency-display-mobile":["JetBrains Mono"],"currency-md":["JetBrains Mono"],"currency-sm":["JetBrains Mono"]},
fontSize:{
"headline-xl":["32px",{lineHeight:"40px",letterSpacing:"-0.02em",fontWeight:"700"}],
"headline-xl-mobile":["24px",{lineHeight:"32px",letterSpacing:"-0.01em",fontWeight:"700"}],
"headline-lg":["24px",{lineHeight:"32px",letterSpacing:"-0.01em",fontWeight:"600"}],
"headline-lg-mobile":["20px",{lineHeight:"28px",fontWeight:"600"}],
"headline-md":["18px",{lineHeight:"26px",fontWeight:"600"}],
"title-md":["16px",{lineHeight:"24px",fontWeight:"600"}],
"body-lg":["16px",{lineHeight:"24px",fontWeight:"400"}],
"body-md":["14px",{lineHeight:"20px",fontWeight:"400"}],
"body-sm":["12px",{lineHeight:"16px",fontWeight:"400"}],
"label-md":["13px",{lineHeight:"18px",letterSpacing:"0.01em",fontWeight:"600"}],
"label-sm":["11px",{lineHeight:"14px",letterSpacing:"0.03em",fontWeight:"600"}],
"currency-display":["28px",{lineHeight:"34px",letterSpacing:"-0.03em",fontWeight:"700"}],
"currency-display-mobile":["20px",{lineHeight:"28px",letterSpacing:"-0.02em",fontWeight:"700"}],
"currency-md":["14px",{lineHeight:"20px",fontWeight:"600"}],
"currency-sm":["12px",{lineHeight:"16px",fontWeight:"500"}]}}}};
```

Peran warna:
| Warna | Peran |
|---|---|
| `primary` / `primary-container` (hijau hutan) | Identitas, CTA utama, nav aktif, status **Optimal** |
| `secondary-container` (#fcab28 emas/amber) | Aksen, status **Waspada**, bar "pagu" |
| `secondary` (cokelat emas) | Teks aksen, sisa anggaran, tautan sekunder |
| `tertiary` (biru tua) | Info, logo universitas, unggahan, tautan teknis |
| `error` / `error-container` | Status **Kritis**, galat, penarikan data, aksi destruktif |

## 3. Aturan Status Serapan (WAJIB konsisten)

| Serapan | Label publik | Warna bar/teks | Badge |
|---|---|---|---|
| ≥ 80% (publik gauge: > 70%) | Optimal / Sesuai Target | `primary` / `primary-container` | `bg-primary/10 text-primary` atau `bg-primary-fixed` |
| 50 – 79,99% | Waspada / Perlu Perhatian | `secondary-container` (bar), `secondary` (teks) | `bg-secondary-fixed text-on-secondary-fixed` |
| < 50% | Kritis / Tertinggal | `error` | `bg-error-container text-on-error-container` atau `bg-error text-on-error` |
| > 100% | Melebihi Alokasi | `secondary-container` bar 100% + ikon `warning` | `bg-secondary-container text-on-secondary-container`, baris `bg-secondary-fixed/20`, sisa kas merah `-Rp ...` |

- Rumus tampil: `Realisasi SP2D / Pagu × 100%`. Selalu jaga konsistensi: `Sisa = Pagu − Realisasi`.
- Baris kritis di tabel: `bg-error-container/10..60`, ikon `warning` merah di kolom nomor.
- Jangan hanya mengandalkan warna: sertakan label teks/ikon.

## 4. Format Angka & Teks

- Rupiah penuh: `Rp 12.450.300.000.000,00` (titik ribuan, koma desimal). Ringkas: `Rp 12,45 T`, `Rp 890 M`.
- Persentase koma: `66,01%` (di data JS/CSV boleh titik: `66.01`).
- Tanggal: `31 Oktober 2026`, ringkas `31 Okt 2026`; jam `17:00 WIB`. Audit log: tampilkan UTC dan WIB.
- Kode rekening bertingkat: `1.03.02.1.01.03` (font mono). Kode OPD: `1.03.00.0.00.01.0000`.
- Label status "Data per 31 Oktober 2026 • Tervalidasi BPKAD" selalu ada di halaman publik (badge dengan titik `animate-pulse`).
- Footer wajib: `Copyright © 2026 by Rafly Iqbal Maulana dan Dr. Erliyan Redy Susanto, M.Kom` (halaman publik tambah baris "Portal Keterbukaan Informasi Publik Pemerintah Provinsi Lampung bekerjasama dengan Universitas Teknokrat Indonesia").
- Rujukan regulasi yang dipakai: UU No. 14/2008 (KIP), Permendagri No. 77/2020, Permendagri No. 90/2019, SIPD Kemendagri.

## 5. Shell Halaman

### 5a. Portal Publik (desktop)
- **Header fixed** `h-28`, `bg-surface-container-lowest`, `shadow-[0_1px_8px_rgba(0,0,0,0.06)]`, 2 baris: (1) logo + "Pemerintah Provinsi Lampung" (uppercase, primary, bold) + judul tengah + mitra Universitas Teknokrat Indonesia + avatar bulat `bg-primary`; (2) nav pill, border atas `border-outline-variant/30`.
- Nav: item aktif `bg-primary text-on-primary font-bold rounded-lg shadow-sm`, lain `text-on-surface-variant hover:bg-surface-container rounded-lg`. Menu: Beranda, Realisasi per OPD, Struktur Anggaran, Grafik & Analisis, Publikasi & Dokumen. Badge kanan: `APBD Murni 2026`.
- **Garis gradien** 3px di dasar header: `bg-gradient-to-r from-primary-container via-secondary-container to-secondary`.
- `<main class="pt-28 bg-surface">`, konten `max-w-[1440px] mx-auto px-gutter lg:px-margin py-6 flex flex-col gap-6`. Footer `bg-surface-container-low border-t border-outline-variant/30 py-6`.

### 5b. Mobile publik
- Meta viewport `viewport-fit=cover`, class `pt-safe` / `pb-safe`.
- Header `fixed h-16`, `bg-surface/90 backdrop-blur-xl`, logo kiri, judul "APBD Lampung" tengah, avatar + menu kanan, garis gradien 3px.
- **Bottom nav** `fixed bottom-0 h-16`: Ringkasan, SKPD, Program, Kajian, Data Open (aktif `text-primary font-semibold`). Target sentuh ≥ 44px (`h-11 min-w-[56px]`).
- KPI 2 kolom (`grid-cols-2 gap-gutter-mobile`), grafik batang horizontal-scroll `snap-x`, CTA penuh `h-12 rounded-xl`.
- Footer copyright `fixed bottom-16`.

### 5c. Dashboard Internal (Bappeda/BPKAD)
- Header fixed `h-20` (logo gedung, "Dashboard Internal Bappeda & Pengelolaan APBD", UTI, profil analis dengan NIP) + garis gradien 3px.
- **Sidebar fixed** kiri `top-20 w-64` (analis) atau `w-72` (admin), `bg-surface-container-lowest`. Menu: Dashboard, Impor Data, Versi & Publikasi, Notifikasi (badge angka), Audit Log, Pengguna. Aktif: `bg-primary-container text-on-primary font-semibold shadow-sm rounded-lg`. Kartu "Lingkungan Kerja / SIPD Kemendagri Sinkron" di dasar sidebar.
- Konten `pl-64` / `pl-72`, `pt-20`, `px-margin py-space-lg`, `gap-space-lg`.

### 5d. Login
Split-screen `grid lg:grid-cols-12`: form kiri 5 kolom (co-branding Pemprov + Teknokrat, badge "Akses Analis Kebijakan", toggle visibilitas sandi, catatan otoritas), panel kanan 7 kolom `bg-primary` dengan gambar institusi `opacity-25 mix-blend-luminosity`, kutipan headline, 3 metrik kecil, badge standar BPK-RI & BSSN.

## 6. Komponen

**Kartu KPI** (publik): `bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md`, strip warna atas `h-1` (primary-container / primary / secondary / secondary-container), label `label-sm uppercase tracking-wide`, ikon dalam kotak `w-10 h-10 rounded-lg bg-surface-container-low`, nilai `font-currency-display`, baris keterangan dengan ikon 16px. KPI standar: Total Alokasi, Total Realisasi, Sisa Anggaran, Persentase Serapan (+ progress bar `bg-gradient-to-r from-primary to-secondary-container`, badge "Kinerja Baik (On Track)").

**Baris perbandingan OPD**: wadah `p-3 rounded-lg bg-surface-container-low hover:bg-surface-container`; bar ganda `h-3 relative` (pagu = `bg-secondary-container opacity-80` penuh, realisasi = `bg-primary` di atasnya); di bawah "Alokasi: Rp 2,85 T" kiri dan "Realisasi" kanan (mono).

**Gauge semi-lingkaran** SVG `viewBox="0 0 200 110"`, 3 busur (merah `#ba1a1a`, emas `#fcab28`, hijau `#00450d`), jarum `#1c1b1b`, nilai besar di bawah, legenda 3 kolom (< 50% Kritis, 50–70% Waspada, > 70% Optimal). Mobile: ring progress SVG `r=30`.

**Tombol**: Primer `bg-primary hover:bg-primary-container text-on-primary rounded-lg px-4 py-2 shadow-sm active:scale-[0.98] transition-all`. Sekunder `bg-surface-container-low hover:bg-surface-container text-on-surface`. Bahaya `bg-error text-on-error`. Nonaktif `bg-surface-container text-outline-variant cursor-not-allowed` + ikon `lock` + tooltip penjelas (`bg-inverse-surface`). Teks tombol: kata kerja Indonesia ("Unduh Data (CSV)", "Telusuri per OPD", "Simpan Konfigurasi Ambang").

**Chip/segmen filter**: kelompok `p-1 bg-surface-container rounded-lg gap-1`; aktif `bg-primary text-on-primary shadow-sm font-bold` (atau `bg-surface-container-lowest text-primary shadow-sm` untuk segmen tab); pil tahun menampilkan badge "Aktif".

**Badge/pill**: `rounded-full px-2.5 py-0.5 label-sm font-bold` + titik 6px. Pasangan warna: hijau (`bg-primary/10 text-primary`), amber (`bg-secondary-fixed text-on-secondary-fixed-variant`), merah (`bg-error-container text-on-error-container`), biru (`bg-tertiary-fixed text-on-tertiary-fixed-variant`), netral (`bg-surface-container-highest text-on-surface-variant`).

**Tabel**: wadah `bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden`, `overflow-x-auto`, thead `bg-surface-container-low text-on-surface-variant label-md` (uppercase untuk tabel teknis), pemisah `divide-y divide-surface-container`, hover `hover:bg-surface-container-low/60`, angka rata kanan mono, kolom serapan = persentase + bar mini `h-1..h-2`. Zebra tipis `bg-surface-container-low/30`. Footer tabel `bg-surface-container-low` berisi info jumlah + paginasi (`w-8 h-8 rounded-lg`, halaman aktif `bg-primary text-on-primary`).

**Tabel hierarki anggaran** (Program → Kegiatan → Sub Kegiatan): indentasi `pl-4` / `pl-10` / `pl-16`; ikon `keyboard_arrow_down` / `chevron_right` / `subdirectory_arrow_right`; Program: baris `bg-surface-container/60 font-medium`, kode dalam chip `bg-primary/10 text-primary`, nama UPPERCASE `title-md`; Kegiatan: `bg-surface-container-low/40`; Sub kegiatan: `bg-surface-container-lowest`, kode mono `text-outline-variant`. Breadcrumb di atas, panel kiri daftar OPD (kartu aktif `ring-2 ring-primary bg-primary/5` berlabel "Sedang Ditampilkan").

**Stepper 3 langkah**: kartu `rounded-lg`; selesai `bg-primary-fixed` + ikon `check`; aktif `bg-primary-container text-on-primary shadow-sm` + badge "Aktif"; mendatang `opacity-75`.

**Dropzone**: `outline-dashed outline-2 -outline-offset-2 outline-outline-variant hover:outline-primary-container bg-surface-container-low/70 rounded-xl p-space-xl`, ikon `cloud_upload` dalam lingkaran `w-20 h-20`, input file transparan `absolute inset-0 opacity-0`, progress bar `h-2 bg-primary-container`. Catatan keamanan: berkas masuk sebagai **DRAFT**, tidak menimpa data publik sebelum validasi dan otorisasi.

**Validasi impor**: banner kuning `bg-secondary-container/20` bila ada galat; baris galat `bg-[#FEE2E2]` + badge `bg-error text-on-error` "Galat" + deskripsi dengan ikon penyebab; baris valid putih dengan badge hijau; segmen filter "Tampilkan Semua / Hanya Baris Bermasalah / Hanya Baris Valid"; tombol "Simpan sebagai Draft" **nonaktif** selama masih ada galat kritis.

**Kartu versi (Draft / Published / Retracted)**: strip atas `h-1` abu `outline-variant/60` / `primary` / `error`; nomor versi mono (`v2.4.0-prod`; yang ditarik: `line-through` merah + badge REVOKED); hash SHA-256 dipotong `a7f8e3...12e09` + tombol salin. Modal konfirmasi publikasi (strip hijau `h-1.5`, jelaskan dampak) dan modal penarikan (strip merah, **textarea alasan wajib** untuk audit log).

**Notifikasi admin**: kartu `p-space-md rounded-xl` dengan **strip kiri `w-1.5`** (hijau = dipublikasikan, amber = di bawah ambang, merah = gagal validasi), badge kategori + badge status (Terkirim / Diproses Ulang / Gagal), baris penerima, bar bawah `bg-surface-container-low` berisi **kunci idempotensi** (mono). Panel konfigurasi ambang: input angka + slider `accent-primary` sinkron, toggle `peer` (`bg-primary-container`), checkbox eskalasi ke Sekda/Kepala Bappeda (< 45%), toast `border-l-4 border-primary`.

**Audit log**: banner `bg-primary` "Log Append-Only" dengan ikon `lock` terisi dan Merkle root mono; filter 4 kolom (rentang tanggal, aktor, jenis aksi, entitas); tabel `min-w-[1080px]` kolom Waktu (UTC + WIB), Aktor & IP, Aksi (badge), Entitas, Ringkasan `sebelum → sesudah` (nilai lama `line-through`). Baris **PENARIKAN**: `bg-error-container/35` + strip kiri merah `w-1.5` + ikon `warning` + alasan. Jangan sediakan tombol edit/hapus pada log.

**Toast**: `fixed bottom-6 right-6 z-50 bg-inverse-surface text-inverse-on-surface rounded-xl shadow-xl border-l-4` (atau versi terang `bg-surface-container-lowest`), hilang otomatis 3,5–5 dtk.

**Kotak regulasi** (selalu di bawah halaman data): `bg-surface-container-low rounded-xl p-4`, ikon `policy` hijau, judul "Keterbukaan Informasi Publik", teks `body-sm text-on-surface-variant`.

## 7. Halaman Status (Empty & Error)

- **Empty** ("Data belum tersedia"): kartu putih `p-8 lg:p-14` center, strip gradien atas, badge status, ilustrasi SVG map arsip kosong (warna token: hijau + emas), judul `headline-lg`, teks "Belum ada data yang dipublikasikan untuk tahun anggaran ini. Periksa kembali nanti.", tombol **Muat Ulang** + tautan tahun sebelumnya + berlangganan notifikasi, dan timeline 3 fase (KUA-PPAS → Evaluasi Kemendagri → Estimasi Rilis).
- **Error** ("Layanan tidak tersedia saat ini"): ilustrasi server + awan sinkron, teks "Kami sedang mengalami gangguan. Silakan coba beberapa saat lagi.", tombol **Coba Kembali**, Periksa Status Server, Laporkan ke Tim IT Diskominfotik.
- **ATURAN KERAS: halaman error murni kualitatif, tanpa angka apa pun** (tidak ada kode HTTP, hitungan mundur, persen, jumlah percobaan).
- Empty state hasil pencarian: ikon `search_off` dalam lingkaran, "Tidak ditemukan hasil untuk pencarian Anda", tombol "Atur Ulang Filter".

## 8. Halaman Pencarian & Notifikasi Publik

- Pencarian: kolom 4/8 — sidebar filter sticky (`top-36`; tahun, OPD multi-pilih dengan jumlah sub, kelompok akun belanja, status serapan dengan hitungan, rentang pagu), hasil tabel 8 kolom dengan tombol **Ekspor CSV** (hijau dominan) dan Cetak/PDF. Filter aktif tampil sebagai tag `rounded-lg` yang bisa ditutup.
- Berlangganan: formulir (email wajib, kanal Email Digest aktif, WhatsApp Bot "Segera" nonaktif `opacity-60`, 3 preferensi) di kiri, pratinjau email klien di kanan (bar jendela 3 titik, header Dari/Subjek/Kepada, badan email dengan 2 kartu metrik dan CTA "Lihat Data & Rincian Lengkap"), lalu seksi konfirmasi berhenti berlangganan (strip gradien merah, pilihan alasan radio, tombol merah + "Tetap Berlangganan"). Jaminan privasi wajib dicantumkan.

## 9. Interaksi & Gerak

- Transisi `transition-all`/`transition-colors`, tekan `active:scale-[0.98]`, hover kartu `hover:shadow-md`.
- `animate-pulse` hanya untuk indikator "terkini/live" dan baris kritis; `animate-ping` hanya untuk titik status kecil.
- Prototipe boleh disimulasikan dengan JS inline (urut tabel `sortTable`, filter chip, ganti tahun, unduh CSV via `Blob` + BOM `\uFEFF`, unggah palsu dengan progres acak, toast). Tidak memakai localStorage.
- CSV unduhan: header Indonesia, pemisah `;` untuk data penelusuran, angka mentah tanpa titik ribuan.

## 10. Aksesibilitas & Responsif

- Kontras: teks utama `on-surface` di atas `surface*`; teks putih hanya di atas `primary`, `primary-container`, `error`, `secondary`.
- `aria-label` untuk tombol ikon, `aria-current="page"` pada nav aktif, `scope="col"` pada `th`, `<label for>` untuk input.
- Breakpoint: grid KPI `grid-cols-1 md:grid-cols-2 xl:grid-cols-4`; panel dua kolom `lg:grid-cols-12` (8/4 atau 5/7); tabel lebar selalu dalam `overflow-x-auto` dengan `min-w-[...]`; sembunyikan teks sekunder di mobile (`hidden md:flex`).
- Ikon tombol ≥ 18px, target sentuh mobile ≥ 44px.

## 11. Checklist Sebelum Mengirim Output

1. Tailwind config token Bagian 2 terpasang, 3 font termuat.
2. Header + garis gradien tiga warna hadir; nav aktif benar.
3. Angka uang/kode pakai font mono dan format Indonesia; `Sisa = Pagu − Realisasi`.
4. Status serapan mengikuti Bagian 3 (warna + label + ikon).
5. Tidak ada border tebal; pemisahan lewat tonal/shadow.
6. Label "Data per ... • Tervalidasi BPKAD" dan footer copyright ada.
7. Aksi kritis (publikasi, penarikan, impor) punya konfirmasi dan jejak audit; tombol nonaktif punya penjelasan.
8. Halaman error tanpa angka.
9. Responsif diuji pada lebar mobile (~390px) dan desktop (≥1280px).
