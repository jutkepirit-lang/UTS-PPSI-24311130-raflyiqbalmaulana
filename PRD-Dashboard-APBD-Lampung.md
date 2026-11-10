# PRD: Dashboard Transparansi Anggaran & E-Budgeting Smart City (APBD Provinsi Lampung)

| | |
|---|---|
| Versi | 0.1 (draf) |
| Tanggal | 10 November 2026 |
| Pemilik produk | Rafly Iqbal Maulana |
| Pembimbing | Dr. Erliyan Redy Susanto, M.Kom |
| Institusi target | Bappeda Provinsi Lampung |
| Cakupan data | APBD Provinsi Lampung |
| Status | Menunggu jawaban atas Open Questions (bagian 10) |

**Konvensi dokumen:** `[ASUMSI]` = asumsi kerja sementara yang belum dikonfirmasi. `[OQ-n]` = merujuk Open Question nomor n di bagian 10. Tidak ada angka atau fakta regulasi yang dianggap pasti kecuali tertulis eksplisit.

---

## 1. Problem Statement

**Masalah:** Data alokasi, penggunaan, dan realisasi APBD tersebar di dokumen dan sistem terpisah, dalam format yang sulit dibaca publik dan lambat dikonsolidasikan oleh internal.

**Siapa yang dirugikan:**

| Pihak | Kerugian |
|---|---|
| Publik (warga, jurnalis, akademisi, LSM) | Tidak bisa memverifikasi ke mana anggaran dipakai; harus membaca dokumen PDF/Excel mentah |
| Bappeda | Pemantauan realisasi antar-OPD memakan waktu karena konsolidasi manual; sulit mendeteksi OPD dengan serapan rendah lebih awal |
| OPD | Menerima permintaan data berulang; tidak ada satu tampilan resmi untuk menunjukkan capaian realisasinya |
| Pimpinan daerah / DPRD / pengawas | Keputusan dan pengawasan terlambat karena data realisasi tidak tersaji ringkas dan terkini |

**Mengapa penting:** Transparansi anggaran menurunkan asimetri informasi, mempermudah pengawasan, dan memberi Bappeda dasar data yang seragam. Kesalahan kalkulasi atau data tidak konsisten pada dashboard anggaran langsung merusak kepercayaan publik, sehingga akurasi numerik adalah syarat utama.

---

## 2. Target User dan Persona

**Pengguna:**
1. Publik umum (anonim, tanpa login) untuk melihat dashboard.
2. Staf Bappeda (Admin dan Analis).
3. Operator OPD (hanya melihat data OPD sendiri di area internal) `[ASUMSI]` [OQ-3].
4. Pimpinan (read-only ringkasan) `[ASUMSI]`.

### Persona 1: Rina, Analis Perencanaan Bappeda
- **Konteks:** Memantau serapan anggaran seluruh OPD setiap bulan dan menyiapkan bahan rapat evaluasi.
- **Kebutuhan:** Melihat peringkat OPD berdasarkan persentase realisasi, mengunggah data periodik, mengekspor ringkasan untuk rapat.
- **Frustrasi:** Menggabungkan file dari banyak OPD secara manual; angka tidak cocok antar versi.
- **Keberhasilan baginya:** Data bulan berjalan terkonsolidasi dalam hitungan menit, angka konsisten dengan sumber.

### Persona 2: Budi, Jurnalis Daerah / Warga Pemantau
- **Konteks:** Ingin memeriksa alokasi dan realisasi anggaran sektor tertentu (misalnya infrastruktur, kesehatan) tanpa akun.
- **Kebutuhan:** Pencarian dan filter cepat per OPD, program, dan tahun; bisa dibuka dari ponsel; bisa mengunduh data.
- **Frustrasi:** Dokumen anggaran sulit dicari dan tidak bisa dibandingkan antar tahun.
- **Keberhasilan baginya:** Menemukan angka alokasi vs realisasi suatu program dalam kurang dari satu menit dan bisa mengutipnya dengan sumber dan tanggal pembaruan.

---

## 3. Goals dan Non-Goals

