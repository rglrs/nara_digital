import React from 'react';
import { Target, MessageSquareCheck, TrendingUp, ShieldCheck } from 'lucide-react';

const principles = [
  {
    title: 'Built Around Your Needs',
    description:
      'Kami membangun solusi berdasarkan kebutuhan nyata bisnis, bukan memaksakan satu template untuk semua.',
    icon: <Target className="w-5 h-5 text-[var(--accent)]" />,
  },
  {
    title: 'Clear Communication',
    description:
      'Proses, prioritas, dan perkembangan project dikomunikasikan dengan jelas.',
    icon: <MessageSquareCheck className="w-5 h-5 text-[var(--accent)]" />,
  },
  {
    title: 'Scalable Foundations',
    description:
      'Sistem dirancang agar dapat dikembangkan seiring pertumbuhan kebutuhan bisnis.',
    icon: <TrendingUp className="w-5 h-5 text-[var(--accent)]" />,
  },
  {
    title: 'Long-Term Support',
    description:
      'Kami tetap dapat membantu setelah project selesai melalui maintenance dan pengembangan lanjutan.',
    icon: <ShieldCheck className="w-5 h-5 text-[var(--accent)]" />,
  },
];

export default function WhyNara() {
  return (
    <section
      className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      aria-label="Prinsip Kerja NARA Studio"
    >
      <div className="max-w-2xl mb-16 reveal">
        <div className="text-xs font-bold tracking-wider text-[var(--accent)] uppercase mb-2">
          NILAI UTAMA
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
          Teknologi seharusnya menyelesaikan masalah, bukan menambah kerumitan.
        </h2>
        <p className="mt-3 text-base text-[var(--text-secondary)] leading-relaxed">
          Kami berfokus pada solusi praktis yang langsung membawa dampak positif pada efisiensi operasional bisnis Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {principles.map((item, index) => (
          <div
            key={index}
            className={`p-7 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] hover:-translate-y-1.5 hover:shadow-md transition-all duration-300 flex items-start gap-4 reveal reveal-delay-${(index + 1) * 100}`}
          >
            <div className="w-10 h-10 rounded-lg bg-[var(--accent-subtle)] border border-[var(--accent-border)] flex items-center justify-center shrink-0 mt-0.5">
              {item.icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-2">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
