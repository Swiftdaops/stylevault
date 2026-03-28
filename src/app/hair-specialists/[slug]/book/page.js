import Link from 'next/link';
import { notFound } from 'next/navigation';
import HairSpecialistBookingForm from '@/components/hair-specialist-booking-form';
import { getHairSpecialistBySlug, getServicesForHairSpecialist } from '@/lib/hair-specialist-api';
import StorefrontInstallButton from '@/components/storefront-install-button';
import { buildDescription, getCustomerBookingsUrl, getHairSpecialistBookingUrl, getHairSpecialistStoreUrl } from '@/lib/seo';

export async function generateStaticParams() {
  const { getHairSpecialists } = await import('@/lib/hair-specialist-api');
  const hairSpecialists = await getHairSpecialists();
  return hairSpecialists.map((hairSpecialist) => ({ slug: hairSpecialist.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const hairSpecialist = await getHairSpecialistBySlug(slug);

  if (!hairSpecialist) {
    return { title: 'Book hair specialist | StyleVault' };
  }

  return {
    title: `Book ${hairSpecialist.name} | ${hairSpecialist.location || 'Nigeria'} | StyleVault`,
    description: buildDescription(hairSpecialist.bio, `Book braids, wig installs, styling, or treatments with ${hairSpecialist.name} in ${hairSpecialist.location || 'Nigeria'}. Choose a service, hair length, and time on StyleVault.`),
    alternates: {
      canonical: getHairSpecialistBookingUrl(hairSpecialist.slug),
    },
  };
}

export default async function HairSpecialistBookPage({ params, installMode }) {
  const { slug } = await params;
  const hairSpecialist = await getHairSpecialistBySlug(slug);

  if (!hairSpecialist) notFound();

  const services = await getServicesForHairSpecialist(hairSpecialist._id);
  const resolvedInstallMode = installMode || (process.env.NODE_ENV === 'production' ? 'open-storefront' : 'install');

  return (
    <section className="min-h-screen bg-rose-50 px-4 py-12 text-stone-950 dark:bg-black dark:text-rose-400">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap justify-end gap-3">
          <Link href={getCustomerBookingsUrl(hairSpecialist.slug, 'hair-specialist')} className="inline-flex items-center rounded-full border border-rose-300 bg-white px-4 py-2 text-sm font-semibold text-rose-900 transition hover:bg-rose-100 dark:border-stone-700 dark:bg-stone-950 dark:text-rose-100 dark:hover:bg-stone-900">
            My bookings
          </Link>
          <StorefrontInstallButton
            appName={`${hairSpecialist.name} Booking App`}
            storefrontUrl={getHairSpecialistStoreUrl(hairSpecialist.slug)}
            installMode={resolvedInstallMode}
            tone="rose"
          />
        </div>
        <HairSpecialistBookingForm hairSpecialist={hairSpecialist} services={services} />
      </div>
    </section>
  );
}