### Goals
1. Menyajikan alokasi, penggunaan (realisasi), dan sisa anggaran APBD Provinsi Lampung secara publik, akurat, dan ter-timestamp.
2. Memberi Bappeda pandangan konsolidasi lintas-OPD dengan indikator serapan.
3. Menjamin akurasi hitung anggaran dengan aritmetika desimal presisi tetap (tanpa floating point) dari database hingga tampilan.
4. Mengirim notifikasi atas peristiwa penting (data baru dipublikasikan, ambang serapan).
5. Memenuhi syarat institusional: logo Pemda (kiri header), logo Universitas Teknokrat Indonesia (kanan header), footer hak cipta statis.
6. Dapat di-deploy di Vercel.

### Non-Goals (MVP)
1. Tidak menggantikan sistem perencanaan/penganggaran resmi pemerintah (nama sistem sumber belum dikonfirmasi, [OQ-2]).
2. Tidak mengelola proses penyusunan, revisi, dan persetujuan anggaran (modul e-budgeting penuh) kecuali dikonfirmasi [OQ-4].
3. Tidak memuat partisipasi publik, pelaporan aduan, dan peta spasial pada MVP `[ASUMSI]` [OQ-5].
4. Tidak mengelola anggaran kabupaten/kota; hanya APBD Provinsi.
5. Tidak memproses pembayaran atau transaksi keuangan.
6. Tidak menjadi dokumen pertanggungjawaban hukum; dashboard bersifat informatif.

---

## 4. User Stories

**Publik**
- Sebagai warga, saya ingin melihat total APBD, realisasi, dan sisa per tahun anggaran, supaya saya paham gambaran besar penggunaan anggaran provinsi.
- Sebagai warga, saya ingin menelusuri anggaran per OPD hingga program dan kegiatan, supaya saya tahu rinciannya.
- Sebagai jurnalis, saya ingin memfilter dan mengunduh data dalam format CSV, supaya saya bisa menganalisis sendiri.
- Sebagai warga, saya ingin melihat tanggal pembaruan data terakhir, supaya saya tahu seberapa terkini angkanya.
- Sebagai warga, saya ingin berlangganan notifikasi saat data baru dipublikasikan, supaya saya tidak perlu memeriksa manual. `[ASUMSI: kanal notifikasi publik, lihat OQ-6]`

**Bappeda**
- Sebagai analis Bappeda, saya ingin mengunggah data anggaran dan realisasi periodik, supaya dashboard terisi tanpa input manual per baris. `[ASUMSI: impor file, OQ-2]`
- Sebagai analis Bappeda, saya ingin melihat validasi hasil unggahan sebelum dipublikasikan, supaya data salah tidak langsung terbit.
- Sebagai analis Bappeda, saya ingin peringkat serapan antar-OPD, supaya saya bisa menandai OPD yang tertinggal.
- Sebagai admin Bappeda, saya ingin mempublikasikan atau menarik kembali (unpublish) satu periode data, supaya saya mengendalikan apa yang tampil ke publik.
- Sebagai admin Bappeda, saya ingin audit log perubahan data, supaya setiap perubahan dapat ditelusuri.
- Sebagai analis Bappeda, saya ingin mengatur ambang notifikasi serapan rendah, supaya saya diperingatkan lebih awal.

**OPD**
- Sebagai operator OPD, saya ingin melihat data OPD saya dan status publikasinya, supaya saya bisa memeriksa kebenarannya. `[ASUMSI, OQ-3]`

---

## 5. Daftar Fitur

### MVP
| ID | Fitur |
|---|---|
| F1 | Dashboard publik: ringkasan APBD (total alokasi, realisasi, sisa, persentase serapan) per tahun anggaran |
| F2 | Penelusuran hierarki: OPD → Program → Kegiatan → Sub Kegiatan (sampai tingkat yang tersedia di data) |
| F3 | Pencarian, filter (tahun, OPD, jenis belanja), dan ekspor CSV |
| F4 | Impor data anggaran/realisasi (CSV/XLSX) oleh Bappeda dengan validasi dan pratinjau `[ASUMSI]` |
| F5 | Alur publikasi data (draf → publikasi → tarik kembali) dengan versi dan timestamp |
| F6 | Autentikasi dan peran internal (Admin Bappeda, Analis, Operator OPD, Pimpinan) |
| F7 | Notifikasi: pemberitahuan data baru dipublikasikan dan peringatan serapan di bawah ambang |
| F8 | Audit log |
| F9 | Header (logo Pemda kiri, logo Teknokrat kanan) dan footer hak cipta statis |

