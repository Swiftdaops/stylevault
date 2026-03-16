'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner'
import { API_BASE_URL, formatCurrency } from '@/lib/barber-api';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { getBarberStoreUrl } from '@/lib/seo';
import { format as formatDate } from 'date-fns';
import DatePickerDemo from './date-picker-demo';
import TimePickerDemo from './time-picker-demo';
import InstallAfterBookingCard from '@/components/install-after-booking-card'
import { requestCustomerBookingNotificationPreference, showBookingStatusNotification } from '@/lib/customer-booking-notifications';
import { withBookingManagerFeedback } from '@/lib/customer-booking-links'

function buildWhatsAppUrl(rawPhone, customerName) {
  const phone = String(rawPhone || '').replace(/\D/g, '');
  if (!phone) return '';
  const message = `Hi, I'm ${customerName}. Nice to meet you.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export default function BarberBookingForm({ barber, services }) {
  const searchParams = useSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [emailNotice, setEmailNotice] = useState('');
  const [manageLink, setManageLink] = useState('');
  const [bookingSummary, setBookingSummary] = useState(null);
  const [whatsAppHref, setWhatsAppHref] = useState('');
  const [form, setForm] = useState({
    customerName: '',
    customerEmail: '',
    phone: '',
    service: services[0]?._id || '',
    date: '',
    time: '',
  });

  useEffect(() => {
    const date = searchParams.get('date');
    const serviceId = searchParams.get('service');
    const time = searchParams.get('time');

    setForm((current) => {
      const next = { ...current };
      if (date) next.date = date;
      if (time) next.time = time;
      if (serviceId && services.some((s) => s._id === serviceId)) {
        next.service = serviceId;
      }
      return next;
    });
  }, [searchParams, services]);

  const serviceOptions = useMemo(
    () =>
      services.map((service) => ({
        ...service,
        value: service._id,
        label: `${service.name} · ${formatCurrency(service.price, barber?.currency || 'USD')}`,
      })),
    [services, barber?.currency],
  );

  const selectedService = serviceOptions.find((service) => service.value === form.service) || serviceOptions[0] || null;

  const handleChange = (event) => {
    const { id, value } = event.target;

    setForm((current) => {
      const next = {
        ...current,
        [id]: value,
      };

      return next;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');
    setEmailNotice('');
    setManageLink('');
    setBookingSummary(null);
    setWhatsAppHref('');

    try {
      if (!barber?._id) {
        throw new Error('Barber profile is unavailable.');
      }

      if (!selectedService?._id) {
        throw new Error('Please choose a service.');
      }
      if (!form.date) {
        throw new Error('Please choose a date.');
      }
      if (!form.time) {
        throw new Error('Please choose a time.');
      }

      const notificationPreference = await requestCustomerBookingNotificationPreference().catch(() => null)

      const response = await fetch(`${API_BASE_URL}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          barberId: barber._id,
          serviceId: selectedService._id,
          customerName: form.customerName,
          customerEmail: form.customerEmail,
          phone: form.phone,
          date: form.date,
          time: form.time,
          price: Number(selectedService.price),
          notificationPreference,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Booking failed');
      }

      const bookingStatus = data?.appointment?.status || 'pending'
      const nextManageLink = withBookingManagerFeedback(data?.manageLink || '', {
        created: '1',
        email: data?.emailError ? 'pending' : 'sent',
      })

      setSuccess(`Your request has been sent to ${barber.name}. We will notify ${form.customerEmail} once the booking is confirmed.`);
      setBookingSummary({
        appName: barber.name,
        serviceName: selectedService.name,
        appointmentDate: form.date,
        appointmentTime: form.time,
      });
      setManageLink(nextManageLink);
      toast.success('Booking request sent', {
        description: `${selectedService.name} request sent to ${barber.name}. Redirecting you to your booking details.`,
      })

      if (notificationPreference?.permission === 'granted' && !data?.customerPushResult?.sent) {
        void showBookingStatusNotification({
          status: bookingStatus,
          providerName: barber.name,
          serviceName: selectedService.name,
          appointmentDate: form.date,
          appointmentTime: form.time,
        });
      }

      if (data?.emailError) {
        setEmailNotice(`Your booking was saved, but the booking email could not be sent right now: ${data.emailError}`);
        toast.warning('Booking saved, but email is pending', {
          description: data.emailError,
        })
      } else {
        setEmailNotice(`Booking email sent to ${form.customerEmail}.`);
        toast.info('Booking email sent', {
          description: `A booking update was sent to ${form.customerEmail}.`,
        })
      }

      const whatsappUrl = buildWhatsAppUrl(barber?.whatsapp, form.customerName)
      setWhatsAppHref(whatsappUrl)

      if (nextManageLink && typeof window !== 'undefined') {
        window.setTimeout(() => {
          window.location.assign(nextManageLink)
        }, 150)
        return
      }

      setForm({
        customerName: '',
        customerEmail: '',
        phone: '',
        service: selectedService._id,
        date: '',
        time: '',
      });
    } catch (submitError) {
      setError(submitError.message || 'Booking failed');
      toast.error('Booking failed', {
        description: submitError.message || 'Please try again.',
      })
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <form className="rounded-3xl border-[3px] border-orange-200 bg-white p-6 shadow-xl dark:border-stone-800 dark:bg-stone-950" onSubmit={handleSubmit}>
        <div className="mb-6 space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-amber-300">Booking details</p>
          <h1 className="text-3xl font-bold tracking-tight">Book with {barber.name}</h1>
          <p className="text-sm text-stone-600 dark:text-amber-200">
            Fill in your details below to reserve your appointment and receive a booking update email.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-2 sm:col-span-2">
            <span className="text-sm font-medium">Customer name</span>
            <input id="customerName" value={form.customerName} onChange={handleChange} required className="w-full rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 outline-none transition focus:border-orange-400 dark:border-stone-700 dark:bg-stone-900" />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium">Email</span>
            <input id="customerEmail" type="email" value={form.customerEmail} onChange={handleChange} required className="w-full rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 outline-none transition focus:border-orange-400 dark:border-stone-700 dark:bg-stone-900" />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium">Phone</span>
            <input id="phone" value={form.phone} onChange={handleChange} className="w-full rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 outline-none transition focus:border-orange-400 dark:border-stone-700 dark:bg-stone-900" />
          </label>

          <label className="space-y-2 sm:col-span-2">
            <span className="text-sm font-medium">Service</span>
            <div className="w-full">
              <Select value={form.service} onValueChange={(value) => setForm((c) => ({ ...c, service: value }))}>
                <SelectTrigger className="w-full rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 outline-none">
                  <SelectValue placeholder={serviceOptions.length ? serviceOptions[0].label : 'No services available'} />
                </SelectTrigger>
                <SelectContent>
                  {serviceOptions.map((service) => (
                    <SelectItem key={service._id} value={service._id}>{service.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium">Date</span>
            <div>
              <DatePickerDemo
                value={form.date ? form.date : undefined}
                onChange={(d) => {
                  const iso = d ? formatDate(d, 'yyyy-MM-dd') : '';
                  setForm((current) => ({ ...current, date: iso }));
                }}
              />
            </div>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium">Time</span>
            <div>
              <TimePickerDemo
                value={form.time ? form.time : undefined}
                onChange={(t) => {
                  setForm((current) => ({ ...current, time: t }));
                }}
              />
            </div>
          </label>

        </div>

        {error ? <p className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</p> : null}
        {success ? (
          <div id="bookingSuccess" className="mt-4 rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300">
            {success}
          </div>
        ) : null}
        {emailNotice ? (
          <div className={`mt-4 rounded-2xl border px-4 py-3 text-sm font-medium ${emailNotice.includes('could not be sent') ? 'border-orange-300 bg-orange-50 text-orange-800 dark:border-orange-900 dark:bg-orange-950/40 dark:text-orange-300' : 'border-blue-300 bg-blue-50 text-blue-800 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300'}`}>
            {emailNotice}
          </div>
        ) : null}
        {manageLink ? (
          <div className="mt-4 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
            <p className="font-medium">Need to update this appointment later?</p>
            <a href={manageLink} className="mt-2 inline-flex font-semibold underline underline-offset-4" target="_blank" rel="noreferrer">
              Open your booking manager
            </a>
          </div>
        ) : null}
        {bookingSummary ? (
          <InstallAfterBookingCard
            enabled={Boolean(bookingSummary)}
            appName={bookingSummary.appName}
            serviceName={bookingSummary.serviceName}
            appointmentDate={bookingSummary.appointmentDate}
            appointmentTime={bookingSummary.appointmentTime}
          />
        ) : null}
        {whatsAppHref ? (
          <div className="mt-4 rounded-2xl border border-orange-300 bg-orange-50 px-4 py-3 text-sm text-orange-800 dark:border-orange-900 dark:bg-orange-950/40 dark:text-orange-300">
            <p className="font-medium">Need to message {bookingSummary?.appName || barber.name} directly?</p>
            <a href={whatsAppHref} target="_blank" rel="noreferrer" className="mt-2 inline-flex rounded-full bg-stone-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-800 dark:bg-amber-500 dark:text-stone-950 dark:hover:bg-amber-400">
              Continue on WhatsApp
            </a>
          </div>
        ) : null}

        <button id="bookButton" type="submit" disabled={submitting || serviceOptions.length === 0} className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-stone-950 px-5 py-3 font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-amber-500 dark:text-black dark:hover:bg-amber-400">
          {submitting ? 'Confirming booking...' : 'Confirm booking'}
        </button>
      </form>

      <aside className="space-y-6 rounded-3xl border border-orange-200 bg-white/80 p-6 shadow-sm dark:border-stone-800 dark:bg-stone-950/60">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-amber-300">Barber shop</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">{barber.name}</h2>
          <p className="mt-3 text-sm text-stone-600 dark:text-amber-200">{barber.bio || 'Book directly with this barber shop.'}</p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-stone-600 dark:text-amber-200">
            {barber.location ? <span className="rounded-full border border-orange-200 px-3 py-1 dark:border-stone-700">{barber.location}</span> : null}
            <span className="rounded-full border border-orange-200 px-3 py-1 capitalize dark:border-stone-700">{barber.subscriptionPlan} plan</span>
          </div>
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-amber-300">Selected service</p>
          {selectedService ? (
            <div className="mt-3 rounded-2xl border border-orange-200 bg-orange-50 p-4 dark:border-stone-800 dark:bg-stone-900">
              {(selectedService.sampleImage || selectedService.catalogId?.image) ? (
                <div className="mb-4 overflow-hidden rounded-xl border border-orange-200 dark:border-stone-800">
                  <img src={selectedService.sampleImage || selectedService.catalogId?.image} alt={selectedService.name} className="h-44 w-full object-cover" />
                </div>
              ) : null}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{selectedService.name}</h3>
                  <p className="text-sm text-stone-600 dark:text-amber-200">{selectedService.description || 'Professional grooming service.'}</p>
                </div>
                <span className="text-base font-semibold">{formatCurrency(selectedService.price, barber.currency || 'USD')}</span>
              </div>
              <p className="mt-3 text-sm text-stone-600 dark:text-amber-200">Duration: {selectedService.duration || 60} minutes</p>
            </div>
          ) : (
            <p className="mt-3 text-sm text-stone-600 dark:text-amber-200">No services are configured for this barber yet.</p>
          )}
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-amber-300">Need more details?</p>
          <Link href={getBarberStoreUrl(barber.slug)} className="mt-3 inline-flex rounded-full border border-orange-300 px-4 py-2 text-sm font-medium transition hover:bg-orange-100 dark:border-stone-700 dark:hover:bg-stone-900">
            View barber shop page
          </Link>
        </div>
      </aside>
    </div>
  );
}