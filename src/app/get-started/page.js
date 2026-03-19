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
  Info,
  ChevronRight
} from "lucide-react"

const startCards = [
  {
    id: "about",
    href: "/about",
    title: "The Vision",
    label: "About StyleVault",
    description: "StyleVault is a premium digital ecosystem allowing beauty professionals to host high-conversion storefronts.",
    icon: <Info size={20} />,
    image: "https://placehold.co/1200x1600/e0f2fe/0369a1?text=StyleVault+Pro",
    color: "sky"
  },
  {
    id: "barber",
    href: "/barbers/register",
    title: "Master Barber",
    label: "Precision & Craft",
    description: "Accept bookings, manage walk-ins, and showcase your best fades with a custom barber storefront.",
    icon: <Scissors size={20} />,
    image: "https://res.cloudinary.com/dnitzkowt/image/upload/v1773545564/Chaps_Co_Barbershop_on_Instagram__All_heroes_wear_capes__chapsandcobarbershop_KeepItHandsome_ewwk4w.jpg",
    color: "blue"
  },
  {
    id: "hair",
    href: "/hair-specialists/register",
    title: "Hair Specialist",
    label: "Color & Style",
    description: "From silk presses to custom installs, give your clients a luxury booking experience that matches your art.",
    icon: <Sparkles size={20} />,
    image: "https://res.cloudinary.com/dnitzkowt/image/upload/v1773545567/When_y_uc2gp4.jpg",
    color: "indigo"
  },
  {
    id: "nails",
    href: "/nail-technicians/register",
    title: "Nail Tech",
    label: "Detail & Design",
    description: "Launch your manicuring empire. Handle set-durations and add-ons effortlessly with our Pro tools.",
    icon: <Fingerprint size={20} />,
    image: "https://res.cloudinary.com/dnitzkowt/image/upload/v1773574960/Professional_Manicure_Process_Step_by_Step_Nail_Care_Inspiration_es8rop.jpg",
    color: "rose"
  },
  {
    id: "lashes",
    href: "/lash-technicians/register",
    title: "Lash Artist",
    label: "Volume & Care",
    description: "Manage refills and full-sets. StyleVault helps you maintain a high-end portfolio for your lash brand.",
    icon: <Eye size={20} />,
    image: "https://res.cloudinary.com/dnitzkowt/image/upload/v1773574325/LASH_MASTER_hvouog.jpg",
    color: "pink"
  },
  {
    id: "makeup",
    href: "/makeup-artists/register",
    title: "Makeup Artist",
    label: "Glamour & Bridal",
    description: "Organize bridal party bookings and event glam. Professional tools for the modern makeup professional.",
    icon: <Palette size={20} />,
    image: "https://res.cloudinary.com/dnitzkowt/image/upload/v1773574318/q3bs23hkql7gl8q1c4g0.jpg",
    color: "amber"
  },
]

export default function GetStartedPage() {
  const [activeTab, setActiveTab] = useState(startCards[0])

  return (
    <main className="min-h-screen bg-sky-50 transition-colors duration-500 dark:bg-stone-950">
      {/* Animated Background Aura */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-sky-200/40 blur-[120px] dark:bg-sky-900/20" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[40%] w-[40%] rounded-full bg-blue-200/40 blur-[120px] dark:bg-indigo-900/20" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center lg:text-left"
        >
          <span className="inline-flex rounded-full bg-sky-100 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-sky-700 dark:bg-sky-500/10 dark:text-sky-400">
            StyleVault Ecosystem
          </span>
          <h1 className="mt-6 text-4xl font-black tracking-tighter text-stone-900 dark:text-white sm:text-6xl lg:text-7xl">
            Choose Your <br />
            <span className="text-sky-600 dark:text-sky-400">Professional Path.</span>
          </h1>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          
          {/* LEFT SIDE: The "Unique Card" Visualizer (Sticky on Desktop) */}
          <div className="sticky top-32 hidden lg:block">
            <motion.div 
              layoutId="unique-card"
              className="relative aspect-[4/5] overflow-hidden rounded-[3rem] border border-white/40 bg-white/20 p-4 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-white/5"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab.id}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="relative h-full w-full overflow-hidden rounded-[2.2rem]"
                >
                  <img 
                    src={activeTab.image} 
                    alt={activeTab.title} 
                    className="h-full w-full object-cover"
                  />
                  {/* Glassy Overlay Info */}
                  <div className="absolute inset-0 bg-linear-to-t from-stone-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <p className="text-xs font-bold uppercase tracking-widest text-sky-400">{activeTab.label}</p>
                    <h2 className="mt-2 text-3xl font-bold text-white">{activeTab.title}</h2>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Floating Stats Label */}
            <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -right-8 top-20 rounded-2xl border border-white/50 bg-white/80 p-4 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-stone-900/80"
            >
                <p className="text-[10px] font-black uppercase text-stone-500 dark:text-stone-400">Live Demo</p>
                <p className="text-sm font-bold dark:text-white">Pro Interface v3.0</p>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Interactive Path Selection */}
          <div className="space-y-4">
            {startCards.map((card) => {
              const isActive = activeTab.id === card.id
              return (
                <motion.div
                  key={card.id}
                  onMouseEnter={() => setActiveTab(card)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="relative h-full"
                >
                  <Link
                    href={card.href}
                    className={`group relative flex items-center gap-6 rounded-[2rem] border p-6 transition-all duration-300 ${
                      isActive 
                      ? "border-sky-200 bg-white shadow-xl dark:border-sky-500/30 dark:bg-white/5" 
                      : "border-transparent bg-transparent hover:bg-sky-100/50 dark:hover:bg-white/5"
                    }`}
                  >
                    {/* Icon Circle */}
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 ${
                      isActive ? "bg-sky-600 text-white" : "bg-stone-200 text-stone-500 dark:bg-stone-800 dark:text-stone-400"
                    }`}>
                      {card.icon}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className={`text-xl font-bold transition-colors ${isActive ? "text-stone-900 dark:text-white" : "text-stone-500 dark:text-stone-400"}`}>
                          {card.title}
                        </h3>
                        {isActive && (
                          <motion.div layoutId="arrow">
                            <ArrowRight className="text-sky-600 dark:text-sky-400" size={20} />
                          </motion.div>
                        )}
                      </div>
                      <p className={`mt-1 text-sm leading-relaxed transition-opacity ${isActive ? "opacity-100" : "opacity-0 h-0 overflow-hidden lg:h-auto lg:opacity-60"}`}>
                        {card.description}
                      </p>
                    </div>

                    {/* Mobile Only Image Preview */}
                    <div className="lg:hidden h-16 w-16 rounded-xl overflow-hidden shrink-0 border border-stone-200 dark:border-white/10">
                        <img src={card.image} className="h-full w-full object-cover" />
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

        </div>

        {/* Footer Minimal Stats */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 grid grid-cols-2 gap-4 border-t border-stone-200 pt-12 dark:border-white/5 lg:grid-cols-4"
        >
          {[
            { val: "5+", lab: "Industry Niches" },
            { val: "Pro", lab: "Storefront UI" },
            { val: "24/7", lab: "Booking Engine" },
            { val: "Free", lab: "To Get Started" },
          ].map((stat, i) => (
            <div key={i} className="text-center lg:text-left">
              <p className="text-2xl font-black text-stone-900 dark:text-white">{stat.val}</p>
              <p className="text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400">{stat.lab}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </main>
  )
}