'use client';

import React, { useState } from 'react';
import { studioConfig } from '@/data/studioConfig';
import { Mail, MessageSquare, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { InstagramIcon, LinkedinIcon } from '@/components/SocialIcons';

export default function ContactCTA() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    business: '',
    projectType: 'Sistem Operasional / ERP',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Mohon lengkapi nama, email, dan pesan kebutuhan proyek Anda.');
      return;
    }

    setErrorMsg('');
    setSubmitted(true);
  };

  // Generate direct WhatsApp link with pre-filled message
  const generateWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Halo NARA Studio, saya ${formData.name || '[Nama]'} dari ${formData.business || '[Perusahaan/Usaha]'}. Saya ingin berkonsultasi mengenai proyek ${formData.projectType}: ${formData.message || 'pengembangan sistem digital'}`
    );
    return `https://wa.me/${studioConfig.contacts.whatsapp}?text=${text}`;
  };

  return (
    <section
      id="contact"
      className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      aria-label="Kontak dan Diskusi Proyek"
    >
      <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 sm:p-12 lg:p-16 shadow-xs reveal">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Heading & Contact Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-bold tracking-wider text-[var(--accent)] uppercase">
              DISKUSI PROYEK
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] leading-tight">
              Punya masalah yang ingin didigitalisasi?
            </h2>

            <p className="text-base text-[var(--text-secondary)] leading-relaxed">
              Tidak harus sudah tahu sistem apa yang Anda butuhkan. Ceritakan proses atau masalah bisnis Anda, dan mari cari solusi yang tepat bersama.
            </p>

            {/* Friction Reducer / Trust Badges */}
            <div className="p-4 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] space-y-3">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-[var(--text-primary)]">Konsultasi Awal 100% Gratis:</span>{' '}
                  <span className="text-[var(--text-secondary)]">Diskusikan kebutuhan tanpa komitmen atau biaya tersembunyi.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-[var(--text-primary)]">Menyesuaikan Anggaran:</span>{' '}
                  <span className="text-[var(--text-secondary)]">Punya budget tertentu? Kami bantu rancang prioritas fitur esensial agar tetap tepat sasaran.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-0.5 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-[var(--text-primary)]">Estimasi Transparan:</span>{' '}
                  <span className="text-[var(--text-secondary)]">Ruang lingkup kerja dan rincian waktu disepakati jelas sebelum pengerjaan dimulai.</span>
                </div>
              </div>
            </div>

            {/* Direct Contact Options (Configurable from central studioConfig) */}
            <div className="pt-6 border-t border-[var(--border-subtle)] space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Saluran Komunikasi Langsung:
              </div>

              <div className="space-y-2.5 text-sm">
                <a
                  href={`mailto:${studioConfig.contacts.email}`}
                  className="flex items-center gap-3 p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] hover:border-[var(--border-strong)] hover:-translate-y-0.5 hover:shadow-xs text-[var(--text-primary)] transition-all"
                >
                  <Mail className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  <div className="truncate">
                    <div className="text-[11px] text-[var(--text-muted)]">Email Studio</div>
                    <span className="font-mono text-xs">{studioConfig.contacts.email}</span>
                  </div>
                </a>

                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] hover:border-[var(--border-strong)] hover:-translate-y-0.5 hover:shadow-xs text-[var(--text-primary)] transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div className="truncate">
                    <div className="text-[11px] text-[var(--text-muted)]">WhatsApp Direct</div>
                    <span className="font-mono text-xs">{studioConfig.contacts.whatsapp}</span>
                  </div>
                </a>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href={`https://instagram.com/${studioConfig.contacts.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] hover:border-[var(--border-strong)] hover:-translate-y-0.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
                  >
                    <InstagramIcon className="w-3.5 h-3.5" />
                    <span>{studioConfig.contacts.instagram}</span>
                  </a>

                  <a
                    href={`https://linkedin.com/company/${studioConfig.contacts.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] hover:border-[var(--border-strong)] hover:-translate-y-0.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5 text-blue-600" />
                    <span>{studioConfig.contacts.linkedin}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form with Validation & Feedback */}
          <div className="lg:col-span-7 bg-[var(--bg-surface-elevated)] p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)]">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in duration-200">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[var(--text-primary)]">
                  Pesan Anda Berhasil Terkirim
                </h3>
                <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
                  Terima kasih telah menghubungi NARA. Tim kami akan meninjau rincian kebutuhan proyek Anda dan menghubungi Anda kembali melalui email dalam 1x24 jam kerja.
                </p>
                <div className="pt-4 flex flex-wrap justify-center gap-3">
                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                  >
                    <span>Lanjut Diskusi di WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        business: '',
                        projectType: 'Business Website',
                        message: '',
                      });
                    }}
                    className="px-4 py-2.5 rounded-lg text-xs font-semibold border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                  >
                    Kirim Pesan Lain
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-[var(--text-primary)]">
                  Formulir Konsultasi Proyek
                </h3>

                {errorMsg && (
                  <div className="p-3 rounded-lg text-xs bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
                      Nama Anda *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nama Anda"
                      className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="business" className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
                      Nama Bisnis / Organisasi
                    </label>
                    <input
                      type="text"
                      id="business"
                      value={formData.business}
                      onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                      placeholder="Contoh: CV Maju Lancar / Klinik Sehat"
                      className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="nama@perusahaan.com"
                      className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="projectType" className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
                      Jenis Kebutuhan
                    </label>
                    <select
                      id="projectType"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:border-[var(--accent)] transition-all"
                    >
                      <option value="Business Website">Business Website</option>
                      <option value="Booking & Reservation System">Booking & Reservation System</option>
                      <option value="Inventory & Management System">Inventory & Management System</option>
                      <option value="Order Management">Order Management</option>
                      <option value="Custom Business Dashboard">Custom Business Dashboard</option>
                      <option value="Aplikasi Mobile">Aplikasi Mobile</option>
                      <option value="Lainnya / Kebutuhan Kustom">Lainnya / Kebutuhan Kustom</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
                    Ceritakan masalah atau proses bisnis yang ingin Anda perbaiki... *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Ceritakan masalah atau proses bisnis yang ingin Anda perbaiki..."
                    className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] transition-all"
                  />
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    className="btn-interactive w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-lg text-sm font-semibold bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-95 shadow-sm group"
                  >
                    <span>Kirim Project Brief</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                  <p className="text-xs text-[var(--text-muted)]">
                    Belum yakin solusi apa yang dibutuhkan? Tidak masalah. Ceritakan saja masalahnya.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

