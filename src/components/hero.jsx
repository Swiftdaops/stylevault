'use client'

import Link from "next/link"
import { motion } from "framer-motion"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 }
}

const card = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4 }
  }
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-orange-50 px-4 py-20 text-stone-950 dark:bg-black dark:text-amber-500">

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-6xl"
      >

        <div className="grid items-center gap-14 lg:grid-cols-2">

          {/* LEFT SIDE */}
          <motion.div variants={container} className="space-y-7">

            <motion.span
              variants={item}
              className="inline-flex rounded-full border border-orange-300 px-3 py-1 text-sm font-medium dark:border-stone-700"
            >
              Booking platform for barbers, hair stylists & nail technicians
            </motion.span>

            <motion.h1
              variants={item}
              className="text-5xl font-bold tracking-tight sm:text-6xl"
            >
              Turn your salon into a
              <span className="block text-amber-500">
                powerful online business
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="max-w-xl text-lg text-stone-700 dark:text-amber-200"
            >
              StyleVault helps barbers, salons, hair specialists, and nail technicians run their
              business online. Create your own booking website, manage
              appointments, and showcase your services — all from one platform.
            </motion.p>

            {/* CTA BUTTONS */}
            <motion.div
              variants={item}
              className="flex flex-wrap gap-4 pt-2"
            >

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/get-started"
                  className="inline-flex items-center rounded-full bg-stone-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 dark:bg-amber-500 dark:text-black dark:hover:bg-amber-400"
                >
                  Create your salon page
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/pricing"
                  className="inline-flex items-center rounded-full border border-orange-300 px-6 py-3 text-sm font-medium transition hover:bg-orange-100 dark:border-stone-700 dark:hover:bg-stone-900"
                >
                  View pricing
                </Link>
              </motion.div>

            </motion.div>

            <motion.p
              variants={item}
              className="text-sm text-stone-500 dark:text-amber-300"
            >
              Trusted by modern barbers, stylists, and nail artists building their brand online.
            </motion.p>

          </motion.div>


          {/* RIGHT SIDE */}
          <motion.div
            variants={container}
            className="relative"
          >

            <motion.div
              variants={item}
              className="rounded-3xl border border-orange-200 bg-white p-8 shadow-xl dark:border-stone-800 dark:bg-stone-950"
            >

              <div className="space-y-5">

                <motion.div
                  variants={card}
                  whileHover={{ y: -5 }}
                  className="rounded-2xl border border-orange-200 bg-orange-50 p-5 dark:border-stone-800 dark:bg-stone-900"
                >
                  <p className="text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-amber-300">
                    Your own website
                  </p>

                  <h3 className="mt-2 text-xl font-semibold">
                    nnamdi.stylevault.store
                  </h3>

                  <p className="mt-1 text-sm text-stone-600 dark:text-amber-200">
                    Every stylist gets a personal storefront where clients can
                    discover services and book appointments.
                  </p>
                </motion.div>


                <motion.div
                  variants={card}
                  whileHover={{ y: -5 }}
                  className="rounded-2xl border border-orange-200 bg-orange-50 p-5 dark:border-stone-800 dark:bg-stone-900"
                >
                  <p className="text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-amber-300">
                    Smart booking
                  </p>

                  <h3 className="mt-2 text-xl font-semibold">
                    Accept bookings 24/7
                  </h3>

                  <p className="mt-1 text-sm text-stone-600 dark:text-amber-200">
                    Clients can view availability, choose services, and confirm
                    appointments instantly.
                  </p>
                </motion.div>


                <motion.div
                  variants={card}
                  whileHover={{ y: -5 }}
                  className="rounded-2xl border border-orange-200 bg-orange-50 p-5 dark:border-stone-800 dark:bg-stone-900"
                >
                  <p className="text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-amber-300">
                    Grow your brand
                  </p>

                  <h3 className="mt-2 text-xl font-semibold">
                    Showcase your portfolio
                  </h3>

                  <p className="mt-1 text-sm text-stone-600 dark:text-amber-200">
                    Display hairstyles, services, and client feedback to build
                    credibility and attract new customers.
                  </p>
                </motion.div>

              </div>

            </motion.div>

          </motion.div>

        </div>

      </motion.div>

    </section>
  )
}