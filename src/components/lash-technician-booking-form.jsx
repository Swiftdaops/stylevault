'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner'
import { format as formatDate } from 'date-fns';
import DatePickerDemo from './date-picker-demo';
import TimePickerDemo from './time-picker-demo';
import { API_BASE_URL, formatCurrency } from '@/lib/lash-technician-api';
import { getLashTechnicianStoreUrl } from '@/lib/seo';
import InstallAfterBookingCard from '@/components/install-after-booking-card'

function buildWhatsAppUrl(rawPhone, customerName) {
  const phone = String(rawPhone || '').replace(/\D/g, '');
  if (!phone) return '';
  const message = `Hi, I'm ${customerName}. Nice to meet you.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export default function LashTechnicianBookingForm({ lashTechnician, services }) {
  const searchParams = useSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [emailNotice, setEmailNotice] = useState('');
  const [bookingSummary, setBookingSummary] = useState(null);
  const [whatsAppHref, setWhatsAppHref] = useState('');
  const [form, setForm] = useState({
    customerName: '',
    customerEmail: '',
    phone: '',
    service: services[0]?._id || '',
    selectedPricingOption: '',
    selectedAddOns: [],
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
      if (serviceId && services.some((service) => service._id === serviceId)) {
        next.service = serviceId;
      }
      return next;
    });
  }, [searchParams, services]);

  const serviceOptions = useMemo(() => services.map((service) => ({ ...service })), [services]);
  const selectedService = serviceOptions.find((service) => service._id === form.service) || serviceOptions[0] || null;
  const selectedPricingOption = selectedService?.pricingOptions?.find((option) => option.label === form.selectedPricingOption) || null;
  const selectedAddOns = (selectedService?.addOns || []).filter((item) => form.selectedAddOns.includes(item.name));
  const totalPrice = useMemo(() => {
    const base = selectedPricingOption?.price ?? selectedService?.price ?? 0;
    return base + selectedAddOns.reduce((sum, item) => sum + Number(item.price || 0), 0);
  }, [selectedAddOns, selectedPricingOption?.price, selectedService?.price]);

  useEffect(() => {
    setForm((current) => {
      if (!selectedService) return current;
      const hasSelectedOption = selectedService.pricingOptions?.some((option) => option.label === current.selectedPricingOption);
      return {
        ...current,
        selectedPricingOption: hasSelectedOption ? current.selectedPricingOption : '',
        selectedAddOns: current.selectedAddOns.filter((name) => selectedService.addOns?.some((item) => item.name === name)),
      };
    });
  }, [selectedService]);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setForm((current) => ({ ...current, [id]: value }));
  };

  const toggleAddOn = (name) => {
    setForm((current) => ({
      ...current,
      selectedAddOns: current.selectedAddOns.includes(name)
        ? current.selectedAddOns.filter((item) => item !== name)
        : [...current.selectedAddOns, name],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');
    setEmailNotice('');
    setBookingSummary(null);
    setWhatsAppHref('');

    try {
      if (!lashTechnician?._id) throw new Error('Lash technician profile is unavailable.');
      if (!selectedService?._id) throw new Error('Please choose a service.');
      if (!form.date) throw new Error('Please choose a date.');
      if (!form.time) throw new Error('Please choose a time.');

      const response = await fetch(`${API_BASE_URL}/lash-appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lashTechnicianId: lashTechnician._id,
          serviceId: selectedService._id,
          customerName: form.customerName,
          customerEmail: form.customerEmail,
          phone: form.phone,
          date: form.date,
          time: form.time,
          selectedPricingOption: form.selectedPricingOption || undefined,
          selectedAddOns: form.selectedAddOns,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data?.message || 'Booking failed');

      setSuccess(`Booking confirmed for ${lashTechnician.name}. A confirmation email will be sent to ${form.customerEmail}.`);
      setBookingSummary({
        appName: lashTechnician.name,
        serviceName: selectedService.name,
        appointmentDate: form.date,
        appointmentTime: form.time,
      });
      toast.success('Appointment confirmed', {
        description: `${selectedService.name} was booked for ${form.date} at ${form.time}.`,
      })

      if (data?.emailError) {
        setEmailNotice(`Your booking was saved, but the confirmation email could not be sent right now: ${data.emailError}`);
        toast.warning('Booking saved, but email is pending', {
          description: data.emailError,
        })
      } else {
        setEmailNotice(`Confirmation email sent to ${form.customerEmail}.`);
        toast.info('Confirmation email sent', {
          description: `A receipt was sent to ${form.customerEmail}.`,
        })
      }

      const whatsappUrl = buildWhatsAppUrl(lashTechnician?.whatsapp, form.customerName)
      setWhatsAppHref(whatsappUrl)

      setForm({
        customerName: '',
        customerEmail: '',
        phone: '',
        service: selectedService._id,
        selectedPricingOption: '',
        selectedAddOns: [],
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
      <form className="rounded-3xl border-[3px] border-violet-200 bg-white p-6 shadow-xl dark:border-stone-800 dark:bg-stone-950" onSubmit={handleSubmit}>
        <div className="mb-6 space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-violet-300">Booking details</p>
          <h1 className="text-3xl font-bold tracking-tight">Book with {lashTechnician.name}</h1>
          <p className="text-sm text-stone-600 dark:text-violet-200">Choose your lash service, preferred option, and add-ons to reserve your appointment.</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-2 sm:col-span-2">
            <span className="text-sm font-medium">Customer name</span>
            <input id="customerName" value={form.customerName} onChange={handleChange} required className="w-full rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3 outline-none transition focus:border-violet-400 dark:border-stone-700 dark:bg-stone-900" />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium">Email</span>
            <input id="customerEmail" type="email" value={form.customerEmail} onChange={handleChange} required className="w-full rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3 outline-none transition focus:border-violet-400 dark:border-stone-700 dark:bg-stone-900" />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium">Phone</span>
            <input id="phone" value={form.phone} onChange={handleChange} className="w-full rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3 outline-none transition focus:border-violet-400 dark:border-stone-700 dark:bg-stone-900" />
          </label>

          <label className="space-y-2 sm:col-span-2">
            <span className="text-sm font-medium">Service</span>
            <select id="service" value={form.service} onChange={handleChange} className="w-full rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3 outline-none transition focus:border-violet-400 dark:border-stone-700 dark:bg-stone-900">
              {serviceOptions.map((service) => (
                <option key={service._id} value={service._id}>
                  {service.name} · from {formatCurrency(service.price, lashTechnician?.currency || 'USD')}
                </option>
              ))}
            </select>
          </label>

          {selectedService?.pricingOptions?.length ? (
            <label className="space-y-2 sm:col-span-2">
              <span className="text-sm font-medium">Pricing option</span>
              <select id="selectedPricingOption" value={form.selectedPricingOption} onChange={handleChange} className="w-full rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3 outline-none transition focus:border-violet-400 dark:border-stone-700 dark:bg-stone-900">
                <option value="">Use starting price</option>
                {selectedService.pricingOptions.map((option) => (
                  <option key={option.label} value={option.label}>
                    {option.label} · {formatCurrency(option.price, lashTechnician?.currency || 'USD')}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          {selectedService?.addOns?.length ? (
            <div className="space-y-3 sm:col-span-2">
              <span className="text-sm font-medium">Add-ons</span>
              <div className="grid gap-3 sm:grid-cols-2">
                {selectedService.addOns.map((addOn) => (
                  <label key={addOn.name} className="flex items-start gap-3 rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm dark:border-stone-700 dark:bg-stone-900">
                    <input type="checkbox" checked={form.selectedAddOns.includes(addOn.name)} onChange={() => toggleAddOn(addOn.name)} className="mt-1" />
                    <span>
                      <span className="block font-medium">{addOn.name}</span>
                      <span className="text-stone-600 dark:text-violet-300">{formatCurrency(addOn.price, lashTechnician?.currency || 'USD')} · +{addOn.duration || 0} min</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ) : null}

          <label className="space-y-2">
            <span className="text-sm font-medium">Date</span>
            <DatePickerDemo value={form.date || undefined} onChange={(date) => setForm((current) => ({ ...current, date: date ? formatDate(date, 'yyyy-MM-dd') : '' }))} />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium">Time</span>
            <TimePickerDemo value={form.time || undefined} onChange={(time) => setForm((current) => ({ ...current, time }))} />
          </label>
        </div>

        <div className="mt-5 rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm text-stone-700 dark:border-stone-800 dark:bg-stone-900 dark:text-violet-200">Total: <span className="font-semibold">{formatCurrency(totalPrice, lashTechnician?.currency || 'USD')}</span></div>

        {error ? <p className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</p> : null}
        {success ? <div className="mt-4 rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300">{success}</div> : null}
        {emailNotice ? <div className={`mt-4 rounded-2xl border px-4 py-3 text-sm font-medium ${emailNotice.includes('could not be sent') ? 'border-orange-300 bg-orange-50 text-orange-800 dark:border-orange-900 dark:bg-orange-950/40 dark:text-orange-300' : 'border-blue-300 bg-blue-50 text-blue-800 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300'}`}>{emailNotice}</div> : null}
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
          <div className="mt-4 rounded-2xl border border-violet-300 bg-violet-50 px-4 py-3 text-sm text-violet-800 dark:border-violet-900 dark:bg-violet-950/40 dark:text-violet-300">
            <p className="font-medium">Need to message {bookingSummary?.appName || lashTechnician.name} directly?</p>
            <a href={whatsAppHref} target="_blank" rel="noreferrer" className="mt-2 inline-flex rounded-full bg-stone-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-800 dark:bg-violet-400 dark:text-stone-950 dark:hover:bg-violet-300">
              Continue on WhatsApp
            </a>
          </div>
        ) : null}

        <button type="submit" disabled={submitting || serviceOptions.length === 0} className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-stone-950 px-5 py-3 font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-violet-400 dark:text-black dark:hover:bg-violet-300">
          {submitting ? 'Confirming booking...' : 'Confirm booking'}
        </button>
      </form>

      <aside className="space-y-6 rounded-3xl border border-violet-200 bg-white/80 p-6 shadow-sm dark:border-stone-800 dark:bg-stone-950/60">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-violet-300">Lash technician</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">{lashTechnician.name}</h2>
          <p className="mt-3 text-sm text-stone-600 dark:text-violet-200">{lashTechnician.bio || 'Book directly with this lash technician.'}</p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-stone-600 dark:text-violet-200">
            {lashTechnician.location ? <span className="rounded-full border border-violet-200 px-3 py-1 dark:border-stone-700">{lashTechnician.location}</span> : null}
            <span className="rounded-full border border-violet-200 px-3 py-1 capitalize dark:border-stone-700">{lashTechnician.subscriptionPlan} plan</span>
          </div>
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-violet-300">Selected service</p>
          {selectedService ? (
            <div className="mt-3 rounded-2xl border border-violet-200 bg-violet-50 p-4 dark:border-stone-800 dark:bg-stone-900">
              {(selectedService.sampleImage || selectedService.catalogId?.image) ? (
                <div className="mb-4 overflow-hidden rounded-xl border border-violet-200 dark:border-stone-800">
                  <img src={selectedService.sampleImage || selectedService.catalogId?.image} alt={selectedService.name} className="h-44 w-full object-cover" />
                </div>
              ) : null}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{selectedService.name}</h3>
                  <p className="text-sm text-stone-600 dark:text-violet-200">{selectedService.description || 'Professional lash studio service.'}</p>
                </div>
                <span className="text-base font-semibold">{formatCurrency(totalPrice, lashTechnician.currency || 'USD')}</span>
              </div>
              <p className="mt-3 text-sm text-stone-600 dark:text-violet-200">Duration: {selectedPricingOption?.duration || selectedService.duration || 60} minutes</p>
            </div>
          ) : (
            <p className="mt-3 text-sm text-stone-600 dark:text-violet-200">No services are configured for this technician yet.</p>
          )}
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-violet-300">Need more details?</p>
          <Link href={getLashTechnicianStoreUrl(lashTechnician.slug)} className="mt-3 inline-flex rounded-full border border-violet-300 px-4 py-2 text-sm font-medium transition hover:bg-violet-100 dark:border-stone-700 dark:hover:bg-stone-900">View technician page</Link>
        </div>
      </aside>
    </div>
  );
}
