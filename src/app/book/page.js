import Link from 'next/link';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import BarberBookPage, { generateMetadata as generateBarberBookingMetadata } from '@/app/barbers/[slug]/book/page';
import HairSpecialistBookPage, { generateMetadata as generateHairSpecialistBookingMetadata } from '@/app/hair-specialists/[slug]/book/page';
import LashTechnicianBookPage, { generateMetadata as generateLashTechnicianBookingMetadata } from '@/app/lash-technicians/[slug]/book/page';
import MakeupArtistBookPage, { generateMetadata as generateMakeupArtistBookingMetadata } from '@/app/makeup-artists/[slug]/book/page';
import NailTechnicianBookPage, { generateMetadata as generateNailTechnicianBookingMetadata } from '@/app/nail-technicians/[slug]/book/page';
import TenantShell from '@/components/tenant-shell';
import { extractTenantSlugFromHost } from '@/lib/seo';
import { resolveTenantProfileBySlug } from '@/lib/tenant';

export async function generateMetadata() {
  const headersList = await headers();
  const tenantSlug = extractTenantSlugFromHost(headersList.get('host') || '');

  if (tenantSlug) {
    const tenant = await resolveTenantProfileBySlug(tenantSlug);

    if (!tenant) {
      return {
        title: 'Booking not found | StyleVault',
      };
    }

    if (tenant.type === 'hair-specialist') {
      return generateHairSpecialistBookingMetadata({ params: Promise.resolve({ slug: tenantSlug }) });
    }

    if (tenant.type === 'nail-technician') {
      return generateNailTechnicianBookingMetadata({ params: Promise.resolve({ slug: tenantSlug }) });
    }

    if (tenant.type === 'lash-technician') {
      return generateLashTechnicianBookingMetadata({ params: Promise.resolve({ slug: tenantSlug }) });
    }

    if (tenant.type === 'makeup-artist') {
      return generateMakeupArtistBookingMetadata({ params: Promise.resolve({ slug: tenantSlug }) });
    }

    return generateBarberBookingMetadata({ params: Promise.resolve({ slug: tenantSlug }) });
  }

  return {
    title: 'Book a provider | StyleVault',
    description: 'Choose a barber, hair specialist, nail technician, lash technician, or makeup artist storefront before booking an appointment on StyleVault.',
    alternates: {
      canonical: '/book',
    },
  };
}

export default async function BookPage() {
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
          <HairSpecialistBookPage params={Promise.resolve({ slug: tenantSlug })} />
        </TenantShell>
      );
    }

    if (tenant.type === 'nail-technician') {
      return (
        <TenantShell tenant={tenant}>
          <NailTechnicianBookPage params={Promise.resolve({ slug: tenantSlug })} />
        </TenantShell>
      );
    }

    if (tenant.type === 'lash-technician') {
      return (
        <TenantShell tenant={tenant}>
          <LashTechnicianBookPage params={Promise.resolve({ slug: tenantSlug })} />
        </TenantShell>
      );
    }

    if (tenant.type === 'makeup-artist') {
      return (
        <TenantShell tenant={tenant}>
          <MakeupArtistBookPage params={Promise.resolve({ slug: tenantSlug })} />
        </TenantShell>
      );
    }

    return (
      <TenantShell tenant={tenant}>
        <BarberBookPage params={Promise.resolve({ slug: tenantSlug })} />
      </TenantShell>
    );
  }

  return (
    <section className="min-h-screen bg-orange-50 px-4 py-12 text-stone-950 dark:bg-black dark:text-amber-500">
      <div className="mx-auto max-w-4xl rounded-4xl border border-orange-200 bg-white p-8 shadow-xl dark:border-stone-800 dark:bg-stone-950">
        <span className="inline-flex rounded-full border border-orange-300 px-3 py-1 text-sm font-medium dark:border-stone-700">
          Booking starts from a storefront
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">Choose who you want to book</h1>
        <p className="mt-4 max-w-2xl text-base text-stone-700 dark:text-amber-200">
          Open a barber, hair specialist, nail technician, lash technician, or makeup artist page first, then book directly from their dedicated booking page.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <Link
            href="/barbers"
            className="rounded-3xl border border-orange-200 bg-orange-50 p-6 transition hover:bg-orange-100 dark:border-stone-800 dark:bg-stone-900 dark:hover:bg-stone-800"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-amber-300">Barbers</p>
            <h2 className="mt-2 text-2xl font-semibold">Browse barber storefronts</h2>
            <p className="mt-2 text-sm text-stone-600 dark:text-amber-200">Find haircut services and book a barber directly.</p>
          </Link>

          <Link
            href="/hair-specialists"
            className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-stone-950 transition hover:bg-rose-100 dark:border-stone-800 dark:bg-stone-900 dark:text-rose-300 dark:hover:bg-stone-800"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-rose-300">Hair specialists</p>
            <h2 className="mt-2 text-2xl font-semibold">Browse hair specialist storefronts</h2>
            <p className="mt-2 text-sm text-stone-600 dark:text-rose-200">Find installs, braids, treatments, and salon bookings.</p>
          </Link>

          <Link
            href="/nail-technicians"
            className="rounded-3xl border border-fuchsia-200 bg-fuchsia-50 p-6 text-stone-950 transition hover:bg-fuchsia-100 dark:border-stone-800 dark:bg-stone-900 dark:text-fuchsia-300 dark:hover:bg-stone-800"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-fuchsia-300">Nail technicians</p>
            <h2 className="mt-2 text-2xl font-semibold">Browse nail technician storefronts</h2>
            <p className="mt-2 text-sm text-stone-600 dark:text-fuchsia-200">Find gel sets, acrylics, pedicures, and nail art bookings.</p>
          </Link>

          <Link
            href="/lash-technicians"
            className="rounded-3xl border border-violet-200 bg-violet-50 p-6 text-stone-950 transition hover:bg-violet-100 dark:border-stone-800 dark:bg-stone-900 dark:text-violet-300 dark:hover:bg-stone-800"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-violet-300">Lash technicians</p>
            <h2 className="mt-2 text-2xl font-semibold">Browse lash technician storefronts</h2>
            <p className="mt-2 text-sm text-stone-600 dark:text-violet-200">Find classic sets, hybrid fills, volume lashes, and lift appointments.</p>
          </Link>

          <Link
            href="/makeup-artists"
            className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-stone-950 transition hover:bg-rose-100 dark:border-stone-800 dark:bg-stone-900 dark:text-rose-300 dark:hover:bg-stone-800"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-rose-300">Makeup artists</p>
            <h2 className="mt-2 text-2xl font-semibold">Browse makeup artist storefronts</h2>
            <p className="mt-2 text-sm text-stone-600 dark:text-rose-200">Find bridal glam, soft glam, photoshoot makeup, and editorial beauty services.</p>
          </Link>
        </div>
      </div>
    </section>
  );
}