"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Crown, Sparkles, X } from 'lucide-react';
import { API_BASE_URL } from '@/lib/api-base';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: 'easeOut',
    },
  },
};

export default function PricingClient({ initialPricing = {} }) {
  const [billing, setBilling] = useState('monthly');
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    country: initialPricing.countryLabel || '',
    plan: 'Pro Monthly',
    niche: 'Barber',
  });

  const price = {
    monthly: initialPricing.monthlyDisplay || (initialPricing.monthlyAmount ? String(initialPricing.monthlyAmount) : '₦0'),
    yearly: initialPricing.yearlyDisplay || (initialPricing.yearlyAmount ? String(initialPricing.yearlyAmount) : '₦0'),
  };

  const countryLabel = initialPricing.countryLabel || 'your location';
  const planPrice = billing === 'monthly' ? price.monthly : price.yearly;

  const whatsappLink = useMemo(() => {
    const raw = String(submitSuccess?.adminWhatsApp || '').replace(/[^\d]/g, '');
    return raw ? `https://wa.me/${raw}` : null;
  }, [submitSuccess]);

  useEffect(() => {
    setFormState((current) => ({
      ...current,
      country: current.country || countryLabel,
      plan: billing === 'monthly' ? 'Pro Monthly' : 'Pro Yearly',
    }));
  }, [billing, countryLabel]);

  useEffect(() => {
    if (!showForm) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showForm]);

  const handleFieldChange = (field) => (event) => {
    setFormState((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const closeForm = () => {
    setShowForm(false);
    setSubmitError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch(`${API_BASE_URL}/pro-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          phone: formState.phone,
          whatsapp: formState.phone,
          country: formState.country,
          plan: formState.plan,
          niche: formState.niche,
        }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload?.message || 'Unable to submit your Pro request right now.');
      }

      setSubmitSuccess(payload);
      setFormState((current) => ({
        ...current,
        name: '',
        email: '',
        phone: '',
      }));
    } catch (error) {
      setSubmitError(error.message || 'Unable to submit your Pro request right now.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClassName = 'mt-2 w-full rounded-2xl border border-white/20 bg-white/70 px-4 py-3 text-sm text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-stone-500 dark:focus:border-amber-400 dark:focus:ring-amber-500/10';

  return (
    <>
      <section className="relative overflow-hidden bg-orange-50 py-24 text-stone-950 dark:bg-stone-950 dark:text-amber-600">
        <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.16),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.1),transparent_55%)]" />

        <motion.div
          className="relative mx-auto max-w-6xl px-4 sm:px-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item} className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-orange-200 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.24em] text-orange-800 dark:bg-amber-900/40 dark:text-amber-400">
              StyleVault Pricing
            </span>

            <h1 className="mt-6 text-4xl font-black tracking-tight leading-tight text-stone-950 dark:text-white sm:text-5xl md:text-6xl">
              Flexible pricing for modern
              <span className="block bg-linear-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                beauty professionals
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-stone-700 dark:text-stone-300 sm:text-lg">
              Start free, then upgrade when you want advanced growth features.
              Your Pro price is localized for {countryLabel}.
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="mx-auto mt-10 grid max-w-3xl gap-4 rounded-3xl border border-orange-100 bg-white/80 p-4 text-center shadow-lg shadow-orange-100/40 backdrop-blur dark:border-stone-800 dark:bg-stone-900/80 sm:grid-cols-3"
          >
            <div>
              <p className="text-xl font-black text-stone-950 dark:text-white">Localized</p>
              <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">Pricing based on visitor country</p>
            </div>
            <div>
              <p className="text-xl font-black text-stone-950 dark:text-white">5 niches</p>
              <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">Barber, hair, nails, lashes, makeup</p>
            </div>
            <div>
              <p className="text-xl font-black text-stone-950 dark:text-white">Scale anytime</p>
              <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">Start free, upgrade when ready</p>
            </div>
          </motion.div>

          <motion.div variants={item} className="mt-12 flex justify-center">
            <div className="flex flex-col rounded-2xl border border-orange-200 bg-white/80 p-1 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:flex-row">
              <button
                onClick={() => setBilling("monthly")}
                className={`rounded-xl px-8 py-3 text-sm font-bold transition ${
                  billing === "monthly"
                    ? "bg-white text-stone-950 shadow dark:bg-stone-800 dark:text-white"
                    : "text-stone-500 dark:text-stone-400"
                }`}
              >
                Monthly
              </button>

              <button
                onClick={() => setBilling("yearly")}
                className={`flex items-center justify-center gap-2 rounded-xl px-8 py-3 text-sm font-bold transition ${
                  billing === "yearly"
                    ? "bg-white text-stone-950 shadow dark:bg-stone-800 dark:text-white"
                    : "text-stone-500 dark:text-stone-400"
                }`}
              >
                Yearly
                <span className="rounded-full bg-lime-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                  Save 20%
                </span>
              </button>
            </div>
          </motion.div>

          <motion.div
            className="mx-auto mt-14 grid max-w-5xl gap-8 lg:grid-cols-2"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
          >
            <motion.div
              variants={item}
              className="rounded-4xl border border-orange-200 bg-white p-8 shadow-xl shadow-orange-100/40 dark:border-stone-800 dark:bg-stone-900"
            >
            <h2 className="text-xl font-bold text-stone-950 dark:text-white">
              Free Plan
            </h2>

            <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
              Perfect for professionals launching their online presence.
            </p>

            <div className="mb-8 mt-6 flex items-end gap-1">
              <span className="text-4xl font-black text-stone-950 dark:text-white">Free</span>
              <span className="text-sm text-stone-500 dark:text-stone-400">forever</span>
            </div>

            <ul className="mb-10 space-y-4 text-sm text-stone-700 dark:text-stone-300">
              <li>✔ Professional service profile</li>
              <li>✔ Online appointment booking</li>
              <li>✔ Service menu and pricing</li>
              <li>✔ Smart booking calendar</li>
              <li>✔ Email notifications</li>
              <li>✔ Verified badge after 10 satisfied clients</li>
            </ul>

            <button
              onClick={() => window.location.href = "/get-started"}
              className="w-full rounded-2xl border border-orange-300 py-4 font-semibold text-stone-950 transition hover:bg-orange-100 dark:border-stone-700 dark:text-white dark:hover:bg-stone-800"
            >
              Create Free Store
            </button>
            </motion.div>

            <motion.div
              variants={item}
              className="relative rounded-4xl border-2 border-orange-500 bg-stone-900 p-8 text-white shadow-2xl shadow-orange-500/20"
            >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-linear-to-r from-orange-600 to-amber-500 px-4 py-1 text-xs font-bold uppercase tracking-widest">
              Most Popular
            </div>

            <h2 className="text-xl font-bold">Pro Plan</h2>

            <p className="mb-6 mt-2 text-sm text-stone-300">
              For beauty pros ready to grow their brand, bookings, and income.
            </p>

            <div className="mb-2 flex items-end gap-1">
              <span className="text-4xl font-black">{price[billing]}</span>
              <span className="text-sm text-stone-400">/{billing === "monthly" ? "mo" : "yr"}</span>
            </div>

            <p className="mb-8 text-xs uppercase tracking-[0.2em] text-orange-200">
              Localized for {countryLabel}
            </p>

            <ul className="mb-10 space-y-4 text-sm text-stone-200">
              <li>✔ Everything in Free</li>
              <li>✔ Custom professional domain</li>
              <li>✔ SEO optimized niche page</li>
              <li>✔ Automated booking confirmations</li>
              <li>✔ Customer reviews and ratings</li>
              <li>✔ Accept tips from clients</li>
              <li>✔ Mini shop to sell products</li>
              <li>✔ Advanced business analytics</li>
            </ul>

            <button
              onClick={() => {
                setSubmitSuccess(null);
                setSubmitError('');
                setShowForm(true);
              }}
              className="w-full rounded-2xl bg-linear-to-r from-orange-600 to-amber-500 py-4 font-bold text-white shadow-lg transition hover:opacity-90"
            >
              Upgrade to Pro
            </button>

            <button
              onClick={() => window.open('/demo', '_blank')}
              className="mt-3 w-full rounded-2xl border border-orange-500 bg-transparent py-4 font-semibold text-white transition hover:bg-white/5"
            >
              View Demo
            </button>

            <p className="mt-4 text-center text-xs text-stone-400">
              Great for barbers, hair specialists, nail techs, lash techs, and makeup artists.
            </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.98 }}
            className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/30 bg-white/75 shadow-2xl shadow-black/20 backdrop-blur-2xl dark:border-white/10 dark:bg-stone-950/75"
          >
            <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.22),transparent_58%)] dark:bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.16),transparent_58%)]" />

            <button
              type="button"
              onClick={closeForm}
              className="absolute right-5 top-5 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/70 text-stone-900 transition hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
              aria-label="Close Pro form"
            >
              <X size={18} />
            </button>

            <div className="relative grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
              <div className="border-b border-white/30 p-6 dark:border-white/10 sm:p-8 lg:border-b-0 lg:border-r">
                <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-orange-700 dark:border-amber-500/20 dark:bg-white/10 dark:text-amber-300">
                  <Crown size={14} />
                  Premium upgrade
                </div>

                <h3 className="mt-6 text-3xl font-black tracking-tight text-stone-950 dark:text-white">
                  Premium glass Pro request
                </h3>

                <p className="mt-4 text-sm leading-7 text-stone-600 dark:text-stone-300">
                  Send your details and StyleVault can follow up with onboarding for your niche,
                  setup guidance, and Pro activation.
                </p>

                <div className="mt-8 rounded-4xl border border-white/30 bg-white/60 p-5 shadow-lg shadow-orange-100/40 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-black/20">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
                    Selected plan
                  </p>
                  <div className="mt-3 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xl font-black text-stone-950 dark:text-white">{formState.plan}</p>
                      <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">Localized for {countryLabel}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-stone-950 dark:text-white">{planPrice}</p>
                      <p className="text-xs uppercase tracking-[0.2em] text-orange-600 dark:text-amber-300">
                        {billing === 'monthly' ? 'per month' : 'per year'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {[
                    'Premium glass look in light and dark mode',
                    'Submit name, email, number, country, plan, and niche',
                    'Fast follow-up for barber, hair, nails, lashes, or makeup',
                  ].map((benefit) => (
                    <div key={benefit} className="flex items-start gap-3 text-sm text-stone-600 dark:text-stone-300">
                      <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-r from-orange-500 to-amber-400 text-white">
                        <CheckCircle2 size={14} />
                      </span>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 sm:p-8">
                {submitSuccess ? (
                  <div className="rounded-4xl border border-emerald-200 bg-emerald-50/90 p-6 dark:border-emerald-500/20 dark:bg-emerald-500/10">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white">
                      <Sparkles size={18} />
                    </div>
                    <h4 className="mt-4 text-2xl font-black text-stone-950 dark:text-white">
                      Pro request submitted
                    </h4>
                    <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-300">
                      Your upgrade request has been sent. StyleVault can now follow up with the best Pro setup for your niche.
                    </p>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      {whatsappLink && (
                        <a
                          href={whatsappLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                        >
                          Open WhatsApp
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={closeForm}
                        className="inline-flex items-center justify-center rounded-2xl border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-900 transition hover:bg-white dark:border-white/10 dark:text-white dark:hover:bg-white/10"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="grid gap-4">
                    <div>
                      <label className="text-sm font-semibold text-stone-700 dark:text-stone-200">Full name</label>
                      <input
                        required
                        type="text"
                        value={formState.name}
                        onChange={handleFieldChange('name')}
                        placeholder="Enter your name"
                        className={inputClassName}
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-sm font-semibold text-stone-700 dark:text-stone-200">Email</label>
                        <input
                          required
                          type="email"
                          value={formState.email}
                          onChange={handleFieldChange('email')}
                          placeholder="you@example.com"
                          className={inputClassName}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-stone-700 dark:text-stone-200">Phone number</label>
                        <input
                          required
                          type="tel"
                          value={formState.phone}
                          onChange={handleFieldChange('phone')}
                          placeholder="2348012345678"
                          className={inputClassName}
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <label className="text-sm font-semibold text-stone-700 dark:text-stone-200">Country</label>
                        <input
                          required
                          type="text"
                          value={formState.country}
                          onChange={handleFieldChange('country')}
                          placeholder="Nigeria"
                          className={inputClassName}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-stone-700 dark:text-stone-200">Plan</label>
                        <select
                          value={formState.plan}
                          onChange={handleFieldChange('plan')}
                          className={inputClassName}
                        >
                          <option>Pro Monthly</option>
                          <option>Pro Yearly</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-stone-700 dark:text-stone-200">Niche</label>
                        <select
                          value={formState.niche}
                          onChange={handleFieldChange('niche')}
                          className={inputClassName}
                        >
                          <option>Barber</option>
                          <option>Hair Specialist</option>
                          <option>Nail Technician</option>
                          <option>Lash Technician</option>
                          <option>Makeup Artist</option>
                        </select>
                      </div>
                    </div>

                    {submitError ? (
                      <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
                        {submitError}
                      </div>
                    ) : null}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="mt-2 inline-flex items-center justify-center rounded-2xl bg-linear-to-r from-orange-600 to-amber-500 px-5 py-4 text-sm font-bold text-white shadow-lg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {submitting ? 'Submitting request...' : 'Submit Pro request'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}