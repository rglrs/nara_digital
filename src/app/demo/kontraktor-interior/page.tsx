'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Image from 'next/image';
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
  FileText,
  Home,
  Compass,
  HardHat,
  Layers,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';

function formatRupiah(num: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(num);
}

// Data Proyek Kontraktor
const contractorProjects = [
  {
    title: 'Pembangunan Rumah 2 Lantai Modern Minimalis',
    category: 'Bangun Baru',
    location: 'Perumahan Kahuripan Nirwana, Sidoarjo',
    specs: 'Luas Bangunan 180 m² | 4 Kamar Tidur | Struktur Beton Bertulang SNI',
    image: '/images/demo/interior-living.jpg',
    duration: '5.5 Bulan Pengerjaan',
    desc: 'Pekerjaan dari nol mulai dari galian fondasi bored pile, struktur tahan gempa, dinding bata ringan, hingga finishing lantai granit 60x60 dan sanitair TOTO.'
  },
  {
    title: 'Renovasi Total & Tambah Lantai 2 Rumah Tinggal',
    category: 'Renovasi',
    location: 'Puri Surya Jaya, Gedangan, Sidoarjo',
    specs: 'Luas Tambahan 110 m² | Dak Beton Bondek | Rangka Atap Baja Ringan',
    image: '/images/demo/interior-kitchen.jpg',
    duration: '3 Bulan Pengerjaan',
    desc: 'Penguatan struktur fondasi cakar ayam bawah, pengecoran dak lantai dua dengan ready mix K-250, penambahan 2 kamar anak, ruang keluarga, dan void sirkulasi udara.'
  },
  {
    title: 'Interior Kitchen Set & Backdrop TV Residensial',
    category: 'Interior & Custom',
    location: 'CitraGarden Sidoarjo',
    specs: 'Multiplek Meranti 18mm | HPL Taco Doff | Table Top Granit Nero',
    image: '/images/demo/interior-bedroom.jpg',
    duration: '20 Hari Kerja',
    desc: 'Fabrikasi custom furniture presisi tinggi di workshop sendiri dengan engsel hidrolik slow-motion dan pencahayaan LED warm white.'
  }
];

