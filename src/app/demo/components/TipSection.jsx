"use client"

import { useEffect, useMemo, useState } from "react"
import { usePathname } from "next/navigation"
import { Heart, Receipt, Sparkles } from "lucide-react"

const TIP_CONFIG_BY_ROUTE = {
  "/demo/barber-pro": {
    heading: "Tips that feel natural",
    description: "Let grooming clients add a tip in a clean, premium checkout flow that feels effortless after every cut.",
    providerName: "Crown & Fade Studio",
    baseAmount: "$85",
    tipOptions: ["$10", "$20", "$50", "$100"],
    accentClass: "from-sky-500 to-cyan-400",
  },
  "/demo/hair-specialist-pro": {
    heading: "Tips for premium hair appointments",
    description: "Make appreciation feel easy after installs, styling, consultations, and texture care services.",
    providerName: "Jennie’s Hairs Collection",
    baseAmount: "$120",
    tipOptions: ["$10", "$20", "$50", "$100"],
    accentClass: "from-rose-500 to-fuchsia-500",
  },
  "/demo/nail-tech-pro": {
    heading: "Tips for flawless nail service",
    description: "Give clients a polished way to add gratuity after detailed sets, luxury pedicures, and nail art sessions.",
    providerName: "Studio Gloss Nail Bar",
    baseAmount: "$90",
    tipOptions: ["$10", "$20", "$50", "$100"],
    accentClass: "from-fuchsia-500 to-pink-500",
  },
  "/demo/lash-tech-pro": {
    heading: "Tips for every lash appointment",
    description: "Turn appreciation into extra income with a smooth tip moment after fills, full sets, and aftercare add-ons.",
    providerName: "Lush Pretty Lash",
    baseAmount: "$95",
    tipOptions: ["$10", "$20", "$50", "$100"],
    accentClass: "from-violet-500 to-purple-500",
  },
  "/demo/makeup-artist-pro": {
    heading: "Tips for premium glam bookings",
    description: "Create a refined tipping experience for bridal, event, and editorial clients at the end of service.",
    providerName: "Velvet Canvas Beauty",
    baseAmount: "$150",
    tipOptions: ["$10", "$20", "$50", "$100"],
    accentClass: "from-pink-500 to-rose-500",
  },
}

const DEFAULT_TIP_CONFIG = {
  heading: "Make tipping effortless",
  description: "Give your clients a polished, frictionless way to show gratitude at checkout.",
  providerName: "Your storefront",
  baseAmount: "$85",
  tipOptions: ["$10", "$20", "$50", "$100"],
  accentClass: "from-orange-500 to-amber-400",
}

export default function TipSection({
  heading,
  description,
  providerName,
  baseAmount,
  tipOptions,
  accentClass,
}) {
  const pathname = usePathname()

  const routeConfig = useMemo(
    () => TIP_CONFIG_BY_ROUTE[pathname] || DEFAULT_TIP_CONFIG,
    [pathname],
  )

  const resolvedHeading = heading || routeConfig.heading
  const resolvedDescription = description || routeConfig.description
  const resolvedProviderName = providerName || routeConfig.providerName
  const resolvedBaseAmount = baseAmount || routeConfig.baseAmount
  const resolvedTipOptions = tipOptions || routeConfig.tipOptions
  const resolvedAccentClass = accentClass || routeConfig.accentClass

  const [activeTip, setActiveTip] = useState(resolvedTipOptions[1] || resolvedTipOptions[0])

  useEffect(() => {
    setActiveTip(resolvedTipOptions[1] || resolvedTipOptions[0])
  }, [pathname, resolvedTipOptions])

  if (pathname === "/demo") {
    return null
  }

  return (
    <section className="relative mt-15 mb-15 overflow-hidden rounded-4xl border border-stone-200 bg-stone-800 p-6 shadow-xl shadow-stone-900/20 dark:border-white/10 dark:bg-stone-950/90 dark:shadow-black/50 sm:p-10">
      <div className={`pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-linear-to-tr ${resolvedAccentClass} opacity-10 blur-3xl`} />

      <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <span className={`flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br ${resolvedAccentClass} text-white shadow-lg`}>
              <Heart size={14} fill="currentColor" />
            </span>
            <span className="text-xs font-black uppercase tracking-widest text-stone-300">
              Tip Section
            </span>
          </div>

          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            {resolvedHeading}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-stone-300 sm:text-base">
            {resolvedDescription}
          </p>

          <div className="mt-8 grid grid-cols-3 gap-3">
            {resolvedTipOptions.map((tip) => (
              <button
                key={tip}
                type="button"
                onClick={() => setActiveTip(tip)}
                className={`relative overflow-hidden rounded-2xl border px-2 py-4 text-center text-sm font-bold transition-all duration-300 active:scale-95 sm:text-base ${
                  activeTip === tip
                    ? 'border-white/30 bg-white text-stone-950 shadow-lg'
                    : 'border-white/10 bg-white/5 text-stone-200 hover:border-white/20 hover:bg-white/10'
                }`}
              >
                {activeTip === tip ? (
                  <Sparkles size={12} className="absolute right-2 top-2 opacity-60" />
                ) : null}
                {tip}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="rounded-4xl border border-white/10 bg-white/5 p-6 shadow-inner backdrop-blur-xl sm:p-8">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-300">
                  <Receipt size={14} /> Preview
                </div>
                <div className="line-clamp-1 text-lg font-black text-white">
                  Support {resolvedProviderName}
                </div>
              </div>
              <div className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-300">
                Tip Enabled
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                <span className="font-medium text-stone-300">Service total</span>
                <span className="font-bold text-white">{resolvedBaseAmount}</span>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-5 py-4">
                <span className="font-medium text-stone-200">Selected tip</span>
                <span className="font-black text-white">{activeTip}</span>
              </div>

              <div className="mt-2 flex items-center justify-between rounded-2xl bg-stone-950 px-5 py-4 text-base shadow-lg dark:bg-black">
                <span className="font-bold text-stone-300">Estimated total</span>
                <span className="font-black text-white">{resolvedBaseAmount} + {activeTip}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-8 border-t border-white/10 pt-6 text-center">
        <p className="text-sm leading-7 text-stone-300 sm:text-base">
          Thank you for supporting <span className="font-semibold text-white">{resolvedProviderName}</span> — every tip helps keep the experience thoughtful, premium, and consistent.
        </p>
      </div>
    </section>
  )
}
