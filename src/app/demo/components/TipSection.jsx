"use client"

import { useState } from "react"
import { Heart, Sparkles, Receipt } from "lucide-react"

export default function TipSection({
  heading = 'Make tipping effortless',
  description = 'Give your clients a polished, frictionless way to show gratitude at checkout.',
  providerName = 'Your storefront',
  baseAmount = '₦15,000',
  tipOptions = ['₦1,000', '₦2,500', '₦5,000'],
  accentClass = 'from-orange-500 to-amber-400',
}) {
  // Added state to make the preview interactive
  const [activeTip, setActiveTip] = useState(tipOptions[1])

  return (
    <section className="relative rounded-[2.5rem] border border-stone-200 bg-white p-6 shadow-xl shadow-stone-200/50 dark:border-white/10 dark:bg-stone-950/80 dark:shadow-black/50 sm:p-10 overflow-hidden">
      
      {/* Background Accent Gradient */}
      <div className={`absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-linear-to-tr ${accentClass} opacity-10 blur-3xl pointer-events-none`} />

      <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        
        {/* Left Column: Copy & Tip Selection */}
        <div className="w-full lg:w-1/2">
          <div className="flex items-center gap-2 mb-4">
            <span className={`flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br ${accentClass} text-white shadow-lg`}>
              <Heart size={14} fill="currentColor" />
            </span>
            <span className="text-xs font-black uppercase tracking-widest text-stone-500 dark:text-stone-400">
              Tip Section
            </span>
          </div>
          
          <h2 className="text-3xl font-black tracking-tight text-stone-900 dark:text-white sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-stone-500 dark:text-stone-400 sm:text-base">
            {description}
          </p>
          
          {/* Tip Buttons - Grid handles mobile/desktop stacking */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            {tipOptions.map((tip) => (
              <button
                key={tip}
                onClick={() => setActiveTip(tip)}
                className={`relative overflow-hidden rounded-2xl border px-2 py-4 text-center text-sm sm:text-base font-bold transition-all duration-300 active:scale-95 ${
                  activeTip === tip
                    ? 'border-orange-500 bg-orange-50 text-orange-600 dark:border-amber-500/50 dark:bg-amber-500/10 dark:text-amber-400 shadow-sm'
                    : 'border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-300 dark:border-white/10 dark:bg-stone-900/50 dark:text-stone-300 dark:hover:border-white/20'
                }`}
              >
                {activeTip === tip && (
                  <Sparkles size={12} className="absolute top-1.5 right-1.5 opacity-50" />
                )}
                {tip}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Checkout Preview Card */}
        <div className="w-full lg:w-[45%]">
          <div className="rounded-4xl border border-stone-200 bg-stone-50 p-6 shadow-inner dark:border-white/10 dark:bg-stone-900/80 sm:p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-400 mb-1">
                  <Receipt size={14} /> Preview
                </div>
                <div className="text-lg font-black text-stone-900 dark:text-white line-clamp-1">
                  Support {providerName}
                </div>
              </div>
              <div className="rounded-full border border-lime-500/30 bg-lime-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-lime-600 dark:text-lime-400">
                Tip Enabled
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between rounded-2xl border border-stone-200 bg-white px-5 py-4 dark:border-white/5 dark:bg-white/5 transition-all">
                <span className="font-medium text-stone-500 dark:text-stone-400">Service total</span>
                <span className="font-bold text-stone-900 dark:text-white">{baseAmount}</span>
              </div>
              
              <div className="flex items-center justify-between rounded-2xl border border-orange-200 bg-orange-50 px-5 py-4 dark:border-amber-500/20 dark:bg-amber-500/10 transition-all">
                <span className="font-medium text-orange-700 dark:text-amber-200">Selected tip</span>
                <span className="font-black text-orange-600 dark:text-amber-400">{activeTip}</span>
              </div>
              
              <div className="mt-2 flex items-center justify-between rounded-2xl bg-stone-900 px-5 py-4 text-base dark:bg-black transition-all shadow-lg">
                <span className="font-bold text-stone-300">Estimated total</span>
                {/* Displaying simple visual addition for the demo */}
                <span className="font-black text-white">{baseAmount} + {activeTip}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}