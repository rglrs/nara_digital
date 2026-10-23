export interface DentalTreatment {
  id: string;
  name: string;
  category: 'estetik' | 'kesehatan' | 'behel' | 'anak';
  badge?: string;
  popular?: boolean;
  priceStart: number;
  priceEnd?: number;
  priceNote?: string;
  duration: string;
  description: string;
  benefits: string[];
  recommendedFor: string;
}

export interface DentalDoctor {
  id: string;
  name: string;
  title: string;
  specialist: string;
  experience: string;
  avatar: string;
  schedule: {
    days: string;
    hours: string;
  }[];
  focus: string[];
}

export interface DentalTestimonial {
  patient: string;
  location: string;
  treatment: string;
  rating: number;
  date: string;
  comment: string;
}

export interface ClinicFacility {
  title: string;
  desc: string;
  iconName: string;
}

export const defaultDentalConfig = {
  defaultBrand: 'SmileCraft Dental Care & Specialist',
  shortBrand: 'SmileCraft Dental',
  tagline: 'Senyum Rapi, Sehat & Percaya Diri Tanpa Rasa Takut',
  badgeText: 'Klinik Gigi Modern & Berstandar Medis Internasional di Surabaya',
  address: 'Jl. Raya Jemursari No. 76, Wonocolo, Surabaya, Jawa Timur 60237',
  areaCoverage: 'Melayani Pasien Surabaya, Sidoarjo, Gresik & Sekitarnya',
  operatingHours: 'Senin - Sabtu: 09.00 - 21.00 WIB | Minggu: By Appointment',
  naraWaNumber: '6285602743489',
  googleRating: '5.0',
  reviewCount: '2.200+ Ulasan Puas',
  heroImage: '/images/demo/dental-clinic-hero.jpg',
  consultImage: '/images/demo/dental-doctor-consult.jpg',
  smileImage: '/images/demo/dental-smile-aesthetic.jpg',
};

