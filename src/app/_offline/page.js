export const metadata = {
  title: 'Offline | StyleVault',
}

export default function OfflinePage() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-orange-50 px-4 py-16 text-stone-950 dark:bg-stone-950 dark:text-amber-500">
      <div className="w-full max-w-xl rounded-3xl border border-orange-200 bg-white p-8 text-center shadow-sm dark:border-stone-800 dark:bg-stone-900">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-amber-300">StyleVault offline</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">You&apos;re offline right now</h1>
        <p className="mt-4 text-sm leading-6 text-stone-600 dark:text-stone-300">
          Reconnect to keep browsing storefronts, checking live availability, and booking appointments.
        </p>
      </div>
    </section>
  )
}