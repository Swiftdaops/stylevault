"use client"

import UpgradeToProButton from '@/components/pro-upgrade-button'

const THEME_CLASS_BY_NICHE = {
  barber: 'inline-flex items-center justify-center rounded-md border border-orange-300 bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 dark:border-amber-500/40 dark:bg-amber-500/20 dark:text-amber-100 dark:hover:bg-amber-500/30',
  hair: 'inline-flex items-center justify-center rounded-md border border-rose-300 bg-rose-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600 dark:border-rose-500/40 dark:bg-rose-500/20 dark:text-rose-100 dark:hover:bg-rose-500/30',
  nail: 'inline-flex items-center justify-center rounded-md border border-fuchsia-300 bg-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-fuchsia-600 dark:border-fuchsia-500/40 dark:bg-fuchsia-500/20 dark:text-fuchsia-100 dark:hover:bg-fuchsia-500/30',
  lash: 'inline-flex items-center justify-center rounded-md border border-violet-300 bg-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-600 dark:border-violet-500/40 dark:bg-violet-500/20 dark:text-violet-100 dark:hover:bg-violet-500/30',
  makeup: 'inline-flex items-center justify-center rounded-md border border-rose-300 bg-rose-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600 dark:border-rose-500/40 dark:bg-rose-500/20 dark:text-rose-100 dark:hover:bg-rose-500/30',
}

export default function AdminUpgradeButton({ niche = 'barber' }) {
  const normalizedNiche = String(niche || 'barber').trim().toLowerCase()
  const className = THEME_CLASS_BY_NICHE[normalizedNiche] || THEME_CLASS_BY_NICHE.barber

  const defaultNiche = {
    barber: 'Barber',
    hair: 'Hair Specialist',
    nail: 'Nail Technician',
    lash: 'Lash Technician',
    makeup: 'Makeup Artist',
  }[normalizedNiche] || 'Barber'

  return (
    <UpgradeToProButton
      label="Upgrade to Pro"
      defaultNiche={defaultNiche}
      className={className}
    />
  )
}