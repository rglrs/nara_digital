import { ServiceItem } from '@/types';

export const servicesData: ServiceItem[] = [
  {
    number: '01',
    title: 'Web Development',
    tagline: 'Website responsif, portal bisnis, dan aplikasi web modern.',
    description:
      'Membangun aplikasi web performa tinggi yang dirancang sesuai alur kerja bisnis, cepat diakses dari berbagai perangkat, dan mudah dikelola.',
    examples: [
      'Company profiles & landing pages',
      'Admin dashboards & reporting',
      'Customer portals & self-service',
      'Custom web applications',
    ],
  },
  {
    number: '02',
    title: 'Business Systems',
    tagline: 'Digitalisasi alur kerja manual menjadi sistem yang terstruktur.',
    description:
      'Mengintegrasikan proses operasional seperti pencatatan transaksi, inventaris, reservasi, dan absensi ke dalam satu platform terpusat.',
    examples: [
      'Sistem manajemen operasional',
      'Sistem inventaris & stok barang',
      'Sistem pemesanan & booking',
      'Sistem penggajian & absensi',
    ],
  },
  {
    number: '03',
    title: 'Mobile Applications',
    tagline: 'Aplikasi mobile cross-platform untuk pengguna dan tim internal.',
    description:
      'Mengembangkan aplikasi mobile yang intuitif dan responsif dengan integrasi API backend yang cepat dan aman untuk sistem operasi Android dan iOS.',
    examples: [
      'Aplikasi layanan pelanggan',
      'Aplikasi produktivitas kerja',
      'Aplikasi pemantauan lapangan',
      'Integrasi notifikasi real-time',
    ],
  },
  {
    number: '04',
    title: 'UI/UX Design',
    tagline: 'Antarmuka terarah yang mengutamakan kemudahan navigasi.',
    description:
      'Merancang antarmuka bersih dan sistem alur pengguna (user flow) yang logis, memprioritaskan efisiensi pengguna dalam menyelesaikan tugas sehari-hari.',
    examples: [
      'Riset kebutuhan & wireframing',
      'Desain sistem desain (design system)',
      'Prototipe interaktif',
      'Audit kemudahan penggunaan (usability)',
    ],
  },
  {
    number: '05',
    title: 'Maintenance & Improvement',
    tagline: 'Pemeliharaan berkelanjutan dan peningkatan performa sistem.',
    description:
      'Menjaga keandalan perangkat lunak yang sudah berjalan di tahap produksi melalui pembaruan rutin, penambahan fitur baru, optimasi kecepatan, dan pemantauan bug.',
    examples: [
      'Pemantauan kesehatan server & database',
      'Pembaruan keamanan & dependensi',
      'Pengembangan fitur lanjutan',
      'Dukungan teknis dan troubleshooting',
    ],
  },
];
