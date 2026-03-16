import CustomerBookingManager from '@/components/customer-booking-manager'

const toneClassMap = {
  orange: 'bg-orange-50 text-stone-950 dark:bg-black dark:text-amber-500',
  rose: 'bg-rose-50 text-stone-950 dark:bg-black dark:text-rose-400',
  fuchsia: 'bg-fuchsia-50 text-stone-950 dark:bg-black dark:text-fuchsia-400',
  violet: 'bg-violet-50 text-stone-950 dark:bg-black dark:text-violet-400',
}

export const customerBookingPageMetadata = {
  title: 'Manage Booking | StyleVault',
  robots: {
    index: false,
    follow: false,
  },
}

export default function CustomerBookingPageShell({
  bookingId,
  tenant = null,
  initialProviderType = '',
  initialAccessToken = '',
  tone = 'orange',
}) {
  const toneClasses = toneClassMap[tone] || toneClassMap.orange

  return (
    <section className={`min-h-screen px-4 py-12 ${toneClasses}`}>
      <div className="mx-auto max-w-5xl">
        <CustomerBookingManager
          bookingId={bookingId}
          tenant={tenant}
          initialProviderType={initialProviderType}
          initialAccessToken={initialAccessToken}
        />
      </div>
    </section>
  )
}