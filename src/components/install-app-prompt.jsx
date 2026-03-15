'use client'

import { Download, Share2, Smartphone, X } from 'lucide-react'
import useInstallPrompt from '@/hooks/use-install-prompt'

export default function InstallAppPrompt({
  appName = 'StyleVault',
  title,
  description = 'Install this app for faster booking, one-tap reopening, and reminder notifications.',
}) {
  const { canInstallNative, dismiss, isIOS, isStandalone, isVisible, promptInstall } = useInstallPrompt()

  if (isStandalone || !isVisible) {
    return null
  }

  const headline = title || `Install ${appName}`

  return (
    <div className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex justify-end sm:inset-x-6 sm:bottom-6">
      <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-3xl border border-stone-200 bg-white/95 shadow-2xl shadow-stone-950/10 backdrop-blur dark:border-stone-800 dark:bg-stone-950/95">
        <div className="flex items-start gap-3 p-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-stone-950 text-white dark:bg-amber-500 dark:text-stone-950">
            {isIOS ? <Share2 className="h-5 w-5" /> : <Download className="h-5 w-5" />}
          </div>

          <div className="min-w-0 flex-1 space-y-3">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-stone-950 dark:text-white">{headline}</p>
              <p className="text-sm text-stone-600 dark:text-stone-300">{description}</p>
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
                Later
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={dismiss}
            className="rounded-full p-2 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-900 dark:hover:text-stone-100"
            aria-label="Dismiss install prompt"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}