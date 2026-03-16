"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import UpgradeToProButton from '@/components/pro-upgrade-button';

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

  const price = {
    monthly: initialPricing.monthlyDisplay || (initialPricing.monthlyAmount ? String(initialPricing.monthlyAmount) : '₦0'),
    yearly: initialPricing.yearlyDisplay || (initialPricing.yearlyAmount ? String(initialPricing.yearlyAmount) : '₦0'),
  };

  const countryLabel = initialPricing.countryLabel || 'your location';

  return (
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
              onClick={() => setBilling('monthly')}
              className={`rounded-xl px-8 py-3 text-sm font-bold transition ${
                billing === 'monthly'
                  ? 'bg-white text-stone-950 shadow dark:bg-stone-800 dark:text-white'
                  : 'text-stone-500 dark:text-stone-400'
              }`}
            >
              Monthly
            </button>

            <button
              onClick={() => setBilling('yearly')}
              className={`flex items-center justify-center gap-2 rounded-xl px-8 py-3 text-sm font-bold transition ${
                billing === 'yearly'
                  ? 'bg-white text-stone-950 shadow dark:bg-stone-800 dark:text-white'
                  : 'text-stone-500 dark:text-stone-400'
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
            <h2 className="text-xl font-bold text-stone-950 dark:text-white">Free Plan</h2>

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
              onClick={() => {
                window.location.href = '/get-started';
              }}
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
              <span className="text-sm text-stone-400">/{billing === 'monthly' ? 'mo' : 'yr'}</span>
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

            <UpgradeToProButton
              defaultPlan={billing === 'monthly' ? 'Pro Monthly' : 'Pro Yearly'}
              defaultCountryCode={initialPricing.countryCode}
              countryLabel={countryLabel}
              pricing={price}
              className="w-full rounded-2xl bg-linear-to-r from-orange-600 to-amber-500 py-4 font-bold text-white shadow-lg transition hover:opacity-90"
            />

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
  );
}