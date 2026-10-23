import Link from 'next/link';
import { Target, Eye, Heart, Users, ShieldCheck, TrendingUp, ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { pageMetadata, breadcrumbJsonLd, organizationJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';

export const metadata = pageMetadata({
  title: 'About CheckMyVehicles — Australia\'s Trusted Car Report Service',
  description:
    'CheckMyVehicles was founded to give every Australian driver confidence when buying or selling a car. Learn about our mission, values, and the team behind Australia\'s most trusted Car Checks service.',
  path: '/about',
});

const ABOUT_IMAGE_1 =
  'https://images.pexels.com/photos/4315575/pexels-photo-4315575.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop';
const ABOUT_IMAGE_2 =
  'https://images.pexels.com/photos/5050535/pexels-photo-5050535.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop';

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Trust & Transparency',
    description:
      'We believe every Australian deserves the full story before they buy a car. Our reports are accurate, clear, and never hide the facts.',
  },
  {
    icon: TrendingUp,
    title: 'Data-Driven Accuracy',
    description:
      'We source data from official Australian registries to deliver reliable, up-to-date information you can act on.',
  },
  {
    icon: Heart,
    title: 'Customer First',
    description:
      'From instant reports to responsive support, everything we do is designed around making your experience seamless.',
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />

      {/* Hero */}
      <section className="bg-foreground pb-16 pt-24 text-white sm:pb-20 sm:pt-32">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
              About Us
            </p>
            <h1 className="mt-2 font-display text-2xl font-bold leading-tight sm:text-5xl">
              Empowering Australian drivers with knowledge
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-white/65 sm:mt-4 sm:text-lg">
              CheckMyVehicles was founded to bring transparency to the used Vehicle market giving
              every buyer and seller the information they need to make confident decisions.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="py-12 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2">
            <Reveal>
              <img
                src={ABOUT_IMAGE_1}
                alt="Mechanic carefully checking a car engine in a professional Australian workshop"
                className="max-h-72 w-full rounded-2xl object-cover shadow-lg sm:max-h-none"
              />
            </Reveal>
            <Reveal delay={100}>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
                Our Story
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold leading-tight sm:text-4xl">
                Built by Australians, for Australians
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:mt-4 sm:text-lg">
                CheckMyVehicles was born out of a simple frustration: buying a used car in Australia
                meant taking someone at their word. We knew there was a better way.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Founded in Melbourne in 2019, our team set out to build a service that gives
                every driver instant access to the facts behind a vehicle. By pulling together
                data from official Australian registries and databases, we deliver comprehensive
                reports that tell you everything you need to know — from stolen status and
                odometer readings to encumbrance checks and accident history.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Today, over 50,000 Australian drivers have used CheckMyVehicles to buy or sell with
                confidence. Whether you&apos;re in Sydney, Perth, Brisbane, or a regional town,
                we&apos;re here to help you make the right call.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-muted/30 py-12 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:gap-8 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-12 sm:w-12">
                  <Target className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold sm:mt-5 sm:text-xl">Our Mission</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  To make comprehensive Car Checkss accessible to every Australian driver — fast,
                  affordable, and reliable. We want to eliminate the risk and uncertainty from
                  buying and selling used cars across the country.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="h-full rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-12 sm:w-12">
                  <Eye className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold sm:mt-5 sm:text-xl">Our Vision</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  A future where no Australian buys a car without knowing its full history.
                  We aim to be the most trusted name in Car Checkss nationwide, setting the
                  standard for transparency in the automotive market.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
              Our Values
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-4xl">
              What drives us every day
            </h2>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:mt-16 sm:gap-8 md:grid-cols-3">
            {VALUES.map((value, i) => (
              <Reveal key={value.title} delay={i * 80}>
                <div className="h-full rounded-2xl border border-border bg-white p-5 transition-all hover:shadow-lg sm:p-7">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-12 sm:w-12">
                    <value.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold sm:mt-5 sm:text-lg">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-foreground py-12 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 text-center md:grid-cols-3">
            <Reveal>
              <Users className="mx-auto h-8 w-8 text-primary sm:h-10 sm:w-10" />
              <p className="mt-3 font-display text-3xl font-bold sm:mt-4 sm:text-4xl">50,000+</p>
              <p className="mt-1 text-sm text-white/60 sm:text-base">Australian drivers served</p>
            </Reveal>
            <Reveal delay={100}>
              <ShieldCheck className="mx-auto h-8 w-8 text-primary sm:h-10 sm:w-10" />
              <p className="mt-3 font-display text-3xl font-bold sm:mt-4 sm:text-4xl">8</p>
              <p className="mt-1 text-sm text-white/60 sm:text-base">States & territories covered</p>
            </Reveal>
            <Reveal delay={200}>
              <TrendingUp className="mx-auto h-8 w-8 text-primary sm:h-10 sm:w-10" />
              <p className="mt-3 font-display text-3xl font-bold sm:mt-4 sm:text-4xl">99.8%</p>
              <p className="mt-1 text-sm text-white/60 sm:text-base">Customer satisfaction rate</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Image section */}
      <section className="py-12 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="relative overflow-hidden rounded-2xl">
            <img
              src={ABOUT_IMAGE_2}
              alt="Modern automotive showroom with high-quality cars, representing CheckMyVehicles's commitment to quality"
              className="h-64 w-full object-cover sm:h-96"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="max-w-2xl px-5 text-center sm:px-6">
                <h2 className="font-display text-2xl font-bold leading-tight text-white sm:text-4xl">
                  Committed to a fairer car market
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-lg">
                  Every report we generate brings us closer to a market where honesty is the norm,
                  not the exception.
                </p>
                <Link
                  href="/pricing"
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 sm:mt-6 sm:px-6"
                >
                  Get your car report
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}