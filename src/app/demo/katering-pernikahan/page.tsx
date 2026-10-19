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
  ChevronDown,
  ChevronUp,
  Flame,
  Check,
  Building,
  Soup,
  Coffee
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

function WeddingCateringBrightContent() {
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

  // States
  const [selectedPackage, setSelectedPackage] = useState<WeddingPackage>(weddingPackages[1]); // Default to Gold
  const [expandedPackageId, setExpandedPackageId] = useState<string | null>('paket-gold');
  
  // Interactive Calculator State
  const [guestCount, setGuestCount] = useState<number>(600); // 600 undangan
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
    const totalPortions = guestCount * 2;
    const buffetPortion = Math.round(totalPortions * 0.6);
    const stallPortion = Math.round(totalPortions * 1.5);

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

  // WhatsApp Actions
  const handleConsultWa = (pkgName?: string) => {
    const pkg = pkgName || selectedPackage.name;
    const text = `Halo Admin ${brandName}, saya melihat pricelist di website dan tertarik dengan *${pkg}*. Boleh minta info ketersediaan tanggal dan jadwal konsultasi menu?`;
    window.open(`https://wa.me/6285602743489?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleSendSimulationWa = () => {
    const text = `Halo ${brandName}, saya baru saja mencoba Kalkulator Simulasi Biaya Katering di website:\n\n` +
      `• Estimasi Undangan: ${calculationResult.totalGuests} Undangan (±${calculationResult.totalGuests * 2} Tamu)\n` +
      `• Pilihan Layanan: ${calculationResult.packageName}\n` +
      `• Kebutuhan Prasmanan: ±${calculationResult.buffetPortion.toLocaleString('id-ID')} Porsi\n` +
      `• Kebutuhan Gubukan: ±${calculationResult.stallPortion.toLocaleString('id-ID')} Porsi (${calculationResult.stallCount} Stall)\n` +
      `• Estimasi Total: ${formatRupiah(calculationResult.estimatedTotal)}\n\n` +
      `Apakah tanggal acara kami masih tersedia? Mohon informasinya, terima kasih!`;
    window.open(`https://wa.me/6285602743489?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleTestFoodSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.coupleName || !formData.phone) {
      alert('Mohon lengkapi nama calon pengantin dan nomor WhatsApp!');
      return;
    }
    const text = `Halo ${brandName}, saya ingin mengajukan Jadwal Test Food Gratis:\n\n` +
      `• Nama Pasangan: ${formData.coupleName}\n` +
      `• No. WhatsApp: ${formData.phone}\n` +
      `• Rencana Tanggal: ${formData.eventDate || 'Menyusul'}\n` +
      `• Rencana Gedung: ${formData.venue}\n` +
      `• Estimasi Undangan: ${formData.guestEstimate} Undangan\n\n` +
      `Mohon info jadwal dan lokasi test food terdekat. Terima kasih!`;
    window.open(`https://wa.me/6285602743489?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleClaimDemo = () => {
    const text = `Halo Tim NARA Digital, saya pengelola dari *${brandName}*.\nSaya melihat demo website katering ini (https://naradev.web.id/demo/katering-pernikahan?brand=${encodeURIComponent(brandName)}) dan ingin mengaktifkan website resmi untuk brand kami. Bagaimana prosesnya?`;
    window.open(`https://wa.me/6285602743489?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-stone-800 font-sans selection:bg-amber-100 selection:text-amber-900">
      
      {/* 1. TOP DEMO BANNER BY NARA DEV (CLEAN AMBER BAR) */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-stone-950 px-4 py-2.5 text-xs md:text-sm font-medium shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <Sparkles className="w-4 h-4 shrink-0 text-stone-900" />
            <span>
              <strong>LIVE PREVIEW KHUSUS:</strong> Didesain khusus oleh <strong>NARA Digital</strong> untuk{' '}
              <span className="font-bold underline">{brandName}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleClaimDemo}
              className="bg-stone-950 text-amber-300 hover:text-white px-4 py-1 rounded-full text-xs font-bold transition-all hover:scale-105 shadow"
            >
              Klaim Website Ini →
            </button>
          </div>
        </div>
      </div>

      {/* 2. BRIGHT & ELEGANT HEADER */}
      <header className="border-b border-stone-200/80 bg-white/95 backdrop-blur-md sticky top-9 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shadow-sm">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl md:text-2xl font-serif font-bold text-stone-900 tracking-tight">
                {brandName}
              </span>
              <p className="text-[11px] text-amber-800 font-medium tracking-wider uppercase">
                Wedding & Fine Catering Surabaya
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <a href="#paket" className="hover:text-amber-700 transition-colors">Paket Pernikahan</a>
            <a href="#kalkulator" className="hover:text-amber-700 transition-colors flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-amber-600" />
              Simulasi Biaya
            </a>
            <a href="#stall" className="hover:text-amber-700 transition-colors">Menu Gubukan</a>
            <a href="#testfood" className="hover:text-amber-700 transition-colors">Test Food Gratis</a>
            <a href="#testimoni" className="hover:text-amber-700 transition-colors">Testimoni</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleConsultWa()}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2.5 rounded-full text-xs sm:text-sm shadow-md shadow-emerald-700/20 transition-all hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
              <span className="hidden sm:inline">Konsultasi via WA</span>
              <span className="sm:hidden">Chat WA</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION (BRIGHT, CLEAN, WELCOMING) */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 bg-gradient-to-b from-amber-50/40 via-white to-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Text & CTAs */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/70 border border-amber-200 text-amber-900 text-xs font-semibold mb-6">
                <Award className="w-4 h-4 text-amber-700" />
                <span>Penyedia Katering Pernikahan Terpercaya di Surabaya</span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-stone-900 leading-[1.18] tracking-tight mb-6">
                Cita Rasa Mewah &amp; Pelayanan Hangat di Hari Bahagia Bersama{' '}
                <span className="text-amber-700 font-serif italic">
                  {brandName}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-stone-600 leading-relaxed mb-8 font-light">
                Menghadirkan hidangan buffet prasmanan lezat dengan racikan bumbu rempah segar dan aneka gubukan live cooking yang memikat hati para tamu undangan. Cocok untuk resepsi di ballroom gedung maupun rumah.
              </p>

              {/* Trust Badges Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white border border-stone-200/90 shadow-sm mb-8">
                <div>
                  <div className="flex items-center gap-1 text-amber-600 font-bold text-lg">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <span>4.9 / 5.0</span>
                  </div>
                  <p className="text-[11px] text-stone-500">850+ Ulasan Pengantin</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-stone-800">1.200+</p>
                  <p className="text-[11px] text-stone-500">Pesta Sukses</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-emerald-700">100% Halal</p>
                  <p className="text-[11px] text-stone-500">Sertifikat Resmi MUI</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-amber-700">Free Test</p>
                  <p className="text-[11px] text-stone-500">Test Food 4 Orang</p>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="#paket"
                  className="px-8 py-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-center shadow-lg shadow-amber-600/20 transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  <span>Lihat Paket &amp; Pricelist 2026</span>
                  <ChevronRight className="w-5 h-5" />
                </a>
                <a
                  href="#kalkulator"
                  className="px-6 py-4 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 font-medium text-center transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <Calculator className="w-4 h-4 text-amber-700" />
                  <span>Simulasi Biaya Katering</span>
                </a>
              </div>
            </div>

            {/* Right Column: Natural Real Photo */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-100 aspect-[4/3] lg:aspect-[4/5]">
                <Image
                  src={defaultCateringConfig.heroImage}
                  alt="Wedding Catering Buffet Real Photography"
                  fill
                  priority
                  className="object-cover object-center hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-stone-100 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sm text-stone-900">Buffet Prasmanan Mewah</p>
                    <p className="text-xs text-stone-500">Standar Hotel &amp; Gedung Pernikahan</p>
                  </div>
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full">
                    ✓ Higienis &amp; Segar
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. TIGA KEUNGGULAN UTAMA */}
      <section className="py-14 bg-white border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-4 p-6 rounded-2xl bg-[#FAFAF8] border border-stone-200/70">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <Utensils className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-stone-900 mb-1">Masakan Segar Dimasak di Hari H</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Semua menu diracik segar oleh chef berpengalaman tanpa bahan pengawet. Makanan tetap hangat dan harum hingga akhir acara.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-2xl bg-[#FAFAF8] border border-stone-200/70">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-stone-900 mb-1">Porsi Pasti Aman &amp; Melimpah</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Kami selalu menyediakan buffer cadangan porsi 10% gratis agar keluarga mempelai tenang dan tidak khawatir kehabisan makanan.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-2xl bg-[#FAFAF8] border border-stone-200/70">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-stone-900 mb-1">Dekorasi Meja Mewah &amp; Elegan</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Peralatan roll-top dish stanless steel standar hotel, rangkaian bunga segar, dan staf pramusaji berseragam rapi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PAKET PERNIKAHAN & PRICELIST 2026 (BRIGHT CARDS) */}
      <section id="paket" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full">
            Pricelist Resmi Pernikahan 2026
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-3">
            Pilihan Paket Katering Pernikahan
          </h2>
          <p className="text-sm text-stone-600 mt-2 font-light">
            Sudah termasuk buffet prasmanan utama, stall gubukan favorit, peralatan lengkap, dan tim pramusaji profesional.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {weddingPackages.map((pkg) => {
            const isExpanded = expandedPackageId === pkg.id;

            return (
              <div
                key={pkg.id}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  pkg.popular
                    ? 'bg-white border-2 border-amber-500 shadow-xl lg:-translate-y-2 ring-4 ring-amber-500/10'
                    : 'bg-white border border-stone-200 hover:border-stone-300 shadow-sm hover:shadow-md'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-600 text-white font-bold text-xs uppercase tracking-wider py-1 px-4 rounded-full shadow-md">
                    ★ Paling Banyak Dipilih Pengantin ★
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
                      {pkg.badge}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-stone-900 mt-1">{pkg.name}</h3>
                    <p className="text-xs text-stone-500 mt-2 leading-relaxed">{pkg.description}</p>
                  </div>

                  {/* Price */}
                  <div className="py-4 my-4 border-y border-stone-100">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-bold font-serif text-amber-700">
                        {formatRupiah(pkg.price)}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 mt-1">
                      Kapasitas: <strong>{pkg.porsiPrasmanan} Porsi Buffet</strong> + <strong>{pkg.totalGubukanPorsi} Porsi Gubukan</strong> ({pkg.jumlahStall} Stand)
                    </p>
                  </div>

                  {/* Key Highlights */}
                  <ul className="space-y-2.5 text-xs text-stone-700 mb-6">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Accordion Menu */}
                  <button
                    onClick={() => setExpandedPackageId(isExpanded ? null : pkg.id)}
                    className="w-full flex items-center justify-between text-xs font-bold text-amber-800 hover:text-amber-900 py-2.5 border-t border-stone-100 transition-colors"
                  >
                    <span>{isExpanded ? 'Tutup Rincian Menu' : 'Lihat Rincian Menu & Bonus Lengkap'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-stone-100 space-y-3.5 text-xs animate-in fade-in duration-200">
                      <div>
                        <p className="font-bold text-stone-800 mb-1 flex items-center gap-1.5">
                          <Utensils className="w-3.5 h-3.5 text-amber-700" /> Contoh Menu Utama:
                        </p>
                        <p className="text-stone-600 leading-relaxed text-[11px]">
                          • Daging: {pkg.menuPrasmanan.daging.join(', ')}<br />
                          • Ayam: {pkg.menuPrasmanan.ayam.join(', ')}<br />
                          • Sup: {pkg.menuPrasmanan.sup.join(', ')}
                        </p>
                      </div>

                      <div>
                        <p className="font-bold text-stone-800 mb-1 flex items-center gap-1.5">
                          <Flame className="w-3.5 h-3.5 text-amber-700" /> Menu Gubukan ({pkg.jumlahStall} Stand):
                        </p>
                        <p className="text-stone-600 leading-relaxed text-[11px]">
                          {pkg.pilihanStall.join(' • ')}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-900">
                        <p className="font-bold mb-1 text-[11px]">🎁 Bonus Khusus Paket Ini:</p>
                        <ul className="list-disc list-inside space-y-1 text-[10px] text-stone-700">
                          {pkg.bonusKhusus.map((bonus, bIdx) => (
                            <li key={bIdx}>{bonus}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card CTA */}
                <div className="mt-6 pt-4 border-t border-stone-100">
                  <button
                    onClick={() => handleConsultWa(pkg.name)}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      pkg.popular
                        ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-600/20'
                        : 'bg-stone-900 hover:bg-stone-800 text-white'
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

      {/* 6. KALKULATOR SIMULASI BIAYA (BRIGHT & CLEAN) */}
      <section id="kalkulator" className="py-20 bg-gradient-to-b from-[#F6F4ED] to-[#FAFAF8] border-y border-stone-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              Kalkulator Interaktif
            </span>
            <h2 className="text-3xl font-serif font-bold text-stone-900 mt-3">
              Simulasi Porsi &amp; Biaya Katering
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2">
              Geser jumlah undangan di bawah untuk melihat estimasi porsi prasmanan &amp; gubukan secara otomatis.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-xl">
            {/* Slider */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-bold text-stone-800 flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-700" />
                  Jumlah Undangan Pesta:
                </label>
                <span className="text-2xl font-serif font-bold text-amber-700">
                  {guestCount.toLocaleString('id-ID')} Undangan{' '}
                  <span className="text-xs font-sans text-stone-500 font-normal">
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
                className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
              <div className="flex justify-between text-[11px] text-stone-500 mt-2">
                <span>300 (Intimate)</span>
                <span>600 (Sedang)</span>
                <span>1.000 (Gedung Besar)</span>
                <span>1.500 (Grand Ballroom)</span>
              </div>
            </div>

            {/* Tier Buttons */}
            <div className="mb-8">
              <label className="text-xs font-bold text-stone-600 uppercase tracking-wider block mb-3">
                Pilih Kelas Layanan:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => setCalcTier('silver')}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    calcTier === 'silver'
                      ? 'bg-amber-50 border-amber-500 text-stone-900 ring-2 ring-amber-500/20'
                      : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <p className="font-bold text-sm text-stone-900">Classic Silver</p>
                  <p className="text-[11px] text-stone-500 mt-0.5">3 Pilihan Stand Gubukan</p>
                </button>

                <button
                  onClick={() => setCalcTier('gold')}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    calcTier === 'gold'
                      ? 'bg-amber-50 border-amber-500 text-stone-900 ring-2 ring-amber-500/20'
                      : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-sm text-stone-900">Royal Gold</p>
                    <span className="text-[9px] bg-amber-600 text-white font-bold px-1.5 py-0.5 rounded">Rekomendasi</span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5">5 Stand + Dessert Bar</p>
                </button>

                <button
                  onClick={() => setCalcTier('platinum')}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    calcTier === 'platinum'
                      ? 'bg-amber-50 border-amber-500 text-stone-900 ring-2 ring-amber-500/20'
                      : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <p className="font-bold text-sm text-stone-900">Sultan Platinum</p>
                  <p className="text-[11px] text-stone-500 mt-0.5">8 Stand + Live Carving</p>
                </button>
              </div>
            </div>

            {/* Calculation Result Receipt */}
            <div className="p-6 rounded-2xl bg-[#FAF8F3] border border-amber-200/90">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                <div>
                  <p className="text-xs text-stone-500">Kebutuhan Prasmanan Utama:</p>
                  <p className="text-2xl font-bold font-serif text-stone-900 mt-1">
                    {calculationResult.buffetPortion.toLocaleString('id-ID')}{' '}
                    <span className="text-xs font-normal text-stone-500 font-sans">Porsi</span>
                  </p>
                  <p className="text-[11px] text-emerald-700 font-medium mt-0.5">✓ Termasuk Buffer 10%</p>
                </div>

                <div>
                  <p className="text-xs text-stone-500">Kebutuhan Menu Gubukan:</p>
                  <p className="text-2xl font-bold font-serif text-stone-900 mt-1">
                    {calculationResult.stallPortion.toLocaleString('id-ID')}{' '}
                    <span className="text-xs font-normal text-stone-500 font-sans">Porsi</span>
                  </p>
                  <p className="text-[11px] text-amber-800 font-medium mt-0.5">✓ Dibagi {calculationResult.stallCount} Stand Menu</p>
                </div>

                <div>
                  <p className="text-xs text-stone-500">Estimasi Total Biaya:</p>
                  <p className="text-2xl font-bold font-serif text-amber-700 mt-1">
                    {formatRupiah(calculationResult.estimatedTotal)}
                  </p>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    (±{formatRupiah(Math.round(calculationResult.estimatedTotal / (guestCount * 2)))} / tamu)
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-stone-500 text-center sm:text-left">
                  *Menu dan porsi dapat disesuaikan kembali saat sesi test food bersama keluarga.
                </p>
                <button
                  onClick={handleSendSimulationWa}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20 transition-all hover:scale-105 shrink-0"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                  <span>Kirim Rincian Ini ke WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SHOWCASE MENU GUBUKAN FAVORIT (REAL CLEAN PHOTOS) */}
      <section id="stall" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
              Live Cooking &amp; Food Stall
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-3">
              Menu Gubukan Primadona Pesta
            </h2>
            <p className="text-sm text-stone-600 mt-2 max-w-xl font-light">
              Stand paling dinanti para tamu undangan. Disajikan hangat dengan aroma menggugah selera langsung di area resepsi.
            </p>
          </div>
          <button
            onClick={() => handleConsultWa('Menu Gubukan Lengkap')}
            className="mt-4 md:mt-0 text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
          >
            Lihat 15+ Pilihan Stand Gubukan Lainnya →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Zuppa Soup */}
          <div className="rounded-3xl overflow-hidden bg-white border border-stone-200 shadow-sm hover:shadow-xl transition-all group">
            <div className="relative h-64 w-full overflow-hidden bg-stone-100">
              <Image
                src="/images/demo/wedding-zuppa-soup.jpg"
                alt="Zuppa Soup Hangat Renyah"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-amber-800 shadow-sm">
                Favorit No. 1 Tamu
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">Zuppa Soup Creamy Puff</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Sup krim ayam jagung kental gurih berbalut puff pastry keemasan yang mekar renyah saat disajikan panas.
              </p>
            </div>
          </div>

          {/* Card 2: Kambing Guling */}
          <div className="rounded-3xl overflow-hidden bg-white border border-stone-200 shadow-sm hover:shadow-xl transition-all group">
            <div className="relative h-64 w-full overflow-hidden bg-stone-100">
              <Image
                src="/images/demo/wedding-kambing-guling.jpg"
                alt="Kambing Guling Rempah Arab"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-amber-800 shadow-sm">
                Live Carving Chef
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">Kambing Guling &amp; Roast Beef</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Daging pilihan empuk berbumbu rempah meresap, disajikan bersama lontong pulen, sambal kecap pedas, dan acar segar.
              </p>
            </div>
          </div>

          {/* Card 3: Dessert Table */}
          <div className="rounded-3xl overflow-hidden bg-white border border-stone-200 shadow-sm hover:shadow-xl transition-all group">
            <div className="relative h-64 w-full overflow-hidden bg-stone-100">
              <Image
                src="/images/demo/wedding-dessert-bar.jpg"
                alt="Luxury Dessert Corner"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-amber-800 shadow-sm">
                Manis &amp; Fotogenik
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">Luxury Dessert &amp; Pastry Bar</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Aneka mini tart buah segar, eclair cokelat, puding sutra, dan sajian penutup manis bertingkat di atas piring kristal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FORM BOOKING JADWAL TEST FOOD GRATIS (LEAD MAGNET) */}
      <section id="testfood" className="py-20 bg-white border-t border-stone-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FAF8F4] p-8 sm:p-12 rounded-3xl border border-amber-200 shadow-lg">
            <div className="text-center max-w-lg mx-auto mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                Bebas Biaya &amp; Tanpa Ikatan
              </span>
              <h2 className="text-3xl font-serif font-bold text-stone-900 mt-3">
                Daftar Jadwal Test Food Gratis
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 font-light">
                Cicipi langsung kelezatan menu buffet dan gubukan pilihan kami bersama keluarga sebelum memutuskan. Gratis untuk 4 orang.
              </p>
            </div>

            <form onSubmit={handleTestFoodSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Nama Pasangan Pengantin (Contoh: Rama &amp; Sinta)
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nama Calon Mempelai"
                  value={formData.coupleName}
                  onChange={(e) => setFormData({ ...formData, coupleName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-stone-300 text-stone-900 text-sm focus:border-amber-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Nomor WhatsApp Aktif
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0812-xxxx-xxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-stone-300 text-stone-900 text-sm focus:border-amber-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Rencana Tanggal Acara
                  </label>
                  <input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-stone-300 text-stone-900 text-sm focus:border-amber-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Rencana Gedung / Lokasi
                  </label>
                  <select
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-stone-300 text-stone-900 text-sm focus:border-amber-600 focus:outline-none"
                  >
                    {weddingVenuesSurabaya.map((v, idx) => (
                      <option key={idx} value={v}>{v}</option>
                    ))}
                    <option value="Rumah Pribadi / Venue Lain">Rumah Pribadi / Venue Lain</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Estimasi Jumlah Undangan
                  </label>
                  <select
                    value={formData.guestEstimate}
                    onChange={(e) => setFormData({ ...formData, guestEstimate: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-stone-300 text-stone-900 text-sm focus:border-amber-600 focus:outline-none"
                  >
                    <option value="300-500">300 - 500 Undangan (Intimate)</option>
                    <option value="500-800">500 - 800 Undangan (Sedang)</option>
                    <option value="800-1200">800 - 1.200 Undangan (Besar)</option>
                    <option value="1200+">1.200+ Undangan (Grand Ballroom)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm tracking-wide shadow-md shadow-amber-600/20 transition-all hover:scale-[1.01]"
              >
                Konfirmasi Jadwal Test Food via WhatsApp →
              </button>

              <p className="text-[11px] text-stone-500 text-center mt-2">
                🔒 Data aman. Tim kami akan menghubungi Anda untuk mencocokkan sesi test food terdekat.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* 9. TESTIMONI PENGANTIN ASLI SURABAYA */}
      <section id="testimoni" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            Kisah Nyata Pengantin
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-3">
            Ulasan Dari Mempelai Bahagia
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {weddingTestimonials.map((t, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs text-stone-600 leading-relaxed italic mb-6">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>
              <div className="pt-4 border-t border-stone-100">
                <p className="font-bold text-sm text-stone-900">{t.couple}</p>
                <p className="text-[11px] text-amber-800 font-medium">{t.venue}</p>
                <p className="text-[10px] text-stone-400 mt-0.5">{t.packageUsed} • {t.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. BRIGHT & CLEAN FOOTER */}
      <footer className="border-t border-stone-200 bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-stone-100">
            <div>
              <span className="text-xl font-serif font-bold text-stone-900">{brandName}</span>
              <p className="text-xs text-stone-500 mt-1">
                {defaultCateringConfig.tagline}
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-stone-600">
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-amber-700" /> {defaultCateringConfig.address}</span>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
            <p>© 2026 {brandName}. All rights reserved.</p>
            <div className="p-2.5 px-4 rounded-xl bg-amber-50 border border-amber-200/60 text-amber-900 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>
                Website demo interaktif ini dibangun khusus oleh{' '}
                <Link href="/" className="text-amber-800 font-bold hover:underline">
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
          className="flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3.5 rounded-full shadow-xl hover:scale-105 transition-all group"
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
      <div className="min-h-screen bg-[#FAFAF8] text-amber-800 flex items-center justify-center font-serif text-lg">
        Memuat Demo Katering Pernikahan...
      </div>
    }>
      <WeddingCateringBrightContent />
    </Suspense>
  );
}
