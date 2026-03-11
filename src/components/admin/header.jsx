"use client"

import React from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useAuth } from '@/components/auth-provider'
import { Button } from '@/components/ui/button'

export default function AdminHeader({ isSidebarOpen = false, onMenuToggle }) {
  const { barber, logout } = useAuth()

  return (
    <header className="sticky top-0 z-30 border-b border-orange-200/60 bg-white/90 px-4 py-3 backdrop-blur dark:border-stone-800 dark:bg-stone-900/90 sm:px-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            className="lg:hidden"
            onClick={onMenuToggle}
            aria-label={isSidebarOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isSidebarOpen}
            aria-controls="admin-sidebar">
            {isSidebarOpen ? <X /> : <Menu />}
          </Button>

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-amber-300">Barber admin</p>
            <div className="truncate text-lg font-semibold text-stone-950 dark:text-amber-100">
              {barber?.name || 'StyleVault'}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 lg:justify-end">
          <Button asChild variant="outline">
            <Link href={`/barbers/${barber?.slug || ''}`}>View profile</Link>
          </Button>
          <Button variant="destructive" onClick={logout}>Logout</Button>
        </div>
      </div>
    </header>
  )
}
