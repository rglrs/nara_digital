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
  ArrowUpRight,
  Sparkles,
  ShoppingBag
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
    <div className="min-h-screen bg-[#FDFBF7] text-stone-800 font-sans selection:bg-orange-100 selection:text-orange-900">
      {/* Top Demo Banner by NARA Dev Studio */}
      <aside aria-label="Demo Bar" className="sticky top-0 z-50 bg-stone-900 text-stone-200 text-xs py-2 px-4 shadow-sm flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
          <span className="text-[11px] sm:text-xs">
            Prototipe Digital Menu &bull; Dibuat khusus oleh <strong className="text-white font-semibold">NARA Dev Studio</strong>
          </span>
        </div>
        <a
          href="https://wa.me/6285602743489?text=Halo%20NARA%20Dev,%20saya%20tertarik%20membuat%20digital%20menu%20dan%20landing%20page%20seperti%20demo%20Ikan%20Bakar%20Malioboro"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors"
        >
          <span>Pesan Website Serupa</span>
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </aside>

      <main className="max-w-3xl mx-auto pb-28 sm:pb-24">
        {/* Hero Section */}
        <section className="relative bg-white border-b border-stone-200">
          {/* Cover Photo */}
          <div className="relative h-56 sm:h-72 w-full overflow-hidden bg-stone-100">
            <Image
              src={data.heroImage}
              alt={data.name}
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Profile & Info Card */}
          <div className="relative px-4 sm:px-6 pt-4 pb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-16 sm:-mt-20 mb-4">
              {/* Logo Emblem */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-white p-1 shadow-lg ring-4 ring-white shrink-0">
                <Image
                  src={data.logoImage}
                  alt={data.name}
                  width={120}
                  height={120}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Title & Tagline */}
              <div className="text-center sm:text-left flex-1 space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-orange-50 text-orange-700 border border-orange-200">
                  <span>{data.badgeText}</span>
                </div>
                <h1 className="text-xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  {data.name}
                </h1>
                <p className="text-xs sm:text-sm text-stone-600">
                  {data.tagline}
                </p>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 py-3 border-y border-stone-100 text-xs text-stone-600">
              <span className="flex items-center gap-1 text-amber-600 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{data.googleRating}</span>
                <span className="text-stone-500 font-normal">({data.reviewCount} ulasan di Google Maps)</span>
              </span>
              <span className="text-stone-300">•</span>
              <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                <span>{data.openingHours}</span>
              </span>
              <span className="text-stone-300">•</span>
              <span className="flex items-center gap-1 text-stone-600">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                <span>{data.city}</span>
              </span>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-3 gap-2.5 pt-4">
              <button
                type="button"
                onClick={() => setShowReservationModal(true)}
                className="flex flex-col sm:flex-row items-center justify-center gap-1.5 p-2.5 sm:p-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all shadow-sm cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>Reservasi Meja</span>
              </button>

              <a
                href={data.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col sm:flex-row items-center justify-center gap-1.5 p-2.5 sm:p-3 rounded-xl bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 font-medium text-xs transition-colors shadow-2xs"
              >
                <MapPin className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Petunjuk Maps</span>
              </a>

              <button
                type="button"
                onClick={() => setShowCouponModal(true)}
                className="flex flex-col sm:flex-row items-center justify-center gap-1.5 p-2.5 sm:p-3 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-800 border border-orange-200 font-semibold text-xs transition-colors cursor-pointer"
              >
                <Percent className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Kupon Diskon 10%</span>
              </button>
            </div>
          </div>
        </section>

        {/* Voucher Notification Card */}
        <div className="px-4 sm:px-6 pt-4">
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/80 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-2 rounded-lg bg-orange-100 text-orange-700 shrink-0">
                <Percent className="w-4 h-4" />
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-stone-900">Promo Kunjungan Spesial</div>
                <div className="text-[11px] text-stone-600 truncate">
                  Kode voucher <strong className="font-mono text-orange-700">MALIOBORO10</strong> untuk potongan 10%.
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowCouponModal(true)}
              className="text-xs px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-semibold shrink-0 transition-colors cursor-pointer"
            >
              Klaim
            </button>
          </div>
        </div>

        {/* Menu Section */}
        <section id="menu-section" className="px-4 sm:px-6 py-6 space-y-4">
          {/* Search & Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
                <span>Daftar Menu & Harga</span>
                <span className="text-xs font-normal text-stone-500">({data.menus.length} menu)</span>
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Buka menu tanpa download PDF berat. Pilih menu dan pesan via WhatsApp.
              </p>
            </div>

            {/* Search Box */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari ikan, cumi, udang..."
                className="w-full pl-9 pr-3.5 py-2 rounded-xl text-xs bg-white border border-stone-200 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-orange-500 transition-colors shadow-2xs"
              />
            </div>
          </div>

          {/* Category Tabs (Scrollable) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            {data.categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium shrink-0 transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-stone-900 text-white font-semibold shadow-xs'
                    : 'bg-white hover:bg-stone-50 text-stone-600 border border-stone-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Menu Items List (Clean Card Layout) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
            {filteredMenus.map((item) => (
              <div
                key={item.id}
                className="p-3.5 sm:p-4 rounded-2xl bg-white border border-stone-200/80 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div className="flex gap-3 items-start">
                  {/* Photo if available */}
                  {item.image && (
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 bg-stone-100 border border-stone-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {item.isSignature && (
                        <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-orange-100 text-orange-800">
                          Signature
                        </span>
                      )}
                      {item.isPopular && (
                        <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-rose-100 text-rose-800">
                          Favorit
                        </span>
                      )}
                      {item.portion && (
                        <span className="text-[10px] text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">
                          {item.portion}
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-sm sm:text-base text-stone-900 tracking-tight">
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
                    <span className="text-sm sm:text-base font-extrabold text-stone-900">
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
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-orange-600 hover:bg-orange-700 text-white shadow-2xs transition-all active:scale-95 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah</span>
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

        {/* Facilities Section */}
        <section className="px-4 sm:px-6 py-4">
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-stone-200/80 space-y-4">
            <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span>Fasilitas & Kenyamanan Resto</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.facilities.map((fac, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-stone-50/80 border border-stone-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center shrink-0 mt-0.5">
                    {fac.icon === 'Users' && <Users className="w-4 h-4" />}
                    {fac.icon === 'Car' && <Car className="w-4 h-4" />}
                    {fac.icon === 'Fish' && <Utensils className="w-4 h-4" />}
                    {fac.icon === 'Sparkles' && <Sparkles className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900">{fac.title}</div>
                    <div className="text-[11px] text-stone-500 mt-0.5">{fac.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location & Contact Details */}
        <section className="px-4 sm:px-6 py-4">
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-stone-200/80 space-y-4">
            <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-600" />
              <span>Lokasi & Kontak Restoran</span>
            </h2>

            <div className="space-y-1.5 text-xs text-stone-600 leading-relaxed">
              <p className="font-semibold text-stone-900">{data.name}</p>
              <p>{data.address}</p>
              <p className="text-emerald-700 font-medium">🕒 {data.openingHours}</p>
            </div>

            <div className="pt-2 flex flex-wrap gap-2.5">
              <a
                href={data.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium text-xs transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-orange-600" />
                <span>Petunjuk Arah Google Maps</span>
                <ExternalLink className="w-3 h-3 text-stone-400" />
              </a>

              <a
                href={`https://wa.me/${data.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp: {data.whatsappDisplay}</span>
              </a>
            </div>
          </div>
        </section>

        {/* Footer with NARA Dev Credit */}
        <footer className="px-4 sm:px-6 pt-6 pb-12 text-center space-y-3 text-xs text-stone-500">
          <p>&copy; {new Date().getFullYear()} {data.name}. All Rights Reserved.</p>
          <div className="pt-3 border-t border-stone-200 max-w-sm mx-auto">
            <p className="text-[11px] text-stone-500">
              Desain & Prototipe Digital Menu oleh{' '}
              <a
                href="https://www.naradev.web.id"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-800 font-semibold underline underline-offset-2 hover:text-orange-600"
              >
                NARA Dev Studio
              </a>
            </p>
          </div>
        </footer>
      </main>

      {/* Floating Bottom Bar (Cart / Tray Bar) */}
      {cart.length > 0 && (
        <aside aria-label="Tray Pesanan" className="fixed bottom-0 left-0 right-0 z-40 p-3 sm:p-4 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-xl animate-in slide-in-from-bottom-3">
          <div className="max-w-xl mx-auto flex items-center justify-between gap-3">
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
                className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-xs text-stone-700 font-semibold cursor-pointer hidden sm:block"
              >
                Rincian
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
                <span>Daftar Pesanan ({totalCartCount})</span>
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
                Berlaku untuk semua menu ikan bakar & seafood pada kunjungan makan di tempat.
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
