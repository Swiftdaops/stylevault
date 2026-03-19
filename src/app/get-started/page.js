import GetStartedPageClient from './GetStartedPageClient'
import { buildPageMetadata } from '@/lib/page-metadata'

export const metadata = buildPageMetadata({
  title: 'Get Started | StyleVault',
  description:
    'Choose your professional path on StyleVault and launch a premium storefront for barbering, hair, nails, lashes, or makeup artistry.',
  path: '/get-started',
  keywords: [
    'get started with StyleVault',
    'beauty storefront setup',
    'barber storefront platform',
    'makeup artist booking platform',
    'lash technician storefront',
  ],
})

export default function GetStartedPage() {
  return <GetStartedPageClient />
}