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
  CheckCircle2,
  Coffee,
  HeartHandshake,
  Receipt,
  User,
  Smile,
  Send,
  HelpCircle
} from 'lucide-react';
import {
  defaultDentalConfig,
  dentalTreatments,
  dentalDoctors,
  dentalTestimonials,
  dentalFaqs
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

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // WhatsApp Handlers
  const handleConsultWa = (treatmentName?: string) => {
    const text = treatmentName
      ? `Halo ${brandName}, saya ingin tanya jadwal dan biaya untuk perawatan *${treatmentName}*. Boleh minta informasinya?`
      : `Halo ${brandName}, saya mau tanya jadwal periksa gigi yang tersedia minggu ini. Boleh dibantu?`;
    window.open(`https://wa.me/6285602743489?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleSendSimulationWa = () => {
    const treatmentNames = selectedTreatments
      .map((id) => dentalTreatments.find((t) => t.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const text = `Halo ${brandName}, saya mau konsultasi perkiraan biaya perawatan gigi:\n- Layanan: ${treatmentNames}\n- Perkiraan Biaya: ${formatRupiah(calculatedTotal)}\n- Rencana Cicilan: ~${formatRupiah(monthlyInstallment)}/bln (${installmentMonths} bulan)\n\nApakah bisa konsultasi dengan dokter terlebih dahulu?`;
    window.open(`https://wa.me/6285602743489?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.patientName || !formData.patientPhone) return;

    const message = `Halo ${brandName}, saya ingin reservasi jadwal periksa gigi:\n\n` +
      `👤 *Nama Pasien:* ${formData.patientName}\n` +
      `📱 *No. WhatsApp:* ${formData.patientPhone}\n` +
      `🦷 *Perawatan:* ${formData.selectedService}\n` +
      `👨‍⚕️ *Dokter:* ${formData.selectedDoctor}\n` +
      `📅 *Tanggal:* ${formData.preferredDate || 'Menyesuaikan jadwal'}\n` +
      `⏰ *Waktu:* ${formData.preferredShift}\n` +
      (formData.notes ? `📝 *Keluhan:* ${formData.notes}\n\n` : '\n') +
      `Mohon info apakah slot jadwal tersebut masih tersedia. Terima kasih!`;

    window.open(`https://wa.me/6285602743489?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      
      {/* 1. TOP DEMO BANNER (STATIC, TIDAK STICKY AGAR LAYAR HP LEGA SAAT DI-SCROLL) */}
      <div className="bg-slate-900 text-slate-200 px-4 py-2.5 text-xs border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <span className="text-[11px] sm:text-xs">
              Live Preview Khusus untuk <strong className="text-white">{brandName}</strong> oleh <strong>NARA Digital</strong>
            </span>
          </div>
          <a
            href={`https://wa.me/6285602743489?text=Halo%20NARA%20Digital,%20saya%20tertarik%20konsultasi%20website%20untuk%20${encodeURIComponent(brandName)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-400 hover:text-white font-semibold text-[11px] underline underline-offset-2 transition-colors"
          >
            Konsultasi Website Resmi →
          </a>
        </div>
      </div>

      {/* 2. MAIN HEADER (STICKY, RINGAN & BERSIH) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shrink-0">
              <Smile className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="block font-bold text-slate-900 text-sm sm:text-lg leading-tight truncate">
                {brandName}
              </span>
              <span className="block text-[11px] text-teal-700 font-medium truncate">
                Klinik Dokter Gigi Surabaya
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#layanan" className="hover:text-teal-700 transition-colors">Layanan &amp; Biaya</a>
            <a href="#kalkulator" className="hover:text-teal-700 transition-colors">Simulasi Cicilan</a>
            <a href="#dokter" className="hover:text-teal-700 transition-colors">Jadwal Dokter</a>
            <a href="#testimoni" className="hover:text-teal-700 transition-colors">Ulasan Pasien</a>
            <a href="#faq" className="hover:text-teal-700 transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="#janji-temu"
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Buat Janji</span>
            </a>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION (BERSIH, ALAMI, FOKUS PASIEN) */}
      <section className="pt-8 pb-14 sm:pt-14 sm:pb-20 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Teks Hero */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5 text-teal-600" />
                <span>Praktek Dokter Gigi Umum &amp; Spesialis di Surabaya</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
                Perawatan Gigi Bersih, Nyaman &amp; Terpercaya untuk Keluarga Anda
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Melayani pemeriksaan rutin, pembersihan karang gigi, penambalan, hingga behel dan gigi anak. Ditangani dokter gigi ramah dengan peralatan steril dan rincian biaya yang transparan sebelum tindakan.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <a
                  href="#janji-temu"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm sm:text-base shadow-sm transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Jadwalkan Kunjungan Dokter</span>
                </a>
                <a
                  href="#layanan"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm sm:text-base transition-all"
                >
                  <span>Lihat Daftar Biaya Perawatan</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              </div>

              {/* 3 Poin Kepercayaan yang Nyata */}
              <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                  <span><strong>Rating 5.0</strong> di Google Maps</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Alat Steril Standar Medis</span>
                </div>
                <div className="flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Biaya Jelas di Awal</span>
                </div>
              </div>
            </div>

            {/* Right Column: Foto Ruangan Bersih (Tanpa Badge Bertumpuk) */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100 aspect-4/3 relative">
                <Image
                  src={defaultDentalConfig.heroImage}
                  alt={`Ruang Periksa ${brandName}`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="mt-2.5 text-center text-[11px] text-slate-500">
                Ruang periksa higienis dengan kursi dental modern dan pencahayaan nyaman.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. PENDEKATAN PELAYANAN (MENGAPA PASIEN NYAMAN) */}
      <section className="py-14 sm:py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-4/3 relative bg-slate-100">
                <Image
                  src={defaultDentalConfig.consultImage}
                  alt="Konsultasi Pasien dengan Dokter Gigi"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
              <span className="text-xs font-bold text-teal-700 tracking-wider uppercase">
                Standar Pelayanan
              </span>
              <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                Periksa Gigi Tanpa Rasa Cemas atau Was-was Soal Biaya
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Kami memahami banyak orang merasa takut ke dokter gigi karena bayangan rasa sakit atau biaya yang membengkak di akhir. Di <strong>{brandName}</strong>, kenyamanan pasien adalah hal utama:
              </p>

              <div className="space-y-3 pt-1">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm">
                    <strong className="block text-slate-900 font-bold mb-0.5">Penjelasan Kondisi Gigi Sebelum Tindakan</strong>
                    <span className="text-slate-600">Dokter akan memeriksa dan menerangkan masalah gigi Anda dengan bahasa yang mudah dipahami sebelum tindakan dimulai.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm">
                    <strong className="block text-slate-900 font-bold mb-0.5">Alat Selalu Steril &amp; Dibuka di Depan Pasien</strong>
                    <span className="text-slate-600">Seluruh peralatan melalui proses sterilisasi autoclave berstandar medis untuk menjamin kebersihan dan keamanan Anda.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm">
                    <strong className="block text-slate-900 font-bold mb-0.5">Transparansi Rincian Biaya</strong>
                    <span className="text-slate-600">Semua estimasi biaya disampaikan di awal. Tidak ada tindakan tambahan tanpa persetujuan Anda terlebih dahulu.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. PRICELIST & DAFTAR LAYANAN */}
      <section id="layanan" className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold text-teal-700 tracking-wider uppercase">
              Daftar Perawatan
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Layanan Medis &amp; Perkiraan Biaya
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Biaya transparan dan dapat dikonsultasikan langsung sebelum dokter memulai tindakan.
            </p>

            {/* Filter Tabs Sederhana */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-3">
              {[
                { id: 'all', label: 'Semua' },
                { id: 'kesehatan', label: 'Perawatan Umum' },
                { id: 'behel', label: 'Behel & Kerapian' },
                { id: 'estetik', label: 'Bleaching & Estetika' },
                { id: 'anak', label: 'Gigi Anak' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeCategory === cat.id
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layanan */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredTreatments.map((treatment) => {
              const isExpanded = expandedTreatmentId === treatment.id;

              return (
                <div
                  key={treatment.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between shadow-xs hover:border-slate-300 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-teal-50 text-teal-700">
                        {treatment.badge || 'Tindakan Dokter'}
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {treatment.duration}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900 text-base leading-snug">
                        {treatment.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-3">
                        {treatment.description}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="text-[10px] text-slate-400 font-medium">Perkiraan Biaya:</div>
                      <div className="text-base font-bold text-teal-700">
                        {formatRupiah(treatment.priceStart)}
                        {treatment.priceEnd && (
                          <span className="text-xs font-normal text-slate-500">
                            {' '} - {formatRupiah(treatment.priceEnd)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Rincian Tambahan */}
                    <div>
                      <button
                        onClick={() => setExpandedTreatmentId(isExpanded ? null : treatment.id)}
                        className="w-full flex items-center justify-between text-xs font-medium text-teal-700 hover:text-teal-800 py-1"
                      >
                        <span>{isExpanded ? 'Tutup Rincian' : 'Lihat Manfaat'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      {isExpanded && (
                        <div className="pt-2 text-xs text-slate-600 border-t border-slate-100 space-y-1.5">
                          {treatment.benefits.map((b, idx) => (
                            <div key={idx} className="flex items-start gap-1.5 text-[11px]">
                              <Check className="w-3 h-3 text-teal-600 shrink-0 mt-0.5" />
                              <span>{b}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 mt-3 border-t border-slate-100">
                    <button
                      onClick={() => handleConsultWa(treatment.name)}
                      className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-teal-50 text-slate-800 hover:text-teal-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-teal-600" />
                      <span>Tanya via WhatsApp</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. KALKULATOR ESTIMASI BIAYA & SIMULASI CICILAN */}
      <section id="kalkulator" className="py-14 sm:py-18 bg-slate-50 border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="text-center sm:text-left space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 uppercase">
                <Calculator className="w-3.5 h-3.5" />
                Simulasi Biaya &amp; Cicilan
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Hitung Perkiraan Biaya Perawatan Anda
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Pilih tindakan yang Anda rencanakan untuk melihat gambaran biaya dan simulasi cicilan bulanan.
              </p>
            </div>

            {/* Pilihan Layanan */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase">
                Pilih Layanan:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {dentalTreatments.map((t) => {
                  const isSelected = selectedTreatments.includes(t.id);
                  return (
                    <div
                      key={t.id}
                      onClick={() => toggleTreatmentSelection(t.id)}
                      className={`p-3 rounded-xl cursor-pointer border text-xs flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-teal-50 border-teal-500 text-teal-900 font-semibold'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-teal-600 border-teal-600 text-white' : 'border-slate-300'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="truncate">{t.name}</span>
                      </div>
                      <span className="text-[11px] font-bold text-slate-700 shrink-0 ml-2">
                        {formatRupiah(t.priceStart)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pilihan Tenor */}
            <div className="space-y-2 pt-1">
              <label className="block text-xs font-bold text-slate-700 uppercase">
                Pilihan Tenor Cicilan:
              </label>
              <div className="flex items-center gap-2">
                {[3, 6, 12].map((months) => (
                  <button
                    key={months}
                    onClick={() => setInstallmentMonths(months)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                      installmentMonths === months
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {months} Bulan
                  </button>
                ))}
              </div>
            </div>

            {/* Hasil Perhitungan Sederhana */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <div className="text-xs text-slate-500">Total Perkiraan Biaya ({selectedTreatments.length} Layanan):</div>
                <div className="text-2xl font-extrabold text-slate-900">{formatRupiah(calculatedTotal)}</div>
                <div className="text-xs text-teal-700 font-semibold mt-0.5">
                  Simulasi Cicilan: ~{formatRupiah(monthlyInstallment)} / bulan ({installmentMonths}x)
                </div>
              </div>

              <button
                onClick={handleSendSimulationWa}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm transition-all shrink-0"
              >
                <Send className="w-4 h-4" />
                <span>Konsultasikan Rincian Ini via WA</span>
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 7. JADWAL DOKTER SPESIALIS */}
      <section id="dokter" className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-teal-700 tracking-wider uppercase">
              Tenaga Medis
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Jadwal Praktek Dokter Gigi
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Silakan pilih dokter spesialis sesuai kebutuhan keluhan gigi Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {dentalDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 text-xl flex items-center justify-center shrink-0">
                      {doc.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm leading-snug">
                        {doc.name}
                      </h3>
                      <span className="text-[11px] font-medium text-teal-700 block">
                        {doc.specialist}
                      </span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500">
                    Pengalaman: {doc.experience}
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                    <div className="font-semibold text-slate-700 text-[11px] uppercase flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-teal-600" /> Hari &amp; Jam Praktek:
                    </div>
                    {doc.schedule.map((s, idx) => (
                      <div key={idx}>
                        <div className="font-medium text-slate-800">{s.days}</div>
                        <div className="text-[11px] text-slate-500">{s.hours}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100">
                  <a
                    href="#janji-temu"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        selectedDoctor: doc.name
                      }));
                    }}
                    className="w-full flex items-center justify-center gap-1 py-2 px-3 rounded-lg bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-700 font-semibold text-xs transition-colors"
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

      {/* 8. FORMULIR JANJI TEMU (SEDERHANA & TO THE POINT) */}
      <section id="janji-temu" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                Reservasi Jadwal
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Buat Janji Temu Dokter Gigi
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Isi form singkat ini untuk booking jadwal. Pesan akan otomatis disiapkan untuk dikirim ke WhatsApp admin klinik.
              </p>
            </div>

            <form onSubmit={handleAppointmentSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  Nama Pasien *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="Nama lengkap pasien"
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-teal-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  Nomor WhatsApp *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="tel"
                    required
                    placeholder="0812-xxxx-xxxx"
                    value={formData.patientPhone}
                    onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-teal-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    Pilihan Tindakan
                  </label>
                  <select
                    value={formData.selectedService}
                    onChange={(e) => setFormData({ ...formData, selectedService: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm bg-white"
                  >
                    {dentalTreatments.map((t) => (
                      <option key={t.id} value={t.name}>
                        {t.name}
                      </option>
                    ))}
                    <option value="Konsultasi Periksa Rutin">Konsultasi / Periksa Rutin</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    Pilihan Dokter
                  </label>
                  <select
                    value={formData.selectedDoctor}
                    onChange={(e) => setFormData({ ...formData, selectedDoctor: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm bg-white"
                  >
                    {dentalDoctors.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name} ({d.specialist})
                      </option>
                    ))}
                    <option value="Dokter yang Tersedia / Standby">Dokter yang Tersedia / Standby</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    Rencana Tanggal
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    Waktu / Shift
                  </label>
                  <select
                    value={formData.preferredShift}
                    onChange={(e) => setFormData({ ...formData, preferredShift: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm bg-white"
                  >
                    <option value="Pagi (09.00 - 13.00)">Pagi (09.00 - 13.00 WIB)</option>
                    <option value="Sore (14.00 - 17.30)">Sore (14.00 - 17.30 WIB)</option>
                    <option value="Malam (18.30 - 21.00)">Malam (18.30 - 21.00 WIB)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  Keluhan Singkat (Opsional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Contoh: Gigi belakang berdenyut saat minum dingin..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Kirim Janji Temu ke WhatsApp</span>
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* 9. TESTIMONI PASIEN (NATURAL & RINGKAS) */}
      <section id="testimoni" className="py-14 sm:py-18 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-1">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
              Ulasan Pasien
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Pengalaman Pasien di {brandName}
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              Ulasan nyata dari warga Surabaya yang telah melakukan perawatan gigi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dentalTestimonials.map((t, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    &ldquo;{t.comment}&rdquo;
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-200/60 text-xs">
                  <div className="font-bold text-slate-800">{t.patient}</div>
                  <div className="text-[11px] text-teal-700">{t.treatment}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. FAQ PERTANYAAN UMUM */}
      <section id="faq" className="py-14 sm:py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-8 space-y-1">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Pertanyaan yang Sering Ditanyakan
            </h2>
          </div>

          <div className="space-y-2.5">
            {dentalFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-800 text-xs sm:text-sm hover:bg-slate-50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-teal-600 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 11. ALAMAT & KONTAK LOKASI */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center md:text-left">
              <div className="text-xs font-bold text-teal-700 uppercase flex items-center justify-center md:justify-start gap-1">
                <MapPin className="w-3.5 h-3.5" /> Lokasi Klinik
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                Kunjungi {brandName} di Surabaya
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                {defaultDentalConfig.address} • {defaultDentalConfig.operatingHours}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => handleConsultWa()}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm transition-all shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Admin WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 12. FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-10 text-xs border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <strong className="text-white block font-bold text-sm mb-0.5">{brandName}</strong>
            <span className="text-slate-500 text-[11px]">Klinik Dokter Gigi Surabaya</span>
          </div>

          <div className="text-[11px] text-slate-400">
            Interactive Web Demo by{' '}
            <Link href="/" className="underline text-teal-400 hover:text-white">
              NARA Digital Studio Surabaya
            </Link>
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
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-center space-y-2">
            <div className="w-8 h-8 rounded-full border-2 border-teal-600 border-t-transparent animate-spin mx-auto" />
            <div className="text-xs text-slate-500 font-medium">Memuat Demo Klinik...</div>
          </div>
        </div>
      }
    >
      <DentalClinicContent />
    </Suspense>
  );
}
