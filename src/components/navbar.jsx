"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import ModeToggle from "@/components/mode-toggle"
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  // hide the public navbar on admin pages
  if (pathname && pathname.startsWith('/barbers/admin')) return null

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
  }

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navItems = [
    { label: "Barbers", href: "/barbers" },
    { label: "Get Started", href: "/barbers/register" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
  ]

  return (
    <header className="fixed top-0 z-50 w-full border-b border-orange-200/80 bg-orange-50/95 text-stone-950 shadow-sm backdrop-blur dark:border-stone-800 dark:bg-black/95 dark:text-amber-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold tracking-tight text-current">
            StyleVault
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-full px-4 py-1 transition hover:bg-orange-100 hover:text-stone-950 dark:hover:bg-stone-900 dark:hover:text-amber-500"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right-side controls */}
          <div className="flex items-center gap-2">
            <ModeToggle />
            {/* Mobile menu button */}
            <button
              className="rounded-full p-2 transition hover:bg-orange-100 hover:text-stone-950 dark:hover:bg-stone-900 dark:hover:text-amber-500 md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="animate-fade-in border-t border-orange-200/80 bg-orange-50 text-stone-950 shadow-md dark:border-stone-800 dark:bg-black dark:text-amber-600 md:hidden">
          <nav className="flex flex-col gap-2 p-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-full px-4 py-2 text-center transition hover:bg-orange-100 hover:text-stone-950 dark:hover:bg-stone-900 dark:hover:text-amber-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}