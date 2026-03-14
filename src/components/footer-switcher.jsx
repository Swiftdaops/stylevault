"use client"

import { usePathname } from 'next/navigation'
import PublicFooter from './public-footer'

export default function FooterSwitcher() {
  const pathname = usePathname() || ''

  // Hide the global public footer on individual hair-specialist storefronts
  // so the specialist-specific thank-you footer can be shown instead.
  if (pathname.startsWith('/hair-specialists/')) return null

  return <PublicFooter />
}
