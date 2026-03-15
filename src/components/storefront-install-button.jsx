'use client'

import Link from 'next/link'
import { ArrowUpRight, Download } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import useInstallPrompt from '@/hooks/use-install-prompt'

const toneStyles = {
  orange: {
    button: 'border-orange-200 bg-white text-stone-950 hover:bg-orange-100 dark:border-stone-700 dark:bg-stone-950 dark:text-amber-200 dark:hover:bg-stone-900',
    disabled: 'opacity-70',
  },
  rose: {
    button: 'border-rose-200 bg-white text-stone-950 hover:bg-rose-100 dark:border-stone-700 dark:bg-stone-950 dark:text-rose-200 dark:hover:bg-stone-900',
    disabled: 'opacity-70',
  },
  fuchsia: {
    button: 'border-fuchsia-200 bg-white text-stone-950 hover:bg-fuchsia-100 dark:border-stone-700 dark:bg-stone-950 dark:text-fuchsia-200 dark:hover:bg-stone-900',
    disabled: 'opacity-70',
  },
  violet: {
    button: 'border-violet-200 bg-white text-stone-950 hover:bg-violet-100 dark:border-stone-700 dark:bg-stone-950 dark:text-violet-200 dark:hover:bg-stone-900',
    disabled: 'opacity-70',
  },
}

function isExternalUrl(url) {
  return /^https?:\/\//i.test(url || '')
}

export default function StorefrontInstallButton({
  appName = 'StyleVault Booking App',
  storefrontUrl = '/',
  installMode = 'install',
  tone = 'orange',
  className = '',
}) {
  const styles = toneStyles[tone] || toneStyles.orange
  const baseClassName = `inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition ${styles.button} ${className}`.trim()
  const { canInstallNative, isIOS, isStandalone, promptInstall, showPrompt } = useInstallPrompt({ autoPrompt: false })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const destinationHost = useMemo(() => {
    if (!isExternalUrl(storefrontUrl)) {
      return null
    }

    try {
      return new URL(storefrontUrl).host
    } catch {
      return null
    }
  }, [storefrontUrl])

  if (installMode === 'open-storefront') {
    if (isExternalUrl(storefrontUrl)) {
      return (
        <a
          href={storefrontUrl}
          className={baseClassName}
          title={destinationHost ? `Open ${destinationHost} to install ${appName}` : `Open ${appName}`}
        >
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          <span>Open app to install</span>
        </a>
      )
    }

    return (
      <Link href={storefrontUrl} className={baseClassName}>
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        <span>Open app to install</span>
      </Link>
    )
  }

  if (!mounted) {
    return (
      <button type="button" disabled className={`${baseClassName} ${styles.disabled}`.trim()}>
        <Download className="h-4 w-4" aria-hidden="true" />
        <span>Install app</span>
      </button>
    )
  }

  if (isStandalone) {
    return null
  }

  const handleInstall = async () => {
    if (canInstallNative) {
      await promptInstall()
      return
    }

    showPrompt()
  }

  return (
    <button
      type="button"
      onClick={handleInstall}
      className={baseClassName}
      aria-label={`Install ${appName}`}
    >
      <Download className="h-4 w-4" aria-hidden="true" />
      <span>{isIOS ? 'Add to Home Screen' : 'Install app'}</span>
    </button>
  )
}