'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import ModeToggle from '@/components/mode-toggle'
import { Check } from 'lucide-react'

const messages = [
  "Clean. Precise. Professional.",
  "Sharp fades. Elite grooming.",
  "Crafted for confidence.",
  "Premium barber experience."
]

export default function BarberNavbar({ barber }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length)
    }, 3500)

    return () => clearInterval(interval)
  }, [])

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-black/70 border-b border-stone-200 dark:border-stone-800">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">

        <Link href={`/barbers/${barber.slug}`} className="flex items-center gap-3">
          {(barber?.verified || barber?.subscriptionPlan === 'pro') && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100/80 px-2 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300" title="Verified barber">
              <Check className="h-3 w-3" />
              <span>Verified</span>
            </span>
          )}

          <span className="text-xl font-bold tracking-tight">{barber.name}</span>
        </Link>

        <div className="hidden md:block text-sm text-stone-600 dark:text-amber-200 transition-all duration-500">
          {messages[index]}
        </div>

        <div className="flex items-center gap-3">
          <ModeToggle />
          <Link
            href={`/barbers/${barber.slug}/book`}
            className="rounded-full bg-black px-4 py-2 text-white text-sm dark:bg-amber-500 dark:text-black"
          >
            Book
          </Link>
        </div>

      </div>
    </nav>
  )
}