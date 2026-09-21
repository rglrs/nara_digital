'use client';

import React from 'react';
import { Project } from '@/types';
import { ArrowRight, Layers } from 'lucide-react';
import DeviceMockup from './DeviceMockup';

interface ProjectCardProps {
  project: Project;
  onSelectProject: (project: Project) => void;
  featured?: boolean;
}

export default function ProjectCard({ project, onSelectProject, featured = false }: ProjectCardProps) {
  if (featured) {
    // Flagship / Featured Card: Wide layout, richer visual prominence
    return (
      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 lg:p-8 transition-all duration-300 hover:border-[var(--border-strong)] hover:shadow-md group reveal">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Information */}
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider text-[var(--accent)] bg-[var(--accent-subtle)] border border-[var(--accent-border)]">
              <Layers className="w-3.5 h-3.5" />
              <span>{project.category}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
              {project.title}
            </h3>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              {project.shortDescription}
            </p>

            {/* Problem & Solution Snip */}
            <div className="space-y-2 py-2 text-xs border-y border-[var(--border-subtle)]">
              <div>
                <span className="font-bold text-[var(--text-primary)]">Tantangan: </span>
                <span className="text-[var(--text-secondary)]">{project.challenge}</span>
              </div>
              <div>
                <span className="font-bold text-[var(--text-primary)]">Solusi: </span>
                <span className="text-[var(--text-secondary)]">{project.solution}</span>
              </div>
            </div>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded text-xs font-mono font-medium bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Case Study Trigger Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onSelectProject(project)}
                className="btn-interactive inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-95 shadow-xs group/btn"
              >
                <span>Lihat Studi Kasus</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>

          {/* Right Column: Device Mockup */}
          <div className="lg:col-span-6">
            <DeviceMockup project={project} />
          </div>
        </div>
      </div>
    );
  }

  // Secondary Grid Card: Compact, highly readable
  return (
    <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 transition-all duration-300 hover:border-[var(--border-strong)] hover:-translate-y-1.5 hover:shadow-md group flex flex-col justify-between reveal">
      <div>
        {/* Device Preview */}
        <div className="mb-5">
          <DeviceMockup project={project} />
        </div>

        {/* Category & Title */}
        <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--accent)] mb-1">
          {project.category}
        </div>
        <h3 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
          {project.title}
        </h3>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mt-2 line-clamp-3">
          {project.shortDescription}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] space-y-4">
        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-0.5 rounded text-[11px] font-mono text-[var(--text-muted)]">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Trigger Button */}
        <button
          type="button"
          onClick={() => onSelectProject(project)}
          className="btn-interactive w-full inline-flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-semibold bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:bg-[var(--accent-subtle)] hover:border-[var(--accent-border)] hover:text-[var(--accent)] group/btn"
        >
          <span>Detail Studi Kasus</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </div>
  );
}
