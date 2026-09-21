import React from 'react';
import { studioConfig } from '@/data/studioConfig';
import { Code, Compass } from 'lucide-react';

export default function About() {
  return (
    <section
      id="about"
      className="py-24 border-t border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)]"
      aria-label="Tentang Studio NARA"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7 space-y-6 reveal">
            <div className="text-xs font-bold tracking-wider text-[var(--accent)] uppercase">
              TENTANG NARA
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] leading-tight">
              Tim kecil, solusi yang dibuat dengan serius.
            </h2>
            <div className="space-y-4 text-base text-[var(--text-secondary)] leading-relaxed">
              <p>
                NARA adalah digital development studio yang berfokus pada pembangunan solusi digital praktis untuk bisnis dan organisasi.
              </p>
              <p>
                Kami menggabungkan product thinking, desain, dan software development untuk mengubah kebutuhan nyata menjadi website, business systems, dan digital products yang dapat digunakan dan dikembangkan.
              </p>
            </div>

            <div className="pt-2 border-t border-[var(--border-subtle)] grid grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                <div className="font-bold text-[var(--text-primary)]">Pendekatan Studio</div>
                <div className="text-[var(--text-muted)] mt-0.5">Fokus pada penyelesaian kendala operasional, bukan sekadar menulis kode.</div>
              </div>
              <div className="p-3.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                <div className="font-bold text-[var(--text-primary)]">Kolaborasi Terarah</div>
                <div className="text-[var(--text-muted)] mt-0.5">Komunikasi terstruktur langsung dengan pengembang solusi Anda.</div>
              </div>
            </div>
          </div>

          {/* Right Column: Founder Cards (Minimal, professional, editable) */}
          <div className="lg:col-span-5 space-y-4 reveal reveal-delay-200">
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
              Pengembang Inti
            </div>

            <div className="space-y-4">
              {studioConfig.founders.map((founder, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] hover:-translate-y-1 hover:shadow-xs transition-all duration-200 flex items-start gap-4"
                >
                  <div className="w-11 h-11 rounded-full bg-[var(--accent-subtle)] border border-[var(--accent-border)] text-[var(--accent)] font-bold text-sm flex items-center justify-center shrink-0">
                    {founder.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-[var(--text-primary)]">
                        {founder.name}
                      </h3>
                      <span className="text-[11px] font-mono text-[var(--accent)] font-medium px-2 py-0.5 rounded bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
                        {founder.role}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed mt-2">
                      {founder.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
