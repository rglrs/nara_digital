'use client';

import React from 'react';
import { ArrowRight, Layers, CheckCircle2, Server, Smartphone, ExternalLink } from 'lucide-react';
import { studioConfig } from '@/data/studioConfig';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
      aria-label="Pengenalan NARA Studio"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-6 space-y-6 reveal">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold tracking-wider text-[var(--accent)] bg-[var(--accent-subtle)] border border-[var(--accent-border)] uppercase">
              <Layers className="w-3.5 h-3.5" />
              <span>{studioConfig.eyebrow}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.12]">
              Solusi digital,{' '}
              <span className="text-[var(--accent)]">dibangun untuk bisnis Anda.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-[var(--text-secondary)] leading-relaxed max-w-xl">
              {studioConfig.subheadline}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#contact"
                className="btn-interactive inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg text-base font-semibold bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-95 shadow-sm group"
              >
                <span>Mulai Project</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </a>

              <a
                href="#projects"
                className="btn-interactive inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-base font-semibold bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface-elevated)]"
              >
                <span>Lihat Project</span>
              </a>
            </div>

            {/* Supporting sentence under CTA */}
            <p className="text-xs text-[var(--text-muted)] pt-1">
              Belum tahu solusi yang dibutuhkan? Ceritakan saja masalahnya.
            </p>

            {/* Reassurance notes */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[var(--text-muted)] font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Tanpa template generik</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Server className="w-4 h-4 text-[var(--accent)]" />
                <span>Arsitektur skalabel</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Web & Mobile kustom</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Dashboard Mockup */}
          <div className="lg:col-span-6 relative reveal reveal-delay-100">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Primary Dashboard Frame */}
              <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
                {/* Browser/Window Header */}
                <div className="px-4 py-3 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700 inline-block" />
                  </div>
                  <div className="px-3 py-1 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-muted)] flex items-center gap-1.5">
                    <span>app.nara-studio.dev/ops</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                  </div>
                  <div className="text-[11px] font-medium text-[var(--text-muted)]">v2.4</div>
                </div>

                {/* Dashboard Body Preview */}
                <div className="p-5 space-y-5">
                  {/* Top Stats Overview (Realistic Operational Metrics) */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    <div className="p-2.5 sm:p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] min-w-0">
                      <div className="text-[10px] sm:text-[11px] font-medium text-[var(--text-muted)] truncate">Pesanan Aktif</div>
                      <div className="text-base sm:text-xl font-bold text-[var(--text-primary)] mt-1 flex items-baseline gap-1">
                        <span>24</span>
                        <span className="text-[10px] sm:text-xs font-normal text-[var(--text-muted)]">Order</span>
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5 truncate">8 siap kirim</div>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] min-w-0">
                      <div className="text-[10px] sm:text-[11px] font-medium text-[var(--text-muted)] truncate">Produksi Hari Ini</div>
                      <div className="text-base sm:text-xl font-bold text-[var(--text-primary)] mt-1">94.2%</div>
                      <div className="text-[9px] sm:text-[10px] text-blue-600 dark:text-blue-400 mt-0.5 truncate">Sesuai jadwal</div>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] min-w-0">
                      <div className="text-[10px] sm:text-[11px] font-medium text-[var(--text-muted)] truncate">Antrean Verifikasi</div>
                      <div className="text-base sm:text-xl font-bold text-[var(--text-primary)] mt-1 flex items-baseline gap-1">
                        <span>3</span>
                        <span className="text-[10px] sm:text-xs font-normal text-[var(--text-muted)]">Order</span>
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-amber-600 dark:text-amber-400 mt-0.5 truncate">Menunggu review</div>
                    </div>
                  </div>

                  {/* Operational Data Table Preview */}
                  <div className="border border-[var(--border-subtle)] rounded-lg overflow-hidden">
                    <div className="px-3.5 py-2.5 bg-[var(--bg-surface-elevated)] border-b border-[var(--border-subtle)] flex items-center justify-between text-xs font-semibold text-[var(--text-primary)]">
                      <span>Alur Kerja Produksi Terkini</span>
                      <span className="text-[11px] font-normal text-[var(--text-muted)]">Pembaruan otomatis</span>
                    </div>
                    <div className="divide-y divide-[var(--border-subtle)] text-xs">
                      <div className="px-3.5 py-2.5 flex items-center justify-between bg-[var(--bg-surface)]">
                        <div>
                          <div className="font-medium text-[var(--text-primary)]">Katalog Offset Buku 1.000 Eks</div>
                          <div className="text-[11px] text-[var(--text-muted)]">Order #ORD-8419 &bull; CV Mitra Abadi</div>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          Sedang Dicetak
                        </span>
                      </div>
                      <div className="px-3.5 py-2.5 flex items-center justify-between bg-[var(--bg-surface)]">
                        <div>
                          <div className="font-medium text-[var(--text-primary)]">Kemasan Box Farmasi 5.000 Pcs</div>
                          <div className="text-[11px] text-[var(--text-muted)]">Order #ORD-8422 &bull; PT Medika Sehat</div>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                          Finishing & Cutting
                        </span>
                      </div>
                      <div className="px-3.5 py-2.5 flex items-center justify-between bg-[var(--bg-surface)]">
                        <div>
                          <div className="font-medium text-[var(--text-primary)]">Stiker Vinyl Tahan Air 2.500 Lembar</div>
                          <div className="text-[11px] text-[var(--text-muted)]">Order #ORD-8425 &bull; Kopi Nusantara</div>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                          Review Sampel
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* System Architecture Bar */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs">
                    <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                      <span className="font-medium">Backend Service Terhubung</span>
                    </div>
                    <span className="text-[var(--text-muted)] font-mono text-[11px]">Latensi 28ms</span>
                  </div>
                </div>
              </div>

              {/* Floating Highlight Card: Pricing & Automation (Top Right Offset) */}
              <div className="hidden sm:block absolute -top-5 -right-5 p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-lg max-w-[210px] animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-[var(--accent-subtle)] text-[var(--accent)] flex items-center justify-center font-bold text-xs">
                    Rp
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-[var(--text-primary)]">Kalkulasi Otomatis</div>
                    <div className="text-[10px] text-[var(--text-muted)]">Estimasi presisi & instan</div>
                  </div>
                </div>
              </div>

              {/* Floating Highlight Card: Security & Roles (Bottom Left Offset) */}
              <div className="hidden sm:block absolute -bottom-5 -left-5 p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-lg max-w-[220px] animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-[var(--text-primary)]">Role-Based Access</div>
                    <div className="text-[10px] text-[var(--text-muted)]">Hak akses bertingkat aman</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