export const dentalTreatments: DentalTreatment[] = [
  {
    id: 'scaling',
    name: 'Scaling & Pembersihan Karang Gigi',
    category: 'kesehatan',
    badge: 'Paling Sering Dilakukan',
    popular: true,
    priceStart: 250000,
    priceEnd: 450000,
    priceNote: 'Tergantung tingkat ketebalan karang',
    duration: '30 - 45 Menit',
    description: 'Pembersihan karang dan plak gigi menyeluruh menggunakan teknologi Ultrasonic Piezo Scaler yang nyaman, lembut di gusi, dan minim rasa ngilu.',
    benefits: [
      'Menghilangkan bau mulut & bakteri plak membandel',
      'Mencegah radang gusi (gingivitis) dan gigi goyang',
      'Bonus polishing & aplikasi fluoride pelindung email',
      'Rasa bersih dan segar seketika'
    ],
    recommendedFor: 'Rutin setiap 6 bulan sekali untuk seluruh keluarga'
  },
  {
    id: 'bleaching',
    name: 'Bleaching Gigi (Laser Teeth Whitening)',
    category: 'estetik',
    badge: 'Hasil Instan 1x Kunjungan',
    popular: true,
    priceStart: 1500000,
    priceEnd: 2200000,
    priceNote: 'Termasuk polish & desensitizing gel',
    duration: '60 Menit',
    description: 'Pencerahan warna gigi hingga 3-6 tingkat lebih putih alami menggunakan cold-light laser accelerator dan gel pemutih berstandar medis USA.',
    benefits: [
      'Gigi cerah berkilau tampak alami, bukan putih buatan',
      'Teknologi dingin, aman untuk enamel gigi',
      'Dilengkapi gel anti-ngilu pasca perawatan',
      'Hasil tahan 12 - 24 bulan dengan perawatan tepat'
    ],
    recommendedFor: 'Persiapan pernikahan, interview kerja, atau perokok & penikmat kopi'
  },
  {
    id: 'behel-metal',
    name: 'Behel Metal Presisi (Orthodontic Braces)',
    category: 'behel',
    badge: 'Promo Cicilan 0%',
    popular: true,
    priceStart: 4500000,
    priceEnd: 7500000,
    priceNote: 'Bisa dicicil mulai Rp 450.000/bulan',
    duration: '60 - 90 Menit (Pemasangan)',
    description: 'Solusi terbaik untuk merapikan susunan gigi berjejal, tonggos, atau renggang dengan bracket metal anti-karat presisi tinggi dan karet warna-warni pilihan Anda.',
    benefits: [
      'Ditangani langsung oleh Dokter Gigi Spesialis Ortodonti (Sp.Ort)',
      'Gratis cetak gigi digital & konsultasi analisa senyum',
      'Struktur gigi rapi permanen dan proporsi wajah seimbang',
      'Bebas pilih warna karet karet behel setiap kontrol'
    ],
    recommendedFor: 'Remaja dan dewasa yang ingin senyum rapi sempurna secara permanen'
  },
  {
    id: 'clear-aligner',
    name: 'Clear Aligners (Behel Transparan)',
    category: 'behel',
    badge: 'Tak Terlihat & Fleksibel',
    popular: false,
    priceStart: 8500000,
    priceEnd: 18000000,
    priceNote: 'Custom 3D printed per tahap',
    duration: '45 Menit (Scan 3D)',
    description: 'Inovasi merapikan gigi tanpa kawat dan braket. Plastik medis bening yang nyaman, hampir tidak terlihat dari jarak dekat, dan mudah dilepas saat makan.',
    benefits: [
      '100% transparan, percaya diri saat rapat atau presentasi',
      'Dapat dilepas-pasang sendiri saat makan & menyikat gigi',
      'Tidak ada sariawan akibat gesekan kawat metal',
      'Simulasi visual pergerakan gigi 3D sebelum dimulai'
    ],
    recommendedFor: 'Profesional, eksekutif, dan public speaker'
  },
  {
    id: 'tambal-estetik',
    name: 'Tambal Gigi Estetik (Composite Filling)',
    category: 'kesehatan',
    badge: 'Warna Persis Gigi Asli',
    popular: false,
    priceStart: 300000,
    priceEnd: 600000,
    priceNote: 'Sesuai kedalaman lubang gigi',
    duration: '30 - 45 Menit',
    description: 'Penambalan gigi berlubang menggunakan resin komposit nano-hybrid teknologi sinar UV. Warna dan tekstur dipadukan sempurna menyerupai gigi asli.',
    benefits: [
      'Tidak terlihat tambalan (seamless blend)',
      'Mencegah lubang bertambah dalam ke saraf gigi',
      'Kuat menahan beban kunyah bertahun-tahun',
      'Pengerjaan cepat tanpa rasa sakit'
    ],
    recommendedFor: 'Gigi berlubang depan maupun belakang sebelum menimbulkan sakit berdenyut'
  },
  {
    id: 'veneer-porcelain',
    name: 'Veneer Gigi Porselen (E-Max Porcelain)',
    category: 'estetik',
    badge: 'Hollywood Smile',
    popular: false,
    priceStart: 1800000,
    priceEnd: 3200000,
    priceNote: 'Harga per gigi, garansi 1 tahun',
    duration: '2x Kunjungan',
    description: 'Lapisan keramik tipis berdaya tahan tinggi yang ditempel di permukaan depan gigi untuk mengoreksi bentuk, ukuran, serta noda warna membandel.',
    benefits: [
      'Kilau natural seperti gigi selebriti',
      'Tahan noda kopi, teh, dan saus selamanya',
      'Daya tahan sangat tinggi hingga 10-15 tahun',
      'Mengkoreksi gigi sompel, renggang, atau bentuk asimetris'
    ],
    recommendedFor: 'Yang menginginkan senyum estetik sempurna dan tahan puluhan tahun'
  },
  {
    id: 'odontektomi',
    name: 'Operasi Gigi Bungsu (Odontektomi)',
    category: 'kesehatan',
    badge: 'Spesialis Bedah Mulut',
    popular: false,
    priceStart: 1750000,
    priceEnd: 3200000,
    priceNote: 'Termasuk rontgen evaluasi & jahitan steril',
    duration: '45 - 60 Menit',
    description: 'Pencabutan gigi geraham bungsu yang miring, terpendam, atau menabrak gigi depan dengan anestesi lokal nyaman dan teknik bedah mikro minim trauma.',
    benefits: [
      'Menghilangkan migrain, nyeri rahang & pipi bengkak',
      'Mencegah gigi depan berantakan akibat dorongan gigi bungsu',
      'Dilakukan oleh Spesialis Bedah Mulut (Sp.BM) bersertifikat',
      'Proses pemulihan cepat dengan panduan perawatan pasca-bedah'
    ],
    recommendedFor: 'Usia 17-30 tahun yang mengalami gigi geraham paling belakang terjepit atau sakit'
  },
  {
    id: 'anak-pedodonti',
    name: 'Pemeriksaan & Tambal Gigi Anak (Friendly Kids Dental)',
    category: 'anak',
    badge: 'Bebas Trauma & Ramah Anak',
    popular: false,
    priceStart: 200000,
    priceEnd: 450000,
    priceNote: 'Termasuk hadiah mainan keberanian',
    duration: '30 Menit',
    description: 'Perawatan gigi anak dengan pendekatan bermain dan psikologi positif. Ruangan ceria dan dokter gigi yang sabar membuat si kecil tidak takut ke dokter gigi.',
    benefits: [
      'Pendekatan Tell-Show-Do yang menenangkan anak',
      'Aplikasi Topical Fluoride pelindung gigi susu dari keropos',
      'Pemberian reward bintang & mainan setelah pemeriksaan',
      'Edukasi cara sikat gigi menyenangkan untuk orang tua'
    ],
    recommendedFor: 'Balita hingga anak usia 12 tahun'
  }
];

