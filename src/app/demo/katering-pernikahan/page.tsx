'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Utensils,
  Calendar,
  Users,
  CheckCircle2,
  Award,
  Sparkles,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  ChevronRight,
  Star,
  ShieldCheck,
  Heart,
  Calculator,
  Sliders,
  ChevronDown,
  ChevronUp,
  Share2,
  ExternalLink,
  Flame,
  Cake,
  Building2,
  Check
} from 'lucide-react';
import {
  defaultCateringConfig,
  weddingPackages,
  stallHighlights,
  weddingTestimonials,
  weddingVenuesSurabaya,
  WeddingPackage
} from '@/data/weddingCateringData';

function formatRupiah(num: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(num);
}

function WeddingCateringContent() {
  const searchParams = useSearchParams();
  const brandParam = searchParams.get('brand');
  
  // Dynamic brand name based on URL query
  const brandName = useMemo(() => {
    if (!brandParam) return defaultCateringConfig.defaultBrand;
    const clean = brandParam.trim();
    if (clean.toLowerCase().includes('catering') || clean.toLowerCase().includes('katering')) {
      return clean;
    }
    return `${clean} Wedding & Catering`;
  }, [brandParam]);

  const isCustomBrand = Boolean(brandParam);

  // States
  const [selectedPackage, setSelectedPackage] = useState<WeddingPackage>(weddingPackages[1]); // Default to Gold
  const [expandedPackageId, setExpandedPackageId] = useState<string | null>('paket-gold');
  
  // Interactive Calculator State
  const [guestCount, setGuestCount] = useState<number>(600); // 600 undangan = 1200 tamu
  const [calcTier, setCalcTier] = useState<'silver' | 'gold' | 'platinum'>('gold');

  // Test Food Form State
  const [formData, setFormData] = useState({
    coupleName: '',
    phone: '',
    eventDate: '',
    venue: 'Grand City Convention Hall',
    guestEstimate: '600'
  });

  // Calculate estimates
  const calculationResult = useMemo(() => {
    // 1 undangan umumnya 2 porsi
    const totalPortions = guestCount * 2;
    // Rasio standar katering pernikahan: 60% prasmanan, 40% porsi gubukan
    const buffetPortion = Math.round(totalPortions * 0.6);
    const stallPortion = Math.round(totalPortions * 1.5); // gubukan umumnya 1.5 - 2 porsi per tamu

    const rates = {
      silver: { perPax: 45000, stallCount: 3, name: 'Paket Classic Silver' },
      gold: { perPax: 52000, stallCount: 5, name: 'Paket Royal Gold' },
      platinum: { perPax: 62000, stallCount: 8, name: 'Paket Sultan Platinum' }
    };

    const currentRate = rates[calcTier];
    const estimatedTotal = buffetPortion * currentRate.perPax + (stallPortion * 15000);

    return {
      totalGuests: guestCount,
      buffetPortion,
      stallPortion,
      stallCount: currentRate.stallCount,
      packageName: currentRate.name,
      estimatedTotal
    };
  }, [guestCount, calcTier]);

  // WhatsApp links
  const handleConsultWa = (pkgName?: string) => {
    const pkg = pkgName || selectedPackage.name;
    const text = `Halo Admin ${brandName}, saya melihat pricelist di website dan tertarik dengan *${pkg}*. Boleh minta info ketersediaan tanggal dan jadwal konsultasi menu?`;
    window.open(`https://wa.me/6285602743489?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleSendSimulationWa = () => {
    const text = `Halo ${brandName}, saya baru saja mencoba Kalkulator Simulasi Biaya Katering di website:\n\n` +
      `• Estimasi Undangan: ${calculationResult.totalGuests} Undangan\n` +
      `• Pilihan Paket: ${calculationResult.packageName}\n` +
      `• Kebutuhan Prasmanan: ±${calculationResult.buffetPortion.toLocaleString('id-ID')} Porsi\n` +
      `• Kebutuhan Gubukan: ±${calculationResult.stallPortion.toLocaleString('id-ID')} Porsi (${calculationResult.stallCount} Stall)\n` +
      `• Estimasi Anggaran: ${formatRupiah(calculationResult.estimatedTotal)}\n\n` +
      `Mohon info apakah tanggal acara kami masih tersedia? Terima kasih!`;
    window.open(`https://wa.me/6285602743489?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleTestFoodSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.coupleName || !formData.phone) {
      alert('Mohon isi nama calon pengantin dan nomor WhatsApp!');
      return;
    }
    const text = `Halo ${brandName}, saya ingin mengajukan Jadwal Test Food Gratis:\n\n` +
      `• Nama Pasangan: ${formData.coupleName}\n` +
      `• No. WhatsApp: ${formData.phone}\n` +
      `• Rencana Tanggal: ${formData.eventDate || 'Belum pasti'}\n` +
      `• Rencana Gedung/Lokasi: ${formData.venue}\n` +
      `• Estimasi Undangan: ${formData.guestEstimate} Undangan\n\n` +
      `Mohon konfirmasi jadwal & lokasi test food terdekat. Terima kasih!`;
    window.open(`https://wa.me/6285602743489?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleClaimDemo = () => {
    const text = `Halo Tim NARA Digital, saya owner/pengelola dari *${brandName}*.\nSaya melihat demo website katering ini (https://naradev.web.id/demo/katering-pernikahan?brand=${encodeURIComponent(brandName)}) dan ingin mengaktifkannya untuk brand kami. Bagaimana prosesnya?`;
    window.open(`https://wa.me/6285602743489?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-500 selection:text-stone-950">
      
      {/* 1. TOP DEMO BANNER BY NARA DEV */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 text-stone-950 px-4 py-2.5 text-xs md:text-sm font-medium shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <Sparkles className="w-4 h-4 shrink-0 text-stone-950 animate-pulse" />
            <span>
              <strong>LIVE PREVIEW KHUSUS:</strong> Didesain khusus oleh <strong>NARA Digital</strong> untuk{' '}
              <span className="underline font-bold">{brandName}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleClaimDemo}
              className="bg-stone-950 text-amber-400 hover:text-white px-3.5 py-1 rounded-full text-xs font-semibold transition-all hover:scale-105 shadow"
            >
              Klaim Website Ini →
            </button>
          </div>
        </div>
      </div>

      {/* 2. NAVIGATION BAR */}
      <header className="border-b border-stone-800/80 bg-stone-950/90 backdrop-blur-md sticky top-9 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-stone-950 font-bold shadow-lg shadow-amber-500/20">
              <Utensils className="w-6 h-6 text-stone-950" />
            </div>
            <div>
              <span className="text-xl md:text-2xl font-serif font-bold tracking-tight text-amber-200">
                {brandName}
              </span>
              <p className="text-[11px] text-amber-400/80 tracking-widest uppercase font-medium">
                Wedding & Fine Catering Surabaya
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-stone-300 font-medium">
            <a href="#paket" className="hover:text-amber-400 transition-colors">Paket Pernikahan</a>
            <a href="#kalkulator" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-amber-400" />
              Simulasi Biaya
            </a>
            <a href="#stall" className="hover:text-amber-400 transition-colors">Menu Gubukan</a>
            <a href="#testfood" className="hover:text-amber-400 transition-colors">Test Food Gratis</a>
            <a href="#testimoni" className="hover:text-amber-400 transition-colors">Testimoni</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleConsultWa()}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-medium px-4 py-2.5 rounded-full text-xs sm:text-sm shadow-lg shadow-emerald-900/30 transition-all hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
              <span className="hidden sm:inline">Tanya Jadwal via WA</span>
              <span className="sm:hidden">Chat WA</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src={defaultCateringConfig.heroImage}
            alt="Wedding Catering Buffet"
            fill
            priority
            className="object-cover object-center scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Top Badges */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-6 backdrop-blur-md">
              <Award className="w-4 h-4 text-amber-400" />
              <span>{defaultCateringConfig.badgeText}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-stone-100 leading-[1.15] tracking-tight mb-6">
              Kemewahan Rasa & Kehangatan di Hari Bahagia Bersama{' '}
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                {brandName}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-stone-300 leading-relaxed mb-8 max-w-2xl font-light">
              Menghadirkan hidangan buffet prasmanan bintang 5 dan aneka gubukan premium yang menggugah selera untuk 
              pernikahan di gedung, ballroom hotel, maupun rumah di Surabaya & sekitarnya.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-stone-900/80 border border-stone-800 backdrop-blur-md mb-8">
              <div>
                <div className="flex items-center gap-1 text-amber-400 font-bold text-lg">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>4.9 / 5.0</span>
                </div>
                <p className="text-[11px] text-stone-400">850+ Ulasan Pengantin</p>
              </div>
              <div>
                <p className="text-lg font-bold text-amber-300">1.200+</p>
                <p className="text-[11px] text-stone-400">Pesta Pernikahan Sukses</p>
              </div>
              <div>
                <p className="text-lg font-bold text-emerald-400">100% Halal</p>
                <p className="text-[11px] text-stone-400">Sertifikat Resmi MUI</p>
              </div>
              <div>
                <p className="text-lg font-bold text-amber-300">Free Test</p>
                <p className="text-[11px] text-stone-400">Untuk 4 Orang Keluarga</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#paket"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-center shadow-lg shadow-amber-500/25 transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>Lihat Paket & Pricelist</span>
                <ChevronRight className="w-5 h-5" />
              </a>
              <a
                href="#kalkulator"
                className="px-6 py-4 rounded-xl bg-stone-900/90 hover:bg-stone-800 border border-stone-700 text-amber-300 font-medium text-center transition-all flex items-center justify-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                <span>Simulasi Biaya Pernikahan</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. KENAPA MEMILIH KAMI (6 KEUNGGULAN) */}
      <section className="py-16 bg-stone-900/60 border-y border-stone-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Standar Kualitas Tertinggi</span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-100 mt-2">
              Jaminan Kepuasan Para Tamu & Keluarga
            </h2>
            <p className="text-sm text-stone-400 mt-3">
              Katering adalah faktor nomor 1 yang paling diingat tamu undangan. Kami memastikan setiap piring adalah kehormatan bagi kedua mempelai.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-stone-950/70 border border-stone-800/80 hover:border-amber-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-stone-100 mb-2">Bahan Segar & Racikan Rempah Autentik</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Dimasak langsung pada hari H oleh tim chef profesional tanpa bahan pengawet, menjamin cita rasa gurih lezat dan aroma masakan tetap harum.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-950/70 border border-stone-800/80 hover:border-amber-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-stone-100 mb-2">Porsi Pasti Cukup & Melimpah</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Kami menerapkan formula kalkulasi porsi cadangan gratis (buffer 10%) agar pesta Anda bebas dari kekhawatiran makanan habis sebelum acara selesai.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-950/70 border border-stone-800/80 hover:border-amber-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-stone-100 mb-2">Dekorasi Prasmanan Elegan</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Penataan meja buffet tematik dengan lampu hangat, bunga segar, dan peralatan chafing dish roll-top standar hotel berbintang.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PAKET PERNIKAHAN & PRICELIST */}
      <section id="paket" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Pricelist Resmi 2026</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-100">
            Pilihan Paket Katering Pernikahan
          </h2>
          <p className="text-sm sm:text-base text-stone-400 mt-4 font-light">
            Transparan, tanpa biaya tersembunyi. Sudah termasuk peralatan lengkap, tim pramusaji, dan dekorasi meja katering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {weddingPackages.map((pkg) => {
            const isSelected = selectedPackage.id === pkg.id;
            const isExpanded = expandedPackageId === pkg.id;

            return (
              <div
                key={pkg.id}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  pkg.popular
                    ? 'bg-gradient-to-b from-stone-900 via-stone-900 to-amber-950/40 border-2 border-amber-500/80 shadow-2xl shadow-amber-950/50 scale-100 lg:-translate-y-2'
                    : 'bg-stone-900/60 border border-stone-800 hover:border-stone-700'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider py-1 px-4 rounded-full shadow-lg">
                    ★ Paket Paling Favorit Pengantin ★
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-amber-400/90 uppercase tracking-wider">
                      {pkg.badge}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-stone-100 mt-1">{pkg.name}</h3>
                    <p className="text-xs text-stone-400 mt-2 leading-relaxed">{pkg.description}</p>
                  </div>

                  {/* Price */}
                  <div className="py-4 my-4 border-y border-stone-800/80">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-bold font-serif text-amber-300">
                        {formatRupiah(pkg.price)}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 mt-1">
                      Kapasitas ideal: <strong>{pkg.porsiPrasmanan} Porsi Buffet</strong> + <strong>{pkg.totalGubukanPorsi} Porsi Gubukan</strong> ({pkg.jumlahStall} Stall)
                    </p>
                  </div>

                  {/* Key Highlights */}
                  <ul className="space-y-2.5 text-xs text-stone-300 mb-6">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Expandable Menu Details */}
                  <button
                    onClick={() => setExpandedPackageId(isExpanded ? null : pkg.id)}
                    className="w-full flex items-center justify-between text-xs font-semibold text-amber-400 hover:text-amber-300 py-2 border-t border-stone-800/70 transition-colors"
                  >
                    <span>{isExpanded ? 'Sembunyikan Rincian Menu' : 'Lihat Rincian Menu & Bonus'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-stone-800/80 space-y-4 text-xs animate-in fade-in duration-200">
                      <div>
                        <p className="font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                          <Utensils className="w-3.5 h-3.5" /> Contoh Pilihan Olahan Utama:
                        </p>
                        <p className="text-stone-300 leading-relaxed">
                          • Sapi: {pkg.menuPrasmanan.daging.join(', ')}<br />
                          • Ayam: {pkg.menuPrasmanan.ayam.join(', ')}<br />
                          • Sup: {pkg.menuPrasmanan.sup.join(', ')}
                        </p>
                      </div>

                      <div>
                        <p className="font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                          <Flame className="w-3.5 h-3.5" /> Menu Gubukan ({pkg.jumlahStall} Stall):
                        </p>
                        <p className="text-stone-300 leading-relaxed">
                          {pkg.pilihanStall.join(' • ')}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200">
                        <p className="font-bold mb-1">🎁 Bonus Spesial:</p>
                        <ul className="list-disc list-inside space-y-1 text-[11px] text-amber-300/90">
                          {pkg.bonusKhusus.map((bonus, bIdx) => (
                            <li key={bIdx}>{bonus}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card CTA */}
                <div className="mt-8 pt-4 border-t border-stone-800">
                  <button
                    onClick={() => handleConsultWa(pkg.name)}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-lg shadow-amber-500/20'
                        : 'bg-stone-800 hover:bg-stone-700 text-stone-100'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Konsultasi Paket Ini</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. INTERACTIVE BUDGET & PORTION CALCULATOR (FITUR WOW) */}
      <section id="kalkulator" className="py-20 bg-gradient-to-b from-stone-900 to-stone-950 border-y border-stone-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
              <Calculator className="w-3.5 h-3.5" />
              <span>Fitur Interaktif Cerdas</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100">
              Kalkulator Simulasi Biaya Katering
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 mt-2">
              Bingung menghitung berapa porsi prasmanan dan gubukan yang dibutuhkan? Geser jumlah undangan di bawah ini untuk estimasi instan.
            </p>
          </div>

          <div className="bg-stone-950 p-6 sm:p-10 rounded-3xl border border-stone-800 shadow-2xl">
            {/* 1. Slider Undangan */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-semibold text-stone-200 flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-400" />
                  Jumlah Undangan Pesta:
                </label>
                <span className="text-2xl font-serif font-bold text-amber-300">
                  {guestCount.toLocaleString('id-ID')} Undangan{' '}
                  <span className="text-xs font-sans text-stone-400 font-normal">
                    (±{(guestCount * 2).toLocaleString('id-ID')} Tamu)
                  </span>
                </span>
              </div>

              <input
                type="range"
                min="300"
                max="1500"
                step="50"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full h-2.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[11px] text-stone-500 mt-2 font-mono">
                <span>300 Undangan (Intimate)</span>
                <span>600 Undangan (Medium)</span>
                <span>1.000 Undangan (Gedung Besar)</span>
                <span>1.500 Undangan (Ballroom)</span>
              </div>
            </div>

            {/* 2. Tier Selection */}
            <div className="mb-8">
              <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-3">
                Pilih Standar Layanan Menu:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => setCalcTier('silver')}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    calcTier === 'silver'
                      ? 'bg-amber-500/15 border-amber-500 text-stone-100'
                      : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <p className="font-bold text-sm text-stone-200">Classic Silver</p>
                  <p className="text-[11px] text-stone-400 mt-0.5">3 Pilihan Stall Gubukan</p>
                </button>

                <button
                  onClick={() => setCalcTier('gold')}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    calcTier === 'gold'
                      ? 'bg-amber-500/15 border-amber-500 text-stone-100 ring-2 ring-amber-500/20'
                      : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-sm text-amber-300">Royal Gold</p>
                    <span className="text-[9px] bg-amber-500 text-stone-950 font-bold px-1.5 py-0.5 rounded">Rekomendasi</span>
                  </div>
                  <p className="text-[11px] text-stone-400 mt-0.5">5 Stall + Dessert Bar</p>
                </button>

                <button
                  onClick={() => setCalcTier('platinum')}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    calcTier === 'platinum'
                      ? 'bg-amber-500/15 border-amber-500 text-stone-100'
                      : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <p className="font-bold text-sm text-stone-200">Sultan Platinum</p>
                  <p className="text-[11px] text-stone-400 mt-0.5">8 Stall + Live Carving Show</p>
                </button>
              </div>
            </div>

            {/* 3. Output Calculation Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-900 to-amber-950/30 border border-stone-800/80">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                <div>
                  <p className="text-xs text-stone-400">Kebutuhan Prasmanan Utama:</p>
                  <p className="text-2xl font-bold font-serif text-stone-100 mt-1">
                    {calculationResult.buffetPortion.toLocaleString('id-ID')}{' '}
                    <span className="text-xs font-normal text-stone-400 font-sans">Porsi Buffet</span>
                  </p>
                  <p className="text-[11px] text-emerald-400 mt-0.5">✓ Termasuk Buffer Cadangan 10%</p>
                </div>

                <div>
                  <p className="text-xs text-stone-400">Kebutuhan Menu Gubukan:</p>
                  <p className="text-2xl font-bold font-serif text-stone-100 mt-1">
                    {calculationResult.stallPortion.toLocaleString('id-ID')}{' '}
                    <span className="text-xs font-normal text-stone-400 font-sans">Porsi Total</span>
                  </p>
                  <p className="text-[11px] text-amber-400 mt-0.5">✓ Terbagi dalam {calculationResult.stallCount} Stand Menu</p>
                </div>

                <div>
                  <p className="text-xs text-stone-400">Estimasi Total Investasi:</p>
                  <p className="text-2xl font-bold font-serif text-amber-400 mt-1">
                    {formatRupiah(calculationResult.estimatedTotal)}
                  </p>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    (±{formatRupiah(Math.round(calculationResult.estimatedTotal / (guestCount * 2)))} / tamu)
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-stone-400 text-center sm:text-left">
                  *Estimasi dapat disesuaikan dengan susunan menu favorit dan fasilitas tambahan gedung.
                </p>
                <button
                  onClick={handleSendSimulationWa}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 transition-all hover:scale-105 shrink-0"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                  <span>Kirim Rincian Ini ke WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. MENU GUBUKAN FAVORIT (SHOWCASE VISUAL) */}
      <section id="stall" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Live Cooking & Food Stall</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100 mt-2">
              Menu Gubukan Primadona Pesta
            </h2>
            <p className="text-sm text-stone-400 mt-2 max-w-xl">
              Antrean paling ramai di setiap resepsi. Disajikan panas-panas dengan live cooking chef yang memikat mata tamu.
            </p>
          </div>
          <button
            onClick={() => handleConsultWa('Menu Gubukan')}
            className="mt-4 md:mt-0 text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            Lihat 15+ Pilihan Menu Gubukan Lengkap →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stallHighlights.map((stall) => (
            <div key={stall.id} className="rounded-3xl overflow-hidden bg-stone-900/60 border border-stone-800/80 group hover:border-amber-500/40 transition-all">
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={stall.image}
                  alt={stall.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-stone-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-amber-300 border border-amber-500/30">
                  {stall.tag}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-stone-100 mb-2">{stall.name}</h3>
                <p className="text-xs text-stone-400 leading-relaxed">{stall.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FORM JADWAL TEST FOOD GRATIS (LEAD MAGNET UTAMA) */}
      <section id="testfood" className="py-20 bg-stone-900/40 border-t border-stone-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-stone-900 via-stone-950 to-amber-950/40 p-8 sm:p-12 rounded-3xl border border-amber-500/30 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Buktikan Kelezatannya Sendiri</span>
              <h2 className="text-3xl font-serif font-bold text-stone-100 mt-2">
                Daftar Jadwal Test Food Gratis
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 mt-2 font-light">
                Nikmati sesi mencicipi menu buffet prasmanan & stall gubukan pilihan bersama keluarga inti sebelum Anda memutuskan. 100% Bebas Biaya & Tanpa Ikatan.
              </p>
            </div>

            <form onSubmit={handleTestFoodSubmit} className="space-y-4 max-w-xl mx-auto">
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1.5">
                  Nama Kedua Mempelai (Contoh: Adit & Bella)
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nama Calon Pengantin"
                  value={formData.coupleName}
                  onChange={(e) => setFormData({ ...formData, coupleName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-stone-950/90 border border-stone-800 text-stone-100 text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    Nomor WhatsApp Aktif
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0812-xxxx-xxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-stone-950/90 border border-stone-800 text-stone-100 text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    Rencana Tanggal Resepsi
                  </label>
                  <input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-stone-950/90 border border-stone-800 text-stone-100 text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    Rencana Gedung / Venue
                  </label>
                  <select
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-stone-950/90 border border-stone-800 text-stone-100 text-sm focus:border-amber-500 focus:outline-none"
                  >
                    {weddingVenuesSurabaya.map((v, idx) => (
                      <option key={idx} value={v} className="bg-stone-900">{v}</option>
                    ))}
                    <option value="Rumah Pribadi / Venue Lain" className="bg-stone-900">Rumah Pribadi / Venue Lain</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    Estimasi Jumlah Undangan
                  </label>
                  <select
                    value={formData.guestEstimate}
                    onChange={(e) => setFormData({ ...formData, guestEstimate: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-stone-950/90 border border-stone-800 text-stone-100 text-sm focus:border-amber-500 focus:outline-none"
                  >
                    <option value="300-500" className="bg-stone-900">300 - 500 Undangan (Intimate)</option>
                    <option value="500-800" className="bg-stone-900">500 - 800 Undangan (Sedang)</option>
                    <option value="800-1200" className="bg-stone-900">800 - 1.200 Undangan (Besar)</option>
                    <option value="1200+" className="bg-stone-900">1.200+ Undangan (Grand Ballroom)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:opacity-95 text-stone-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]"
              >
                Konfirmasi Jadwal Test Food via WhatsApp →
              </button>

              <p className="text-[11px] text-stone-400 text-center mt-2">
                🔒 Data Anda aman. Tim katering kami akan menghubungi untuk menyamakan waktu sesi test food.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* 9. TESTIMONI PENGANTIN & REKANAN GEDUNG */}
      <section id="testimoni" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Kisah Nyata Mempelai</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100 mt-2">
            Ulasan Dari Mereka yang Telah Mempercayakan Harinya
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {weddingTestimonials.map((t, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-stone-900/60 border border-stone-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-stone-300 leading-relaxed italic mb-6">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>
              <div className="pt-4 border-t border-stone-800/80">
                <p className="font-bold text-sm text-stone-100">{t.couple}</p>
                <p className="text-[11px] text-amber-400/90 font-medium">{t.venue}</p>
                <p className="text-[10px] text-stone-400 mt-0.5">{t.packageUsed} • {t.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. FOOTER & NARA DEV FOOTPRINT */}
      <footer className="border-t border-stone-800 bg-stone-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-stone-800/80">
            <div>
              <span className="text-xl font-serif font-bold text-amber-300">{brandName}</span>
              <p className="text-xs text-stone-400 mt-1">
                {defaultCateringConfig.tagline}
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-stone-400">
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-amber-400" /> {defaultCateringConfig.address}</span>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
            <p>© 2026 {brandName}. All rights reserved.</p>
            <div className="p-2.5 px-4 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>
                Website demo interaktif ini dibangun khusus oleh{' '}
                <Link href="/" className="text-amber-400 font-bold hover:underline">
                  NARA Digital Studio Surabaya
                </Link>
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* 11. FLOATING WHATSAPP BUTTON */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => handleConsultWa()}
          className="flex items-center gap-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold px-5 py-3.5 rounded-full shadow-2xl shadow-emerald-950 hover:scale-105 transition-all group"
        >
          <MessageCircle className="w-5 h-5 fill-white text-emerald-600 group-hover:rotate-12 transition-transform" />
          <span className="text-xs sm:text-sm">Konsultasi WA</span>
        </button>
      </div>

    </div>
  );
}

export default function WeddingCateringDemoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-stone-950 text-amber-300 flex items-center justify-center font-serif text-lg">
        Memuat Live Demo Katering Pernikahan...
      </div>
    }>
      <WeddingCateringContent />
    </Suspense>
  );
}
