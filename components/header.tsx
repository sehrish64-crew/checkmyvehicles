'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/logo';
import { NAV_LINKS } from '@/lib/site';

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const transparent = pathname === '/' && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        transparent
          ? 'border-b border-transparent bg-transparent'
          : 'border-b border-border bg-white/95 shadow-sm backdrop-blur-md'
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo variant={transparent ? 'light' : 'dark'} />

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'relative rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                    active
                      ? 'text-primary'
                      : transparent
                        ? 'text-white/85 hover:text-white'
                        : 'text-foreground/70 hover:text-foreground'
                  )}
                >
                  {link.label}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:block">
          <Link
            href="/pricing"
            className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
          >
            Get Started
          </Link>
        </div>

        <button
          className={cn(
            'inline-flex items-center justify-center rounded-lg p-2 md:hidden',
            transparent ? 'text-white' : 'text-foreground'
          )}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          'overflow-hidden border-t border-border bg-white transition-all duration-300 md:hidden',
          open ? 'max-h-96 opacity-100' : 'max-h-0 border-transparent opacity-0'
        )}
      >
        <ul className="space-y-1 px-4 py-4">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'block rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                    active
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground/80 hover:bg-muted'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href="/pricing"
              className="mt-2 block rounded-lg bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground"
            >
              Get Started
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}