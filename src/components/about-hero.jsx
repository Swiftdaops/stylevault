'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

const stats = [
  { label: 'Beauty niches supported', value: '5' },
  { label: 'Core business tools', value: 'Bookings' },
  { label: 'Growth ready', value: 'Storefronts' },
]

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 via-white to-white px-4 py-20 dark:from-stone-950 dark:via-stone-950 dark:to-stone-900 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.18),_transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.12),_transparent_55%)]" />
      <div className="absolute left-1/2 top-24 -z-10 h-48 w-48 -translate-x-1/2 rounded-full bg-orange-200/40 blur-3xl dark:bg-amber-500/10" />

      <motion.div
        className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div>
          <motion.span
            variants={item}
            className="inline-flex rounded-full border border-orange-200 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-orange-700 shadow-sm backdrop-blur dark:border-stone-800 dark:bg-stone-900/80 dark:text-amber-300"
          >
            About StyleVault
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 text-4xl font-black tracking-tight text-stone-950 dark:text-white sm:text-5xl lg:text-6xl"
          >
            The booking platform helping beauty pros turn talent into a brand.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-3xl text-base leading-8 text-stone-600 dark:text-stone-300 sm:text-lg"
          >
            StyleVault by 4TEK.dev gives barbers, hair specialists, nail technicians,
            lash technicians, and makeup artists one place to launch a polished
            storefront, collect bookings, manage clients, and grow with confidence.
          </motion.p>

          <motion.p
            variants={item}
            className="mt-4 max-w-2xl text-sm leading-7 text-stone-500 dark:text-stone-400 sm:text-base"
          >
            We built StyleVault for service professionals who want more than DMs and
            manual scheduling. Your business gets a cleaner customer experience,
            smarter operations, and a stronger online presence.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-orange-600 to-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Get Started
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-2xl border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-900 transition hover:border-orange-300 hover:bg-orange-50 dark:border-stone-700 dark:bg-stone-900 dark:text-white dark:hover:border-amber-400/40 dark:hover:bg-stone-800"
            >
              View Pricing
            </Link>
          </motion.div>
        </div>

        <motion.div variants={item} className="relative">
          <div className="rounded-3xl border border-orange-100 bg-white/90 p-6 shadow-2xl shadow-orange-100/60 backdrop-blur dark:border-stone-800 dark:bg-stone-900/90 dark:shadow-black/20 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-stone-200 bg-stone-50 p-4 dark:border-stone-800 dark:bg-stone-950"
                >
                  <p className="text-2xl font-black text-stone-950 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-gradient-to-br from-stone-950 to-stone-800 p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-200">
                Why professionals switch
              </p>
              <ul className="mt-4 space-y-3 text-sm text-stone-200">
                <li>• Accept bookings without back-and-forth texting</li>
                <li>• Present services, prices, reviews, and availability clearly</li>
                <li>• Upgrade to Pro when you want more reach and revenue tools</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}




