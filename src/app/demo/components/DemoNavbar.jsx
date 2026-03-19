"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ArrowLeft, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import ModeToggle from "@/components/mode-toggle"
import UpgradeToProButton from "@/components/pro-upgrade-button"

const navItems = [
  { label: "Barber Pro", href: "/demo/barber-pro" },
  { label: "Hair Pro", href: "/demo/hair-specialist-pro" },
  { label: "Nail Pro", href: "/demo/nail-tech-pro" },
  { label: "Lash Pro", href: "/demo/lash-tech-pro" },
  { label: "Makeup Pro", href: "/demo/makeup-artist-pro" },
]

const nicheConfig = {
  "/demo/barber-pro": { niche: "Barber", brand: "Crown & Fade Studio", emoji: "💈" },
  "/demo/hair-specialist-pro": { niche: "Hair Specialist", brand: "Luxe Hair Atelier", emoji: "✂️" },
  "/demo/nail-tech-pro": { niche: "Nail Technician", brand: "Gloss Nail Studio", emoji: "💅" },
  "/demo/lash-tech-pro": { niche: "Lash Technician", brand: "Lush Pretty Lash", emoji: "✨" },
  "/demo/makeup-artist-pro": { niche: "Makeup Artist", brand: "Aura Beauty", emoji: "💄" },
}

export default function DemoNavbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isDemoHome = pathname === "/demo"
  const nicheData = nicheConfig[pathname]

  return (
    // GLASS CONTAINER: Light mode uses sky-50/70 (icy white-blue), Dark mode uses stone-950/80
    <header className="sticky top-0 z-50 w-full border-b border-stone-200/50 bg-sky-50/70 backdrop-blur-xl transition-all duration-300 dark:border-white/10 dark:bg-stone-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-3">
          {!isDemoHome && (
            <Link
              href="/demo"
              className="group mr-2 flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white/50 text-stone-600 transition hover:bg-white hover:text-stone-900 dark:border-white/10 dark:bg-white/5 dark:text-stone-400 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <ArrowLeft size={18} />
            </Link>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex items-center gap-3"
            >
              {isDemoHome ? (
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-linear-to-br from-sky-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-sky-500/20">
                    SV
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">StyleVault</p>
                    <p className="text-sm font-bold text-stone-900 dark:text-white">Pro Demos</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-sky-200 bg-sky-100/50 text-xl dark:border-sky-500/30 dark:bg-sky-500/10">
                    {nicheData?.emoji || "✨"}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-stone-900 dark:text-white leading-tight">{nicheData?.brand}</p>
                    <p className="text-[10px] font-medium uppercase tracking-widest text-stone-500 dark:text-stone-400">{nicheData?.niche}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CENTER: DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-1 rounded-full border border-stone-200/50 bg-stone-100/50 p-1 dark:border-white/5 dark:bg-white/5">
          {navItems.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  active
                    ? "bg-white text-sky-600 shadow-sm dark:bg-white/10 dark:text-white"
                    : "text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <UpgradeToProButton
              defaultNiche={nicheData?.niche || "Barber"}
              className="flex items-center gap-2 rounded-full bg-stone-900 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white shadow-xl transition hover:bg-stone-800 hover:scale-105 active:scale-95 dark:bg-sky-500 dark:text-black dark:hover:bg-sky-400"
            >
              <Sparkles size={14} />
              Upgrade
            </UpgradeToProButton>
          </div>

          <div className="h-8 w-[1px] bg-stone-200 dark:bg-white/10 mx-1 hidden sm:block" />

          <ModeToggle />

          <button
            onClick={() => setOpen(!open)}
            className="flex lg:hidden h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white/50 text-stone-900 transition active:scale-90 dark:border-white/10 dark:bg-white/5 dark:text-white"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-stone-200 bg-white/95 backdrop-blur-2xl dark:border-white/10 dark:bg-stone-950/95"
          >
            <div className="flex flex-col gap-2 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-bold uppercase tracking-widest ${
                    pathname === item.href
                      ? "bg-sky-500 text-white"
                      : "bg-stone-100 text-stone-600 dark:bg-white/5 dark:text-stone-300"
                  }`}
                >
                  {item.label}
                  {pathname === item.href && <Sparkles size={16} />}
                </Link>
              ))}
              
              <div className="mt-4 sm:hidden">
                 <UpgradeToProButton
                    defaultNiche={nicheData?.niche || "Barber"}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-stone-900 py-4 text-sm font-bold uppercase text-white dark:bg-sky-500 dark:text-black"
                 />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}