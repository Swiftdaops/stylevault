import HairSpecialistLoginForm from '@/components/hair-specialist-login-form'

export const metadata = {
  title: 'Hair Specialist Login | StyleVault',
  description: 'Sign in to the StyleVault hair specialist portal to manage bookings, services, customers, and availability.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function HairSpecialistLoginPage() {
  return (
    <div className="min-h-screen bg-rose-50 dark:bg-black">
      <main className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-4 py-24">
        <div className="w-full">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Hair Specialist Portal</h1>
            <p className="text-sm text-stone-700 dark:text-rose-300">Sign in to manage bookings, salon services, and availability.</p>
          </div>

          <HairSpecialistLoginForm />
        </div>
      </main>
    </div>
  )
}
