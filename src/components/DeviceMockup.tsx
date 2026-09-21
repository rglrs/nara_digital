'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Project } from '@/types';
import { ExternalLink, Layers, CheckCircle2, Shield, Calendar, Users, BarChart3, Database } from 'lucide-react';

interface DeviceMockupProps {
  project: Project;
  className?: string;
  isDetailed?: boolean;
}

export default function DeviceMockup({ project, className = '', isDetailed = false }: DeviceMockupProps) {
  const [imageError, setImageError] = useState(false);
  const isMobile = project.type === 'mobile-app';

  // If user provided a real image and it hasn't errored, render it inside the device frame
  if (!imageError && project.image) {
    return (
      <div className={`relative rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] overflow-hidden shadow-xs ${className}`}>
        {/* Browser Top Bar */}
        <div className="px-3.5 py-2 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 inline-block" />
          </div>
          <div className="px-2.5 py-0.5 rounded bg-[var(--bg-surface-elevated)] text-[10px] font-mono text-[var(--text-muted)] truncate max-w-[200px]">
            app.nara-studio.dev/{project.slug}
          </div>
          <div className="w-4" />
        </div>

        {/* Image Display - Full visibility, never cropped */}
        <div className="relative w-full bg-[var(--bg-surface-elevated)] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={`Tangkapan Layar Proyek ${project.title}`}
            onError={() => setImageError(true)}
            className="w-full h-auto block object-contain transition-transform duration-300 group-hover:scale-[1.01]"
          />
        </div>
      </div>
    );
  }

  // Realistic Interactive UI Mockup Fallback (Crafted per project without stock images)
  if (isMobile) {
    // Smartphone device frame for TASCA
    return (
      <div className={`mx-auto max-w-[280px] rounded-[36px] border-4 border-slate-800 dark:border-slate-700 bg-slate-900 p-2.5 shadow-xl ${className}`}>
        {/* Phone Notch & Speaker */}
        <div className="relative rounded-[28px] bg-[var(--bg-surface)] overflow-hidden border border-slate-800/20">
          <div className="pt-2 pb-1 bg-[var(--bg-surface-elevated)] flex items-center justify-center">
            <div className="w-16 h-3 rounded-full bg-slate-800 dark:bg-slate-700" />
          </div>

          {/* TASCA Mobile Screen Content */}
          <div className="p-4 space-y-3.5 min-h-[360px] text-left">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--accent)]">TASCA Mobile</span>
                <div className="text-sm font-bold text-[var(--text-primary)]">Fokus & Produktivitas</div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                PROD
              </span>
            </div>

            {/* Pomodoro Timer Widget */}
            <div className="p-3.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-center">
              <div className="text-[10px] font-medium text-[var(--text-muted)]">Sesi Fokus Pomodoro</div>
              <div className="text-2xl font-mono font-extrabold text-[var(--text-primary)] my-1">25 : 00</div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Sesi 3 dari 4 &bull; Target Tercapai</div>
            </div>

            {/* Tasks List */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Tugas Hari Ini</div>
              <div className="p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center gap-2 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="line-through text-[var(--text-muted)] text-[11px] truncate">Sinkronisasi API Backend Go</span>
              </div>
              <div className="p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center gap-2 text-xs">
                <div className="w-3.5 h-3.5 rounded-full border-2 border-[var(--accent)] shrink-0" />
                <span className="text-[var(--text-primary)] font-medium text-[11px] truncate">Integrasi Push Notification Docker</span>
              </div>
              <div className="p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center gap-2 text-xs">
                <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-300 shrink-0" />
                <span className="text-[var(--text-secondary)] text-[11px] truncate">Review Kalender & Jadwal Kuliah</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Browser Mockup Frame for Web / Business Systems
  return (
    <div className={`rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md ${className}`}>
      {/* Browser Bar */}
      <div className="px-3.5 py-2.5 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 inline-block" />
        </div>
        <div className="px-3 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-muted)] flex items-center gap-1.5 truncate max-w-[220px]">
          <span>app.nara-studio.dev/{project.slug}</span>
        </div>
        <div className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
          {project.technologies[0]}
        </div>
      </div>

      {/* Mockup UI Body */}
      <div className="p-5 space-y-4 bg-[var(--bg-surface)] min-h-[260px] flex flex-col justify-between">
        {/* Top Header Simulation */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-[11px] font-semibold text-[var(--accent)] uppercase tracking-wider">
                {project.category}
              </div>
              <h4 className="text-base font-bold text-[var(--text-primary)]">
                {project.title}
              </h4>
            </div>
            <span className="px-2.5 py-1 rounded text-[11px] font-semibold bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">
              Sistem Aktif
            </span>
          </div>

          {/* Module-specific visual preview */}
          {project.id === 'vizada' && (
            <div className="space-y-2.5">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
                  <div className="text-[10px] text-[var(--text-muted)]">Estimasi Biaya Otomatis</div>
                  <div className="text-sm font-bold text-[var(--text-primary)] mt-0.5">Rp 4.850.000</div>
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400">Terkalkulasi instan</div>
                </div>
                <div className="p-2.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
                  <div className="text-[10px] text-[var(--text-muted)]">Status Produksi</div>
                  <div className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-0.5">Offset Printing</div>
                  <div className="text-[10px] text-[var(--text-muted)]">Pengerjaan 75%</div>
                </div>
              </div>
              <div className="p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs flex items-center justify-between">
                <span className="text-[var(--text-secondary)] font-medium text-[11px]">CRM Pelanggan Terpusat</span>
                <span className="text-[10px] font-mono text-[var(--text-muted)]">128 Klien Aktif</span>
              </div>
            </div>
          )}

          {project.id === 'shaman-os' && (
            <div className="space-y-2.5">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
                  <div className="text-[10px] text-[var(--text-muted)]">Payroll & Absensi</div>
                  <div className="text-sm font-bold text-[var(--text-primary)] mt-0.5">48 Karyawan</div>
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400">Presisi 100%</div>
                </div>
                <div className="p-2.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
                  <div className="text-[10px] text-[var(--text-muted)]">Keamanan Akses</div>
                  <div className="text-sm font-bold text-[var(--text-primary)] mt-0.5">Bcrypt Hash</div>
                  <div className="text-[10px] text-indigo-600 dark:text-indigo-400">Enkripsi terverifikasi</div>
                </div>
              </div>
              <div className="p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs flex items-center justify-between">
                <span className="text-[var(--text-secondary)] font-medium text-[11px]">Repositori Dokumen Terpusat</span>
                <span className="text-[10px] font-mono text-[var(--text-muted)]">NestJS + Prisma</span>
              </div>
            </div>
          )}

          {project.id === 'sibuk-ceria' && (
            <div className="space-y-2.5">
              <div className="p-3 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[var(--text-primary)]">Sesi Konseling Terjadwal</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">Daring</span>
                </div>
                <div className="text-[11px] text-[var(--text-muted)] mt-1">Chat & Video Call Terenkripsi &bull; Guru BK & Siswa</div>
              </div>
              <div className="p-2.5 rounded-lg border border-[var(--border-subtle)] text-xs flex items-center justify-between">
                <span className="text-[var(--text-secondary)] text-[11px]">Modul Asesmen Mandiri</span>
                <span className="text-[10px] text-emerald-600 font-medium">Aktif</span>
              </div>
            </div>
          )}

          {project.id === 'tahfizh-app' && (
            <div className="space-y-2.5">
              <div className="p-3 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[var(--text-primary)]">Progres Setoran Hafalan</span>
                  <span className="text-[10px] font-mono text-emerald-600">Juz 29 Selesai</span>
                </div>
                <div className="text-[11px] text-[var(--text-muted)] mt-1">Multi-Peran: Admin, Pengajar, & Orang Tua Siswa</div>
              </div>
              <div className="p-2.5 rounded-lg border border-[var(--border-subtle)] text-xs flex items-center justify-between">
                <span className="text-[var(--text-secondary)] text-[11px]">Riwayat Murojaah Terstruktur</span>
                <span className="text-[10px] font-mono text-[var(--text-muted)]">Next.js + Prisma</span>
              </div>
            </div>
          )}

          {project.id === 'mental-health-monitor' && (
            <div className="space-y-2.5">
              <div className="p-3 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[var(--text-primary)]">Evaluasi Kesejahteraan Mandiri</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[var(--text-secondary)]">Platform Konsep</span>
                </div>
                <div className="text-[11px] text-[var(--text-muted)] mt-1">Visualisasi Dataset Tren Suasana Hati Harian</div>
              </div>
              <div className="p-2.5 rounded-lg border border-[var(--border-subtle)] text-xs flex items-center justify-between">
                <span className="text-[var(--text-secondary)] text-[11px]">Pemisahan Arsitektur Client-Server</span>
                <span className="text-[10px] font-mono text-[var(--text-muted)]">Python + JS</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Tag Bar */}
        <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
          <span>Studi Kasus NARA</span>
          <span className="font-mono">{project.technologies.slice(0, 3).join(' / ')}</span>
        </div>
      </div>
    </div>
  );
}
