'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  MapPin,
  Clock,
  Phone,
  MessageSquare,
  Search,
  Star,
  Percent,
  Check,
  Plus,
  Minus,
  Trash2,
  Users,
  Car,
  Utensils,
  ExternalLink,
  X,
  Send,
  Calendar,
  ArrowUpRight,
  ShoppingBag,
  Flame,
  Fish,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { malioboroRestoData, MenuItem } from '@/data/restoDemoData';

export default function IkanBakarMalioboroDemo() {
  const data = malioboroRestoData;

  // State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<{ item: MenuItem; qty: number }[]>([]);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [couponClaimed, setCouponClaimed] = useState(false);

  // Reservation form state
  const [reservationForm, setReservationForm] = useState({
    name: '',
    guestCount: '4',
    date: '',
    time: '18:30',
    notes: 'Mohon siapkan meja area bebas rokok / dekat musholla.',
  });

  // Filtered menu calculation
  const filteredMenus = useMemo(() => {
    return data.menus.filter((item) => {
      const matchCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery, data.menus]);

  // Cart operations
  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.item.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.item.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { item, qty: 1 }];
    });
  };

  const updateCartQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.item.id === id) {
            const newQty = i.qty + delta;
            return newQty > 0 ? { ...i, qty: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as { item: MenuItem; qty: number }[]
    );
  };

  const totalCartPrice = useMemo(() => {
    return cart.reduce((acc, curr) => acc + curr.item.price * curr.qty, 0);
  }, [cart]);

  const totalCartCount = useMemo(() => {
    return cart.reduce((acc, curr) => acc + curr.qty, 0);
  }, [cart]);

  // WhatsApp Order Generator
  const generateWhatsAppOrderUrl = () => {
    let orderText = `Halo *${data.name}*, saya ingin memesan menu:\n\n`;

    cart.forEach((c, idx) => {
      orderText += `${idx + 1}. ${c.item.name} (${c.qty}x) = Rp ${(c.item.price * c.qty).toLocaleString('id-ID')}\n`;
    });

    orderText += `\n*Total Estimasi: Rp ${totalCartPrice.toLocaleString('id-ID')}*`;

    if (couponClaimed) {
      orderText += `\n🎁 *Kupon: MALIOBORO10 (Diskon 10% Online)*`;
    }

    orderText += `\n\nMohon konfirmasi ketersediaan meja dan menu. Terima kasih!`;

    return `https://wa.me/${data.whatsappNumber}?text=${encodeURIComponent(orderText)}`;
  };

  // WhatsApp Reservation Generator
  const generateWhatsAppReservationUrl = () => {
    const resText = `Halo *${data.name}*, saya ingin reservasi meja atas nama:\n\n` +
      `👤 Nama: *${reservationForm.name || '[Nama Anda]'}*\n` +
      `👥 Jumlah Orang: *${reservationForm.guestCount} Orang*\n` +
      `📅 Tanggal: *${reservationForm.date || 'Hari Ini'}*\n` +
      `⏰ Jam: *${reservationForm.time} WIB*\n` +
      `📝 Catatan: ${reservationForm.notes}\n\n` +
      `Mohon info apakah meja masih tersedia. Terima kasih!`;

    return `https://wa.me/${data.whatsappNumber}?text=${encodeURIComponent(resText)}`;
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-stone-900 font-sans selection:bg-orange-100 selection:text-orange-900 antialiased">
      {/* Top Demo Context Bar by NARA Dev */}
      <aside aria-label="Demo Bar" className="bg-stone-900 text-stone-200 text-xs py-2 px-4 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
          <span className="text-[11px] sm:text-xs">
            Prototipe Konsep Website & Digital Menu &bull; Dibuat khusus oleh <strong className="text-white font-semibold">NARA Dev Studio</strong>
          </span>
        </div>
        <a
          href="https://wa.me/6285602743489?text=Halo%20NARA%20Dev,%20saya%20tertarik%20membuat%20digital%20menu%20dan%20landing%20page%20seperti%20demo%20Ikan%20Bakar%20Malioboro"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-orange-400 hover:text-orange-300 transition-colors"
        >
          <span>Pesan Website Serupa</span>
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </aside>

      {/* Main Navbar (Professional F&B Brand Style like fbindonesia.com) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 h-18 sm:h-20 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-stone-200 bg-stone-50 shrink-0 shadow-2xs">
              <Image
                src={data.logoImage}
                alt={data.name}
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-extrabold text-stone-900 text-base sm:text-lg tracking-tight uppercase leading-tight">
                {data.shortName}
              </div>
              <div className="text-[11px] text-stone-500 font-medium tracking-wide">
                Surabaya &bull; Est. {data.establishedYear}
              </div>
            </div>
          </div>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-stone-600">
            <a href="#tentang" className="hover:text-orange-600 transition-colors">Tentang Kami</a>
            <a href="#menu-section" className="hover:text-orange-600 transition-colors">Daftar Menu</a>
            <a href="#fasilitas" className="hover:text-orange-600 transition-colors">Fasilitas</a>
            <a href="#lokasi" className="hover:text-orange-600 transition-colors">Lokasi & Kontak</a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setShowReservationModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-2xs cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Reservasi Meja</span>
            </button>
            <a
              href="#menu-section"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 sm:py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition-colors"
            >
              <Utensils className="w-3.5 h-3.5 text-orange-600" />
              <span>Buka Menu</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 space-y-12 sm:space-y-16 pb-28 pt-6 sm:pt-10">
        
        {/* Hero Section (Two-Column Layout, Proper Spacing, Zero Collision) */}
        <section id="tentang" className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-800 border border-orange-200/70">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-600 inline-block" />
                <span>Restoran Keluarga & Seafood Khas Nusantara</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.15]">
                Kelezatan Ikan Bakar Rempah &amp; Seafood Segar
              </h1>

              <p className="text-stone-600 text-xs sm:text-base leading-relaxed max-w-xl">
                Nikmati olahan gurame bakar arang dengan racikan bumbu rempah tradisional khas Malioboro, pilihan seafood hidup segar yang ditimbang langsung, serta aneka sambal ulek dadak untuk momen makan bersama keluarga tercinta.
              </p>

              {/* Verified Metrics Bar */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-stone-600 border-t border-stone-100">
                <div className="flex items-center gap-1 text-amber-600 font-bold">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>4.8</span>
                  <span className="text-stone-500 font-normal">({data.reviewCount} ulasan di Google Maps)</span>
                </div>
                <div className="text-stone-300 hidden sm:inline">&bull;</div>
                <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                  <span>{data.openingHours}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setShowReservationModal(true)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Reservasi Meja (WhatsApp)</span>
                </button>

                <a
                  href="#menu-section"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-colors"
                >
                  <Utensils className="w-4 h-4" />
                  <span>Lihat Daftar Menu</span>
                </a>

                <a
                  href={data.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium text-xs sm:text-sm transition-colors"
                >
                  <MapPin className="w-4 h-4 text-orange-600" />
                  <span>Petunjuk Arah</span>
                </a>
              </div>
            </div>

            {/* Right Culinary Image Showcase */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-md aspect-4/3 sm:aspect-square lg:aspect-4/3">
                <Image
                  src={data.heroImage}
                  alt={data.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-xs p-3 rounded-xl border border-stone-200 shadow-xs flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-stone-900">Gurame Bakar Bumbu Malioboro</div>
                    <div className="text-[11px] text-stone-500">Menu Andalan &amp; Rekomendasi Utama</div>
                  </div>
                  <span className="text-xs font-extrabold text-orange-700 bg-orange-50 px-2 py-1 rounded-md">
                    Rp 68.000
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Promo Voucher Highlight */}
        <section className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border border-orange-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3.5 text-left w-full sm:w-auto">
            <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
              <Percent className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-stone-900">
                Promo Spesial Kunjungan &bull; Diskon 10%
              </div>
              <div className="text-[11px] sm:text-xs text-stone-600">
                Gunakan kode voucher reservasi online: <strong className="font-mono text-orange-700 font-bold">MALIOBORO10</strong>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowCouponModal(true)}
            className="w-full sm:w-auto text-xs px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold shrink-0 transition-colors cursor-pointer text-center"
          >
            Klaim Voucher
          </button>
        </section>

        {/* Menu Section (Clean, App-like, Intuitive) */}
        <section id="menu-section" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <div className="text-xs font-bold text-orange-700 uppercase tracking-wider mb-1">
                Katalog Kuliner
              </div>
              <h2 className="text-xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                Daftar Menu &amp; Harga Resmi
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Pilih menu langsung dan kirim ke WhatsApp tanpa perlu mengunduh file PDF yang berat.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari ikan bakar, cumi, udang..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-white border border-stone-200 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-orange-500 transition-colors shadow-2xs"
              />
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
            {data.categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-stone-900 text-white shadow-2xs'
                    : 'bg-white hover:bg-stone-100 text-stone-600 border border-stone-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Menu Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
            {filteredMenus.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-stone-200/90 rounded-2xl p-4 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Photo if available */}
                  {item.image && (
                    <div className="relative w-full h-40 rounded-xl overflow-hidden bg-stone-100 border border-stone-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {item.isSignature && (
                        <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-orange-100 text-orange-800">
                          Signature
                        </span>
                      )}
                      {item.isPopular && (
                        <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-rose-100 text-rose-800">
                          Favorit
                        </span>
                      )}
                      {item.portion && (
                        <span className="text-[10px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded font-medium">
                          {item.portion}
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-sm sm:text-base text-stone-900 tracking-tight leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Price and Add button */}
                <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-extrabold text-stone-900">
                      Rp {item.price.toLocaleString('id-ID')}
                    </span>
                    {item.originalPrice && (
                      <span className="text-xs text-stone-400 line-through">
                        Rp {item.originalPrice.toLocaleString('id-ID')}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => addToCart(item)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-orange-600 hover:bg-orange-700 text-white shadow-2xs transition-all active:scale-95 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Pilih</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredMenus.length === 0 && (
            <div className="py-12 text-center text-stone-500 text-sm bg-white rounded-2xl border border-stone-200">
              Tidak ada menu yang sesuai dengan pencarian &quot;{searchQuery}&quot;.
            </div>
          )}
        </section>

        {/* Facilities Section (Real Culinary Icons, No AI Sparkles!) */}
        <section id="fasilitas" className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-10 space-y-6 shadow-xs">
          <div>
            <div className="text-xs font-bold text-orange-700 uppercase tracking-wider mb-1">
              Kenyamanan Pengunjung
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Fasilitas &amp; Keunggulan Restoran
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Standar kenyamanan lengkap untuk jamuan makan bersama keluarga, rombongan kantor, dan acara khusus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.facilities.map((fac, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-stone-50 border border-stone-200/70 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center shrink-0">
                  {fac.icon === 'Flame' && <Flame className="w-5 h-5" />}
                  {fac.icon === 'Fish' && <Fish className="w-5 h-5" />}
                  {fac.icon === 'Users' && <Users className="w-5 h-5" />}
                  {fac.icon === 'CheckCircle2' && <CheckCircle2 className="w-5 h-5" />}
                  {fac.icon === 'Car' && <Car className="w-5 h-5" />}
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-stone-900">{fac.title}</div>
                  <div className="text-[11px] sm:text-xs text-stone-500 mt-0.5 leading-relaxed">{fac.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Location & Contact Section */}
        <section id="lokasi" className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-10 space-y-6 shadow-xs">
          <div>
            <div className="text-xs font-bold text-orange-700 uppercase tracking-wider mb-1">
              Informasi Kunjungan
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Lokasi &amp; Jam Operasional
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
              <div>
                <div className="text-xs text-stone-400 font-medium">Nama Tempat</div>
                <div className="font-bold text-stone-900 text-base">{data.name}</div>
              </div>

              <div>
                <div className="text-xs text-stone-400 font-medium">Alamat Lengkap</div>
                <div className="text-stone-800">{data.address}</div>
              </div>

              <div>
                <div className="text-xs text-stone-400 font-medium">Jam Buka</div>
                <div className="font-semibold text-emerald-700">{data.openingHours}</div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={data.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-orange-400" />
                  <span>Buka di Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>

                <a
                  href={`https://wa.me/${data.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Hubungi WhatsApp: {data.whatsappDisplay}</span>
                </a>
              </div>
            </div>

            <div className="md:col-span-5 bg-stone-50 border border-stone-200 rounded-2xl p-5 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-stone-900 text-sm">Reservasi Meja Diperlukan?</div>
                <p className="text-xs text-stone-500 mt-1">
                  Untuk kunjungan rombongan keluarga besar atau makan malam di akhir pekan, kami sarankan reservasi meja terlebih dahulu.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowReservationModal(true)}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Booking Meja Sekarang
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-stone-200 pt-8 text-center space-y-4 text-xs text-stone-500">
          <div className="flex flex-wrap items-center justify-center gap-6 font-medium text-stone-600">
            <a href="#tentang" className="hover:text-stone-900">Tentang</a>
            <a href="#menu-section" className="hover:text-stone-900">Menu</a>
            <a href="#fasilitas" className="hover:text-stone-900">Fasilitas</a>
            <a href="#lokasi" className="hover:text-stone-900">Lokasi & Kontak</a>
          </div>

          <p>&copy; {new Date().getFullYear()} {data.name}. Hak Cipta Dilindungi.</p>

          <div className="pt-2">
            <p className="text-[11px] text-stone-400">
              Prototipe Konsep Website &amp; Digital Menu dikembangkan oleh{' '}
              <a
                href="https://www.naradev.web.id"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-700 font-semibold underline underline-offset-2 hover:text-orange-600"
              >
                NARA Dev Studio
              </a>
            </p>
          </div>
        </footer>
      </main>

      {/* Floating Bottom Bar (Cart / Order Tray) */}
      {cart.length > 0 && (
        <aside aria-label="Tray Pesanan" className="fixed bottom-0 left-0 right-0 z-40 p-3 sm:p-4 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-2xl animate-in slide-in-from-bottom-3">
          <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setShowCartDrawer(true)}
              className="flex items-center gap-2.5 text-left cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                {totalCartCount}
              </div>
              <div>
                <div className="text-[11px] text-stone-500">Estimasi Pesanan</div>
                <div className="text-sm sm:text-base font-extrabold text-stone-900">
                  Rp {totalCartPrice.toLocaleString('id-ID')}
                </div>
              </div>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowCartDrawer(true)}
                className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-xs text-stone-700 font-semibold cursor-pointer hidden sm:block"
              >
                Rincian Pesanan
              </button>

              <a
                href={generateWhatsAppOrderUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim Pesanan ke WA</span>
              </a>
            </div>
          </div>
        </aside>
      )}

      {/* Cart Detail Modal / Drawer */}
      {showCartDrawer && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 space-y-4 max-h-[85vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-orange-600" />
                <span>Rincian Pesanan ({totalCartCount})</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowCartDrawer(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Item list */}
            <div className="flex-1 overflow-y-auto divide-y divide-stone-100 space-y-2 pr-1">
              {cart.map(({ item, qty }) => (
                <div key={item.id} className="pt-2 flex items-center justify-between gap-3 text-xs">
                  <div className="min-w-0">
                    <div className="font-bold text-stone-900 truncate">{item.name}</div>
                    <div className="text-stone-500">Rp {item.price.toLocaleString('id-ID')} x {qty}</div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => updateCartQty(item.id, -1)}
                      className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center font-bold cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center font-bold text-stone-900 text-sm">{qty}</span>
                    <button
                      type="button"
                      onClick={() => updateCartQty(item.id, 1)}
                      className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center font-bold cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total and CTA */}
            <div className="pt-3 border-t border-stone-200 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-stone-500 font-medium">Subtotal</span>
                <span className="font-extrabold text-stone-900 text-base">
                  Rp {totalCartPrice.toLocaleString('id-ID')}
                </span>
              </div>

              {couponClaimed && (
                <div className="text-xs text-emerald-800 flex items-center gap-1.5 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Kupon MALIOBORO10 aktif (Dihitung kasir saat pembayaran)</span>
                </div>
              )}

              <a
                href={generateWhatsAppOrderUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Pesanan ke WhatsApp Resto</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Reservation Modal */}
      {showReservationModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>Formulir Reservasi Meja</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowReservationModal(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Nama Pemesan *</label>
                <input
                  type="text"
                  placeholder="Nama Lengkap Anda"
                  value={reservationForm.name}
                  onChange={(e) => setReservationForm({ ...reservationForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:outline-none focus:border-orange-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Jumlah Orang</label>
                  <input
                    type="number"
                    min="1"
                    value={reservationForm.guestCount}
                    onChange={(e) => setReservationForm({ ...reservationForm, guestCount: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:outline-none focus:border-orange-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Jam Kedatangan</label>
                  <input
                    type="time"
                    value={reservationForm.time}
                    onChange={(e) => setReservationForm({ ...reservationForm, time: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:outline-none focus:border-orange-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Tanggal</label>
                <input
                  type="date"
                  value={reservationForm.date}
                  onChange={(e) => setReservationForm({ ...reservationForm, date: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:outline-none focus:border-orange-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Catatan Tambahan</label>
                <textarea
                  rows={2}
                  value={reservationForm.notes}
                  onChange={(e) => setReservationForm({ ...reservationForm, notes: e.target.value })}
                  placeholder="Misal: Meja dekat musholla, baby chair..."
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:outline-none focus:border-orange-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="pt-2">
              <a
                href={generateWhatsAppReservationUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Reservasi ke WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Coupon Modal */}
      {showCouponModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center mx-auto">
              <Percent className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-stone-900">Voucher Diskon 10%</h3>
              <p className="text-xs text-stone-500">
                Berlaku untuk semua menu ikan bakar &amp; seafood pada kunjungan makan di tempat.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-orange-50 border border-dashed border-orange-300 font-mono text-base font-bold text-orange-800 tracking-wider">
              MALIOBORO10
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={() => {
                  setCouponClaimed(true);
                  setShowCouponModal(false);
                }}
                className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
              >
                {couponClaimed ? 'Kupon Sudah Aktif' : 'Gunakan Kupon Ini'}
              </button>

              <button
                type="button"
                onClick={() => setShowCouponModal(false)}
                className="w-full text-xs text-stone-400 hover:text-stone-700 py-1 cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
