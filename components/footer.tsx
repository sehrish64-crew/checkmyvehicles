import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Shield } from 'lucide-react';
import { Logo } from '@/components/logo';
import { SITE, NAV_LINKS } from '@/lib/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-foreground text-white">
      <div className="mx-auto max-w-7xl px-4 pb-5 pt-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo variant="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              {SITE.description}
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={SITE.social.facebook}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                aria-label="Facebook"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={SITE.social.instagram}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                aria-label="Instagram"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={SITE.social.linkedin}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                aria-label="LinkedIn"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">
              Pages
            </h3>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">
              Contact
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                <span>
                  {SITE.address.street}, {SITE.address.suburb} {SITE.address.state} {SITE.address.postcode}
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Phone className="h-4 w-4 shrink-0 text-white/40" />
                <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="hover:text-white">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Mail className="h-4 w-4 shrink-0 text-white/40" />
                <a href={`mailto:${SITE.email}`} className="hover:text-white">
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">
              Why CheckMyVehicles
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <Shield className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                Trusted by over 50,000 Australian drivers
              </li>
              <li className="flex items-start gap-3 text-sm text-white/60">
                <Shield className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                Data sourced from official Australian registries
              </li>
              <li className="flex items-start gap-3 text-sm text-white/60">
                <Shield className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                Instant reports delivered in minutes
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-5 text-center sm:mt-12 sm:pt-8">
          <p className="whitespace-nowrap text-[9px] text-white/40 sm:text-xs">
            © {year} {SITE.name} · ABN {SITE.abn} · All rights reserved
            <span className="hidden sm:inline"> · Built for Australian drivers</span>
            {' · Prices in AUD'}
          </p>
        </div>
      </div>
    </footer>
  );
}
