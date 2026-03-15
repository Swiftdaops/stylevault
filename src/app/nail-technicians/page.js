import Link from 'next/link';
import { getNailTechnicians } from '@/lib/nail-technician-api';
import { getNailTechnicianBookingUrl, getNailTechnicianStoreUrl } from '@/lib/seo';

export const metadata = {
  title: 'Nail Technicians by Country | Gel Nails, Acrylics & Pedicures | StyleVault',
  description: 'Browse professional nail technicians across cities and countries, compare specialties and nail services, then book gel nails, acrylics, manicures, and pedicures online on StyleVault.',
  keywords: ['best nail technician near me', 'gel nails by country', 'book acrylic nails online', 'pedicure booking'],
  alternates: {
    canonical: '/nail-technicians',
  },
  openGraph: {
    title: 'Nail Technicians by Country | Gel Nails, Acrylics & Pedicures | StyleVault',
    description: 'Browse professional nail technicians across cities and countries, compare specialties and nail services, then book gel nails, acrylics, manicures, and pedicures online on StyleVault.',
    url: '/nail-technicians',
  },
};

export default async function NailTechniciansPage() {
  const nailTechnicians = await getNailTechnicians();

  return (
    <section className="min-h-screen bg-fuchsia-50 px-4 py-12 text-stone-950 dark:bg-black dark:text-fuchsia-400">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex rounded-full border border-fuchsia-300 px-3 py-1 text-sm font-medium dark:border-stone-700">Nail technician marketplace</span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Discover manicures, pedicures, acrylics, and nail art specialists</h1>
          <p className="text-base text-stone-700 dark:text-fuchsia-200">Choose a nail technician, explore services, then book directly from their dedicated studio page.</p>
        </div>

        {nailTechnicians.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-fuchsia-300 bg-white/80 p-8 text-sm text-stone-600 dark:border-stone-700 dark:bg-stone-950/60 dark:text-fuchsia-200">No nail technician profiles are available yet. Add one in the backend and this page will populate automatically.</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {nailTechnicians.map((nailTechnician) => (
              <article key={nailTechnician._id} className="flex h-full flex-col rounded-3xl border border-fuchsia-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-stone-800 dark:bg-stone-950">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-fuchsia-300">Nail technician</p>
                    <h2 className="mt-2 text-2xl font-semibold">{nailTechnician.name}</h2>
                  </div>
                  <span className="rounded-full border border-fuchsia-200 px-3 py-1 text-xs font-medium capitalize dark:border-stone-700">{nailTechnician.subscriptionPlan}</span>
                </div>

                <p className="mt-4 flex-1 text-sm text-stone-600 dark:text-fuchsia-200">{nailTechnician.bio || 'Professional nail studio profile ready to accept online bookings.'}</p>

                <div className="mt-4 flex flex-wrap gap-2 text-xs text-stone-600 dark:text-fuchsia-200">
                  {(nailTechnician.specialties || []).slice(0, 3).map((specialty) => (
                    <span key={specialty} className="rounded-full bg-fuchsia-100 px-2 py-1 text-stone-800">{specialty}</span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3 text-sm text-stone-600 dark:text-fuchsia-200">
                  {nailTechnician.location ? <span className="rounded-full bg-fuchsia-50 px-3 py-1 dark:bg-stone-900">{nailTechnician.location}</span> : null}
                  <span className="rounded-full bg-fuchsia-50 px-3 py-1 dark:bg-stone-900">/{nailTechnician.slug}</span>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={getNailTechnicianStoreUrl(nailTechnician.slug)} className="inline-flex rounded-full border border-fuchsia-300 px-4 py-2 text-sm font-medium transition hover:bg-fuchsia-100 dark:border-stone-700 dark:hover:bg-stone-900">View profile</Link>
                  <Link href={getNailTechnicianBookingUrl(nailTechnician.slug)} className="inline-flex rounded-full bg-stone-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-800 dark:bg-fuchsia-400 dark:text-black dark:hover:bg-fuchsia-300">Book now</Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
