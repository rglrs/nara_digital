export type CarSize = 'small' | 'medium' | 'large' | 'luxury';

export interface CarSizeOption {
  id: CarSize;
  name: string;
  examples: string;
  factor: number;
}

export interface DetailingPackage {
  id: string;
  name: string;
  badge?: string;
  popular?: boolean;
  warranty: string;
  duration: string;
  basePrice: Record<CarSize, number>;
  description: string;
  features: string[];
  recommendedFor: string;
}

export interface WorkshopFacility {
  title: string;
  desc: string;
  iconName: string;
}

export interface DetailingTestimonial {
  name: string;
  car: string;
  location: string;
  packageUsed: string;
  rating: number;
  comment: string;
  date: string;
}

export const carSizeOptions: CarSizeOption[] = [
  {
    id: 'small',
    name: 'Small (City Car / Hatchback)',
    examples: 'Brio, Yaris, Jazz, Raize, Rocky, Agya, Ayla, Baleno',
    factor: 1.0
  },
  {
    id: 'medium',
    name: 'Medium (Sedan / Compact SUV)',
    examples: 'HR-V, Innova Zenix / Reborn, Civic, Corolla Cross, CX-5, Creta',
    factor: 1.25
  },
  {
    id: 'large',
    name: 'Large (Big SUV / 7-Seater)',
    examples: 'Fortuner, Pajero Sport, CR-V, Palisade, Everest, Ioniq 5',
    factor: 1.45
  },
  {
    id: 'luxury',
    name: 'Extra Large (Luxury MPV / Van)',
    examples: 'Alphard, Vellfire, Land Cruiser, Lexus LM, HiAce Premio, Defender',
    factor: 1.7
  }
];

export const defaultDetailingConfig = {
  defaultBrand: 'Apex Auto Detailing & Ceramic Coating',
  shortBrand: 'Apex Detailing',
  tagline: 'Perlindungan Cat Mobil Kilap Basah Maksimal & Bergaransi Resmi di Surabaya',
  address: 'Jl. Raya Menganti No. 250, Wiyung, Surabaya, Jawa Timur 60228',
  operatingHours: 'Senin - Sabtu: 08.30 - 17.30 WIB | Minggu: By Appointment',
  naraWaNumber: '6285602743489',
  googleRating: '4.9',
  reviewCount: '1.700+ Ulasan Puas',
  heroImage: '/images/demo/detailing-hero.jpg',
  coatingImage: '/images/demo/detailing-coating.jpg',
  interiorImage: '/images/demo/detailing-interior.jpg',
};

