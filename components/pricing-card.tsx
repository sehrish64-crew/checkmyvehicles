import Link from 'next/link';
import { Check, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface PricingCardProps {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
  compact?: boolean;
}

export function PricingCard({
  id,
  name,
  price,
  description,
  features,
  popular,
  compact = false,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-300',
        popular
          ? 'border-primary shadow-xl shadow-primary/10 lg:-translate-y-4'
          : 'border-border shadow-sm hover:border-primary/30 hover:shadow-lg'
      )}
    >
      {popular && (
        <div className="absolute right-0 top-0 flex items-center gap-1 rounded-bl-xl bg-primary px-3 py-1.5 text-[11px] font-semibold text-primary-foreground sm:px-4 sm:py-2 sm:text-xs">
          <Star className="h-3 w-3 fill-current" />
          Most Popular
        </div>
      )}

      <div className={cn(compact ? 'p-5 sm:p-7' : 'p-8')}>
        <h3 className={cn(compact ? 'text-base sm:text-lg' : 'text-lg', 'font-semibold')}>{name}</h3>
        <p className={cn('mt-2 leading-relaxed text-muted-foreground', compact ? 'text-xs sm:text-sm' : 'text-sm')}>
          {description}
        </p>

        <div className={cn('mt-5 flex items-baseline gap-1 sm:mt-6', !compact && 'mt-6')}>
          <span className={cn('font-medium text-muted-foreground', compact ? 'text-xs sm:text-sm' : 'text-sm')}>AUD</span>
          <span className={cn('font-bold tracking-tight', compact ? 'text-4xl sm:text-5xl' : 'text-5xl')}>${price}</span>
          <span className={cn('text-muted-foreground', compact ? 'text-xs sm:text-sm' : 'text-sm')}>/ report</span>
        </div>

        <Button
          className={cn('mt-5 w-full sm:mt-6', !compact && 'mt-6')}
          size="lg"
          variant={popular ? 'default' : 'outline'}
          asChild
        >
          <Link href={`/checkout?package=${id}`}>
            Buy Now
          </Link>
        </Button>
      </div>

      <div className={cn('mt-auto border-t border-border bg-muted/30', compact ? 'p-5 sm:p-7' : 'p-8')}>
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:mb-4 sm:text-xs">
          What&apos;s included
        </p>
        <ul className={cn(compact ? 'space-y-2.5 sm:space-y-3' : 'space-y-3')}>
          {features.map((feature) => (
            <li key={feature} className={cn('flex items-start', compact ? 'gap-2 text-xs sm:gap-3 sm:text-sm' : 'gap-3 text-sm')}>
              <span
                className={cn(
                  'mt-0.5 flex shrink-0 items-center justify-center rounded-full',
                  compact ? 'h-4 w-4 sm:h-5 sm:w-5' : 'h-5 w-5',
                  popular ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                )}
              >
                <Check className={compact ? 'h-2.5 w-2.5 sm:h-3 sm:w-3' : 'h-3 w-3'} />
              </span>
              <span className="text-foreground/80">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}