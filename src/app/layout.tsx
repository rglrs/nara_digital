import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'NARA | Solusi Digital, Dibangun untuk Bisnis Anda',
  description:
    'NARA adalah studio pengembangan digital yang membantu bisnis mengubah proses manual, ide, dan kendala operasional menjadi solusi web, sistem manajemen internal, dan aplikasi mobile yang sederhana dan skalabel.',
  keywords: [
    'NARA Studio',
    'Digital Development Studio',
    'Sistem Informasi Bisnis',
    'Aplikasi Web Kustom',
    'Aplikasi Mobile',
    'ERP Kustom',
    'Pengembangan Web Indonesia',
  ],
  authors: [{ name: 'NARA Digital Studio' }],
  openGraph: {
    title: 'NARA | Solusi Digital, Dibangun untuk Bisnis Anda',
    description:
      'Studio pengembangan digital yang berfokus pada solusi praktis untuk bisnis dan organisasi yang sedang berkembang.',
    type: 'website',
    locale: 'id_ID',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-blue-100">
        {children}
      </body>
    </html>
  );
}
