import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatCurrency, getBarberBySlug, getServicesForBarber } from '@/lib/barber-api';
import StorefrontReviewsSection from '@/components/storefront-reviews-section';
import StorefrontInstallButton from '@/components/storefront-install-button';
import { getReviewsForProvider } from '@/lib/reviews-api';
import { getSocialLinksList } from '@/lib/social-links';
import { getBarberBookingUrl, getBarberStoreUrl, getCustomerBookingsUrl } from '@/lib/seo';
import { buildTenantMetadata, buildTenantStructuredData } from '@/lib/tenant-seo';
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

  const services = await getServicesForBarber(barber._id);

  return buildTenantMetadata({
    type: 'barber',
    profile: barber,
    services,
  });
}

export default async function BarberShopPage({ params, installMode }) {
  const { slug } = await params;
  const barber = await getBarberBySlug(slug);

  if (!barber) {
    notFound();
  }

  const services = await getServicesForBarber(barber._id);
  const reviewSummary = await getReviewsForProvider({ providerType: 'barber', providerSlug: barber.slug, limit: 6 });
  const rating = reviewSummary.totalReviews ? reviewSummary.averageRating : (barber.subscriptionPlan === 'pro' ? 5 : 4.5);
  const socialLinks = getSocialLinksList(barber.socialLinks);
  const resolvedInstallMode = installMode || (process.env.NODE_ENV === 'production' ? 'open-storefront' : 'install');
  const structuredData = buildTenantStructuredData({
    type: 'barber',
    profile: barber,
    services,
  });

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

            {socialLinks.length ? (
              <div className="flex flex-wrap gap-3 text-sm">
                {socialLinks.map((platform) => (
                  <a
                    key={platform.key}
                    href={platform.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex rounded-full border border-orange-200 bg-white px-4 py-2 font-medium transition hover:bg-orange-100 dark:border-stone-700 dark:bg-stone-950 dark:hover:bg-stone-900"
                  >
                    {platform.label}
                  </a>
                ))}
              </div>
            ) : null}

            <div className="flex flex-wrap gap-3 pt-2">
              <Link href={getBarberBookingUrl(barber.slug)} className="inline-flex rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 dark:bg-amber-500 dark:text-black dark:hover:bg-amber-400">
                Book with {barber.name}
              </Link>
              <Link href={getCustomerBookingsUrl(barber.slug, 'barber')} className="inline-flex rounded-full border border-orange-300 bg-white px-5 py-3 text-sm font-semibold text-stone-900 transition hover:bg-orange-100 dark:border-stone-700 dark:bg-stone-950 dark:text-amber-100 dark:hover:bg-stone-900">
                My bookings
              </Link>
              <StorefrontInstallButton
                appName={`${barber.name} Booking App`}
                storefrontUrl={getBarberStoreUrl(barber.slug)}
                installMode={resolvedInstallMode}
                tone="orange"
              />
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
              <h2 className="mt-2 text-3xl font-bold tracking-tight">What {barber.name}&rsquo;s barber shop offers</h2>
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
                        <div className="aspect-3/4 w-full overflow-hidden">
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
                          href={getBarberBookingUrl(barber.slug, { service: service._id })}
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

        <StorefrontReviewsSection providerName={barber.name} reviewSummary={reviewSummary} tone="orange" />


      </div>
    </section>
  );
}