import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export function Logo({ className, variant = 'dark' }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        'inline-flex shrink-0 transition-opacity hover:opacity-80',
        variant === 'light' ? 'w-[190px] sm:w-[220px]' : 'w-[155px] sm:w-[180px]',
        className
      )}
      aria-label="CheckMyVehicles home"
    >
      <Image
        src={
          variant === 'light'
            ? '/checkmyvehicles-logo-light.png'
            : '/checkmyvehicles-logo-dark.png'
        }
        alt="CheckMyVehicles"
        width={859}
        height={175}
        className="h-auto w-full"
        priority
      />
    </Link>
  );
}
