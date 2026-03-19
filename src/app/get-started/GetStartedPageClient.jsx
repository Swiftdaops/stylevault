"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  Scissors,
  Sparkles,
  Fingerprint,
  Eye,
  Palette,
  Lock,
} from "lucide-react"

const STYLEVAULT_LOGO_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg width="1200" height="1600" viewBox="0 0 1200 1600" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="1600" rx="96" fill="#0F172A"/>
  <circle cx="600" cy="520" r="340" fill="url(#glow)" fill-opacity="0.78"/>
  <rect x="320" y="360" width="560" height="700" rx="88" fill="#111827" stroke="#FDE68A" stroke-width="24"/>
  <path d="M430 620V500C430 406.112 506.112 330 600 330C693.888 330 770 406.112 770 500V620" stroke="#FACC15" stroke-width="48" stroke-linecap="round"/>
  <rect x="420" y="620" width="360" height="340" rx="64" fill="#FACC15"/>
  <circle cx="600" cy="760" r="58" fill="#92400E"/>
  <rect x="576" y="760" width="48" height="118" rx="24" fill="#92400E"/>
  <text x="600" y="1155" text-anchor="middle" fill="#F8FAFC" font-family="Arial, Helvetica, sans-serif" font-size="108" font-weight="700">StyleVault</text>
  <text x="600" y="1240" text-anchor="middle" fill="#FDE68A" font-family="Arial, Helvetica, sans-serif" font-size="42" letter-spacing="12">SECURE BEAUTY PLATFORM</text>
  <defs>
    <radialGradient id="glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(600 520) rotate(90) scale(340)">
      <stop stop-color="#FDE68A"/>
      <stop offset="1" stop-color="#FDE68A" stop-opacity="0"/>
    </radialGradient>
  </defs>
</svg>
`)}`

const startCards = [
  {
    id: "about",
    href: "/about",
    title: "The Vision",
    label: "About StyleVault",
    description: "A premium digital ecosystem allowing beauty professionals to host high-conversion storefronts.",
    icon: <Lock size={20} className="text-yellow-400" />,
    image: STYLEVAULT_LOGO_IMAGE,
  },
  {
    id: "barber",
    href: "/barbers/register",
    title: "Barber",
    label: "Precision & Craft",
    description: "Accept bookings, manage walk-ins, and showcase your best fades with a custom storefront.",
    icon: <Scissors size={20} />,
    image: "https://res.cloudinary.com/dnitzkowt/image/upload/v1773545564/Chaps_Co_Barbershop_on_Instagram__All_heroes_wear_capes__chapsandcobarbershop_KeepItHandsome_ewwk4w.jpg",
  },
  {
    id: "hair",
    href: "/hair-specialists/register",
    title: "Hair Specialist",
    label: "Color & Style",
    description: "From silk presses to custom installs, give your clients a luxury booking experience.",
    icon: <Sparkles size={20} />,
    image: "https://res.cloudinary.com/dnitzkowt/image/upload/v1773545567/When_y_uc2gp4.jpg",
  },
  {
    id: "nails",
    href: "/nail-technicians/register",
    title: "Nail Technician",
    label: "Detail & Design",
    description: "Launch your manicuring empire. Handle set-durations and add-ons effortlessly.",
    icon: <Fingerprint size={20} />,
    image: "https://res.cloudinary.com/dnitzkowt/image/upload/v1773574960/Professional_Manicure_Process_Step_by_Step_Nail_Care_Inspiration_es8rop.jpg",
  },
  {
    id: "lashes",
    href: "/lash-technicians/register",
    title: "Lash Technician",
    label: "Volume & Care",
    description: "Manage refills and full-sets while maintaining a high-end digital portfolio.",
    icon: <Eye size={20} />,
    image: "https://res.cloudinary.com/dnitzkowt/image/upload/v1773574325/LASH_MASTER_hvouog.jpg",
  },
  {
    id: "makeup",
    href: "/makeup-artists/register",
    title: "Makeup Artist",
    label: "Glamour & Bridal",
    description: "Organize bridal party bookings and event glam with professional artist tools.",
    icon: <Palette size={20} />,
    image: "https://res.cloudinary.com/dnitzkowt/image/upload/v1773574318/q3bs23hkql7gl8q1c4g0.jpg",
  },
]

