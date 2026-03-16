'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import ModeToggle from '@/components/mode-toggle'
import { Check, Sparkles } from 'lucide-react'
import { getCustomerBookingsUrl, getNailTechnicianBookingUrl, getNailTechnicianStoreUrl } from '@/lib/seo'

const messages = [
  'Luxury gel sets — polished finishes for every mood',
  'Acrylic artistry — custom shapes, length, and flawless structure',
  'Pedicure rituals — relaxing treatments with premium care',
  'Event-ready nail glam — bridal, birthday, and celebration sets',
]

export default function NailTechnicianNavbar({ nailTechnician }) {
  const [index, setIndex] = useState(0)
  const displayName = nailTechnician?.name || nailTechnician?.businessName || nailTechnician?.slug || 'Nail Technician'
  const bookingUrl = getNailTechnicianBookingUrl(nailTechnician?.slug)
  const myBookingsUrl = getCustomerBookingsUrl(nailTechnician?.slug, 'nail-technician')
  const storefrontUrl = getNailTechnicianStoreUrl(nailTechnician?.slug)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length)
    }, 3800)

    return () => clearInterval(interval)
  }, [])

  return (
    <nav className="sticky top-0 z-50 border-b border-fuchsia-200 bg-white/70 backdrop-blur-xl dark:border-stone-800 dark:bg-black/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href={storefrontUrl} className="flex items-center gap-3">
          {(nailTechnician?.verified || nailTechnician?.subscriptionPlan === 'pro') && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100/80 px-2 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300" title="Verified technician">
              <Check className="h-3 w-3" />
              <span>Verified</span>
            </span>
          )}
          <span className="text-2xl font-extrabold tracking-tight text-stone-700 dark:text-fuchsia-100">{displayName}</span>
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          <Sparkles className="h-4 w-4 animate-pulse text-fuchsia-400 dark:text-fuchsia-300" />
          <div key={index} className="mx-2 bg-linear-to-r from-fuchsia-600 via-violet-500 to-pink-400 bg-clip-text text-sm font-medium text-transparent transition-opacity duration-500" aria-live="polite">
            {messages[index]}
          </div>
          <Sparkles className="h-4 w-4 animate-pulse text-fuchsia-400 dark:text-fuchsia-300" />
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-sm font-medium text-stone-700 dark:text-fuchsia-200 sm:block">{displayName}</div>
          <ModeToggle />
          <Link href={myBookingsUrl} className="rounded-full border border-fuchsia-200 px-3 py-2 text-xs font-semibold text-fuchsia-700 transition hover:bg-fuchsia-100 dark:border-stone-700 dark:text-fuchsia-100 dark:hover:bg-stone-900 sm:px-4 sm:text-sm">
            My bookings
          </Link>
          <Link href={bookingUrl} className="rounded-full bg-fuchsia-900 px-4 py-2 text-sm text-white dark:bg-fuchsia-400 dark:text-black">
            Book
          </Link>
        </div>
      </div>
    </nav>
  )
}
