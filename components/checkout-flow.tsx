'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Bike,
  BusFront,
  Caravan,
  Check,
  CheckCircle2,
  CircleHelp,
  ClipboardCheck,
  LockKeyhole,
  MapPin,
  Phone,
  Ship,
  ShieldCheck,
  type LucideIcon,
  Truck,
  UserRound,
  CarFront,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PAYMENT_LINKS } from '@/lib/site';

const formSchema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your full name').max(80, 'Name is too long'),
  phoneNumber: z
    .string()
    .trim()
    .min(8, 'Please enter a valid phone number')
    .max(20, 'Phone number is too long'),
  vehicleType: z.enum([
    'Car',
    'SUV',
    'Van',
    'Truck',
    'Caravan',
    'Campervan',
    'Boat',
    'ATV',
    'Motorcycle',
    'Other',
  ], { required_error: 'Please select your vehicle type' }),
  vinOrPlate: z
    .string()
    .trim()
    .min(4, 'Please enter a valid VIN/Number plate')
    .max(18, 'VIN or Number plate is too long'),
  city: z.string().trim().min(2, 'Please enter your city').max(40, 'City name is too long'),
});

type FormValues = z.infer<typeof formSchema>;
type CheckoutPackage = (typeof import('@/lib/site').PACKAGES)[number];

const VEHICLE_TYPES: { label: FormValues['vehicleType']; icon: LucideIcon }[] = [
  { label: 'Car', icon: CarFront },
  { label: 'SUV', icon: CarFront },
  { label: 'Van', icon: BusFront },
  { label: 'Truck', icon: Truck },
  { label: 'Caravan', icon: Caravan },
  { label: 'Campervan', icon: BusFront },
  { label: 'Boat', icon: Ship },
  { label: 'ATV', icon: Bike },
  { label: 'Motorcycle', icon: Bike },
  { label: 'Other', icon: CircleHelp },
];

interface CheckoutFlowProps {
  selectedPackage: CheckoutPackage;
}

const inputClassName =
  'h-12 rounded-xl border-slate-200 bg-white px-4 shadow-sm placeholder:text-slate-400 focus-visible:border-sky-500 focus-visible:ring-sky-500/20';

