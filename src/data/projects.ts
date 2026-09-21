import { Project } from '@/types';

export const projectsData: Project[] = [
  {
    id: 'vizada',
    slug: 'vizada',
    title: 'Vizada',
    category: 'Business System / Percetakan',
    shortDescription:
      'Platform manajemen operasional digital yang dirancang khusus untuk menyederhanakan proses bisnis percetakan, mulai dari penerimaan pesanan hingga pengiriman akhir.',
    challenge:
      'Proses bisnis percetakan konvensional sering menghadapi kendala dalam pelacakan status pesanan, perhitungan estimasi biaya cetak yang lambat, dan koordinasi antardepartemen yang terfragmentasi.',
    approach:
      'Merancang sistem operasional terpusat berbasis web yang menghubungkan penerimaan order, estimasi kalkulasi biaya otomatis, alur kerja produksi, dan manajemen relasi pelanggan (CRM).',
    solution:
      'Aplikasi web terintegrasi yang memberikan transparansi status pesanan secara real-time kepada pelanggan dan efisiensi pelacakan produksi bagi tim operasional.',
    keyFeatures: [
      {
        title: 'Penerimaan Pesanan',
        description: 'Kelola dan lacak setiap pesanan pelanggan dari awal hingga akhir dalam satu alur kerja.',
      },
      {
        title: 'Estimasi Harga Otomatis',
        description: 'Hitung perkiraan biaya cetak berdasarkan spesifikasi bahan, ukuran, dan jumlah pesanan dengan cepat.',
      },
      {
        title: 'Pelacakan Status Produksi',
        description: 'Berikan transparansi status pengerjaan pesanan bagi tim produksi dan pelanggan secara berkala.',
      },
      {
        title: 'Katalog Layanan Digital',
        description: 'Tampilkan detail layanan cetak digital dan offset secara terorganisir dan mudah dipahami.',
      },
      {
        title: 'Manajemen Pelanggan (CRM)',
        description: 'Simpan dan kelola riwayat pesanan serta data pelanggan untuk membangun hubungan jangka panjang.',
      },
    ],
    technologies: ['Next.js', 'Prisma', 'Tailwind CSS', 'PostgreSQL'],
    image: '/images/vizada.png',
    featured: true,
    type: 'business-system',
  },
  {
    id: 'shaman-os',
    slug: 'shaman-os',
    title: 'Shaman OS',
    category: 'Enterprise ERP & HR / Business System',
    shortDescription:
      'Platform Enterprise Resource Planning (ERP) dan Human Resource (HR) komprehensif berbasis web untuk mengelola administrasi, data karyawan, dan operasional internal.',
    challenge:
      'Pengelolaan administrasi internal, absensi karyawan, kalkulasi gaji, dan koordinasi dokumen proyek yang terpisah menimbulkan duplikasi data dan risiko kesalahan kalkulasi manual.',
    approach:
      'Membangun sistem terintegrasi dengan pemisahan frontend yang cepat dan backend berskala enterprise, mengutamakan keamanan data dan keandalan pemrosesan.',
    solution:
      'Platform ERP dan HR modern yang menyatukan modul penggajian presisi, manajemen absensi, repositori dokumen aman, dan dasbor proyek terpadu.',
    keyFeatures: [
      {
        title: 'Manajemen Penggajian & Kehadiran',
        description: 'Sistem terintegrasi untuk melacak data kehadiran karyawan dan mengkalkulasi rincian gaji secara presisi.',
      },
      {
        title: 'Dasbor & Manajemen Proyek',
        description: 'Pusat kendali operasional untuk memantau aktivitas perusahaan serta modul khusus manajemen layanan proyek.',
      },
      {
        title: 'Sistem Manajemen Dokumen',
        description: 'Fasilitas penanganan berkas (file uploads) yang efisien dan terhubung langsung ke penyimpanan server terpusat.',
      },
      {
        title: 'Keamanan & Autentikasi',
        description: 'Mengamankan akses pengguna dengan sistem login berbasis enkripsi hash (Bcrypt) untuk melindungi data internal.',
      },
      {
        title: 'Arsitektur Fullstack Skalalel',
        description: 'Frontend responsif Next.js didukung backend enterprise NestJS, Prisma ORM, dan infrastruktur Docker.',
      },
    ],
    technologies: ['Next.js', 'NestJS', 'TypeScript', 'Prisma', 'Docker'],
    image: '/images/shaman.png',
    featured: true,
    type: 'business-system',
  },
  {
    id: 'tasca',
    slug: 'tasca',
    title: 'TASCA (Mobile App & API)',
    category: 'Mobile Application / Produktivitas & Backend',
    shortDescription:
      'Platform manajemen produktivitas harian komprehensif yang terdiri dari aplikasi mobile cross-platform dinamis dan didukung oleh arsitektur backend API yang tangguh serta skalabel.',
    challenge:
      'Banyak pengguna kesulitan menjaga fokus belajar atau bekerja ketika daftar tugas terpisah dari pengatur waktu sesi dan jadwal kalender.',
    approach:
      'Mengembangkan aplikasi mobile Flutter dengan antarmuka yang bersih dan interaktif, dipadukan dengan REST API Go (Golang) yang cepat dan berarsitektur berlapis.',
    solution:
      'Aplikasi mobile produktivitas yang menggabungkan To-Do list, timer Pomodoro, kalender terpadu, notifikasi pengingat, dan penyimpanan data terenkripsi.',
    keyFeatures: [
      {
        title: 'Manajemen Tugas & Waktu',
        description: 'Fitur To-Do List dan Timer Pomodoro terintegrasi untuk memaksimalkan fokus pengguna dalam menyelesaikan pekerjaan.',
      },
      {
        title: 'Sistem Autentikasi Aman',
        description: 'Dilengkapi API khusus untuk registrasi dan login guna menjaga keamanan data pengguna secara personal.',
      },
      {
        title: 'Sistem Notifikasi Terpusat',
        description: 'Dukungan backend untuk mengelola dan mengirimkan notifikasi aktivitas atau pengingat secara real-time.',
      },
      {
        title: 'Integrasi Kalender & Mode Gelap',
        description: 'Pemantauan jadwal yang mudah dibaca dengan antarmuka yang mendukung Dark Mode untuk kenyamanan mata.',
      },
      {
        title: 'Arsitektur Backend Skalalel',
        description: 'Backend dibangun menggunakan arsitektur layered (Controllers, Services, Repositories) dan terintegrasi dengan Docker.',
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
      'Aplikasi konseling digital untuk sekolah yang memudahkan guru Bimbingan Konseling (BK) dan siswa dalam menjalankan proses bimbingan, konsultasi, serta pengembangan diri.',
    challenge:
      'Siswa sering merasa sungkan berkonsultasi langsung di ruang BK sekolah, sementara guru BK membutuhkan sarana terpusat untuk menjadwalkan temu dan mencatat perkembangan siswa.',
    approach:
      'Menghadirkan platform konseling sekolah yang ramah siswa, menjaga kerahasiaan sesi bimbingan, serta menyediakan modul edukasi mandiri yang terstruktur.',
    solution:
      'Web app konseling dengan sistem booking jadwal otomatis, ruang temu daring (chat/video), modul assessment, dan arsip riwayat bimbingan siswa.',
    keyFeatures: [
      {
        title: 'Dasbor Layanan & Manajemen Siswa',
        description: 'Pusat kendali bagi guru BK untuk mengelola data siswa, jadwal konseling, dan melacak laporan perkembangan secara terpusat.',
      },
      {
        title: 'Konseling Jarak Jauh (Chat & Video)',
        description: 'Fitur komunikasi real-time dan panggilan video yang terintegrasi untuk sesi konsultasi online secara fleksibel.',
      },
      {
        title: 'Booking Jadwal Otomatis',
        description: 'Memungkinkan siswa untuk memesan jadwal konsultasi secara mandiri tanpa perlu antre atau merasa canggung.',
      },
      {
        title: 'Edukasi Mandiri & Modul Assessment',
        description: 'Menyediakan materi pengembangan diri, literasi digital, serta sistem bagi guru untuk memberikan evaluasi mandiri.',
      },
      {
        title: 'Catatan Riwayat & Rekomendasi Layanan',
        description: 'Sistem pencatatan riwayat komprehensif yang didukung rekomendasi layanan otomatis sesuai kebutuhan siswa.',
      },
    ],
    technologies: ['Laravel', 'Tailwind CSS', 'Livewire', 'Alpine.js'],
    image: '/images/sibuk-ceria.png',
    featured: false,
    type: 'web-app',
  },
  {
    id: 'tahfizh-app',
    slug: 'tahfizh-app',
    title: 'Tahfizh App',
    category: 'Education / Management System',
    shortDescription:
      'Platform manajemen program tahfizh berbasis web yang memudahkan pencatatan, pemantauan progres hafalan, serta evaluasi siswa secara digital dan terstruktur.',
    challenge:
      'Pencatatan hafalan menggunakan buku fisik rentan rusak atau hilang, dan menyulitkan wali santri memantau perkembangan hafalan harian secara praktis.',
    approach:
      'Membangun portal web multi-peran dengan navigasi sederhana untuk memudahkan ustadz mencatat setoran dan orang tua melihat laporan capaian.',
    solution:
      'Sistem pencatatan setoran hafalan dan murojaah berbasis web dengan hak akses bertingkat, rekapitulasi data siswa, dan antarmuka responsif.',
    keyFeatures: [
      {
        title: 'Pencatatan Hafalan & Murojaah',
        description: 'Lacak progres setoran hafalan harian dan pengulangan (murojaah) siswa dengan cepat dan akurat.',
      },
      {
        title: 'Sistem Multi-Peran (Role-Based)',
        description: 'Hak akses yang disesuaikan untuk Admin, Pengajar, dan Siswa/Wali untuk pengelolaan yang tertib.',
      },
      {
        title: 'Manajemen Data Siswa',
        description: 'Kelola informasi profil, capaian juz, dan riwayat akademik siswa tahfizh dalam satu dasbor.',
      },
      {
        title: 'Sistem Autentikasi Aman',
        description: 'Dilengkapi sistem login berbasis sesi/token dan perlindungan middleware untuk menjaga privasi data.',
      },
      {
        title: 'Antarmuka Responsif',
        description: 'Desain UI/UX modern yang mudah digunakan baik melalui smartphone maupun komputer desktop.',
      },
    ],
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'Tailwind CSS'],
    image: '/images/tahfizh.png',
    featured: false,
    type: 'web-app',
  },
  {
    id: 'mental-health-monitor',
    slug: 'mental-health-monitor',
    title: 'Mental Health Monitor',
    category: 'Health Tech / Web Application Concept',
    shortDescription:
      'Aplikasi web yang dirancang untuk membantu pengguna melacak dan memantau kondisi kesejahteraan mental mereka melalui sistem evaluasi berbasis data.',
    challenge:
      'Masyarakat sering kesulitan merefleksikan suasana hati dan tingkat stres harian tanpa adanya alat bantu evaluasi mandiri yang terstruktur.',
    approach:
      'Merancang purwarupa platform web yang menyajikan kuesioner evaluasi diri berkala dan visualisasi riwayat skor secara informatif (konsep perangkat lunak, bukan diagnosa medis).',
    solution:
      'Aplikasi web evaluasi mandiri dengan pengolahan dataset terstruktur, visualisasi riwayat perkembangan kondisi, dan pemisahan arsitektur client-server.',
    keyFeatures: [
      {
        title: 'Pemantauan & Evaluasi',
        description: 'Pengguna dapat melakukan pencatatan dan evaluasi berkala terkait kondisi kesejahteraan emosional harian.',
      },
      {
        title: 'Dasbor Profil & Hasil',
        description: 'Halaman khusus bagi pengguna untuk mengelola profil dan melihat riwayat hasil evaluasi sebelumnya dengan jelas.',
      },
      {
        title: 'Pengolahan Dataset',
        description: 'Terintegrasi dengan sistem backend untuk mengelola dataset evaluasi dan menghasilkan ringkasan visual yang informatif.',
      },
      {
        title: 'Arsitektur Client-Server',
        description: 'Dibangun menggunakan pemisahan frontend dan backend yang terstruktur untuk memastikan performa aplikasi yang optimal.',
      },
    ],
    technologies: ['JavaScript', 'Python', 'CSS', 'Web App'],
    image: '/images/mental-health.png',
    featured: false,
    type: 'web-app',
  },
];
