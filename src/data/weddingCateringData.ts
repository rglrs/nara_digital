export interface WeddingPackage {
  id: string;
  name: string;
  badge?: string;
  porsiPrasmanan: number;
  totalGubukanPorsi: number;
  jumlahStall: number;
  price: number;
  pricePerPorsi: number;
  popular?: boolean;
  description: string;
  features: string[];
  menuPrasmanan: {
    nasi: string[];
    sup: string[];
    daging: string[];
    ayam: string[];
    sayur: string[];
    penutup: string[];
  };
  pilihanStall: string[];
  bonusKhusus: string[];
}

export interface StallItem {
  id: string;
  name: string;
  category: 'favorite' | 'western' | 'traditional' | 'dessert';
  description: string;
  image: string;
  tag: string;
}

export interface TestimonialItem {
  couple: string;
  venue: string;
  date: string;
  rating: number;
  comment: string;
  packageUsed: string;
}

export const defaultCateringConfig = {
  defaultBrand: 'Maharani Royal Wedding & Catering',
  shortBrand: 'Maharani Catering',
  tagline: 'Cita Rasa Tradisi & Kemewahan untuk Hari Bahagia Anda di Surabaya',
  badgeText: 'Penyedia Katering Pernikahan Terpercaya & Bersertifikat Halal',
  establishedYear: '2016',
  address: 'Jl. Raya Jemursari No. 108, Wonocolo, Surabaya, Jawa Timur 60237',
  areaCoverage: 'Melayani Surabaya, Sidoarjo, Gresik & Sekitarnya',
  naraWaNumber: '6281234567890', // User / NARA Dev WA
  googleRating: '4.9',
  reviewCount: '850+ Ulasan',
  heroImage: '/images/demo/wedding-buffet-hero.jpg',
  zuppaImage: '/images/demo/wedding-zuppa-soup.jpg',
  kambingImage: '/images/demo/wedding-kambing-guling.jpg',
  dessertImage: '/images/demo/wedding-dessert-bar.jpg',
};