export const detailingPackages: DetailingPackage[] = [
  {
    id: 'paint-correction',
    name: 'Paint Correction & Deep Gloss (3-Step Polish)',
    badge: 'Penyegaran Cat Kusam',
    popular: false,
    warranty: 'Garansi Kilap 6 Bulan',
    duration: '1 - 2 Hari Pengerjaan',
    basePrice: {
      small: 1250000,
      medium: 1550000,
      large: 1850000,
      luxury: 2200000
    },
    description: 'Proses koreksi cat multi-tahap untuk menghilangkan baret halus (swirl mark), jamur bodi membandel (waterspot), dan oksidasi cat kusam. Mengembalikan kilap asli pabrik secara dramatis.',
    features: [
      'Cuci detail dekontaminasi bodi (Clay bar treatment)',
      '3-Step Compound, Polishing & Finishing paint correction',
      'Pembersihan jamur kaca & waterspot bodi',
      'Pembersihan velg & ruang mesin ringan (Engine bay dressing)',
      'Aplikasi Synthetic Paint Sealant pelindung kilap'
    ],
    recommendedFor: 'Mobil harian dengan cat kusam atau banyak baret halus akibat cuci sembarangan'
  },
  {
    id: 'ceramic-9h',
    name: 'Nano Ceramic Coating 9H (Double Layer)',
    badge: 'Paling Banyak Dipilih',
    popular: true,
    warranty: 'Garansi Resmi 2 Tahun',
    duration: '2 - 3 Hari Pengerjaan',
    basePrice: {
      small: 2800000,
      medium: 3500000,
      large: 4200000,
      luxury: 5000000
    },
    description: 'Pelapisan 2 layer cairan nano ceramic berteknologi tinggi dengan tingkat kekerasan 9H. Menghasilkan efek daun talas (hydrophobic) ekstrem dan efek kilap kaca basah (deep wet look) yang tahan lama.',
    features: [
      'Semua pengerjaan 3-Step Paint Correction menyeluruh',
      'Aplikasi 2 Layer Nano Ceramic Coating 9H pada seluruh bodi',
      'Efek daun talas (super hydrophobic), air dan kotoran tidak mudah menempel',
      'Proteksi dari sinar UV matahari, getah pohon, dan kotoran burung',
      'Free Glass Coating kaca depan & spion',
      'Buku garansi resmi & sertifikat pengerjaan'
    ],
    recommendedFor: 'Mobil baru keluar dealer atau mobil kesayangan yang ingin proteksi cat jangka panjang'
  },
  {
    id: 'diamond-10h',
    name: 'Diamond Graphene / 10H Extreme Coating',
    badge: 'Proteksi Tertinggi & Tahan Gores',
    popular: false,
    warranty: 'Garansi Resmi 4 Tahun',
    duration: '3 Hari Pengerjaan',
    basePrice: {
      small: 4500000,
      medium: 5500000,
      large: 6700000,
      luxury: 8200000
    },
    description: 'Tingkat perlindungan cat teratas dengan formula Graphene Matrix 10H. Ketahanan luar biasa terhadap baret mikro, panas aspal Surabaya, dan zat kimia asam. Menghasilkan pantulan cermin (mirror reflection) terbaik.',
    features: [
      'Paint correction ultra-presisi dengan lampu inspeksi LED 360°',
      'Aplikasi 3 Layer Graphene / 10H Ceramic Coating bodi & lampu',
      'Full Glass Coating seluruh kaca mobil (bebas jamur & wiper aman)',
      'Coating velg (Wheels coating) tahan debu rem panas',
      'Coating trim plastik hitam eksterior (anti kusam memutih)',
      'Termasuk 1x Free Maintenance berkala di tahun pertama'
    ],
    recommendedFor: 'Mobil premium, mobil hobi, atau mobil warna hitam pekat yang rawan baret halus'
  },
  {
    id: 'interior-detailing',
    name: 'Full Interior Deep Detailing & Anti-Bakteri',
    badge: 'Interior Bersih Seperti Baru',
    popular: false,
    warranty: 'Garansi Bebas Bau Apek',
    duration: '1 Hari Pengerjaan',
    basePrice: {
      small: 850000,
      medium: 1100000,
      large: 1350000,
      luxury: 1650000
    },
    description: 'Pembersihan mendalam seluruh kabin mobil: jok kulit/fabric, plafon, karpet dasar, dashboard, celah ventilasi AC, hingga bagasi. Dilengkapi fogging sterilisasi untuk membunuh kuman dan jamur penyebab bau.',
    features: [
      'Pembersihan noda daki pada jok kulit / ekstraksi basah kain fabric',
      'Pembersihan noda plafon mobil tanpa merusak serat kain',
      'Pembersihan karap dasar & sela-sela rel jok',
      'Leather conditioner premium untuk melembabkan jok kulit asli',
      'Fogging Nano Mist antibakteri & penetral aroma rokok/makanan'
    ],
    recommendedFor: 'Mobil keluarga, mobil yang sering bawa anak kecil, atau mobil second yang baru dibeli'
  }
];

export const detailingFacilities: WorkshopFacility[] = [
  {
    title: 'Ruang Coating Tertutup & Ber-AC (Dust-Free Room)',
    desc: 'Aplikasi coating dilakukan di ruangan steril khusus berpendingin udara untuk mencegah debu menempel saat lapisan mengering.',
    iconName: 'ShieldCheck'
  },
  {
    title: 'Lampu Inspeksi Heksagon LED 360°',
    desc: 'Pencahayaan presisi tinggi dari segala sudut untuk memastikan tidak ada baret halus (swirl mark) yang terlewat.',
    iconName: 'Sparkles'
  },
  {
    title: 'Obat & Chemical Resmi Import Standar Dunia',
    desc: 'Menggunakan compound dan ceramic coating grade profesional dari Jerman, Jepang, dan Amerika yang aman untuk vernis mobil.',
    iconName: 'Award'
  },
  {
    title: 'Garansi Resmi & Kartu Maintenance',
    desc: 'Setiap pengerjaan coating mendapatkan garansi tertulis dan panduan perawatan harian yang jelas.',
    iconName: 'FileCheck'
  }
];

