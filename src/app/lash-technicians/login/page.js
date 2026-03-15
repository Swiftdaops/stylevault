import LashTechnicianLoginForm from '@/components/lash-technician-login-form'

export const metadata = {
  title: 'Lash Technician Login | StyleVault',
  description: 'Sign in to your private StyleVault lash technician dashboard to manage bookings, clients, services, and storefront settings.',
}

export default function LashTechnicianLoginPage() {
  return (
    <section className="min-h-screen bg-violet-50 px-4 py-12 dark:bg-black">
      <div className="mx-auto max-w-4xl space-y-6 text-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-stone-950 dark:text-violet-100">Welcome back</h1>
          <p className="mt-3 text-stone-600 dark:text-violet-300">Access your lash technician admin workspace and manage only your own storefront data.</p>
        </div>
        <LashTechnicianLoginForm />
      </div>
    </section>
  )
}
