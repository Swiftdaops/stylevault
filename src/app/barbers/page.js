import Link from 'next/link';
import { getBarbers } from '@/lib/barber-api';
import { getBarberBookingUrl, getBarberStoreUrl } from '@/lib/seo';

export const metadata = {
  title: 'Barbers in Nigeria | Book Haircuts Online | StyleVault',
  description: 'Browse barber profiles in Nigeria, compare services, locations, and prices, then book haircuts online directly with each barber on StyleVault.',
  keywords: ['barber in anambra', 'book haircut online', 'barber in nigeria'],
  alternates: {
    canonical: '/barbers',
  },
  openGraph: {
    title: 'Barbers in Nigeria | Book Haircuts Online | StyleVault',
    description: 'Browse barber profiles in Nigeria, compare services, locations, and prices, then book haircuts online directly with each barber on StyleVault.',
    url: '/barbers',
  },
};

export default async function BarbersPage() {
  const barbers = await getBarbers();

  return (
    <section className="min-h-screen bg-orange-50 px-4 py-12 text-stone-950 dark:bg-black dark:text-amber-500">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex rounded-full border border-orange-300 px-3 py-1 text-sm font-medium dark:border-stone-700">Barber marketplace</span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Every barber gets a shop page and a booking page</h1>
          <p className="text-base text-stone-700 dark:text-amber-200">
            Choose a barber, explore their services, then book directly from their dedicated booking page.
          </p>
        </div>

        {barbers.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-orange-300 bg-white/80 p-8 text-sm text-stone-600 dark:border-stone-700 dark:bg-stone-950/60 dark:text-amber-200">
            No barber profiles are available yet. Add a barber in the backend and this page will populate automatically.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {barbers.map((barber) => (
              <article key={barber._id} className="flex h-full flex-col rounded-3xl border border-orange-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-stone-800 dark:bg-stone-950">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-amber-300">Barber shop</p>
                    <h2 className="mt-2 text-2xl font-semibold">{barber.name}</h2>
                  </div>
                  <span className="rounded-full border border-orange-200 px-3 py-1 text-xs font-medium capitalize dark:border-stone-700">{barber.subscriptionPlan}</span>
                </div>

                <p className="mt-4 flex-1 text-sm text-stone-600 dark:text-amber-200">{barber.bio || 'Professional barber shop profile ready to accept online bookings.'}</p>

                <div className="mt-6 flex flex-wrap gap-3 text-sm text-stone-600 dark:text-amber-200">
                  {barber.location ? <span className="rounded-full bg-orange-50 px-3 py-1 dark:bg-stone-900">{barber.location}</span> : null}
                  <span className="rounded-full bg-orange-50 px-3 py-1 dark:bg-stone-900">/{barber.slug}</span>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={getBarberStoreUrl(barber.slug)} className="inline-flex rounded-full border border-orange-300 px-4 py-2 text-sm font-medium transition hover:bg-orange-100 dark:border-stone-700 dark:hover:bg-stone-900">
                    View shop
                  </Link>
                  <Link href={getBarberBookingUrl(barber.slug)} className="inline-flex rounded-full bg-stone-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-800 dark:bg-amber-500 dark:text-black dark:hover:bg-amber-400">
                    Book now
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}