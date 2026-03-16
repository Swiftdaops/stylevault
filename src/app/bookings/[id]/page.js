import { headers } from 'next/headers'
import CustomerBookingPageShell, { customerBookingPageMetadata } from '@/components/customer-booking-page-shell'
import { extractTenantSlugFromHost } from '@/lib/seo'
import { resolveTenantProfileBySlug } from '@/lib/tenant'

export const metadata = customerBookingPageMetadata

export default async function CustomerBookingPage({ params, searchParams }) {
  const { id } = await params
  const resolvedSearchParams = await searchParams
  const headersList = await headers()
  const tenantSlug = extractTenantSlugFromHost(headersList.get('host') || '') || String(resolvedSearchParams?.slug || '').trim().toLowerCase()
  const tenant = tenantSlug ? await resolveTenantProfileBySlug(tenantSlug) : null

  return (
    <CustomerBookingPageShell
      bookingId={id}
      tenant={tenant}
      initialProviderType={resolvedSearchParams?.provider || ''}
      initialAccessToken={resolvedSearchParams?.access || ''}
      tone="orange"
    />
  )
}
