const fs = require('fs');
const path = require('path');
const { 
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
  HeadingLevel, BorderStyle, WidthType, AlignmentType, ShadingType 
} = require('docx');

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
              text: "LAPORAN AUDIT KEAMANAN SISTEM & KERENTANAN",
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
              text: "Dashboard Transparansi Anggaran & E-Budgeting APBD Provinsi Lampung",
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
              text: "Audit Keamanan Aplikasi Web, Analisis Celah Eksploitasi OWASP, & Panduan Remediasi\nUjian Tengah Semester (UTS) Perancangan Perangkat Lunak & Sistem Informasi (PPSI)",
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
                createCell("Nama Auditor / Mahasiswa", true, AlignmentType.LEFT, 30, "F0EDED"),
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
                createCell("Institusi Pengelola Sistem", true, AlignmentType.LEFT, 30, "F0EDED"),
                createCell("Bappeda Provinsi Lampung", false, AlignmentType.LEFT, 70)
              ]
            }),
            new TableRow({
              children: [
                createCell("Standar Acuan Audit", true, AlignmentType.LEFT, 30, "F0EDED"),
                createCell("OWASP Top 10 (2021), NIST SP 800-115, & Pedoman Keamanan BSSN", false, AlignmentType.LEFT, 70)
              ]
            }),
            new TableRow({
              children: [
                createCell("Tanggal Audit", true, AlignmentType.LEFT, 30, "F0EDED"),
                createCell("10 November 2026", false, AlignmentType.LEFT, 70)
              ]
            })
          ]
        }),

        new Paragraph({ spacing: { before: 300, after: 100 }, children: [] }),

        // BAB 1: PENDAHULUAN
        createHeading("1. Ruang Lingkup dan Metodologi Audit Keamanan", HeadingLevel.HEADING_1),
        createParagraph("Audit keamanan ini dilakukan secara independen terhadap sistem web Dashboard Transparansi Anggaran & E-Budgeting APBD Provinsi Lampung. Karena sistem ini mengelola data anggaran publik dan memfasilitasi pertukaran berkas antara internal Bappeda dan masyarakat luas, jaminan keamanan informasi, integritas data numerik, dan kerahasiaan sesi pengguna merupakan kebutuhan mutlak."),
        createParagraph("Cakupan audit meliputi:"),
        createParagraph("a. Analisis kerentanan injeksi sisi klien (Cross-Site Scripting / XSS)."),
        createParagraph("b. Analisis keamanan berkas keluaran data terbuka terhadap eksploitasi Formula Injection (CSV Injection)."),
        createParagraph("c. Evaluasi kebijakan keamanan peramban melalui Content Security Policy (CSP) dan HTTP Security Headers."),
        createParagraph("d. Validasi integritas berkas masukan (File Upload Validation & SHA-256 Hashing)."),
        createParagraph("e. Penilaian batas otorisasi peran (Role-Based Access Control / RBAC) dan ketahanan audit log terhadap manipulasi."),

        // BAB 2: MATRIKS KERENTANAN
        createHeading("2. Matriks Temuan Kerentanan dan Skor Risiko (CVSS v3.1)", HeadingLevel.HEADING_1),
        createParagraph("Berdasarkan evaluasi terhadap kode antarmuka dan konfigurasi server, ditemukan 6 (enam) potensi celah keamanan yang diklasifikasikan berdasarkan tingkat keparahan CVSS v3.1:"),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                createCell("ID Kerentanan", true, AlignmentType.CENTER, 12, "1B5E20", "FFFFFF"),
                createCell("Kategori OWASP", true, AlignmentType.LEFT, 20, "1B5E20", "FFFFFF"),
                createCell("Deskripsi Celah Keamanan", true, AlignmentType.LEFT, 36, "1B5E20", "FFFFFF"),
                createCell("CVSS", true, AlignmentType.CENTER, 10, "1B5E20", "FFFFFF"),
                createCell("Level Risiko", true, AlignmentType.CENTER, 12, "1B5E20", "FFFFFF"),
                createCell("Status Remediasi", true, AlignmentType.CENTER, 10, "1B5E20", "FFFFFF")
              ]
            }),
            new TableRow({
              children: [
                createCell("SEC-01", true, AlignmentType.CENTER, 12),
                createCell("A03:2021-Injection", false, AlignmentType.LEFT, 20),
                createCell("DOM-based Cross-Site Scripting (XSS) pada fungsi render tabel pencarian akibat penggunaan langsung properti innerHTML tanpa sanitasi entitas HTML.", false, AlignmentType.LEFT, 36),
                createCell("7.5", true, AlignmentType.CENTER, 10),
                createCell("HIGH", true, AlignmentType.CENTER, 12, "FFDAD6", "BA1A1A"),
                createCell("FIXED", true, AlignmentType.CENTER, 10, "ACF4A4", "00450D")
              ]
            }),
            new TableRow({
              children: [
                createCell("SEC-02", true, AlignmentType.CENTER, 12),
                createCell("A03:2021-Injection", false, AlignmentType.LEFT, 20),
                createCell("CSV / Formula Injection (CWE-1236) pada fitur ekspor data anggaran jika nilai uraian akun diawali karakter formula (=, +, -, @).", false, AlignmentType.LEFT, 36),
                createCell("6.1", true, AlignmentType.CENTER, 10),
                createCell("MEDIUM", true, AlignmentType.CENTER, 12, "FFDDB5", "835400"),
                createCell("FIXED", true, AlignmentType.CENTER, 10, "ACF4A4", "00450D")
              ]
            }),
            new TableRow({
              children: [
                createCell("SEC-03", true, AlignmentType.CENTER, 12),
                createCell("A05:2021-Security Misconfiguration", false, AlignmentType.LEFT, 20),
                createCell("Absennya header Content-Security-Policy (CSP), Referrer-Policy, dan Permissions-Policy pada file konfigurasi vercel.json.", false, AlignmentType.LEFT, 36),
                createCell("5.3", true, AlignmentType.CENTER, 10),
                createCell("MEDIUM", true, AlignmentType.CENTER, 12, "FFDDB5", "835400"),
                createCell("FIXED", true, AlignmentType.CENTER, 10, "ACF4A4", "00450D")
              ]
            }),
            new TableRow({
              children: [
                createCell("SEC-04", true, AlignmentType.CENTER, 12),
                createCell("A08:2021-Software and Data Integrity Failures", false, AlignmentType.LEFT, 20),
                createCell("Ketiadaan validasi ukuran berkas maksimum (25MB) dan ekstensi whitelist (.csv, .xlsx) sebelum pemrosesan di sisi peramban.", false, AlignmentType.LEFT, 36),
                createCell("4.4", true, AlignmentType.CENTER, 10),
                createCell("MEDIUM", true, AlignmentType.CENTER, 12, "FFDDB5", "835400"),
                createCell("FIXED", true, AlignmentType.CENTER, 10, "ACF4A4", "00450D")
              ]
            }),
            new TableRow({
              children: [
                createCell("SEC-05", true, AlignmentType.CENTER, 12),
                createCell("A08:2021-Data Integrity", false, AlignmentType.LEFT, 20),
                createCell("Hash SHA-256 pada draft versi sebelumnya dihasilkan secara acak statis dan belum dihitung secara kriptografis dari byte berkas asli.", false, AlignmentType.LEFT, 36),
                createCell("3.7", true, AlignmentType.CENTER, 10),
                createCell("LOW", true, AlignmentType.CENTER, 12, "E5E2E1"),
                createCell("FIXED", true, AlignmentType.CENTER, 10, "ACF4A4", "00450D")
              ]
            }),
            new TableRow({
              children: [
                createCell("SEC-06", true, AlignmentType.CENTER, 12),
                createCell("A01:2021-Broken Access Control", false, AlignmentType.LEFT, 20),
                createCell("Potensi pengambilalihan kontrol penarikan data publik tanpa catatan audit jika form konfirmasi tidak memvalidasi keberadaan alasan tertulis.", false, AlignmentType.LEFT, 36),
                createCell("5.8", true, AlignmentType.CENTER, 10),
                createCell("MEDIUM", true, AlignmentType.CENTER, 12, "FFDDB5", "835400"),
                createCell("FIXED", true, AlignmentType.CENTER, 10, "ACF4A4", "00450D")
              ]
            })
          ]
        }),

        new Paragraph({ spacing: { before: 200, after: 100 }, children: [] }),

        // BAB 3: DETAIL ANALISIS DAN TINDAKAN REMEDIASI
        createHeading("3. Uraian Rinci Kerentanan dan Tindakan Remediasi Kode", HeadingLevel.HEADING_1),
        
        createHeading("3.1 Penanganan DOM-based Cross-Site Scripting (SEC-01)", HeadingLevel.HEADING_2),
        createParagraph("• Deskripsi Bahaya: Jika pengguna mengunggah berkas CSV atau melakukan pencarian dengan string berbahaya seperti <script>alert(1)</script> atau <img src=x onerror=...>, string tersebut dirender langsung ke DOM melalui innerHTML, memungkinkan eksekusi script berbahaya pada konteks sesi analis."),
        createParagraph("• Solusi Remediasi: Mengimplementasikan fungsi sanitasi HTML universal escapeHTML(str) yang mengubah karakter berbahaya (&, <, >, \", ') menjadi entitas HTML aman sebelum dimasukkan ke dalam elemen antarmuka."),

        createHeading("3.2 Penanganan Formula Injection pada Ekspor CSV (SEC-02)", HeadingLevel.HEADING_2),
        createParagraph("• Deskripsi Bahaya: Penyerang dapat menyisipkan rumus DDE seperti =CMD|' /C calc'!A0 atau -2+3+cmd pada kolom nama program. Ketika staf Bappeda atau masyarakat membuka file CSV hasil ekspor di Microsoft Excel, Excel akan mengeksekusi rumus tersebut sebagai perintah sistem."),
        createParagraph("• Solusi Remediasi: Mengembangkan fungsi sanitizeCSVField(val) yang secara otomatis menambahkan karakter petik tunggal (') di awal teks jika kolom diawali dengan karakter =, +, -, @, \\t, atau \\r, serta mengapit string dalam tanda kutip ganda."),

        createHeading("3.3 Pengetatan Kebijakan Keamanan HTTP & CSP (SEC-03)", HeadingLevel.HEADING_2),
        createParagraph("• Deskripsi Bahaya: Tanpa header Content-Security-Policy (CSP), peramban rentan terhadap pemuatan skrip eksternal liar dan serangan clickjacking."),
        createParagraph("• Solusi Remediasi: Menambahkan meta CSP pada index.html dan memperbarui vercel.json dengan header keamanan lengkap:"),
        createParagraph("  - Content-Security-Policy: Membatasi eksekusi skrip hanya dari domain resmi CDN Tailwind, Google Fonts, dan inline scripts."),
        createParagraph("  - X-Frame-Options: DENY (Mencegah situs dibungkus dalam iframe / anti clickjacking)."),
        createParagraph("  - X-Content-Type-Options: nosniff (Mencegah MIME-type sniffing)."),
        createParagraph("  - Referrer-Policy: strict-origin-when-cross-origin (Melindungi privasi rujukan URL)."),
        createParagraph("  - Permissions-Policy: Memblokir akses kamera, mikrofon, dan geolokasi."),

        createHeading("3.4 Validasi Berkas & Kriptografi Integritas SHA-256 (SEC-04 & SEC-05)", HeadingLevel.HEADING_2),
        createParagraph("• Deskripsi Bahaya: Berkas unggahan tanpa batas ukuran dapat mengakibatkan serangan Denial of Service (memory exhaustion) pada peramban. Selain itu, hash berkas yang tidak valid gagal memenuhi standar verifikasi integritas audit log."),
        createParagraph("• Solusi Remediasi: Menambahkan pembatasan ukuran berkas (maks. 25MB) dan whitelist tipe berkas (.csv, .xlsx). Mengintegrasikan Web Cryptography API (crypto.subtle.digest('SHA-256', buffer)) untuk menghitung hash SHA-256 asli dari berkas masukan secara instan di peramban pengguna."),

        createHeading("3.5 Penegakan Kontrol Akses & Jejak Audit Penarikan (SEC-06)", HeadingLevel.HEADING_2),
        createParagraph("• Solusi Remediasi: Memastikan form modal penarikan data (retract) mewajibkan input alasan minimal 10 karakter, mencatat identitas aktor, IP address, dan timestamp UTC+WIB ke dalam log tabel audit yang bersifat append-only."),

        // BAB 4: KESIMPULAN
        createHeading("4. Kesimpulan Audit Keamanan", HeadingLevel.HEADING_1),
        createParagraph("Berdasarkan pengujian pasca remediasi, seluruh 6 celah keamanan yang teridentifikasi telah berhasil ditutup dan diperbaiki secara menyeluruh. Sistem Dashboard Transparansi APBD Provinsi Lampung kini memiliki postur keamanan yang kokoh, kebal terhadap injeksi skrip dan formula, memiliki kontrol integritas kriptografis yang valid, serta memenuhi kepatuhan standar keamanan data keterbukaan informasi publik Pemerintah Provinsi Lampung dan Universitas Teknokrat Indonesia.")
      ]
    }
  ]
});

Packer.toBuffer(doc).then((buffer) => {
  const outputPath = path.join(__dirname, '..', 'LAPORAN_SECURITY_AUDIT.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Laporan Security Audit berhasil dibuat: ${outputPath}`);
});
