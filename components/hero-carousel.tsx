'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Car,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileSearch,
  Gauge,
  MapPin,
  ShieldCheck,
  ThumbsUp,
  Wrench,
} from 'lucide-react';

const HERO_SLIDES = [
  {
    image:
      'https://images.pexels.com/photos/8478259/pexels-photo-8478259.jpeg?auto=compress&cs=tinysrgb&w=2400&h=1400&fit=crop',
    heading: "Know your vehicle's full story before you buy or sell",
    description:
      'CheckMyVehicles delivers instant, comprehensive Digital Pdf Reports across Australia. Check any vehicle by VIN or number plate in minutes — stolen status, odometer, registration, encumbrance and more.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=2400&q=90',
    heading: 'Inspect with confidence before you make your move',
    description:
      'Get the details that matter before you buy. Check a vehicle’s history, registration and condition with a comprehensive report.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2400&q=90',
    heading: 'Uncover a vehicle’s history before you commit',
    description:
      'Make a more informed decision with helpful vehicle records, odometer information and checks in one easy-to-read report.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2400&q=90',
    heading: 'Buy your next vehicle with confidence',
    description:
      'Check any Australian vehicle by VIN or number plate and get the important information you need before you buy or sell.',
  },
];

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [typedText, setTypedText] = useState({ slide: -1, heading: 0, description: 0 });
  const activeSlide = HERO_SLIDES[activeIndex];

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % HERO_SLIDES.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [paused]);

  useEffect(() => {
    const { heading, description } = HERO_SLIDES[activeIndex];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let headingPosition = 0;
    let descriptionPosition = 0;
    let timeout: number;

    setTypedText({
      slide: activeIndex,
      heading: reducedMotion ? heading.length : 0,
      description: reducedMotion ? description.length : 0,
    });

    if (reducedMotion) {
      return;
    }

    const typeDescription = () => {
      if (descriptionPosition >= description.length) {
        return;
      }

      descriptionPosition += 1;
      setTypedText({ slide: activeIndex, heading: heading.length, description: descriptionPosition });
      timeout = window.setTimeout(typeDescription, 12);
    };

    const typeHeading = () => {
      if (headingPosition >= heading.length) {
        timeout = window.setTimeout(typeDescription, 180);
        return;
      }

      headingPosition += 1;
      setTypedText({ slide: activeIndex, heading: headingPosition, description: 0 });
      timeout = window.setTimeout(typeHeading, 28);
    };

    timeout = window.setTimeout(typeHeading, 120);
    return () => window.clearTimeout(timeout);
  }, [activeIndex]);

  const showPrevious = () => {
    setActiveIndex((index) => (index - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };
  const showNext = () => {
    setActiveIndex((index) => (index + 1) % HERO_SLIDES.length);
  };

  return (
    <>
      <div
        className="absolute inset-0"
        role="region"
        aria-label="Featured vehicle images"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setPaused(false);
          }
        }}
      >
        {HERO_SLIDES.map((slide, index) => (
          <img
            key={slide.image}
            src={slide.image}
            alt=""
            aria-hidden="true"
            loading={index === 0 ? 'eager' : 'lazy'}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              index === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="hero-overlay absolute inset-0" />

        <div className="absolute bottom-4 right-3 z-10 flex items-center gap-1.5 sm:bottom-6 sm:right-8 sm:gap-2">
          <button
            type="button"
            onClick={showPrevious}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-10 sm:w-10"
            aria-label="Show previous banner image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2" aria-label={`Slide ${activeIndex + 1} of ${HERO_SLIDES.length}`}>
            {HERO_SLIDES.map((slide, index) => (
              <button
                key={slide.image}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === activeIndex ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Show banner image ${index + 1}`}
                aria-current={index === activeIndex ? 'true' : undefined}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={showNext}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-10 sm:w-10"
            aria-label="Show next banner image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 pt-10 pb-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm sm:mb-6 sm:px-4 sm:text-sm">
            <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Trusted by 50,000+ Australian drivers
          </div>
          <h1
            className="hero-title grid text-2xl font-bold leading-[1.08] text-white sm:text-5xl sm:leading-tight lg:text-6xl"
            aria-label={activeSlide.heading}
          >
            <span className="invisible col-start-1 row-start-1" aria-hidden="true">
              {activeSlide.heading}
            </span>
            <span className="col-start-1 row-start-1" aria-hidden="true">
              {activeIndex === typedText.slide
                ? activeSlide.heading.slice(0, typedText.heading)
                : ''}
              {activeIndex === typedText.slide &&
                typedText.heading < activeSlide.heading.length && (
                  <span className="hero-typewriter-cursor">|</span>
                )}
            </span>
          </h1>
          <p
            className="mt-3 grid h-11 max-w-2xl overflow-hidden text-sm leading-[1.4rem] text-white/80 sm:mt-6 sm:h-auto sm:overflow-visible sm:text-lg sm:leading-relaxed"
            aria-label={activeSlide.description}
          >
            <span className="invisible col-start-1 row-start-1" aria-hidden="true">
              {activeSlide.description}
            </span>
            <span className="col-start-1 row-start-1" aria-hidden="true">
              {activeIndex === typedText.slide
                ? activeSlide.description.slice(0, typedText.description)
                : ''}
              {activeIndex === typedText.slide &&
                typedText.heading === activeSlide.heading.length &&
                typedText.description < activeSlide.description.length && (
                  <span className="hero-typewriter-cursor">|</span>
                )}
            </span>
          </p>
          <div className="mt-5 flex flex-row gap-2 sm:mt-8 sm:gap-4">
            <Link
              href="/pricing"
              className="inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-primary px-3 py-2.5 text-xs font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl sm:min-h-0 sm:flex-none sm:gap-2 sm:px-6 sm:py-3.5 sm:text-sm"
            >
              Get your vehicle report
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex min-h-10 flex-1 items-center justify-center whitespace-nowrap rounded-lg border border-white/30 bg-white/5 px-3 py-2.5 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 sm:min-h-0 sm:flex-none sm:px-6 sm:py-3.5 sm:text-sm"
            >
              Learn more
            </Link>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-white/70 sm:mt-12 sm:gap-x-8 sm:gap-y-4 sm:text-sm">
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" /> Reports in minutes
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> All Australian states
            </span>
            <span className="flex items-center gap-2">
              <ThumbsUp className="h-4 w-4" /> Official registry data
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
