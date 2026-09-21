import React from 'react';
import { Search, Compass, Code2, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Discover',
    subtitle: 'Eksplorasi & Pemahaman',
    description:
      'Memahami alur kerja bisnis, masalah operasional nyata, profil pengguna, serta tujuan spesifik yang ingin dicapai melalui digitalisasi.',
    icon: <Search className="w-5 h-5" />,
  },
  {
    number: '02',
    title: 'Plan',
    subtitle: 'Perencanaan & Arsitektur',
    description:
      'Merumuskan spesifikasi fungsional, alur navigasi pengguna (user flow), prioritas fitur, dan pemilihan arsitektur teknis yang tepat.',
    icon: <Compass className="w-5 h-5" />,
  },
  {
    number: '03',
    title: 'Build',
    subtitle: 'Desain & Pengembangan',
    description:
      'Mendesain antarmuka yang bersih, menulis kode terstruktur, melakukan pengujian sistem secara bertahap, dan menampung umpan balik berkala.',
    icon: <Code2 className="w-5 h-5" />,
  },
  {
    number: '04',
    title: 'Launch',
    subtitle: 'Deployment & Pendampingan',
    description:
      'Merilis sistem ke lingkungan produksi, memastikan kestabilan operasional, serta menyediakan dukungan teknis untuk pembaruan fitur ke depan.',
    icon: <Rocket className="w-5 h-5" />,
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="py-24 border-t border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)]"
      aria-label="Metodologi Kerja NARA Studio"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16 reveal">
          <div className="text-xs font-bold tracking-wider text-[var(--accent)] uppercase mb-2">
            METODOLOGI KERJA
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Proses sederhana. Komunikasi transparan.
          </h2>
          <p className="mt-3 text-base text-[var(--text-secondary)] leading-relaxed">
            Setiap proyek dikerjakan melalui tahapan terstruktur agar hasil akhir tepat guna, selesai sesuai tenggat, dan mudah dikembangkan lebih lanjut.
          </p>
        </div>

        {/* Timeline (Horizontal on desktop, vertical on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className={`p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] relative flex flex-col justify-between hover:border-[var(--border-strong)] hover:-translate-y-1.5 hover:shadow-md transition-all duration-300 reveal reveal-delay-${(idx + 1) * 100}`}
            >
              <div>
                {/* Step Number & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-[var(--accent)] px-2 py-0.5 rounded bg-[var(--accent-subtle)] border border-[var(--accent-border)]">
                    Tahap {step.number}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] flex items-center justify-center border border-[var(--border-subtle)]">
                    {step.icon}
                  </div>
                </div>

                {/* Step Title */}
                <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight">
                  {step.title}
                </h3>
                <div className="text-xs font-medium text-[var(--text-muted)] mt-0.5">
                  {step.subtitle}
                </div>

                {/* Step Description */}
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mt-3">
                  {step.description}
                </p>
              </div>

              {/* Progress indicator */}
              <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-muted)] font-mono">
                <span>0{idx + 1} / 04</span>
                <span className="text-emerald-600 font-medium">Terverifikasi</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
