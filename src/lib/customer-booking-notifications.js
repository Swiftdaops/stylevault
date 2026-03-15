import { getToken } from 'firebase/messaging'
import { firebaseVapidKey, getBrowserMessaging, isFirebaseMessagingConfigured } from '@/lib/firebase-client'

const CUSTOMER_NOTIFICATION_SCOPE = 'customer-booking'

export async function requestCustomerBookingNotificationPreference() {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return {
      supported: false,
      permission: 'unsupported',
      token: '',
      platform: '',
      language: '',
      scope: CUSTOMER_NOTIFICATION_SCOPE,
    }
  }

  const basePreference = {
    supported: isFirebaseMessagingConfigured(),
    permission: Notification.permission || 'default',
    token: '',
    platform: window.navigator?.platform || '',
    language: window.navigator?.language || '',
    scope: CUSTOMER_NOTIFICATION_SCOPE,
  }

  let permission = basePreference.permission
  if (permission === 'default') {
    try {
      permission = await Notification.requestPermission()
    } catch {
      return {
        ...basePreference,
        permission: 'default',
        error: 'permission-request-failed',
      }
    }
  }

  if (permission !== 'granted') {
    return {
      ...basePreference,
      permission,
    }
  }

  try {
    const messaging = await getBrowserMessaging()
    if (!messaging) {
      return {
        ...basePreference,
        supported: false,
        permission,
      }
    }

    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js')

    const token = await getToken(messaging, {
      vapidKey: firebaseVapidKey,
      serviceWorkerRegistration: registration,
    })

    return {
      ...basePreference,
      supported: true,
      permission,
      token: token || '',
    }
  } catch (error) {
    return {
      ...basePreference,
      permission,
      error: error?.message || 'token-registration-failed',
    }
  }
}

export async function showBookingConfirmedNotification({ providerName = 'StyleVault', serviceName = 'Appointment', appointmentDate = '', appointmentTime = '' }) {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return { shown: false, reason: 'unsupported' }
  }

  let permission = Notification.permission
  if (permission === 'default') {
    try {
      permission = await Notification.requestPermission()
    } catch {
      return { shown: false, reason: 'permission-request-failed' }
    }
  }

  if (permission !== 'granted') {
    return { shown: false, reason: 'permission-denied' }
  }

  try {
    const when = [appointmentDate, appointmentTime].filter(Boolean).join(' at ')
    new Notification('Booking confirmed', {
      body: `${serviceName} with ${providerName}${when ? ` on ${when}` : ''}.`,
      icon: '/icon',
      badge: '/icon',
      tag: `booking-confirmed:${providerName}:${appointmentDate}:${appointmentTime}`,
    })

    return { shown: true }
  } catch {
    return { shown: false, reason: 'notification-failed' }
  }
}

export default showBookingConfirmedNotification
