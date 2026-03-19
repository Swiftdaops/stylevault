import BarberProDemoClient from './BarberProDemoClient'
import { buildPageMetadata } from '@/lib/page-metadata'

export const metadata = buildPageMetadata({
  title: 'Barber Pro Demo | StyleVault',
  description:
    'Explore the StyleVault barber demo storefront with premium grooming branding, reviews, booking prompts, and service conversion moments.',
  path: '/demo/barber-pro',
  keywords: ['barber website demo', 'barber booking demo', 'StyleVault barber storefront'],
})

export default function BarberHero() {
  return <BarberProDemoClient />
}