### v2
- Modul e-budgeting: penyusunan, revisi, dan persetujuan anggaran `[ASUMSI: ditunda, OQ-4]`
- Integrasi API ke sistem sumber `[OQ-2]`
- Pelaporan aduan / partisipasi publik
- Perbandingan antar tahun dan visual tren lanjutan
- Ekspor PDF laporan

### Nanti
- Peta spasial sebaran anggaran
- Anggaran kabupaten/kota
- Aplikasi mobile native
- Analitik prediktif serapan

---

## 6. Functional Requirements (MVP)

### F1: Dashboard publik
- FR1.1 Halaman beranda menampilkan: total alokasi, total realisasi, sisa anggaran, persentase serapan, untuk tahun anggaran terpilih (default: tahun berjalan dengan data terpublikasi terbaru).
- FR1.2 Persentase serapan = realisasi / alokasi × 100, dihitung dengan aritmetika desimal, ditampilkan 2 desimal. Aturan pembulatan: `[ASUMSI: half-up]`, konfirmasi [OQ-8].
- FR1.3 Semua angka menampilkan mata uang Rupiah dengan pemisah ribuan format Indonesia dan label "Data per [tanggal pembaruan]".
- FR1.4 Grafik minimal: batang alokasi vs realisasi per OPD, dan indikator serapan keseluruhan.
- FR1.5 Halaman dapat digunakan pada layar ponsel (responsif).
- FR1.6 Hanya data berstatus `published` yang tampil publik.

### F2: Penelusuran hierarki
- FR2.1 Pengguna dapat membuka OPD, lalu program, lalu kegiatan, lalu sub kegiatan; setiap level menampilkan alokasi, realisasi, sisa, serapan.
- FR2.2 Total tiap level harus sama dengan jumlah anak-anaknya; jika tidak, data ditandai tidak konsisten saat impor (lihat F4), bukan ditampilkan.
- FR2.3 Breadcrumb dan URL yang dapat dibagikan untuk setiap level.

### F3: Pencarian, filter, ekspor
- FR3.1 Pencarian teks pada nama OPD, program, kegiatan.
- FR3.2 Filter: tahun anggaran, OPD, jenis belanja `[bergantung struktur data sumber, OQ-2]`.
- FR3.3 Ekspor CSV hasil filter, memuat kolom nilai sebagai teks desimal (tanpa notasi ilmiah) dan baris metadata tanggal pembaruan.
- FR3.4 Batas ukuran ekspor dan rate limit ditentukan saat desain teknis `[OQ-9]`.

### F4: Impor data
- FR4.1 Hanya peran Admin/Analis Bappeda dapat mengunggah.
- FR4.2 Format berkas: CSV dan XLSX `[ASUMSI]`; templat kolom disediakan dan dapat diunduh.
- FR4.3 Validasi wajib sebelum simpan: kolom wajib lengkap, nilai numerik valid (tidak negatif untuk alokasi), kode OPD dikenal, realisasi tidak melebihi alokasi tanpa penandaan (aturan lihat bagian 8), total induk sama dengan jumlah anak.
- FR4.4 Hasil validasi ditampilkan sebagai pratinjau dengan daftar galat per baris; unggahan dengan galat kritis tidak dapat dilanjutkan.
- FR4.5 Unggahan valid disimpan sebagai versi baru berstatus `draft`, tidak menimpa data terpublikasi.
- FR4.6 Setiap unggahan dicatat (pengunggah, waktu, nama berkas, hash berkas).

### F5: Alur publikasi
- FR5.1 Status versi: `draft` → `published` → `retracted`.
- FR5.2 Hanya Admin Bappeda dapat mempublikasikan atau menarik kembali.
- FR5.3 Publikasi memicu pembaruan "data per" tanggal dan notifikasi (F7).
- FR5.4 Penarikan kembali mengembalikan tampilan publik ke versi terpublikasi sebelumnya dan tercatat di audit log dengan alasan wajib diisi.
- FR5.5 Maksimal satu versi `published` aktif per tahun anggaran dan periode.

