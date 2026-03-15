import Link from 'next/link';
import { getLashTechnicians } from '@/lib/lash-technician-api';
import { getLashTechnicianBookingUrl, getLashTechnicianStoreUrl } from '@/lib/seo';

export const metadata = {
  title: 'Lash Technicians by Country | Classic, Hybrid & Volume Lash Sets | StyleVault',
  description: 'Browse professional lash technicians across cities and countries, compare specialties and lash services, then book classic sets, hybrid fills, volume lashes, and lash lifts online on StyleVault.',
  keywords: ['best lash technician near me', 'lash extensions by country', 'book lash appointment online', 'classic hybrid volume lash booking'],
  alternates: {
    canonical: '/lash-technicians',
  },
  openGraph: {
    title: 'Lash Technicians by Country | Classic, Hybrid & Volume Lash Sets | StyleVault',
    description: 'Browse professional lash technicians across cities and countries, compare specialties and lash services, then book classic sets, hybrid fills, volume lashes, and lash lifts online on StyleVault.',
    url: '/lash-technicians',
  },
};

export default async function LashTechniciansPage() {
  const lashTechnicians = await getLashTechnicians();

  return (
    <section className="min-h-screen bg-violet-50 px-4 py-12 text-stone-950 dark:bg-black dark:text-violet-400">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex rounded-full border border-violet-300 px-3 py-1 text-sm font-medium dark:border-stone-700">Lash technician marketplace</span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Discover classic, hybrid, volume, and lift specialists</h1>
          <p className="text-base text-stone-700 dark:text-violet-200">Choose a lash technician, explore services, then book directly from their dedicated studio page.</p>
        </div>

        {lashTechnicians.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-violet-300 bg-white/80 p-8 text-sm text-stone-600 dark:border-stone-700 dark:bg-stone-950/60 dark:text-violet-200">No lash technician profiles are available yet. Add one in the backend and this page will populate automatically.</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {lashTechnicians.map((lashTechnician) => (
              <article key={lashTechnician._id} className="flex h-full flex-col rounded-3xl border border-violet-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-stone-800 dark:bg-stone-950">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-violet-300">Lash technician</p>
                    <h2 className="mt-2 text-2xl font-semibold">{lashTechnician.name}</h2>
                  </div>
                  <span className="rounded-full border border-violet-200 px-3 py-1 text-xs font-medium capitalize dark:border-stone-700">{lashTechnician.subscriptionPlan}</span>
                </div>

                <p className="mt-4 flex-1 text-sm text-stone-600 dark:text-violet-200">{lashTechnician.bio || 'Professional lash studio profile ready to accept online bookings.'}</p>

                <div className="mt-4 flex flex-wrap gap-2 text-xs text-stone-600 dark:text-violet-200">
                  {(lashTechnician.specialties || []).slice(0, 3).map((specialty) => (
                    <span key={specialty} className="rounded-full bg-violet-100 px-2 py-1 text-stone-800">{specialty}</span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3 text-sm text-stone-600 dark:text-violet-200">
                  {lashTechnician.location ? <span className="rounded-full bg-violet-50 px-3 py-1 dark:bg-stone-900">{lashTechnician.location}</span> : null}
                  <span className="rounded-full bg-violet-50 px-3 py-1 dark:bg-stone-900">/{lashTechnician.slug}</span>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={getLashTechnicianStoreUrl(lashTechnician.slug)} className="inline-flex rounded-full border border-violet-300 px-4 py-2 text-sm font-medium transition hover:bg-violet-100 dark:border-stone-700 dark:hover:bg-stone-900">View profile</Link>
                  <Link href={getLashTechnicianBookingUrl(lashTechnician.slug)} className="inline-flex rounded-full bg-stone-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-800 dark:bg-violet-400 dark:text-black dark:hover:bg-violet-300">Book now</Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
