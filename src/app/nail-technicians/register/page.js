import NailTechnicianSignupForm from '@/components/nail-technician-signup-form'
import { headers } from 'next/headers'
import { getVisitorCountryCode } from '@/lib/request-country'

export const metadata = {
  title: 'Nail Technician Sign Up | StyleVault',
  description: 'Create a StyleVault nail technician account to get a dedicated booking page, manage nail services, and accept online appointments.',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function NailTechnicianRegisterPage() {
  const visitorCountry = getVisitorCountryCode(await headers())

  return (
    <div className="min-h-screen bg-fuchsia-50 dark:bg-black">
      <main className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-4 py-24">
        <div className="w-full">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Nail Technician Sign up</h1>
            <p className="text-sm text-stone-700 dark:text-fuchsia-300">Create an account to manage bookings and nail services.</p>
          </div>

          <NailTechnicianSignupForm initialCountry={visitorCountry} />
        </div>
      </main>
    </div>
  )
}
