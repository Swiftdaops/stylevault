import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  ChartColumnIncreasing,
  Globe,
  Package,
  ShoppingBag,
  Sparkles,
  Star,
  WalletCards,
} from 'lucide-react'
import MiniShop from './MiniShop'
import ReviewSection from './ReviewSection'
import UpgradeToProButton from '@/components/pro-upgrade-button'

const iconMap = {
  domain: Globe,
  seo: Sparkles,
  bookings: CalendarDays,
  analytics: ChartColumnIncreasing,
  reviews: Star,
  tips: WalletCards,
  shop: ShoppingBag,
  badge: BadgeCheck,
  products: Package,
}

export default function ProDemoShowcase({
  theme,
  roleTitle,
  shortLabel,
  intro,
  heroTitle,
  heroDescription,
  heroBadge,
  stats,
  services,
  featureHighlights,
  reviews,
  products,
  tipConfig,
}) {
  return (
    <div className="pb-20">
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className={`inline-flex rounded-full bg-linear-to-r ${theme.accentClass} px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white`}>
              {heroBadge}
            </div>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.28em] text-stone-500 dark:text-stone-400">{shortLabel}</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-stone-950 dark:text-white sm:text-5xl lg:text-6xl">
              {heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-stone-600 dark:text-stone-300 sm:text-lg">
              {heroDescription}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {services.map((service) => (
                <span key={service} className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm text-stone-700 dark:border-white/10 dark:bg-white/5 dark:text-stone-200">
                  {service}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <UpgradeToProButton
                label="Unlock this on Pro"
                defaultNiche={shortLabel.replace(' Pro', '')}
                className={`inline-flex items-center gap-2 rounded-full bg-linear-to-r ${theme.accentClass} px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-orange-500/20 transition hover:opacity-90`}
              />
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-950 transition hover:bg-stone-100 dark:border-white/10 dark:text-white dark:hover:bg-white/10"
              >
                Browse all demos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className={`absolute -inset-4 rounded-[2.5rem] bg-linear-to-br ${theme.glowClass} opacity-30 blur-3xl`} />
            <div className="relative overflow-hidden rounded-4xl border border-stone-200 bg-white/90 p-6 shadow-2xl shadow-orange-100/50 dark:border-white/10 dark:bg-stone-900/85 dark:shadow-black/30">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">Pro storefront preview</div>
                  <div className="mt-2 text-2xl font-black text-stone-950 dark:text-white">{roleTitle}</div>
                </div>
                <div className={`rounded-full bg-linear-to-r ${theme.accentClass} px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white`}>
                  Pro unlocked
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-3xl border border-stone-200 bg-stone-50 p-4 dark:border-white/10 dark:bg-white/4">
                    <div className="text-xs uppercase tracking-[0.2em] text-stone-500">{stat.label}</div>
                    <div className="mt-2 text-2xl font-black text-stone-950 dark:text-white">{stat.value}</div>
                    <div className="mt-1 text-sm text-stone-500 dark:text-stone-400">{stat.note}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[1.75rem] border border-stone-200 bg-stone-50 p-5 dark:border-white/10 dark:bg-black/20">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">What Pro adds</div>
                    <div className="mt-1 text-lg font-bold text-stone-950 dark:text-white">Premium customer experience</div>
                  </div>
                  <div className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                    Conversion ready
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {featureHighlights.slice(0, 4).map((feature) => {
                    const Icon = iconMap[feature.icon] || Sparkles
                    return (
                      <div key={feature.title} className="rounded-2xl border border-stone-200 bg-white p-4 dark:border-white/10 dark:bg-white/3">
                        <div className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-r ${theme.accentClass} text-white`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="mt-4 text-sm font-semibold text-stone-950 dark:text-white">{feature.title}</div>
                        <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-400">{feature.description}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className={`inline-flex rounded-full bg-linear-to-r ${theme.accentClass} px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white`}>
              What they get on Pro
            </div>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-stone-950 dark:text-white sm:text-4xl">
              Everything needed to turn a storefront into a revenue engine.
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-600 dark:text-stone-300 sm:text-base">
              {intro}
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featureHighlights.map((feature) => {
            const Icon = iconMap[feature.icon] || Sparkles
            return (
              <article key={feature.title} className="rounded-[1.75rem] border border-stone-200 bg-white/90 p-5 backdrop-blur dark:border-white/10 dark:bg-white/5">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-r ${theme.accentClass} text-white`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-stone-950 dark:text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-300">{feature.description}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <ReviewSection
          heading={`Why clients trust this ${shortLabel.toLowerCase()} storefront`}
          summary="Collect glowing reviews, display ratings, and make every first-time visitor feel confident enough to book."
          rating={theme.rating}
          reviewCount={theme.reviewCount}
          reviews={reviews}
          accentClass={theme.accentClass}
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <MiniShop
          heading={`Mini shop for ${shortLabel.toLowerCase()} retail`}
          description="Sell your best aftercare products, add-ons, and curated bundles directly from the storefront."
          products={products}
          accentClass={theme.accentClass}
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="rounded-4xl border border-stone-200 bg-linear-to-br from-white to-orange-50 p-8 shadow-2xl shadow-orange-100/50 dark:border-white/10 dark:from-white/10 dark:to-white/4 dark:shadow-black/10 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className={`inline-flex rounded-full bg-linear-to-r ${theme.accentClass} px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white`}>
                Ready for launch
              </div>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-stone-950 dark:text-white sm:text-4xl">
                Turn your {shortLabel.toLowerCase()} brand into a premium digital storefront.
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-600 dark:text-stone-300 sm:text-base">
                Get custom branding, stronger trust signals, better customer communication, and extra monetization tools in one Pro upgrade.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/pricing" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-stone-950 transition hover:bg-stone-200">
                Compare Pro pricing
              </Link>
              <Link href="/get-started" className="rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-950 transition hover:bg-stone-100 dark:border-white/10 dark:text-white dark:hover:bg-white/10">
                Create storefront
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
