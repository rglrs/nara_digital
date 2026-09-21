import React from 'react';
import { Target, MessageSquareCheck, TrendingUp, ShieldCheck } from 'lucide-react';

const principles = [
  {
    title: 'Dibangun Sesuai Kebutuhan',
    description:
      'Kami merancang arsitektur dan antarmuka berdasarkan alur kerja bisnis Anda yang sebenarnya, bukan memaksakan template kaku yang tidak relevan.',
    icon: <Target className="w-5 h-5 text-[var(--accent)]" />,
  },
  {
    title: 'Komunikasi Jelas & Terbuka',
    description:
      'Perkembangan proyek, ruang lingkup pengerjaan, dan prioritas fitur selalu dipaparkan secara transparan dengan bahasa yang lugas dan mudah dipahami.',
    icon: <MessageSquareCheck className="w-5 h-5 text-[var(--accent)]" />,
  },
  {
    title: 'Fondasi Sistem yang Skalabel',
    description:
      'Kode program yang bersih, modular, dan basis data terstruktur memastikan perangkat lunak siap menampung lonjakan data dan pengguna di masa depan.',
    icon: <TrendingUp className="w-5 h-5 text-[var(--accent)]" />,
  },
  {
    title: 'Dukungan Jangka Panjang',
    description:
      'Kerja sama kami tidak berhenti saat aplikasi dirilis. Kami mendampingi pemeliharaan server, pembaruan keamanan, dan pengembangan fitur lanjutan.',
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