export function CheckoutFlow({ selectedPackage }: CheckoutFlowProps) {
  const [step, setStep] = useState<'details' | 'review'>('details');
  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onTouched',
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      vehicleType: undefined,
      vinOrPlate: '',
      city: '',
    },
  });
  const paymentLink = PAYMENT_LINKS[selectedPackage.id];
  const values = form.getValues();

  const reviewDetails = async (formValues: FormValues) => {
    setIsSending(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/checkout-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formValues, packageId: selectedPackage.id }),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || 'Could not send your details. Please try again.');
      }

      setStep('review');
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Could not send your details. Please try again.',
      );
    } finally {
      setIsSending(false);
    }
  };

  const continueToPayment = () => {
    if (paymentLink) {
      window.location.assign(paymentLink);
    }
  };

  return (
    <div className="min-h-[80vh] bg-slate-50 pb-20 pt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-sky-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to packages
        </Link>

        <div className="mt-8 overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-8 text-white shadow-xl shadow-slate-900/10 sm:px-10 sm:py-10">
          <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-sky-200">
                <ShieldCheck className="h-4 w-4" />
                A smarter way to buy with confidence
              </div>
              <h1 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Let&apos;s get your vehicle report started.
              </h1>
              <p className="mt-3 max-w-lg text-sm leading-6 text-slate-300 sm:text-base">
                Share a few details, check everything is right, and you&apos;ll be ready for secure
                payment.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start md:self-auto">
              <StepIndicator number="01" label="Your details" active={step === 'details'} complete={step === 'review'} />
              <div className="h-px w-8 bg-white/20 sm:w-12" />
              <StepIndicator number="02" label="Review" active={step === 'review'} complete={false} />
            </div>
          </div>
        </div>

        <div className="mt-7 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
            {step === 'details' ? (
              <>
                <div className="mb-7">
                  <p className="text-sm font-semibold text-sky-700">STEP 1 OF 2</p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                    Your details
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Enter your contact and vehicle information. You&apos;ll be able to review it
                    before continuing.
                  </p>
                </div>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(reviewDetails)}
                    className="space-y-5"
                    noValidate
                  >
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-slate-800">
                            Full name
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                              <Input
                                className={`${inputClassName} pl-11`}
                                placeholder="e.g. Alex Taylor"
                                autoComplete="name"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid gap-5 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-slate-800">
                              Mobile number
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                <Input
                                  className={`${inputClassName} pl-11`}
                                  placeholder="0412 345 678"
                                  autoComplete="tel"
                                  type="tel"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-slate-800">
                              City
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                <Input
                                  className={`${inputClassName} pl-11`}
                                  placeholder="e.g. Melbourne"
                                  autoComplete="address-level2"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="vehicleType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-slate-800">
                            Select your vehicle type
                          </FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value ?? ''}
                            >
                              <SelectTrigger className="h-14 rounded-xl border-2 border-slate-300 bg-white px-3 shadow-sm transition-colors hover:border-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/15 data-[placeholder]:text-slate-400">
                                <div className="flex min-w-0 items-center gap-3 text-left">
                                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
                                    {(() => {
                                      const SelectedIcon =
                                        VEHICLE_TYPES.find(
                                          (vehicleType) => vehicleType.label === field.value,
                                        )?.icon ?? CarFront;
                                      return <SelectedIcon className="h-5 w-5" />;
                                    })()}
                                  </div>
                                  <SelectValue placeholder="Choose a vehicle type" />
                                </div>
                              </SelectTrigger>
                              <SelectContent className="max-h-80 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                                {VEHICLE_TYPES.map(({ label, icon: VehicleIcon }) => (
                                  <SelectItem
                                    key={label}
                                    value={label}
                                    className="gap-3 cursor-pointer rounded-lg py-2.5 pl-9 pr-3 focus:bg-sky-50 focus:text-sky-900"
                                    icon={<VehicleIcon className="h-4 w-4 text-sky-700" />}
                                  >
                                    <span className="font-medium">{label}</span>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="vinOrPlate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-slate-800">
                            VIN or Number plate
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <CarFront className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                              <Input
                                className={`${inputClassName} pl-11`}
                                placeholder="e.g. 1HGCM82633A123456 or ABC123"
                                autoCapitalize="characters"
                                {...field}
                                onChange={(event) => field.onChange(event.target.value.toUpperCase())}
                              />
                            </div>
                          </FormControl>
                          <p className="text-xs leading-5 text-slate-500">
                            You can find the VIN on the dashboard or inside the driver&apos;s door.
                          </p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex items-center gap-3 rounded-2xl border border-sky-100 bg-sky-50/80 p-4 text-sm text-slate-600">
                      <LockKeyhole className="h-5 w-5 shrink-0 text-sky-700" />
                      <p>Your details are only used to prepare your vehicle report.</p>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="h-12 w-full rounded-xl text-sm font-semibold shadow-md shadow-sky-600/15"
                      disabled={isSending}
                    >
                      {isSending ? 'Processing...' : 'Review your details'}
                      {!isSending && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                    {submitError && (
                      <p role="alert" className="text-sm font-medium text-red-600">
                        {submitError}
                      </p>
                    )}
                  </form>
                </Form>
              </>
            ) : (
              <>
                <div className="mb-7">
                  <p className="text-sm font-semibold text-sky-700">STEP 2 OF 2</p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                    Review your details
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Please check the information below before continuing.
                  </p>
                </div>

                <div className="space-y-3">
                  <ReviewRow icon={UserRound} label="Full name" value={values.fullName} />
                  <ReviewRow icon={Phone} label="Mobile number" value={values.phoneNumber} />
                  <ReviewRow icon={CarFront} label="Vehicle type" value={values.vehicleType} />
                  <ReviewRow icon={CarFront} label="VIN / Number plate" value={values.vinOrPlate} />
                  <ReviewRow icon={MapPin} label="City" value={values.city} />
                </div>

                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="mt-5 text-sm font-semibold text-sky-700 transition hover:text-sky-900"
                >
                  Edit my details
                </button>

                {/* <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                  <div className="flex gap-3">
                    <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
                    <div>
                      <p className="text-sm font-semibold text-amber-950">
                        Secure payment setup is coming soon
                      </p>
                      <p className="mt-1 text-sm leading-5 text-amber-900/80">
                        Your details haven&apos;t been submitted. The payment link will appear here
                        once it&apos;s ready.
                      </p>
                    </div>
                  </div>
                </div> */}

                <Button
                  type="button"
                  size="lg"
                  className="mt-5 h-12 w-full rounded-xl text-sm font-semibold"
                  onClick={continueToPayment}
                  disabled={!paymentLink}
                >
                  Continue to Payment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </>
            )}
          </section>

          <aside className="space-y-4 lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
              <div className="bg-gradient-to-br from-sky-600 to-cyan-500 p-6 text-white">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-semibold">
                    YOUR SELECTION
                  </span>
                  <BadgeCheck className="h-6 w-6 text-white/90" />
                </div>
                <h2 className="mt-5 text-xl font-bold">{selectedPackage.name}</h2>
                <p className="mt-1 text-sm text-white/80">One-time payment · No subscription</p>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="text-sm font-medium text-white/80">AUD</span>
                  <span className="text-4xl font-bold">${selectedPackage.price}</span>
                  <span className="text-sm text-white/80">/ report</span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Included in your report
                </p>
                <ul className="mt-4 space-y-3">
                  {selectedPackage.features.slice(0, 5).map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-sm leading-5 text-slate-600">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {selectedPackage.features.length > 5 && (
                  <p className="mt-3 pl-6 text-xs font-medium text-sky-700">
                    + {selectedPackage.features.length - 5} more benefits
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <ClipboardCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Clear, upfront pricing</p>
                  <p className="mt-0.5 text-xs text-slate-500">No hidden fees or subscriptions</p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <p className="mt-7 flex items-center justify-center gap-2 text-center text-xs text-slate-500">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          Your package and price are shown above before you continue.
        </p>
      </div>
    </div>
  );
}

function StepIndicator({
  number,
  label,
  active,
  complete,
}: {
  number: string;
  label: string;
  active: boolean;
  complete: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs font-bold ${
          active || complete
            ? 'border-sky-400 bg-sky-400 text-slate-950'
            : 'border-white/20 bg-white/5 text-white/50'
        }`}
      >
        {complete ? <Check className="h-4 w-4" /> : number}
      </span>
      <span className={`hidden text-xs font-semibold sm:block ${active ? 'text-white' : 'text-white/50'}`}>
        {label}
      </span>
    </div>
  );
}

function ReviewRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof UserRound;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-sky-700 shadow-sm">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <p className="mt-1 break-words text-sm font-semibold text-slate-900">{value}</p>
      </div>
    </div>
  );
}
