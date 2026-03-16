'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import ModeToggle from '@/components/mode-toggle'
import { Check, Sparkles } from 'lucide-react'
import { getCustomerBookingsUrl, getMakeupArtistBookingUrl, getMakeupArtistStoreUrl } from '@/lib/seo'

const messages = [
  'Bridal glam — polished looks for unforgettable moments',
  'Soft glam artistry — radiant skin and seamless finishes',
  'Editorial beauty — camera-ready makeup with refined detail',
  'Mobile appointments — beauty services tailored to your schedule',
]

export default function MakeupArtistNavbar({ makeupArtist }) {
  const [index, setIndex] = useState(0)
  const displayName = makeupArtist?.name || makeupArtist?.businessName || makeupArtist?.slug || 'Makeup Artist'
  const bookingUrl = getMakeupArtistBookingUrl(makeupArtist?.slug)
  const myBookingsUrl = getCustomerBookingsUrl(makeupArtist?.slug, 'makeup-artist')
  const storefrontUrl = getMakeupArtistStoreUrl(makeupArtist?.slug)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length)
    }, 3800)

    return () => clearInterval(interval)
  }, [])

  return (
    <nav className="sticky top-0 z-50 border-b border-rose-200 bg-white/70 backdrop-blur-xl dark:border-stone-800 dark:bg-black/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href={storefrontUrl} className="flex items-center gap-3">
          {(makeupArtist?.verified || makeupArtist?.subscriptionPlan === 'pro') && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100/80 px-2 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300" title="Verified artist">
              <Check className="h-3 w-3" />
              <span>Verified</span>
            </span>
          )}
          <span className="text-2xl font-extrabold tracking-tight text-stone-700 dark:text-rose-100">{displayName}</span>
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          <Sparkles className="h-4 w-4 animate-pulse text-rose-400 dark:text-rose-300" />
          <div key={index} className="mx-2 bg-linear-to-r from-rose-600 via-pink-500 to-fuchsia-400 bg-clip-text text-sm font-medium text-transparent transition-opacity duration-500" aria-live="polite">
            {messages[index]}
          </div>
          <Sparkles className="h-4 w-4 animate-pulse text-rose-400 dark:text-rose-300" />
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-sm font-medium text-stone-700 dark:text-rose-200 sm:block">{displayName}</div>
          <ModeToggle />
          <Link href={myBookingsUrl} className="rounded-full border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 dark:border-stone-700 dark:text-rose-100 dark:hover:bg-stone-900 sm:px-4 sm:text-sm">
            My bookings
          </Link>
          <Link href={bookingUrl} className="rounded-full bg-rose-900 px-4 py-2 text-sm text-white dark:bg-rose-400 dark:text-black">
            Book
          </Link>
        </div>
      </div>
    </nav>
  )
}