export const dentalDoctors: DentalDoctor[] = [
  {
    id: 'drg-nadia',
    name: 'drg. Nadia Saraswati, Sp.Ort',
    title: 'Spesialis Ortodonti (Kerapian Gigi & Behel)',
    specialist: 'Spesialis Ortodonti',
    experience: '11 Tahun Pengalaman',
    avatar: '👩‍⚕️',
    schedule: [
      { days: 'Senin, Rabu, Jumat', hours: '16.00 - 21.00 WIB' },
      { days: 'Sabtu', hours: '10.00 - 15.00 WIB' }
    ],
    focus: ['Behel Metal & Sapphire', 'Clear Aligners', 'Koreksi Maloklusi & Gigi Berjejal']
  },
  {
    id: 'drg-reza',
    name: 'drg. Reza Pratama, Sp.KG',
    title: 'Spesialis Konservasi Gigi (Estetika & Endodontik)',
    specialist: 'Spesialis Konservasi Gigi',
    experience: '9 Tahun Pengalaman',
    avatar: '👨‍⚕️',
    schedule: [
      { days: 'Selasa, Kamis', hours: '15.00 - 20.30 WIB' },
      { days: 'Sabtu', hours: '13.00 - 18.00 WIB' }
    ],
    focus: ['Veneer E-Max', 'Tambal Komposit Estetik', 'Perawatan Saluran Akar (PSA)', 'Bleaching Laser']
  },
  {
    id: 'drg-bima',
    name: 'drg. Bima Satria, Sp.BM',
    title: 'Spesialis Bedah Mulut & Maksilofasial',
    specialist: 'Spesialis Bedah Mulut',
    experience: '12 Tahun Pengalaman',
    avatar: '👨‍⚕️',
    schedule: [
      { days: 'Senin, Kamis', hours: '17.00 - 21.00 WIB' },
      { days: 'Minggu (By Appointment)', hours: '10.00 - 14.00 WIB' }
    ],
    focus: ['Operasi Gigi Bungsu (Odontektomi)', 'Implan Gigi Titanum', 'Bedah Minor Rongga Mulut']
  },
  {
    id: 'drg-clara',
    name: 'drg. Clara Aurelia, Sp.KGA',
    title: 'Spesialis Kedokteran Gigi Anak',
    specialist: 'Dokter Gigi Anak',
    experience: '8 Tahun Pengalaman',
    avatar: '👩‍⚕️',
    schedule: [
      { days: 'Rabu, Jumat', hours: '14.00 - 19.00 WIB' },
      { days: 'Minggu', hours: '09.30 - 13.30 WIB' }
    ],
    focus: ['Pemeriksaan Bebas Trauma Si Kecil', 'Topical Fluoride', 'Space Maintainer', 'Tambal Gigi Susu']
  }
];

