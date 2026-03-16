import DemoFooter from './components/DemoFooter'
import DemoNavbar from './components/DemoNavbar'

export const metadata = {
  title: 'StyleVault Pro Demos',
  description: 'Explore interactive demo pages showing what barber, hair specialist, nail technician, lash tech, and makeup artist storefronts unlock on the StyleVault Pro plan.',
}

export default function DemoLayout({ children }) {
  return (
    <div className="-mt-16 min-h-screen bg-orange-50 text-stone-950 dark:bg-stone-950 dark:text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.18),transparent_30%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(244,114,182,0.12),transparent_28%)]" />
        <div className="relative">
          <DemoNavbar />
          <main>{children}</main>
          <DemoFooter />
        </div>
      </div>
    </div>
  )
}