### F6: Autentikasi dan peran
- FR6.1 Login internal dengan email dan kata sandi `[ASUMSI]`; SSO pemda hanya jika dikonfirmasi [OQ-7].
- FR6.2 Peran: `admin_bappeda`, `analis_bappeda`, `operator_opd`, `pimpinan`.
- FR6.3 Operator OPD hanya mengakses data OPD-nya (pembatasan di sisi server, bukan hanya UI).
- FR6.4 Sesi kedaluwarsa dan perlindungan percobaan login berulang; kata sandi di-hash dengan algoritma modern (Argon2id).
- FR6.5 Halaman publik tidak memerlukan login.

### F7: Notifikasi
- FR7.1 Jenis notifikasi: (a) data periode baru dipublikasikan, (b) serapan OPD di bawah ambang pada periode tertentu, (c) unggahan gagal validasi.
- FR7.2 Penerima: (a) pelanggan publik `[ASUMSI]`; (b) dan (c) pengguna internal terkait.
- FR7.3 Kanal MVP: notifikasi di dalam aplikasi untuk pengguna internal; kanal untuk publik (email/lainnya) belum ditentukan [OQ-6].
- FR7.4 Ambang serapan dapat dikonfigurasi Admin; nilai awal tidak ditetapkan di dokumen ini [OQ-10].
- FR7.5 Notifikasi tidak dikirim ganda untuk kejadian dan penerima yang sama (idempoten).
- FR7.6 Pelanggan publik dapat berhenti berlangganan dengan satu tautan.
- FR7.7 Pada deployment Vercel, pengiriman dijalankan lewat job terjadwal atau pemicu saat publikasi, bukan proses latar yang berjalan terus `[lihat bagian 11]`.

### F8: Audit log
- FR8.1 Dicatat: login, unggah, validasi, publikasi, penarikan, perubahan ambang, perubahan peran.
- FR8.2 Kolom minimal: aktor, aksi, entitas, waktu (UTC), ringkasan sebelum/sesudah.
- FR8.3 Log tidak dapat diubah atau dihapus lewat aplikasi (hanya-tambah).
- FR8.4 Admin dapat melihat dan memfilter log; publik tidak dapat.

### F9: Header dan footer institusional
- FR9.1 Header di semua halaman publik dan internal: **Logo Pemerintah Daerah di sisi kiri**, **Logo Universitas Teknokrat Indonesia di sisi kanan**.
- FR9.2 Footer di semua halaman memuat teks statis persis: **"Copyright © 2026 by Rafly Iqbal Maulana dan Dr. Erliyan Redy Susanto, M.Kom"**. Teks tidak dapat diubah lewat antarmuka dan tidak bergantung pada data.
- FR9.3 Aset logo disediakan pemilik produk; logo tampil dengan rasio asli dan teks alternatif.
- FR9.4 Pada layar sempit, posisi kiri/kanan tetap dipertahankan (logo mengecil, tidak berpindah sisi).
- FR9.5 Logo Pemda: logo resmi Pemerintah Provinsi Lampung `[ASUMSI]`, [OQ-11].

---

## 7. Sketsa Data Model

Semua kolom uang: `NUMERIC(20,2)`. Tidak ada tipe `FLOAT/REAL/DOUBLE` untuk nilai anggaran. Primary key: UUID `[ASUMSI]`.

