import Link from 'next/link';
import {
  ShieldCheck,
  FileSearch,
  Gauge,
  Wrench,
  Car,
  ArrowRight,
  Star,
} from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { pageMetadata, serviceJsonLd, faqJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';
import { PACKAGES, SITE } from '@/lib/site';
import { PricingCard } from '@/components/pricing-card';
import { HeroCarousel } from '@/components/hero-carousel';

export const metadata = pageMetadata({
  title: 'Car Checks & Report Service in Australia | CheckMyVehicles',
  description:
    'Get a comprehensive car report before you buy or sell. CheckMyVehicles checks any vehicle by VIN or number plate across Australia — stolen status, odometer, rego, encumbrance and more. Reports In Hours.',
  path: '/',
});

const SERVICES = [
  {
    icon: ShieldCheck,
    title: 'Stolen & Written-Off Check',
    description:
      'Confirm whether a vehicle has been reported stolen or written off by Australian registries before you commit.',
  },
  {
    icon: Gauge,
    title: 'Odometer Verification',
    description:
      'Detect potential odometer rollbacks with recorded mileage data from previous registrations and services.',
  },
  {
    icon: FileSearch,
    title: 'Registration & Title Status',
    description:
      'Verify current registration status, expiry date, and check for any finance or encumbrance owing.',
  },
  {
    icon: Car,
    title: 'Accident & Damage History',
    description:
      'Uncover any recorded accident or structural damage so you know exactly what the car has been through.',
  },
  {
    icon: Wrench,
    title: 'Service & Recall Records',
    description:
      'See manufacturer recalls and available service intervals to understand how well the car was maintained.',
  },
  {
    icon: FileSearch,
    title: 'Market Valuation',
    description:
      'Get a data-driven valuation based on current Australian market prices so you can negotiate with confidence.',
  },
];

const STEPS = [
  {
    number: '01',
    title: 'Enter your VIN or number plate',
    description:
      'Type in any Australian vehicle identification number or number plate to start your check.',
  },
  {
    number: '02',
    title: 'We gather the data',
    description:
      'Our system pulls records from official Australian registries and databases within seconds.',
  },
  {
    number: '03',
    title: 'Download your report',
    description:
      'Receive a detailed, easy-to-read PDF report instantly. Use it to buy or sell with confidence.',
  },
];

const TESTIMONIALS = [
  {
    name: 'James R.',
    location: 'Sydney, NSW',
    rating: 5,
    text: 'Saved me from buying a written-off car. The report was instant and incredibly detailed. Highly recommend to anyone buying a used car in Australia.',
  },
  {
    name: 'Sophie T.',
    location: 'Brisbane, QLD',
    rating: 5,
    text: 'I used CheckMyVehicles before selling my car. The buyer was impressed I had a full report ready. Worth every cent for the peace of mind.',
  },
  {
    name: 'Michael C.',
    location: 'Melbourne, VIC',
    rating: 5,
    text: 'Found out the odometer had been tampered with. This service literally saved me thousands. Easy to use and the report was ready In Hours.',
  },
];

const FAQS = [
  {
    question: 'How do I check a car in Australia?',
    answer:
      'Simply enter the vehicle identification number (VIN) or number plate on our pricing page, choose a package, and complete your purchase. Your detailed report is generated instantly and ready to download.',
  },
  {
    question: 'What information is included in an CheckMyVehicles report?',
    answer:
      'Our reports include stolen and written-off status, odometer readings, registration details, accident damage history, encumbrance checks, safety recalls, service intervals, and a market valuation guide.',
  },
  {
    question: 'How long does it take to get my report?',
    answer:
      'Reports are generated instantly. Once your purchase is complete, you can download your PDF report immediately — no waiting required.',
  },
  {
    question: 'Is CheckMyVehicles available across all of Australia?',
    answer:
      'Yes. CheckMyVehicles covers all states and territories including New South Wales, Victoria, Queensland, Western Australia, South Australia, Tasmania, the Northern Territory, and the ACT.',
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={serviceJsonLd()} />
      <JsonLd data={faqJsonLd(FAQS)} />

      {/* Hero */}
      <section className="relative flex min-h-[58svh] items-center overflow-hidden pt-14 sm:min-h-[92vh] sm:pt-16">
        <HeroCarousel />
      </section>

      {/* Trust bar */}
      <section className="border-b border-border bg-muted/30 py-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { stat: '50,000+', label: 'Reports delivered' },
            { stat: '8', label: 'States & territories' },
            { stat: '1 Hour', label: 'Average report time' },
            { stat: '4.9/5', label: 'Customer rating' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p className="font-display text-3xl font-bold text-foreground">{item.stat}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Our Services
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              Everything checked, nothing missed
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our comprehensive car reports cover every critical detail you need to make an
              informed decision on your next vehicle.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => (
              <Reveal key={service.title} delay={i * 80}>
                <div className="group h-full rounded-2xl border border-border bg-white p-7 transition-all hover:border-primary/30 hover:shadow-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-foreground py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              How It Works
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              Get your car report in three simple steps
            </h2>
            <p className="mt-4 text-lg text-white/60">
              No paperwork, no waiting. Just enter your details and get a full report In Hours.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <Reveal key={step.number} delay={i * 100}>
                <div className="relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                  <span className="font-display text-5xl font-bold text-primary/30">
                    {step.number}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Testimonials
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              Trusted by Australian drivers
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join thousands of buyers and sellers who use CheckMyVehicles for peace of mind.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-white p-7 shadow-sm">
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star key={idx} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/80">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.location}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Pricing
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Choose the package that suits you. All prices in Australian dollars.
            </p>
          </Reveal>

          <div className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-2">
            {PACKAGES.map((pkg, i) => (
              <Reveal key={pkg.id} delay={i * 100}>
                <PricingCard {...pkg} popular={pkg.id === 'premium'} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              FAQ
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              Frequently asked questions
            </h2>
          </Reveal>

          <div className="mt-12 space-y-4">
            {FAQS.map((faq, i) => (
              <Reveal key={faq.question} delay={i * 60}>
                <div className="rounded-2xl border border-border bg-white p-6">
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-primary-foreground sm:text-4xl">
            Ready to check your next car?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Get a comprehensive car report In Hours. No subscriptions, no hidden fees.
          </p>
          <Link
            href="/pricing"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-primary shadow-lg transition-all hover:bg-white/90"
          >
            View pricing
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}