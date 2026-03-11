import BarberLoginForm from '@/components/barber-login-form'

export const metadata = {
  title: 'Barber Login | StyleVault',
  description: 'Sign in to the StyleVault barber portal to manage bookings, services, customers, and availability for your shop in Nigeria.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function BarberLoginPage() {
  return (
    <div className="min-h-screen bg-orange-50 dark:bg-black">
      <main className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-4 py-24">
        <div className="w-full">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Barber Portal</h1>
            <p className="text-sm text-stone-700 dark:text-amber-300">Sign in to manage bookings and availability.</p>
          </div>

          <BarberLoginForm />
        </div>
      </main>
    </div>
  )
}