export const weddingPackages: WeddingPackage[] = [
  {
    id: 'paket-silver',
    name: 'Paket Classic Silver',
    badge: 'Pilihan Ekonomis Berkualitas',
    porsiPrasmanan: 500,
    totalGubukanPorsi: 1000,
    jumlahStall: 3,
    price: 36500000,
    pricePerPorsi: 45000,
    description: 'Cocok untuk resepsi intimate wedding atau acara keluarga di gedung kapasitas 400-500 undangan.',
    features: [
      'Buffet Prasmanan 500 Porsi (6 Pilihan Menu Utama)',
      '3 Stall Menu Gubukan (Total 1.000 Porsi)',
      'Dekorasi Meja Prasmanan Elegan & Centerpieces Bunga Segar',
      'Peralatan Roll Top Dish & Cutlery Standar Hotel Bintang 5',
      'Tim Waiter & Waitress Berbusana Rapi Berpengalaman',
      'Air Mineral Cup & Es Sirup Sepuasnya'
    ],
    menuPrasmanan: {
      nasi: ['Nasi Putih Pulen', 'Nasi Goreng Hongkong'],
      sup: ['Sup Kimlo Jamur Salju', 'Sup Merah Surabaya'],
      daging: ['Daging Rendang Padang', 'Lapis Daging Sapi Rempah'],
      ayam: ['Ayam Panggang Bumbu Rujak', 'Ayam Fillet Saus Mentega'],
      sayur: ['Capcay Seafood Goreng', 'Cah Brokoli Saus Tiram'],
      penutup: ['Puding Rainbow Buah', 'Aneka Buah Potong Segar', 'Es Manado']
    },
    pilihanStall: ['Zuppa Soup Special (350 porsi)', 'Sate Ayam Madura (350 porsi)', 'Siomay Bandung Asli (300 porsi)'],
    bonusKhusus: ['Gratis Test Food untuk 4 Orang Calon Pengantin & Ortu', 'Gratis 50 Kotak Makanan Panitia Resepsi']
  },
  {
    id: 'paket-gold',
    name: 'Paket Royal Gold',
    badge: 'Paling Banyak Dipilih',
    popular: true,
    porsiPrasmanan: 800,
    totalGubukanPorsi: 2000,
    jumlahStall: 5,
    price: 58500000,
    pricePerPorsi: 48000,
    description: 'Solusi lengkap pesta pernikahan di ballroom hotel atau convention hall besar kapasitas 600-800 undangan.',
    features: [
      'Buffet Prasmanan 800 Porsi (8 Pilihan Menu Utama)',
      '5 Stall Menu Gubukan Favorit (Total 2.000 Porsi)',
      'Dekorasi Prasmanan Tematik Modern dengan Pergola & Lampu Fairy',
      'VIP Family Table Service Khusus Meja Pengantin & Keluarga Inti',
      'Chocolate Fountain & Dessert Bar Khusus Tamu',
      'Penyelia Acara (Event Coordinator Katering) Khusus di Lokasi',
      'Free Flow Es Kopyor Sintetis & Infused Water Segar'
    ],
    menuPrasmanan: {
      nasi: ['Nasi Putih Pandan Wangi', 'Nasi Goreng Seafood XO'],
      sup: ['Sup Asparagus Kepiting', 'Sup Buntut Sapi Rempah'],
      daging: ['Beef Teriyaki Wijen', 'Daging Balado Dendeng Renyah'],
      ayam: ['Ayam Suwir Pedas Manis Bali', 'Ayam Gulung Keju Tartar'],
      sayur: ['Cah Brokoli Daging Sapi', 'Pakchoy Saus Abalone Jamur'],
      penutup: ['Mini French Pastries', 'Puding Sutra Mangga', 'Es Blewah Sari Kelapa']
    },
    pilihanStall: [
      'Zuppa Soup Creamy Puff (500 porsi)',
      'Kambing Guling Spesial & Lontong (2 Ekor - 400 porsi)',
      'Bakso Granat Malang Kuah Sumsum (400 porsi)',
      'Dimsum Aneka Kukus & Goreng (400 porsi)',
      'Es Krim Roll & Cone (300 porsi)'
    ],
    bonusKhusus: [
      'Gratis Test Food Mewah di Kantor Katering / Dikirim ke Rumah',
      'Gratis 100 Porsi Nasi Kotak Akad Nikah / Pemberkatan',
      'Gratis Meja VIP Pengantin dengan Pelayan Pribadi'
    ]
  },
  {
    id: 'paket-platinum',
    name: 'Paket Sultan Platinum',
    badge: 'Layanan VIP Eksklusif',
    porsiPrasmanan: 1200,
    totalGubukanPorsi: 3500,
    jumlahStall: 8,
    price: 89000000,
    pricePerPorsi: 52000,
    description: 'Paket megah nan prestisius untuk pesta pernikahan akbar di Grand Ballroom Surabaya 1.000+ undangan.',
    features: [
      'Buffet Prasmanan 1.200 Porsi Premium (Pilihan Bebas 10 Menu)',
      '8 Stall Menu Gubukan Internasional & Nusantara (Total 3.500 Porsi)',
      'Grand Buffet Backdrop & Instalasi Floral Katering Spektakuler',
      'Full VIP Silverware & Gold Cutlery Luxury Setup',
      'Executive Chef Live Cooking Demo di Area Gubukan',
      'Dedicated Bridal Table Butler (Pelayan Pribadi Pengantin)',
      'Free Flow Mocktail Bar, Softdrinks & Aneka Jus Buah Segar'
    ],
    menuPrasmanan: {
      nasi: ['Nasi Putih Pulen Wangi', 'Nasi Briyani Daging Kambing', 'Nasi Goreng Yang Chow'],
      sup: ['Tom Yum Seafood Royal', 'Sup Iga Sapi Kuah Asam Pedas'],
      daging: ['Lidah Sapi Saus Putih Jamur', 'Beef Black Pepper US Tenderloin'],
      ayam: ['Ayam Kodok Spesial Saus Gravy', 'Ayam Bakar Madu Wijen'],
      sayur: ['Kailan Daging Cincang XO', 'Baby Buncis Daging Sapi Szechuan'],
      penutup: ['Dessert Corner Full Table (Macarons, Tiramisu, Eclairs)', 'Es Doger Royal Special', 'Assorted Fruits']
    },
    pilihanStall: [
      'Roast Beef / Sirloin Carving (500 porsi)',
      'Kambing Guling Premium (3 Ekor - 600 porsi)',
      'Zuppa Soup King Size (500 porsi)',
      'Salmon Teppanyaki Live (400 porsi)',
      'Sate Padang & Lontong (500 porsi)',
      'Korean BBQ Skewer (400 porsi)',
      'Crepes Suzette & Ice Cream Station (300 porsi)',
      'Coffee & Tea Corner with Barista (300 cup)'
    ],
    bonusKhusus: [
      'Gratis Test Food Komplit untuk 8 Orang Keluarga',
      'Gratis 150 Porsi Nasi Bento Panitia Acara',
      'Gratis Snack Box VIP Temu Manten 50 Kotak',
      'Gratis Voucher Diskon Dekorasi Rekanan Senilai Rp 2.500.000'
    ]
  }
];

