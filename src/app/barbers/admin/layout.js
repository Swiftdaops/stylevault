import React from 'react'
import { AuthProvider } from '@/components/auth-provider'
import AdminShell from '@/components/admin/admin-shell'

export const metadata = {
  title: 'Barber Admin | StyleVault',
  description: 'Private dashboard for managing barber bookings, customers, services, and profile settings on StyleVault.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLayout({ children }) {
  return (
    <AuthProvider protect>
      <AdminShell>{children}</AdminShell>
    </AuthProvider>
  )
}
