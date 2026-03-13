import Link from 'next/link';
import { headers } from 'next/headers';
import BarberShopPage, { generateMetadata as generateBarberShopMetadata } from '@/app/barbers/[slug]/page';
import { extractTenantSlugFromHost } from '@/lib/seo';

export async function generateMetadata() {
  const headersList = await headers();
  const tenantSlug = extractTenantSlugFromHost(headersList.get('host') || '');

  if (tenantSlug) {
    return generateBarberShopMetadata({ params: Promise.resolve({ slug: tenantSlug }) });
  }

  return {
    title: 'StyleVault | Book Barbers Online in Nigeria',
    description: 'Find a barber in Nigeria, compare grooming services, and book haircuts online with dedicated barber pages built for discovery and fast booking.',
    keywords: ['barber in nigeria', 'book haircut online', 'skin fade barber', 'barber marketplace'],
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: 'StyleVault | Book Barbers Online in Nigeria',
      description: 'Find a barber in Nigeria, compare grooming services, and book haircuts online with dedicated barber pages built for discovery and fast booking.',
      url: '/',
    },
  };
}

export default async function Home() {
  const headersList = await headers();
  const tenantSlug = extractTenantSlugFromHost(headersList.get('host') || '');

  if (tenantSlug) {
    return <BarberShopPage params={Promise.resolve({ slug: tenantSlug })} />;
  }

  return (
    <section className="min-h-screen bg-orange-50 px-4 py-12 text-stone-950 dark:bg-black dark:text-amber-500">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-orange-300 px-3 py-1 text-sm font-medium dark:border-stone-700">
            Barber shops with direct booking
          </span>
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            Give every barber a shop page and a booking page.
          </h1>
          <p className="max-w-2xl text-base text-stone-700 dark:text-amber-200">
            Customers can discover barber shops, browse services, and confirm bookings from dedicated pages built for each barber.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/barbers" className="inline-flex rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 dark:bg-amber-500 dark:text-black dark:hover:bg-amber-400">
              Explore barbers
            </Link>
            <Link href="/book" className="inline-flex rounded-full border border-orange-300 px-5 py-3 text-sm font-medium transition hover:bg-orange-100 dark:border-stone-700 dark:hover:bg-stone-900">
              General booking page
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-orange-200 bg-white p-8 shadow-xl dark:border-stone-800 dark:bg-stone-950">
          <div className="space-y-5">
            <div className="rounded-3xl border border-orange-200 bg-orange-50 p-5 dark:border-stone-800 dark:bg-stone-900">
              <p className="text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-amber-300">Shop pages</p>
              <h2 className="mt-2 text-2xl font-semibold">Each barber gets a storefront</h2>
              <p className="mt-2 text-sm text-stone-600 dark:text-amber-200">Show bio, working hours, services, pricing, and booking actions on one page.</p>
            </div>
            <div className="rounded-3xl border border-orange-200 bg-orange-50 p-5 dark:border-stone-800 dark:bg-stone-900">
              <p className="text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-amber-300">Booking pages</p>
              <h2 className="mt-2 text-2xl font-semibold">Customers confirm directly</h2>
              <p className="mt-2 text-sm text-stone-600 dark:text-amber-200">Dedicated booking forms submit straight to your appointment API and show confirmation instantly.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
