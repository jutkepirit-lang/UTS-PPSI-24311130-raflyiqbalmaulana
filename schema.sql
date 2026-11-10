-- ==============================================================================
-- SKEMA BASIS DATA POSTGRESQL (PRD Bagian 7 & 11)
-- Dashboard Transparansi Anggaran & E-Budgeting APBD Provinsi Lampung
-- Pemilik Produk : Rafly Iqbal Maulana (24311130)
-- Pembimbing     : Dr. Erliyan Redy Susanto, M.Kom
-- Target Host    : PostgreSQL (Vercel Marketplace / Neon / Supabase)
-- ==============================================================================

-- 1. Ekstensi UUID & Kriptografi
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Master Organisasi Perangkat Daerah (OPD)
CREATE TABLE opd (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    kode_opd VARCHAR(30) UNIQUE NOT NULL, -- Contoh: '1.03.00.0.00.01.0000'
    nama VARCHAR(255) NOT NULL,
    singkatan VARCHAR(50),
    aktif BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Master Tahun Anggaran
CREATE TABLE tahun_anggaran (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tahun INT UNIQUE NOT NULL, -- 2026
    status VARCHAR(20) DEFAULT 'aktif' CHECK (status IN ('aktif', 'tutup_buku', 'perencanaan')),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Manajemen Versi Data & Siklus Publikasi (PRD F5)
CREATE TABLE versi_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tahun_anggaran_id UUID NOT NULL REFERENCES tahun_anggaran(id) ON DELETE RESTRICT,
    periode VARCHAR(20) NOT NULL, -- Contoh: '2026-10' (Oktober 2026)
    nomor_versi VARCHAR(30) NOT NULL, -- Contoh: 'v2.4.0-prod'
    status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'retracted')),
    dibuat_oleh VARCHAR(100) NOT NULL,
    dipublikasi_oleh VARCHAR(100),
    dipublikasi_pada TIMESTAMPTZ,
    alasan_tarik TEXT, -- Wajib diisi jika status menjadi 'retracted'
    hash_berkas VARCHAR(64) NOT NULL, -- SHA-256
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Constraint Unik Parsial: Maksimal 1 versi PUBLISHED aktif per tahun anggaran dan periode
CREATE UNIQUE INDEX uq_versi_published_per_periode 
ON versi_data (tahun_anggaran_id, periode) 
WHERE status = 'published';

-- 5. Struktur Program, Kegiatan, Sub Kegiatan (Hierarki PRD F2)
CREATE TABLE program (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    opd_id UUID NOT NULL REFERENCES opd(id) ON DELETE RESTRICT,
    kode_program VARCHAR(50) NOT NULL, -- '1.03.01'
    nama VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_program_opd UNIQUE (opd_id, kode_program)
);

CREATE TABLE kegiatan (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    program_id UUID NOT NULL REFERENCES program(id) ON DELETE CASCADE,
    kode_kegiatan VARCHAR(50) NOT NULL, -- '1.03.01.2.01'
    nama VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_kegiatan_program UNIQUE (program_id, kode_kegiatan)
);

CREATE TABLE sub_kegiatan (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    kegiatan_id UUID NOT NULL REFERENCES kegiatan(id) ON DELETE CASCADE,
    kode_sub VARCHAR(50) NOT NULL, -- '1.03.01.2.01.0001'
    nama VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_sub_kegiatan UNIQUE (kegiatan_id, kode_sub)
);

-- 6. Detail Item Anggaran (WAJIB NUMERIC(20,2), ANTI FLOATING-POINT - PRD Bagian 7 & 11)
CREATE TABLE anggaran_item (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    versi_data_id UUID NOT NULL REFERENCES versi_data(id) ON DELETE CASCADE,
    sub_kegiatan_id UUID NOT NULL REFERENCES sub_kegiatan(id) ON DELETE RESTRICT,
    kode_rekening VARCHAR(50),
    jenis_belanja VARCHAR(50) CHECK (jenis_belanja IN ('operasional', 'modal', 'hibah', 'btt')),
    alokasi NUMERIC(20,2) NOT NULL DEFAULT 0.00 CHECK (alokasi >= 0),
    realisasi NUMERIC(20,2) NOT NULL DEFAULT 0.00 CHECK (realisasi >= 0),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_item_versi_sub UNIQUE (versi_data_id, sub_kegiatan_id)
);

