import { notFound } from 'next/navigation';
import { CheckoutFlow } from '@/components/checkout-flow';
import { PACKAGES } from '@/lib/site';

interface CheckoutPageProps {
  searchParams: {
    package?: string;
  };
}

export default function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const selectedPackage = PACKAGES.find((item) => item.id === searchParams.package);

  if (!selectedPackage) {
    notFound();
  }

  return <CheckoutFlow selectedPackage={selectedPackage} />;
}
