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
  Ruler,
  Hammer,
  CheckCircle2,
  XCircle,
  Layers,
  ArrowRight
} from 'lucide-react';
import {
  defaultInteriorConfig,
  interiorServices,
  interiorProjects,
  interiorWorkflow,
  contractorTestimonials,
  interiorFaqs,
  InteriorService
} from '@/data/interiorContractorData';

function formatRupiah(num: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(num);
}

function InteriorContractorContent() {
  const searchParams = useSearchParams();
  const brandParam = searchParams.get('brand');

  // Dynamic brand name
  const brandName = useMemo(() => {
    if (!brandParam) return defaultInteriorConfig.defaultBrand;
    const clean = brandParam.trim();
    if (clean.toLowerCase().includes('interior') || clean.toLowerCase().includes('kitchen') || clean.toLowerCase().includes('kontraktor')) {
      return clean;
    }
    return `${clean} Interior & Kitchen Set`;
  }, [brandParam]);

  // Estimator State
  const [estimatorType, setEstimatorType] = useState<'kitchen' | 'living' | 'wardrobe' | 'apartment'>('kitchen');
  const [meterLength, setMeterLength] = useState<number>(4);
  const [finishingType, setFinishingType] = useState<'taco-hpl' | 'aica-hpl' | 'duco'>('taco-hpl');
  const [tableTopType, setTableTopType] = useState<'hpl' | 'solid-surface' | 'granite'>('granite');

  // Estimator Calculation
  const estimatedTotal = useMemo(() => {
    if (estimatorType === 'apartment') {
      let base = 38000000;
      if (finishingType === 'aica-hpl') base += 5000000;
      if (finishingType === 'duco') base += 9000000;
      return { min: base, max: base + 6000000 };
    }

    // Per meter calculation
    let basePricePerMeter = 2400000;
    if (estimatorType === 'living') basePricePerMeter = 1850000;
    if (estimatorType === 'wardrobe') basePricePerMeter = 2500000;

    // Finishing modifier
    if (finishingType === 'aica-hpl') basePricePerMeter += 350000;
    if (finishingType === 'duco') basePricePerMeter += 750000;

    // Table top modifier (hanya berlaku untuk kitchen set)
    let tableTopCost = 0;
    if (estimatorType === 'kitchen') {
      if (tableTopType === 'solid-surface') tableTopCost = meterLength * 1200000;
      if (tableTopType === 'granite') tableTopCost = meterLength * 1650000;
    }

    const subtotal = (basePricePerMeter * meterLength) + tableTopCost;
    return {
      min: subtotal,
      max: Math.round(subtotal * 1.12)
    };
  }, [estimatorType, meterLength, finishingType, tableTopType]);

  // Portfolio Filter
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return interiorProjects;
    return interiorProjects.filter((p) => p.category.toLowerCase().includes(activeCategory.toLowerCase()));
  }, [activeCategory]);

  // FAQ State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    roomType: 'Kitchen Set & Ruang Makan',
    preferredDate: '',
    notes: ''
  });

  // WA Handlers
  const handleConsultWa = (serviceName?: string) => {
    const text = serviceName
      ? `Halo ${brandName}, saya mau konsultasi dan tanya estimasi biaya untuk pembuatan *${serviceName}*. Boleh info jadwal survey lokasinya?`
      : `Halo ${brandName}, saya berencana renovasi interior / bikin kitchen set di Surabaya. Boleh konsultasi dan jadwalkan survey gratis ke rumah saya?`;
    window.open(`https://wa.me/6285602743489?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleSendEstimateToWa = () => {
    const typeLabel = estimatorType === 'kitchen' ? 'Kitchen Set' :
      estimatorType === 'living' ? 'Backdrop TV & Wall Panel' :
      estimatorType === 'wardrobe' ? 'Wardrobe / Lemari Full Plafon' : 'Paket Interior Apartemen';

    const finishLabel = finishingType === 'taco-hpl' ? 'Taco HPL Doff/Glossy' :
      finishingType === 'aica-hpl' ? 'Aica Luxury Anti-Fingerprint' : 'Cat Duco Doff Halus';

    const topLabel = estimatorType === 'kitchen'
      ? `\n- Table Top: ${tableTopType === 'granite' ? 'Granit Nero / Marmer Alam' : tableTopType === 'solid-surface' ? 'Solid Surface Higienis' : 'HPL Standard'}`
      : '';

    const text = `Halo ${brandName}, saya sudah coba hitung estimasi biaya di website Anda:\n\n` +
      `📐 *Pekerjaan:* ${typeLabel}\n` +
      (estimatorType !== 'apartment' ? `📏 *Perkiraan Ukuran:* ${meterLength} Meter Lari\n` : '') +
      `🎨 *Pilihan Finishing:* ${finishLabel}${topLabel}\n` +
      `💰 *Estimasi Budget:* ${formatRupiah(estimatedTotal.min)} s/d ${formatRupiah(estimatedTotal.max)}\n\n` +
      `Bisa dibantu jadwalkan survey gratis ke rumah/lokasi saya di Surabaya untuk pengukuran pastinya?`;

    window.open(`https://wa.me/6285602743489?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.location) return;

    const message = `Halo ${brandName}, saya ingin jadwalkan survey lokasi & konsultasi interior gratis:\n\n` +
      `👤 *Nama:* ${formData.name}\n` +
      `📱 *No. WhatsApp:* ${formData.phone}\n` +
      `📍 *Lokasi/Perumahan:* ${formData.location} (Surabaya/Sekitarnya)\n` +
      `🛋️ *Ruangan yang Ingin Didekor:* ${formData.roomType}\n` +
      `📅 *Rencana Waktu Survey:* ${formData.preferredDate || 'Menyesuaikan jadwal tim arsitek'}\n` +
      (formData.notes ? `📝 *Catatan Kebutuhan:* ${formData.notes}\n\n` : '\n') +
      `Mohon konfirmasi jadwal kosongnya ya mas/admin. Terima kasih!`;

    window.open(`https://wa.me/6285602743489?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-amber-800 selection:text-white">
      
      {/* 1. TOP DEMO BANNER (STATIC AGAR TIDAK MENGGANGGU SCROLL HP) */}
      <div className="bg-stone-900 text-stone-300 px-4 py-2.5 text-xs border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
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
            Upgrade Website Anda Sekarang &rarr;
          </a>
        </div>
      </div>

      {/* 2. MAIN NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-stone-900 text-amber-400 flex items-center justify-center font-serif text-xl font-bold tracking-wider shadow-sm">
              K
            </div>
            <div>
              <span className="font-serif font-bold text-lg tracking-tight text-stone-900 block leading-tight">
                {brandName}
              </span>
              <span className="text-[11px] text-stone-500 font-medium tracking-wide uppercase flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-700" />
                Workshop & Design Studio Surabaya
              </span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
            <a href="#layanan" className="hover:text-amber-800 transition-colors">Layanan & Harga</a>
            <a href="#estimator" className="hover:text-amber-800 transition-colors flex items-center gap-1.5 text-amber-800 font-semibold">
              <Calculator className="w-4 h-4" />
              Hitung Biaya (RAB)
            </a>
            <a href="#portofolio" className="hover:text-amber-800 transition-colors">Portofolio Proyek</a>
            <a href="#material" className="hover:text-amber-800 transition-colors">Spesifikasi Material</a>
            <a href="#alur-kerja" className="hover:text-amber-800 transition-colors">Alur Kerja</a>
            <a href="#testimoni" className="hover:text-amber-800 transition-colors">Ulasan Klien</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#survey-gratis"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-stone-900 text-amber-300 hover:bg-stone-800 font-semibold text-xs tracking-wider uppercase transition-all shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              Survey Gratis
            </a>
            <button
              onClick={() => handleConsultWa()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-amber-700 text-white hover:bg-amber-800 font-semibold text-xs tracking-wider uppercase transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section className="relative overflow-hidden bg-stone-900 text-stone-100 py-16 lg:py-24 border-b border-stone-800">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-800/80 border border-stone-700 text-amber-400 text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Spesialis Kitchen Set & Interior Custom Presisi di Surabaya</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.18]">
                Bikin Rumah & Apartemen di Surabaya Lebih Mewah, Rapi, dan Bernilai Tinggi.
              </h1>

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Pengerjaan langsung dari workshop fabrikasi sendiri di Surabaya. Menggunakan 100% Multiplek Meranti 18mm padat anti-rayap (bukan serbuk kayu/MDF). Dilengkapi gambar 3D render gratis, rincian RAB transparan, dan garansi pemeliharaan resmi 1 tahun.
              </p>

              {/* Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-stone-800/60 border border-stone-700/60 p-3 rounded-lg text-left">
                  <span className="block font-serif text-xl font-bold text-amber-400">150+</span>
                  <span className="text-[11px] text-stone-400 leading-tight">Proyek Selesai di Surabaya</span>
                </div>
                <div className="bg-stone-800/60 border border-stone-700/60 p-3 rounded-lg text-left">
                  <span className="block font-serif text-xl font-bold text-amber-400">100%</span>
                  <span className="text-[11px] text-stone-400 leading-tight">Plywood 18mm Anti Rayap</span>
                </div>
                <div className="bg-stone-800/60 border border-stone-700/60 p-3 rounded-lg text-left">
                  <span className="block font-serif text-xl font-bold text-amber-400">1 Thn</span>
                  <span className="text-[11px] text-stone-400 leading-tight">Garansi Resmi Struktur</span>
                </div>
                <div className="bg-stone-800/60 border border-stone-700/60 p-3 rounded-lg text-left">
                  <span className="block font-serif text-xl font-bold text-amber-400">Rp 0</span>
                  <span className="text-[11px] text-stone-400 leading-tight">Biaya Survey & Konsultasi</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <a
                  href="#estimator"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-md bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm tracking-wide transition-all shadow-lg shadow-amber-900/30 flex items-center justify-center gap-2"
                >
                  <Calculator className="w-4 h-4" />
                  Hitung Estimasi Biaya (RAB)
                </a>
                <a
                  href="#survey-gratis"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-semibold text-sm tracking-wide transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Jadwalkan Survey Lokasi Gratis
                </a>
              </div>
            </div>

            {/* Right Showcase Photo */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-700/80 aspect-[4/3] sm:aspect-[4/3]">
                <Image
                  src={defaultInteriorConfig.heroImage}
                  alt="Modern Japandi Kitchen Set Surabaya"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-stone-900/90 backdrop-blur-md p-4 rounded-xl border border-stone-700 text-left">
                  <div className="flex items-center justify-between text-xs text-amber-400 font-semibold mb-1">
                    <span>Proyek Realisasi Terbaru</span>
                    <span className="bg-amber-400/20 px-2 py-0.5 rounded text-[10px]">Pakuwon City</span>
                  </div>
                  <p className="text-white text-sm font-medium">Kitchen Set Modern Japandi & Island Table Marmer</p>
                  <p className="text-stone-400 text-xs mt-0.5">Pengerjaan workshop 16 hari kerja, presisi tanpa celah.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE RAB ESTIMATOR (FITUR UNGGULAN PENARIK LEADS) */}
      <section id="estimator" className="py-20 bg-stone-100 border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
              Kalkulator Biaya Transparan
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-3">
              Hitung Perkiraan Biaya Interior Anda
            </h2>
            <p className="text-stone-600 text-sm mt-2">
              Dapatkan estimasi kasar rincian anggaran (RAB) sebelum tim kami melakukan survey pengukuran resmi.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-stone-200/80 p-6 sm:p-10">
            {/* Step 1: Select Type */}
            <div className="mb-8">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-3">
                1. Pilih Jenis Pekerjaan:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'kitchen', label: 'Kitchen Set', sub: 'Atas & Bawah' },
                  { id: 'living', label: 'Backdrop TV', sub: 'Wall Panel & Rak' },
                  { id: 'wardrobe', label: 'Lemari / Wardrobe', sub: 'Full Plafon' },
                  { id: 'apartment', label: 'Paket Apartemen', sub: 'All-In Siap Huni' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setEstimatorType(item.id as any)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      estimatorType === item.id
                        ? 'border-amber-700 bg-amber-50/50 shadow-sm ring-1 ring-amber-700'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <span className={`block font-semibold text-sm ${estimatorType === item.id ? 'text-amber-900' : 'text-stone-800'}`}>
                      {item.label}
                    </span>
                    <span className="text-xs text-stone-500">{item.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Dimension Slider (If not apartment) */}
            {estimatorType !== 'apartment' && (
              <div className="mb-8 bg-stone-50 p-6 rounded-xl border border-stone-200">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                    <Ruler className="w-4 h-4 text-amber-700" />
                    2. Perkiraan Panjang Ruangan (Meter Lari):
                  </label>
                  <span className="font-serif text-xl font-bold text-amber-800">
                    {meterLength} Meter
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="10"
                  step="0.5"
                  value={meterLength}
                  onChange={(e) => setMeterLength(parseFloat(e.target.value))}
                  className="w-full h-2.5 bg-stone-300 rounded-lg appearance-none cursor-pointer accent-amber-700"
                />
                <div className="flex justify-between text-[11px] text-stone-500 mt-2">
                  <span>2 Meter (Dapur Compact)</span>
                  <span>5 Meter (Standard Rumah)</span>
                  <span>10 Meter (Dapur Luas / Island)</span>
                </div>
              </div>
            )}

            {/* Step 3: Material & Finishing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                  {estimatorType !== 'apartment' ? '3.' : '2.'} Pilihan Finishing Luar:
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'taco-hpl', label: 'Taco HPL Doff / Tekstur Kayu', sub: 'Populer, tahan gores & panas' },
                    { id: 'aica-hpl', label: 'Aica HPL Anti-Fingerprint Premium', sub: 'Mewah, sidik jari tidak menempel' },
                    { id: 'duco', label: 'Finishing Cat Duco Doff Halus', sub: 'Tampilan mulus elegan tanpa sambungan' }
                  ].map((fin) => (
                    <label
                      key={fin.id}
                      onClick={() => setFinishingType(fin.id as any)}
                      className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                        finishingType === fin.id
                          ? 'border-amber-700 bg-amber-50/40 ring-1 ring-amber-700'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="finishing"
                        checked={finishingType === fin.id}
                        onChange={() => setFinishingType(fin.id as any)}
                        className="mt-1 text-amber-700 focus:ring-amber-700"
                      />
                      <div>
                        <span className="block text-xs font-semibold text-stone-900">{fin.label}</span>
                        <span className="text-[11px] text-stone-500">{fin.sub}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Table Top for Kitchen Set only */}
              {estimatorType === 'kitchen' && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                    4. Pilihan Table Top Meja Dapur:
                  </label>
                  <div className="space-y-2">
                    {[
                      { id: 'granite', label: 'Granit Alam Hitam (Nero India / Black Gold)', sub: 'Sangat keras, tahan panas kuali panas' },
                      { id: 'solid-surface', label: 'Solid Surface Higienis Mulus', sub: 'Bebas pori-pori, tanpa nat kotoran sambungan' },
                      { id: 'hpl', label: 'Lapis HPL Senada Kabinet', sub: 'Ekonomis untuk area dapur bersih (dry kitchen)' }
                    ].map((top) => (
                      <label
                        key={top.id}
                        onClick={() => setTableTopType(top.id as any)}
                        className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                          tableTopType === top.id
                            ? 'border-amber-700 bg-amber-50/40 ring-1 ring-amber-700'
                            : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="tabletop"
                          checked={tableTopType === top.id}
                          onChange={() => setTableTopType(top.id as any)}
                          className="mt-1 text-amber-700 focus:ring-amber-700"
                        />
                        <div>
                          <span className="block text-xs font-semibold text-stone-900">{top.label}</span>
                          <span className="text-[11px] text-stone-500">{top.sub}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Calculation Result Box */}
            <div className="bg-stone-900 text-stone-100 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold block mb-1">
                  Hasil Perkiraan Anggaran (RAB):
                </span>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  {formatRupiah(estimatedTotal.min)} <span className="text-stone-400 text-lg font-normal">s/d</span> {formatRupiah(estimatedTotal.max)}
                </div>
                <p className="text-xs text-stone-400 mt-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  Sudah termasuk: Plywood 18mm, Engsel Slow-Mo, Rak Stainless, Survey & Gambar 3D Gratis.
                </p>
              </div>

              <button
                onClick={handleSendEstimateToWa}
                className="w-full md:w-auto px-6 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 shrink-0"
              >
                <MessageCircle className="w-4 h-4" />
                Konsultasikan RAB Ini ke WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SERVICES & PRICING TRANSPARENCY */}
      <section id="layanan" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            Katalog Layanan Presisi
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-3">
            Pilihan Pekerjaan Interior & Custom Furniture
          </h2>
          <p className="text-stone-600 text-sm mt-2">
            Setiap pengerjaan menggunakan bahan berkualitas tinggi dengan garansi resmi pemeliharaan 1 tahun.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {interiorServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between gap-2 mb-3">
                  {service.badge && (
                    <span className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-800 text-[11px] font-bold tracking-wide">
                      {service.badge}
                    </span>
                  )}
                  <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    {service.duration}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mb-2">
                  {service.name}
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Price Display */}
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/80 mb-6">
                  <span className="text-[11px] uppercase font-bold text-stone-500 block">Mulai dari:</span>
                  <div className="font-serif text-2xl font-bold text-amber-900">
                    {formatRupiah(service.priceStart)}
                    <span className="text-xs font-normal text-stone-600 ml-1.5 font-sans">
                      / {service.unit}
                    </span>
                  </div>
                </div>

                {/* Specs List */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                      Spesifikasi Material:
                    </h4>
                    <ul className="space-y-1.5 text-xs text-stone-600">
                      {service.materials.map((mat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                          <span>{mat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                      Fitur & Keunggulan:
                    </h4>
                    <ul className="space-y-1.5 text-xs text-stone-600">
                      {service.specs.map((spec, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 bg-stone-50 border-t border-stone-100 flex items-center justify-between gap-4">
                <button
                  onClick={() => handleConsultWa(service.name)}
                  className="w-full py-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-400 font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Konsultasikan Desain Ini
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. MATERIAL INTEGRITY COMPARISON (BUKTI KEJUJURAN KONTRAKTOR) */}
      <section id="material" className="py-20 bg-stone-900 text-stone-100 border-y border-stone-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-800 px-3 py-1 rounded-full">
              Edukasi Klien Cerdas
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-3">
              Jangan Tertipu Harga Murah Tapi Cepat Rusak
            </h2>
            <p className="text-stone-400 text-sm mt-2">
              Banyak kontraktor interior memangkas harga dengan menggunakan serbuk kayu (MDF/Particle Board) yang mudah hancur terkena air dan lembap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Standar Kami */}
            <div className="bg-stone-800/90 rounded-2xl p-6 sm:p-8 border-2 border-amber-500/80 relative shadow-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold mb-4">
                <ShieldCheck className="w-4 h-4" />
                Standar Kualitas {brandName}
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-4">
                Awet Puluhan Tahun & Tahan Air
              </h3>
              <ul className="space-y-3.5 text-xs sm:text-sm text-stone-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">100% Plywood / Multiplek Meranti 18mm:</strong>
                    Kayu lapis padat asli, tahan lembap, tidak mudah melengkung, dan anti rayap.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Engsel Slow-Motion & Rel Laci Tandem:</strong>
                    Pintu menutup perlahan tanpa suara benturan keras, awet ratusan ribu kali buka-tutup.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Edging PVC Tebal 1-2mm:</strong>
                    Pinggiran kabinet direkatkan mesin khusus, sudut tumpul halus tidak tajam melukai tangan.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Garansi Resmi Pemeliharaan 1 Tahun:</strong>
                    Ada kendala engsel anjlok atau HPL mengelupas? Tim teknis kami datang gratis.
                  </div>
                </li>
              </ul>
            </div>

            {/* Mebel Murahan */}
            <div className="bg-stone-950/60 rounded-2xl p-6 sm:p-8 border border-stone-800">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-800/80 text-rose-400 text-xs font-bold mb-4">
                <XCircle className="w-4 h-4" />
                Mebel Pabrikan Murah / Kontraktor Abal-Abal
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-300 mb-4">
                Gampang Remuk dalam 1-2 Tahun
              </h3>
              <ul className="space-y-3.5 text-xs sm:text-sm text-stone-400">
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-300 block">MDF / Particle Board (Serbuk Gergaji Dipres):</strong>
                    Kena percikan air sedikit saja langsung mekar, berjamur, dan rontok jadi bubur.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-300 block">Engsel Besi Biasa Tanpa Hidrolik:</strong>
                    Mudah berkarat, pintu sering terbanting keras dan sekrup mudah copot dari dudukannya.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-300 block">Pelapis Paper Foil Tipis (Kertas Sablon):</strong>
                    Mudah sobek jika tergores kuku atau pisau, warna cepat pudar dan pinggiran mengelupas.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-300 block">Lepas Tangan Setelah Pembayaran:</strong>
                    Tidak menyediakan layanan purna jual atau garansi ketika furniture mulai rusak.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PORTFOLIO SHOWCASE */}
      <section id="portofolio" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            Galeri Realisasi Proyek
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-3">
            Hasil Pengerjaan Nyata di Surabaya
          </h2>
          <p className="text-stone-600 text-sm mt-2">
            Mulai dari residensial mewah di Citraland & Pakuwon hingga unit apartemen modern.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProjects.map((proj, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-lg transition-all group"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <Image
                  src={proj.image}
                  alt={proj.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-stone-900/85 backdrop-blur-sm text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-md">
                  {proj.category}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-700" />
                  <span>{proj.location}</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-2 leading-snug">
                  {proj.title}
                </h3>
                <p className="text-stone-600 text-xs leading-relaxed mb-4">
                  {proj.desc}
                </p>
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-amber-900 bg-amber-50 px-2 py-1 rounded">
                    {proj.scope}
                  </span>
                  <button
                    onClick={() => handleConsultWa(proj.title)}
                    className="text-stone-900 hover:text-amber-800 text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    Bikin Desain Serupa &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. WORKFLOW STEPS */}
      <section id="alur-kerja" className="py-20 bg-stone-100 border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-200/60 px-3 py-1 rounded-full">
              Transparan & Terstruktur
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-3">
              4 Langkah Mudah Mewujudkan Interior Impian
            </h2>
            <p className="text-stone-600 text-sm mt-2">
              Proses pengerjaan rapi dan tepat waktu tanpa membuat Anda pusing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {interiorWorkflow.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 border border-stone-200 shadow-sm relative"
              >
                <span className="font-serif text-4xl font-bold text-amber-200 block mb-2">
                  {item.step}
                </span>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-stone-600 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS */}
      <section id="testimoni" className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            Kepuasan Klien Residensial
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-3">
            Apa Kata Pemilik Rumah di Surabaya?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contractorTestimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed italic mb-4">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100">
                <span className="font-bold text-sm text-stone-900 block">{t.client}</span>
                <span className="text-xs text-amber-800 font-medium block">{t.projectType}</span>
                <span className="text-[11px] text-stone-500">{t.location} &bull; {t.year}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. FAQ ACCORDION */}
      <section className="py-20 bg-stone-100 border-t border-stone-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-200/60 px-3 py-1 rounded-full">
              Tanya Jawab Populer
            </span>
            <h2 className="font-serif text-3xl font-bold text-stone-900 mt-3">
              Pertanyaan yang Sering Diajukan
            </h2>
          </div>

          <div className="space-y-3">
            {interiorFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm text-stone-900"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-amber-800 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. FREE SURVEY BOOKING FORM */}
      <section id="survey-gratis" className="py-20 bg-white border-t border-stone-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
              Layanan Spesial
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-3">
              Jadwalkan Survey Lokasi Gratis ke Rumah Anda
            </h2>
            <p className="text-stone-600 text-sm mt-2">
              Tim arsitek & surveyor kami siap datang langsung membawa sampel katalog HPL, marmer, dan mengukur ruangan secara presisi tanpa dipungut biaya.
            </p>
          </div>

          <form
            onSubmit={handleFormSubmit}
            className="bg-stone-50 rounded-2xl p-6 sm:p-10 border border-stone-200 shadow-md space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Ibu Jessica"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  No. WhatsApp Aktif *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Contoh: 08123456789"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Lokasi / Perumahan di Surabaya *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Cluster Pakuwon City / Citraland"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Rencana Ruangan yang Ingin Didekor
                </label>
                <select
                  value={formData.roomType}
                  onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700"
                >
                  <option value="Kitchen Set & Ruang Makan">Kitchen Set & Ruang Makan</option>
                  <option value="Backdrop TV Living Room">Backdrop TV Living Room</option>
                  <option value="Wardrobe & Kamar Tidur Utama">Wardrobe & Kamar Tidur Utama</option>
                  <option value="Interior Rumah Full (2 Lantai)">Interior Rumah Full (2 Lantai)</option>
                  <option value="Paket Interior Apartemen">Paket Interior Apartemen</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                Rencana Waktu Survey yang Diinginkan
              </label>
              <input
                type="text"
                placeholder="Contoh: Sabtu depan jam 10 pagi atau menyesuaikan"
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                Catatan Tambahan / Konsep yang Disukai (Opsional)
              </label>
              <textarea
                rows={3}
                placeholder="Contoh: Mau konsep Japandi kayu oak muda dengan island table marmer putih..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-sm tracking-wide uppercase transition-all shadow-lg shadow-amber-900/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              Kirim & Jadwalkan Survey Gratis via WhatsApp
            </button>
          </form>
        </div>
      </section>

      {/* 12. FOOTER */}
      <footer className="bg-stone-950 text-stone-400 py-12 border-t border-stone-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <span className="font-serif font-bold text-lg text-white block mb-2">
                {brandName}
              </span>
              <p className="text-stone-400 leading-relaxed mb-3">
                {defaultInteriorConfig.tagline}
              </p>
              <p className="text-stone-500">
                {defaultInteriorConfig.address}
              </p>
            </div>

            <div>
              <span className="font-bold text-stone-200 block mb-2">Area Layanan Survey:</span>
              <p className="leading-relaxed text-stone-400">
                Surabaya Barat (Citraland, Graha Famili, Pakuwon Indah), Surabaya Timur (Pakuwon City, Dharmahusada), Surabaya Selatan, Pusat, serta Sidoarjo dan Gresik.
              </p>
              <span className="font-bold text-stone-200 block mt-3 mb-1">Jam Operasional:</span>
              <p className="text-stone-400">{defaultInteriorConfig.operatingHours}</p>
            </div>

            <div>
              <span className="font-bold text-stone-200 block mb-2">Kemitraan Digital:</span>
              <p className="leading-relaxed text-stone-400 mb-3">
                Website portofolio interaktif ini dikembangkan secara profesional oleh <strong>NARA Digital Studio Surabaya</strong> untuk meningkatkan konversi klien residensial bernilai tinggi.
              </p>
              <a
                href={`https://wa.me/6285602743489?text=Halo%20NARA%20Digital,%20saya%20tertarik%20konsultasi%20website%20untuk%20${encodeURIComponent(brandName)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-amber-400 hover:text-white font-semibold transition-colors"
              >
                Konsultasi Pembuatan Website Serupa &rarr;
              </a>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-800 text-center text-stone-500">
            &copy; {new Date().getFullYear()} {brandName}. Hak Cipta Dilindungi. All Rights Reserved.
          </div>
        </div>
      </footer>

      {/* 13. MOBILE STICKY BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-stone-900/95 backdrop-blur-md border-t border-stone-800 p-3 sm:hidden flex items-center justify-between gap-3">
        <div className="text-left pl-1">
          <span className="text-[10px] text-stone-400 uppercase tracking-wide block">Survey & 3D Render</span>
          <span className="text-xs font-bold text-amber-400">100% Gratis</span>
        </div>
        <button
          onClick={() => handleConsultWa()}
          className="flex-1 py-2.5 px-4 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
        >
          <MessageCircle className="w-4 h-4" />
          Chat WhatsApp
        </button>
      </div>

    </div>
  );
}

export default function InteriorContractorDemoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-stone-50 flex items-center justify-center text-stone-600 font-medium">
        Memuat portofolio interior...
      </div>
    }>
      <InteriorContractorContent />
    </Suspense>
  );
}
