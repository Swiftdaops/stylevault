import Link from 'next/link';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import BarberShopPage, { generateMetadata as generateBarberShopMetadata } from '@/app/barbers/[slug]/page';
import HairSpecialistPage, { generateMetadata as generateHairSpecialistMetadata } from '@/app/hair-specialists/[slug]/page';
import TenantShell from '@/components/tenant-shell';
import { extractTenantSlugFromHost } from '@/lib/seo';
import { resolveTenantProfileBySlug } from '@/lib/tenant';
import Hero from '@/components/hero';

export async function generateMetadata() {
  const headersList = await headers();
  const tenantSlug = extractTenantSlugFromHost(headersList.get('host') || '');

  if (tenantSlug) {
    const tenant = await resolveTenantProfileBySlug(tenantSlug);

    if (!tenant) {
      return {
        title: 'Profile not found | StyleVault',
      };
    }

    if (tenant.type === 'hair-specialist') {
      return generateHairSpecialistMetadata({ params: Promise.resolve({ slug: tenantSlug }) });
    }

    return generateBarberShopMetadata({ params: Promise.resolve({ slug: tenantSlug }) });
  }

  return {
    title: 'StyleVault | Find the Best Barbers and Hair Specialists Worldwide',
    description: 'Discover barbers and hair specialists by city and country, compare services and prices, and book online with dedicated storefronts on StyleVault.',
    keywords: [
      'best barbers worldwide',
      'best barber in my country',
      'book barber online',
      'hair specialist booking',
      'barber marketplace',
    ],
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: 'StyleVault | Find the Best Barbers and Hair Specialists Worldwide',
      description: 'Discover barbers and hair specialists by city and country, compare services and prices, and book online with dedicated storefronts on StyleVault.',
      url: '/',
    },
  };
}

export default async function Home() {
  const headersList = await headers();
  const tenantSlug = extractTenantSlugFromHost(headersList.get('host') || '');

  if (tenantSlug) {
    const tenant = await resolveTenantProfileBySlug(tenantSlug);

    if (!tenant) {
      notFound();
    }

    if (tenant.type === 'hair-specialist') {
      return (
        <TenantShell tenant={tenant}>
          <HairSpecialistPage params={Promise.resolve({ slug: tenantSlug })} />
        </TenantShell>
      );
    }

    return (
      <TenantShell tenant={tenant}>
        <BarberShopPage params={Promise.resolve({ slug: tenantSlug })} />
      </TenantShell>
    );
  }

  return (
    <div>
    <Hero />
    </div>
  );
}
