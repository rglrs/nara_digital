import React from 'react';
import { studioConfig } from '@/data/studioConfig';
import { Mail, MessageSquare, ArrowUp } from 'lucide-react';
import { InstagramIcon, LinkedinIcon } from '@/components/SocialIcons';

export default function Footer() {
  const navLinks = [
    { name: 'Beranda', href: '#hero' },
    { name: 'Layanan', href: '#services' },
    { name: 'Solusi', href: '#solutions' },
    { name: 'Proyek', href: '#projects' },
    { name: 'Cara Kerja', href: '#process' },
    { name: 'Tentang', href: '#about' },
    { name: 'Kontak', href: '#contact' },
  ];

  return (
    <footer
      className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] py-14"
      aria-label="Informasi Penutup NARA Studio"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-[var(--border-subtle)]">
          {/* Brand Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-2xl tracking-tight text-[var(--text-primary)]">
                {studioConfig.studioName}
              </span>
            </div>
            <p className="text-sm text-[var(--text-secondary)]">
              {studioConfig.tagline}
            </p>
          </div>

          {/* Social Channels */}
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${studioConfig.contacts.email}`}
              aria-label="Hubungi NARA via Email"
              className="p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] hover:-translate-y-0.5 hover:shadow-xs active:translate-y-0 active:scale-95 transition-all"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={`https://wa.me/${studioConfig.contacts.whatsapp}`}
              aria-label="Hubungi NARA via WhatsApp"
              className="p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-emerald-600 hover:border-emerald-300 hover:-translate-y-0.5 hover:shadow-xs active:translate-y-0 active:scale-95 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
            <a
              href={`https://instagram.com/${studioConfig.contacts.instagram}`}
              aria-label="Kunjungi Instagram NARA"
              className="p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] hover:-translate-y-0.5 hover:shadow-xs active:translate-y-0 active:scale-95 transition-all"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href={`https://linkedin.com/company/${studioConfig.contacts.linkedin}`}
              aria-label="Kunjungi LinkedIn NARA"
              className="p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-blue-600 hover:border-blue-300 hover:-translate-y-0.5 hover:shadow-xs active:translate-y-0 active:scale-95 transition-all"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Navigation & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <nav className="flex flex-wrap items-center gap-6" aria-label="Navigasi Footer">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[var(--text-primary)] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <span>&copy; 2026 {studioConfig.studioName}. Hak Cipta Dilindungi.</span>
            <a
              href="#hero"
              aria-label="Kembali ke atas halaman"
              className="p-1.5 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:text-[var(--text-primary)] transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
