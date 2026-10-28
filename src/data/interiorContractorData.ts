export interface InteriorService {
  id: string;
  name: string;
  category: 'kitchen' | 'living' | 'bedroom' | 'apartment';
  badge?: string;
  popular?: boolean;
  priceStart: number;
  unit: string;
  duration: string;
  description: string;
  materials: string[];
  specs: string[];
}

export interface InteriorProject {
  title: string;
  category: string;
  location: string;
  scope: string;
  image: string;
  desc: string;
}

export interface ContractorTestimonial {
  client: string;
  projectType: string;
  location: string;
  rating: number;
  comment: string;
  year: string;
}

export const defaultInteriorConfig = {
  defaultBrand: 'Kaloka Interior & Kitchen Set Surabaya',
  shortBrand: 'Kaloka Interior',
  tagline: 'Jasa Desain Interior, Pembuatan Kitchen Set & Custom Furniture Presisi di Surabaya',
  address: 'Jl. Raya Jemursari No. 108, Wonocolo, Surabaya, Jawa Timur 60237',
  workshopAddress: 'Workshop Fabrikasi: Rungkut Industri & Sidoarjo',
  operatingHours: 'Senin - Sabtu: 08.30 - 17.00 WIB | Survey Lokasi Setiap Hari',
  naraWaNumber: '6285602743489',
  googleRating: '5.0',
  reviewCount: '150+ Proyek Selesai',
  heroImage: '/images/demo/interior-kitchen.jpg',
  livingImage: '/images/demo/interior-living.jpg',
  bedroomImage: '/images/demo/interior-bedroom.jpg',
};

export const interiorServices: InteriorService[] = [
  {
    id: 'kitchen-set',
    name: 'Custom Kitchen Set Modern & Minimalis',
    category: 'kitchen',
    badge: 'Paling Banyak Dipesan',
    popular: true,
    priceStart: 2400000,
    unit: 'per meter lari',
    duration: '14 - 21 Hari Kerja',
    description: 'Pembuatan kitchen set custom fungsional dan estetik. Dilengkapi kabinet atas dan bawah, rak piring stainless tarik, laci bumbu, dan engsel hidrolik slow-motion anti-banting.',
    materials: [
      'Bahan dasar Multiplek / Plywood Meranti 18mm (Padat & Anti Rayap)',
      'Finishing luar HPL Taco / Aica tahan panas & gores',
      'Edging PVC tebal 1-2mm rapi tanpa sambungan tajam',
      'Table top Granit Nero / Marmer Sintetis / Solid Surface'
    ],
    specs: [
      'Engsel & rel laci soft-closing slow motion',
      'Free rak sendok & piring stainless anti-karat',
      'Lampu LED strip warm white tersembunyi',
      'Garansi struktur & engsel 1 tahun'
    ]
  },
  {
    id: 'backdrop-tv',
    name: 'Backdrop TV & Wall Panel Living Room',
    category: 'living',
    badge: 'Bikin Ruang Keluarga Mewah',
    popular: true,
    priceStart: 1850000,
    unit: 'per meter lari / m²',
    duration: '10 - 14 Hari Kerja',
    description: 'Panel dinding TV custom dengan perpaduan kisi-kisi kayu fluted wood (WPC), panel motif marmer carrara, dan pencahayaan lampu indirect cove light yang hangat.',
    materials: [
      'Multiplek 18mm & rangka hollow kuat',
      'Finishing HPL motif kayu serat alami / marmer bookmatch',
      'Lampu indirect LED COB warm light',
      'Floating credenza laci gantung tempat perangkat elektronik'
    ],
    specs: [
      'Jalur kabel tersembunyi (Clean Cable Management)',
      'Kuat menahan beban bracket TV hingga 85 inch',
      'Pengerjaan rapi presisi sesuai ukuran dinding rumah',
      'Bebas custom warna dan tekstur'
    ]
  },
  {
    id: 'wardrobe',
    name: 'Wardrobe & Lemari Pakaian Full Plafon',
    category: 'bedroom',
    badge: 'Kapasitas Maksimal',
    popular: false,
    priceStart: 2500000,
    unit: 'per meter lari',
    duration: '14 - 20 Hari Kerja',
    description: 'Lemari pakaian custom tinggi penuh sampai ke plafon (*floor to ceiling*). Mengoptimalkan setiap sudut kamar tidur tanpa celah debu di atas lemari.',
    materials: [
      'Multiplek 18mm berkualitas finishing HPL premium',
      'Pilihan pintu kaca riben / smoked glass berbingkai aluminium hitam',
      'Lampu sensor otomatis menyala saat pintu dibuka',
      'Laci perhiasan & aksesoris lapis beludru'
    ],
    specs: [
      'Pembagian rak gantung baju panjang, kemeja, dan lipatan',
      'Cermin rias full body terintegrasi',
      'Kunci pengaman laci berkas rahasia',
      'Garansi rel geser & engsel'
    ]
  },
  {
    id: 'full-apartment',
    name: 'Paket Interior Apartemen Siap Huni / Siap Sewa',
    category: 'apartment',
    badge: 'Paket All-In Hemat',
    popular: false,
    priceStart: 38000000,
    unit: 'per unit (Studio / 2BR)',
    duration: '25 - 35 Hari Kerja',
    description: 'Solusi lengkap interior apartemen modern di Surabaya. Meliputi kitchen set mini bar, divan kasur dengan laci bawah, lemari pakaian, meja kerja/rias, dan backdrop TV.',
    materials: [
      'Desain multifungsi hemat ruang (*space-saving design*)',
      'Material awet dan tahan sewa jangka panjang',
      'Sudah termasuk instalasi listrik & saklar tambahan',
      'Gratis survey unit apartemen seluruh Surabaya'
    ],
    specs: [
      'Cocok untuk disewakan harian / tahunan di Surabaya Barat & Timur',
      'Desain menarik meningkatkan nilai sewa apartemen',
      'Pengerjaan tepat waktu sesuai izin fit-out pengelola',
      'Garansi purna jual & maintenance'
    ]
  }
];

