import BarberDashboard from '@/components/barber-dashboard'

export const metadata = {
  title: 'Dashboard | Barber Admin | StyleVault',
}

export default function AdminIndexPage() {
  return (
    <div className="min-h-full">
      <BarberDashboard />
    </div>
  )
}
