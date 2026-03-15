"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'

const sectionContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const sectionItem = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: 'easeOut',
    },
  },
}

const platformHighlights = [
  'Online booking pages that look professional on mobile and desktop',
  'Service menus, pricing, and availability in one clear storefront',
  'Customer management tools to keep every appointment organized',
  'Automated notifications and smoother client communication',
]

const platformCards = [
  {
    title: 'Storefronts that convert',
    description:
      'Give every client a clean page to explore your services, pricing, reviews, and availability without confusion.',
  },
  {
    title: 'Bookings that stay organized',
    description:
      'Move from scattered messages to a structured appointment flow built for modern service businesses.',
  },
  {
    title: 'Growth tools for professionals',
    description:
      'From mini shops to Pro features, StyleVault helps you earn more from the audience you already attract.',
  },
]

const niches = [
  {
    title: 'Barbers',
    description:
      'Create a premium barber storefront, list cuts and grooming services, and let clients book without the back-and-forth.',
    href: '/barbers/register',
    accent: 'from-orange-500 to-amber-500',
    ring: 'hover:border-orange-300 dark:hover:border-orange-500/40',
  },
  {
    title: 'Hair Specialists',
    description:
      'Showcase installs, treatments, styling sessions, and consultations with a booking flow built for hair professionals.',
    href: '/hair-specialists/register',
    accent: 'from-rose-500 to-pink-500',
    ring: 'hover:border-rose-300 dark:hover:border-rose-500/40',
  },
  {
    title: 'Nail Technicians',
    description:
      'Promote manicures, pedicures, acrylics, and nail art with a page designed to make your work easy to book.',
    href: '/nail-technicians/register',
    accent: 'from-fuchsia-500 to-pink-500',
    ring: 'hover:border-fuchsia-300 dark:hover:border-fuchsia-500/40',
  },
  {
    title: 'Lash Technicians',
    description:
      'Present classic, hybrid, volume, and refill services with availability and pricing clients can trust.',
    href: '/lash-technicians/register',
    accent: 'from-violet-500 to-purple-500',
    ring: 'hover:border-violet-300 dark:hover:border-violet-500/40',
  },
  {
    title: 'Makeup Artists',
    description:
      'Offer bridal, soft glam, editorial, and event services through a polished online profile that sells your expertise.',
    href: '/makeup-artists/register',
    accent: 'from-emerald-500 to-teal-500',
    ring: 'hover:border-emerald-300 dark:hover:border-emerald-500/40',
  },
]

export function AboutPlatform() {
  return (
    <section className="bg-orange-50 py-20 dark:bg-stone-950">
      <motion.div
        className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
        variants={sectionContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        <motion.div variants={sectionItem} className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-orange-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-orange-700 dark:border-stone-800 dark:bg-stone-900 dark:text-amber-300">
            Built for beauty businesses
          </span>
          <h2 className="mt-5 text-3xl font-black tracking-tight text-stone-950 dark:text-white sm:text-4xl">
            One platform for storefronts, bookings, and business growth.
          </h2>
          <p className="mt-5 text-base leading-8 text-stone-600 dark:text-stone-300 sm:text-lg">
            StyleVault helps independent professionals move from scattered DMs and
            manual scheduling to a cleaner booking experience that feels credible,
            modern, and easy for clients to trust.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            variants={sectionItem}
            className="rounded-3xl border border-orange-100 bg-white p-6 shadow-xl shadow-orange-100/40 dark:border-stone-800 dark:bg-stone-900 sm:p-8"
          >
            <h3 className="text-2xl font-bold text-stone-950 dark:text-white">
              What StyleVault provides
            </h3>
            <div className="mt-6 space-y-4">
              {platformHighlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-start gap-3 rounded-2xl bg-orange-50/80 p-4 text-sm text-stone-700 dark:bg-stone-950 dark:text-stone-300"
                >
                  <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={sectionItem} className="grid gap-4">
            {platformCards.map((card) => (
              <div
                key={card.title}
                className="rounded-3xl border border-stone-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg dark:border-stone-800 dark:bg-stone-900"
              >
                <h3 className="text-xl font-bold text-stone-950 dark:text-white">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-300">
                  {card.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export function WhoItsFor() {
  return (
    <section className="py-20">
      <motion.div
        className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
        variants={sectionContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12 }}
      >
        <motion.div variants={sectionItem} className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-black tracking-tight text-stone-950 dark:text-white sm:text-4xl">
            Built for all 5 StyleVault niches.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-stone-600 dark:text-stone-300 sm:text-lg">
            Choose your niche, launch your page, and start receiving bookings with
            a setup that fits the way your beauty business actually works.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {niches.map((niche) => (
            <motion.div
              key={niche.title}
              variants={sectionItem}
              className={`group flex h-full flex-col rounded-3xl border border-stone-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-stone-800 dark:bg-stone-900 ${niche.ring}`}
            >
              <div className={`h-1.5 w-20 rounded-full bg-gradient-to-r ${niche.accent}`} />
              <h3 className="mt-6 text-2xl font-bold text-stone-950 dark:text-white">
                {niche.title}
              </h3>
              <p className="mt-4 flex-1 text-sm leading-7 text-stone-600 dark:text-stone-300">
                {niche.description}
              </p>

              <div className="mt-6 flex items-center gap-3">
                <Link
                  href={niche.href}
                  className={`inline-flex items-center justify-center rounded-2xl bg-gradient-to-r px-5 py-3 text-sm font-semibold text-white shadow-md transition group-hover:shadow-lg ${niche.accent}`}
                >
                  Get Started
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-2xl border border-stone-300 px-4 py-3 text-sm font-semibold text-stone-900 transition hover:border-stone-400 hover:bg-stone-50 dark:border-stone-700 dark:text-white dark:hover:bg-stone-800"
                >
                  View Pro
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}