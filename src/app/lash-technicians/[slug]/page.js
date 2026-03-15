import Link from 'next/link';
import { notFound } from 'next/navigation';
import LiveLashTechnicianCalendar from '@/components/live-lash-technician-calendar';
import { formatCurrency, getLashTechnicianBySlug, getLashTechnicians, getServicesForLashTechnician } from '@/lib/lash-technician-api';
import { getSocialLinksList } from '@/lib/social-links';
import { getLashTechnicianBookingUrl } from '@/lib/seo';
import { buildTenantMetadata, buildTenantStructuredData } from '@/lib/tenant-seo';

export async function generateStaticParams() {
  const technicians = await getLashTechniciansSafe();
  return technicians.map((lashTechnician) => ({ slug: lashTechnician.slug }));
}

async function getLashTechniciansSafe() {
  return getLashTechnicians();
}

function renderHours(workingHours = {}) {
  const entries = Object.entries(workingHours || {});
  if (entries.length === 0) {
    return <p className="text-sm text-stone-600 dark:text-violet-200">Working hours will be added soon.</p>;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {entries.map(([day, hours]) => (
        <div key={day} className="rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3 dark:border-stone-800 dark:bg-stone-900">
          <p className="font-medium">{day}</p>
          <p className="text-sm text-stone-600 dark:text-violet-200">{Array.isArray(hours) ? hours.join(' - ') : 'Closed'}</p>
        </div>
      ))}
    </div>
  );
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const lashTechnician = await getLashTechnicianBySlug(slug);

  if (!lashTechnician) {
    return { title: 'Lash technician not found | StyleVault' };
  }

  const services = await getServicesForLashTechnician(lashTechnician._id);

  return buildTenantMetadata({
    type: 'lash-technician',
    profile: lashTechnician,
    services,
  });
}

export default async function LashTechnicianPage({ params }) {
  const { slug } = await params;
  const lashTechnician = await getLashTechnicianBySlug(slug);

  if (!lashTechnician) notFound();

  const services = await getServicesForLashTechnician(lashTechnician._id);
  const socialLinks = getSocialLinksList(lashTechnician.socialLinks);
  const structuredData = buildTenantStructuredData({
    type: 'lash-technician',
    profile: lashTechnician,
    services,
  });

  return (
    <section className="min-h-screen bg-violet-50 px-4 py-12 text-stone-950 dark:bg-black dark:text-violet-400">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-5">
            <span className="inline-flex rounded-full border border-violet-300 px-3 py-1 text-sm font-medium dark:border-stone-700">Dedicated lash storefront</span>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{lashTechnician.name}</h1>
            <p className="max-w-2xl text-base text-stone-700 dark:text-violet-200">{lashTechnician.bio || 'This lash technician now has a dedicated storefront where clients can browse services and book appointments directly.'}</p>

            <div className="flex flex-wrap gap-3 text-sm text-stone-600 dark:text-violet-200">
              {lashTechnician.location ? <span className="rounded-full border border-violet-200 px-3 py-1 dark:border-stone-700">{lashTechnician.location}</span> : null}
              {(lashTechnician.specialties || []).map((specialty) => (
                <span key={specialty} className="rounded-full border border-violet-200 px-3 py-1 dark:border-stone-700">{specialty}</span>
              ))}
            </div>

            {socialLinks.length ? (
              <div className="flex flex-wrap gap-3 text-sm">
                {socialLinks.map((platform) => (
                  <a key={platform.key} href={platform.href} target="_blank" rel="noreferrer" className="inline-flex rounded-full border border-violet-200 bg-white px-4 py-2 font-medium transition hover:bg-violet-100 dark:border-stone-700 dark:bg-stone-950 dark:hover:bg-stone-900">
                    {platform.label}
                  </a>
                ))}
              </div>
            ) : null}

            <div className="flex flex-wrap gap-3 pt-2">
              <Link href={getLashTechnicianBookingUrl(lashTechnician.slug)} className="inline-flex rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 dark:bg-violet-400 dark:text-black dark:hover:bg-violet-300">Book with {lashTechnician.name}</Link>
            </div>
          </div>

          <div className="rounded-3xl border border-violet-200 bg-white/80 p-6 shadow-sm dark:border-stone-800 dark:bg-stone-950/60">
            {lashTechnician.profileImage ? (
              <div className="mb-5 flex items-center justify-center">
                <div className="w-full max-w-xs overflow-hidden rounded-3xl border border-violet-200 dark:border-stone-800">
                  <div className="aspect-3/4 w-full">
                    <img src={lashTechnician.profileImage} alt={`${lashTechnician.name} lash technician in ${lashTechnician.location || 'Nigeria'}`} className="h-full w-full object-cover" />
                  </div>
                </div>
              </div>
            ) : null}
            <p className="text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-violet-300">Working hours</p>
            <div className="mt-4">{renderHours(lashTechnician.workingHours)}</div>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-violet-300">Services</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">What {lashTechnician.name} offers</h2>
          </div>

          {services.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-violet-300 bg-white/80 p-8 text-sm text-stone-600 dark:border-stone-700 dark:bg-stone-950/60 dark:text-violet-200">No services are listed yet for this technician.</div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => (
                <article key={service._id} className="rounded-3xl border border-violet-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-950">
                  {(service.sampleImage || service.catalogId?.image) ? (
                    <div className="mb-5 overflow-hidden rounded-2xl border border-violet-100 dark:border-stone-800">
                      <div className="aspect-3/4 w-full overflow-hidden">
                        <img src={service.sampleImage || service.catalogId?.image} alt={service.name} className="h-full w-full object-cover" />
                      </div>
                    </div>
                  ) : null}
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-semibold">{service.name}</h3>
                    <span className="text-sm font-semibold">from {formatCurrency(service.price, lashTechnician.currency || 'USD')}</span>
                  </div>
                  <p className="mt-3 text-sm text-stone-600 dark:text-violet-200">{service.description || 'Premium lash service ready for online booking.'}</p>
                  <div className="mt-5 flex flex-wrap gap-3 text-sm text-stone-600 dark:text-violet-200">
                    <span className="rounded-full bg-violet-50 px-3 py-1 dark:bg-stone-900">{service.duration} min</span>
                    {service.pricingOptions?.length ? <span className="rounded-full bg-violet-50 px-3 py-1 dark:bg-stone-900">{service.pricingOptions.length} pricing option(s)</span> : null}
                    {service.addOns?.length ? <span className="rounded-full bg-violet-50 px-3 py-1 dark:bg-stone-900">{service.addOns.length} add-on(s)</span> : null}
                  </div>
                  <div className="mt-4">
                    <Link href={getLashTechnicianBookingUrl(lashTechnician.slug, { service: service._id })} className="inline-flex rounded-full bg-stone-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-800 dark:bg-violet-400 dark:text-black dark:hover:bg-violet-300">Book this service</Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-5">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-violet-300">Availability</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">Book with live availability</h2>
          </div>
          <LiveLashTechnicianCalendar lashTechnician={lashTechnician} />
        </div>
      </div>
    </section>
  );
}
