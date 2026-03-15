import { notFound } from 'next/navigation';
import NailTechnicianBookingForm from '@/components/nail-technician-booking-form';
import { getNailTechnicianBySlug, getNailTechnicians, getServicesForNailTechnician } from '@/lib/nail-technician-api';
import StorefrontInstallButton from '@/components/storefront-install-button';
import { buildDescription, getNailTechnicianBookingUrl, getNailTechnicianStoreUrl } from '@/lib/seo';

export async function generateStaticParams() {
  const nailTechnicians = await getNailTechnicians();
  return nailTechnicians.map((nailTechnician) => ({ slug: nailTechnician.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const nailTechnician = await getNailTechnicianBySlug(slug);

  if (!nailTechnician) {
    return { title: 'Book nail technician | StyleVault' };
  }

  return {
    title: `Book ${nailTechnician.name} | ${nailTechnician.location || 'Nigeria'} | StyleVault`,
    description: buildDescription(nailTechnician.bio, `Book gel nails, acrylics, manicures, pedicures, or nail art with ${nailTechnician.name} in ${nailTechnician.location || 'Nigeria'}. Choose a service, style option, and time on StyleVault.`),
    alternates: {
      canonical: getNailTechnicianBookingUrl(nailTechnician.slug),
    },
  };
}

export default async function NailTechnicianBookPage({ params, installMode }) {
  const { slug } = await params;
  const nailTechnician = await getNailTechnicianBySlug(slug);

  if (!nailTechnician) notFound();

  const services = await getServicesForNailTechnician(nailTechnician._id);
  const resolvedInstallMode = installMode || (process.env.NODE_ENV === 'production' ? 'open-storefront' : 'install');

  return (
    <section className="min-h-screen bg-fuchsia-50 px-4 py-12 text-stone-950 dark:bg-black dark:text-fuchsia-400">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex justify-end">
          <StorefrontInstallButton
            appName={`${nailTechnician.name} Booking App`}
            storefrontUrl={getNailTechnicianStoreUrl(nailTechnician.slug)}
            installMode={resolvedInstallMode}
            tone="fuchsia"
          />
        </div>
        <NailTechnicianBookingForm nailTechnician={nailTechnician} services={services} />
      </div>
    </section>
  );
}
