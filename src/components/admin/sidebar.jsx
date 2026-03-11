"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function NavItem({ href, children, onNavigate }) {
  const pathname = usePathname()
  const active = href === '/barbers/admin'
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        'block rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
        active
          ? 'bg-orange-100 text-stone-900 dark:bg-stone-800 dark:text-amber-100'
          : 'text-stone-700 hover:bg-orange-100/80 dark:text-amber-200 dark:hover:bg-stone-800/80'
      )}>
      {children}
    </Link>
  )
}

export default function AdminSidebar({ isOpen = false, onClose }) {
  return (
    <aside
      id="admin-sidebar"
      className={cn(
        'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-orange-200/60 bg-orange-50/95 p-4 shadow-xl backdrop-blur transition-transform duration-300 ease-out dark:border-stone-800 dark:bg-stone-900/95 lg:shadow-none',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        'lg:translate-x-0'
      )}>
      <div className="mb-6 flex items-start justify-between gap-3 border-b border-orange-200/70 pb-4 dark:border-stone-800">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-amber-300">StyleVault</p>
          <div className="mt-2 text-lg font-semibold">Dashboard</div>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="lg:hidden"
          onClick={onClose}
          aria-label="Close sidebar">
          <X />
        </Button>
      </div>

      <nav className="flex flex-col gap-2">
        <NavItem href="/barbers/admin" onNavigate={onClose}>Dashboard</NavItem>
        <NavItem href="/barbers/admin/appointments" onNavigate={onClose}>Appointments</NavItem>
        <NavItem href="/barbers/admin/services" onNavigate={onClose}>Services</NavItem>
        <NavItem href="/barbers/admin/customers" onNavigate={onClose}>Customers</NavItem>
        <NavItem href="/barbers/admin/profile" onNavigate={onClose}>Profile</NavItem>
      </nav>

      <div className="mt-auto pt-6">
        <NavItem href="/" onNavigate={onClose}>Public site</NavItem>
      </div>
    </aside>
  )
}
