import Link from 'next/link'

const demoLinks = [
  { label: 'Barber Pro', href: '/demo/barber-pro' },
  { label: 'Hair Specialist Pro', href: '/demo/hair-specialist-pro' },
  { label: 'Nail Tech Pro', href: '/demo/nail-tech-pro' },
  { label: 'Lash Tech Pro', href: '/demo/lash-tech-pro' },
  { label: 'Makeup Artist Pro', href: '/demo/makeup-artist-pro' },
]

export default function DemoFooter() {
  return (
    <footer className="border-t border-stone-200 bg-white/80 dark:border-white/10 dark:bg-stone-950/90">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <div className="inline-flex items-center rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-orange-700 dark:text-orange-300">
            StyleVault Pro Preview
          </div>
          <h2 className="mt-5 text-3xl font-black tracking-tight text-stone-950 dark:text-white sm:text-4xl">
            Launch a premium storefront that helps beauty pros book more and earn more.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600 dark:text-stone-300 sm:text-base">
            These demo experiences show how Pro unlocks polished branding, stronger trust signals, better conversion, tipping, and extra revenue tools for every niche.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/pricing" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-stone-200">
              View pricing
            </Link>
            <Link href="/get-started" className="rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-stone-100 dark:border-white/15 dark:text-white dark:hover:bg-white/10">
              Start your storefront
            </Link>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">Demo routes</h3>
            <ul className="mt-4 space-y-3 text-sm text-stone-600 dark:text-stone-300">
              {demoLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-stone-950 dark:hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">Why Pro works</h3>
            <ul className="mt-4 space-y-3 text-sm text-stone-600 dark:text-stone-300">
              <li>Custom professional domain</li>
              <li>SEO-optimized storefront</li>
              <li>Reviews and social proof</li>
              <li>Tips, products, and analytics</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
