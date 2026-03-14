import HairSpecialistDashboard from '@/components/hair-specialist-dashboard'

export const metadata = {
  title: 'Dashboard | Hair Specialist Admin | StyleVault',
}

export default function HairAdminIndexPage() {
  return (
    <div className="min-h-full">
      <HairSpecialistDashboard />
    </div>
  )
}