export const dentalTestimonials: DentalTestimonial[] = [
  {
    patient: 'Alifia Putri, S.Farm',
    location: 'Surabaya Timur',
    treatment: 'Bleaching Laser & Scaling',
    rating: 5,
    date: '3 hari yang lalu',
    comment: 'Puas banget bleaching di sini! Dokternya super teliti dan ramah, dijelasin step-by-step jadi nggak ada rasa panik sama sekali. Nggak ngilu yang berlebihan, dan hasilnya langsung naik 4 tingkat lebih putih! Senyum jadi jauh lebih pede.'
  },
  {
    patient: 'Dimas Wicaksono',
    location: 'Jemursari, Surabaya',
    treatment: 'Operasi Gigi Bungsu (Odontektomi)',
    rating: 5,
    date: '1 minggu yang lalu',
    comment: 'Awalnya parno banget mau operasi gigi bungsu miring karena baca cerita orang-orang di sosmed. Tapi dokter bedah mulut di sini luar biasa cepat dan smooth, cuma sekitar 25 menit udah selesai tanpa rasa sakit. Pemulihannya juga cepat banget!'
  },
  {
    patient: 'Ratih Megasari (Mama dari Kenzo, 6 th)',
    location: 'Rungkut, Surabaya',
    treatment: 'Tambal & Fluoride Anak',
    rating: 5,
    date: '2 minggu yang lalu',
    comment: 'Anak saya biasanya trauma dan nangis histeris kalau ke dokter gigi. Tapi di klinik ini ruangannya wangi, ada mainan, dan dokternya pintar banget ajak ngobrol. Si kecil anteng banget bahkan pulangnya dikasih hadiah stiker juara. Terbaik!'
  },
  {
    patient: 'Kevin Aditya',
    location: 'Gubeng, Surabaya',
    treatment: 'Pasang Behel Metal Presisi',
    rating: 5,
    date: '1 bulan yang lalu',
    comment: 'Klinik gigi paling transparan soal biaya di Surabaya. Dari awal dijelasin rinciannya sampai kontrol rutinnya, bisa dicicil juga. Tempatnya bersih banget kayak hotel bintang lima, alat-alatnya steril segel dibuka depan mata kita.'
  }
];

export const clinicFacilities: ClinicFacility[] = [
  {
    title: 'Sterilisasi Autoclave Standar Medis WHO',
    desc: 'Setiap instrumen dibungkus segel kedap udara dan disterilkan dengan mesin Autoclave Kelas B bertekanan tinggi.',
    iconName: 'ShieldCheck'
  },
  {
    title: 'Teknologi Painless Dentistry',
    desc: 'Metode anestesi modern dan ultrasonic gentler touch untuk meminimalisir rasa ngilu dan nyeri selama perawatan.',
    iconName: 'HeartHandshake'
  },
  {
    title: 'Transparansi Biaya Tanpa Jebakan',
    desc: 'Semua rincian biaya perawatan diinformasikan secara jelas di awal konsultasi sebelum tindakan dilakukan.',
    iconName: 'Receipt'
  },
  {
    title: 'Lounge Nyaman & Free Wi-Fi',
    desc: 'Ruang tunggu ber-AC dingin, alunan musik relaksasi, aromaterapi menenangkan, dan complimentary coffee & tea.',
    iconName: 'Coffee'
  }
];

export const dentalFaqs = [
  {
    q: 'Apakah scaling karang gigi terasa sakit atau bikin gigi terkikis?',
    a: 'Tidak sama sekali. Teknologi ultrasonic piezo scaler yang kami gunakan bekerja dengan getaran mikro gelombang air berfrekuensi tinggi untuk merontokkan karang gigi, bukan mengikis lapisan enamel gigi Anda. Anda mungkin hanya merasakan sedikit getaran atau sensasi geli yang nyaman.'
  },
  {
    q: 'Apakah biaya pemasangan behel / kawat gigi bisa dicicil?',
    a: 'Bisa! Kami menyediakan opsi pembayaran uang muka (DP) fleksibel dan cicilan 0% setiap kali Anda datang untuk jadwal kontrol bulanan. Semua rincian diatur transparan di awal tanpa bunga tersembunyi.'
  },
  {
    q: 'Apakah perlu membuat janji temu terlebih dahulu sebelum datang?',
    a: 'Sangat disarankan untuk reservasi jadwal online via WhatsApp. Dengan reservasi terlebih dahulu, Anda tidak perlu menunggu antrean lama di klinik dan dokter spesialis yang Anda tuju sudah standby siap melayani Anda tepat waktu.'
  },
  {
    q: 'Berapa lama hasil pemutihan gigi (bleaching) bisa bertahan?',
    a: 'Hasil bleaching umumnya bertahan antara 1 hingga 2 tahun, tergantung pada kebiasaan konsumsi minuman berwarna (seperti kopi, teh, soda) dan kedisiplinan menjaga kebersihan gigi harian.'
  }
];
