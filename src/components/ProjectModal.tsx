'use client';

import React, { useEffect } from 'react';
import { Project } from '@/types';
import { X, CheckCircle2, Server, Layers, Cpu, Image as ImageIcon, Quote } from 'lucide-react';
import DeviceMockup from './DeviceMockup';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto studio-glass animate-in fade-in duration-200"
    >
      {/* Backdrop Click */}
      <div
        className="fixed inset-0 bg-slate-900/60 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-2xl z-10 flex flex-col my-auto">
        {/* Modal Top Bar */}
        <div className="sticky top-0 z-20 px-6 py-4 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded text-xs font-semibold uppercase tracking-wider text-[var(--accent)] bg-[var(--accent-subtle)] border border-[var(--accent-border)]">
              {project.category}
            </span>
            <span className="text-xs text-[var(--text-muted)] font-mono hidden sm:inline-block">
              ID: {project.slug}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup studi kasus"
            className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Overview */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] mb-1">
              Overview Proyek
            </div>
            <h2 id="modal-title" className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
              {project.title}
            </h2>
            <p className="mt-2 text-base text-[var(--text-secondary)] leading-relaxed">
              {project.shortDescription}
            </p>
          </div>

          {/* Project Gallery / Interface Preview */}
          <div className="p-4 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
            <div className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[var(--accent)]" />
              <span>Project Gallery & Pratinjau Antarmuka</span>
            </div>
            <DeviceMockup project={project} isDetailed={true} />
          </div>

          {/* The Challenge & The Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                The Challenge (Masalah Bisnis)
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                The Solution (Solusi Sistem)
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Client Testimonial (if available) */}
          {project.testimonial && (
            <div className="p-5 rounded-xl border border-[var(--accent-border)] bg-[var(--accent-subtle)] space-y-2.5">
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] flex items-center gap-1.5">
                <Quote className="w-3.5 h-3.5" />
                <span>Feedback Klien ({project.testimonial.clientName})</span>
              </div>
              <blockquote className="text-sm text-[var(--text-primary)] italic leading-relaxed">
                &ldquo;{project.testimonial.quote}&rdquo;
              </blockquote>
              <div className="text-xs text-[var(--text-secondary)] font-medium pt-1">
                &mdash; {project.testimonial.clientName}, {project.testimonial.clientRole}
              </div>
            </div>
          )}

          {/* Key Features Section */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] mb-1">
              Key Features
            </div>
            <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[var(--accent)]" />
              <span>Fitur Utama Sistem</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.keyFeatures.map((feature, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] transition-all"
                >
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-[var(--text-primary)]">
                        {feature.title}
                      </h4>
                      <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Badges */}
          <div className="pt-4 border-t border-[var(--border-subtle)]">
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] mb-1">
              Technology Stack
            </div>
            <h3 className="text-sm font-bold text-[var(--text-primary)] tracking-tight mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[var(--accent)]" />
              <span>Teknologi yang Digunakan</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-md text-xs font-mono font-semibold bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] border border-[var(--border-subtle)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="px-6 py-4 border-t border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-[var(--text-muted)]">
            Tertarik membangun sistem serupa untuk bisnis Anda?
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              Tutup
            </button>
            <a
              href="#contact"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90 transition-all cursor-pointer"
            >
              Konsultasi Proyek Ini
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
