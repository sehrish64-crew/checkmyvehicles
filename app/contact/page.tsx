'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Loader2,
  MessageSquare,
} from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/reveal';

const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name').max(80, 'Name is too long'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .min(8, 'Please enter a valid Australian phone number')
    .max(20, 'Phone number is too long'),
  message: z
    .string()
    .min(10, 'Please enter a message (at least 10 characters)')
    .max(1000, 'Message is too long'),
});

type ContactValues = z.infer<typeof contactSchema>;

const CONTACT_INFO = [
  {
    icon: Mail,
    label: 'Email',
    value: 'info@checkmyvehicles.com',
    href: 'mailto:info@checkmyvehicles.com',
  },
  // {
  //   icon: Phone,
  //   label: 'Phone',
  //   value: '1300 288 683',
  //   href: 'tel:1300288683',
  // },
  {
    icon: MapPin,
    label: 'Office',
    value: 'Level 12, 420 Collins Street, Melbourne VIC 3000',
    href: null,
  },
  {
    icon: Clock,
    label: 'Hours',
    value: '24/7 Support',
    href: null,
  },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [emailSent, setEmailSent] = useState(true);
  const [submitError, setSubmitError] = useState('');

  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', phone: '', message: '' },
  });

  const onSubmit = async (values: ContactValues) => {
    setSubmitError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const result = (await response.json()) as {
        success?: boolean;
        emailSent?: boolean;
        error?: string;
      };
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Contact request failed');
      }

      setEmailSent(result.emailSent === true);
      setSent(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'We could not send your message right now. Please try again later.',
      );
    }
  };

  const resetForm = () => {
    setSent(false);
    setEmailSent(true);
    setSubmitError('');
    form.reset();
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-foreground pb-16 pt-24 text-white sm:pb-20 sm:pt-32">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
              Contact
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold sm:text-5xl">
              We&apos;re here to help
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-white/65 sm:mt-4 sm:text-lg">
              Got a question about your vehicle report or need a hand? Our Australian-based team
              is ready to assist.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact cards */}
      <section className="-mt-6 pb-10 sm:-mt-8 sm:pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {CONTACT_INFO.map((item, i) => (
              <Reveal key={item.label} delay={i * 60}>
                <div className="h-full rounded-2xl border border-border bg-white p-4 text-center shadow-sm sm:p-6">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-12 sm:w-12">
                    <item.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <h3 className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:mt-4 sm:text-sm">
                    {item.label}
                  </h3>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="mt-1 block break-words text-xs font-medium text-foreground hover:text-primary sm:text-sm"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-xs font-medium leading-relaxed text-foreground sm:text-sm">
                      {item.value}
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-sky-50/80 via-slate-50 to-white py-12 sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-sky-200/40 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5 sm:rounded-3xl sm:shadow-2xl">
              <div className="flex items-center gap-3 border-b border-slate-100 bg-gradient-to-r from-sky-50 to-white px-5 py-4 sm:gap-4 sm:px-10 sm:py-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-12 sm:w-12 sm:rounded-2xl">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold sm:text-2xl">Send us a message</h2>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    Tell us how we can help and our team will be in touch.
                  </p>
                </div>
              </div>

              {!sent ? (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5 p-5 sm:space-y-6 sm:p-10"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Smith" autoComplete="name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="john@example.com.au"
                                autoComplete="email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="0412 345 678"
                              autoComplete="tel"
                              {...field}
                          />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="How can we help you?"
                              className="min-h-32 resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {submitError && (
                      <p role="alert" className="text-sm text-destructive">
                        {submitError}
                      </p>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              ) : (
                <div className="flex flex-col items-center p-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="mt-6 text-xl font-semibold">
                    {emailSent ? 'Message sent!' : 'Message saved!'}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {emailSent
                      ? 'Thanks for reaching out. Our team will get back to you within one business day.'
                      : 'Your message is safely saved. Email notifications are temporarily unavailable, so you do not need to submit it again.'}
                  </p>
                  <Button variant="outline" className="mt-6" onClick={resetForm}>
                    Send another message
                  </Button>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}