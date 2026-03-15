"use client"

import { usePathname } from 'next/navigation'
import PublicFooter from './public-footer'

export default function FooterSwitcher({ isTenantHost = false }) {
  const pathname = usePathname() || ''

  if (isTenantHost) return null

  if (pathname.startsWith('/demo')) return null

  // Hide the global public footer on individual provider storefronts
  // so the provider-specific footer can be shown instead.
  if (pathname.startsWith('/hair-specialists/') || pathname.startsWith('/nail-technicians/') || pathname.startsWith('/lash-technicians/') || pathname.startsWith('/makeup-artists/')) return null

  return <PublicFooter />
}
