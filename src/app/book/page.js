import { headers } from 'next/headers';
import BookPageClient from '@/components/book-page-client';
import BarberBookPage, { generateMetadata as generateBarberBookMetadata } from '@/app/barbers/[slug]/book/page';
import { extractTenantSlugFromHost } from '@/lib/seo';

export async function generateMetadata() {
  const headersList = await headers();
  const tenantSlug = extractTenantSlugFromHost(headersList.get('host') || '');

  if (tenantSlug) {
    return generateBarberBookMetadata({ params: Promise.resolve({ slug: tenantSlug }) });
  }

  return {
    title: 'Book Haircuts Online in Nigeria | StyleVault',
    description: 'Book haircut appointments online in Nigeria. Choose a barber, compare services, and reserve your next grooming session in minutes on StyleVault.',
    keywords: ['book haircut online', 'barber in nigeria', 'barber booking'],
    alternates: {
      canonical: '/book',
    },
    openGraph: {
      title: 'Book Haircuts Online in Nigeria | StyleVault',
      description: 'Book haircut appointments online in Nigeria. Choose a barber, compare services, and reserve your next grooming session in minutes on StyleVault.',
      url: '/book',
    },
  };
}

export default async function BookPage() {
  const headersList = await headers();
  const tenantSlug = extractTenantSlugFromHost(headersList.get('host') || '');

  if (tenantSlug) {
    return <BarberBookPage params={Promise.resolve({ slug: tenantSlug })} />;
  }

  return <BookPageClient />;
}