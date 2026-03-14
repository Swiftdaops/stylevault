import Link from 'next/link';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import BarberBookPage, { generateMetadata as generateBarberBookingMetadata } from '@/app/barbers/[slug]/book/page';
import HairSpecialistBookPage, { generateMetadata as generateHairSpecialistBookingMetadata } from '@/app/hair-specialists/[slug]/book/page';
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

    return generateBarberBookingMetadata({ params: Promise.resolve({ slug: tenantSlug }) });
  }

  return {
    title: 'Book a provider | StyleVault',
    description: 'Choose a barber or hair specialist storefront before booking an appointment on StyleVault.',
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
      return <HairSpecialistBookPage params={Promise.resolve({ slug: tenantSlug })} />;
    }

    return <BarberBookPage params={Promise.resolve({ slug: tenantSlug })} />;
  }

  return (
    <section className="min-h-screen bg-orange-50 px-4 py-12 text-stone-950 dark:bg-black dark:text-amber-500">
      <div className="mx-auto max-w-4xl rounded-4xl border border-orange-200 bg-white p-8 shadow-xl dark:border-stone-800 dark:bg-stone-950">
        <span className="inline-flex rounded-full border border-orange-300 px-3 py-1 text-sm font-medium dark:border-stone-700">
          Booking starts from a storefront
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">Choose who you want to book</h1>
        <p className="mt-4 max-w-2xl text-base text-stone-700 dark:text-amber-200">
          Open a barber or hair specialist page first, then book directly from their dedicated booking page.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
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
        </div>
      </div>
    </section>
  );
}