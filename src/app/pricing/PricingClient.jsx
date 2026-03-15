"use client";

import React, { useState } from 'react';

export default function PricingClient({ initialPricing = {} }) {
  const [billing, setBilling] = useState('monthly');
  const [showForm, setShowForm] = useState(false);

  const price = {
    monthly: initialPricing.monthlyDisplay || (initialPricing.monthlyAmount ? String(initialPricing.monthlyAmount) : '₦0'),
    yearly: initialPricing.yearlyDisplay || (initialPricing.yearlyAmount ? String(initialPricing.yearlyAmount) : '₦0'),
  };

  return (
    <section className="relative py-28 bg-orange-50 text-stone-950 dark:bg-stone-950 dark:text-amber-600 overflow-hidden">

      <div className="max-w-6xl mx-auto px-6">

        {/* HERO */}

        <div className="text-center mb-20">

          <span className="inline-block px-4 py-1.5 mb-5 text-xs font-bold tracking-widest uppercase bg-orange-200 text-orange-800 dark:bg-amber-900/40 dark:text-amber-400 rounded-full">
            StyleVault Pricing
          </span>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6">
            Build Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
              Barber Business Online
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-stone-700 dark:text-amber-400">
            StyleVault gives barbers and hair stylists the tools to manage bookings,
            build credibility, and grow a modern grooming brand.
          </p>

          <p className="mt-4 text-sm font-medium text-stone-500 dark:text-amber-500">
            Start free. Upgrade when you're ready to scale.
          </p>

        </div>

        {/* BILLING TOGGLE */}

        <div className="flex justify-center mb-14">

          <div className="flex p-1 rounded-2xl bg-white/70 dark:bg-stone-900 border border-orange-200 dark:border-stone-800 shadow-sm">

            <button
              onClick={() => setBilling("monthly")}
              className={`px-8 py-3 rounded-xl text-sm font-bold transition ${
                billing === "monthly"
                  ? "bg-white shadow text-stone-950"
                  : "text-stone-500"
              }`}
            >
              Monthly
            </button>

            <button
              onClick={() => setBilling("yearly")}
              className={`px-8 py-3 rounded-xl text-sm font-bold transition flex items-center gap-2 ${
                billing === "yearly"
                  ? "bg-white shadow text-stone-950"
                  : "text-stone-500"
              }`}
            >
              Yearly
              <span className="text-[10px] bg-lime-500 text-white px-2 py-0.5 rounded-full uppercase font-bold">
                Save 20%
              </span>
            </button>

          </div>

        </div>

        {/* PRICING CARDS */}

        <div className="grid lg:grid-cols-2 gap-10 max-w-4xl mx-auto">

          {/* FREE PLAN */}

          <div className="p-8 rounded-3xl bg-white border border-orange-200 dark:bg-stone-900 dark:border-stone-800 shadow-sm">

            <h2 className="text-xl font-bold mb-2">
              Free Plan
            </h2>

            <p className="text-sm text-stone-600 dark:text-amber-500 mb-6">
              Perfect for barbers starting their online presence.
            </p>

            <div className="flex items-end gap-1 mb-8">
              <span className="text-4xl font-black">₦0</span>
              <span className="text-sm text-stone-500">/ forever</span>
            </div>

            <ul className="space-y-4 text-sm mb-10">

              <li>✔ Professional Barber Profile</li>
              <li>✔ Online Appointment Booking</li>
              <li>✔ Service Menu</li>
              <li>✔ Smart Booking Calendar</li>
              <li>✔ Email Notifications</li>
              <li>✔ Verified Badge after 10 satisfied clients</li>

            </ul>

            <button
              onClick={() => window.location.href = "/get-started"}
              className="w-full py-4 rounded-xl border border-orange-300 font-semibold hover:bg-orange-100 transition"
            >
              Create Free Store
            </button>

          </div>

          {/* PRO PLAN */}

          <div className="relative p-8 rounded-3xl bg-stone-900 text-white border-2 border-orange-500 shadow-xl shadow-orange-500/20">

            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 text-xs font-bold uppercase tracking-widest">
              Most Popular
            </div>

            <h2 className="text-xl font-bold mb-2">
              Pro Plan
            </h2>

            <p className="text-sm text-stone-400 mb-6">
              For professionals ready to grow their brand and income.
            </p>

            <div className="flex items-end gap-1 mb-2">

              <span className="text-4xl font-black">
                {price[billing]}
              </span>

              <span className="text-sm text-stone-400">
                /{billing === "monthly" ? "mo" : "yr"}
              </span>

            </div>

            <p className="text-xs text-orange-400 mb-8">
              Local pricing optimized for Nigeria
            </p>

            <ul className="space-y-4 text-sm mb-10">

              <li>✔ Everything in Free</li>
              <li>✔ Custom Professional Domain</li>
              <li>✔ SEO Optimized Barber Page</li>
              <li>✔ Automated Booking Confirmations</li>
              <li>✔ Customer Reviews & Ratings</li>
              <li>✔ Accept Tips from Clients</li>
              <li>✔ Mini Barber Shop (Sell Products)</li>
              <li>✔ Advanced Business Analytics</li>

            </ul>

            <button
              onClick={() => setShowForm(true)}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold hover:opacity-90 transition shadow-lg"
            >
              Upgrade to Pro
            </button>

            <p className="text-center text-xs text-stone-400 mt-4">
              Trusted by barbers building modern grooming businesses.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}