import LashTechnicianSignupForm from '@/components/lash-technician-signup-form'
import { headers } from 'next/headers'
import { getVisitorCountryCode } from '@/lib/request-country'

export const metadata = {
  title: 'Register as a Lash Technician | StyleVault',
  description: 'Create your lash technician storefront on StyleVault and start managing lash services, appointments, customers, and profile details.',
}

export default async function LashTechnicianRegisterPage() {
  const visitorCountry = getVisitorCountryCode(await headers())

  return (
    <section className="min-h-screen bg-violet-50 px-4 py-12 dark:bg-black">
      <div className="mx-auto max-w-4xl space-y-6 text-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-stone-950 dark:text-violet-100">Create your lash storefront</h1>
          <p className="mt-3 text-stone-600 dark:text-violet-300">Launch your booking page, manage your service menu, and keep appointments visible in one private dashboard.</p>
        </div>
        <LashTechnicianSignupForm initialCountry={visitorCountry} />
      </div>
    </section>
  )
}
