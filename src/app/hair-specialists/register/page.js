import HairSpecialistSignupForm from '@/components/hair-specialist-signup-form'
import { headers } from 'next/headers'
import { getVisitorCountryCode } from '@/lib/request-country'

export const metadata = {
  title: 'Hair Specialist Sign Up | StyleVault',
  description: 'Create a StyleVault hair specialist account to get a dedicated booking page, manage salon services, and accept online appointments.',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function HairSpecialistRegisterPage() {
  const visitorCountry = getVisitorCountryCode(await headers())

  return (
    <div className="min-h-screen bg-rose-50 dark:bg-black">
      <main className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-4 py-24">
        <div className="w-full">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Hair Specialist Sign up</h1>
            <p className="text-sm text-stone-700 dark:text-rose-300">Create an account to manage bookings and salon services.</p>
          </div>

          <HairSpecialistSignupForm initialCountry={visitorCountry} />
        </div>
      </main>
    </div>
  )
}
