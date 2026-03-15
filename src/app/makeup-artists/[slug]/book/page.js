import { notFound } from 'next/navigation';
import MakeupArtistBookingForm from '@/components/makeup-artist-booking-form';
import { getMakeupArtistBySlug, getMakeupArtists, getServicesForMakeupArtist } from '@/lib/makeup-artist-api';
import { buildDescription, getMakeupArtistBookingUrl } from '@/lib/seo';

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

export default async function MakeupArtistBookPage({ params }) {
  const { slug } = await params;
  const makeupArtist = await getMakeupArtistBySlug(slug);

  if (!makeupArtist) notFound();

  const services = await getServicesForMakeupArtist(makeupArtist._id);

  return (
    <section className="min-h-screen bg-rose-50 px-4 py-12 text-stone-950 dark:bg-black dark:text-rose-400">
      <div className="mx-auto max-w-6xl">
        <MakeupArtistBookingForm makeupArtist={makeupArtist} services={services} />
      </div>
    </section>
  );
}
