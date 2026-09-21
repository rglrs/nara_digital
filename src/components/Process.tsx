import React from 'react';
import { Search, Compass, Code2, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    stepLabel: 'STEP 01',
    title: 'Discover',
    subtitle: 'Pemahaman Masalah',
    description:
      'Kami memahami bisnis, pengguna, proses, dan masalah yang ingin diselesaikan.',
    icon: <Search className="w-5 h-5" />,
  },
  {
    number: '02',
    stepLabel: 'STEP 02',
    title: 'Plan',
    subtitle: 'Perencanaan Sistem',
    description:
      'Kami menyusun kebutuhan, user flow, fitur, dan pendekatan teknis sebelum development dimulai.',
    icon: <Compass className="w-5 h-5" />,
  },
  {
    number: '03',
    stepLabel: 'STEP 03',
    title: 'Build',
    subtitle: 'Pengembangan & Pengujian',
    description:
      'Kami merancang, mengembangkan, menguji, dan menyempurnakan solusi secara bertahap.',
    icon: <Code2 className="w-5 h-5" />,
  },
  {
    number: '04',
    stepLabel: 'STEP 04',
    title: 'Launch',
    subtitle: 'Penerapan & Pemeliharaan',
    description:
      'Solusi diterapkan dan disiapkan untuk digunakan, dikembangkan, serta dipelihara dalam jangka panjang.',
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
            Proses terstruktur. Komunikasi jelas.
          </h2>
          <p className="mt-3 text-base text-[var(--text-secondary)] leading-relaxed">
            Setiap proyek dikerjakan melalui tahapan yang rapi agar hasil akhir tepat guna, selesai sesuai prioritas, dan siap dikembangkan lebih lanjut.
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
                  <span className="text-xs font-mono font-bold text-[var(--accent)] px-2.5 py-0.5 rounded bg-[var(--accent-subtle)] border border-[var(--accent-border)]">
                    {step.stepLabel}
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

              {/* Step indicator */}
              <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-muted)] font-mono">
                <span>Tahap 0{idx + 1}</span>
                <span className="font-semibold text-[var(--text-primary)]">0{idx + 1} / 04</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
