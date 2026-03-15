'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { isIOSBrowser, isStandaloneDisplayMode } from '@/lib/device'

const DEFAULT_MIN_VISITS = 2
const DEFAULT_COOLDOWN_MS = 24 * 60 * 60 * 1000

function getHostKey(prefix) {
  if (typeof window === 'undefined') return prefix
  return `${prefix}:${window.location.host}`
}

function markPromptShown() {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(getHostKey('sv:pwa:last-prompt'), String(Date.now()))
}

function incrementVisitCount() {
  if (typeof window === 'undefined') return 0

  const sessionKey = getHostKey('sv:pwa:visit-session')
  if (!window.sessionStorage.getItem(sessionKey)) {
    const visitsKey = getHostKey('sv:pwa:visits')
    const nextVisits = Number(window.localStorage.getItem(visitsKey) || '0') + 1
    window.localStorage.setItem(visitsKey, String(nextVisits))
    window.sessionStorage.setItem(sessionKey, '1')
    return nextVisits
  }

  return Number(window.localStorage.getItem(getHostKey('sv:pwa:visits')) || '0')
}

function canShowPrompt({ minVisits, cooldownMs }) {
  if (typeof window === 'undefined') return false

  const visits = incrementVisitCount()
  const lastPromptAt = Number(window.localStorage.getItem(getHostKey('sv:pwa:last-prompt')) || '0')
  const cooldownExpired = !lastPromptAt || Date.now() - lastPromptAt >= cooldownMs

  return visits >= minVisits && cooldownExpired
}

export function useInstallPrompt({ minVisits = DEFAULT_MIN_VISITS, cooldownMs = DEFAULT_COOLDOWN_MS, autoPrompt = true } = {}) {
  const [isStandalone, setIsStandalone] = useState(true)
  const [isIOS, setIsIOS] = useState(false)
  const [canPrompt, setCanPrompt] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [manualRequested, setManualRequested] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const standalone = isStandaloneDisplayMode()
    const ios = isIOSBrowser()

    setIsStandalone(standalone)
    setIsIOS(ios)

    if (standalone) {
      window.localStorage.setItem(getHostKey('sv:pwa:installed'), 'true')
      return undefined
    }

    setCanPrompt(autoPrompt ? canShowPrompt({ minVisits, cooldownMs }) : false)

    const displayModeQuery = window.matchMedia('(display-mode: standalone)')

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault()
      setDeferredPrompt(event)
    }

    const handleInstalled = () => {
      window.localStorage.setItem(getHostKey('sv:pwa:installed'), 'true')
      setDeferredPrompt(null)
      setIsVisible(false)
      setCanPrompt(false)
      setIsStandalone(true)
    }

    const handleDisplayModeChange = (event) => {
      if (event.matches) {
        handleInstalled()
      }
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleInstalled)
    displayModeQuery.addEventListener?.('change', handleDisplayModeChange)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleInstalled)
      displayModeQuery.removeEventListener?.('change', handleDisplayModeChange)
    }
  }, [autoPrompt, cooldownMs, minVisits])

  useEffect(() => {
    if (isStandalone) {
      setIsVisible(false)
      return
    }

    if (manualRequested && (isIOS || deferredPrompt)) {
      setIsVisible(true)
      setCanPrompt(false)
      setManualRequested(false)
      markPromptShown()
      return
    }

    if (!autoPrompt || !canPrompt) {
      if (!manualRequested) {
        setIsVisible(false)
      }
      return
    }

    if (isIOS || deferredPrompt) {
      setIsVisible(true)
      markPromptShown()
    }
  }, [autoPrompt, canPrompt, deferredPrompt, isIOS, isStandalone, manualRequested])

  const showPrompt = useCallback(() => {
    if (isStandalone) return false

    if (isIOS || deferredPrompt) {
      setIsVisible(true)
      setCanPrompt(false)
      markPromptShown()
      return true
    }

    setManualRequested(true)
    return false
  }, [deferredPrompt, isIOS, isStandalone])

  const dismiss = useCallback(() => {
    markPromptShown()
    setIsVisible(false)
    setCanPrompt(false)
    setManualRequested(false)
  }, [])

  const promptInstall = useCallback(async () => {
    if (!deferredPrompt) return { outcome: 'unavailable' }

    markPromptShown()
    await deferredPrompt.prompt()
    const choice = await deferredPrompt.userChoice

    setDeferredPrompt(null)
    setIsVisible(false)
    setCanPrompt(false)

    if (choice?.outcome === 'accepted' && typeof window !== 'undefined') {
      window.localStorage.setItem(getHostKey('sv:pwa:installed'), 'true')
    }

    return choice || { outcome: 'dismissed' }
  }, [deferredPrompt])

  return useMemo(() => ({
    isIOS,
    isStandalone,
    isVisible,
    canInstallNative: Boolean(deferredPrompt),
    dismiss,
    promptInstall,
    showPrompt,
  }), [deferredPrompt, dismiss, isIOS, isStandalone, isVisible, promptInstall, showPrompt])
}

export default useInstallPrompt