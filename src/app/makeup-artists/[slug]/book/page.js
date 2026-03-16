import { notFound } from 'next/navigation';
import MakeupArtistBookingForm from '@/components/makeup-artist-booking-form';
import { getMakeupArtistBySlug, getMakeupArtists, getServicesForMakeupArtist } from '@/lib/makeup-artist-api';
import StorefrontInstallButton from '@/components/storefront-install-button';
import { buildDescription, getCustomerBookingsUrl, getMakeupArtistBookingUrl, getMakeupArtistStoreUrl } from '@/lib/seo';

export async function generateStaticParams() {
  const makeupArtists = await getMakeupArtists();
  return makeupArtists.map((makeupArtist) => ({ slug: makeupArtist.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const makeupArtist = await getMakeupArtistBySlug(slug);

  if (!makeupArtist) {
    return { title: 'Book makeup artist | StyleVault' };
  }

  return {
    title: `Book ${makeupArtist.name} | ${makeupArtist.location || 'Nigeria'} | StyleVault`,
    description: buildDescription(makeupArtist.bio, `Book bridal glam, soft glam, editorial beauty, or event makeup with ${makeupArtist.name} in ${makeupArtist.location || 'Nigeria'}. Choose a service, style option, and time on StyleVault.`),
    alternates: {
      canonical: getMakeupArtistBookingUrl(makeupArtist.slug),
    },
  };
}

export default async function MakeupArtistBookPage({ params, installMode }) {
  const { slug } = await params;
  const makeupArtist = await getMakeupArtistBySlug(slug);

  if (!makeupArtist) notFound();

  const services = await getServicesForMakeupArtist(makeupArtist._id);
  const resolvedInstallMode = installMode || (process.env.NODE_ENV === 'production' ? 'open-storefront' : 'install');

  return (
    <section className="min-h-screen bg-rose-50 px-4 py-12 text-stone-950 dark:bg-black dark:text-rose-400">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap justify-end gap-3">
          <Link href={getCustomerBookingsUrl(makeupArtist.slug, 'makeup-artist')} className="inline-flex items-center rounded-full border border-rose-300 bg-white px-4 py-2 text-sm font-semibold text-rose-900 transition hover:bg-rose-100 dark:border-stone-700 dark:bg-stone-950 dark:text-rose-100 dark:hover:bg-stone-900">
            My bookings
          </Link>
          <StorefrontInstallButton
            appName={`${makeupArtist.name} Booking App`}
            storefrontUrl={getMakeupArtistStoreUrl(makeupArtist.slug)}
            installMode={resolvedInstallMode}
            tone="rose"
          />
        </div>
        <MakeupArtistBookingForm makeupArtist={makeupArtist} services={services} />
      </div>
    </section>
  );
}
