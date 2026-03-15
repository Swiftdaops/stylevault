import Link from 'next/link'
import { ArrowRight, Scissors, Sparkles, Brush, HeartHandshake } from 'lucide-react'

const demos = [
  {
    title: 'Barber Pro',
    href: '/demo/barber-pro',
    description: 'See how a barber storefront can showcase services, collect reviews, accept tips, and sell grooming products.',
    icon: Scissors,
    accent: 'from-orange-500 to-amber-500',
  },
  {
    title: 'Hair Specialist Pro',
    href: '/demo/hair-specialist-pro',
    description: 'Preview a polished salon-style storefront with SEO, reviews, upsells, and premium booking conversion moments.',
    icon: Sparkles,
    accent: 'from-rose-500 to-fuchsia-500',
  },
  {
    title: 'Lash Tech Pro',
    href: '/demo/lash-tech-pro',
    description: 'Explore how lash pros can turn a beautiful storefront into bookings, trust, and repeat revenue.',
    icon: HeartHandshake,
    accent: 'from-violet-500 to-purple-500',
  },
  {
    title: 'Makeup Artist Pro',
    href: '/demo/makeup-artist-pro',
    description: 'Showcase bridal, glam, and event artistry with a premium storefront built to impress and convert.',
    icon: Brush,
    accent: 'from-pink-500 to-rose-500',
  },
]

export const metadata = {
  title: 'StyleVault Demo Gallery',
  description: 'Browse StyleVault Pro demo pages for barbers, hair specialists, lash techs, and makeup artists.',
}

export default function DemoHomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 lg:px-8 lg:pt-16">
      <section className="rounded-4xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/10 backdrop-blur sm:p-12">
        <div className="max-w-4xl">
          <div className="inline-flex rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-orange-300">
            Demo showroom
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Explore what beauty pros unlock on the StyleVault Pro plan.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-stone-300 sm:text-lg">
            These demo routes show how each niche can present services, build trust, earn tips, and add product revenue with a premium storefront experience.
          </p>
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-2">
        {demos.map((demo) => {
          const Icon = demo.icon
          return (
            <article key={demo.href} className="group rounded-4xl border border-white/10 bg-stone-900/70 p-6 transition hover:-translate-y-1 hover:border-white/20 hover:bg-stone-900">
              <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-r ${demo.accent} text-white shadow-lg shadow-black/20`}>
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="mt-6 text-2xl font-black tracking-tight text-white">{demo.title}</h2>
              <p className="mt-3 text-sm leading-7 text-stone-300 sm:text-base">{demo.description}</p>
              <Link
                href={demo.href}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Open demo
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </article>
          )
        })}
      </section>
    </div>
  )
}
