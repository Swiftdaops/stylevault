import React from 'react'
import NailAdminShell from '@/components/nail-admin/admin-shell'
import { NailTechnicianAuthProvider } from '@/components/nail-technician-auth-provider'

export const metadata = {
  title: 'Nail Technician Admin | StyleVault',
  description: 'Private dashboard for managing nail technician bookings, customers, services, and profile settings on StyleVault.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NailAdminLayout({ children }) {
  return (
    <NailTechnicianAuthProvider protect>
      <NailAdminShell>{children}</NailAdminShell>
    </NailTechnicianAuthProvider>
  )
}
