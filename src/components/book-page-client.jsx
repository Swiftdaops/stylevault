'use client';

import { useEffect, useMemo, useState } from 'react';
import { API_BASE_URL } from '@/lib/barber-api';
const DEFAULT_SERVICE_VALUE = 'premium-barbing';

const slugify = (value = '') => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const buildWhatsAppUrl = (rawPhone, customerName) => {
  const phone = String(rawPhone || '').replace(/\D/g, '');
  if (!phone) return '';
  const message = `Hi, I'm ${customerName}. Nice to meet you.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

export default function BookPageClient() {
  const [barbers, setBarbers] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({
    customerName: '',
    customerEmail: '',
    phone: '',
    service: DEFAULT_SERVICE_VALUE,
    date: '',
    time: '',
    price: '1000000',
  });

  useEffect(() => {
    let isMounted = true;

    const loadBookingData = async () => {
      try {
        setLoading(true);
        setError('');

        const barbersResponse = await fetch(`${API_BASE_URL}/barbers`, {
          cache: 'no-store',
        });

        if (!barbersResponse.ok) {
          throw new Error('Unable to load barbers');
        }

        const barberData = await barbersResponse.json();
        if (!isMounted) return;

        setBarbers(Array.isArray(barberData) ? barberData : []);

        const primaryBarber = Array.isArray(barberData) && barberData.length > 0 ? barberData[0] : null;

        if (!primaryBarber?._id) {
          setServices([]);
          setError('No barber profiles are available yet.');
          return;
        }

        const servicesResponse = await fetch(`${API_BASE_URL}/services?barberId=${primaryBarber._id}`, {
          cache: 'no-store',
        });

        if (!servicesResponse.ok) {
          throw new Error('Unable to load services');
        }

        const serviceData = await servicesResponse.json();
        if (!isMounted) return;

        setServices(Array.isArray(serviceData) ? serviceData : []);

        const matchingService = Array.isArray(serviceData)
          ? serviceData.find((service) => slugify(service.name) === DEFAULT_SERVICE_VALUE)
          : null;

        if (matchingService) {
          setForm((current) => ({
            ...current,
            service: DEFAULT_SERVICE_VALUE,
            price: String(matchingService.price ?? current.price),
          }));
        } else if (Array.isArray(serviceData) && serviceData.length > 0) {
          setForm((current) => ({
            ...current,
            service: DEFAULT_SERVICE_VALUE,
            price: String(serviceData[0].price ?? current.price),
          }));
        } else {
          setError('No services are available for booking yet.');
        }
      } catch (loadError) {
        if (!isMounted) return;
        setError(loadError.message || 'Unable to load booking form');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadBookingData();

    return () => {
      isMounted = false;
    };
  }, []);

  const serviceOptions = useMemo(() => {
    const options = services.map((service) => ({
      id: service._id,
      name: service.name,
      value: slugify(service.name),
      price: service.price,
      duration: service.duration,
    }));

    if (options.length > 0 && !options.some((option) => option.value === DEFAULT_SERVICE_VALUE)) {
      const fallback = options[0];
      return [
        {
          ...fallback,
          value: DEFAULT_SERVICE_VALUE,
          name: fallback.name || 'Premium Barbing',
        },
        ...options,
      ];
    }

    if (options.length === 0) {
      return [
        {
          id: '',
          name: 'Premium Barbing',
          value: DEFAULT_SERVICE_VALUE,
          price: Number(form.price) || 1000000,
          duration: 60,
        },
      ];
    }

    return options;
  }, [form.price, services]);

  const selectedBarber = barbers[0] || null;
  const selectedService = serviceOptions.find((option) => option.value === form.service) || serviceOptions[0] || null;

  const handleChange = (event) => {
    const { id, value } = event.target;

    setForm((current) => {
      const next = {
        ...current,
        [id]: value,
      };

      if (id === 'service') {
        const nextService = serviceOptions.find((option) => option.value === value);
        if (nextService?.price) {
          next.price = String(nextService.price);
        }
      }

      return next;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      if (!selectedBarber?._id) {
        throw new Error('A barber profile is required before booking.');
      }

      if (!selectedService?.id) {
        throw new Error('A bookable service is required before booking.');
      }

      const response = await fetch(`${API_BASE_URL}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          barberId: selectedBarber._id,
          serviceId: selectedService.id,
          customerName: form.customerName,
          customerEmail: form.customerEmail,
          phone: form.phone,
          date: form.date,
          time: form.time,
          price: Number(form.price),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Booking failed');
      }

      setSuccess('Booking created successfully.');

      const whatsappUrl = buildWhatsAppUrl(selectedBarber?.whatsapp, form.customerName);
      if (whatsappUrl) {
        window.location.assign(whatsappUrl);
        return;
      }
    } catch (submitError) {
      setError(submitError.message || 'Booking failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-orange-50 px-4 py-12 text-stone-950 dark:bg-black dark:text-amber-500">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 lg:flex-row lg:items-start">
        <div className="max-w-xl space-y-4">
          <span className="inline-flex rounded-full border border-orange-300 px-3 py-1 text-sm font-medium dark:border-stone-700">
            Online booking
          </span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Book your next appointment</h1>
          <p className="text-base text-stone-700 dark:text-amber-200">
            Reserve a timeslot, submit customer details, and trigger the booking confirmation flow end to end.
          </p>
          {selectedBarber ? (
            <div className="rounded-2xl border border-orange-200 bg-white/80 p-4 shadow-sm dark:border-stone-800 dark:bg-stone-950/60">
              <p className="text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-amber-300">Selected barber</p>
              <h2 className="mt-2 text-2xl font-semibold">{selectedBarber.name}</h2>
              <p className="mt-1 text-sm text-stone-600 dark:text-amber-200">Slug: {selectedBarber.slug || 'n/a'}</p>
            </div>
          ) : null}
        </div>

        <div className="w-full max-w-xl rounded-3xl border border-orange-200 bg-white p-6 shadow-xl dark:border-stone-800 dark:bg-stone-950">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2 sm:col-span-2">
                <span className="text-sm font-medium">Customer name</span>
                <input
                  id="customerName"
                  value={form.customerName}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 outline-none transition focus:border-orange-400 dark:border-stone-700 dark:bg-stone-900"
                  placeholder="Favobi Test Customer"
                  required
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium">Email</span>
                <input
                  id="customerEmail"
                  type="email"
                  value={form.customerEmail}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 outline-none transition focus:border-orange-400 dark:border-stone-700 dark:bg-stone-900"
                  placeholder="name@example.com"
                  required
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium">Phone</span>
                <input
                  id="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 outline-none transition focus:border-orange-400 dark:border-stone-700 dark:bg-stone-900"
                  placeholder="08000000000"
                />
              </label>

              <label className="space-y-2 sm:col-span-2">
                <span className="text-sm font-medium">Service</span>
                <select
                  id="service"
                  value={form.service}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 outline-none transition focus:border-orange-400 dark:border-stone-700 dark:bg-stone-900"
                >
                  {serviceOptions.map((option, index) => (
                    <option key={`${option.value}-${index}`} value={option.value}>
                      {option.name} · ${(Number(option.price || 0) / 100).toFixed(2)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium">Date</span>
                <input
                  id="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 outline-none transition focus:border-orange-400 dark:border-stone-700 dark:bg-stone-900"
                  required
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium">Time</span>
                <input
                  id="time"
                  type="time"
                  value={form.time}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 outline-none transition focus:border-orange-400 dark:border-stone-700 dark:bg-stone-900"
                  required
                />
              </label>

              <label className="space-y-2 sm:col-span-2">
                <span className="text-sm font-medium">Price (in cents)</span>
                <input
                  id="price"
                  type="number"
                  min="0"
                  step="1"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 outline-none transition focus:border-orange-400 dark:border-stone-700 dark:bg-stone-900"
                  required
                />
              </label>
            </div>

            {loading ? <p className="text-sm text-stone-500 dark:text-amber-300">Loading booking data...</p> : null}
            {error ? <p className="text-sm text-red-600 dark:text-red-400">{error}</p> : null}
            {success ? (
              <div id="bookingSuccess" className="rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300">
                {success}
              </div>
            ) : null}

            <button
              id="bookButton"
              type="submit"
              disabled={submitting || loading}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-stone-950 px-5 py-3 font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-amber-500 dark:text-black dark:hover:bg-amber-400"
            >
              {submitting ? 'Creating booking...' : 'Book appointment'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
