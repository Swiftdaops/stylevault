import CustomerBookingPageShell, { customerBookingPageMetadata } from '@/components/customer-booking-page-shell';
import { resolveTenantProfileBySlug } from '@/lib/tenant';

export const metadata = customerBookingPageMetadata;

export default async function MakeupArtistCustomerBookingPage({ params, searchParams }) {
  const { slug, id } = await params;
  const resolvedSearchParams = await searchParams;
  const tenant = slug ? await resolveTenantProfileBySlug(slug) : null;

  return (
    <CustomerBookingPageShell
      bookingId={id}
      tenant={tenant}
      initialProviderType="makeup-artist"
      initialAccessToken={resolvedSearchParams?.access || ''}
      tone="rose"
    />
  );
}