import { notFound } from 'next/navigation';
import LashTechnicianBookingForm from '@/components/lash-technician-booking-form';
import { getLashTechnicianBySlug, getLashTechnicians, getServicesForLashTechnician } from '@/lib/lash-technician-api';
import StorefrontInstallButton from '@/components/storefront-install-button';
import { buildDescription, getLashTechnicianBookingUrl, getLashTechnicianStoreUrl } from '@/lib/seo';

export async function generateStaticParams() {
  const lashTechnicians = await getLashTechnicians();
  return lashTechnicians.map((lashTechnician) => ({ slug: lashTechnician.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const lashTechnician = await getLashTechnicianBySlug(slug);

  if (!lashTechnician) {
    return { title: 'Book lash technician | StyleVault' };
  }

  return {
    title: `Book ${lashTechnician.name} | ${lashTechnician.location || 'Nigeria'} | StyleVault`,
    description: buildDescription(lashTechnician.bio, `Book classic lashes, hybrid fills, volume sets, or lash lifts with ${lashTechnician.name} in ${lashTechnician.location || 'Nigeria'}. Choose a service, style option, and time on StyleVault.`),
    alternates: {
      canonical: getLashTechnicianBookingUrl(lashTechnician.slug),
    },
  };
}

export default async function LashTechnicianBookPage({ params, installMode }) {
  const { slug } = await params;
  const lashTechnician = await getLashTechnicianBySlug(slug);

  if (!lashTechnician) notFound();

  const services = await getServicesForLashTechnician(lashTechnician._id);
  const resolvedInstallMode = installMode || (process.env.NODE_ENV === 'production' ? 'open-storefront' : 'install');

  return (
    <section className="min-h-screen bg-violet-50 px-4 py-12 text-stone-950 dark:bg-black dark:text-violet-400">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex justify-end">
          <StorefrontInstallButton
            appName={`${lashTechnician.name} Booking App`}
            storefrontUrl={getLashTechnicianStoreUrl(lashTechnician.slug)}
            installMode={resolvedInstallMode}
            tone="violet"
          />
        </div>
        <LashTechnicianBookingForm lashTechnician={lashTechnician} services={services} />
      </div>
    </section>
  );
}
