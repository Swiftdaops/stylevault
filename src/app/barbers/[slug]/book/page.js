import { notFound } from 'next/navigation';
import BarberBookingForm from '@/components/barber-booking-form';
import { getBarberBySlug, getServicesForBarber } from '@/lib/barber-api';
import { buildDescription, getBarberBookingUrl } from '@/lib/seo';

export async function generateStaticParams() {
  const { getBarbers } = await import('@/lib/barber-api');
  const barbers = await getBarbers();
  return barbers.map((barber) => ({ slug: barber.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const barber = await getBarberBySlug(slug);

  if (!barber) {
    return {
      title: 'Book barber | StyleVault',
    };
  }

  return {
    title: `Book ${barber.name} | ${barber.location || 'Nigeria'} | StyleVault`,
    description: buildDescription(barber.bio, `Book a haircut online with ${barber.name} in ${barber.location || 'Nigeria'}. Choose a service, pick a time, and confirm your appointment on StyleVault.`),
    keywords: [`${barber.name} booking`, `barber in ${barber.location || 'nigeria'}`, 'book haircut online'],
    alternates: {
      canonical: getBarberBookingUrl(barber.slug),
    },
    openGraph: {
      title: `Book ${barber.name} | ${barber.location || 'Nigeria'} | StyleVault`,
      description: buildDescription(barber.bio, `Book a haircut online with ${barber.name} in ${barber.location || 'Nigeria'}. Choose a service, pick a time, and confirm your appointment on StyleVault.`),
      url: getBarberBookingUrl(barber.slug),
    },
  };
}

export default async function BarberBookPage({ params }) {
  const { slug } = await params;
  const barber = await getBarberBySlug(slug);

  if (!barber) {
    notFound();
  }

  const services = await getServicesForBarber(barber._id);

  return (
    <section className="min-h-screen bg-orange-50 px-4 py-12 text-stone-950 dark:bg-black dark:text-amber-500">
      <div className="mx-auto max-w-6xl">
        <BarberBookingForm barber={barber} services={services} />
      </div>
    </section>
  );
}