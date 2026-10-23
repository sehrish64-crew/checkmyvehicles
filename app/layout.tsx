import './globals.css';
import type { Metadata } from 'next';
import { Barlow_Semi_Condensed, Bebas_Neue } from 'next/font/google';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SiteJsonLd } from '@/components/seo/site-json-ld';
import { SITE } from '@/lib/site';

const barlow = Barlow_Semi_Condensed({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-hero',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  keywords: [
    'vehicle checks Australia',
    'VIN check Australia',
    'number plate check',
    'vehicle report Australia',
    'vehicle history Australia',
    'rego check',
    'vehicle valuation Australia',
    'used vehicle checks',
    'vehicle check Australia',
    'auto report',
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  themeColor: '#ffffff',
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    url: SITE.url,
    locale: 'en_AU',
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: `${SITE.name} — Digital Pdf Reports`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: ['/og-default.png'],
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-AU"
      className={`${barlow.variable} ${bebasNeue.variable}`}
    >
      <body className="font-sans antialiased">
        <SiteJsonLd />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}