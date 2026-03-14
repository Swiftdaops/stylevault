import React from 'react'
import HairAdminShell from '@/components/hair-admin/admin-shell'
import { HairSpecialistAuthProvider } from '@/components/hair-specialist-auth-provider'

export const metadata = {
  title: 'Hair Specialist Admin | StyleVault',
  description: 'Private dashboard for managing hair specialist bookings, customers, services, and profile settings on StyleVault.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function HairAdminLayout({ children }) {
  return (
    <HairSpecialistAuthProvider protect>
      <HairAdminShell>{children}</HairAdminShell>
    </HairSpecialistAuthProvider>
  )
}
