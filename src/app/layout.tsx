import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'NARA Digital — Solusi Digital untuk Bisnis',
  description:
    'NARA membantu bisnis dan organisasi membangun website, business systems, mobile applications, dan solusi digital yang dibuat sesuai kebutuhan.',
  keywords: [
    'NARA Digital',
    'Digital Development Studio',
    'Solusi Digital Bisnis',
    'Business Systems',
    'Website Bisnis',
    'Aplikasi Mobile',
    'Custom Software',
    'Pengembangan Web Indonesia',
  ],
  authors: [{ name: 'NARA Digital Studio' }],
  openGraph: {
    title: 'NARA Digital — Solusi Digital untuk Bisnis',
    description:
      'NARA membantu bisnis dan organisasi membangun website, business systems, mobile applications, dan solusi digital yang dibuat sesuai kebutuhan.',
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
