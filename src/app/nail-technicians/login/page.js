import NailTechnicianLoginForm from '@/components/nail-technician-login-form'

export const metadata = {
  title: 'Nail Technician Login | StyleVault',
  description: 'Sign in to the StyleVault nail technician portal to manage bookings, services, customers, and availability.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NailTechnicianLoginPage() {
  return (
    <div className="min-h-screen bg-fuchsia-50 dark:bg-black">
      <main className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-4 py-24">
        <div className="w-full">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Nail Technician Portal</h1>
            <p className="text-sm text-stone-700 dark:text-fuchsia-300">Sign in to manage bookings, nail services, and availability.</p>
          </div>

          <NailTechnicianLoginForm />
        </div>
      </main>
    </div>
  )
}