export const detailingTestimonials: DetailingTestimonial[] = [
  {
    name: 'Hendrik Sanjaya',
    car: 'Innova Zenix Q Hybrid (Hitam)',
    location: 'Surabaya Barat',
    packageUsed: 'Nano Ceramic Coating 9H',
    rating: 5,
    comment: 'Mobil warna hitam rawan banget baret swirl kalau di Surabaya. Setelah di-coating di sini, catnya bener-bener jadi wet look kayak basah terus. Kemarin kena hujan airnya langsung meluncur jatuh. Pengerjaannya rapi dan tepat waktu!',
    date: '4 hari yang lalu'
  },
  {
    name: 'dr. Satrio Wibowo',
    car: 'Pajero Sport Dakar',
    location: 'Wiyung, Surabaya',
    packageUsed: 'Diamond Graphene 10H',
    rating: 5,
    comment: 'Workshop auto detailing paling niat di Surabaya. Ruang coatingnya bersih dingin, lampu cek baretnya komplit. Baret halus bekas lap sembarangan hilang total. Dikasih garansi dan kartu kontrol berkala.',
    date: '1 minggu yang lalu'
  },
  {
    name: 'Denny Pratama',
    car: 'Honda Brio RS',
    location: 'Rungkut, Surabaya',
    packageUsed: 'Paint Correction + Interior Detailing',
    rating: 5,
    comment: 'Baru beli mobil second kondisinya agak kusam dan interiornya bau apek. Dibawa ke sini sehari kelar, jok kulitnya jadi bersih doff seperti baru keluar dari showroom. Harganya transparan sesuai estimasi.',
    date: '2 minggu yang lalu'
  },
  {
    name: 'Budi Hartono',
    car: 'Toyota Alphard SC',
    location: 'Kertajaya, Surabaya',
    packageUsed: 'Full Package Diamond Coating + Full Glass',
    rating: 5,
    comment: 'Kaca Alphard biasanya gampang jamuran karena sering kena panas hujan Surabaya. Setelah di-coating kaca dan bodi, pandangan malam hari jadi super jernih tanpa silau. Pelayanan ramah dan profesional.',
    date: '3 minggu yang lalu'
  }
];

export const detailingFaqs = [
  {
    q: 'Berapa lama proses pengerjaan Ceramic Coating mobil?',
    a: 'Untuk paket Nano Ceramic Coating membutuhkan waktu sekitar 2 hingga 3 hari kerja. Waktu ini diperlukan untuk tahap cuci dekontaminasi menyeluruh, koreksi cat (3-step polish) sampai baret halus hilang, aplikasi coating per layer, dan masa curing (pengeringan) di ruangan tertutup.'
  },
  {
    q: 'Apakah cat mobil yang baru di-coating boleh langsung dicuci?',
    a: 'Setelah mobil selesai di-coating dan diserahkan ke Anda, lapisan coating sudah kering sentuh. Namun disarankan selama 7 hari pertama tidak mencuci mobil menggunakan sabun/sampo kimia keras agar lapisan mengeras sempurna. Cukup dibilas air bersih jika terkena hujan dan dikeringkan dengan lap microfiber.'
  },
  {
    q: 'Apakah baret dalam yang sudah tembus cat dasar bisa hilang dengan poles?',
    a: 'Paint correction dapat menghilangkan 80% - 95% baret halus (swirl mark), jamur air, dan lecet ringan pada lapisan vernis (clear coat). Namun jika baret sudah sangat dalam hingga terlihat lapisan cat dasar putih/besi plat, bagian tersebut harus ditouch-up atau repaint.'
  },
  {
    q: 'Apakah perlu booking slot pengerjaan terlebih dahulu?',
    a: 'Sangat disarankan untuk reservasi jadwal terlebih dahulu via WhatsApp. Karena pengerjaan detailing membutuhkan ketelitian tinggi, kami membatasi jumlah mobil yang masuk setiap harinya demi menjaga kualitas hasil akhir.'
  }
];
