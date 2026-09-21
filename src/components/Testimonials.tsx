import React from 'react';
import { testimonialsData } from '@/data/testimonials';
import { Quote, CheckCircle2, Star } from 'lucide-react';

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-24 border-t border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)]"
      aria-label="Testimoni Klien NARA"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 reveal">
          <div className="text-xs font-bold tracking-wider text-[var(--accent)] uppercase mb-2">
            KATA MEREKA
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Dampak nyata di operasional mereka.
          </h2>
          <p className="mt-3 text-base text-[var(--text-secondary)] leading-relaxed">
            Feedback langsung dari pemilik bisnis dan pengelola program yang mempercayakan digitalisasi alur kerja mereka kepada NARA.
          </p>
        </div>

        {/* Testimonials Grid (2x2 for 4 client reviews) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonialsData.map((item, idx) => (
            <div
              key={item.clientName}
              className={`p-7 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] hover:-translate-y-1.5 hover:shadow-md transition-all duration-300 flex flex-col justify-between group reveal reveal-delay-${(idx + 1) * 100}`}
            >
              <div>
                {/* Header row: Quote icon & 5 stars */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-lg bg-[var(--accent-subtle)] text-[var(--accent)] flex items-center justify-center border border-[var(--accent-border)]">
                    <Quote className="w-4 h-4" />
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-sm text-[var(--text-primary)] leading-relaxed font-normal">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
              </div>

              {/* Client Info & Project Tag */}
              <div className="mt-6 pt-5 border-t border-[var(--border-subtle)]">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                      <span>{item.clientName}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="text-xs text-[var(--text-muted)] mt-0.5">
                      {item.clientRole}
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <span className="inline-block px-2.5 py-1 rounded text-[11px] font-medium bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">
                    {item.projectTitle}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