export const interiorProjects: InteriorProject[] = [
  {
    title: 'Modern Japandi Kitchen Set & Mini Bar',
    category: 'Kitchen Set',
    location: 'Pakuwon City, Surabaya Timur',
    scope: 'Kitchen Set 4.8m + Island Table Granit Nero',
    image: '/images/demo/interior-kitchen.jpg',
    desc: 'Konsep Japandi hangat dengan kombinasi kayu oak fluted dan marmer putih. Dilengkapi kompor induksi tanam dan cooker hood tersembunyi.'
  },
  {
    title: 'Luxury TV Backdrop & Living Wall Panel',
    category: 'Living Room',
    location: 'Citraland, Surabaya Barat',
    scope: 'Wall Panel 5.2m x 3.1m + Floating Credenza',
    image: '/images/demo/interior-living.jpg',
    desc: 'Panel marmer bookmatch dengan kisi-kisi kayu natural dan indirect LED warm light menciptakan suasana ruang keluarga yang megah namun hangat.'
  },
  {
    title: 'Master Bedroom Wardrobe with Smoked Glass',
    category: 'Kamar Tidur',
    location: 'Graha Family, Surabaya Barat',
    scope: 'Lemari Pakaian 4.2m Full Plafon + Meja Rias',
    image: '/images/demo/interior-bedroom.jpg',
    desc: 'Lemari pakaian kaca riben transparan modern dengan rak pencahayaan LED otomatis dan laci aksesoris bersekat beludru.'
  }
];