export default function GetStartedPageClient() {
  const [activeTab, setActiveTab] = useState(startCards[0])

  return (
    <main className="min-h-screen bg-sky-50 transition-colors duration-500 dark:bg-stone-950">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[50%] rounded-full bg-sky-200/30 blur-[120px] dark:bg-sky-900/10" />
        <div className="absolute bottom-0 right-0 h-[30%] w-[30%] rounded-full bg-blue-100/40 blur-[100px] dark:bg-indigo-900/10" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center lg:mb-20 lg:text-left"
        >
          <span className="inline-flex rounded-full bg-sky-500/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-sky-600 dark:text-sky-400">
            StyleVault Ecosystem
          </span>
          <h1 className="mt-6 text-4xl font-black tracking-tighter text-stone-900 dark:text-white sm:text-6xl lg:text-7xl">
            Choose Your <br className="hidden lg:block" />
            <span className="text-sky-600 dark:text-sky-400">Professional Path.</span>
          </h1>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-20">
          <div className="sticky top-28 hidden lg:block">
            <motion.div
              layoutId="visualizer"
              className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-white/50 bg-white/30 p-3 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-white/5"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative h-full w-full overflow-hidden rounded-[2rem]"
                >
                  <img src={activeTab.image} alt={`${activeTab.title} preview`} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-linear-to-t from-stone-950/90 via-stone-950/20 to-transparent" />
                  <div className="absolute bottom-10 left-10 right-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400">{activeTab.label}</p>
                    <h2 className="mt-2 text-4xl font-bold tracking-tight text-white">{activeTab.title}</h2>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          <div className="flex flex-col gap-3 sm:gap-4">
            {startCards.map((card) => {
              const isActive = activeTab.id === card.id
              return (
                <motion.div
                  key={card.id}
                  onMouseEnter={() => setActiveTab(card)}
                  className="relative"
                >
                  <Link
                    href={card.href}
                    className={`group relative flex flex-col gap-5 rounded-[2rem] border p-5 transition-all duration-500 sm:flex-row sm:items-center sm:p-7 ${
                      isActive
                        ? "border-sky-200 bg-white shadow-2xl shadow-sky-200/20 dark:border-sky-500/30 dark:bg-white/5"
                        : "border-transparent bg-transparent hover:bg-white/40 dark:hover:bg-white/5"
                    }`}
                  >
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-all duration-500 ${
                      isActive
                        ? "bg-sky-600 text-white rotate-0 shadow-lg shadow-sky-600/30"
                        : "bg-stone-200/50 text-stone-500 dark:bg-stone-800 dark:text-stone-400 group-hover:bg-sky-100"
                    }`}>
                      {card.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className={`text-xl font-bold tracking-tight transition-colors ${isActive ? "text-stone-900 dark:text-white" : "text-stone-400 dark:text-stone-500"}`}>
                          {card.title}
                        </h3>
                        <ArrowRight
                          className={`transition-all duration-300 ${isActive ? "translate-x-0 opacity-100 text-sky-600" : "-translate-x-4 opacity-0 text-stone-300"}`}
                          size={20}
                        />
                      </div>

                      <motion.p
                        initial={false}
                        animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                        className="mt-2 overflow-hidden pr-6 text-sm leading-relaxed text-stone-600 dark:text-stone-300"
                      >
                        {card.description}
                      </motion.p>
                    </div>

                    <div className={`lg:hidden overflow-hidden rounded-2xl transition-all duration-500 ${isActive ? "mt-2 h-32 opacity-100" : "h-0 opacity-0"}`}>
                      <img src={card.image} className="h-full w-full object-cover" alt={`${card.title} preview`} />
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 grid grid-cols-2 gap-8 border-t border-stone-200 pt-12 dark:border-white/10 lg:grid-cols-4 lg:gap-12"
        >
          {[
            { val: "5+", lab: "Niches" },
            { val: "Pro", lab: "Interface" },
            { val: "24/7", lab: "Booking" },
            { val: "Active", lab: "Support" },
          ].map((stat, i) => (
            <div key={i} className="space-y-1">
              <p className="text-3xl font-black tracking-tighter text-stone-900 dark:text-white">{stat.val}</p>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">{stat.lab}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </main>
  )
}
