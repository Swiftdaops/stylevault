import BarberSignupForm from '@/components/barber-signup-form'

export const metadata = {
  title: 'Barber Sign Up | StyleVault',
  description: 'Create a StyleVault barber account to get a dedicated booking page, manage services, and accept haircut bookings online in Nigeria.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function BarberRegisterPage() {
  return (
    <div className="min-h-screen bg-orange-50 dark:bg-black">
      <main className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-4 py-24">
        <div className="w-full">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Barber Sign up</h1>
            <p className="text-sm text-stone-700 dark:text-amber-300">Create an account to manage bookings and services.</p>
          </div>

          <BarberSignupForm />
        </div>
      </main>
    </div>
  )
}
