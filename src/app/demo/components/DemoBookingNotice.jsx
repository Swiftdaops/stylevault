"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import UpgradeToProButton from "@/components/pro-upgrade-button"

export default function DemoBookingNotice({
  isOpen,
  niche,
  className = "",
  message = "This is just a demo preview. Live bookings, reminders, and client intake flows are available when you upgrade to Pro.",
}) {
  return (
    <AnimatePresence initial={false}>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, y: 18, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: 12, height: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className={className}
        >
          <div className="overflow-hidden rounded-3xl border border-orange-400/20 bg-white/95 p-5 text-stone-950 shadow-2xl shadow-black/15 backdrop-blur dark:border-orange-300/20 dark:bg-stone-900/95 dark:text-white sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-lime-800/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-orange-700 dark:text-orange-300">
                  <Sparkles className="h-4 w-4" />
                  Demo only
                </div>
                <h3 className="mt-3 text-xl font-bold sm:text-2xl">This is just a demo.</h3>
                <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-300 sm:text-base">
                  {message}
                </p>
              </div>

              <div className="shrink-0">
                <UpgradeToProButton
                  label="Upgrade to Pro"
                  defaultNiche={niche}
                  className="w-full rounded-full bg-stone-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 dark:bg-white/10 dark:text-gray-400 dark:hover:bg-black-400 sm:w-auto"
                />
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
