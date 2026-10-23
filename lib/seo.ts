import { SITE } from './site';
import type { Metadata } from 'next';

export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const canonical = `${SITE.url}${opts.path}`;
  const ogImage = opts.image || '/og-default.png';

  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      url: canonical,
      title: opts.title,
      description: opts.description,
      siteName: SITE.name,
      locale: 'en_AU',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: opts.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: opts.title,
      description: opts.description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.suburb,
      addressRegion: SITE.address.state,
      postalCode: SITE.address.postcode,
      addressCountry: SITE.address.country,
    },
    sameAs: [SITE.social.facebook, SITE.social.instagram, SITE.social.linkedin],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    inLanguage: 'en-AU',
    publisher: { '@type': 'Organization', name: SITE.name },
  };
}

export function serviceJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Car Checks and report service',
    provider: { '@type': 'Organization', name: SITE.name },
    areaServed: { '@type': 'Country', name: 'Australia' },
    offers: [
      {
        '@type': 'Offer',
        name: 'Standard Package',
        price: '70',
        priceCurrency: 'AUD',
      },
      {
        '@type': 'Offer',
        name: 'Premium Package',
        price: '90',
        priceCurrency: 'AUD',
      },
    ],
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}
