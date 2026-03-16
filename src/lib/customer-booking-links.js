import { SITE_URL } from '@/lib/seo'

const isLocalHost = (hostname = '') => hostname.includes('localhost') || /^\d+\.\d+\.\d+\.\d+$/.test(hostname)
const STORAGE_KEY = 'stylevault.customer-bookings.v1'
const STORAGE_EVENT = 'stylevault-customer-bookings:changed'
const MAX_STORED_BOOKINGS = 24

function getBaseOrigin() {
  if (typeof window === 'undefined') {
    return SITE_URL
  }

  const hostname = window.location?.hostname || ''
  return isLocalHost(hostname) ? SITE_URL : window.location.origin
}

function normalizeUrl(value = '') {
  const rawValue = String(value || '').trim()
  if (!rawValue) return ''

  try {
    return new URL(rawValue, getBaseOrigin()).toString()
  } catch {
    return ''
  }
}

function getBookingIdFromManageLink(manageLink = '') {
  try {
    const url = new URL(manageLink, getBaseOrigin())
    const segments = url.pathname.split('/').filter(Boolean)
    const bookingsIndex = segments.lastIndexOf('bookings')
    return bookingsIndex >= 0 ? String(segments[bookingsIndex + 1] || '').trim() : ''
  } catch {
    return ''
  }
}

function normalizeStoredBooking(record = {}) {
  const manageLink = normalizeUrl(record.manageLink || record.link || '')
  if (!manageLink) return null

  const bookingId = String(record.bookingId || getBookingIdFromManageLink(manageLink) || '').trim()
  const savedAt = Number(record.savedAt || 0) || Date.now()
  const updatedAt = Number(record.updatedAt || 0) || Date.now()

  return {
    bookingId,
    manageLink,
    storeUrl: normalizeUrl(record.storeUrl || ''),
    providerType: String(record.providerType || '').trim().toLowerCase(),
    providerName: String(record.providerName || '').trim(),
    providerSlug: String(record.providerSlug || '').trim().toLowerCase(),
    serviceName: String(record.serviceName || '').trim(),
    appointmentDate: String(record.appointmentDate || '').trim(),
    appointmentTime: String(record.appointmentTime || '').trim(),
    status: String(record.status || 'pending').trim().toLowerCase(),
    savedAt,
    updatedAt,
  }
}

function dispatchBookingsChange() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event(STORAGE_EVENT))
}

function readStoredBookings() {
  if (typeof window === 'undefined') return []

  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY)
    if (!rawValue) return []

    const parsed = JSON.parse(rawValue)
    if (!Array.isArray(parsed)) return []

    return parsed
      .map((item) => normalizeStoredBooking(item))
      .filter(Boolean)
      .sort((left, right) => (right.updatedAt || 0) - (left.updatedAt || 0))
  } catch {
    return []
  }
}

function writeStoredBookings(bookings = []) {
  if (typeof window === 'undefined') return []

  const normalizedBookings = bookings
    .map((item) => normalizeStoredBooking(item))
    .filter(Boolean)
    .sort((left, right) => (right.updatedAt || 0) - (left.updatedAt || 0))
    .slice(0, MAX_STORED_BOOKINGS)

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedBookings))
  dispatchBookingsChange()

  return normalizedBookings
}

export function withBookingManagerFeedback(manageLink, query = {}) {
  if (!manageLink) return ''

  try {
    // Prefer the storefront/site canonical URL when the current window is localhost
    // so generated/manage links in dev emails or toasts don't point to `http://localhost:3000`.
    let baseOrigin = SITE_URL
    if (typeof window !== 'undefined') {
      const hostname = window.location?.hostname || ''
      baseOrigin = isLocalHost(hostname) ? SITE_URL : window.location.origin
    }

    const url = new URL(manageLink, baseOrigin)

    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') return
      url.searchParams.set(key, String(value))
    })

    return url.toString()
  } catch {
    return manageLink
  }
}

export function getStoredCustomerBookings() {
  return readStoredBookings()
}

export function saveStoredCustomerBooking(record = {}) {
  const normalizedRecord = normalizeStoredBooking(record)
  if (!normalizedRecord || typeof window === 'undefined') return null

  const currentBookings = readStoredBookings()
  const nextBookings = [normalizedRecord]

  currentBookings.forEach((booking) => {
    const sameBookingId = normalizedRecord.bookingId && booking.bookingId === normalizedRecord.bookingId
    const sameManageLink = booking.manageLink === normalizedRecord.manageLink

    if (!sameBookingId && !sameManageLink) {
      nextBookings.push(booking)
    }
  })

  writeStoredBookings(nextBookings)
  return normalizedRecord
}

export function syncStoredCustomerBookingFromPayload(payload = {}) {
  const appointment = payload?.appointment || {}
  const provider = appointment?.provider || {}
  const service = appointment?.service || {}

  return saveStoredCustomerBooking({
    bookingId: appointment?.id,
    manageLink: payload?.manageLink,
    storeUrl: payload?.storeUrl,
    providerType: provider?.type,
    providerName: provider?.name,
    providerSlug: provider?.slug,
    serviceName: service?.name,
    appointmentDate: appointment?.date,
    appointmentTime: appointment?.time,
    status: appointment?.status,
    savedAt: payload?.savedAt,
    updatedAt: Date.now(),
  })
}

export function subscribeToStoredCustomerBookings(listener) {
  if (typeof window === 'undefined') return () => {}

  const handleChange = () => listener?.(getStoredCustomerBookings())
  window.addEventListener('storage', handleChange)
  window.addEventListener(STORAGE_EVENT, handleChange)

  return () => {
    window.removeEventListener('storage', handleChange)
    window.removeEventListener(STORAGE_EVENT, handleChange)
  }
}