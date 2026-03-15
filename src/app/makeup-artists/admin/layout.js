import React from 'react'
import MakeupAdminShell from '@/components/makeup-admin/admin-shell'
import { MakeupArtistAuthProvider } from '@/components/makeup-artist-auth-provider'

export const metadata = {
  title: 'Makeup Artist Admin | StyleVault',
  description: 'Private dashboard for managing makeup artist bookings, customers, services, and profile settings on StyleVault.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function MakeupAdminLayout({ children }) {
  return (
    <MakeupArtistAuthProvider protect>
      <MakeupAdminShell>{children}</MakeupAdminShell>
    </MakeupArtistAuthProvider>
  )
}
