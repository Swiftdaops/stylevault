"use client"

import { useEffect, useMemo, useState } from 'react'
import { getToken, onMessage } from 'firebase/messaging'
import { firebaseVapidKey, getBrowserMessaging, isFirebaseMessagingConfigured } from '@/lib/firebase-client'
import { isIOSBrowser, isStandaloneDisplayMode } from '@/lib/device'
import { registerPushDeviceToken, savePushDevicePreference } from '@/lib/push-notifications'

async function registerCurrentBrowser(messaging) {
  const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js')
  const token = await getToken(messaging, {
    vapidKey: firebaseVapidKey,
    serviceWorkerRegistration: registration,
  })

  if (!token) {
    throw new Error('No browser push token was returned')
  }

  await registerPushDeviceToken(token, {
    permission: 'granted',
    scope: 'owner-dashboard',
  })
  return token
}

export default function ProviderPushNotificationPrompt({ enabled = false, audienceLabel = 'Provider' }) {
  const [supported, setSupported] = useState(false)
  const [permission, setPermission] = useState('default')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [isRegistered, setIsRegistered] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  const shouldRender = useMemo(() => (
    enabled
    && isFirebaseMessagingConfigured()
    && (
      (isIOS && !isStandalone)
      || permission !== 'granted'
      || error
      || (permission === 'granted' && !isRegistered)
    )
  ), [enabled, error, isIOS, isRegistered, isStandalone, permission])

  useEffect(() => {
    let isCancelled = false
    let unsubscribe = () => {}

    async function initMessaging() {
      if (!enabled || !isFirebaseMessagingConfigured()) return

      if (typeof window === 'undefined' || !('Notification' in window)) {
        return
      }

      const ios = isIOSBrowser()
      const standalone = isStandaloneDisplayMode()

      setIsIOS(ios)
      setIsStandalone(standalone)
      setPermission(Notification.permission)

      await savePushDevicePreference({
        permission: Notification.permission,
        scope: 'owner-dashboard',
      }).catch(() => {})

      if (ios && !standalone) {
        setSupported(false)
        return
      }

      const messaging = await getBrowserMessaging()
      if (isCancelled) {
        return
      }

      setSupported(Boolean(messaging))

      if (!messaging) {
        return
      }

      if (Notification.permission === 'granted') {
        try {
          await registerCurrentBrowser(messaging)
          if (!isCancelled) {
            setIsRegistered(true)
            setError('')
          }
        } catch (registrationError) {
          if (!isCancelled) {
            setError(registrationError.message)
          }
        }

        unsubscribe = onMessage(messaging, (payload) => {
          const title = payload?.notification?.title || `${audienceLabel} alert`
          const body = payload?.notification?.body || 'You have a new booking update.'

          try {
            if (Notification.permission === 'granted') {
              new Notification(title, {
                body,
                icon: '/icon',
                tag: payload?.data?.appointmentId ? `appointment:${payload.data.appointmentId}` : undefined,
              })
            }
          } catch {
            // ignore foreground notification issues
          }
        })
      }
    }

    initMessaging().catch((initError) => {
      if (!isCancelled) {
        setError(initError.message)
      }
    })

    return () => {
      isCancelled = true
      unsubscribe()
    }
  }, [audienceLabel, enabled])

  const handleEnableNotifications = async () => {
    if (!enabled || isSubmitting) return

    setIsSubmitting(true)
    setError('')

    try {
      if (isIOS && !isStandalone) {
        throw new Error('Install this app on your Home Screen in Safari before enabling push notifications on iPhone or iPad')
      }

      const nextPermission = await Notification.requestPermission()
      setPermission(nextPermission)

      await savePushDevicePreference({
        permission: nextPermission,
        scope: 'owner-dashboard',
      }).catch(() => {})

      if (nextPermission !== 'granted') {
        throw new Error('Browser notifications were not granted')
      }

      const messaging = await getBrowserMessaging()
      if (!messaging) {
        throw new Error('Push notifications are not supported in this browser')
      }

      await registerCurrentBrowser(messaging)
      setIsRegistered(true)
      setSupported(true)
    } catch (registrationError) {
      setError(registrationError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!enabled || !isFirebaseMessagingConfigured()) {
    return null
  }

  if (!shouldRender) {
    return null
  }

  const installMessage = `Install the app on your Home Screen in Safari first, then reopen the dashboard and enable notifications so new appointments alert your phone instantly.`
  const helpText = isIOS && !isStandalone
    ? installMessage
    : `Turn on push notifications so your ${audienceLabel.toLowerCase()} dashboard gets alerted the moment a new appointment is booked.`
  const actionLabel = isIOS && !isStandalone
    ? 'Install app to enable alerts'
    : permission === 'granted'
      ? 'Retry notification setup'
      : 'Enable notifications'

  return (
    <div className="mx-4 mt-4 rounded-2xl border border-amber-300 bg-white/90 p-4 text-sm text-stone-800 shadow-sm dark:border-amber-700 dark:bg-stone-900/90 dark:text-stone-100">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold">Enable instant booking alerts</p>
          <p className="text-stone-600 dark:text-stone-300">
            {helpText}
          </p>
          {!supported && !isIOS && permission !== 'granted' ? <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">If this browser does not support web push, install the app or try Chrome, Edge, or Safari on a supported device.</p> : null}
          {error ? <p className="mt-2 text-xs text-red-600 dark:text-red-400">{error}</p> : null}
          {isRegistered ? <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400">Notifications are enabled on this device.</p> : null}
        </div>
        <button
          type="button"
          onClick={handleEnableNotifications}
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full bg-stone-950 px-4 py-2 font-medium text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-amber-500 dark:text-stone-950 dark:hover:bg-amber-400"
        >
          {isSubmitting ? 'Enabling…' : actionLabel}
        </button>
      </div>
    </div>
  )
}
