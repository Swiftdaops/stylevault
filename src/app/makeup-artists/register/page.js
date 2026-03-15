import MakeupArtistSignupForm from '@/components/makeup-artist-signup-form'

export const metadata = {
  title: 'Register as a Makeup Artist | StyleVault',
  description: 'Create your makeup artist storefront on StyleVault and start managing makeup services, appointments, customers, and profile details.',
}

export default function MakeupArtistRegisterPage() {
  return (
    <section className="min-h-screen bg-rose-50 px-4 py-12 dark:bg-black">
      <div className="mx-auto max-w-4xl space-y-6 text-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-stone-950 dark:text-rose-100">Create your makeup storefront</h1>
          <p className="mt-3 text-stone-600 dark:text-rose-300">Launch your booking page, manage your service menu, and keep appointments visible in one private dashboard.</p>
        </div>
        <MakeupArtistSignupForm />
      </div>
    </section>
  )
}
