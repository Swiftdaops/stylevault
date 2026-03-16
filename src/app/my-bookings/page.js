import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import CustomerBookingsHub from '@/components/customer-bookings-hub'
import TenantShell from '@/components/tenant-shell'
import { extractTenantSlugFromHost } from '@/lib/seo'
import { resolveTenantProfileBySlug } from '@/lib/tenant'

export const metadata = {
  title: 'My Bookings | StyleVault',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function MyBookingsPage({ searchParams }) {
  const resolvedSearchParams = await searchParams
  const headersList = await headers()
  const tenantSlugFromHost = extractTenantSlugFromHost(headersList.get('host') || '')
  const tenantSlugFromQuery = String(resolvedSearchParams?.slug || '').trim().toLowerCase()
  const tenantSlug = tenantSlugFromHost || tenantSlugFromQuery
  const tenant = tenantSlug ? await resolveTenantProfileBySlug(tenantSlug) : null

  if (tenantSlugFromHost && !tenant) {
    notFound()
  }

  const pageContent = (
    <CustomerBookingsHub
      tenant={tenant}
      initialProviderType={resolvedSearchParams?.provider || tenant?.type || ''}
    />
  )

  if (tenantSlugFromHost && tenant) {
    return <TenantShell tenant={tenant}>{pageContent}</TenantShell>
  }

  return pageContent
}
