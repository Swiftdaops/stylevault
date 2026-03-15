"use client"

import Link from "next/link"
import { motion } from 'framer-motion'

const startCards = [
  {
    href: "/about",
    ariaLabel: "Learn about StyleVault",
    title: "About StyleVault",
    description:
      "StyleVault is a platform produced and provided by 4TEK.dev. It allows professionals in the grooming and beauty industry to create their own digital storefront where clients can book services and manage appointments online.",
    cta: "Learn more",
    image:
      "https://placehold.co/1200x1600/fff7ed/7c2d12?text=StyleVault",
    overlay: "bg-white/45 dark:bg-black/50",
  },
  {
    href: "/barbers/register",
    ariaLabel: "Start as Barber",
    title: "Get Started as a Barber",
    description:
      "Create your own barber storefront, list your services, accept online bookings, and grow your customer base.",
    cta: "Start as Barber",
    image:
      "https://res.cloudinary.com/dnitzkowt/image/upload/v1773545564/Chaps_Co_Barbershop_on_Instagram__All_heroes_wear_capes__chapsandcobarbershop_KeepItHandsome_ewwk4w.jpg",
    overlay: "bg-white/30 dark:bg-black/40",
  },
  {
    href: "/hair-specialists/register",
    ariaLabel: "Start as Hair Stylist",
    title: "Get Started as a Hair Stylist",
    description:
      "Build your own stylist page where clients can discover your services, book appointments, and connect with your brand.",
    cta: "Start as Hair Stylist",
    image:
      "https://res.cloudinary.com/dnitzkowt/image/upload/v1773545567/When_y_uc2gp4.jpg",
    overlay: "bg-white/35 dark:bg-black/45",
  },
  {
    href: "/nail-technicians/register",
    ariaLabel: "Start as Nail Technician",
    title: "Get Started as a Nail Technician",
    description:
      "Launch your own nail booking page, list manicures and pedicures, accept appointments, and grow your beauty brand online.",
    cta: "Start as Nail Technician",
    image:
      "https://res.cloudinary.com/dnitzkowt/image/upload/v1773574960/Professional_Manicure_Process_Step_by_Step_Nail_Care_Inspiration_es8rop.jpg",
    overlay: "bg-white/35 dark:bg-black/45",
  },
  {
    href: "/lash-technicians/register",
    ariaLabel: "Start as Lash Technician",
    title: "Get Started as a Lash Technician",
    description:
      "Launch your own lash booking page, list classic, hybrid, and volume sets, accept appointments, and grow your beauty brand online.",
    cta: "Start as Lash Technician",
    image:
      "https://res.cloudinary.com/dnitzkowt/image/upload/v1773574325/LASH_MASTER_hvouog.jpg",
    overlay: "bg-white/35 dark:bg-black/45",
  },
  {
    href: "/makeup-artists/register",
    ariaLabel: "Start as Makeup Artist",
    title: "Get Started as a Makeup Artist",
    description:
      "Launch your own makeup booking page, list bridal and glam services, accept appointments, and grow your beauty brand online.",
    cta: "Start as Makeup Artist",
    image:
      "https://res.cloudinary.com/dnitzkowt/image/upload/v1773574318/q3bs23hkql7gl8q1c4g0.jpg",
    overlay: "bg-white/35 dark:bg-black/45",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

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
}

export default function GetStartedPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-b from-orange-50 via-white to-orange-50 px-4 py-20 dark:from-neutral-950 dark:via-neutral-950 dark:to-stone-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="relative overflow-hidden rounded-[2rem] border border-orange-100 bg-white/90 px-6 py-12 shadow-2xl shadow-orange-100/50 backdrop-blur dark:border-stone-800 dark:bg-stone-900/85 dark:shadow-black/20 sm:px-10 lg:px-12"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <div className="absolute inset-x-0 top-0 h-44 bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.16),_transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.12),_transparent_55%)]" />

          <motion.div variants={item} className="relative text-center">
            <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-orange-700 dark:border-stone-700 dark:bg-stone-950 dark:text-amber-300">
              Choose your path
            </span>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-5xl lg:text-6xl">
              Get started with the StyleVault experience that fits your niche.
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-neutral-600 dark:text-neutral-300 sm:text-lg">
              Start with an overview of the platform or jump straight into the
              registration flow for barbering, hair, nails, lashes, or makeup.
              Every page is designed to look polished and perform well on mobile.
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="relative mt-10 grid gap-4 rounded-3xl border border-orange-100 bg-orange-50/80 p-4 text-center dark:border-stone-800 dark:bg-stone-950 sm:grid-cols-3 sm:p-6"
          >
            <div>
              <p className="text-2xl font-black text-neutral-900 dark:text-white">5</p>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Beauty niches supported</p>
            </div>
            <div>
              <p className="text-2xl font-black text-neutral-900 dark:text-white">Mobile-first</p>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Designed to look great on phones</p>
            </div>
            <div>
              <p className="text-2xl font-black text-neutral-900 dark:text-white">Flexible</p>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Free to start and ready to scale</p>
            </div>
          </motion.div>

          <motion.div
            className="relative mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {startCards.map((card) => (
              <motion.div key={card.href} variants={item} className="h-full">
                <Link
                  href={card.href}
                  aria-label={card.ariaLabel}
                  className="group relative block h-full overflow-hidden rounded-[1.75rem] border border-neutral-200 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-neutral-800"
                >
                  <div
                    className="absolute inset-0 scale-105 bg-cover bg-center transition duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url('${card.image}')` }}
                    aria-hidden="true"
                  />
                  <div className={`absolute inset-0 ${card.overlay}`} aria-hidden="true" />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <div className="relative flex h-full min-h-[320px] flex-col justify-between p-6 text-left sm:min-h-[360px] sm:p-8">
                    <div>
                      <h2 className="mb-4 max-w-xs text-2xl font-bold text-neutral-900 dark:text-white">
                        {card.title}
                      </h2>

                      <p className="max-w-sm text-sm leading-7 text-neutral-800 dark:text-neutral-100">
                        {card.description}
                      </p>
                    </div>

                    <span className="inline-flex w-fit items-center justify-center rounded-2xl bg-black/90 px-5 py-3 text-sm font-semibold text-white transition group-hover:bg-neutral-800 dark:bg-white/90 dark:text-black dark:group-hover:bg-white">
                      {card.cta}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}