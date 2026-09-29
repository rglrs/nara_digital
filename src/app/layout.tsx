import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://naradev.web.id';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'NARA Dev Digital Product Studio — Solusi Digital untuk Bisnis',
    template: '%s | NARA Dev Digital Product Studio',
  },
  description:
    'NARA Dev Digital Product Studio membantu bisnis dan organisasi merancang dan membangun website profesional, business systems, ERP, dan aplikasi mobile yang scalable sesuai kebutuhan nyata.',
  keywords: [
    'NARA Dev Digital Product Studio',
    'NARA Dev',
    'Digital Product Studio Indonesia',
    'Jasa Pembuatan Website Bisnis',
    'Pengembangan Sistem ERP Bisnis',
    'Pembuatan Aplikasi Mobile',
    'Software Development Studio',
    'Custom Business Dashboard',
    'Web Developer Indonesia',
  ],
  authors: [{ name: 'NARA Dev Digital Product Studio' }],
  creator: 'NARA Dev Digital Product Studio',
  publisher: 'NARA Dev Digital Product Studio',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/images/IconNara.png',
    shortcut: '/images/IconNara.png',
    apple: '/images/IconNara.png',
  },
  openGraph: {
    title: 'NARA Dev Digital Product Studio — Solusi Digital untuk Bisnis',
    description:
      'Kami membantu bisnis mengubah proses manual, kebutuhan operasional, dan ide menjadi solusi digital yang sederhana, terstruktur, dan siap berkembang.',
    url: siteUrl,
    siteName: 'NARA Dev Digital Product Studio',
    images: [
      {
        url: '/images/LogoNara1.png',
        width: 1200,
        height: 630,
        alt: 'NARA Dev Digital Product Studio',
      },
    ],
    type: 'website',
    locale: 'id_ID',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NARA Dev Digital Product Studio — Solusi Digital untuk Bisnis',
    description:
      'Solusi digital, dibangun untuk bisnis Anda. Jasa pembuatan website bisnis, sistem operasional, dan aplikasi mobile.',
    images: ['/images/LogoNara1.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'NARA Dev Digital Product Studio',
  url: siteUrl,
  logo: `${siteUrl}/images/IconNara.png`,
  image: `${siteUrl}/images/LogoNara1.png`,
  description:
    'Digital product studio yang berfokus pada pembangunan solusi digital praktis untuk bisnis dan organisasi: website bisnis, business systems, dan aplikasi mobile.',
  telephone: '+6285602743489',
  email: 'naradigital.creative@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'ID',
  },
  priceRange: '$$',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-blue-100">
        {children}
      </body>
    </html>
  );
}
