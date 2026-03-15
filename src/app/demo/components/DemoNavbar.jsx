"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import ModeToggle from '@/components/mode-toggle'

const navItems = [
  { label: 'Demo Home', href: '/demo' },
  { label: 'Barber Pro', href: '/demo/barber-pro' },
  { label: 'Hair Pro', href: '/demo/hair-specialist-pro' },
  { label: 'Lash Pro', href: '/demo/lash-tech-pro' },
  { label: 'Makeup Pro', href: '/demo/makeup-artist-pro' },
]

export default function DemoNavbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-stone-950/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/demo" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-orange-500 to-pink-500 text-sm font-black text-white shadow-lg shadow-orange-500/20">
              SV
            </div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-300">StyleVault</div>
              <div className="text-base font-bold text-white">Pro Demos</div>
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
                    ? 'bg-white text-stone-950'
                    : 'text-stone-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/pricing"
            className="hidden rounded-full bg-linear-to-r from-orange-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:opacity-90 md:inline-flex"
          >
            Upgrade to Pro
          </Link>
          <ModeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex rounded-full border border-white/10 p-2 text-white transition hover:bg-white/10 lg:hidden"
            aria-label="Toggle demo navigation"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-stone-950/95 px-4 py-4 lg:hidden">
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
                      ? 'bg-white text-stone-950'
                      : 'text-stone-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            <Link
              href="/pricing"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-2xl bg-linear-to-r from-orange-500 to-pink-500 px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Upgrade to Pro
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  )
}