| Entitas | Field kunci |
|---|---|
| `opd` | id, kode_opd (unik), nama, singkatan, aktif |
| `tahun_anggaran` | id, tahun (unik), status |
| `versi_data` | id, tahun_anggaran_id, periode (mis. bulan), nomor_versi, status (`draft`/`published`/`retracted`), dibuat_oleh, dipublikasi_oleh, dipublikasi_pada, alasan_tarik, hash_berkas |
| `program` | id, opd_id, kode_program, nama |
| `kegiatan` | id, program_id, kode_kegiatan, nama |
| `sub_kegiatan` | id, kegiatan_id, kode_sub, nama |
| `anggaran_item` | id, versi_data_id, sub_kegiatan_id (atau level terendah yang tersedia), kode_rekening `[OQ-2]`, jenis_belanja, **alokasi NUMERIC(20,2)**, **realisasi NUMERIC(20,2)** |
| `pengguna` | id, email (unik), password_hash, peran, opd_id (nullable), aktif |
| `impor_berkas` | id, versi_data_id, nama_berkas, ukuran, hash, status_validasi, jumlah_galat, diunggah_oleh, waktu |
| `impor_galat` | id, impor_berkas_id, baris, kolom, kode_galat, pesan |
| `ambang_notifikasi` | id, opd_id (nullable = semua), persen_minimum NUMERIC(7,4), periode_mulai, aktif |
| `notifikasi` | id, jenis, penerima_pengguna_id (nullable), langganan_id (nullable), payload, status, dibuat_pada, dikirim_pada, kunci_idempotensi (unik) |
| `langganan_publik` | id, kanal, tujuan, status, token_berhenti `[OQ-6]` |
| `audit_log` | id, aktor_id, aksi, entitas, entitas_id, sebelum, sesudah, waktu |

**Constraint inti:**
- `CHECK (alokasi >= 0)`, `CHECK (realisasi >= 0)`.
- Unik parsial: satu `versi_data` berstatus `published` per (tahun_anggaran, periode).
- `audit_log`: tanpa operasi UPDATE/DELETE bagi peran aplikasi.
- Total agregat (OPD/program/kegiatan) dihitung dengan `SUM` NUMERIC di query, bukan disimpan ganda, kecuali ada keputusan caching eksplisit.

---

## 8. Edge Case dan Failure State

| # | Kondisi | Perilaku yang diharapkan |
|---|---|---|
| 1 | Alokasi = 0 | Serapan ditampilkan "n/a", bukan error pembagian nol |
| 2 | Realisasi > alokasi | Ditandai peringatan pada impor dan tampil dengan label khusus; tidak otomatis ditolak karena perubahan anggaran mungkin sah `[OQ-12]` |
| 3 | Realisasi atau alokasi negatif | Ditolak saat impor (koreksi dicatat lewat mekanisme lain bila diperlukan `[OQ-12]`) |
| 4 | Total induk tidak sama dengan jumlah anak | Impor ditolak dengan daftar baris bermasalah |
| 5 | File dengan format/encoding salah, kolom hilang, atau ukuran melebihi batas | Ditolak dengan pesan galat jelas; tidak ada data parsial tersimpan |
| 6 | Unggah ganda berkas yang sama (hash sama) | Peringatan duplikat; konfirmasi admin diperlukan |
| 7 | Dua admin mempublikasikan bersamaan | Satu berhasil, satu menerima galat konflik (constraint unik) |
| 8 | Belum ada data terpublikasi | Halaman publik menampilkan status "Data belum tersedia", bukan angka nol |
| 9 | Data ditarik kembali | Publik melihat versi sebelumnya dengan tanggal aslinya; tidak ada tampilan rusak |
| 10 | Database tidak dapat dijangkau | Halaman publik menampilkan pesan layanan tidak tersedia; tidak menampilkan data basi tanpa label; galat dicatat |
| 11 | Fungsi serverless timeout saat impor besar | Impor berjalan bertahap/asinkron dengan status progres; tidak menyisakan data setengah jadi (transaksi atomik) `[detail teknis, bagian 11]` |
| 12 | Pengiriman notifikasi gagal | Dicoba ulang terbatas, status gagal tercatat, tidak mengirim ganda |
| 13 | Logo gagal dimuat | Teks alternatif tampil; tata letak kiri/kanan tidak rusak |
| 14 | Operator OPD mencoba mengakses data OPD lain (manipulasi URL) | Ditolak server (403), tercatat di audit log |
| 15 | Kehilangan presisi (nilai sangat besar, pembulatan) | Seluruh jalur memakai desimal presisi tetap; pengujian wajib pada nilai batas |
| 16 | Tahun anggaran dengan perubahan APBD (APBD Murni vs Perubahan) | Perlu pemodelan versi; belum ditentukan `[OQ-13]` |

---

## 9. Success Metrics

> Semua target di bawah adalah **usulan** dan baru berlaku setelah disetujui; baseline belum diketahui [OQ-14].

