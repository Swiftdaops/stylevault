import { headers } from 'next/headers'
import CustomerBookingManager from '@/components/customer-booking-manager'
import { extractTenantSlugFromHost } from '@/lib/seo'
import { resolveTenantProfileBySlug } from '@/lib/tenant'

export const metadata = {
  title: 'Manage Booking | StyleVault',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function CustomerBookingPage({ params, searchParams }) {
  const { id } = await params
  const resolvedSearchParams = await searchParams
  const headersList = await headers()
  const tenantSlug = extractTenantSlugFromHost(headersList.get('host') || '')
  const tenant = tenantSlug ? await resolveTenantProfileBySlug(tenantSlug) : null

  return (
    <section className="min-h-screen bg-orange-50 px-4 py-12 text-stone-950 dark:bg-black dark:text-stone-100">
      <div className="mx-auto max-w-5xl">
        <CustomerBookingManager
          bookingId={id}
          tenant={tenant}
          initialProviderType={resolvedSearchParams?.provider || ''}
          initialAccessToken={resolvedSearchParams?.access || ''}
        />
      </div>
    </section>
  )
}
