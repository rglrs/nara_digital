import React from 'react';
import { servicesData } from '@/data/services';
import { Globe, Database, Smartphone, Layout, Wrench } from 'lucide-react';

const serviceIcons = [
  <Globe key="web" className="w-5 h-5" />,
  <Database key="db" className="w-5 h-5" />,
  <Smartphone key="mob" className="w-5 h-5" />,
  <Layout key="ui" className="w-5 h-5" />,
  <Wrench key="maint" className="w-5 h-5" />,
];

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      aria-label="Layanan Studio NARA"
    >
      {/* Section Header */}
      <div className="max-w-2xl mb-16 reveal">
        <div className="text-xs font-bold tracking-wider text-[var(--accent)] uppercase mb-2">
          LAYANAN KAMI
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
          Dari ide hingga produk digital siap pakai.
        </h2>
        <p className="mt-3 text-base text-[var(--text-secondary)] leading-relaxed">
          Kami memadukan pemikiran produk, desain terarah, dan rekayasa perangkat lunak untuk menghasilkan solusi yang tepat sasaran bagi bisnis Anda.
        </p>
      </div>

      {/* Services Grid (Varied Rhythm per Antislop RHYTHM 2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesData.map((service, index) => {
          // Highlight the first two flagship services (Web Dev and Business Systems)
          const isFlagship = index === 0 || index === 1;

          return (
            <div
              key={service.number}
              className={`p-7 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] transition-all duration-300 hover:border-[var(--border-strong)] hover:-translate-y-1.5 hover:shadow-md group flex flex-col justify-between reveal reveal-delay-${(index % 3 + 1) * 100} ${
                isFlagship ? 'md:col-span-1 lg:col-span-1 border-t-2 border-t-[var(--accent)]' : ''
              }`}
            >
              <div>
                {/* Header: Number & Minimal Icon */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-mono font-bold tracking-wider text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors">
                    {service.number}
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] flex items-center justify-center border border-[var(--border-subtle)] group-hover:bg-[var(--accent-subtle)] group-hover:text-[var(--accent)] transition-colors">
                    {serviceIcons[index]}
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                  {service.title}
                </h3>
                <p className="text-xs font-medium text-[var(--accent)] mt-1">
                  {service.tagline}
                </p>

                {/* Description */}
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-3">
                  {service.description}
                </p>
              </div>

              {/* Examples & Deliverables */}
              <div className="mt-6 pt-5 border-t border-[var(--border-subtle)]">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2.5">
                  Cakupan Layanan:
                </div>
                <ul className="space-y-1.5 text-xs text-[var(--text-secondary)]">
                  {service.examples.map((ex, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-[var(--text-muted)] font-mono select-none">-</span>
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
