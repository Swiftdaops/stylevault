import Link from 'next/link';
import { LockKeyhole } from 'lucide-react';

import LuxuryHeroSlider from '@/components/luxury-hero-slider';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-amber-50 via-stone-100 to-cyan-50 px-4 py-10 text-stone-950 dark:from-[#050505] dark:via-[#0d0a06] dark:to-[#03131a] dark:text-white sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -left-24 -top-16 h-64 w-64 rounded-full bg-amber-300/30 blur-3xl dark:bg-amber-500/12" />
      <div className="pointer-events-none absolute -bottom-28 -right-16 h-72 w-72 rounded-full bg-cyan-300/30 blur-3xl dark:bg-cyan-400/10" />

      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
        <div className="relative overflow-hidden rounded-4xl border border-white/70 bg-white/75 p-8 shadow-[0_30px_100px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-[0_35px_120px_rgba(0,0,0,0.45)] sm:p-10">
          <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-amber-100/55 via-transparent to-cyan-100/70 dark:from-amber-500/10 dark:via-transparent dark:to-cyan-400/10" />
          <div className="pointer-events-none absolute inset-0 rounded-4xl border border-white/50 dark:border-white/10" />
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-white/80 dark:bg-white/15" />
          <div className="pointer-events-none absolute inset-y-8 right-0 w-px bg-stone-200/80 dark:bg-white/10" />
          <div className="pointer-events-none absolute -right-10 top-1/2 hidden -translate-y-1/2 lg:block" aria-hidden="true">
            <LockKeyhole className="absolute -left-6 top-6 h-64 w-64 text-amber-400/25 blur-[1px] dark:text-amber-300/12" strokeWidth={1.2} />
            <LockKeyhole className="relative h-72 w-72 text-cyan-500/20 dark:text-cyan-300/10" strokeWidth={1.2} />
          </div>

          <div className="relative z-10 space-y-8">
            <span className="inline-flex rounded-full border border-amber-200/80 bg-white/80 px-4 py-2 text-[0.72rem] font-medium uppercase tracking-[0.3em] text-stone-700 shadow-sm dark:border-white/15 dark:bg-white/8 dark:text-white/75">
              Premium beauty 
            </span>

            <div className="space-y-5">
              <h1 className="max-w-xl text-5xl font-semibold tracking-tight text-stone-950 dark:text-white sm:text-6xl lg:text-7xl">
                Your brand. Your website. Bookings and reviews — all in one place. Free to start.
              </h1>

              <p className="mb-6 max-w-2xl text-base leading-8 text-stone-600 dark:text-white/70 sm:text-lg">
                Create a clean, high-end storefront for your beauty business — let clients book appointments, explore your services, and trust your brand instantly.
              </p>
            </div>

   
           

            <div className="flex flex-wrap gap-4">
              <Link
                href="/get-started"
                className="inline-flex items-center rounded-full bg-stone-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 dark:bg-amber-500 dark:text-black dark:hover:bg-amber-400"
              >
                Get Started
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center rounded-full border border-stone-300 bg-white/80 px-6 py-3 text-sm font-medium text-stone-900 transition hover:bg-white dark:border-white/15 dark:bg-white/8 dark:text-white dark:hover:bg-white/12"
              >
                Pricing
              </Link>
            </div>
          </div>
        </div>

        <LuxuryHeroSlider />
      </div>
    </section>
  );
}