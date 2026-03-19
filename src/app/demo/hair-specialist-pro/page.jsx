import HairSpecialistProDemoClient from './HairSpecialistProDemoClient'
import { buildPageMetadata } from '@/lib/page-metadata'

export const metadata = buildPageMetadata({
  title: 'Hair Specialist Pro Demo | StyleVault',
  description:
    'Preview the StyleVault hair specialist demo with premium service presentation, product-led conversion moments, reviews, and consultation CTAs.',
  path: '/demo/hair-specialist-pro',
  keywords: ['hair stylist website demo', 'hair specialist booking demo', 'StyleVault salon storefront'],
})

export default function JennieHero() {
  return <HairSpecialistProDemoClient />
}