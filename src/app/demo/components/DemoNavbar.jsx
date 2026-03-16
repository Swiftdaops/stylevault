"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import ModeToggle from '@/components/mode-toggle'
import UpgradeToProButton from '@/components/pro-upgrade-button'

const navItems = [
  { label: 'Demo Home', href: '/demo' },
  { label: 'Barber Pro', href: '/demo/barber-pro' },
  { label: 'Hair Pro', href: '/demo/hair-specialist-pro' },
  { label: 'Nail Pro', href: '/demo/nail-tech-pro' },
  { label: 'Lash Pro', href: '/demo/lash-tech-pro' },
  { label: 'Makeup Pro', href: '/demo/makeup-artist-pro' },
]

const nicheByRoute = {
  '/demo/barber-pro': 'Barber',
  '/demo/hair-specialist-pro': 'Hair Specialist',
  '/demo/nail-tech-pro': 'Nail Technician',
  '/demo/lash-tech-pro': 'Lash Technician',
  '/demo/makeup-artist-pro': 'Makeup Artist',
}

export default function DemoNavbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const defaultNiche = nicheByRoute[pathname] || 'Barber'

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-stone-950/85">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/demo" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-orange-500 to-pink-500 text-sm font-black text-white shadow-lg shadow-orange-500/20">
              SV
            </div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-700 dark:text-orange-300">StyleVault</div>
              <div className="text-base font-bold text-stone-950 dark:text-white">Pro Demos</div>
            </div>
          </Link>
        </div>

        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? 'bg-stone-950 text-white dark:bg-white dark:text-stone-950'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-950 dark:text-stone-300 dark:hover:bg-white/10 dark:hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <UpgradeToProButton
            defaultNiche={defaultNiche}
            className="hidden rounded-full bg-linear-to-r from-orange-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:opacity-90 md:inline-flex"
          />
          <ModeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex rounded-full border border-stone-300 p-2 text-stone-950 transition hover:bg-stone-100 dark:border-white/10 dark:text-white dark:hover:bg-white/10 lg:hidden"
            aria-label="Toggle demo navigation"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-stone-200 bg-white/95 px-4 py-4 dark:border-white/10 dark:bg-stone-950/95 lg:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    active
                      ? 'bg-stone-950 text-white dark:bg-white dark:text-stone-950'
                      : 'text-stone-600 hover:bg-stone-100 hover:text-stone-950 dark:text-stone-300 dark:hover:bg-white/10 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            <UpgradeToProButton
              defaultNiche={defaultNiche}
              onOpen={() => setOpen(false)}
              className="mt-2 rounded-2xl bg-linear-to-r from-orange-500 to-pink-500 px-4 py-3 text-center text-sm font-semibold text-white"
            />
          </div>
        </div>
      ) : null}
    </header>
  )
}
