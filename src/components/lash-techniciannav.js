'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import ModeToggle from '@/components/mode-toggle'
import { Check, Sparkles } from 'lucide-react'
import { getLashTechnicianBookingUrl, getLashTechnicianStoreUrl } from '@/lib/seo'

const messages = [
  'Classic sets — soft definition with clean lash mapping',
  'Hybrid artistry — textured fullness tailored to each eye',
  'Volume glam — bold, fluffy sets for special moments',
  'Lift and tint care — polished natural lashes with lasting detail',
]

export default function LashTechnicianNavbar({ lashTechnician }) {
  const [index, setIndex] = useState(0)
  const displayName = lashTechnician?.name || lashTechnician?.businessName || lashTechnician?.slug || 'Lash Technician'
  const bookingUrl = getLashTechnicianBookingUrl(lashTechnician?.slug)
  const storefrontUrl = getLashTechnicianStoreUrl(lashTechnician?.slug)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length)
    }, 3800)

    return () => clearInterval(interval)
  }, [])

  return (
    <nav className="sticky top-0 z-50 border-b border-violet-200 bg-white/70 backdrop-blur-xl dark:border-stone-800 dark:bg-black/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href={storefrontUrl} className="flex items-center gap-3">
          {(lashTechnician?.verified || lashTechnician?.subscriptionPlan === 'pro') && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100/80 px-2 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300" title="Verified technician">
              <Check className="h-3 w-3" />
              <span>Verified</span>
            </span>
          )}
          <span className="text-2xl font-extrabold tracking-tight text-stone-700 dark:text-violet-100">{displayName}</span>
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          <Sparkles className="h-4 w-4 animate-pulse text-violet-400 dark:text-violet-300" />
          <div key={index} className="mx-2 bg-linear-to-r from-violet-600 via-indigo-500 to-fuchsia-400 bg-clip-text text-sm font-medium text-transparent transition-opacity duration-500" aria-live="polite">
            {messages[index]}
          </div>
          <Sparkles className="h-4 w-4 animate-pulse text-violet-400 dark:text-violet-300" />
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-sm font-medium text-stone-700 dark:text-violet-200 sm:block">{displayName}</div>
          <ModeToggle />
          <Link href={bookingUrl} className="rounded-full bg-violet-900 px-4 py-2 text-sm text-white dark:bg-violet-400 dark:text-black">
            Book
          </Link>
        </div>
      </div>
    </nav>
  )
}
