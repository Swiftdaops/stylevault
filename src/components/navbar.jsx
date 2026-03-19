"use client"

import Link from "next/link"
import ModeToggle from "@/components/mode-toggle"
import { usePathname } from 'next/navigation'

export default function Navbar({ isTenantHost = false }) {
  const pathname = usePathname()

  if (isTenantHost) return null

  if (pathname?.startsWith('/demo')) return null

  // hide the public navbar on admin pages
  if (pathname && (pathname.startsWith('/barbers/admin') || pathname.startsWith('/hair-specialists/admin') || pathname.startsWith('/nail-technicians/admin') || pathname.startsWith('/lash-technicians/admin') || pathname.startsWith('/makeup-artists/admin'))) return null

  // hide the navbar for barber profile pages like /barbers/nnamdi
  // but keep it for static pages such as /barbers/register or /barbers/login
  if (pathname) {
    const parts = pathname.split('/').filter(Boolean)
    if (parts[0] === 'barbers') {
      // hide top-level barber profile pages like /barbers/nnamdi (except register/login/admin)
      if (parts.length === 2) {
        const exceptions = new Set(['register', 'login', 'admin'])
        if (!exceptions.has(parts[1])) return null
      }

      // hide the navbar on a barber's booking page: /barbers/:slug/book
      if (parts.length >= 3 && parts[2] === 'book') return null
    }

    if (parts[0] === 'hair-specialists') {
      if (parts.length === 2) {
        const exceptions = new Set(['register', 'login', 'admin'])
        if (!exceptions.has(parts[1])) return null
      }

      if (parts.length >= 3 && parts[2] === 'book') return null
    }

    if (parts[0] === 'nail-technicians') {
      if (parts.length === 2) {
        const exceptions = new Set(['register', 'login', 'admin'])
        if (!exceptions.has(parts[1])) return null
      }

      if (parts.length >= 3 && parts[2] === 'book') return null
    }

    if (parts[0] === 'lash-technicians') {
      if (parts.length === 2) {
        const exceptions = new Set(['register', 'login', 'admin'])
        if (!exceptions.has(parts[1])) return null
      }

      if (parts.length >= 3 && parts[2] === 'book') return null
    }

    if (parts[0] === 'makeup-artists') {
      if (parts.length === 2) {
        const exceptions = new Set(['register', 'login', 'admin'])
        if (!exceptions.has(parts[1])) return null
      }

      if (parts.length >= 3 && parts[2] === 'book') return null
    }
  }

  return (
    <header className="fixed top-0 z-50 w-full border-b border-black/10 bg-white/60 text-stone-950 shadow-sm shadow-black/5 backdrop-blur-xl dark:border-white/10 dark:bg-stone-950/60 dark:text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-3">
          <Link href="/" className="justify-self-start text-xl font-bold tracking-tight text-current">
            StyleVault
          </Link>

          <Link
            href="/get-started"
            className="justify-self-center inline-flex items-center justify-center rounded-full border border-black px-4 py-2 text-sm font-semibold text-stone-950 transition hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-stone-950"
          >
            Get Started
          </Link>

          <div className="justify-self-end flex items-center gap-2 sm:gap-3">
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}