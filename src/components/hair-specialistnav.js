'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import ModeToggle from '@/components/mode-toggle'
import { Check, Star } from 'lucide-react'
import { getCustomerBookingsUrl, getHairSpecialistBookingUrl, getHairSpecialistStoreUrl } from '@/lib/seo'

const messages = [
  "Silk Glaze — restore sumptuous, mirror-like shine to your unit",
  'Lace Replacement Surgery — seamless HD / Swiss lace refits for an undetectable hairline',
  'Signature Detox Revamp — deep-clean, protein steam, and a fresh style',
  '24-Hour Express Laundry — premium rush turnaround, returned flawless',
]

export default function HairSpecialistNavbar({ hairSpecialist }) {
  const [index, setIndex] = useState(0)
  const displayName = hairSpecialist?.name || hairSpecialist?.businessName || hairSpecialist?.slug || 'Hair Specialist'
  const bookingUrl = getHairSpecialistBookingUrl(hairSpecialist?.slug)
  const myBookingsUrl = getCustomerBookingsUrl(hairSpecialist?.slug, 'hair-specialist')
  const storefrontUrl = getHairSpecialistStoreUrl(hairSpecialist?.slug)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length)
    }, 3800)

    return () => clearInterval(interval)
  }, [])

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-black/70 border-b border-rose-200 dark:border-stone-800">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">

        <Link href={storefrontUrl} className="flex items-center gap-3">
          {(hairSpecialist?.verified || hairSpecialist?.subscriptionPlan === 'pro') && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100/80 px-2 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300" title="Verified specialist">
              <Check className="h-3 w-3" />
              <span>Verified</span>
            </span>
          )}
          <span className="text-2xl font-extrabold text-stone-700 tracking-tight dark:text-rose-100">{displayName}</span>
        </Link>

        <div className="hidden md:flex items-center gap-3">
          <Star className="h-4 w-4 text-rose-400 dark:text-rose-300 animate-pulse" />
          <div key={index} className="mx-2 text-sm font-medium bg-linear-to-r from-rose-600 via-rose-500 to-amber-400 text-transparent bg-clip-text transition-opacity duration-500" aria-live="polite">
            {messages[index]}
          </div>
          <Star className="h-4 w-4 text-rose-400 dark:text-rose-300 animate-pulse" />
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-sm text-stone-700 dark:text-rose-200 font-medium">{displayName}</div>
          <ModeToggle />
          <Link
            href={myBookingsUrl}
            className="rounded-full border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 dark:border-stone-700 dark:text-rose-100 dark:hover:bg-stone-900 sm:px-4 sm:text-sm"
          >
            My bookings
          </Link>
          <Link
            href={bookingUrl}
            className="rounded-full bg-rose-900 px-4 py-2 text-white text-sm dark:bg-rose-400 dark:text-black"
          >
            Book
          </Link>
        </div>

      </div>
    </nav>
  )
}