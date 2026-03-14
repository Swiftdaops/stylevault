import AboutHero from '@/components/about-hero'
import { AboutPlatform, WhoItsFor } from '@/components/Aboutpage'
import { SITE_URL } from '@/lib/seo'

export const metadata = {
  title: 'About | StyleVault',
  description: 'Learn how StyleVault helps barbers and hair stylists create storefronts, accept bookings, manage customers, and grow modern beauty businesses online.',
  keywords: [
    'about StyleVault',
    'barber booking platform',
    'hair stylist booking platform',
    'beauty business software',
    'digital storefront for barbers',
    'salon booking system',
  ],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About StyleVault',
    description: 'StyleVault helps barbers and stylists run their businesses online with storefronts, booking tools, customer management, and service listings.',
    url: `${SITE_URL}/about`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About StyleVault',
    description: 'Discover how StyleVault supports modern barber and beauty businesses online.',
  },
}

export default function AboutPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'StyleVault',
    url: SITE_URL,
    sameAs: [SITE_URL],
    description:
      'StyleVault is a digital platform that helps barbers and stylists create online storefronts, manage bookings, services, and customers.',
  }

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <AboutHero />
      <AboutPlatform />
      <WhoItsFor />
    </main>
  )
}