-- 7. Autentikasi Internal & RBAC (PRD F6)
CREATE TABLE pengguna (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- Argon2id hash
    nama_lengkap VARCHAR(150) NOT NULL,
    nip VARCHAR(30),
    peran VARCHAR(30) NOT NULL CHECK (peran IN ('admin_bappeda', 'analis_bappeda', 'operator_opd', 'pimpinan')),
    opd_id UUID REFERENCES opd(id) ON DELETE SET NULL, -- Nullable untuk admin/analis Bappeda
    aktif BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 8. Berkas Impor & Log Validasi Galat (PRD F4)
CREATE TABLE impor_berkas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    versi_data_id UUID REFERENCES versi_data(id) ON DELETE SET NULL,
    nama_berkas VARCHAR(255) NOT NULL,
    ukuran_byte BIGINT NOT NULL,
    hash_sha256 VARCHAR(64) NOT NULL,
    status_validasi VARCHAR(30) NOT NULL CHECK (status_validasi IN ('memproses', 'valid', 'terdapat_galat')),
    jumlah_baris INT DEFAULT 0,
    jumlah_galat INT DEFAULT 0,
    diunggah_oleh UUID REFERENCES pengguna(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE impor_galat (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    impor_berkas_id UUID NOT NULL REFERENCES impor_berkas(id) ON DELETE CASCADE,
    nomor_baris INT NOT NULL,
    nama_kolom VARCHAR(50),
    kode_galat VARCHAR(50) NOT NULL,
    pesan_galat TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 9. Notifikasi & Ambang Batas Serapan (PRD F7)
CREATE TABLE ambang_notifikasi (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    opd_id UUID REFERENCES opd(id) ON DELETE CASCADE, -- NULL berarti berlaku global seluruh OPD
    persen_minimum NUMERIC(7,4) NOT NULL DEFAULT 50.0000, -- Batas serapan waspada/kritis
    periode_evaluasi VARCHAR(20) NOT NULL,
    aktif BOOLEAN DEFAULT TRUE,
    diperbarui_oleh UUID REFERENCES pengguna(id) ON DELETE SET NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notifikasi (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    jenis VARCHAR(50) NOT NULL CHECK (jenis IN ('publikasi_baru', 'serapan_kritis', 'impor_gagal')),
    penerima_pengguna_id UUID REFERENCES pengguna(id) ON DELETE CASCADE,
    judul VARCHAR(255) NOT NULL,
    pesan TEXT NOT NULL,
    payload JSONB,
    kunci_idempotensi VARCHAR(120) UNIQUE NOT NULL, -- Mencegah notifikasi terkirim ganda
    status VARCHAR(20) DEFAULT 'terkirim' CHECK (status IN ('pending', 'terkirim', 'gagal')),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE langganan_publik (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(150) UNIQUE NOT NULL,
    kanal VARCHAR(30) DEFAULT 'email',
    minat_peringatan_kritis BOOLEAN DEFAULT TRUE,
    minat_laporan_triwulan BOOLEAN DEFAULT TRUE,
    status VARCHAR(20) DEFAULT 'aktif' CHECK (status IN ('aktif', 'unsubscribed')),
    token_berhenti VARCHAR(64) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 10. Audit Log Append-Only (PRD F8 - DILARANG KERAS ADA OPERASI UPDATE / DELETE)
CREATE TABLE audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    aktor_id UUID REFERENCES pengguna(id) ON DELETE SET NULL,
    aktor_email VARCHAR(150),
    ip_address VARCHAR(45) NOT NULL,
    aksi VARCHAR(60) NOT NULL, -- 'PUBLISH_VERSION', 'RETRACT_VERSION', 'UPLOAD_FILE', dll.
    entitas VARCHAR(50) NOT NULL,
    entitas_id VARCHAR(64),
    nilai_sebelum JSONB,
    nilai_sesudah JSONB,
    alasan TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- KUNCI APPEND-ONLY: Mencegah UPDATE dan DELETE pada tabel audit_log
CREATE OR REPLACE RULE no_update_audit_log AS ON UPDATE TO audit_log DO INSTEAD NOTHING;
CREATE OR REPLACE RULE no_delete_audit_log AS ON DELETE TO audit_log DO INSTEAD NOTHING;

-- ==============================================================================
-- DATA AWAL (SEED DATA REALISTIS APBD PROVINSI LAMPUNG T.A. 2026)
-- ==============================================================================

-- 1. Input Tahun Anggaran
INSERT INTO tahun_anggaran (id, tahun, status) 
VALUES ('c1a00000-0000-0000-0000-000000002026', 2026, 'aktif')
ON CONFLICT (tahun) DO NOTHING;

-- 2. Input OPD Utama
INSERT INTO opd (id, kode_opd, nama, singkatan) VALUES
('d1a00000-0000-0000-0000-000000000001', '1.01.00.0.00.01.0000', 'Dinas Pendidikan dan Kebudayaan Provinsi Lampung', 'Disdikbud'),
('d1a00000-0000-0000-0000-000000000002', '1.02.00.0.00.01.0000', 'Dinas Kesehatan Provinsi Lampung', 'Dinkes'),
('d1a00000-0000-0000-0000-000000000003', '1.03.00.0.00.01.0000', 'Dinas Bina Marga dan Bina Konstruksi', 'BMBK'),
('d1a00000-0000-0000-0000-000000000004', '1.04.00.0.00.01.0000', 'Dinas Perumahan, Kawasan Permukiman dan Cipta Karya', 'Perkim'),
('d1a00000-0000-0000-0000-000000000005', '4.01.00.0.00.01.0000', 'Badan Perencanaan Pembangunan Daerah Provinsi Lampung', 'Bappeda'),
('d1a00000-0000-0000-0000-000000000006', '1.05.00.0.00.01.0000', 'Satuan Polisi Pamong Praja Provinsi Lampung', 'Satpol PP')
ON CONFLICT (kode_opd) DO NOTHING;

-- 3. Versi Published Aktif
INSERT INTO versi_data (id, tahun_anggaran_id, periode, nomor_versi, status, dibuat_oleh, dipublikasi_oleh, dipublikasi_pada, hash_berkas)
VALUES (
    'e1a00000-0000-0000-0000-000000000001',
    'c1a00000-0000-0000-0000-000000002026',
    '2026-10',
    'v2.4.0-prod',
    'published',
    'Rina Noviana, S.E. (Analis Bappeda)',
    'Drs. H. Hendra Wijaya (Admin Bappeda)',
    '2026-10-31 17:00:12+07',
    'a7f8e34c9d8112e09b98214fa450d001e52f10b24982736151049281a8c91209'
) ON CONFLICT DO NOTHING;

-- Selesai

