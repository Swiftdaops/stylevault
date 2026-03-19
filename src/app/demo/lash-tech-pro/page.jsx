import LashTechProDemoClient from './LashTechProDemoClient'
import { buildPageMetadata } from '@/lib/page-metadata'

export const metadata = buildPageMetadata({
  title: 'Lash Tech Pro Demo | StyleVault',
  description:
    'Explore the StyleVault lash technician demo with premium beauty branding, trust-building reviews, and high-converting booking prompts.',
  path: '/demo/lash-tech-pro',
  keywords: ['lash tech website demo', 'lash booking demo', 'StyleVault lash storefront'],
})

export default function LushHero() {
  return <LashTechProDemoClient />
}