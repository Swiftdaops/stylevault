import NailTechProDemoClient from './NailTechProDemoClient'
import { buildPageMetadata } from '@/lib/page-metadata'

export const metadata = buildPageMetadata({
  title: 'Nail Tech Pro Demo | StyleVault',
  description:
    'Explore the StyleVault nail technician demo with premium nail service presentation, booking prompts, and beauty-brand conversion design.',
  path: '/demo/nail-tech-pro',
  keywords: ['nail tech website demo', 'nail salon booking demo', 'StyleVault nail storefront'],
})

export default function NailTechHero() {
  return <NailTechProDemoClient />
}