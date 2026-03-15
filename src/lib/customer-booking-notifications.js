import { getToken } from 'firebase/messaging'
import { firebaseVapidKey, getBrowserMessaging, isFirebaseMessagingConfigured } from '@/lib/firebase-client'
import { isIOSBrowser, isStandaloneDisplayMode } from '@/lib/device'

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

  const iosBrowser = isIOSBrowser()
  const standalone = isStandaloneDisplayMode()

  const basePreference = {
    supported: isFirebaseMessagingConfigured(),
    permission: Notification.permission || 'default',
    token: '',
    platform: window.navigator?.platform || '',
    language: window.navigator?.language || '',
    scope: CUSTOMER_NOTIFICATION_SCOPE,
    standalone,
  }

  if (!('serviceWorker' in navigator)) {
    return {
      ...basePreference,
      supported: false,
      error: 'service-worker-unsupported',
    }
  }

  if (iosBrowser && !standalone) {
    return {
      ...basePreference,
      supported: false,
      error: 'ios-requires-home-screen-install',
    }
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

function getStatusNotificationContent(status = 'confirmed', providerName = 'StyleVault', serviceName = 'Appointment', appointmentDate = '', appointmentTime = '') {
  const normalizedStatus = String(status || 'confirmed').toLowerCase()
  const when = [appointmentDate, appointmentTime].filter(Boolean).join(' at ')

  if (normalizedStatus === 'pending') {
    return {
      title: 'Booking request sent',
      body: `Your booking request has been sent to ${providerName}. We will notify you when it is confirmed.`,
      tag: `booking-pending:${providerName}:${appointmentDate}:${appointmentTime}`,
    }
  }

  if (normalizedStatus === 'completed') {
    return {
      title: 'Thank you for coming',
      body: `Thank you for visiting ${providerName}. We hope you enjoyed your appointment.`,
      tag: `booking-completed:${providerName}:${appointmentDate}:${appointmentTime}`,
    }
  }

  if (normalizedStatus === 'cancelled') {
    return {
      title: 'Booking cancelled',
      body: `Your booking with ${providerName} has been cancelled.${when ? ` It was scheduled for ${when}.` : ''}`,
      tag: `booking-cancelled:${providerName}:${appointmentDate}:${appointmentTime}`,
    }
  }

  return {
    title: 'Booking confirmed',
    body: `${serviceName} with ${providerName}${when ? ` on ${when}` : ''} is confirmed.`,
    tag: `booking-confirmed:${providerName}:${appointmentDate}:${appointmentTime}`,
  }
}

export async function showBookingStatusNotification({ status = 'confirmed', providerName = 'StyleVault', serviceName = 'Appointment', appointmentDate = '', appointmentTime = '' }) {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return { shown: false, reason: 'unsupported' }
  }

  if (isIOSBrowser() && !isStandaloneDisplayMode()) {
    return { shown: false, reason: 'ios-requires-home-screen-install' }
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
    const content = getStatusNotificationContent(status, providerName, serviceName, appointmentDate, appointmentTime)
    new Notification(content.title, {
      body: content.body,
      icon: '/icon',
      badge: '/icon',
      tag: content.tag,
    })

    return { shown: true }
  } catch {
    return { shown: false, reason: 'notification-failed' }
  }
}

export async function showBookingConfirmedNotification(options = {}) {
  return showBookingStatusNotification({ status: 'confirmed', ...options })
}

export default showBookingStatusNotification
