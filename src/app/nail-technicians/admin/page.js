import NailTechnicianDashboard from '@/components/nail-technician-dashboard'

export const metadata = {
  title: 'Dashboard | Nail Technician Admin | StyleVault',
}

export default function NailAdminIndexPage() {
  return (
    <div className="min-h-full">
      <NailTechnicianDashboard />
    </div>
  )
}
