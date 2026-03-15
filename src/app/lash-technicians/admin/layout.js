import React from 'react'
import LashAdminShell from '@/components/lash-admin/admin-shell'
import { LashTechnicianAuthProvider } from '@/components/lash-technician-auth-provider'

export const metadata = {
  title: 'Lash Technician Admin | StyleVault',
  description: 'Private dashboard for managing lash technician bookings, customers, services, and profile settings on StyleVault.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function LashAdminLayout({ children }) {
  return (
    <LashTechnicianAuthProvider protect>
      <LashAdminShell>{children}</LashAdminShell>
    </LashTechnicianAuthProvider>
  )
}
