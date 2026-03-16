"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function PublicFooter() {
  const pathname = usePathname()

  // hide the public footer on admin pages
  if (pathname && pathname.startsWith('/barbers/admin')) return null

  // hide the footer for barber profile pages like /barbers/nnamdi
  // but keep it for static pages such as /barbers/register or /barbers/login
  if (pathname) {
    const parts = pathname.split('/').filter(Boolean)
    if (parts[0] === 'barbers') {
      const exceptions = new Set(['register', 'login', 'admin'])
      if (parts.length === 2 && !exceptions.has(parts[1])) return null
      if (parts.length >= 3 && parts[2] === 'book') return null
    }
  }

  return (
    <footer className="border-t border-orange-200/60 bg-white/90 dark:bg-stone-900/90 dark:border-stone-800 text-sm text-stone-700 dark:text-amber-300">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <div>© {new Date().getFullYear()} StyleVault</div>

        <div className="flex items-center gap-4">
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/pricing" className="hover:underline">Pricing</Link>
          <Link href="/privacy-policy" className="hover:underline">Privacy</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </div>
      </div>
    </footer>
  )
}
