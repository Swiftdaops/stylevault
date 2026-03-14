import Link from 'next/link';
import { getHairSpecialists } from '@/lib/hair-specialist-api';
import { getHairSpecialistBookingUrl, getHairSpecialistStoreUrl } from '@/lib/seo';

export const metadata = {
  title: 'Hair Specialists | Braids, Wigs & Salon Services | StyleVault',
  description: 'Browse professional hair specialists, compare specialties, locations, and salon services, then book braids, wigs, styling, and treatments online on StyleVault.',
  keywords: ['hair specialist near me', 'wig installation', 'knotless braids stylist', 'salon booking'],
  alternates: {
    canonical: '/hair-specialists',
  },
};

export default async function HairSpecialistsPage() {
  const hairSpecialists = await getHairSpecialists();

  return (
    <section className="min-h-screen bg-rose-50 px-4 py-12 text-stone-950 dark:bg-black dark:text-rose-400">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex rounded-full border border-rose-300 px-3 py-1 text-sm font-medium dark:border-stone-700">Hair specialist marketplace</span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Discover braiding, wig, styling, and treatment specialists</h1>
          <p className="text-base text-stone-700 dark:text-rose-200">Choose a stylist, explore services, then book directly from their dedicated salon page.</p>
        </div>

        {hairSpecialists.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-rose-300 bg-white/80 p-8 text-sm text-stone-600 dark:border-stone-700 dark:bg-stone-950/60 dark:text-rose-200">
            No hair specialist profiles are available yet. Add one in the backend and this page will populate automatically.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {hairSpecialists.map((hairSpecialist) => (
              <article key={hairSpecialist._id} className="flex h-full flex-col rounded-3xl border border-rose-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-stone-800 dark:bg-stone-950">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-rose-300">Hair specialist</p>
                    <h2 className="mt-2 text-2xl font-semibold">{hairSpecialist.name}</h2>
                  </div>
                  <span className="rounded-full border border-rose-200 px-3 py-1 text-xs font-medium capitalize dark:border-stone-700">{hairSpecialist.subscriptionPlan}</span>
                </div>

                <p className="mt-4 flex-1 text-sm text-stone-600 dark:text-rose-200">{hairSpecialist.bio || 'Professional salon profile ready to accept online bookings.'}</p>

                <div className="mt-4 flex flex-wrap gap-2 text-xs text-stone-600 dark:text-rose-200">
                  {(hairSpecialist.specialties || []).slice(0, 3).map((specialty) => (
                    <span key={specialty} className="rounded-full bg-rose-100 px-2 py-1 text-stone-800">{specialty}</span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3 text-sm text-stone-600 dark:text-rose-200">
                  {hairSpecialist.location ? <span className="rounded-full bg-rose-50 px-3 py-1 dark:bg-stone-900">{hairSpecialist.location}</span> : null}
                  <span className="rounded-full bg-rose-50 px-3 py-1 dark:bg-stone-900">/{hairSpecialist.slug}</span>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={getHairSpecialistStoreUrl(hairSpecialist.slug)} className="inline-flex rounded-full border border-rose-300 px-4 py-2 text-sm font-medium transition hover:bg-rose-100 dark:border-stone-700 dark:hover:bg-stone-900">View profile</Link>
                  <Link href={getHairSpecialistBookingUrl(hairSpecialist.slug)} className="inline-flex rounded-full bg-stone-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-800 dark:bg-rose-400 dark:text-black dark:hover:bg-rose-300">Book now</Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
