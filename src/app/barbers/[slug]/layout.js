import BarberNavbar from '@/components/barbernav'
import BarberFooter from '@/components/barber-footer'
import { getBarberBySlug } from '@/lib/barber-api'
import { notFound } from 'next/navigation'

export default async function BarberSlugLayout({ children, params }) {
  const { slug } = await params
  const barber = await getBarberBySlug(slug)

  if (!barber) {
    notFound()
  }

  return (
    <>
      <BarberNavbar barber={barber} />

      <div className="min-h-screen bg-orange-50 dark:bg-black">
        {children}
      </div>

      <BarberFooter barber={barber} />
    </>
  )
}