export const stallHighlights: StallItem[] = [
  {
    id: 'zuppa',
    name: 'Zuppa Soup Creamy Puff',
    category: 'favorite',
    description: 'Sup krim ayam jamur kental dengan topping pastry emas renyah yang mekar sempurna saat disajikan panas.',
    image: '/images/demo/wedding-zuppa-soup.jpg',
    tag: 'Stall No. 1 Paling Dicari'
  },
  {
    id: 'kambing-guling',
    name: 'Kambing Guling Rempah Arab',
    category: 'favorite',
    description: 'Daging kambing muda dipanggang arang empuk tanpa bau prengus, disajikan bersama lontong & kecap pedas gurih.',
    image: '/images/demo/wedding-kambing-guling.jpg',
    tag: 'Live Carving Show'
  },
  {
    id: 'dessert-bar',
    name: 'Luxury Dessert & Chocolate Fountain',
    category: 'dessert',
    description: 'Air mancur cokelat leleh dengan buah strawberry segar, marshmallow, pudding pelangi, dan aneka mini pastry.',
    image: '/images/demo/wedding-dessert-bar.jpg',
    tag: 'Favorit Tamu & Anak-anak'
  }
];

export const weddingTestimonials: TestimonialItem[] = [
  {
    couple: 'dr. Dimas & drg. Sarah',
    venue: 'Grand City Convention & Exhibition Surabaya',
    date: 'Bulan Lalu',
    rating: 5,
    packageUsed: 'Paket Sultan Platinum (1.200 Tamu)',
    comment: 'Pilihan terbaik untuk pernikahan kami! Tamu-tamu undangan banyak yang memuji rasa Zuppa Soup dan Daging Teriyaki-nya. Porsi sangat melimpah, tidak ada cerita makanan habis di tengah acara. Tim katering sangat rapi dan profesional.'
  },
  {
    couple: 'Rangga & Cynthia, S.E.',
    venue: 'Dyandra Convention Center Surabaya',
    date: '2 Bulan Lalu',
    rating: 5,
    packageUsed: 'Paket Royal Gold (800 Tamu)',
    comment: 'Sangat puas dari mulai test food sampai hari H! Penataan mejanya mewah banget dan fotogenik. Ownernya ramah dan mau menyesuaikan menu sesuai request keluarga Jawa & Tionghoa kami. Recommended 100%!'
  },
  {
    couple: 'Kapten Bayu & Anindita',
    venue: 'Graha Bhaswara Puspita Surabaya',
    date: '3 Bulan Lalu',
    rating: 5,
    packageUsed: 'Paket Classic Silver (500 Tamu)',
    comment: 'Acara kami sukses berkat katering ini. Harga sangat masuk akal dibanding katering lain di Surabaya tapi kualitas makanannya rasa hotel bintang 5. Terima kasih banyak!'
  }
];

export const weddingVenuesSurabaya = [
  'Grand City Convention Hall',
  'Dyandra Convention Center',
  'Graha Bhaswara Puspita',
  'Islamic Center Surabaya',
  'The Empire Palace Surabaya',
  'Hotel Shangri-La Ballroom',
  'JW Marriott Surabaya Ballroom',
  'Vasa Hotel Grand Ballroom'
];
