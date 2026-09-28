import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'NARA Dev Digital Product Studio — Solusi Digital untuk Bisnis',
  description:
    'NARA Dev Digital Product Studio membantu bisnis dan organisasi membangun website, business systems, mobile applications, dan solusi digital yang dibuat sesuai kebutuhan.',
  keywords: [
    'NARA Dev Digital Product Studio',
    'NARA Dev',
    'Digital Product Studio',
    'Solusi Digital Bisnis',
    'Business Systems',
    'Website Bisnis',
    'Aplikasi Mobile',
    'Custom Software',
    'Pengembangan Web Indonesia',
  ],
  authors: [{ name: 'NARA Dev Digital Product Studio' }],
  icons: {
    icon: '/images/IconNara.png',
    shortcut: '/images/IconNara.png',
    apple: '/images/IconNara.png',
  },
  openGraph: {
    title: 'NARA Dev Digital Product Studio — Solusi Digital untuk Bisnis',
    description:
      'NARA Dev Digital Product Studio membantu bisnis dan organisasi membangun website, business systems, mobile applications, dan solusi digital yang dibuat sesuai kebutuhan.',
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
