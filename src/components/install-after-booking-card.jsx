'use client'

import { useEffect, useRef } from 'react'
import { Download, Share2, Smartphone } from 'lucide-react'
import useInstallPrompt from '@/hooks/use-install-prompt'

function buildDescription({ serviceName = '', appointmentDate = '', appointmentTime = '' }) {
  const when = [appointmentDate, appointmentTime].filter(Boolean).join(' at ')

  if (serviceName && when) {
    return `Track your ${serviceName} booking for ${when}, reopen this app in one tap, and get reminders faster.`
  }

  return 'Track your appointment, reopen this app in one tap, and get reminders faster.'
}

export default function InstallAfterBookingCard({
  enabled = false,
  appName = 'StyleVault',
  serviceName = '',
  appointmentDate = '',
  appointmentTime = '',
}) {
  const hasRequestedRef = useRef(false)
  const { canInstallNative, dismiss, isIOS, isStandalone, isVisible, promptInstall, showPrompt } = useInstallPrompt({ autoPrompt: false })

  useEffect(() => {
    if (!enabled) {
      hasRequestedRef.current = false
      return
    }

    if (hasRequestedRef.current) {
      return
    }

    hasRequestedRef.current = true
    showPrompt()
  }, [enabled, showPrompt])

  if (!enabled || isStandalone || !isVisible) {
    return null
  }

  return (
    <div className="mt-4 rounded-3xl border border-stone-200 bg-white/95 p-5 shadow-sm dark:border-stone-800 dark:bg-stone-950/90">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-stone-950 text-white dark:bg-amber-500 dark:text-stone-950">
          {isIOS ? <Share2 className="h-5 w-5" /> : <Download className="h-5 w-5" />}
        </div>

        <div className="min-w-0 flex-1 space-y-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">Booking request sent</p>
            <h3 className="mt-1 text-base font-semibold text-stone-950 dark:text-white">Install {appName}&apos;s booking app</h3>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">{buildDescription({ serviceName, appointmentDate, appointmentTime })}</p>
          </div>

          {isIOS ? (
            <div className="rounded-2xl bg-stone-100 p-3 text-sm text-stone-700 dark:bg-stone-900 dark:text-stone-200">
              <div className="flex items-center gap-2 font-medium">
                <Smartphone className="h-4 w-4" />
                Add to Home Screen
              </div>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-xs leading-5 text-stone-600 dark:text-stone-300">
                <li>Tap the Share button in Safari.</li>
                <li>Choose Add to Home Screen.</li>
                <li>Tap Add to install {appName}.</li>
              </ol>
            </div>
          ) : null}

          <div className="flex flex-wrap items-center gap-3">
            {isIOS ? (
              <button
                type="button"
                onClick={dismiss}
                className="inline-flex items-center justify-center rounded-full bg-stone-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-800 dark:bg-amber-500 dark:text-stone-950 dark:hover:bg-amber-400"
              >
                I&apos;ll add it now
              </button>
            ) : (
              <button
                type="button"
                onClick={promptInstall}
                disabled={!canInstallNative}
                className="inline-flex items-center justify-center rounded-full bg-stone-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-amber-500 dark:text-stone-950 dark:hover:bg-amber-400"
              >
                Install App
              </button>
            )}

            <button
              type="button"
              onClick={dismiss}
              className="text-sm font-medium text-stone-500 transition hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}