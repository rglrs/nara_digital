export interface MenuItem {
  id: string;
  name: string;
  category: 'ikan-bakar' | 'seafood' | 'ayam-paket' | 'sayur-sambal' | 'minuman';
  price: number;
  originalPrice?: number;
  description: string;
  image?: string;
  isPopular?: boolean;
  isSignature?: boolean;
  portion?: string;
}

export interface RestoConfig {
  name: string;
  shortName: string;
  tagline: string;
  badgeText: string;
  establishedYear: string;
  address: string;
  city: string;
  openingHours: string;
  whatsappNumber: string; // international format without +
  whatsappDisplay: string;
  mapsUrl: string;
  instagramHandle: string;
  heroImage: string;
  logoImage: string;
  googleRating: string;
  reviewCount: string;
  facilities: { title: string; desc: string; icon: string }[];
  categories: { id: MenuItem['category'] | 'all'; name: string }[];
  menus: MenuItem[];
}

export const malioboroRestoData: RestoConfig = {
  name: 'Ikan Bakar Malioboro Surabaya',
  shortName: 'Ikan Bakar Malioboro',
  tagline: 'Sensasi Ikan Bakar Rempah & Seafood Khas Nusantara',
  badgeText: 'Restoran Keluarga & Seafood Favorit Surabaya Barat',
  establishedYear: '2023',
  address: 'Jl. Raya Kupang Baru No. 24, Sonokwijenan, Kec. Sukomanunggal, Surabaya, Jawa Timur 60189',
  city: 'Surabaya Barat',
  openingHours: 'Buka Setiap Hari: 11.00 – 22.00 WIB',
  whatsappNumber: '6285602743489', // can be customized
  whatsappDisplay: '0856-0274-3489',
  mapsUrl: 'https://maps.google.com/?q=Ikan+Bakar+Malioboro+Surabaya+Kupang+Baru',
  instagramHandle: 'ikanbakarmalioboro.surabaya',
  heroImage: '/images/demo/ikan-bakar-hero.jpg',
  logoImage: '/images/demo/malioboro-logo.png',
  googleRating: '4.8',
  reviewCount: '1.200+',
  facilities: [
    { title: 'Bakar Arang Tradisional', desc: 'Aroma rempah asap khas nusantara dengan racikan bumbu khas Malioboro.', icon: 'Flame' },
    { title: 'Ikan Hidup Segar', desc: 'Pilihan ikan segar ditimbang hidup untuk jaminan rasa manis gurih alami.', icon: 'Fish' },
    { title: 'Area Luas & Nyaman', desc: 'Cocok untuk makan bersama keluarga besar, arisan, & rombongan kantor.', icon: 'Users' },
    { title: 'Musholla & VIP AC Room', desc: 'Tersedia musholla bersih dan ruang privat ber-AC untuk acara khusus.', icon: 'CheckCircle2' },
    { title: 'Parkir Luas & Aman', desc: 'Kapasitas parkir mobil dan motor aman dan leluasa di lokasi resto.', icon: 'Car' },
  ],
  categories: [
    { id: 'all', name: '🔥 Semua Menu' },
    { id: 'ikan-bakar', name: '🐟 Ikan Bakar' },
    { id: 'seafood', name: '🦐 Seafood' },
    { id: 'ayam-paket', name: '🍗 Paket Hemat' },
    { id: 'sayur-sambal', name: '🥗 Sayur & Sambal' },
    { id: 'minuman', name: '🍹 Minuman Segar' },
  ],
  menus: [
    {
      id: 'gurame-bakar-malioboro',
      name: 'Gurame Bakar Bumbu Malioboro',
      category: 'ikan-bakar',
      price: 68000,
      originalPrice: 75000,
      description: 'Ikan gurame segar dibakar arang dengan olesan bumbu rempah manis gurih khas Malioboro, disajikan dengan lalapan segar & sambal kecap pedas.',
      image: '/images/demo/ikan-bakar-hero.jpg',
      isPopular: true,
      isSignature: true,
      portion: 'Porsi 2-3 Orang',
    },
    {
      id: 'nila-bakar-pedas-manis',
      name: 'Nila Bakar Pedas Manis',
      category: 'ikan-bakar',
      price: 45000,
      description: 'Ikan nila daging tebal dengan perpaduan saus karamel pedas gurih meresap sampai ke serat daging.',
      image: '/images/demo/ikan-bakar-hero.jpg',
      isPopular: true,
      portion: 'Porsi 1-2 Orang',
    },
    {
      id: 'udang-gandum-crispy',
      name: 'Udang Gandum Crispy Golden',
      category: 'seafood',
      price: 55000,
      originalPrice: 62000,
      description: 'Udang windu berbalut sereal gandum renyah harum mentega dengan daun kari dan potongan cabai rawit gurih sedap.',
      image: '/images/demo/udang-crispy.jpg',
      isPopular: true,
      isSignature: true,
      portion: 'Porsi Sharing',
    },
    {
      id: 'kerang-bakar-jimbaran',
      name: 'Kerang Bakar Saus Jimbaran',
      category: 'seafood',
      price: 42000,
      description: 'Kerang dara/simping dibakar dengan bumbu khas Jimbaran Bali pedas aromatik disajikan di atas hotplate.',
      image: '/images/demo/kerang-bakar.jpg',
      isPopular: true,
      portion: 'Porsi Sharing',
    },
    {
      id: 'cumi-goreng-tepung',
      name: 'Cumi Krispi Saus Telur Asin',
      category: 'seafood',
      price: 48000,
      description: 'Cumi segar kenyal berbalut tepung krispi keemasan dengan siraman saus creamy salted egg wangi daun kari.',
      portion: 'Porsi Sharing',
    },
    {
      id: 'paket-nila-bakar-komplit',
      name: 'Paket Nila Bakar Komplit + Es Teh',
      category: 'ayam-paket',
      price: 38000,
      originalPrice: 45000,
      description: 'Nasi putih pulen + Ikan Nila Bakar + Tahu & Tempe goreng + Sayur Lalap + Sambal Terasi Dadak + Es Teh Manis Jumbo.',
      isPopular: true,
      portion: 'Paket Personal Puas',
    },
    {
      id: 'paket-ayam-bakar-rempah',
      name: 'Paket Ayam Bakar Kalasan + Es Teh',
      category: 'ayam-paket',
      price: 32000,
      description: 'Ayam kampung bakar empuk bumbu rempah manis gurih legong + Nasi + Sambal Bawang + Es Teh Manis.',
      portion: 'Paket Personal',
    },
    {
      id: 'cah-kangkung-terasi',
      name: 'Cah Kangkung Terasi Hotplate',
      category: 'sayur-sambal',
      price: 22000,
      description: 'Kangkung hijau segar dimasak cepat dengan bumbu terasi udang wangi dan potongan cabai merah panas mengepul.',
      portion: 'Porsi Sharing',
    },
    {
      id: 'sambal-mangga-muda',
      name: 'Sambal Pencit / Mangga Muda',
      category: 'sayur-sambal',
      price: 10000,
      description: 'Irisan mangga muda asam segar dipadukan dengan ulekan cabai rawit pedas mengigit, pendamping wajib ikan bakar.',
      portion: '1 Cobek',
    },
    {
      id: 'es-jeruk-murni',
      name: 'Es Jeruk Nipis Madu Murni',
      category: 'minuman',
      price: 16000,
      description: 'Perasan jeruk nipis asli segar dengan madu alami dan es batu kristal penuntas dahaga sehabis makan pedas.',
      portion: 'Gelas Besar',
    },
    {
      id: 'es-kelapa-muda-batok',
      name: 'Es Kelapa Muda Batok Segar',
      category: 'minuman',
      price: 22000,
      description: 'Kelapa muda utuh disajikan langsung dengan air kelapa murni dan serutan daging kelapa lembut.',
      portion: '1 Butir Utuh',
    },
  ],
};