| Metrik | Definisi | Target usulan |
|---|---|---|
| Akurasi angka | Selisih dashboard vs data sumber pada sampel uji | 0 selisih (tepat ke sen) |
| Cakupan data | Persentase OPD dengan data terpublikasi pada periode berjalan | ≥ 90% pada akhir pilot |
| Ketepatan waktu | Hari dari akhir periode hingga data terpublikasi | Ditetapkan Bappeda [OQ-14] |
| Waktu konsolidasi | Waktu unggah hingga publikasi oleh analis | Berkurang dibanding proses manual (baseline perlu diukur) |
| Performa halaman publik | LCP pada koneksi seluler normal | ≤ 3 detik |
| Ketersediaan | Uptime bulanan halaman publik | ≥ 99% (target realistis untuk hosting terkelola; konfirmasi) |
| Adopsi | Pengunjung unik bulanan, ekspor CSV | Dilacak; target ditetapkan setelah baseline |
| Notifikasi | Persentase notifikasi terkirim tanpa duplikat | ≥ 99% |
| Kualitas | Jumlah galat perhitungan yang dilaporkan pengguna | 0 |

---

## 10. Open Questions

| # | Pertanyaan | Dampak |
|---|---|---|
| OQ-1 | Apa definisi "selesai": prototipe/demo, pilot nyata di Bappeda Lampung, atau rilis penuh? Tim dan timeline? | Menentukan seluruh scope dan kriteria penerimaan |
| OQ-2 | Sumber data APBD: unggah file, atau integrasi sistem existing? Format kolom dan level rincian (sampai sub kegiatan/rekening)? | F2, F4, data model |
| OQ-3 | Apakah operator OPD perlu akses login pada MVP, atau hanya Bappeda? | F6, scope |
| OQ-4 | Apakah e-budgeting (penyusunan, revisi, persetujuan) wajib di MVP? Saat ini ditunda ke v2. | Scope inti |
| OQ-5 | "Cukup notifikasi": dipahami partisipasi publik, aduan, peta ditunda dan hanya notifikasi masuk MVP. Benar? | Scope |
| OQ-6 | Kanal notifikasi untuk publik (email, WhatsApp, lainnya)? Siapa penyedia dan siapa menanggung biaya? | F7, privasi |
| OQ-7 | Apakah perlu SSO pemda atau autentikasi dua faktor? | F6 |
| OQ-8 | Aturan pembulatan persentase dan penyajian satuan (Rupiah penuh vs jutaan/miliar)? | Tampilan angka |
| OQ-9 | Batas ekspor, rate limit, dan kebijakan akses data publik (termasuk API publik)? | F3 |
| OQ-10 | Nilai ambang serapan dan siapa yang menetapkan? | F7 |
| OQ-11 | Izin penggunaan logo Pemda dan logo Universitas Teknokrat; siapa menyediakan berkas resolusi tinggi? Apakah ada pedoman penggunaan? | F9 |
| OQ-12 | Kebijakan realisasi melebihi alokasi dan koreksi negatif? | Validasi F4 |
| OQ-13 | Apakah APBD Murni dan Perubahan harus dimodelkan terpisah? | Data model |
| OQ-14 | Baseline dan target metrik resmi dari Bappeda? | Bagian 9 |
| OQ-15 | Persetujuan Bappeda atas data apa yang boleh dipublikasikan ke publik (klasifikasi keterbukaan informasi)? | Hukum, F1 |
| OQ-16 | Apakah hosting di Vercel (server di luar Indonesia) sesuai ketentuan lokasi data dan kebijakan keamanan Pemda/Bappeda? | Kepatuhan, deployment |
| OQ-17 | Siapa pemilik repositori, domain, dan akun Vercel setelah serah terima? | Operasional |

---

## 11. Persyaratan Teknis dan Institusional (Wajib Divalidasi)

