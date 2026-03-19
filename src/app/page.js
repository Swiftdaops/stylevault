import Link from 'next/link';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import BarberShopPage, { generateMetadata as generateBarberShopMetadata } from '@/app/barbers/[slug]/page';
import HairSpecialistPage, { generateMetadata as generateHairSpecialistMetadata } from '@/app/hair-specialists/[slug]/page';
import LashTechnicianPage, { generateMetadata as generateLashTechnicianMetadata } from '@/app/lash-technicians/[slug]/page';
import MakeupArtistPage, { generateMetadata as generateMakeupArtistMetadata } from '@/app/makeup-artists/[slug]/page';
import NailTechnicianPage, { generateMetadata as generateNailTechnicianMetadata } from '@/app/nail-technicians/[slug]/page';
import TenantShell from '@/components/tenant-shell';
import { extractTenantSlugFromHost } from '@/lib/seo';
import { resolveTenantProfileBySlug } from '@/lib/tenant';
import Hero from '@/components/hero';
import HomeInstallActions from '@/components/home-install-actions';

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

    if (tenant.type === 'nail-technician') {
      return generateNailTechnicianMetadata({ params: Promise.resolve({ slug: tenantSlug }) });
    }

    if (tenant.type === 'lash-technician') {
      return generateLashTechnicianMetadata({ params: Promise.resolve({ slug: tenantSlug }) });
    }

    if (tenant.type === 'makeup-artist') {
      return generateMakeupArtistMetadata({ params: Promise.resolve({ slug: tenantSlug }) });
    }

    return generateBarberShopMetadata({ params: Promise.resolve({ slug: tenantSlug }) });
  }

  return {
    title: 'StyleVault | Find the Best Barbers, Hair Specialists, Nail Technicians, Lash Technicians and Makeup Artists Worldwide',
    description: 'Discover barbers, hair specialists, nail technicians, lash technicians, and makeup artists by city and country, compare services and prices, and book online with dedicated storefronts on StyleVault.',
    keywords: [
      'best barbers worldwide',
      'best barber in my country',
      'book barber online',
      'hair specialist booking',
      'nail technician booking',
      'lash technician booking',
      'makeup artist booking',
      'barber marketplace',
    ],
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: 'StyleVault | Find the Best Barbers, Hair Specialists, Nail Technicians, Lash Technicians and Makeup Artists Worldwide',
      description: 'Discover barbers, hair specialists, nail technicians, lash technicians, and makeup artists by city and country, compare services and prices, and book online with dedicated storefronts on StyleVault.',
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
          <HairSpecialistPage params={Promise.resolve({ slug: tenantSlug })} installMode="install" />
        </TenantShell>
      );
    }

    if (tenant.type === 'nail-technician') {
      return (
        <TenantShell tenant={tenant}>
          <NailTechnicianPage params={Promise.resolve({ slug: tenantSlug })} installMode="install" />
        </TenantShell>
      );
    }

    if (tenant.type === 'lash-technician') {
      return (
        <TenantShell tenant={tenant}>
          <LashTechnicianPage params={Promise.resolve({ slug: tenantSlug })} installMode="install" />
        </TenantShell>
      );
    }

    if (tenant.type === 'makeup-artist') {
      return (
        <TenantShell tenant={tenant}>
          <MakeupArtistPage params={Promise.resolve({ slug: tenantSlug })} installMode="install" />
        </TenantShell>
      );
    }

    return (
      <TenantShell tenant={tenant}>
        <BarberShopPage params={Promise.resolve({ slug: tenantSlug })} installMode="install" />
      </TenantShell>
    );
  }

  return (
    <div>
    <Hero />
    <div className="bg-olive-100 px-4 pb-20 text-stone-950 dark:bg-black dark:text-amber-500">
      <div className="mx-auto max-w-6xl">
        <HomeInstallActions className="pt-6" />
      </div>
    </div>
    </div>
  );
}