export const interiorWorkflow = [
  {
    step: '01',
    title: 'Konsultasi & Survey Lokasi Gratis',
    desc: 'Tim kami datang langsung ke rumah/apartemen Anda di Surabaya untuk mengukur ruangan secara presisi dan mendengarkan kebutuhan Anda.'
  },
  {
    step: '02',
    title: 'Desain 3D Render & Rincian RAB',
    desc: 'Kami buatkan visualisasi 3D realistis agar Anda bisa melihat hasil jadinya sebelum dibuat, lengkap dengan rincian biaya transparan tanpa biaya tersembunyi.'
  },
  {
    step: '03',
    title: 'Fabrikasi di Workshop Pribadi',
    desc: 'Diproduksi langsung oleh tukang kayu berpengalaman di workshop kami sendiri menggunakan mesin modern, bukan dioper ke pihak ketiga.'
  },
  {
    step: '04',
    title: 'Pemasangan Bersih & Garansi 1 Tahun',
    desc: 'Instalasi rapi di lokasi oleh tim profesional, serah terima bersih siap pakai, serta garansi resmi pemeliharaan selama 1 tahun.'
  }
];

export const contractorTestimonials: ContractorTestimonial[] = [
  {
    client: 'Ibu Stefani Wijaya',
    projectType: 'Kitchen Set & Island Table',
    location: 'Pakuwon City Surabaya',
    rating: 5,
    year: '2026',
    comment: 'Puas banget bikin kitchen set di sini! Dari tahap gambar 3D sampai hasil realnya sama persis 100%. Pengerjaannya rapi, engsel slow-motionnya halus, dan tukangnya sopan-sopan. Sangat recommended untuk perumahan di Surabaya.'
  },
  {
    client: 'Bapak Gunawan Santoso',
    projectType: 'Interior Rumah Full 2 Lantai',
    location: 'Citraland Surabaya Barat',
    rating: 5,
    year: '2026',
    comment: 'Kontraktor interior paling transparan soal spek bahan. Dijelasin bedanya multiplek, HPL, dan marmer. Tidak ada biaya siluman di tengah jalan. Selesai tepat waktu sebelum jadwal pindahan rumah saya.'
  },
  {
    client: 'dr. Melinda Rahayu',
    projectType: 'Interior Apartemen 2BR',
    location: 'Apartemen Benson Pakuwon Mall',
    rating: 5,
    year: '2026',
    comment: 'Interior apartemen saya jadi kelihatan jauh lebih luas dan mewah berkat desain storage tersembunyinya. Penyewa langsung suka dan deal di survei pertama. Pelayanan ramah dan komunikatif!'
  }
];

export const interiorFaqs = [
  {
    q: 'Berapa lama proses pembuatan kitchen set atau lemari custom?',
    a: 'Rata-rata proses pengerjaan di workshop kami membutuhkan waktu antara 14 hingga 25 hari kerja, tergantung pada volume dan tingkat kerumitan desain. Setelah selesai di workshop, perakitan dan pemasangan di lokasi Anda hanya butuh 1 hingga 3 hari kerja sehingga tidak mengotori rumah terlalu lama.'
  },
  {
    q: 'Apakah survey lokasi dan konsultasi desain dikenakan biaya?',
    a: 'GRATIS! Kami memberikan layanan survey pengukuran langsung ke lokasi dan konsultasi awal tanpa dipungut biaya untuk seluruh area Surabaya, Sidoarjo, dan Gresik.'
  },
  {
    q: 'Bagaimana sistem pembayaran proyek interior?',
    a: 'Sistem pembayaran bertahap (termin) yang aman dan transparan: DP tanda jadi 30% setelah ACC desain 3D, termin kedua 40% saat barang siap dikirim dari workshop, dan pelunasan 30% setelah instalasi selesai dan serah terima garansi.'
  },
  {
    q: 'Apakah ada garansi jika engsel rusak atau lapisan HPL mengelupas?',
    a: 'Pasti ada. Kami memberikan Garansi Resmi Pemeliharaan selama 1 Tahun untuk struktur multiplek, engsel, rel laci hidrolik, dan lapisan HPL. Jika ada kendala, tim teknis kami siap datang memperbaiki.'
  }
];
