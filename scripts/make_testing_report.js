const fs = require('fs');
const path = require('path');
const { 
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
  HeadingLevel, BorderStyle, WidthType, AlignmentType, ShadingType 
} = require('docx');

const borderNone = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const borderCell = { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" };
const cellBorders = { top: borderCell, bottom: borderCell, left: borderCell, right: borderCell };

function createCell(text, bold = false, align = AlignmentType.LEFT, width = 20, bgColor = null, fontColor = "1C1B1B") {
  const shading = bgColor ? { fill: bgColor, type: ShadingType.CLEAR } : undefined;
  return new TableCell({
    borders: cellBorders,
    width: { size: width, type: WidthType.PERCENTAGE },
    shading: shading,
    children: [
      new Paragraph({
        alignment: align,
        spacing: { before: 80, after: 80 },
        children: [
          new TextRun({
            text: text,
            bold: bold,
            size: 20, // 10pt
            font: "Inter",
            color: fontColor
          })
        ]
      })
    ]
  });
}

function createHeading(text, level) {
  return new Paragraph({
    text: text,
    heading: level,
    spacing: { before: 240, after: 120 }
  });
}

function createParagraph(text, bold = false) {
  return new Paragraph({
    spacing: { before: 60, after: 60 },
    children: [
      new TextRun({
        text: text,
        bold: bold,
        size: 22, // 11pt
        font: "Inter",
        color: "1C1B1B"
      })
    ]
  });
}

const doc = new Document({
  styles: {
    default: {
      document: {
        run: {
          font: "Inter",
          color: "1C1B1B"
        }
      }
    },
    heading1: {
      run: {
        font: "Plus Jakarta Sans",
        size: 32,
        bold: true,
        color: "00450D"
      }
    },
    heading2: {
      run: {
        font: "Plus Jakarta Sans",
        size: 26,
        bold: true,
        color: "1B5E20"
      }
    },
    heading3: {
      run: {
        font: "Plus Jakarta Sans",
        size: 22,
        bold: true,
        color: "835400"
      }
    }
  },
  sections: [
    {
      properties: {},
      children: [
        // COVER / HEADER DOKUMEN
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200, after: 80 },
          children: [
            new TextRun({
              text: "LAPORAN TESTING DAN DEBUGGING PERANGKAT LUNAK",
              size: 36,
              bold: true,
              font: "Plus Jakarta Sans",
              color: "00450D"
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 40, after: 200 },
          children: [
            new TextRun({
              text: "Sistem Informasi Transparansi Anggaran & E-Budgeting APBD Provinsi Lampung",
              size: 26,
              bold: true,
              font: "Plus Jakarta Sans",
              color: "835400"
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 400 },
          children: [
            new TextRun({
              text: "Dokumentasi Pengujian Fungsional, Analisis Bug Vibe Coding, & Tindakan Debugging\nUjian Tengah Semester (UTS) Perancangan Perangkat Lunak & Sistem Informasi (PPSI)",
              size: 20,
              font: "Inter",
              color: "41493E"
            })
          ]
        }),

        // METADATA PENYUSUN
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                createCell("Nama Mahasiswa", true, AlignmentType.LEFT, 30, "F0EDED"),
                createCell("Rafly Iqbal Maulana", false, AlignmentType.LEFT, 70)
              ]
            }),
            new TableRow({
              children: [
                createCell("Nomor Pokok Mahasiswa (NPM)", true, AlignmentType.LEFT, 30, "F0EDED"),
                createCell("24311130", false, AlignmentType.LEFT, 70)
              ]
            }),
            new TableRow({
              children: [
                createCell("Dosen Pembimbing", true, AlignmentType.LEFT, 30, "F0EDED"),
                createCell("Dr. Erliyan Redy Susanto, M.Kom", false, AlignmentType.LEFT, 70)
              ]
            }),
            new TableRow({
              children: [
                createCell("Institusi Akademik", true, AlignmentType.LEFT, 30, "F0EDED"),
                createCell("Universitas Teknokrat Indonesia", false, AlignmentType.LEFT, 70)
              ]
            }),
            new TableRow({
              children: [
                createCell("Institusi Mitra / Pengguna", true, AlignmentType.LEFT, 30, "F0EDED"),
                createCell("Badan Perencanaan Pembangunan Daerah (Bappeda) Provinsi Lampung", false, AlignmentType.LEFT, 70)
              ]
            }),
            new TableRow({
              children: [
                createCell("Tanggal Pengujian", true, AlignmentType.LEFT, 30, "F0EDED"),
                createCell("10 November 2026", false, AlignmentType.LEFT, 70)
              ]
            })
          ]
        }),

        new Paragraph({ spacing: { before: 300, after: 100 }, children: [] }),

        // BAB 1: PENDAHULUAN
        createHeading("1. Ruang Lingkup dan Tujuan Pengujian", HeadingLevel.HEADING_1),
        createParagraph("Pengujian dan proses debugging ini dilakukan secara komprehensif terhadap aplikasi web Dashboard Transparansi Anggaran & E-Budgeting APBD Provinsi Lampung. Aplikasi ini dibangun untuk memenuhi spesifikasi fungsional F1–F9 yang tercantum dalam Product Requirement Document (PRD) serta mematuhi standarisasi antarmuka dan interaksi pada sistem desain SKILL (apbd-lampung-design)."),
        createParagraph("Tujuan utama dari pengujian ini adalah:"),
        createParagraph("a. Memverifikasi seluruh logika kalkulasi anggaran agar 100% akurat tanpa kehilangan presisi numerik."),
        createParagraph("b. Menemukan dan mendiagnosis bug, kekeliruan fungsional, dan batasan implementasi awal hasil 'vibe coding'."),
        createParagraph("c. Menguji keandalan sistem dalam menangani skenario batas (edge cases) seperti pembagian nol, nilai realisasi melebihi alokasi, berkas unggahan rusak, dan data bernilai negatif."),
        createParagraph("d. Memastikan kompatibilitas tampilan responsif (mobile viewport ~390px dan desktop >=1280px) serta pemenuhan atribut aksesibilitas WCAG dasar."),

        // BAB 2: METODOLOGI PENGUJIAN
        createHeading("2. Metodologi dan Lingkungan Pengujian", HeadingLevel.HEADING_1),
        createParagraph("Pengujian dilakukan menggunakan pendekatan Black-Box Testing yang dikombinasikan dengan Boundary Value Analysis (BVA) dan Equivalence Partitioning (EP):"),
        createParagraph("1. Functional & Integration Testing: Pengujian terhadap alur kerja end-to-end (penelusuran hierarki, filter data, impor berkas CSV, siklus versi draft-published-retracted, dan pencatatan audit log)."),
        createParagraph("2. Boundary Value Analysis: Pengujian batas minimum alokasi (alokasi = 0), batas serapan (0%, 50%, 70%, 80%, 100%, dan >100%), serta penanganan nilai uang bertipe numerik desimal."),
        createParagraph("3. Cross-Browser & Responsiveness Testing: Pengujian antarmuka pada mesin peramban Chromium (Google Chrome, Microsoft Edge) dan Gecko (Mozilla Firefox) dengan resolusi desktop 1920x1080, laptop 1366x768, dan layar ponsel iPhone/Android 390x844."),

        // BAB 3: TEMUAN DEFECT / BUG HASIL VIBE CODING
        createHeading("3. Analisis Temuan Defect dan Bug pada Hasil Vibe Coding Awal", HeadingLevel.HEADING_1),
        createParagraph("Berdasarkan pengujian awal terhadap kode antarmuka hasil vibe coding tahap pertama, diidentifikasi sejumlah 8 (delapan) isu kritis dan fungsional yang memerlukan debugging dan perbaikan:"),
        
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                createCell("ID Bug", true, AlignmentType.CENTER, 10, "1B5E20", "FFFFFF"),
                createCell("Modul / Fitur", true, AlignmentType.LEFT, 20, "1B5E20", "FFFFFF"),
                createCell("Deskripsi Isu / Defect Awal", true, AlignmentType.LEFT, 40, "1B5E20", "FFFFFF"),
                createCell("Tingkat Keparahan", true, AlignmentType.CENTER, 15, "1B5E20", "FFFFFF"),
                createCell("Dampak PRD / Skill", true, AlignmentType.LEFT, 15, "1B5E20", "FFFFFF")
              ]
            }),
            new TableRow({
              children: [
                createCell("BUG-01", true, AlignmentType.CENTER, 10),
                createCell("F4: Impor Berkas", false, AlignmentType.LEFT, 20),
                createCell("Dropzone hanya memicu pesan toast simulasi statis. Sistem tidak benar-benar membaca file CSV lokal pengguna menggunakan FileReader API dan tidak melakukan parsing baris data secara dinamis.", false, AlignmentType.LEFT, 40),
                createCell("KRITIS", true, AlignmentType.CENTER, 15, "FFDAD6", "BA1A1A"),
                createCell("PRD FR4.3, FR4.4", false, AlignmentType.LEFT, 15)
              ]
            }),
            new TableRow({
              children: [
                createCell("BUG-02", true, AlignmentType.CENTER, 10),
                createCell("F1: Kalkulasi Serapan", false, AlignmentType.LEFT, 20),
                createCell("Ketika pagu alokasi bernilai 0 (nol), rumus persentase menghasilkan nilai NaN% atau Infinity%, berpotensi memicu error antarmuka pengguna.", false, AlignmentType.LEFT, 40),
                createCell("TINGGI", true, AlignmentType.CENTER, 15, "FFDAD6", "BA1A1A"),
                createCell("PRD 8.1 (Edge Case 1)", false, AlignmentType.LEFT, 15)
              ]
            }),
            new TableRow({
              children: [
                createCell("BUG-03", true, AlignmentType.CENTER, 10),
                createCell("F3: Tabel Anggaran", false, AlignmentType.LEFT, 20),
                createCell("Fungsi sortTable yang diamanatkan pada panduan SKILL Bagian 9 belum terpasang pada header kolom tabel sehingga pengguna tidak dapat mengurutkan data berdasarkan nama atau nominal.", false, AlignmentType.LEFT, 40),
                createCell("SEDANG", true, AlignmentType.CENTER, 15, "FFDDB5", "835400"),
                createCell("Skill Bagian 9", false, AlignmentType.LEFT, 15)
              ]
            }),
            new TableRow({
              children: [
                createCell("BUG-04", true, AlignmentType.CENTER, 10),
                createCell("F4: Template Berkas", false, AlignmentType.LEFT, 20),
                createCell("Belum tersedia tombol untuk mengunduh berkas template resmi CSV untuk diisi oleh analis Bappeda.", false, AlignmentType.LEFT, 40),
                createCell("SEDANG", true, AlignmentType.CENTER, 15, "FFDDB5", "835400"),
                createCell("PRD FR4.2", false, AlignmentType.LEFT, 15)
              ]
            }),
            new TableRow({
              children: [
                createCell("BUG-05", true, AlignmentType.CENTER, 10),
                createCell("F7: Ambang Serapan", false, AlignmentType.LEFT, 20),
                createCell("Kontrol slider interaktif (accent-primary) untuk mengatur batas ambang serapan rendah secara dinamis belum tersedia pada tampilan dashboard analis.", false, AlignmentType.LEFT, 40),
                createCell("SEDANG", true, AlignmentType.CENTER, 15, "FFDDB5", "835400"),
                createCell("PRD FR7.4 & Skill 6", false, AlignmentType.LEFT, 15)
              ]
            }),
            new TableRow({
              children: [
                createCell("BUG-06", true, AlignmentType.CENTER, 10),
                createCell("UI/UX: Mobile Nav", false, AlignmentType.LEFT, 20),
                createCell("Navigasi bottom bar pada layar ponsel tidak memperbarui penanda kelas aktif (text-primary) saat tab tampilan berpindah.", false, AlignmentType.LEFT, 40),
                createCell("RENDAH", true, AlignmentType.CENTER, 15, "E5E2E1"),
                createCell("Skill Bagian 5b", false, AlignmentType.LEFT, 15)
              ]
            }),
            new TableRow({
              children: [
                createCell("BUG-07", true, AlignmentType.CENTER, 10),
                createCell("F1/F2: Over-budget", false, AlignmentType.LEFT, 20),
                createCell("Realisasi di atas 100% belum membatasi bar grafis pada posisi 100% dan penanda sisa anggaran negatif (-Rp ...) belum menggunakan format warna kontras merah.", false, AlignmentType.LEFT, 40),
                createCell("TINGGI", true, AlignmentType.CENTER, 15, "FFDAD6", "BA1A1A"),
                createCell("PRD 8.2 & Skill 3", false, AlignmentType.LEFT, 15)
              ]
            }),
            new TableRow({
              children: [
                createCell("BUG-08", true, AlignmentType.CENTER, 10),
                createCell("Aksesibilitas (WCAG)", false, AlignmentType.LEFT, 20),
                createCell("Tombol aksi hanya berbasis ikon tanpa atribut aria-label, dan tabel data belum menggunakan atribut scope='col' pada header th.", false, AlignmentType.LEFT, 40),
                createCell("RENDAH", true, AlignmentType.CENTER, 15, "E5E2E1"),
                createCell("Skill Bagian 10", false, AlignmentType.LEFT, 15)
              ]
            })
          ]
        }),

        new Paragraph({ spacing: { before: 200, after: 100 }, children: [] }),

        // BAB 4: TINDAKAN DEBUGGING
        createHeading("4. Tindakan Debugging dan Solusi Rekayasa Kode", HeadingLevel.HEADING_1),
        createParagraph("Sebagai tindak lanjut dari temuan defect tersebut, dilakukan langkah-langkah refactoring dan perbaikan kode secara menyeluruh pada index.html:"),
        createParagraph("1. Penanganan BUG-01 (Real File Parser): Mengimplementasikan pembacaan berkas menggunakan FileReader() dengan dukungan pemisah titik koma (;) maupun koma (,). Sistem membaca setiap baris, mengecek keberadaan kode rekening dan nominal, serta mengidentifikasi nilai negatif. Jika ditemukan baris galat (contoh realisasi negatif), baris otomatis diberi penanda latar #FEE2E2 dan badge merah 'Galat', sementara tombol 'Simpan Draft' otomatis terkunci."),
        createParagraph("2. Penanganan BUG-02 (Division by Zero Guard): Menyematkan validasi matematis: jika alokasi bernilai 0 atau kurang, persentase serapan dikembalikan sebagai teks 'n/a' dan badge netral tanpa memicu error kalkulasi."),
        createParagraph("3. Penanganan BUG-03 (Interactive Table Sorting): Mengembangkan fungsi JavaScript sortTable(tableId, colIndex, isNumeric) yang mendukung pengurutan naik (ascending) dan turun (descending) dengan indikator visual panah aktif pada header tabel."),
        createParagraph("4. Penanganan BUG-04 (Download Template CSV): Menyediakan fungsi downloadTemplateCSV() yang menghasilkan file template resmi 'Template_Unggah_APBD_Lampung.csv' dengan standar kolom DPA Bappeda yang siap digunakan pengguna."),
        createParagraph("5. Penanganan BUG-05 (Threshold Slider Control): Membangun panel konfigurasi ambang batas serapan interaktif dengan input angka sinkron dan slider aksen hijau hutan (accent-primary) yang langsung memperbarui batas evaluasi serapan."),
        createParagraph("6. Penanganan BUG-06 (Mobile Bottom Nav Sync): Memperbarui fungsi switchView() agar melakukan iterasi pada elemen navigasi mobile dan menerapkan penanda aktif text-primary serta reset text-on-surface-variant pada menu yang tidak aktif."),
        createParagraph("7. Penanganan BUG-07 (Over-budget Clamping): Mengimplementasikan aturan pembatasan visual lebar bar progress: Math.min(100, persen)% serta memformat sisa anggaran menjadi negatif dengan indikator teks merah jika realisasi > alokasi."),
        createParagraph("8. Penanganan BUG-08 (Accessibility Attributes): Menambahkan aria-label pada seluruh tombol aksi ikonik dan menambahkan scope='col' pada seluruh th tabel data sesuai standar WCAG 2.1."),

        // BAB 5: MATRIKS TEST CASE
        createHeading("5. Matriks Kasus Uji Fungsional Lengkap (20 Kasus Uji)", HeadingLevel.HEADING_1),
        createParagraph("Berikut adalah hasil pengujian regresi menyeluruh setelah seluruh perbaikan diterapkan:"),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                createCell("No", true, AlignmentType.CENTER, 6, "1B5E20", "FFFFFF"),
                createCell("Kasus Uji (Test Case)", true, AlignmentType.LEFT, 24, "1B5E20", "FFFFFF"),
                createCell("Skenario Input & Aksi", true, AlignmentType.LEFT, 28, "1B5E20", "FFFFFF"),
                createCell("Hasil yang Diharapkan", true, AlignmentType.LEFT, 28, "1B5E20", "FFFFFF"),
                createCell("Hasil Akhir", true, AlignmentType.CENTER, 14, "1B5E20", "FFFFFF")
              ]
            }),
            new TableRow({
              children: [
                createCell("TC-01", true, AlignmentType.CENTER, 6),
                createCell("Tampilan KPI Utama (F1)", false, AlignmentType.LEFT, 24),
                createCell("Buka halaman beranda publik", false, AlignmentType.LEFT, 28),
                createCell("Pagu Rp 8,15 T, Realisasi Rp 5,75 T, Sisa Rp 2,41 T, Serapan 70,50% tampil akurat", false, AlignmentType.LEFT, 28),
                createCell("PASSED", true, AlignmentType.CENTER, 14, "ACF4A4", "00450D")
              ]
            }),
            new TableRow({
              children: [
                createCell("TC-02", true, AlignmentType.CENTER, 6),
                createCell("Gauge Serapan SVG (F1)", false, AlignmentType.LEFT, 24),
                createCell("Verifikasi posisi jarum gauge", false, AlignmentType.LEFT, 28),
                createCell("Jarum menunjuk busur emas (50-70%) dengan status 'Waspada'", false, AlignmentType.LEFT, 28),
                createCell("PASSED", true, AlignmentType.CENTER, 14, "ACF4A4", "00450D")
              ]
            }),
            new TableRow({
              children: [
                createCell("TC-03", true, AlignmentType.CENTER, 6),
                createCell("Hierarki Anggaran (F2)", false, AlignmentType.LEFT, 24),
                createCell("Klik tombol ekspansi kegiatan", false, AlignmentType.LEFT, 28),
                createCell("Sub kegiatan terbuka berjenjang (pl-4, pl-10, pl-16) tanpa lag", false, AlignmentType.LEFT, 28),
                createCell("PASSED", true, AlignmentType.CENTER, 14, "ACF4A4", "00450D")
              ]
            }),
            new TableRow({
              children: [
                createCell("TC-04", true, AlignmentType.CENTER, 6),
                createCell("Filter Cepat OPD (F2)", false, AlignmentType.LEFT, 24),
                createCell("Pilih chip 'Dinas BMBK'", false, AlignmentType.LEFT, 28),
                createCell("Hanya program dan kegiatan Dinas BMBK yang ditampilkan di tabel", false, AlignmentType.LEFT, 28),
                createCell("PASSED", true, AlignmentType.CENTER, 14, "ACF4A4", "00450D")
              ]
            }),
            new TableRow({
              children: [
                createCell("TC-05", true, AlignmentType.CENTER, 6),
                createCell("Pencarian Kata Kunci (F3)", false, AlignmentType.LEFT, 24),
                createCell("Ketik 'Jalan' pada input cari", false, AlignmentType.LEFT, 28),
                createCell("Daftar terfilter menampilkan program rekonstruksi jalan provinsi", false, AlignmentType.LEFT, 28),
                createCell("PASSED", true, AlignmentType.CENTER, 14, "ACF4A4", "00450D")
              ]
            }),
            new TableRow({
              children: [
                createCell("TC-06", true, AlignmentType.CENTER, 6),
                createCell("Ekspor Berkas CSV (F3)", false, AlignmentType.LEFT, 24),
                createCell("Klik tombol 'Ekspor Data (CSV)'", false, AlignmentType.LEFT, 28),
                createCell("File CSV terunduh dengan UTF-8 BOM, pemisah titik koma, & metadata lengkap", false, AlignmentType.LEFT, 28),
                createCell("PASSED", true, AlignmentType.CENTER, 14, "ACF4A4", "00450D")
              ]
            }),
            new TableRow({
              children: [
                createCell("TC-07", true, AlignmentType.CENTER, 6),
                createCell("Unduh Template CSV (F4)", false, AlignmentType.LEFT, 24),
                createCell("Klik tombol 'Unduh Format Template'", false, AlignmentType.LEFT, 28),
                createCell("File Template_Unggah_APBD_Lampung.csv otomatis terunduh", false, AlignmentType.LEFT, 28),
                createCell("PASSED", true, AlignmentType.CENTER, 14, "ACF4A4", "00450D")
              ]
            }),
            new TableRow({
              children: [
                createCell("TC-08", true, AlignmentType.CENTER, 6),
                createCell("Validasi Baris Negatif (F4)", false, AlignmentType.LEFT, 24),
                createCell("Unggah CSV dengan realisasi -15 M", false, AlignmentType.LEFT, 28),
                createCell("Baris disorot merah #FEE2E2, badge Galat aktif, tombol simpan terkunci", false, AlignmentType.LEFT, 28),
                createCell("PASSED", true, AlignmentType.CENTER, 14, "ACF4A4", "00450D")
              ]
            }),
            new TableRow({
              children: [
                createCell("TC-09", true, AlignmentType.CENTER, 6),
                createCell("Perbaikan Baris Galat (F4)", false, AlignmentType.LEFT, 24),
                createCell("Klik 'Perbaiki Otomatis Baris 103'", false, AlignmentType.LEFT, 28),
                createCell("Baris menjadi valid hijau, tombol 'Simpan Draft' menjadi aktif", false, AlignmentType.LEFT, 28),
                createCell("PASSED", true, AlignmentType.CENTER, 14, "ACF4A4", "00450D")
              ]
            }),
            new TableRow({
              children: [
                createCell("TC-10", true, AlignmentType.CENTER, 6),
                createCell("Otorisasi Publikasi (F5)", false, AlignmentType.LEFT, 24),
                createCell("Klik publikasi versi draft v2.5.0", false, AlignmentType.LEFT, 28),
                createCell("Modal konfirmasi muncul dengan rincian hash SHA-256 dan dampak sistem", false, AlignmentType.LEFT, 28),
                createCell("PASSED", true, AlignmentType.CENTER, 14, "ACF4A4", "00450D")
              ]
            }),
            new TableRow({
              children: [
                createCell("TC-11", true, AlignmentType.CENTER, 6),
                createCell("Penarikan Data Publik (F5)", false, AlignmentType.LEFT, 24),
                createCell("Tarik data tanpa isi alasan", false, AlignmentType.LEFT, 28),
                createCell("Sistem memblokir penarikan dan mewajibkan pengisian alasan audit log", false, AlignmentType.LEFT, 28),
                createCell("PASSED", true, AlignmentType.CENTER, 14, "ACF4A4", "00450D")
              ]
            }),
            new TableRow({
              children: [
                createCell("TC-12", true, AlignmentType.CENTER, 6),
                createCell("Audit Log Append-Only (F8)", false, AlignmentType.LEFT, 24),
                createCell("Periksa halaman audit log", false, AlignmentType.LEFT, 28),
                createCell("Log tersaji permanen dengan waktu WIB+UTC dan tanpa tombol edit/hapus", false, AlignmentType.LEFT, 28),
                createCell("PASSED", true, AlignmentType.CENTER, 14, "ACF4A4", "00450D")
              ]
            }),
            new TableRow({
              children: [
                createCell("TC-13", true, AlignmentType.CENTER, 6),
                createCell("Form Langganan Email (F7)", false, AlignmentType.LEFT, 24),
                createCell("Kirim form surel warga@gmail.com", false, AlignmentType.LEFT, 28),
                createCell("Notifikasi konfirmasi toast muncul dan data surel terdaftar aman", false, AlignmentType.LEFT, 28),
                createCell("PASSED", true, AlignmentType.CENTER, 14, "ACF4A4", "00450D")
              ]
            }),
            new TableRow({
              children: [
                createCell("TC-14", true, AlignmentType.CENTER, 6),
                createCell("Berhenti Langganan (F7)", false, AlignmentType.LEFT, 24),
                createCell("Klik link unsub di preview email", false, AlignmentType.LEFT, 28),
                createCell("Modal berhenti langganan 1 klik terbuka dan berhasil dieksekusi", false, AlignmentType.LEFT, 28),
                createCell("PASSED", true, AlignmentType.CENTER, 14, "ACF4A4", "00450D")
              ]
            }),
            new TableRow({
              children: [
                createCell("TC-15", true, AlignmentType.CENTER, 6),
                createCell("Layar Login Split-Screen (F6)", false, AlignmentType.LEFT, 24),
                createCell("Buka form login dan toggle sandi", false, AlignmentType.LEFT, 28),
                createCell("Karakter sandi terlihat/tersembunyi bergantian dengan aman", false, AlignmentType.LEFT, 28),
                createCell("PASSED", true, AlignmentType.CENTER, 14, "ACF4A4", "00450D")
              ]
            }),
            new TableRow({
              children: [
                createCell("TC-16", true, AlignmentType.CENTER, 6),
                createCell("Halaman Empty State (Skill 7)", false, AlignmentType.LEFT, 24),
                createCell("Buka tampilan empty state", false, AlignmentType.LEFT, 28),
                createCell("Menampilkan status 'Data Belum Tersedia' dan timeline 3 fase", false, AlignmentType.LEFT, 28),
                createCell("PASSED", true, AlignmentType.CENTER, 14, "ACF4A4", "00450D")
              ]
            }),
            new TableRow({
              children: [
                createCell("TC-17", true, AlignmentType.CENTER, 6),
                createCell("Halaman Error Tanpa Angka (Skill 7)", false, AlignmentType.LEFT, 24),
                createCell("Buka tampilan error gangguan", false, AlignmentType.LEFT, 28),
                createCell("Murni kualitatif, 0 angka (bebas dari kode HTTP 500/404 atau countdown)", false, AlignmentType.LEFT, 28),
                createCell("PASSED", true, AlignmentType.CENTER, 14, "ACF4A4", "00450D")
              ]
            }),
            new TableRow({
              children: [
                createCell("TC-18", true, AlignmentType.CENTER, 6),
                createCell("Dual Logo Institusional (F9)", false, AlignmentType.LEFT, 24),
                createCell("Periksa header di desktop & ponsel", false, AlignmentType.LEFT, 28),
                createCell("Logo Pemprov Lampung di kiri & Teknokrat di kanan tetap stabil dan presisi", false, AlignmentType.LEFT, 28),
                createCell("PASSED", true, AlignmentType.CENTER, 14, "ACF4A4", "00450D")
              ]
            }),
            new TableRow({
              children: [
                createCell("TC-19", true, AlignmentType.CENTER, 6),
                createCell("Footer Hak Cipta Statis (F9)", false, AlignmentType.LEFT, 24),
                createCell("Periksa teks copyright di dasar halaman", false, AlignmentType.LEFT, 28),
                createCell("Teks persis: 'Copyright © 2026 by Rafly Iqbal Maulana dan Dr. Erliyan Redy Susanto, M.Kom'", false, AlignmentType.LEFT, 28),
                createCell("PASSED", true, AlignmentType.CENTER, 14, "ACF4A4", "00450D")
              ]
            }),
            new TableRow({
              children: [
                createCell("TC-20", true, AlignmentType.CENTER, 6),
                createCell("Sort Kolom Tabel Interaktif (F3)", false, AlignmentType.LEFT, 24),
                createCell("Klik header 'Pagu Alokasi'", false, AlignmentType.LEFT, 28),
                createCell("Baris terurut descending/ascending berdasarkan nominal numerik", false, AlignmentType.LEFT, 28),
                createCell("PASSED", true, AlignmentType.CENTER, 14, "ACF4A4", "00450D")
              ]
            })
          ]
        }),

        new Paragraph({ spacing: { before: 200, after: 100 }, children: [] }),

        // BAB 6: KESIMPULAN
        createHeading("6. Kesimpulan Hasil Testing & Debugging", HeadingLevel.HEADING_1),
        createParagraph("Dari 20 skenario pengujian fungsional dan uji batas yang dijalankan, seluruhnya telah berhasil diselesaikan dengan hasil 100% PASSED pasca debugging. Kode antarmuka web telah terbukti stabil, tidak mengalami error pembagian nol, mampu memvalidasi file CSV nyata di peramban, serta mematuhi seluruh aturan institusional Pemerintah Provinsi Lampung dan Universitas Teknokrat Indonesia.")
      ]
    }
  ]
});

Packer.toBuffer(doc).then((buffer) => {
  const outputPath = path.join(__dirname, '..', 'LAPORAN_TESTING_DAN_DEBUGGING.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Laporan Testing & Debugging berhasil dibuat: ${outputPath}`);
});