function ContractorShowcaseContent() {
  const searchParams = useSearchParams();
  const brandParam = searchParams.get('brand');

  // Dynamic Brand Name (Default: CKP Kontraktor Sidoarjo)
  const brandName = useMemo(() => {
    if (!brandParam) return 'CKP Kontraktor Sidoarjo';
    const clean = brandParam.trim();
    if (clean.toLowerCase().includes('kontraktor') || clean.toLowerCase().includes('bangun')) {
      return clean;
    }
    return `${clean} Kontraktor`;
  }, [brandParam]);

  // Estimator Mode: 'bangun' | 'renovasi' | 'interior'
  const [estimateMode, setEstimateMode] = useState<'bangun' | 'renovasi' | 'interior'>('bangun');
  const [luasBangunan, setLuasBangunan] = useState<number>(120);
  const [kualitasMaterial, setKualitasMaterial] = useState<'standar' | 'medium' | 'premium'>('medium');
  const [jumlahLantai, setJumlahLantai] = useState<number>(2);

  // Estimasi Biaya Bangun / Renovasi
  const calculationResult = useMemo(() => {
    if (estimateMode === 'bangun') {
      let hargaPerM2 = 3800000; // Standar
      if (kualitasMaterial === 'medium') hargaPerM2 = 4600000;
      if (kualitasMaterial === 'premium') hargaPerM2 = 5800000;

      // Lantai 2 menambah sedikit biaya struktur per m2
      const faktorLantai = jumlahLantai === 2 ? 1.05 : 1.0;
      const total = Math.round(luasBangunan * hargaPerM2 * faktorLantai);

      return {
        hargaPerM2: Math.round(hargaPerM2 * faktorLantai),
        totalMin: Math.round(total * 0.95),
        totalMax: Math.round(total * 1.08),
        unitLabel: 'per m² luas lantai'
      };
    }

    if (estimateMode === 'renovasi') {
      let hargaPerM2 = 2400000;
      if (kualitasMaterial === 'medium') hargaPerM2 = 3200000;
      if (kualitasMaterial === 'premium') hargaPerM2 = 4200000;

      const total = luasBangunan * hargaPerM2;
      return {
        hargaPerM2,
        totalMin: Math.round(total * 0.9),
        totalMax: Math.round(total * 1.15),
        unitLabel: 'per m² area renovasi'
      };
    }

    // Interior / Kitchen
    const panjangMeterLari = Math.max(3, Math.round(luasBangunan / 15));
    let hargaPerMeter = 2400000;
    if (kualitasMaterial === 'medium') hargaPerMeter = 2900000;
    if (kualitasMaterial === 'premium') hargaPerMeter = 3800000;

    const total = panjangMeterLari * hargaPerMeter;
    return {
      hargaPerM2: hargaPerMeter,
      totalMin: Math.round(total * 0.95),
      totalMax: Math.round(total * 1.1),
      unitLabel: 'per meter lari'
    };
  }, [estimateMode, luasBangunan, kualitasMaterial, jumlahLantai]);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    serviceType: 'Pembangunan Rumah Baru dari Nol',
    estimatedBudget: 'Rp 200 Juta - Rp 500 Juta',
    notes: ''
  });

  // Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // WA Handlers
  const handleConsultWa = (topic?: string) => {
    const text = topic
      ? `Halo ${brandName}, saya ingin konsultasi mengenai *${topic}*. Apakah bisa dijadwalkan survey lokasi awal?`
      : `Halo ${brandName}, saya berencana bangun / renovasi rumah di Sidoarjo atau sekitarnya. Boleh konsultasi teknis dan perkiraan RAB-nya?`;
    window.open(`https://wa.me/6285602743489?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleSendRabToWa = () => {
    const modeLabel = estimateMode === 'bangun' ? `Bangun Rumah Baru (${jumlahLantai} Lantai)` :
      estimateMode === 'renovasi' ? 'Renovasi Rumah' : 'Interior & Kitchen Set';
    const gradeLabel = kualitasMaterial === 'standar' ? 'Standar SNI' :
      kualitasMaterial === 'medium' ? 'Medium Berkualitas (Rekomendasi)' : 'Premium Mewah';

    const text = `Halo ${brandName}, saya telah mencoba simulasi hitung biaya di website Anda:\n\n` +
      `🏗️ *Rencana Proyek:* ${modeLabel}\n` +
      `📐 *Perkiraan Luas Bangunan:* ${luasBangunan} m²\n` +
      `⭐ *Spesifikasi Bahan:* ${gradeLabel}\n` +
      `💰 *Estimasi Anggaran (RAB):* ${formatRupiah(calculationResult.totalMin)} s/d ${formatRupiah(calculationResult.totalMax)}\n\n` +
      `Bisa dibantu jadwalkan survey lokasi untuk pengukuran riil dan pembuatan gambar kerjanya? Terima kasih.`;

    window.open(`https://wa.me/6285602743489?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.location) return;

    const text = `Halo ${brandName}, saya ingin jadwalkan survey lokasi gratis & konsultasi bangun rumah:\n\n` +
      `👤 *Nama:* ${formData.name}\n` +
      `📱 *No. WhatsApp:* ${formData.phone}\n` +
      `📍 *Lokasi Tanah/Rumah:* ${formData.location}\n` +
      `🏗️ *Jenis Pekerjaan:* ${formData.serviceType}\n` +
      `💵 *Alokasi Anggaran:* ${formData.estimatedBudget}\n` +
      (formData.notes ? `📝 *Catatan Tambahan:* ${formData.notes}\n\n` : '\n') +
      `Mohon info ketersediaan jadwal tim arsitek untuk survey. Terima kasih!`;

    window.open(`https://wa.me/6285602743489?text=${encodeURIComponent(text)}`, '_blank');
  };

  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#F4F6FB] text-[#0F172A] font-sans antialiased selection:bg-[#1E3FE0] selection:text-white">
      
      {/* 1. TOP LIVE PREVIEW DEMO BAR */}
      <div className="bg-[#081235] text-slate-300 px-4 py-2 text-xs border-b border-blue-950">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F5C518] animate-pulse shrink-0" />
            <span className="text-[11px] sm:text-xs">
              Konsep Live Preview Resmi untuk <strong className="text-white">{brandName}</strong> oleh <strong>NARA Dev Studio</strong>
            </span>
          </div>
          <a
            href={`https://wa.me/6285602743489?text=Halo%20NARA%20Dev,%20saya%20tertarik%20konsultasi%20website%20arsitektur%20untuk%20${encodeURIComponent(brandName)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F5C518] hover:text-white font-semibold text-[11px] underline underline-offset-2 transition-colors"
          >
            Konsultasi Website Resmi Kontraktor &rarr;
          </a>
        </div>
      </div>

      {/* 2. MAIN NAVBAR (ARCHITECTURAL CLEAN BLUEPRINT STYLE) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-11 h-11 rounded-xl bg-[#0B1A4A] text-white flex items-center justify-center font-bold text-xl shadow-md border border-blue-900 shrink-0">
              <Compass className="w-6 h-6 text-[#2FB6EF]" />
            </div>
            <div className="min-w-0">
              <span className="font-extrabold text-base sm:text-lg text-[#0B1A4A] tracking-tight block leading-tight truncate">
                {brandName}
              </span>
              <span className="text-[11px] text-slate-500 font-medium tracking-wide flex items-center gap-1 whitespace-nowrap">
                <MapPin className="w-3 h-3 text-[#1E3FE0] shrink-0" />
                Jasa Bangun, Renovasi & Arsitek Sidoarjo
              </span>
            </div>
          </div>

          {/* Desktop Nav - Clean, Uncrowded, Zero Wrapping */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-slate-700">
            <a 
              href="#keunggulan" 
              className="whitespace-nowrap hover:text-[#1E3FE0] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#1E3FE0] hover:after:w-full after:transition-all after:duration-200"
            >
              Kenapa Kami
            </a>
            <a 
              href="#layanan" 
              className="whitespace-nowrap hover:text-[#1E3FE0] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#1E3FE0] hover:after:w-full after:transition-all after:duration-200"
            >
              Layanan
            </a>
            <a 
              href="#kalkulator" 
              className="whitespace-nowrap text-[#1E3FE0] hover:text-[#0B1A4A] font-semibold flex items-center gap-1.5 py-1 transition-colors"
            >
              <Calculator className="w-4 h-4 text-[#1E3FE0]" />
              Kalkulator RAB
            </a>
            <a 
              href="#proses" 
              className="whitespace-nowrap hover:text-[#1E3FE0] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#1E3FE0] hover:after:w-full after:transition-all after:duration-200"
            >
              Alur Kerja
            </a>
            <a 
              href="#proyek" 
              className="whitespace-nowrap hover:text-[#1E3FE0] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#1E3FE0] hover:after:w-full after:transition-all after:duration-200"
            >
              Portofolio
            </a>
            <a 
              href="#testimoni" 
              className="whitespace-nowrap hover:text-[#1E3FE0] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#1E3FE0] hover:after:w-full after:transition-all after:duration-200"
            >
              Testimoni
            </a>
          </nav>

          {/* Consultation CTA Button & Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleConsultWa()}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0B1A4A] hover:bg-[#1E3FE0] text-white font-bold text-xs uppercase tracking-wider transition-colors duration-200 cursor-pointer shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-[#2FB6EF]" />
              <span>Konsultasi Gratis</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-[#1E3FE0] hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
            <a
              href="#keunggulan"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-700 hover:text-[#1E3FE0] border-b border-slate-100"
            >
              Kenapa Kami
            </a>
            <a
              href="#layanan"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-700 hover:text-[#1E3FE0] border-b border-slate-100"
            >
              Layanan
            </a>
            <a
              href="#kalkulator"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-[#1E3FE0] border-b border-slate-100 flex items-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              Kalkulator Biaya (RAB)
            </a>
            <a
              href="#proses"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-700 hover:text-[#1E3FE0] border-b border-slate-100"
            >
              Alur Kerja
            </a>
            <a
              href="#proyek"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-700 hover:text-[#1E3FE0] border-b border-slate-100"
            >
              Portofolio Proyek
            </a>
            <a
              href="#testimoni"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-700 hover:text-[#1E3FE0] border-b border-slate-100"
            >
              Testimoni Klien
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleConsultWa();
              }}
              className="w-full mt-2 py-3 rounded-full bg-[#0B1A4A] hover:bg-[#1E3FE0] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#2FB6EF]" />
              <span>Konsultasi Gratis via WhatsApp</span>
            </button>
          </div>
        )}
      </header>

      {/* 3. HERO SECTION (DEEP BLUEPRINT TECHNICAL CAD STYLE) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0B1A4A] via-[#0E2160] to-[#081235] text-white py-16 lg:py-24 border-b border-blue-950">
        
        {/* Architectural CAD Blueprint Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, #2FB6EF 1px, transparent 1px),
              linear-gradient(to bottom, #2FB6EF 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Editorial Headline & Value Prop */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/50 border border-blue-700/60 text-[#2FB6EF] text-xs font-semibold tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5C518]" />
                <span className="uppercase tracking-wider text-[11px] font-bold">— {brandName.toUpperCase()}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.18]">
                Membangun rumah <span className="text-[#F5C518] italic font-serif">tuntas & berkualitas</span>, dari fondasi sampai serah terima kunci.
              </h1>

              <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {brandName} menangani pembangunan rumah baru, renovasi total, dan pengerjaan sesuai gambar kerja teknis. Dikerjakan langsung oleh tim arsitek dan tukang berpengalaman dengan progres mingguan transparan yang bisa Anda pantau setiap tahap.
              </p>

              {/* 4 Trust Checkmarks */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-left text-xs sm:text-sm text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2FB6EF] shrink-0" />
                  <span>Struktur Beton SNI Tahan Gempa</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2FB6EF] shrink-0" />
                  <span>RAB Transparan Tanpa Biaya Siluman</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2FB6EF] shrink-0" />
                  <span>Laporan Progres Foto & Video Tiap Minggu</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2FB6EF] shrink-0" />
                  <span>Garansi Resmi Pemeliharaan Konstruksi</span>
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <a
                  href="#kalkulator"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#1E3FE0] hover:bg-[#142EB5] text-white font-bold text-sm tracking-wide transition-colors duration-200 shadow-xl shadow-blue-950/50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calculator className="w-4 h-4" />
                  Hitung Estimasi Biaya (RAB)
                </a>
                <button
                  onClick={() => handleConsultWa()}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm tracking-wide transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  Jadwalkan Survey Lokasi Gratis
                </button>
              </div>
            </div>

            {/* Right Column: Architectural Blueprint CAD Illustration */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden bg-[#07102C] border-2 border-blue-500/30 p-6 shadow-2xl">
                
                {/* Technical CAD Drawing Header */}
                <div className="flex items-center justify-between border-b border-blue-800/60 pb-3 mb-4 text-xs font-mono text-[#2FB6EF]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F5C518]" />
                    <span>DED-DWG_REV04.CAD</span>
                  </div>
                  <span>SCALE 1:100</span>
                </div>

                {/* Blueprint House Wireframe Vector */}
                <div className="relative aspect-[4/3] w-full border border-blue-900/80 rounded-lg p-4 bg-[#0A163B] flex items-center justify-center overflow-hidden">
                  
                  {/* Technical Dimension lines */}
                  <div className="absolute top-2 left-6 right-6 flex items-center justify-between text-[10px] font-mono text-[#2FB6EF]/70 border-b border-dashed border-[#2FB6EF]/40 pb-1">
                    <span>|&lt;-- 3750 --&gt;|</span>
                    <span>|&lt;-- 5450 --&gt;|</span>
                  </div>
                  <div className="absolute left-2 top-8 bottom-8 flex flex-col justify-between text-[9px] font-mono text-[#2FB6EF]/70 border-r border-dashed border-[#2FB6EF]/40 pr-1">
                    <span>3950</span>
                    <span>3750</span>
                    <span>1500</span>
                  </div>

                  {/* SVG Blueprint Vector */}
                  <svg viewBox="0 0 400 300" className="w-full h-full stroke-[#2FB6EF] fill-none stroke-[1.5] opacity-90">
                    {/* Ground line */}
                    <line x1="20" y1="260" x2="380" y2="260" stroke="#F5C518" strokeWidth="2" />
                    {/* Foundation */}
                    <rect x="40" y="250" width="320" height="10" strokeDasharray="4 2" />
                    {/* First Floor */}
                    <rect x="50" y="160" width="300" height="90" />
                    {/* Door */}
                    <rect x="180" y="180" width="45" height="70" />
                    <circle cx="218" cy="215" r="2" fill="#2FB6EF" />
                    {/* Windows Floor 1 */}
                    <rect x="75" y="180" width="60" height="50" />
                    <line x1="105" y1="180" x2="105" y2="230" />
                    <rect x="265" y="180" width="65" height="50" />
                    <line x1="297" y1="180" x2="297" y2="230" />
                    {/* Second Floor */}
                    <rect x="65" y="70" width="270" height="90" />
                    {/* Balcony Railing */}
                    <rect x="65" y="125" width="110" height="35" strokeDasharray="3 3" />
                    <line x1="65" y1="140" x2="175" y2="140" />
                    {/* Second Floor Windows */}
                    <rect x="90" y="85" width="60" height="40" />
                    <rect x="210" y="85" width="95" height="55" />
                    <line x1="257" y1="85" x2="257" y2="140" />
                    {/* Modern Gable Roof */}
                    <polygon points="50,70 200,20 350,70" stroke="#F5C518" strokeWidth="2" />
                    {/* Architectural dimension annotations */}
                    <text x="145" y="45" fill="#F5C518" fontSize="10" fontFamily="monospace">ROOF EL. +9.200</text>
                    <text x="215" y="105" fill="#2FB6EF" fontSize="9" fontFamily="monospace">FL 2 EL. +3.750</text>
                    <text x="235" y="205" fill="#2FB6EF" fontSize="9" fontFamily="monospace">FL 1 EL. +0.000</text>
                  </svg>

                  {/* Corner Badge */}
                  <div className="absolute bottom-3 right-3 bg-[#0B1A4A]/90 border border-blue-500/40 px-3 py-1.5 rounded text-[11px] text-white font-mono">
                    <span className="text-[#F5C518] font-bold">STATUS:</span> ACC GAMBAR KERJA
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#2FB6EF]" />
                    Lengkap Gambar 2D & 3D Render
                  </span>
                  <span className="text-[#F5C518] font-semibold">Tepat Waktu & Presisi</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. STANDAR KUALITAS (DIKERJAKAN DENGAN STANDAR YANG BISA ANDA PERIKSA SENDIRI) */}
      <section id="keunggulan" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E3FE0] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Prinsip Profesionalisme
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1A4A] mt-3">
              Dikerjakan dengan standar yang bisa Anda periksa sendiri.
            </h2>
            <p className="text-slate-600 text-sm mt-3">
              Membangun rumah adalah keputusan finansial besar seumur hidup. Kami menghapus rasa was-was dicurangi dengan transparansi material dan alur kerja legal bergaransi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Pilar 1 */}
            <div className="p-8 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 hover:border-[#1E3FE0] transition-all hover:shadow-lg group">
              <div className="w-12 h-12 rounded-xl bg-[#0B1A4A] text-[#2FB6EF] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0B1A4A] mb-2.5">
                Material Terbuka Sesuai RAB
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Merek semen, besi beton bertulang bersertifikat SNI, bata merah/hebel, hingga kabel listrik berstandar PLN. Tidak ada penurunan spek sepihak di tengah jalan.
              </p>
            </div>

            {/* Pilar 2 */}
            <div className="p-8 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 hover:border-[#1E3FE0] transition-all hover:shadow-lg group">
              <div className="w-12 h-12 rounded-xl bg-[#0B1A4A] text-[#2FB6EF] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0B1A4A] mb-2.5">
                Laporan Progres Mingguan Terjadwal
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Anda tidak perlu setiap hari panas-panasan mengawasi proyek di lokasi. Tim kami mengirimkan dokumentasi foto dan video kurva S progres pengerjaan setiap minggu.
              </p>
            </div>

            {/* Pilar 3 */}
            <div className="p-8 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 hover:border-[#1E3FE0] transition-all hover:shadow-lg group">
              <div className="w-12 h-12 rounded-xl bg-[#0B1A4A] text-[#2FB6EF] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0B1A4A] mb-2.5">
                Garansi Retensi Pemeliharaan Resmi
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Setelah serah terima kunci, kami memberikan masa garansi pemeliharaan untuk memastikan tidak ada rembesan atap, retak rambut plesteran, atau kendala instalasi pipa.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE KALKULATOR ESTIMASI BIAYA BANGUN (RAB PER M2) */}
      <section id="kalkulator" className="py-20 bg-[#EDF2FA] border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E3FE0] bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
              Kalkulator Biaya Transparan
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1A4A] mt-3">
              Kalkulator Estimasi Biaya Bangun Rumah.
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Ketahui gambaran anggaran (RAB) sebelum memulai proyek. Hitung estimasi biaya bangun baru, renovasi, atau interior secara instan.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden p-6 sm:p-10">
            
            {/* Step 1: Mode Selection */}
            <div className="mb-8">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                1. Pilih Kategori Proyek Anda:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'bangun', label: 'Bangun Rumah Baru', sub: 'Dari Tanah Kavling Kosong' },
                  { id: 'renovasi', label: 'Renovasi / Tambah Lantai', sub: 'Perluasan & Ubah Layout' },
                  { id: 'interior', label: 'Interior & Kitchen Set', sub: 'Custom Furniture Multiplek' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setEstimateMode(item.id as any)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      estimateMode === item.id
                        ? 'border-[#1E3FE0] bg-blue-50/70 shadow-sm ring-2 ring-[#1E3FE0]/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <span className={`block font-bold text-sm ${estimateMode === item.id ? 'text-[#1E3FE0]' : 'text-slate-900'}`}>
                      {item.label}
                    </span>
                    <span className="text-xs text-slate-500 mt-0.5 block">{item.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Slider Luas Bangunan */}
            <div className="mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Ruler className="w-4 h-4 text-[#1E3FE0]" />
                  2. {estimateMode === 'interior' ? 'Perkiraan Panjang Ruang / Dapur:' : 'Perkiraan Luas Bangunan:'}
                </label>
                <span className="font-extrabold text-xl sm:text-2xl text-[#0B1A4A]">
                  {estimateMode === 'interior' ? `${Math.max(3, Math.round(luasBangunan / 15))} Meter Lari` : `${luasBangunan} m²`}
                </span>
              </div>
              <input
                type="range"
                min="45"
                max="400"
                step="5"
                value={luasBangunan}
                onChange={(e) => setLuasBangunan(parseInt(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3FE0]"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-2 font-mono">
                <span>45 m² (Tipe 36/45)</span>
                <span>120 m² (Rumah 2 Lantai Standar)</span>
                <span>400 m² (Hunian Mewah)</span>
              </div>
            </div>

            {/* Step 3: Material Grade & Lantai */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  3. Pilihan Standar Spesifikasi Material:
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'standar', label: 'Spesifikasi Standar SNI', desc: 'Bata hebel, granit 60x60, sanitair standar, genteng beton' },
                    { id: 'medium', label: 'Spesifikasi Medium (Paling Favorit)', desc: 'Bata merah/hebel, granit glazed polish, sanitair TOTO/American Standard' },
                    { id: 'premium', label: 'Spesifikasi Premium Mewah', desc: 'Lantai marmer/granit slab besar, sanitair Kohler/Grohe, pintu kayu solid' }
                  ].map((grade) => (
                    <label
                      key={grade.id}
                      onClick={() => setKualitasMaterial(grade.id as any)}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        kualitasMaterial === grade.id
                          ? 'border-[#1E3FE0] bg-blue-50/50 ring-1 ring-[#1E3FE0]'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="grade"
                        checked={kualitasMaterial === grade.id}
                        onChange={() => setKualitasMaterial(grade.id as any)}
                        className="mt-1 text-[#1E3FE0] focus:ring-[#1E3FE0]"
                      />
                      <div>
                        <span className="block text-xs font-bold text-slate-900">{grade.label}</span>
                        <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">{grade.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Jumlah Lantai (Jika Bangun Baru) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  4. Rencana Jumlah Lantai:
                </label>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { lantai: 1, label: '1 Lantai', sub: 'Fondasi Tapak / Cakar Ayam' },
                    { lantai: 2, label: '2 Lantai', sub: 'Dak Bondek & Beton K-250' }
                  ].map((l) => (
                    <button
                      key={l.lantai}
                      type="button"
                      onClick={() => setJumlahLantai(l.lantai)}
                      className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                        jumlahLantai === l.lantai
                          ? 'border-[#1E3FE0] bg-blue-50/60 ring-1 ring-[#1E3FE0]'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span className="block font-bold text-sm text-slate-900">{l.label}</span>
                      <span className="text-[10px] text-slate-500 leading-tight block">{l.sub}</span>
                    </button>
                  ))}
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1.5">
                  <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wide">Sudah Termasuk:</span>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#1E3FE0] shrink-0" />
                    <span>Gambar Kerja Arsitektur & Perhitungan Struktur</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#1E3FE0] shrink-0" />
                    <span>Upah Tenaga Kerja Tukang & Pengawas Lapangan</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#1E3FE0] shrink-0" />
                    <span>Garansi Pemeliharaan Resmi Pasca Serah Terima</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Result Box (Technical Blueprint Deep Blue Card) */}
            <div className="rounded-2xl bg-gradient-to-r from-[#0B1A4A] to-[#0E2160] text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-blue-900">
              <div>
                <span className="text-xs uppercase font-bold text-[#F5C518] tracking-wider block mb-1">
                  Hasil Estimasi Kasar Anggaran Proyek (RAB):
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">
                  {formatRupiah(calculationResult.totalMin)} <span className="text-slate-400 text-lg font-normal">s/d</span> {formatRupiah(calculationResult.totalMax)}
                </div>
                <p className="text-xs text-slate-300 mt-2">
                  *Perkiraan Rp {formatRupiah(calculationResult.hargaPerM2)} {calculationResult.unitLabel}. Angka pasti akan disesuaikan saat survey lokasi resmi.
                </p>
              </div>

              <button
                onClick={handleSendRabToWa}
                className="w-full md:w-auto px-7 py-4 rounded-full bg-[#1E3FE0] hover:bg-[#142EB5] text-white font-bold text-xs uppercase tracking-wider transition-colors duration-200 shadow-lg shadow-blue-950/40 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#2FB6EF]" />
                Konsultasikan RAB Ini ke WhatsApp
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 6. SATU MITRA UNTUK SELURUH PROSES MEMBANGUN RUMAH ANDA (SERVICES) */}
      <section id="layanan" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E3FE0] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Layanan Terintegrasi
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1A4A] mt-3">
            Satu mitra untuk seluruh proses membangun rumah Anda.
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Dari tanah kosong hingga siap ditempati, Anda tidak perlu repot mencari arsitek, pemborong, dan tukang interior secara terpisah.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Service 1: Bangun Baru */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1E3FE0] flex items-center justify-center mb-6">
                <Home className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1A4A] mb-2">
                Pembangunan Rumah Baru
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                Pengerjaan konstruksi dari nol sesuai gambar arsitektur. Mulai dari pondasi cakar ayam/strauss pile, sloof beton bertulang, dinding, atap baja ringan, hingga instalasi mekanikal & elektrikal.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#1E3FE0]" />
                  <span>Struktur Kokoh Tahan Gempa SNI</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#1E3FE0]" />
                  <span>Termasuk Gambar DED & IMB / PBG</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#1E3FE0]" />
                  <span>Garansi Konstruksi 1 Tahun</span>
                </li>
              </ul>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100">
              <button
                onClick={() => handleConsultWa('Pembangunan Rumah Baru')}
                className="w-full py-2.5 rounded-lg bg-slate-100 hover:bg-[#0B1A4A] hover:text-white text-[#0B1A4A] text-xs font-bold uppercase tracking-wider transition-all"
              >
                Tanya Spesifikasi &rarr;
              </button>
            </div>
          </div>

          {/* Service 2: Renovasi Rumah */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1E3FE0] flex items-center justify-center mb-6">
                <Hammer className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1A4A] mb-2">
                Renovasi Total & Tambah Lantai
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                Meningkat lantai 2 dengan sistem dak beton efisien, perbaikan struktur atap lapuk/bocor, ubah layout ruang keluarga, hingga peremajaan tampak fasad rumah agar modern kembali.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#1E3FE0]" />
                  <span>Pengecekan Kekuatan Fondasi Awal</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#1E3FE0]" />
                  <span>Pengerjaan Bersih Tanpa Merusak Rumah Tetangga</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#1E3FE0]" />
                  <span>Manajemen Waktu Presisi</span>
                </li>
              </ul>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100">
              <button
                onClick={() => handleConsultWa('Renovasi Total & Tambah Lantai')}
                className="w-full py-2.5 rounded-lg bg-slate-100 hover:bg-[#0B1A4A] hover:text-white text-[#0B1A4A] text-xs font-bold uppercase tracking-wider transition-all"
              >
                Konsultasi Renovasi &rarr;
              </button>
            </div>
          </div>

          {/* Service 3: Desain Arsitektur & Interior */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1E3FE0] flex items-center justify-center mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1A4A] mb-2">
                Desain Arsitektur & Interior
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                Visualisasi 3D fotorealistik denah interior dan eksterior sebelum dibangun. Dilengkapi pembuatan custom kitchen set, backdrop TV, dan wardrobe dari workshop pribadi.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#1E3FE0]" />
                  <span>3D Render Realistis Siap Eksekusi</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#1E3FE0]" />
                  <span>Fabrikasi Workshop Sendiri (Anti-Rayap)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#1E3FE0]" />
                  <span>Biaya Desain Gratis jika Lanjut Pembangunan</span>
                </li>
              </ul>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100">
              <button
                onClick={() => handleConsultWa('Desain Arsitektur & Interior')}
                className="w-full py-2.5 rounded-lg bg-slate-100 hover:bg-[#0B1A4A] hover:text-white text-[#0B1A4A] text-xs font-bold uppercase tracking-wider transition-all"
              >
                Lihat Paket Desain &rarr;
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 7. TAHAPAN PENGERJAAN TRANSPARAN (DARI SURVEY SAMPAI SERAH TERIMA) */}
      <section id="proses" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E3FE0] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Alur Kerja Rapi
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1A4A] mt-3">
              Tahapan kerja jelas, dari konsultasi sampai serah terima kunci.
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Proses kerja terstruktur tanpa biaya mendadak di tengah pembangunan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Survey Lokasi & Pengukuran', desc: 'Tim arsitek datang mengukur tanah kavling atau rumah eksisting dan mendiskusikan kebutuhan ruang Anda.' },
              { step: '02', title: 'Gambar 3D & Penyusunan RAB', desc: 'Kami buatkan visualisasi desain dan dokumen RAB terperinci yang mencantumkan spesifikasi setiap material.' },
              { step: '03', title: 'SPK & Pembayaran Bertahap', desc: 'Penandatanganan Surat Perjanjian Kerja berkekuatan hukum. Sistem pembayaran termin sesuai bobot fisik di lapangan.' },
              { step: '04', title: 'Serah Terima & Garansi', desc: 'Inspeksi checklist bersama klien saat rumah rampung, serah terima kunci, serta penerbitan sertifikat garansi resmi.' }
            ].map((p, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 relative">
                <span className="text-3xl font-extrabold text-[#1E3FE0]/30 font-mono block mb-3">
                  {p.step}
                </span>
                <h3 className="font-bold text-base text-[#0B1A4A] mb-2">{p.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. KATALOG PROYEK (PORTOFOLIO) */}
      <section id="proyek" className="py-20 bg-[#F4F6FB] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E3FE0] bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
              Bukti Realisasi Lapangan
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1A4A] mt-3">
              Katalog proyek yang sudah kami kerjakan.
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Kualitas pengerjaan nyata di berbagai kawasan residensial Sidoarjo & Surabaya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contractorProjects.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all group"
              >
                <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#0B1A4A]/90 backdrop-blur-sm text-[#F5C518] text-[10px] font-bold px-2.5 py-1 rounded-md">
                    {item.category}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] font-semibold px-2 py-0.5 rounded">
                    {item.duration}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-1 text-xs text-slate-500 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-[#1E3FE0]" />
                    <span>{item.location}</span>
                  </div>
                  <h3 className="font-bold text-base text-[#0B1A4A] mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed mb-4">
                    {item.desc}
                  </p>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-mono">
                      {item.specs.split('|')[0]}
                    </span>
                    <button
                      onClick={() => handleConsultWa(item.title)}
                      className="text-[#1E3FE0] hover:text-[#0B1A4A] text-xs font-bold flex items-center gap-1 transition-colors"
                    >
                      Bikin Seperti Ini &rarr;
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. TESTIMONIALS (KATA MEREKA YANG SUDAH SELESAI MEMBANGUN BERSAMA KAMI) */}
      <section id="testimoni" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E3FE0] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Ulasan Klien Nyata
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1A4A] mt-3">
              Kata mereka yang sudah selesai membangun bersama kami.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                client: 'Bapak Hendra Setiawan',
                scope: 'Bangun Rumah 2 Lantai Tipe 180',
                loc: 'Kahuripan Nirwana Sidoarjo',
                text: 'Sangat puas dengan kedisiplinan tim di lapangan. Laporan video tiap minggu sangat detail. Tidak ada drama tukang kabur atau biaya minta nambah di tengah jalan.'
              },
              {
                client: 'Ibu Rina Anggraini',
                scope: 'Renovasi Dak Lantai 2 & Fasad',
                loc: 'Puri Surya Jaya Sidoarjo',
                text: 'Renovasi rumah lama jadi kelihatan seperti rumah baru modern. Struktur dak betonnya rapi, musim hujan kemarin sama sekali tidak ada rembes.'
              },
              {
                client: 'drg. Dimas Prasetyo',
                scope: 'Rumah Tinggal & Interior Custom',
                loc: 'CitraGarden Sidoarjo',
                text: 'Paling menghargai transparansi RAB-nya. Semua merek pipa, semen, dan kabel listrik sama persis dengan yang tertulis di kontrak perjanjian kerja.'
              }
            ].map((t, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-[#F5C518] mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#F5C518]" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic mb-4">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200/80">
                  <span className="font-bold text-sm text-[#0B1A4A] block">{t.client}</span>
                  <span className="text-xs text-[#1E3FE0] font-medium block">{t.scope}</span>
                  <span className="text-[11px] text-slate-500">{t.loc}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. FORM PENDAFTARAN SURVEY LOKASI GRATIS */}
      <section id="kontak" className="py-20 bg-[#0B1A4A] text-white border-t border-blue-950 relative overflow-hidden">
        
        {/* Subtle grid in background */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(to right, #2FB6EF 1px, transparent 1px), linear-gradient(to bottom, #2FB6EF 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F5C518] bg-blue-900/60 px-3 py-1 rounded-full border border-blue-700">
              Layanan Survey Lapangan
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-3">
              Jadwalkan Survey Lokasi & Konsultasi Teknis Gratis
            </h2>
            <p className="text-slate-300 text-sm mt-2">
              Tim arsitek & estimator kami siap datang langsung ke lokasi tanah atau rumah Anda di Sidoarjo, Surabaya, dan sekitarnya tanpa dipungut biaya.
            </p>
          </div>

          <form
            onSubmit={handleFormSubmit}
            className="bg-white text-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Bapak Irwan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3FE0]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Nomor WhatsApp Aktif *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Contoh: 08123456789"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3FE0]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Lokasi Tanah / Rumah di Sidoarjo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Perumahan Puri Surya Jaya / Sedati"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3FE0]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Jenis Rencana Pekerjaan
                </label>
                <select
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3FE0]"
                >
                  <option value="Pembangunan Rumah Baru dari Nol">Pembangunan Rumah Baru dari Nol</option>
                  <option value="Renovasi Total & Tambah Lantai 2">Renovasi Total & Tambah Lantai 2</option>
                  <option value="Desain Arsitektur & Perhitungan RAB Saja">Desain Arsitektur & Perhitungan RAB Saja</option>
                  <option value="Interior Rumah & Kitchen Set Custom">Interior Rumah & Kitchen Set Custom</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Estimasi Alokasi Anggaran
              </label>
              <select
                value={formData.estimatedBudget}
                onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3FE0]"
              >
                <option value="Di bawah Rp 150 Juta (Renovasi Parsial)">Di bawah Rp 150 Juta (Renovasi Parsial)</option>
                <option value="Rp 150 Juta - Rp 350 Juta">Rp 150 Juta - Rp 350 Juta</option>
                <option value="Rp 350 Juta - Rp 700 Juta">Rp 350 Juta - Rp 700 Juta (Standar Rumah 2 Lantai)</option>
                <option value="Di atas Rp 700 Juta (Hunian Mewah)">Di atas Rp 700 Juta (Hunian Mewah)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Catatan Kebutuhan Ruang (Opsional)
              </label>
              <textarea
                rows={3}
                placeholder="Contoh: Rencana bangun 2 lantai dengan 4 kamar tidur, void sirkulasi udara, dan garasi 2 mobil..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3FE0]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-[#1E3FE0] hover:bg-[#142EB5] text-white font-extrabold text-sm uppercase tracking-wider transition-colors duration-200 shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <Send className="w-4 h-4 text-[#2FB6EF]" />
              Kirim & Jadwalkan Survey Gratis via WhatsApp
            </button>
          </form>

        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="bg-[#081235] text-slate-400 py-12 border-t border-blue-950 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <span className="font-bold text-lg text-white block mb-2">
                {brandName}
              </span>
              <p className="text-slate-400 leading-relaxed mb-3">
                Jasa Kontraktor Bangun Rumah, Renovasi Total, dan Desain Arsitektur Terpercaya di Sidoarjo & Jawa Timur.
              </p>
              <p className="text-slate-500">
                Wilayah Layanan: Sidoarjo, Surabaya, Gresik, Pasuruan, dan Mojokerto.
              </p>
            </div>

            <div>
              <span className="font-bold text-slate-200 block mb-2">Komitmen Kerja:</span>
              <p className="leading-relaxed text-slate-400">
                100% Mengacu pada Gambar Kerja Teknis (DED), Rincian Anggaran Biaya (RAB) Transparan, serta Garansi Retensi Konstruksi.
              </p>
              <span className="font-bold text-slate-200 block mt-3 mb-1">Jam Operasional:</span>
              <p className="text-slate-400">Senin - Sabtu: 08.00 - 17.00 WIB (Survey Lokasi Setiap Hari Sesuai Perjanjian)</p>
            </div>

            <div>
              <span className="font-bold text-slate-200 block mb-2">Pengembangan Digital:</span>
              <p className="leading-relaxed text-slate-400 mb-3">
                Website showcase arsitektur & kalkulator estimasi ini dikembangkan secara profesional oleh <strong>NARA Dev Studio</strong> untuk meningkatkan konversi klien residensial.
              </p>
              <a
                href={`https://wa.me/6285602743489?text=Halo%20NARA%20Dev,%20saya%20tertarik%20konsultasi%20website%20arsitektur%20untuk%20${encodeURIComponent(brandName)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F5C518] hover:text-white font-semibold transition-colors inline-flex items-center gap-1"
              >
                Konsultasi Pembuatan Website Serupa &rarr;
              </a>
            </div>
          </div>

          <div className="pt-8 border-t border-blue-950 text-center text-slate-500">
            &copy; {new Date().getFullYear()} {brandName}. Seluruh Hak Cipta Dilindungi.
          </div>
        </div>
      </footer>

      {/* 12. MOBILE STICKY BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0B1A4A]/95 backdrop-blur-md border-t border-blue-900 p-3 sm:hidden flex items-center justify-between gap-3 shadow-2xl">
        <div className="text-left pl-1">
          <span className="text-[10px] text-slate-400 uppercase tracking-wide block">Survey & Hitung RAB</span>
          <span className="text-xs font-bold text-[#F5C518]">100% Gratis</span>
        </div>
        <button
          onClick={() => handleConsultWa()}
          className="flex-1 py-2.5 px-4 rounded-full bg-[#1E3FE0] hover:bg-[#142EB5] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-colors duration-200 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 text-[#2FB6EF]" />
          Chat WhatsApp
        </button>
      </div>

    </div>
  );
}

export default function ContractorDemoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0B1A4A] flex items-center justify-center text-slate-200 font-medium">
        Memuat portofolio arsitektur...
      </div>
    }>
      <ContractorShowcaseContent />
    </Suspense>
  );
}
