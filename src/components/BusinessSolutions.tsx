import React from 'react';
import {
  Globe,
  CalendarCheck2,
  Boxes,
  ClipboardList,
  LayoutDashboard,
  ArrowRight,
} from 'lucide-react';

interface SolutionCard {
  title: string;
  description: string;
  examples?: string;
  icon: React.ReactNode;
}

const solutions: SolutionCard[] = [
  {
    title: 'Business Website',
    description:
      'Untuk memperkenalkan bisnis, layanan, produk, dan membantu mendapatkan pelanggan baru.',
    icon: <Globe className="w-5 h-5" />,
  },
  {
    title: 'Booking & Reservation System',
    description:
      'Untuk mengelola reservasi, jadwal, appointment, dan layanan.',
    examples: 'Contoh: klinik, salon, bimbingan belajar, travel, bisnis jasa.',
    icon: <CalendarCheck2 className="w-5 h-5" />,
  },
  {
    title: 'Inventory & Management System',
    description:
      'Untuk membantu bisnis mengelola stok, data, operasional, dan laporan.',
    icon: <Boxes className="w-5 h-5" />,
  },
  {
    title: 'Order Management',
    description:
      'Untuk bisnis yang masih mengelola pesanan melalui WhatsApp, spreadsheet, atau proses manual.',
    icon: <ClipboardList className="w-5 h-5" />,
  },
  {
    title: 'Custom Business Dashboard',
    description:
      'Untuk memantau data, aktivitas, performa, dan laporan bisnis dalam satu tempat.',
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
];

export default function BusinessSolutions() {
  return (
    <section
      id="solutions"
      className="py-24 border-t border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)]"
      aria-label="Solusi Bisnis Praktis NARA"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 reveal">
          <div className="text-xs font-bold tracking-wider text-[var(--accent)] uppercase mb-2">
            SOLUSI PRAKTIS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Apa yang bisa kami bantu?
          </h2>
          <p className="mt-3 text-base text-[var(--text-secondary)] leading-relaxed">
            Tidak semua bisnis membutuhkan solusi yang sama. Kami membangun sistem berdasarkan proses dan kebutuhan bisnis Anda.
          </p>
        </div>

        {/* 5 Solution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((item, idx) => (
            <div
              key={item.title}
              className={`p-7 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] hover:-translate-y-1.5 hover:shadow-md transition-all duration-300 flex flex-col justify-between group reveal reveal-delay-${(idx % 3 + 1) * 100} ${
                idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] flex items-center justify-center border border-[var(--border-subtle)] group-hover:bg-[var(--accent-subtle)] group-hover:text-[var(--accent)] transition-colors mb-5">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-2.5">
                  {item.description}
                </p>
              </div>

              {item.examples ? (
                <div className="mt-5 pt-4 border-t border-[var(--border-subtle)] text-xs text-[var(--text-muted)] italic">
                  {item.examples}
                </div>
              ) : (
                <div className="mt-5 pt-4 border-t border-transparent" />
              )}
            </div>
          ))}

          {/* Callout Card / Prompt to discuss custom needs */}
          <div className="p-7 rounded-xl border border-dashed border-[var(--border-strong)] bg-transparent flex flex-col justify-between reveal reveal-delay-300 md:col-span-2 lg:col-span-1">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[var(--accent-subtle)] text-[var(--accent)] flex items-center justify-center border border-[var(--accent-border)] mb-5">
                <ArrowRight className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight">
                Punya kebutuhan yang berbeda?
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-2.5">
                Setiap proses usaha memiliki keunikan tersendiri. Diskusikan alur kerja spesifik Anda, kami rancang solusi yang paling tepat.
              </p>
            </div>

            <div className="mt-5 pt-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)] group/link"
              >
                <span>Ceritakan kepada kami</span>
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
