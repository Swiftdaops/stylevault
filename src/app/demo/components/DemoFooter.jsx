"use client"

import Link from "next/link"
import UpgradeToProButton from '@/components/pro-upgrade-button'
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

const demoLinks = [
  { label: "Barber Pro", href: "/demo/barber-pro" },
  { label: "Hair Specialist Pro", href: "/demo/hair-specialist-pro" },
  { label: "Nail Tech Pro", href: "/demo/nail-tech-pro" },
  { label: "Lash Tech Pro", href: "/demo/lash-tech-pro" },
  { label: "Makeup Artist Pro", href: "/demo/makeup-artist-pro" },
]

const brandMessages = {
  "/demo/barber-pro": {
    brand: "Crown & Fade Studio",
    message: "Precision is our craft. Confidence is the result.",
  },
  "/demo/hair-specialist-pro": {
    brand: "Jennie's Hairs Collection",
    message: "Your hair is your crown — we make it unforgettable.",
  },
  "/demo/nail-tech-pro": {
    brand: "Gloss Nail Studio",
    message: "Detail, shine, and elegance in every touch.",
  },
  "/demo/lash-tech-pro": {
    brand: "Lash Muse",
    message: "Enhance your gaze. Define your beauty.",
  },
  "/demo/makeup-artist-pro": {
    brand: "Aura Beauty",
    message: "Beauty is your identity — we bring it to life.",
  },
}

export default function DemoFooter() {
  const pathname = usePathname()
  const brandData = brandMessages[pathname]

  return (
    <footer className="border-t border-stone-200  dark:border-white/10 dark:bg-stone-950/90">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">

        {/* LEFT */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {brandData ? (
                <>
                  <div className="inline-flex items-center rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-sky-600 dark:text-sky-300">
                    A message from {brandData.brand}
                  </div>

                  <h2 className="mt-5 text-3xl font-black tracking-tight text-stone-950 dark:text-white sm:text-4xl">
                    {brandData.message}
                  </h2>

                  <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600 dark:text-stone-300 sm:text-base">
                    This is what a premium storefront feels like — designed to
                    attract clients, build trust, and grow your business effortlessly.
                  </p>
                </>
              ) : (
                <>
                  <div className="inline-flex items-center rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-orange-700 dark:text-orange-300">
                    StyleVault Pro Preview
                  </div>

                  <h2 className="mt-5 text-3xl font-black tracking-tight text-stone-950 dark:text-white sm:text-4xl">
                    Launch a premium storefront that helps beauty pros book more and earn more.
                  </h2>

                  <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600 dark:text-stone-300 sm:text-base">
                    Explore how Pro unlocks polished branding, stronger trust signals, and higher conversion across every niche.
                  </p>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/pricing"
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-stone-200"
            >
              View pricing
            </Link>
            <UpgradeToProButton
              label="Start your storefront"
              className="rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-stone-100 dark:border-white/15 dark:text-white dark:hover:bg-white/10"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="grid gap-8 sm:grid-cols-2">

          {/* DEMO LINKS */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">
              Demo routes
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-stone-600 dark:text-stone-300">
              {demoLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition hover:text-stone-950 dark:hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* VALUE */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">
              Why Pro works
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-stone-600 dark:text-stone-300">
              <li>Custom professional domain</li>
              <li>SEO-optimized storefront</li>
              <li>Reviews and social proof</li>
              <li>Tips, products, and analytics</li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  )
}