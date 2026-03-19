import MakeupArtistProDemoClient from './MakeupArtistProDemoClient'
import { buildPageMetadata } from '@/lib/page-metadata'

export const metadata = buildPageMetadata({
  title: 'Makeup Artist Pro Demo | StyleVault',
  description:
    'Preview the StyleVault makeup artist demo with luxury branding, portfolio-driven conversion, review trust signals, and Pro upgrade prompts.',
  path: '/demo/makeup-artist-pro',
  keywords: ['makeup artist website demo', 'bridal makeup booking demo', 'StyleVault makeup storefront'],
})

export default function Page() {
  return <MakeupArtistProDemoClient />
}