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
  Sparkles,
  Percent,
  Check,
  ChevronRight,
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
  Layers,
  ArrowUpRight
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
    let orderText = `Halo *${data.name}*, saya ingin memesan menu untuk makan di tempat / take away:\n\n`;

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
    <div className="min-h-screen bg-[#0d1117] text-slate-100 font-sans selection:bg-amber-500 selection:text-black">
      {/* Top Floating Demo Indicator Bar by NARA Dev */}
      <aside aria-label="Demo Bar" className="sticky top-0 z-50 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white text-xs py-2 px-4 shadow-md flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping inline-block" />
          <span className="font-semibold tracking-wide">
            Interactive Digital Menu Demo by <strong className="underline underline-offset-2">NARA Dev Studio</strong>
          </span>
          <span className="hidden sm:inline-block bg-black/25 text-[11px] px-2 py-0.5 rounded-full font-mono">
            Solusi Resto & Kuliner
          </span>
        </div>
        <a
          href="https://wa.me/6285602743489?text=Halo%20NARA%20Dev,%20saya%20tertarik%20membuat%20digital%20menu%20dan%20landing%20page%20seperti%20demo%20Ikan%20Bakar%20Malioboro"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 bg-black/40 hover:bg-black/60 text-white px-3 py-1 rounded-md text-[11px] font-semibold transition-all hover:scale-105"
        >
          <span>Pesan Website Seperti Ini</span>
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </aside>

      <main className="max-w-4xl mx-auto pb-28 sm:pb-20">
        {/* Hero Banner Section */}
        <section className="relative overflow-hidden border-b border-slate-800">
          {/* Background Photo with Dark Vignette */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden">
            <Image
              src={data.heroImage}
              alt={data.name}
              fill
              className="object-cover object-center filter brightness-90 hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/60 to-transparent" />
          </div>

          {/* Restaurant Identity Header Card */}
          <div className="relative px-4 sm:px-8 -mt-20 pb-6 text-center sm:text-left flex flex-col sm:flex-row items-center sm:items-end gap-5">
            {/* Logo Emblem Badge */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-br from-amber-400 to-orange-600 shadow-xl shadow-orange-950/40 shrink-0">
              <div className="w-full h-full rounded-full overflow-hidden bg-black border-2 border-[#0d1117]">
                <Image
                  src={data.logoImage}
                  alt={data.name}
                  width={140}
                  height={140}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Title & Info */}
            <div className="space-y-1.5 flex-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <Sparkles className="w-3 h-3" />
                <span>{data.badgeText}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {data.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300">
                {data.tagline}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-xs text-slate-400">
                <span className="flex items-center gap-1 text-amber-400 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{data.googleRating}</span>
                  <span className="text-slate-400 font-normal">({data.reviewCount} Ulasan Google)</span>
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  <span>{data.openingHours}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons (Upgrade dari tombol Taplink lama) */}
          <div className="px-4 sm:px-8 pb-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                type="button"
                onClick={() => setShowReservationModal(true)}
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-emerald-950/40 transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>Reservasi Meja</span>
              </button>

              <a
                href={data.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-semibold text-xs sm:text-sm transition-all hover:-translate-y-0.5"
              >
                <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Google Maps</span>
              </a>

              <a
                href="#menu-section"
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-semibold text-xs sm:text-sm transition-all hover:-translate-y-0.5"
              >
                <Utensils className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Lihat Menu</span>
              </a>

              <button
                type="button"
                onClick={() => setShowCouponModal(true)}
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-amber-600/30 to-orange-600/30 hover:bg-amber-600/40 text-amber-300 border border-amber-500/40 font-semibold text-xs sm:text-sm transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <Percent className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Kupon Diskon 10%</span>
              </button>
            </div>
          </div>
        </section>

        {/* Promo Announcement Banner */}
        <div className="px-4 sm:px-8 py-3">
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-orange-950/60 border border-amber-500/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
                <Percent className="w-4 h-4" />
              </span>
              <div className="truncate">
                <div className="text-xs font-bold text-white">Promo Spesial Reservasi Online</div>
                <div className="text-[11px] text-slate-300 truncate">
                  Gunakan kode kupon <span className="font-mono text-amber-300 font-bold">MALIOBORO10</span> dapatkan diskon 10%!
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowCouponModal(true)}
              className="text-xs px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold shrink-0 transition-colors cursor-pointer"
            >
              Klaim
            </button>
          </div>
        </div>

        {/* Menu Section */}
        <section id="menu-section" className="px-4 sm:px-8 py-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <span>Daftar Menu & Harga</span>
                <span className="text-xs font-normal text-slate-400">({data.menus.length} Pilihan)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Bebas download PDF yang berat. Pilih menu langsung dan kirim ke WhatsApp!
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari ikan bakar, udang..."
                className="w-full pl-9 pr-3.5 py-2 rounded-xl text-xs bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          {/* Category Tabs (Horizontal Scrollable on Mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
            {data.categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl font-medium shrink-0 transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Menu Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
            {filteredMenus.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group shadow-sm hover:shadow-md"
              >
                <div className="flex gap-3.5 items-start">
                  {/* Photo if available */}
                  {item.image && (
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 border border-slate-800">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {item.isSignature && (
                        <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          Signature
                        </span>
                      )}
                      {item.isPopular && (
                        <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          Favorit
                        </span>
                      )}
                      {item.portion && (
                        <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                          {item.portion}
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-sm sm:text-base text-white tracking-tight">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Price and Add button bar */}
                <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Harga</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm sm:text-base font-extrabold text-amber-400">
                        Rp {item.price.toLocaleString('id-ID')}
                      </span>
                      {item.originalPrice && (
                        <span className="text-xs text-slate-500 line-through">
                          Rp {item.originalPrice.toLocaleString('id-ID')}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => addToCart(item)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-black shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Pilih</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredMenus.length === 0 && (
            <div className="py-12 text-center text-slate-400 text-sm">
              Tidak ada menu yang sesuai dengan pencarian &quot;{searchQuery}&quot;.
            </div>
          )}
        </section>

        {/* Facilities Section */}
        <section className="px-4 sm:px-8 py-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Fasilitas & Kenyamanan Resto</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {data.facilities.map((fac, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-800 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    {fac.icon === 'Users' && <Users className="w-4 h-4" />}
                    {fac.icon === 'Car' && <Car className="w-4 h-4" />}
                    {fac.icon === 'Fish' && <Utensils className="w-4 h-4" />}
                    {fac.icon === 'Sparkles' && <Sparkles className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{fac.title}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{fac.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location & Contact Details */}
        <section className="px-4 sm:px-8 py-4">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-400" />
              <span>Lokasi & Kontak Restoran</span>
            </h2>

            <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
              <p className="font-semibold text-white">{data.name}</p>
              <p>{data.address}</p>
              <p className="text-amber-400 font-medium">🕒 {data.openingHours}</p>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={data.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>Buka Petunjuk Arah di Maps</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              <a
                href={`https://wa.me/${data.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp: {data.whatsappDisplay}</span>
              </a>
            </div>
          </div>
        </section>

        {/* Footer with NARA Dev Credit */}
        <footer className="px-4 sm:px-8 pt-8 pb-12 text-center space-y-3 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} {data.name}. All Rights Reserved.</p>
          <div className="pt-2 border-t border-slate-800/80 max-w-md mx-auto">
            <p className="text-[11px] text-slate-400">
              Interactive Digital Menu Platform engineered by{' '}
              <a
                href="https://www.naradev.web.id"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 font-semibold hover:underline"
              >
                NARA Dev Digital Product Studio
              </a>
            </p>
          </div>
        </footer>
      </main>

      {/* Floating Bottom Bar (Mobile Cart / Tray Bar) */}
      {cart.length > 0 && (
        <aside aria-label="Tray Pesanan" className="fixed bottom-0 left-0 right-0 z-40 p-3 sm:p-4 bg-[#0d1117]/95 backdrop-blur-md border-t border-slate-800 shadow-2xl animate-in slide-in-from-bottom-5">
          <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setShowCartDrawer(true)}
              className="flex items-center gap-3 text-left cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-black flex items-center justify-center font-bold text-sm shadow-md shadow-amber-500/30 group-hover:scale-105 transition-transform">
                {totalCartCount}
              </div>
              <div>
                <div className="text-xs text-slate-400">Total Estimasi Pesanan</div>
                <div className="text-sm sm:text-base font-extrabold text-white">
                  Rp {totalCartPrice.toLocaleString('id-ID')}
                </div>
              </div>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowCartDrawer(true)}
                className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-semibold border border-slate-700 cursor-pointer hidden sm:block"
              >
                Rincian
              </button>

              <a
                href={generateWhatsAppOrderUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-950/40 transition-all hover:scale-105 cursor-pointer"
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Utensils className="w-4 h-4 text-amber-400" />
                <span>Daftar Pesanan Menu ({totalCartCount})</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowCartDrawer(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Item list */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-800/80 space-y-2 pr-1">
              {cart.map(({ item, qty }) => (
                <div key={item.id} className="pt-2 flex items-center justify-between gap-3 text-xs">
                  <div className="min-w-0">
                    <div className="font-bold text-white truncate">{item.name}</div>
                    <div className="text-slate-400">Rp {item.price.toLocaleString('id-ID')} x {qty}</div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => updateCartQty(item.id, -1)}
                      className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center font-bold cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center font-bold text-white text-sm">{qty}</span>
                    <button
                      type="button"
                      onClick={() => updateCartQty(item.id, 1)}
                      className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center font-bold cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total and CTA */}
            <div className="pt-3 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 font-medium">Subtotal</span>
                <span className="font-extrabold text-white text-base">
                  Rp {totalCartPrice.toLocaleString('id-ID')}
                </span>
              </div>

              {couponClaimed && (
                <div className="text-xs text-emerald-400 flex items-center gap-1.5 bg-emerald-950/40 p-2 rounded-lg border border-emerald-800/40">
                  <Check className="w-3.5 h-3.5" />
                  <span>Kupon MALIOBORO10 aktif (Akan dihitung kasir saat transaksi)</span>
                </div>
              )}

              <a
                href={generateWhatsAppOrderUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/40 transition-colors"
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>Formulir Reservasi Meja</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowReservationModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nama Pemesan *</label>
                <input
                  type="text"
                  placeholder="Nama Lengkap Anda"
                  value={reservationForm.name}
                  onChange={(e) => setReservationForm({ ...reservationForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Jumlah Orang</label>
                  <input
                    type="number"
                    min="1"
                    value={reservationForm.guestCount}
                    onChange={(e) => setReservationForm({ ...reservationForm, guestCount: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Jam Kedatangan</label>
                  <input
                    type="time"
                    value={reservationForm.time}
                    onChange={(e) => setReservationForm({ ...reservationForm, time: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tanggal</label>
                <input
                  type="date"
                  value={reservationForm.date}
                  onChange={(e) => setReservationForm({ ...reservationForm, date: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Catatan Tambahan</label>
                <textarea
                  rows={2}
                  value={reservationForm.notes}
                  onChange={(e) => setReservationForm({ ...reservationForm, notes: e.target.value })}
                  placeholder="Misal: Butuh baby chair, area bebas rokok..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="pt-2">
              <a
                href={generateWhatsAppReservationUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-950/40 transition-colors"
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-slate-900 border border-amber-500/40 rounded-3xl p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
              <Percent className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Voucher Diskon 10%</h3>
              <p className="text-xs text-slate-400">
                Berlaku untuk semua menu ikan bakar & seafood pada kunjungan makan di tempat.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-dashed border-amber-500/60 font-mono text-base font-bold text-amber-300 tracking-wider">
              MALIOBORO10
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={() => {
                  setCouponClaimed(true);
                  setShowCouponModal(false);
                }}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                {couponClaimed ? 'Kupon Sudah Aktif' : 'Gunakan Kupon Ini'}
              </button>

              <button
                type="button"
                onClick={() => setShowCouponModal(false)}
                className="w-full text-xs text-slate-400 hover:text-white py-1 cursor-pointer"
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
