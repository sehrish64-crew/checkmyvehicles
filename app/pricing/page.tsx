import { ShieldCheck, Zap, FileText, Check } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { PricingCard } from '@/components/pricing-card';
import { pageMetadata, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';
import { PACKAGES } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Pricing — Vehicle History Report Packages in AUD | CheckMyVehicles',
  description:
    'Transparent pricing for vehicle history reports in Australia. Standard Package AUD $70 and Premium Package AUD $90. Choose your package, enter your vehicle details, and get your report instantly.',
  path: '/pricing',
});

const COMPARISON = [
  { feature: 'Written-off and stolen status check', standard: true, premium: true },
  { feature: 'Odometer reading and rollback alert', standard: true, premium: true },
  { feature: 'Registration and expiry details', standard: true, premium: true },
  { feature: 'Safety recall information', standard: true, premium: true },
  { feature: 'Detailed market valuation guide', standard: true, premium: true },
  { feature: 'Instant PDF report download', standard: true, premium: true },
  { feature: 'Full title and encumbrance check', standard: false, premium: true },
  { feature: 'Comprehensive accident damage history', standard: false, premium: true },
  { feature: 'Manufacturer warranty status', standard: false, premium: true },
  { feature: 'Service interval and maintenance records', standard: false, premium: true },
  { feature: 'Priority email support within 2 hours', standard: false, premium: true },
];

const FAQS = [
  {
    question: 'How do I purchase a vehicle history report?',
    answer:
      'Choose either the Standard or Premium package, click Buy Now, and fill in your full name, phone number, VIN or number plate, and city. Your report is generated instantly after purchase.',
  },
  {
    question: 'What is the difference between the Standard and Premium packages?',
    answer:
      'The Standard Package covers essential checks including stolen status, odometer, registration, recalls and valuation. The Premium Package adds encumbrance checks, full accident damage history, warranty status, service records, and priority support.',
  },
  {
    question: 'Are prices in Australian dollars?',
    answer:
      'Yes, all prices are in Australian dollars (AUD). There are no hidden fees — the price you see is the total you pay.',
  },
  {
    question: 'Can I use my report anywhere in Australia?',
    answer:
      'Absolutely. Your CheckMyVehicles report is valid and recognised across all Australian states and territories.',
  },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Pricing', path: '/pricing' },
        ])}
      />
      <JsonLd data={faqJsonLd(FAQS)} />

      {/* Hero */}
      <section className="bg-foreground pb-16 pt-28 text-white sm:pb-20 sm:pt-32">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
              Pricing
            </p>
            <h1 className="mt-2 font-display text-2xl font-bold sm:text-5xl">
              Choose your vehicle report package
            </h1>
            <p className="mt-3 text-sm text-white/60 sm:mt-4 sm:text-lg">
              Pick the package that suits your needs. All prices in Australian dollars (AUD).
              No subscriptions, no hidden fees — pay once and get your report instantly.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="-mt-6 pb-12 sm:-mt-8 sm:pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2 sm:gap-8">
            {PACKAGES.map((pkg, i) => (
              <Reveal key={pkg.id} delay={i * 100}>
                <PricingCard {...pkg} popular={pkg.id === 'premium'} compact />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <h2 className="font-display text-2xl font-bold sm:text-4xl">
              Compare packages
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:mt-4 sm:text-lg">
              See exactly what&apos;s included in each package.
            </p>
          </Reveal>

          <Reveal className="mt-8 overflow-hidden rounded-2xl border border-border bg-white shadow-sm sm:mt-12">
            <table className="w-full table-fixed text-left">
              <colgroup>
                <col className="w-[58%]" />
                <col className="w-[21%]" />
                <col className="w-[21%]" />
              </colgroup>
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-3 py-3 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground sm:px-6 sm:py-5 sm:text-sm sm:tracking-wider">
                    Feature
                  </th>
                  <th className="px-1 py-3 text-center text-[10px] font-semibold text-foreground sm:px-6 sm:py-5 sm:text-sm">
                    Standard
                  </th>
                  <th className="px-1 py-3 text-center text-[10px] font-semibold text-primary sm:px-6 sm:py-5 sm:text-sm">
                    Premium
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr
                    key={row.feature}
                    className="border-b border-border last:border-0 transition-colors hover:bg-muted/20"
                  >
                    <td className="break-words px-3 py-3 text-xs text-foreground/80 sm:px-6 sm:py-4 sm:text-sm">
                      {row.feature}
                    </td>
                    <td className="px-1 py-3 text-center sm:px-6 sm:py-4">
                      {row.standard ? (
                        <Check className="mx-auto h-4 w-4 text-primary sm:h-5 sm:w-5" />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-1 py-3 text-center sm:px-6 sm:py-4">
                      {row.premium ? (
                        <Check className="mx-auto h-4 w-4 text-primary sm:h-5 sm:w-5" />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                ))}
                <tr className="border-t-2 border-border bg-muted/20">
                  <td className="px-3 py-4 text-xs font-semibold sm:px-6 sm:py-5 sm:text-sm">Price</td>
                  <td className="px-1 py-4 text-center text-sm font-bold sm:px-6 sm:py-5 sm:text-lg">
                    AUD $70
                  </td>
                  <td className="px-1 py-4 text-center text-sm font-bold text-primary sm:px-6 sm:py-5 sm:text-lg">
                    AUD $90
                  </td>
                </tr>
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-t border-border bg-muted/30 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3 sm:gap-8">
            {[
              {
                icon: Zap,
                title: 'Instant delivery',
                description: 'Your report is ready to download the moment your purchase is complete.',
              },
              {
                icon: ShieldCheck,
                title: 'Official data sources',
                description: 'We pull data from official Australian registries and databases.',
              },
              {
                icon: FileText,
                title: 'Easy-to-read PDF',
                description: 'Get a clean, professional report that is easy to understand and share.',
              },
            ].map((item) => (
              <Reveal key={item.title}>
                <div className="rounded-2xl border border-border bg-white p-5 text-center shadow-sm sm:p-6">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-12 sm:w-12">
                    <item.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold sm:mt-4 sm:text-base">{item.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
              FAQ
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-4xl">
              Pricing questions, answered
            </h2>
          </Reveal>

          <div className="mt-8 space-y-3 sm:mt-12 sm:space-y-4">
            {FAQS.map((faq, i) => (
              <Reveal key={faq.question} delay={i * 60}>
                <div className="rounded-2xl border border-border bg-white p-5 sm:p-6">
                  <h3 className="text-base font-semibold sm:text-lg">{faq.question}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {faq.answer}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}