'use client'

import { useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import useInstallPrompt from '@/hooks/use-install-prompt'
import { cn } from '@/lib/utils'

function buildIOSMessage(appName) {
  return [
    `To add ${appName} to your Home Screen:`,
    '',
    '1) Open this site in Safari',
    '2) Tap Share (square with arrow)',
    '3) Tap “Add to Home Screen”',
  ].join('\n')
}

function buildGenericMessage(appName) {
  return [
    `To install ${appName}:`,
    '',
    '• In Chrome/Edge: open the browser menu → “Install app” / “Add to Home screen”.',
    '• If you are in an in-app browser (Instagram/Twitter), open in your main browser.',
  ].join('\n')
}

export default function HomeInstallActions({ appName = 'StyleVault', className = '' }) {
  const { canInstallNative, isIOS, isStandalone, promptInstall } = useInstallPrompt({ autoPrompt: false })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const showIOSHelp = useCallback(() => {
    if (typeof window === 'undefined') return
    window.alert(buildIOSMessage(appName))
  }, [appName])

  const showGenericHelp = useCallback(() => {
    if (typeof window === 'undefined') return
    window.alert(buildGenericMessage(appName))
  }, [appName])

  const handleInstall = async () => {
    if (!mounted || isStandalone) return

    if (canInstallNative) {
      await promptInstall()
      return
    }

    if (isIOS) {
      showIOSHelp()
      return
    }

    showGenericHelp()
  }

  const handleAddToHomeScreen = async () => {
    if (!mounted || isStandalone) return

    if (isIOS) {
      showIOSHelp()
      return
    }

    if (canInstallNative) {
      await promptInstall()
      return
    }

    showGenericHelp()
  }

  if (isStandalone) {
    return null
  }

  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      <Button
        type="button"
        size="lg"
        className="rounded-full px-6"
        onClick={handleInstall}
        disabled={!mounted}
        aria-label={`Install ${appName}`}
      >
        Install
      </Button>

      <Button
        type="button"
        size="lg"
        variant="outline"
        className="rounded-full px-6"
        onClick={handleAddToHomeScreen}
        disabled={!mounted}
        aria-label={`Add ${appName} to Home Screen`}
      >
        Add to Home Screen
      </Button>
    </div>
  )
}
