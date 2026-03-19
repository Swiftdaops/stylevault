import DemoFooter from './components/DemoFooter'
import MiniShop from './components/MiniShop'
import DemoNavbar from './components/DemoNavbar'
import TipSection from './components/TipSection'

export const metadata = {
  title: 'StyleVault Pro Demos',
  description: 'Explore interactive demo pages showing what barber, hair specialist, nail technician, lash tech, and makeup artist storefronts unlock on the StyleVault Pro plan.',
}

export default function DemoLayout({ children }) {
  return (
    <div className="-mt-16 min-h-screen bg-stone-800 text-stone-950 dark:bg-stone-950 dark:text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.18),transparent_30%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(244,114,182,0.12),transparent_28%)]" />
        <div className="relative">
          <DemoNavbar />
          <main>{children}</main>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <MiniShop />
            <TipSection />
          </div>
          <DemoFooter />
        </div>
      </div>
    </div>
  )
}
