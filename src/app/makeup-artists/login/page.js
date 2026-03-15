import MakeupArtistLoginForm from '@/components/makeup-artist-login-form'

export const metadata = {
  title: 'Makeup Artist Login | StyleVault',
  description: 'Sign in to your private StyleVault makeup artist dashboard to manage bookings, clients, services, and storefront settings.',
}

export default function MakeupArtistLoginPage() {
  return (
    <section className="min-h-screen bg-rose-50 px-4 py-12 dark:bg-black">
      <div className="mx-auto max-w-4xl space-y-6 text-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-stone-950 dark:text-rose-100">Welcome back</h1>
          <p className="mt-3 text-stone-600 dark:text-rose-300">Access your makeup artist admin workspace and manage only your own storefront data.</p>
        </div>
        <MakeupArtistLoginForm />
      </div>
    </section>
  )
}
