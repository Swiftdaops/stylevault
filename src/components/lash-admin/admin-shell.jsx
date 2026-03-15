"use client"

import React from 'react'
import { usePathname } from 'next/navigation'
import LashAdminHeader from '@/components/lash-admin/header'
import LashAdminSidebar from '@/components/lash-admin/sidebar'

export default function LashAdminShell({ children }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  React.useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  React.useEffect(() => {
    if (!sidebarOpen) {
      document.body.style.overflow = ''
      return
    }

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSidebarOpen(false)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [sidebarOpen])

  return (
    <div className="min-h-screen bg-violet-50 dark:bg-black lg:pl-64">
      <LashAdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {sidebarOpen ? (
        <button type="button" aria-label="Close navigation menu" className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      ) : null}

      <div className="flex min-h-screen flex-col">
        <LashAdminHeader isSidebarOpen={sidebarOpen} onMenuToggle={() => setSidebarOpen((open) => !open)} />
        <main className="flex-1 px-4 py-5 sm:px-6 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
