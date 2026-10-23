export const SITE = {
  name: 'CheckMyVehicles',
  shortName: 'CheckMyVehicles',
  tagline: 'Comprehensive Vehicle Checks for Australian drivers',
  description:
    'CheckMyVehicles delivers fast, detailed Digital Pdf Reports for Australian buyers and sellers. Check any vehicle by VIN or number plate in minutes.',
  url: 'https://checkmyvehicles.com',
  email: 'info@checkmyvehicles.com',
  phone: '1300 288 683',
  abn: '24 681 950 327',
  address: {
    street: 'Level 12, 420 Collins Street',
    suburb: 'Melbourne',
    state: 'VIC',
    postcode: '3000',
    country: 'AU',
  },
  social: {
    facebook: 'https://facebook.com/checkmyvehicles',
    instagram: 'https://instagram.com/checkmyvehicles',
    linkedin: 'https://linkedin.com/company/checkmyvehicles',
  },
};

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export const PACKAGES = [
  {
    id: 'standard' as const,
    name: 'Standard Package',
    price: 70,
    description:
      'Everything you need to check a vehicle before buying or selling across Australia.',
    features: [
      'Written-off and stolen status check',
      'Odometer reading and rollback alert',
      'Registration and expiry details',
      'Safety recall information',
      'Detailed market valuation guide',
      'Instant PDF report download',
    ],
  },
  {
    id: 'premium' as const,
    name: 'Premium Package',
    price: 90,
    description:
      'Our most comprehensive report with everything in Standard plus extra peace of mind.',
    features: [
      'Everything in the Standard Package',
      'Full title and encumbrance check',
      'Comprehensive accident damage history',
      'Manufacturer warranty status',
      'Service interval and maintenance records',
      'Priority email support within 2 hours',
    ],
  },
];

export const PAYMENT_LINKS: Record<(typeof PACKAGES)[number]['id'], string | null> = {
  standard:
    'https://pdf-tech-2.myshopify.com/products/standard-plan?variant=67836472852710',
  premium:
    'https://pdf-tech-2.myshopify.com/products/premium-plan?variant=67836534227174',
};
