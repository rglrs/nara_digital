'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Calendar,
  Clock,
  Phone,
  MessageCircle,
  MapPin,
  ChevronRight,
  Star,
  ShieldCheck,
  Calculator,
  ChevronDown,
  ChevronUp,
  Check,
  Sparkles,
  Award,
  Send,
  HelpCircle,
  Car,
  FileCheck
} from 'lucide-react';
import {
  defaultDetailingConfig,
  carSizeOptions,
  detailingPackages,
  detailingFacilities,
  detailingTestimonials,
  detailingFaqs,
  CarSize
} from '@/data/autoDetailingData';

function formatRupiah(num: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(num);
}

function AutoDetailingContent() {
  const searchParams = useSearchParams();
  const brandParam = searchParams.get('brand');

  // Dynamic brand name based on URL query
  const brandName = useMemo(() => {
    if (!brandParam) return defaultDetailingConfig.defaultBrand;
    const clean = brandParam.trim();
    if (clean.toLowerCase().includes('detailing') || clean.toLowerCase().includes('coating') || clean.toLowerCase().includes('auto')) {
      return clean;
    }
    return `${clean} Auto Detailing`;
  }, [brandParam]);

  // Selected Car Size (Default: Medium e.g. Innova / HR-V)
  const [selectedSize, setSelectedSize] = useState<CarSize>('medium');
  const [expandedPackageId, setExpandedPackageId] = useState<string | null>(null);

  // Booking Form State
  const [formData, setFormData] = useState({
    ownerName: '',
    ownerPhone: '',
    carModel: '',
    carSize: 'medium' as CarSize,
    selectedPackage: 'Nano Ceramic Coating 9H (Double Layer)',
    preferredDate: '',
    notes: ''
  });

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // WhatsApp Handlers
  const handleConsultWa = (packageName?: string) => {
    const text = packageName
      ? `Halo ${brandName}, saya mau tanya jadwal dan konsultasi untuk paket *${packageName}*. Boleh minta rinciannya?`
      : `Halo ${brandName}, saya mau tanya jadwal kosong untuk pengerjaan auto detailing / coating mobil. Boleh dibantu?`;
    window.open(`https://wa.me/6285602743489?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.ownerName || !formData.ownerPhone || !formData.carModel) return;

    const sizeName = carSizeOptions.find((s) => s.id === formData.carSize)?.name || formData.carSize;

    const message = `Halo ${brandName}, saya ingin booking slot detailing / coating mobil:\n\n` +
      `👤 *Nama Pemilik:* ${formData.ownerName}\n` +
      `📱 *No. WhatsApp:* ${formData.ownerPhone}\n` +
      `🚗 *Mobil:* ${formData.carModel} (${sizeName})\n` +
      `✨ *Paket Dipilih:* ${formData.selectedPackage}\n` +
      `📅 *Rencana Tanggal Masuk:* ${formData.preferredDate || 'Menyesuaikan jadwal workshop'}\n` +
      (formData.notes ? `📝 *Catatan/Kondisi Cat:* ${formData.notes}\n\n` : '\n') +
      `Mohon info apakah ada slot pengerjaan yang tersedia ya mas/admin. Terima kasih!`;

    window.open(`https://wa.me/6285602743489?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950">
      
      {/* 1. TOP DEMO BANNER (STATIC, TIDAK STICKY AGAR LAYAR HP LEGA) */}
      <div className="bg-slate-900 text-slate-300 px-4 py-2.5 text-xs border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
            <span className="text-[11px] sm:text-xs">
              Live Preview Khusus untuk <strong className="text-white">{brandName}</strong> oleh <strong>NARA Digital</strong>
            </span>
          </div>
          <a
            href={`https://wa.me/6285602743489?text=Halo%20NARA%20Digital,%20saya%20tertarik%20konsultasi%20website%20untuk%20${encodeURIComponent(brandName)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:text-white font-semibold text-[11px] underline underline-offset-2 transition-colors"
          >
            Konsultasi Website Resmi Workshop →
          </a>
        </div>
      </div>

      {/* 2. MAIN HEADER (STICKY, MODERN SLEEK WORKSHOP) */}
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 flex items-center justify-center text-slate-950 font-black shrink-0">
              <Car className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <span className="block font-black text-white text-sm sm:text-lg tracking-tight leading-tight truncate">
                {brandName}
              </span>
              <span className="block text-[11px] text-amber-400 font-semibold tracking-wide truncate">
                Nano Ceramic Coating &amp; Auto Detailing Surabaya
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-300">
            <a href="#paket" className="hover:text-amber-400 transition-colors">Paket &amp; Harga</a>
            <a href="#kalkulator" className="hover:text-amber-400 transition-colors">Cek Ukuran Mobil</a>
            <a href="#fasilitas" className="hover:text-amber-400 transition-colors">Standar Pengerjaan</a>
            <a href="#testimoni" className="hover:text-amber-400 transition-colors">Hasil &amp; Ulasan</a>
            <a href="#faq" className="hover:text-amber-400 transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="#booking"
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-md shadow-amber-400/20"
            >
              <Calendar className="w-4 h-4" />
              <span>Booking Slot</span>
            </a>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION (DARK METALLIC, HIGH GLOSS AESTHETIC) */}
      <section className="pt-8 pb-14 sm:pt-14 sm:pb-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Headline */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Workshop Auto Detailing &amp; Paint Protection Surabaya</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                Proteksi Cat Mobil Kilap Basah Maksimal &amp; Bergaransi Resmi
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Hilangkan baret halus (*swirl mark*), jamur bodi, dan cat kusam dengan teknik *multi-step paint correction*. Lindungi mobil kesayangan Anda dengan lapisan Nano Ceramic Coating berteknologi *super hydrophobic* tahan hingga 5 tahun.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <a
                  href="#booking"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-amber-400/20 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reservasi Slot Pengerjaan</span>
                </a>
                <a
                  href="#paket"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm sm:text-base border border-slate-700 transition-all"
                >
                  <span>Lihat Paket &amp; Estimasi Biaya</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              </div>

              {/* 3 Poin Keunggulan Workshop */}
              <div className="pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                  <span><strong className="text-white">Rating 4.9</strong> (1.700+ Ulasan)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Ruang Coating Bebas Debu (AC)</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Garansi Resmi Tertulis</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Image (No Overlapping Badges) */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 aspect-16/10 relative">
                <Image
                  src={defaultDetailingConfig.heroImage}
                  alt={`Studio Detailing ${brandName}`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="mt-2.5 text-center text-[11px] text-slate-400">
                Pengerjaan di dalam studio berpendingin ruangan dengan lampu inspeksi LED 360°.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CAR SIZE SELECTOR (INTERACTIVE) */}
      <section id="kalkulator" className="py-12 bg-slate-900/60 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-6 space-y-1">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Pilih Ukuran Kendaraan
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Pilih Kategori Mobil Anda
            </h2>
            <p className="text-xs text-slate-400">
              Harga paket detailing &amp; coating otomatis menyesuaikan ukuran bodi mobil Anda.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {carSizeOptions.map((opt) => {
              const isSelected = selectedSize === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedSize(opt.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-amber-400/10 border-amber-400 text-white ring-1 ring-amber-400'
                      : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-xs font-bold ${isSelected ? 'text-amber-400' : 'text-slate-300'}`}>
                      {opt.name.split('(')[0]}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                  </div>
                  <div className="text-[11px] text-slate-400 leading-relaxed">
                    {opt.examples}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. PRICELIST PAKET DETAILING & COATING */}
      <section id="paket" className="py-16 sm:py-20 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Paket Perawatan Cat
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Daftar Paket Detailing &amp; Coating
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Menampilkan tarif untuk ukuran mobil: <strong className="text-amber-400">{carSizeOptions.find((s) => s.id === selectedSize)?.name}</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {detailingPackages.map((pkg) => {
              const currentPrice = pkg.basePrice[selectedSize];
              const isExpanded = expandedPackageId === pkg.id;

              return (
                <div
                  key={pkg.id}
                  className={`rounded-2xl border p-5 flex flex-col justify-between transition-all ${
                    pkg.popular
                      ? 'bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-amber-400/80 shadow-xl shadow-amber-400/5 ring-1 ring-amber-400/30'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                        pkg.popular ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-amber-300'
                      }`}>
                        {pkg.badge || 'Paket Standar'}
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {pkg.duration}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-white text-base leading-snug">
                        {pkg.name}
                      </h3>
                      <div className="text-xs text-amber-400 font-semibold mt-1">
                        🛡️ {pkg.warranty}
                      </div>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-3">
                        {pkg.description}
                      </p>
                    </div>

                    {/* Price Box */}
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-[10px] text-slate-400 font-medium">Biaya untuk {selectedSize.toUpperCase()}:</div>
                      <div className="text-xl font-black text-amber-400">
                        {formatRupiah(currentPrice)}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Sudah termasuk pengerjaan &amp; garansi</div>
                    </div>

                    {/* Expandable Features */}
                    <div>
                      <button
                        onClick={() => setExpandedPackageId(isExpanded ? null : pkg.id)}
                        className="w-full flex items-center justify-between text-xs font-semibold text-amber-400 hover:text-amber-300 py-1"
                      >
                        <span>{isExpanded ? 'Tutup Rincian' : 'Lihat Item Pengerjaan'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      {isExpanded && (
                        <div className="pt-2 text-xs text-slate-300 border-t border-slate-800 space-y-1.5 animate-fade-in">
                          {pkg.features.map((f, idx) => (
                            <div key={idx} className="flex items-start gap-1.5 text-[11px]">
                              <Check className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                              <span>{f}</span>
                            </div>
                          ))}
                          <div className="pt-2 text-[10px] text-slate-400">
                            <strong>Direkomendasikan untuk:</strong> {pkg.recommendedFor}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 mt-3 border-t border-slate-800">
                    <button
                      onClick={() => handleConsultWa(pkg.name)}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Konsultasi Paket Ini</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. CRAFTSMANSHIP & COATING PROCESS */}
      <section id="fasilitas" className="py-16 sm:py-20 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-xl aspect-4/3 relative bg-slate-900">
                <Image
                  src={defaultDetailingConfig.coatingImage}
                  alt="Aplikasi Ceramic Coating Profesional"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
              <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">
                Standar Pengerjaan Workshop
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-snug">
                Kami Tidak Hanya Sekadar Memoles, Kami Memulihkan &amp; Mengunci Kilap Cat Mobil Anda
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Setiap mobil dikerjakan dengan standar ruang tertutup bebas debu (*dust-free room*) ber-AC dan penyinaran heksagon LED untuk memastikan hasil akhir tanpa bekas baret mikro atau sisa obat poles.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                {detailingFacilities.map((fac, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <div className="font-bold text-white text-xs sm:text-sm flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      {fac.title}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed pl-5">
                      {fac.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. INTERIOR DETAILING SHOWCASE */}
      <section className="py-16 sm:py-20 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">
                Kabin Bersih &amp; Segar
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-snug">
                Pembersihan Total Interior: Bebas Noda Daki, Kuman &amp; Bau Apek
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Kabin mobil yang bersih bukan hanya soal kenyamanan, tetapi juga kesehatan seluruh keluarga. Kami membersihkan pori-pori jok kulit asli, karpet dasar, plafon kain, hingga sterilisasi sirkulasi AC dengan fogging antibakteri.
              </p>

              <div className="space-y-2 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400" />
                  <span>Jok kulit dirawat dengan *leather conditioner* khusus agar tidak pecah-pecah/retak.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400" />
                  <span>Ekstraksi basah karpet dasar dan jok kain fabric untuk mengangkat debu dalam.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400" />
                  <span>Fogging nano mist netralkan bau rokok, aroma makanan, dan jamur sirkulasi AC.</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleConsultWa('Interior Deep Detailing')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs border border-slate-700 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Konsultasi Paket Interior via WA</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-xl aspect-4/3 relative bg-slate-900">
                <Image
                  src={defaultDetailingConfig.interiorImage}
                  alt="Hasil Pembersihan Interior Mewah"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. FORMULIR BOOKING SLOT PENGERJAAN */}
      <section id="booking" className="py-16 sm:py-20 bg-slate-900/60 border-t border-slate-800">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          
          <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Reservasi Jadwal
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Booking Slot Pengerjaan Mobil
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Karena pengerjaan coating membutuhkan ketelitian tinggi, kami membatasi jumlah mobil yang masuk per hari demi hasil maksimal.
              </p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-300 uppercase">
                  Nama Pemilik *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Hendrik Sanjaya"
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-700 bg-slate-950 text-white text-sm focus:border-amber-400 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-300 uppercase">
                    No. WhatsApp Aktif *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0812-xxxx-xxxx"
                    value={formData.ownerPhone}
                    onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-700 bg-slate-950 text-white text-sm focus:border-amber-400 focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-300 uppercase">
                    Merek &amp; Model Mobil *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Misal: Innova Zenix / Fortuner"
                    value={formData.carModel}
                    onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-700 bg-slate-950 text-white text-sm focus:border-amber-400 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-300 uppercase">
                    Ukuran Mobil
                  </label>
                  <select
                    value={formData.carSize}
                    onChange={(e) => setFormData({ ...formData, carSize: e.target.value as CarSize })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-700 bg-slate-950 text-white text-sm"
                  >
                    {carSizeOptions.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-300 uppercase">
                    Paket yang Diinginkan
                  </label>
                  <select
                    value={formData.selectedPackage}
                    onChange={(e) => setFormData({ ...formData, selectedPackage: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-700 bg-slate-950 text-white text-sm"
                  >
                    {detailingPackages.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-300 uppercase">
                  Rencana Tanggal Masuk Workshop
                </label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-700 bg-slate-950 text-white text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-300 uppercase">
                  Catatan / Keluhan Cat (Opsional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Contoh: Bodi banyak baret swirl halus bekas lap, dan kaca depan ada jamur air..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-700 bg-slate-950 text-white text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-amber-400/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Kirim Booking ke WhatsApp Workshop</span>
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* 9. TESTIMONI PELANGGAN */}
      <section id="testimoni" className="py-14 sm:py-18 bg-slate-950 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-1">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Ulasan Pelanggan
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Kepuasan Pemilik Mobil di Surabaya
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Hasil nyata pengerjaan paint correction dan coating bergaransi resmi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {detailingTestimonials.map((t, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-800 bg-slate-900/70 space-y-2.5 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    &ldquo;{t.comment}&rdquo;
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-800 text-xs">
                  <div className="font-bold text-white">{t.name}</div>
                  <div className="text-[11px] text-amber-400 font-semibold">{t.car}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{t.location} • {t.packageUsed}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. FAQ */}
      <section id="faq" className="py-14 sm:py-16 bg-slate-900/40 border-t border-slate-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-8 space-y-1">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Pertanyaan yang Sering Diajukan
            </h2>
          </div>

          <div className="space-y-2.5">
            {detailingFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left font-bold text-white text-xs sm:text-sm hover:bg-slate-800/60 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800 bg-slate-950/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 11. ALAMAT & KONTAK WORKSHOP */}
      <section className="py-12 bg-slate-950 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center md:text-left">
              <div className="text-xs font-bold text-amber-400 uppercase flex items-center justify-center md:justify-start gap-1">
                <MapPin className="w-3.5 h-3.5" /> Lokasi Workshop
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Kunjungi Workshop {brandName} di Surabaya
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                {defaultDetailingConfig.address} • {defaultDetailingConfig.operatingHours}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => handleConsultWa()}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-amber-400/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Konsultasi WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 12. FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-10 text-xs border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <strong className="text-white block font-bold text-sm mb-0.5">{brandName}</strong>
            <span className="text-slate-400 text-[11px]">Nano Ceramic Coating &amp; Auto Detailing Surabaya</span>
          </div>

          <div className="text-[11px] text-slate-400">
            Interactive Web Demo by{' '}
            <Link href="/" className="underline text-amber-400 hover:text-white">
              NARA Digital Studio Surabaya
            </Link>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default function AutoDetailingDemoPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
          <div className="text-center space-y-2">
            <div className="w-8 h-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin mx-auto" />
            <div className="text-xs text-slate-400 font-medium">Memuat Demo Auto Detailing...</div>
          </div>
        </div>
      }
    >
      <AutoDetailingContent />
    </Suspense>
  );
}
