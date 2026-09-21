import React from 'react';
import { studioConfig } from '@/data/studioConfig';

export default function TrustSection() {
  return (
    <section
      className="py-14 border-y border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)]"
      aria-label="Indikator Kapabilitas Studio"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Title & Statement */}
          <div className="lg:col-span-4 space-y-2 reveal">
            <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              Dibangun melalui proyek nyata.
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Dari website bisnis hingga sistem manajemen internal dan aplikasi mobile, kami membangun produk digital berdasarkan kebutuhan operasional nyata.
            </p>
          </div>

          {/* Right Metrics Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {studioConfig.metrics.map((metric, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] transition-all duration-200 hover:border-[var(--border-strong)] hover:-translate-y-1 hover:shadow-xs reveal reveal-delay-${(idx + 1) * 100}`}
              >
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
                  {metric.value}
                </div>
                <div className="text-xs font-semibold text-[var(--text-primary)] mt-1">
                  {metric.label}
                </div>
                <div className="text-[11px] text-[var(--text-muted)] mt-1 leading-snug">
                  {metric.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
