import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatCurrency, getBarberBySlug, getServicesForBarber } from '@/lib/barber-api';
import LiveBarberCalendar from '@/components/live-barber-calendar';

export async function generateStaticParams() {
  const { getBarbers } = await import('@/lib/barber-api');
  const barbers = await getBarbers();
  return barbers.map((barber) => ({ slug: barber.slug }));
}

function renderHours(workingHours = {}) {
  const entries = Object.entries(workingHours || {});

  if (entries.length === 0) {
    return <p className="text-sm text-stone-600 dark:text-amber-200">Working hours will be added soon.</p>;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {entries.map(([day, hours]) => (
        <div key={day} className="rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 dark:border-stone-800 dark:bg-stone-900">
          <p className="font-medium">{day}</p>
          <p className="text-sm text-stone-600 dark:text-amber-200">{Array.isArray(hours) ? hours.join(' - ') : 'Closed'}</p>
        </div>
      ))}
    </div>
  );
}

function renderRating(rating) {
  const stars = []
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(
        <svg key={i} className="h-4 w-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      )
    } else if (rating >= i - 0.5) {
      // half star: render empty star with a clipped filled overlay
      stars.push(
        <span key={i} className="relative inline-block h-4 w-4">
          <svg className="absolute inset-0 h-4 w-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ clipPath: 'inset(0 50% 0 0)' }}>
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          <svg className="h-4 w-4 text-stone-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </span>
      )
    } else {
      stars.push(
        <svg key={i} className="h-4 w-4 text-stone-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      )
    }
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1">{stars}</div>
      <div className="text-sm text-stone-700 dark:text-amber-200">{rating.toFixed(1)}</div>
    </div>
  )
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const barber = await getBarberBySlug(slug);

  if (!barber) {
    return {
      title: 'Barber not found | StyleVault',
    };
  }

  return {
    title: `${barber.name} Barber Shop in ${barber.location || 'Nigeria'} | Book Online | StyleVault8. Important SEO Trick (for your SaaS growth)`,
    description: barber.bio || `Book haircuts online with ${barber.name} in ${barber.location || 'Nigeria'}. Explore services, prices, working hours, and easy booking on StyleVault.`,
    keywords: [
      `${barber.name} barber`,
      `barber in ${barber.location || 'nigeria'}`,
      'book haircut online',
      'skin fade barber',
    ],
    alternates: {
      canonical: `/barbers/${barber.slug}`,
    },
    openGraph: {
      title: `${barber.name} Barber Shop in ${barber.location || 'Nigeria'} | Book Online | StyleVault8. Important SEO Trick (for your SaaS growth)`,
      description: barber.bio || `Book haircuts online with ${barber.name} in ${barber.location || 'Nigeria'}. Explore services, prices, working hours, and easy booking on StyleVault.`,
      url: `/barbers/${barber.slug}`,
    },
  };
}

export default async function BarberShopPage({ params }) {
  const { slug } = await params;
  const barber = await getBarberBySlug(slug);

  if (!barber) {
    notFound();
  }

  const services = await getServicesForBarber(barber._id);
  const rating = barber.subscriptionPlan === 'pro' ? 5 : 4.5;
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: barber.name,
    image: barber.profileImage || services[0]?.sampleImage || services[0]?.catalogId?.image || undefined,
    description: barber.bio || `Professional barber in ${barber.location || 'Nigeria'}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: barber.location || 'Nigeria',
      addressCountry: 'NG',
    },
    areaServed: barber.location || 'Nigeria',
    priceRange: barber.subscriptionPlan === 'pro' ? '$$$' : '$$',
    url: `https://stylevault.store/barbers/${barber.slug}`,
    makesOffer: services.map((service) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.name,
        description: service.description || 'Professional grooming service',
      },
    })),
  };

  return (
    <section className="min-h-screen bg-orange-50 px-4 py-12 text-stone-950 dark:bg-black dark:text-amber-500">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-5">
            <span className="inline-flex rounded-full border border-orange-300 px-3 py-1 text-sm font-medium dark:border-stone-700">Dedicated barber shop</span>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{barber.name}</h1>
            <div className="mt-2">{renderRating(rating)}</div>
            <p className="max-w-2xl text-base text-stone-700 dark:text-amber-200">
              {barber.bio || 'This barber now has a dedicated storefront where customers can view services and book appointments directly.'}
            </p>

            <div className="flex flex-wrap gap-3 text-sm text-stone-600 dark:text-amber-200">
              {barber.location ? <span className="rounded-full border border-orange-200 px-3 py-1 dark:border-stone-700">{barber.location}</span> : null}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link href={`/barbers/${barber.slug}/book`} className="inline-flex rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 dark:bg-amber-500 dark:text-black dark:hover:bg-amber-400">
                Book with {barber.name}
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-orange-200 bg-white/80 p-6 shadow-sm dark:border-stone-800 dark:bg-stone-950/60">
            {barber.profileImage ? (
              <div className="mb-5 overflow-hidden rounded-3xl border border-orange-200 dark:border-stone-800">
                <img src={barber.profileImage} alt={`${barber.name} barber in ${barber.location || 'Nigeria'}`} className="h-72 w-full object-cover" />
              </div>
            ) : null}
            <p className="text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-amber-300">Working hours</p>
            <div className="mt-4">{renderHours(barber.workingHours)}</div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-amber-300">Services</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">What {barber.name}'s barber shop offers</h2>
            </div>
          </div>

          {services.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-orange-300 bg-white/80 p-8 text-sm text-stone-600 dark:border-stone-700 dark:bg-stone-950/60 dark:text-amber-200">
              No services are listed yet for this barber. Once services are added in the backend, customers will be able to book them from this page.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => (
                <article key={service._id} className="rounded-3xl border border-orange-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-950">
                  {(service.sampleImage || service.catalogId?.image) ? (
                    <div className="mb-5 overflow-hidden rounded-2xl border border-orange-100 dark:border-stone-800">
                      <div className="w-full overflow-hidden">
                        <div className="aspect-[3/4] w-full overflow-hidden">
                          <img src={service.sampleImage || service.catalogId?.image} alt={service.name} className="h-full w-full object-cover" />
                        </div>
                      </div>
                    </div>
                  ) : null}
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-semibold">{service.name}</h3>
                    <span className="text-sm font-semibold">{formatCurrency(service.price, barber.currency || 'USD')}</span>
                  </div>
                  <p className="mt-3 text-sm text-stone-600 dark:text-amber-200">{service.description || 'Premium barber service ready for online booking.'}</p>
                  <div className="mt-5 flex flex-wrap gap-3 text-sm text-stone-600 dark:text-amber-200">
                    <span className="rounded-full bg-orange-50 px-3 py-1 dark:bg-stone-900">{service.duration} min</span>
                    <span className="rounded-full bg-orange-50 px-3 py-1 dark:bg-stone-900">{service.homeServiceAvailable ? 'Home service available' : 'In-shop booking'}</span>
                  </div>
                      <div className="mt-4">
                        <Link
                          href={`/barbers/${barber.slug}/book?service=${service._id}`}
                          className="inline-flex rounded-full bg-stone-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-800 dark:bg-amber-500 dark:text-black dark:hover:bg-amber-400"
                        >
                          Book this service
                        </Link>
                      </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-5">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-amber-300">Availability</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">Book with live availability</h2>
          </div>
          <LiveBarberCalendar barber={barber} />
        </div>


      </div>
    </section>
  );
}