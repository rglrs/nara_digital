'use client';

import React, { useState } from 'react';
import { projectsData } from '@/data/projects';
import { Project } from '@/types';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

export default function ProjectGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: 'Semua Proyek' },
    { id: 'business-system', label: 'Sistem Bisnis & ERP' },
    { id: 'web-app', label: 'Web Application' },
    { id: 'mobile-app', label: 'Aplikasi Mobile' },
  ];

  // Filter projects by category
  const filteredProjects = selectedCategory === 'all'
    ? projectsData
    : projectsData.filter((p) => p.type === selectedCategory);

  // Separate featured and secondary
  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const secondaryProjects = filteredProjects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      aria-label="Proyek Pilihan NARA"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <div className="text-xs font-bold tracking-wider text-[var(--accent)] uppercase mb-2">
            PORTOFOLIO TERPILIH
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Proyek yang dibangun untuk menyelesaikan masalah nyata.
          </h2>
          <p className="mt-3 text-base text-[var(--text-secondary)] leading-relaxed">
            Pilihan produk digital dan sistem operasional yang dikembangkan dari kebutuhan bisnis sebenarnya, dengan arsitektur bersih dan performa teruji.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] self-start md:self-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer hover:-translate-y-0.5 active:translate-y-0 active:scale-95 ${
                selectedCategory === cat.id
                  ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-xs border border-[var(--border-subtle)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Projects (Flagship 3 projects) */}
      {featuredProjects.length > 0 && (
        <div className="space-y-8 mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
            Proyek Unggulan Utama
          </div>
          <div className="space-y-8">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                featured={true}
                onSelectProject={(p) => setActiveModalProject(p)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Secondary Projects Grid */}
      {secondaryProjects.length > 0 && (
        <div className="space-y-6">
          <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] pt-4">
            Proyek & Platform Lainnya
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {secondaryProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                featured={false}
                onSelectProject={(p) => setActiveModalProject(p)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Case Study Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}
