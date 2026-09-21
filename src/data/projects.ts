import { Project } from '@/types';

export const projectsData: Project[] = [
  {
    id: 'vizada',
    slug: 'vizada',
    title: 'Vizada',
    category: 'Business Systems / Percetakan',
    shortDescription:
      'Sistem manajemen operasional terpadu untuk bisnis percetakan, menghubungkan alur penerimaan pesanan, kalkulasi biaya cetak, hingga pemantauan status produksi.',
    challenge:
      'Proses pemesanan cetak sering terkendala lambatnya estimasi biaya manual, pencatatan pesanan yang tercecer di chat, serta kesulitan melacak status pengerjaan secara akurat.',
    approach:
      'Merancang sistem alur kerja terpusat berbasis web yang menyatukan kalkulasi estimasi bahan otomatis, pelacakan proses produksi, dan manajemen database pelanggan.',
    solution:
      'Sistem manajemen percetakan terpusat berbasis web dengan kalkulasi biaya otomatis, alur status produksi transparan, dan database pelanggan yang terintegrasi.',
    keyFeatures: [
      {
        title: 'Kalkulasi Estimasi Biaya Otomatis',
        description: 'Perhitungan perkiraan biaya cetak berdasarkan spesifikasi bahan, ukuran, dan kuantitas pesanan secara instan.',
      },
      {
        title: 'Pelacakan Status Produksi',
        description: 'Memantau tahapan pengerjaan mulai dari pracetak, cetak, hingga finishing dan siap kirim secara transparan.',
      },
      {
        title: 'Manajemen Antrean Pesanan',
        description: 'Mengatur alur kerja harian tim produksi agar prioritas pekerjaan tertata rapi dan selesai tepat waktu.',
      },
      {
        title: 'Katalog Layanan & Spesifikasi',
        description: 'Menyimpan daftar standar produk cetak digital dan offset untuk mempermudah penginputan order.',
      },
      {
        title: 'Database Pelanggan & Riwayat',
        description: 'Rekam jejak pesanan tersimpan rapi untuk mempermudah pencatatan dan proses pemesanan berulang.',
      },
    ],
    technologies: ['Next.js', 'Prisma', 'Tailwind CSS', 'PostgreSQL'],
    image: '/images/vizada.png',
    featured: true,
    type: 'business-system',
    testimonial: {
      quote:
        'Sebelumnya antrean pesanan cetak dan hitung estimasi bahan sering tercecer di WhatsApp. Dengan sistem manajemen dari NARA, alur kerja dari pesanan masuk, kalkulasi biaya otomatis, sampai status cetak dan finishing terpantau jelas di satu layar.',
      clientName: 'Ziven',
      clientRole: 'Operasional & Bisnis',
      projectTitle: 'Vizada (Sistem Operasional Percetakan)',
    },
  },
  {
    id: 'shaman-os',
    slug: 'shaman-os',
    title: 'Shaman OS',
    category: 'Business Systems / ERP & HR',
    shortDescription:
      'Platform Enterprise Resource Planning (ERP) dan manajemen SDM terpusat untuk membantu perusahaan mengelola data pegawai, penggajian, dan operasional internal.',
    challenge:
      'Pengelolaan data karyawan, absensi, kalkulasi gaji, dan administrasi dokumen perusahaan yang terpisah-pisah di berbagai file rawan menimbulkan duplikasi dan kesalahan perhitungan.',
    approach:
      'Membangun sistem terintegrasi dengan pemisahan frontend yang cepat dan arsitektur backend aman, mengutamakan keandalan data dan otomasi alur administrasi.',
    solution:
      'Platform ERP internal yang mengonsolidasikan pencatatan kehadiran, otomasi rincian gaji, manajemen dokumen terpusat, dan dasbor aktivitas proyek dalam satu sistem aman.',
    keyFeatures: [
      {
        title: 'Manajemen Penggajian & Kehadiran',
        description: 'Rekapitulasi absensi otomatis yang terhubung langsung dengan kalkulasi rincian komponen gaji karyawan.',
      },
      {
        title: 'Dasbor Aktivitas & Operasional',
        description: 'Ringkasan visual aktivitas perusahaan harian untuk membantu pemantauan dan pengambilan keputusan manajemen.',
      },
      {
        title: 'Penyimpanan Dokumen Terpusat',
        description: 'Arsip digital berkas perusahaan yang terorganisir dengan sistem penyimpanan server yang aman.',
      },
      {
        title: 'Keamanan Berbasis Peran (Role-Based)',
        description: 'Pembatasan hak akses data sensitif sesuai departemen dan wewenang pengguna.',
      },
      {
        title: 'Arsitektur Sistem Skalabel',
        description: 'Dirancang untuk menampung pertumbuhan data operasional dan siap dikembangkan seiring ekspansi bisnis.',
      },
    ],
    technologies: ['Next.js', 'NestJS', 'TypeScript', 'Prisma', 'Docker'],
    image: '/images/shaman.png',
    featured: true,
    type: 'business-system',
    testimonial: {
      quote:
        'Sebelumnya rekap kehadiran tim, kalkulasi rincian gaji, dan arsip dokumen tersebar di banyak spreadsheet yang rawan selisih data. Shaman OS menyatukan administrasi SDM dan monitoring operasional harian kami ke dalam satu sistem yang rapi dan terpusat.',
      clientName: 'Labisal',
      clientRole: 'Operasional & Manajemen Tim',
      projectTitle: 'Shaman OS (Platform ERP & HR)',
    },
  },
  {
    id: 'tasca',
    slug: 'tasca',
    title: 'TASCA',
    category: 'Mobile Applications / Google Play Store',
    shortDescription:
      'Aplikasi mobile produktivitas harian yang memadukan manajemen tugas, pengatur waktu fokus, dan kalender terpadu. Berhasil dipublikasikan secara publik di Google Play Store dengan backend API berkinerja tinggi.',
    challenge:
      'Membangun aplikasi mobile mandiri yang mampu lolos standar rilis ketat Google Play Store, menjaga kestabilan performa cross-platform, serta menyediakan sinkronisasi backend yang cepat dan bebas latensi.',
    approach:
      'Mengembangkan aplikasi mobile Flutter dengan arsitektur REST API modular berbasis Go (Golang), menerapkan pipeline rilis aplikasi mobile hingga tahap produksi publik di Play Store.',
    solution:
      'Aplikasi mobile produktivitas yang berhasil dirilis di Google Play Store, menggabungkan To-Do list, timer Pomodoro, sinkronisasi kalender, serta backend Go yang ringan dan andal.',
    keyFeatures: [
      {
        title: 'Publikasi Google Play Store',
        description: 'Memenuhi seluruh standar teknis rilis produksi, compliance privasi, dan optimasi bundel aplikasi di Google Play Store.',
      },
      {
        title: 'Manajemen Tugas & Prioritas',
        description: 'Pengelompokan tugas harian dengan tenggat waktu dan status pengerjaan yang jelas.',
      },
      {
        title: 'Timer Sesi Fokus (Pomodoro)',
        description: 'Pengatur waktu terintegrasi untuk membantu fokus menyelesaikan target kerja tanpa distraksi.',
      },
      {
        title: 'Integrasi Kalender Harian',
        description: 'Tinjau agenda dan distribusi beban kerja mingguan dalam tampilan yang terstruktur dan nyaman dibaca.',
      },
      {
        title: 'Notifikasi Pengingat',
        description: 'Peringatan terjadwal agar aktivitas penting dan tenggat kerja tidak terlewat.',
      },
      {
        title: 'Sinkronisasi Cepat & Aman',
        description: 'Backend REST API dengan arsitektur modular untuk memastikan keandalan penyimpanan data pengguna.',
      },
    ],
    technologies: ['Flutter', 'Dart', 'Go (Golang)', 'Docker', 'REST API'],
    image: '/images/tasca.png',
    featured: true,
    type: 'mobile-app',
  },
  {
    id: 'sibuk-ceria',
    slug: 'sibuk-ceria',
    title: 'Sibuk Ceria',
    category: 'Education & Counseling / Web Platform',
    shortDescription:
      'Platform bimbingan dan konseling digital untuk sekolah yang memudahkan guru BK dan siswa dalam mengatur jadwal konsultasi, sesi temu, serta materi edukasi mandiri.',
    challenge:
      'Siswa sering merasa ragu atau canggung berkonsultasi langsung di ruang BK fisik, sementara guru BK kesulitan mengatur jadwal temu dan mengarsipkan catatan perkembangan siswa secara rapi.',
    approach:
      'Menghadirkan platform konseling sekolah yang ramah siswa, menjaga kerahasiaan sesi bimbingan, serta menyediakan modul edukasi mandiri yang terstruktur.',
    solution:
      'Platform konseling berbasis web yang menyediakan pemesanan jadwal temu mandiri, ruang konsultasi terenkripsi, modul asesmen, dan arsip riwayat bimbingan yang terstruktur.',
    keyFeatures: [
      {
        title: 'Pemesanan Jadwal Mandiri',
        description: 'Siswa dapat memilih jadwal konsultasi yang tersedia secara mandiri tanpa perlu antre atau merasa canggung.',
      },
      {
        title: 'Sesi Konsultasi Daring',
        description: 'Fasilitas komunikasi terintegrasi untuk sesi pendampingan siswa secara aman dan terjaga kerahasiaannya.',
      },
      {
        title: 'Dasbor Manajemen Guru BK',
        description: 'Pusat data bagi pengajar untuk mengelola agenda bimbingan dan catatan perkembangan siswa.',
      },
      {
        title: 'Modul Asesmen & Literasi Mandiri',
        description: 'Menyediakan materi pengembangan diri dan evaluasi mandiri yang mudah diakses siswa kapan saja.',
      },
      {
        title: 'Pencatatan Riwayat Terstruktur',
        description: 'Rekam jejak konseling tersimpan rapi untuk bahan evaluasi perkembangan siswa secara berkala.',
      },
    ],
    technologies: ['Laravel', 'Tailwind CSS', 'Livewire', 'Alpine.js'],
    image: '/images/sibuk-ceria.png',
    featured: false,
    type: 'web-app',
    testimonial: {
      quote:
        'Sistem konseling digital ini sangat memudahkan interaksi antara guru BK dan siswa. Siswa tidak lagi canggung menjadwalkan sesi bimbingan, kerahasiaan data terjamin aman, dan pengarsipan riwayat konseling jadi sangat terstruktur.',
      clientName: 'Umzah',
      clientRole: 'Inisiator & Pengelola Program',
      projectTitle: 'Sibuk Ceria (Platform Bimbingan & Konseling)',
    },
  },
  {
    id: 'tahfizh-app',
    slug: 'tahfizh-app',
    title: 'Tahfizh App',
    category: 'Education / Management System',
    shortDescription:
      'Sistem informasi pencatatan dan pemantauan hafalan santri/siswa secara terstruktur untuk lembaga pendidikan dan rumah tahfizh.',
    challenge:
      'Pencatatan setoran hafalan menggunakan buku manual rentan rusak atau hilang, dan menyulitkan pihak pengelola serta orang tua memantau capaian santri secara real-time.',
    approach:
      'Membangun portal web multi-peran dengan navigasi sederhana untuk memudahkan ustadz mencatat setoran dan orang tua melihat laporan capaian.',
    solution:
      'Aplikasi web manajemen tahfizh dengan akses multi-peran, rekapitulasi setoran harian dan murojaah, serta laporan progres santri yang transparan.',
    keyFeatures: [
      {
        title: 'Pencatatan Setoran & Murojaah',
        description: 'Input cepat capaian ayat, surat, dan juz santri setiap selesai sesi bimbingan harian.',
      },
      {
        title: 'Akses Multi-Peran',
        description: 'Hak akses khusus untuk pengelola lembaga, guru pembimbing, dan orang tua santri.',
      },
      {
        title: 'Laporan Progres Santri',
        description: 'Riwayat capaian santri tersaji dalam tampilan ringkas dan mudah dipahami orang tua.',
      },
      {
        title: 'Manajemen Data Santri & Kelas',
        description: 'Pengelompokan santri berdasarkan rombel atau tingkatan capaian hafalan.',
      },
      {
        title: 'Antarmuka Responsif',
        description: 'Desain web yang nyaman digunakan pembimbing langsung dari ponsel di ruang halaqah.',
      },
    ],
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'Tailwind CSS'],
    image: '/images/tahfizh.png',
    featured: false,
    type: 'web-app',
    testimonial: {
      quote:
        'Pencatatan setoran hafalan santri yang tadinya manual di buku fisik rawan hilang atau rusak, sekarang tersimpan rapi di web. Orang tua santri juga sangat terbantu karena bisa memantau progres hafalan dan murojaah anak secara transparan.',
      clientName: 'Candra',
      clientRole: 'Pengelola Lembaga',
      projectTitle: 'Tahfizh App (Sistem Monitoring Hafalan)',
    },
  },
  {
    id: 'mental-health-monitor',
    slug: 'mental-health-monitor',
    title: 'Mental Health Monitor',
    category: 'Healthcare / R&D Prototype',
    shortDescription:
      'Purwarupa riset dan eksplorasi analitik kesehatan mental berbasis web, mendemonstrasikan pengolahan dataset terstruktur dan visualisasi pola tren suasana hati.',
    challenge:
      'Mengeksplorasi representasi data fluktuasi suasana hati dan pemicu stres harian agar dapat diinterpretasikan secara intuitif oleh pengguna tanpa beban kognitif berlebih.',
    approach:
      'Merancang purwarupa Proof of Concept (PoC) yang menggabungkan pengolahan data Python dengan antarmuka interaktif yang bersih dan terstruktur.',
    solution:
      'Eksplorasi antarmuka riset mandiri (PoC) dengan kuesioner terstruktur, pemrosesan data analitik, dan visualisasi perkembangan kondisi pengguna.',
    keyFeatures: [
      {
        title: 'Proof of Concept (R&D Prototype)',
        description: 'Eksplorasi konsep pemrosesan dataset analitik dan pemetaan pola tren berbasis web.',
      },
      {
        title: 'Kuesioner Evaluasi Berkala',
        description: 'Instrumen refleksi diri yang terstruktur dan dapat diisi dengan cepat setiap hari.',
      },
      {
        title: 'Visualisasi Tren Riwayat',
        description: 'Grafik ringkas untuk melihat pola perkembangan suasana hati dari waktu ke waktu.',
      },
      {
        title: 'Pengelolaan Data Mandiri',
        description: 'Riwayat evaluasi tersimpan rapi untuk ditinjau kembali oleh pengguna.',
      },
      {
        title: 'Arsitektur Klien-Server Ringan',
        description: 'Pemisahan antarmuka pengguna dan pengolahan backend untuk menjaga kecepatan akses.',
      },
    ],
    technologies: ['JavaScript', 'Python', 'CSS', 'Web App'],
    image: '/images/mental-health.png',
    featured: false,
    type: 'web-app',
  },
];

