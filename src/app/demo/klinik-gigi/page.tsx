'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Sparkles,
  Calendar,
  Clock,
  Phone,
  MessageCircle,
  MapPin,
  ChevronRight,
  Star,
  ShieldCheck,
  Heart,
  Calculator,
  ChevronDown,
  ChevronUp,
  Check,
  CheckCircle2,
  Coffee,
  HeartHandshake,
  Receipt,
  User,
  Activity,
  Smile,
  Award,
  Stethoscope,
  Send,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import {
  defaultDentalConfig,
  dentalTreatments,
  dentalDoctors,
  dentalTestimonials,
  clinicFacilities,
  dentalFaqs,
  DentalTreatment
} from '@/data/dentalClinicData';

function formatRupiah(num: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(num);
}

function DentalClinicContent() {
  const searchParams = useSearchParams();
  const brandParam = searchParams.get('brand');

  // Dynamic brand name based on URL parameter
  const brandName = useMemo(() => {
    if (!brandParam) return defaultDentalConfig.defaultBrand;
    const clean = brandParam.trim();
    if (clean.toLowerCase().includes('dental') || clean.toLowerCase().includes('gigi')) {
      return clean;
    }
    return `${clean} Dental Care`;
  }, [brandParam]);

  // Active treatment category filter
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedTreatmentId, setExpandedTreatmentId] = useState<string | null>(null);

  // Filtered treatments
  const filteredTreatments = useMemo(() => {
    if (activeCategory === 'all') return dentalTreatments;
    return dentalTreatments.filter((t) => t.category === activeCategory);
  }, [activeCategory]);

  // Interactive Cost Estimator State
  const [selectedTreatments, setSelectedTreatments] = useState<string[]>(['scaling']);
  const [installmentMonths, setInstallmentMonths] = useState<number>(6);

  const calculatedTotal = useMemo(() => {
    return selectedTreatments.reduce((acc, tId) => {
      const item = dentalTreatments.find((t) => t.id === tId);
      return acc + (item ? item.priceStart : 0);
    }, 0);
  }, [selectedTreatments]);

  const monthlyInstallment = useMemo(() => {
    if (calculatedTotal === 0) return 0;
    return Math.round(calculatedTotal / installmentMonths);
  }, [calculatedTotal, installmentMonths]);

  const toggleTreatmentSelection = (id: string) => {
    setSelectedTreatments((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Appointment Form State
  const [formData, setFormData] = useState({
    patientName: '',
    patientPhone: '',
    selectedService: 'Scaling & Pembersihan Karang Gigi',
    selectedDoctor: 'drg. Nadia Saraswati, Sp.Ort',
    preferredDate: '',
    preferredShift: 'Pagi (09.00 - 13.00)',
    notes: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // WhatsApp Handlers
  const handleConsultWa = (treatmentName?: string) => {
    const text = treatmentName
      ? `Halo ${brandName}, saya ingin konsultasi dan tanya jadwal untuk perawatan *${treatmentName}*. Boleh info rinciannya?`
      : `Halo ${brandName}, saya ingin konsultasi jadwal periksa gigi dengan dokter spesialis. Boleh info jadwal yang tersedia?`;
    window.open(`https://wa.me/6285602743489?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleSendSimulationWa = () => {
    const treatmentNames = selectedTreatments
      .map((id) => dentalTreatments.find((t) => t.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const text = `Halo ${brandName}, saya sudah menghitung estimasi perawatan di website:\n- Layanan: ${treatmentNames}\n- Estimasi Total: ${formatRupiah(calculatedTotal)}\n- Simulasi Cicilan: ~${formatRupiah(monthlyInstallment)}/bln (${installmentMonths} bulan)\n\nBoleh konsultasi lebih lanjut dengan dokter?`;
    window.open(`https://wa.me/6285602743489?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.patientName || !formData.patientPhone) return;

    setFormSubmitted(true);

    const message = `Halo ${brandName}, saya ingin reservasi jadwal temu dokter gigi:\n\n` +
      `👤 *Nama Pasien:* ${formData.patientName}\n` +
      `📱 *No. WhatsApp:* ${formData.patientPhone}\n` +
      `🦷 *Perawatan:* ${formData.selectedService}\n` +
      `👨‍⚕️ *Dokter Pilihan:* ${formData.selectedDoctor}\n` +
      `📅 *Tanggal Diinginkan:* ${formData.preferredDate || 'Menyesuaikan jadwal dokter'}\n` +
      `⏰ *Shift Jam:* ${formData.preferredShift}\n` +
      (formData.notes ? `📝 *Keluhan/Catatan:* ${formData.notes}\n\n` : '\n') +
      `Mohon konfirmasi ketersediaan slotnya ya dok/admin. Terima kasih!`;

    window.open(`https://wa.me/6285602743489?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* COMBINED STICKY HEADER WRAPPER (Never Collides / Never Overlaps on Mobile) */}
      <div className="sticky top-0 z-50 shadow-sm">
        {/* 1. TOP FLOATING NARA PREVIEW NOTICE BAR */}
        <aside aria-label="Demo Preview Notice" className="bg-gradient-to-r from-teal-800 via-teal-900 to-slate-900 text-white border-b border-teal-700/40">
          <div className="max-w-7xl mx-auto px-3.5 py-1.5 sm:py-2 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-2 text-xs">
            <div className="flex items-center gap-2 text-center sm:text-left">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="font-medium text-teal-100 text-[11px] sm:text-xs">
                💡 <strong className="text-white">Live Demo</strong> khusus untuk{' '}
                <span className="underline decoration-teal-300 font-bold text-white">{brandName}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-teal-200 hidden md:inline text-[11px]">Ingin website resmi untuk klinik Anda?</span>
              <a
                href={`https://wa.me/6285602743489?text=Halo%20NARA%20Digital,%20saya%20tertarik%20dengan%20demo%20website%20klinik%20gigi%20untuk%20${encodeURIComponent(brandName)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-teal-950 font-bold hover:bg-teal-50 transition-all shadow-xs text-[11px]"
              >
                <MessageCircle className="w-3.5 h-3.5 text-teal-600" />
                Chat NARA Digital
              </a>
            </div>
          </div>
        </aside>

        {/* 2. MAIN CLINIC NAVIGATION */}
        <header className="bg-white/98 backdrop-blur-md border-b border-slate-100 shadow-xs">
          <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-teal-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20 shrink-0">
                <Smile className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <span className="block font-black text-slate-900 text-sm sm:text-lg md:text-xl tracking-tight leading-tight truncate max-w-[170px] sm:max-w-xs md:max-w-none">
                  {brandName}
                </span>
                <span className="text-[10px] sm:text-xs text-teal-600 font-semibold tracking-wide flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                  <span className="truncate">Modern Dental &amp; Specialist Clinic</span>
                </span>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
              <a href="#layanan" className="hover:text-teal-600 transition-colors">Layanan &amp; Harga</a>
              <a href="#kalkulator" className="hover:text-teal-600 transition-colors">Simulasi Cicilan</a>
              <a href="#dokter" className="hover:text-teal-600 transition-colors">Jadwal Dokter</a>
              <a href="#fasilitas" className="hover:text-teal-600 transition-colors">Fasilitas Medis</a>
              <a href="#testimoni" className="hover:text-teal-600 transition-colors">Ulasan Pasien</a>
              <a href="#faq" className="hover:text-teal-600 transition-colors">FAQ</a>
            </nav>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <a
                href="#janji-temu"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-teal-600/25 transition-all hover:shadow-lg active:scale-95 shrink-0"
              >
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Buat Janji</span>
              </a>
            </div>
          </div>
        </header>
      </div>

      {/* 3. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28 bg-gradient-to-b from-white via-teal-50/30 to-[#F8FAFC]">
        {/* Soft background glow circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-teal-100/40 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-cyan-100/40 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-100/80 border border-teal-200/60 text-teal-800 text-xs sm:text-sm font-semibold">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>Klinik Gigi Pilihan Pasien Surabaya • Painless Dentistry</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.15] tracking-tight">
                Senyum Rapi, Sehat &amp; Percaya Diri{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-700 to-cyan-600">
                  Tanpa Rasa Takut
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
                Perawatan gigi modern berstandar medis premium di Surabaya. Didukung dokter gigi spesialis ramah, teknologi peredam ngilu (*gentle ultrasonic touch*), dan sterilisasi teruji demi kenyamanan seluruh keluarga Anda.
              </p>

              {/* Trust Badges Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Rating 5.0</div>
                    <div className="text-xs text-slate-500">2.200+ Ulasan Puas</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Steril Autoclave</div>
                    <div className="text-xs text-slate-500">Standar Medis WHO</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs col-span-2 sm:col-span-1">
                  <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                    <Receipt className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Transparan</div>
                    <div className="text-xs text-slate-500">Tanpa Biaya Tersembunyi</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
                <a
                  href="#janji-temu"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-base shadow-lg shadow-teal-600/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Jadwalkan Konsultasi Gratis</span>
                </a>
                <a
                  href="#layanan"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-base border border-slate-200 shadow-xs transition-all"
                >
                  <span>Lihat Pricelist Perawatan</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              </div>

              <div className="flex items-center gap-4 pt-2 text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-medium text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Buka Setiap Hari
                </span>
                <span>•</span>
                <span>Senin - Sabtu (09.00 - 21.00 WIB)</span>
                <span>•</span>
                <span>Minggu (By Appointment)</span>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-16/11">
                  <Image
                    src={defaultDentalConfig.heroImage}
                    alt={`Interior Modern ${brandName}`}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="inline-block px-3 py-1 rounded-full bg-teal-600/90 text-white text-xs font-bold tracking-wide backdrop-blur-xs mb-1">
                      Ruang Periksa Modern &amp; Higienis
                    </span>
                    <p className="text-xs text-white/90">
                      Dirancang dengan pencahayaan alami dan kursi dental ergonomis demi kenyamanan rileks selama perawatan.
                    </p>
                  </div>
                </div>

                {/* Floating Card 1: Painless Guarantee */}
                <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 max-w-[260px] animate-fade-in">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <HeartHandshake className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Pengalaman Nyaman</div>
                    <div className="text-sm font-bold text-slate-900">99.4% Pasien Puas &amp; Bebas Ngilu</div>
                  </div>
                </div>

                {/* Floating Card 2: Installment 0% */}
                <div className="absolute -top-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-teal-100 flex items-center gap-2.5">
                  <span className="flex h-3 w-3 rounded-full bg-teal-500" />
                  <div className="text-xs">
                    <span className="text-slate-500">Pasang Behel</span>{' '}
                    <span className="font-extrabold text-teal-700">Cicilan 0%</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. DOCTOR & PATIENT CONSULTATION HIGHLIGHT */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 order-2 lg:order-1 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-slate-50 aspect-4/3">
                <Image
                  src={defaultDentalConfig.consultImage}
                  alt="Konsultasi Ramah Dokter Gigi"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-3 text-center text-xs text-slate-500">
                Dokter kami selalu mengedepankan edukasi mendalam sebelum tindakan dimulai.
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
              <div className="inline-flex items-center gap-1.5 text-teal-700 font-bold text-sm tracking-wide uppercase">
                <Stethoscope className="w-4 h-4" />
                <span>Filosofi Pelayanan Kami</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                Kami Mengubah Paradigma:{' '}
                <span className="text-teal-700">Periksa Gigi Sekarang Bisa Sangat Menyenangkan &amp; Tenang</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Banyak orang menunda merawat gigi karena memori masa kecil yang menakutkan atau takut biaya membengkak di kasir. Di <strong>{brandName}</strong>, kami menerapkan pendekatan <em>Gentle &amp; Transparent Dentistry</em>:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    Penjelasan Digital 3D &amp; Rontgen
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Kondisi gigi Anda diperlihatkan lewat kamera intraoral &amp; rontgen agar Anda paham alasan tindakan medisnya.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    Rencana Perawatan Personal
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Setiap rencana disesuaikan dengan kebutuhan klinis dan budget Anda tanpa paksaan tindakan yang tidak perlu.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. PRICELIST & TREATMENT MENU SECTION */}
      <section id="layanan" className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider">
              Daftar Layanan Medis
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Pilihan Perawatan &amp; Transparansi Biaya
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Ketahui rincian perkiraan biaya dari awal. Harga kami wajar, bersahabat, dan dapat dikonsultasikan langsung sebelum tindakan.
            </p>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {[
                { id: 'all', label: 'Semua Layanan' },
                { id: 'kesehatan', label: 'Kesehatan & Pencegahan' },
                { id: 'estetik', label: 'Estetika & Bleaching' },
                { id: 'behel', label: 'Behel & Kerapian Gigi' },
                { id: 'anak', label: 'Gigi Anak' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                    activeCategory === cat.id
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-600/25'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Treatment Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTreatments.map((treatment) => {
              const isExpanded = expandedTreatmentId === treatment.id;

              return (
                <div
                  key={treatment.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden ${
                    treatment.popular
                      ? 'border-teal-500 shadow-lg shadow-teal-500/10 ring-1 ring-teal-500'
                      : 'border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md'
                  }`}
                >
                  <div className="p-5 space-y-4">
                    {/* Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-teal-50 text-teal-700">
                        {treatment.badge || 'Layanan Spesialis'}
                      </span>
                      <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {treatment.duration}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg leading-snug">
                        {treatment.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                        {treatment.description}
                      </p>
                    </div>

                    {/* Price Block */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="text-[11px] text-slate-500 font-medium">Estimasi Biaya:</div>
                      <div className="text-lg font-black text-teal-700">
                        {formatRupiah(treatment.priceStart)}
                        {treatment.priceEnd && (
                          <span className="text-xs font-normal text-slate-500">
                            {' '} - {formatRupiah(treatment.priceEnd)}
                          </span>
                        )}
                      </div>
                      {treatment.priceNote && (
                        <div className="text-[10px] text-slate-400 italic mt-0.5">
                          *{treatment.priceNote}
                        </div>
                      )}
                    </div>

                    {/* Expandable Benefits */}
                    <div>
                      <button
                        onClick={() => setExpandedTreatmentId(isExpanded ? null : treatment.id)}
                        className="w-full flex items-center justify-between py-1.5 text-xs font-semibold text-teal-700 hover:text-teal-800 transition-colors"
                      >
                        <span>{isExpanded ? 'Sembunyikan Rincian' : 'Lihat Keunggulan & Benefit'}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      {isExpanded && (
                        <div className="pt-2 space-y-2 text-xs text-slate-600 border-t border-slate-100 animate-fade-in">
                          <div className="font-semibold text-slate-700">Manfaat Utama:</div>
                          <ul className="space-y-1.5 pl-1">
                            {treatment.benefits.map((b, idx) => (
                              <li key={idx} className="flex items-start gap-1.5 text-[11px]">
                                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="pt-1 text-[11px] text-slate-500">
                            <strong className="text-slate-700">Cocok untuk:</strong> {treatment.recommendedFor}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Action */}
                  <div className="p-4 bg-slate-50/70 border-t border-slate-100">
                    <button
                      onClick={() => handleConsultWa(treatment.name)}
                      className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors shadow-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Tanya Jadwal via WA</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. INTERACTIVE TREATMENT COST & INSTALLMENT ESTIMATOR */}
      <section id="kalkulator" className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-2xl relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Calculator Controls */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wide mb-2">
                    <Calculator className="w-3.5 h-3.5" />
                    Simulasi Anggaran &amp; Cicilan
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Hitung Estimasi Biaya &amp; Cicilan Perawatan Anda
                  </h2>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1">
                    Pilih paket perawatan yang Anda butuhkan. Kami sediakan opsi cicilan fleksibel 0% tanpa memberatkan pengeluaran bulanan.
                  </p>
                </div>

                {/* Checklist of Treatments */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Pilih Layanan yang Diinginkan:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {dentalTreatments.map((t) => {
                      const isSelected = selectedTreatments.includes(t.id);
                      return (
                        <div
                          key={t.id}
                          onClick={() => toggleTreatmentSelection(t.id)}
                          className={`p-3 rounded-xl cursor-pointer border text-xs transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-teal-600/30 border-teal-400 text-white font-semibold'
                              : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                                isSelected
                                  ? 'bg-teal-500 border-teal-400 text-white'
                                  : 'border-white/30'
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className="truncate max-w-[150px]">{t.name}</span>
                          </div>
                          <span className="text-[11px] text-teal-300 font-bold shrink-0">
                            {formatRupiah(t.priceStart)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Installment Term Selector */}
                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Pilihan Tenor Cicilan 0%:
                  </label>
                  <div className="flex items-center gap-3">
                    {[3, 6, 12].map((months) => (
                      <button
                        key={months}
                        onClick={() => setInstallmentMonths(months)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          installmentMonths === months
                            ? 'bg-teal-400 text-slate-950 shadow-md shadow-teal-400/30'
                            : 'bg-white/10 text-slate-300 hover:bg-white/20'
                        }`}
                      >
                        {months} Bulan
                      </button>
                    ))}
                    <span className="text-xs text-slate-400 italic">Bebas bunga 0%</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Calculation Result Card */}
              <div className="lg:col-span-5">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 space-y-6 text-center lg:text-left">
                  <div>
                    <div className="text-xs text-teal-300 font-semibold uppercase tracking-wider">
                      Ringkasan Simulasi
                    </div>
                    <div className="text-3xl sm:text-4xl font-black text-white mt-1">
                      {formatRupiah(calculatedTotal)}
                    </div>
                    <div className="text-xs text-slate-300 mt-1">
                      Total estimasi biaya untuk {selectedTreatments.length} layanan terpilih
                    </div>
                  </div>

                  <div className="py-4 border-y border-white/10 space-y-1">
                    <div className="text-xs text-slate-300">Estimasi Cicilan per Bulan:</div>
                    <div className="text-2xl font-black text-emerald-300">
                      ~{formatRupiah(monthlyInstallment)}{' '}
                      <span className="text-xs text-white/80 font-normal">/ bln</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Selama {installmentMonths} bulan tanpa biaya tersembunyi
                    </div>
                  </div>

                  <button
                    onClick={handleSendSimulationWa}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-black text-sm transition-all shadow-lg shadow-teal-500/20 active:scale-98"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim Rincian Ini ke WhatsApp Dokter</span>
                  </button>

                  <div className="text-[11px] text-slate-400 text-center">
                    *Biaya riil disesuaikan dengan hasil evaluasi fisik gigi saat periksa di klinik.
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 7. DOCTOR TIMETABLE SECTION */}
      <section id="dokter" className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider">
              Tim Medis Profesional
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Jadwal Praktek Dokter Gigi Spesialis
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Ditangani langsung oleh dokter gigi umum dan spesialis lulusan universitas terkemuka dengan sertifikasi resmi dan keahlian mendalam.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dentalDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 text-2xl flex items-center justify-center shrink-0">
                      {doc.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base leading-snug">
                        {doc.name}
                      </h3>
                      <span className="inline-block text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md mt-1">
                        {doc.specialist}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 font-medium">
                    🏅 {doc.experience}
                  </div>

                  {/* Schedule Block */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-teal-600" /> Jadwal Praktek:
                    </div>
                    {doc.schedule.map((s, idx) => (
                      <div key={idx} className="text-xs">
                        <div className="font-semibold text-slate-800">{s.days}</div>
                        <div className="text-slate-500 text-[11px]">{s.hours}</div>
                      </div>
                    ))}
                  </div>

                  {/* Focus Area */}
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold text-slate-700">Fokus Tindakan:</div>
                    <div className="flex flex-wrap gap-1">
                      {doc.focus.map((f, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100">
                  <a
                    href="#janji-temu"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        selectedDoctor: doc.name
                      }));
                    }}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs transition-colors"
                  >
                    <span>Pilih Dokter Ini</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. SMILE MAKEOVER SHOWCASE */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider">
                Smile Transformation
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Investasi Terbaik yang Tak Pernah Anda Sesali adalah{' '}
                <span className="text-teal-700">Senyuman Indah Anda</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Senyuman yang rapi dan putih bersih terbukti meningkatkan rasa percaya diri saat berbicara di depan umum, interview karier, hingga berfoto di momen-momen spesial.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Align (Perataan Presisi)</h3>
                    <p className="text-xs text-slate-500">
                      Koreksi susunan gigi berjejal menggunakan Behel Presisi atau Clear Aligners transparan.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Brighten (Pemutihan Alami)</h3>
                    <p className="text-xs text-slate-500">
                      Hilangkan noda kopi dan nikotin dengan Laser Teeth Whitening dingin tanpa merusak email.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Protect (Perlindungan Gigi Seumur Hidup)</h3>
                    <p className="text-xs text-slate-500">
                      Scaling rutin dan fluoride topical untuk menjaga gusi kuat dan nafas selalu segar.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleConsultWa('Konsultasi Smile Makeover')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md shadow-teal-600/20 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Konsultasi Smile Makeover via WA</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-50 aspect-4/3">
                <Image
                  src={defaultDentalConfig.smileImage}
                  alt="Hasil Senyum Sehat Alami"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="font-bold text-base sm:text-lg">Tampil Percaya Diri Setiap Hari</div>
                  <div className="text-xs text-white/80">Hasil nyata dari ribuan pasien yang telah merawat gigi di {brandName}.</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. ONLINE APPOINTMENT BOOKING FORM */}
      <section id="janji-temu" className="py-20 bg-gradient-to-b from-[#F8FAFC] to-teal-50/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
            <div className="p-6 sm:p-10 bg-gradient-to-r from-teal-700 to-cyan-700 text-white">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-teal-100 text-xs font-bold uppercase tracking-wider mb-2">
                <Calendar className="w-3.5 h-3.5" />
                Reservasi Jadwal Pasien
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Buat Janji Temu Dokter Gigi Sekarang
              </h2>
              <p className="text-teal-100 text-xs sm:text-sm mt-1 max-w-xl">
                Hindari antrean panjang. Isi data singkat di bawah ini, jadwal Anda akan langsung terkirim dan dikonfirmasi oleh admin klinik via WhatsApp.
              </p>
            </div>

            <form onSubmit={handleAppointmentSubmit} className="p-6 sm:p-10 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Patient Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Nama Lengkap Pasien *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Rian Pratama"
                      value={formData.patientName}
                      onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-sm outline-hidden transition-all bg-slate-50/50"
                    />
                  </div>
                </div>

                {/* Patient WhatsApp Phone */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Nomor WhatsApp Aktif *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      required
                      placeholder="0812-xxxx-xxxx"
                      value={formData.patientPhone}
                      onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-sm outline-hidden transition-all bg-slate-50/50"
                    />
                  </div>
                </div>

                {/* Service Selection */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Pilihan Perawatan
                  </label>
                  <select
                    value={formData.selectedService}
                    onChange={(e) => setFormData({ ...formData, selectedService: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-sm outline-hidden transition-all bg-slate-50/50 font-medium text-slate-700"
                  >
                    {dentalTreatments.map((t) => (
                      <option key={t.id} value={t.name}>
                        {t.name} ({formatRupiah(t.priceStart)})
                      </option>
                    ))}
                    <option value="Konsultasi Umum & Periksa Rutin">Konsultasi Umum &amp; Periksa Rutin</option>
                  </select>
                </div>

                {/* Doctor Selection */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Pilihan Dokter Gigi
                  </label>
                  <select
                    value={formData.selectedDoctor}
                    onChange={(e) => setFormData({ ...formData, selectedDoctor: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-sm outline-hidden transition-all bg-slate-50/50 font-medium text-slate-700"
                  >
                    {dentalDoctors.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name} ({d.specialist})
                      </option>
                    ))}
                    <option value="Dokter yang Standby / Menyesuaikan">Dokter yang Standby / Menyesuaikan</option>
                  </select>
                </div>

                {/* Date Preference */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Tanggal Kunjungan
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-sm outline-hidden transition-all bg-slate-50/50 text-slate-700"
                  />
                </div>

                {/* Shift Preference */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Shift Jam Preferensi
                  </label>
                  <select
                    value={formData.preferredShift}
                    onChange={(e) => setFormData({ ...formData, preferredShift: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-sm outline-hidden transition-all bg-slate-50/50 font-medium text-slate-700"
                  >
                    <option value="Pagi (09.00 - 13.00)">Pagi (09.00 - 13.00 WIB)</option>
                    <option value="Sore (14.00 - 17.30)">Sore (14.00 - 17.30 WIB)</option>
                    <option value="Malam (18.30 - 21.00)">Malam (18.30 - 21.00 WIB)</option>
                  </select>
                </div>

              </div>

              {/* Notes / Complaints */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Keluhan Singkat (Opsional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Misal: Gigi geraham kiri bawah berdenyut, atau ingin konsultasi pasang behel..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-sm outline-hidden transition-all bg-slate-50/50 text-slate-700 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-base shadow-lg shadow-teal-600/25 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Kirim Janji Temu ke WhatsApp Klinik</span>
              </button>

              <div className="text-center text-xs text-slate-400">
                🔒 Data Anda aman dan hanya digunakan untuk keperluan konfirmasi jadwal periksa klinik.
              </div>
            </form>
          </div>

        </div>
      </section>

      {/* 10. FACILITIES & HYGIENE SECTION */}
      <section id="fasilitas" className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider">
              Standar Keselamatan Medis
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Fasilitas Modern &amp; Higienitas Terjamin
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Kenyamanan dan keamanan pasien adalah prioritas mutlak kami dengan standar kebersihan tertinggi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clinicFacilities.map((fac, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                  {idx === 0 && <ShieldCheck className="w-6 h-6" />}
                  {idx === 1 && <HeartHandshake className="w-6 h-6" />}
                  {idx === 2 && <Receipt className="w-6 h-6" />}
                  {idx === 3 && <Coffee className="w-6 h-6" />}
                </div>
                <h3 className="font-bold text-slate-900 text-base">{fac.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{fac.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 11. PATIENT TESTIMONIALS */}
      <section id="testimoni" className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider">
              Suara Pasien
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Pengalaman Nyata Warga Surabaya di {brandName}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Lebih dari 2.200 ulasan bintang 5 di Google Maps membuktikan komitmen kami dalam melayani dengan tulus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dentalTestimonials.map((testi, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1">
                    {[...Array(testi.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 italic leading-relaxed">
                    &ldquo;{testi.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100">
                  <div className="font-bold text-slate-900 text-xs">{testi.patient}</div>
                  <div className="text-[11px] text-teal-700 font-semibold">{testi.treatment}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{testi.location} • {testi.date}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 12. FAQ ACCORDION */}
      <section id="faq" className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="inline-flex items-center gap-1 text-teal-700 font-bold text-xs uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" /> Pertanyaan Populer
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Pertanyaan yang Sering Diajukan
            </h2>
          </div>

          <div className="space-y-3">
            {dentalFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 text-sm sm:text-base hover:bg-slate-50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-teal-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 13. LOCATION & CONTACT BAR */}
      <section className="py-16 bg-[#F8FAFC] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 text-teal-700 font-bold text-xs uppercase tracking-wider">
                <MapPin className="w-4 h-4" /> Lokasi &amp; Jam Praktek
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Kunjungi Klinik {brandName} di Surabaya
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
                {defaultDentalConfig.address} • {defaultDentalConfig.operatingHours}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <button
                onClick={() => handleConsultWa()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md shadow-teal-600/25 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Admin WhatsApp</span>
              </button>
              <a
                href="#janji-temu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Reservasi Jadwal</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 14. FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
              <Smile className="w-5 h-5" />
            </div>
            <div>
              <span className="block font-bold text-white text-sm">{brandName}</span>
              <span className="text-[11px] text-slate-500">Klinik Gigi Modern &amp; Spesialis Surabaya</span>
            </div>
          </div>

          <div className="text-center sm:text-right space-y-1">
            <div className="text-slate-300">
              © {new Date().getFullYear()} {brandName}. Hak Cipta Dilindungi.
            </div>
            <div className="text-[11px] text-teal-400">
              Interactive Web Showcase crafted with ❤️ by{' '}
              <Link href="/" className="underline hover:text-white font-semibold">
                NARA Digital Studio Surabaya
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function DentalClinicDemoPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-600 animate-spin mx-auto" />
            <div className="font-bold text-slate-700 text-sm">Memuat Demo Klinik Gigi...</div>
          </div>
        </div>
      }
    >
      <DentalClinicContent />
    </Suspense>
  );
}