### 11.1 Backend: Rust: **Valid, dengan catatan Vercel**
- **Alasan:** Rust cocok untuk kebutuhan ini: tipe kuat, tanpa garbage collector, keamanan memori, dan ekosistem desimal presisi tetap (`rust_decimal`/`bigdecimal`) serta driver PostgreSQL (`sqlx`/`tokio-postgres`).
- **Pustaka usulan** `[ASUMSI]`: `axum` atau handler fungsi Vercel, `sqlx` (query terverifikasi), `rust_decimal`, `argon2`, `serde`, `tracing`.
- **Aturan:** Seluruh nilai uang di Rust bertipe desimal (bukan `f32`/`f64`); serialisasi JSON nilai uang sebagai **string**, bukan angka, agar tidak kehilangan presisi di klien.
- **Catatan Vercel (perlu diverifikasi sebelum desain final):** Vercel menjalankan Rust sebagai fungsi serverless melalui runtime Rust. Konsekuensi: tidak ada proses latar yang berjalan terus-menerus, ada batas durasi eksekusi dan ukuran fungsi, dan koneksi database harus memakai connection pooling/driver yang ramah serverless. Status, batas, dan dukungan runtime Rust di Vercel saat ini harus dicek di dokumentasi resmi Vercel sebelum implementasi.

### 11.2 Database: PostgreSQL dengan NUMERIC: **Valid**
- Semua kolom uang `NUMERIC(20,2)`; persentase `NUMERIC(7,4)` bila disimpan. Larangan `FLOAT/REAL/DOUBLE PRECISION` untuk nilai anggaran.
- Agregasi (`SUM`, rasio) dihitung di database atau di Rust dengan desimal presisi tetap; pembulatan hanya pada lapisan tampilan, sesuai aturan OQ-8.
- Pengujian wajib: nilai maksimum, nilai sangat kecil, penjumlahan ribuan baris, dan kesamaan hasil antara query SQL dan perhitungan Rust.
- **Hosting PostgreSQL pada Vercel:** Vercel tidak menyediakan database sendiri; pilihan adalah penyedia PostgreSQL terkelola (mis. melalui Vercel Marketplace). Pilihan penyedia, wilayah server, dan biaya belum ditentukan [OQ-16].

### 11.3 Hosting dan Deployment: Vercel
- Frontend dan fungsi backend di-deploy ke Vercel; framework frontend belum ditetapkan `[ASUMSI: ditentukan pada desain teknis]`.
- Konfigurasi rahasia (kredensial database) hanya lewat environment variable Vercel; tidak ada rahasia di repositori.
- Lingkungan: Preview (per cabang) dan Production.
- Job terjadwal notifikasi memakai mekanisme terjadwal Vercel atau pemicu saat publikasi; batas dan ketersediaannya mengikuti paket akun [OQ-17].
- **Risiko kepatuhan:** lokasi server dan data di luar Indonesia perlu disetujui pemilik data [OQ-16].

### 11.4 Persyaratan Institusional (diwajibkan; lihat F9)
- Header kiri: Logo Pemerintah Daerah. Header kanan: Logo Universitas Teknokrat Indonesia.
- Footer statis: "Copyright © 2026 by Rafly Iqbal Maulana dan Dr. Erliyan Redy Susanto, M.Kom".
- Kriteria uji: tampil di semua halaman, semua ukuran layar, dan tidak dapat diubah dari antarmuka.

### 11.5 Non-Functional Requirements
- **Keamanan:** HTTPS wajib; hash kata sandi Argon2id; otorisasi di server; proteksi CSRF/XSS/injeksi SQL (query berparameter); rate limit; header keamanan.
- **Privasi:** Data pelanggan publik minimal; berhenti langganan satu klik.
- **Aksesibilitas:** Kontras dan navigasi keyboard sesuai praktik dasar WCAG `[ASUMSI: tingkat kepatuhan belum ditetapkan]`.
- **Performa:** Lihat bagian 9.
- **Observabilitas:** Log terstruktur dan pelacakan galat.
- **Pencadangan:** Kebijakan backup dan pemulihan database mengikuti penyedia yang dipilih; RPO/RTO belum ditetapkan.

---

## 12. Kriteria Penerimaan MVP (usulan)

1. Seluruh FR F1–F9 lulus uji, termasuk header dan footer persis sesuai F9.
2. Hasil dashboard sama persis dengan data sumber pada sampel uji yang disepakati.
3. Tidak ada tipe floating point pada jalur nilai uang (tinjauan kode dan skema).
4. Berhasil ter-deploy dan dapat diakses publik di Vercel Production.
5. Seluruh Open Questions bertanda dampak "Scope inti" telah dijawab sebelum pengembangan dimulai.
