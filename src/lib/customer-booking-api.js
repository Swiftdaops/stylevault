import { API_BASE_URL } from '@/lib/api-base'

const providerConfig = {
  barber: {
    bookingBasePath: '/appointments',
    availabilityPath: '/appointments/availability',
    providerIdKey: 'barberId',
  },
  'hair-specialist': {
    bookingBasePath: '/hair-appointments',
    availabilityPath: '/hair-appointments/availability',
    providerIdKey: 'hairSpecialistId',
  },
  'nail-technician': {
    bookingBasePath: '/nail-appointments',
    availabilityPath: '/nail-appointments/availability',
    providerIdKey: 'nailTechnicianId',
  },
  'lash-technician': {
    bookingBasePath: '/lash-appointments',
    availabilityPath: '/lash-appointments/availability',
    providerIdKey: 'lashTechnicianId',
  },
  'makeup-artist': {
    bookingBasePath: '/makeup-appointments',
    availabilityPath: '/makeup-appointments/availability',
    providerIdKey: 'makeupArtistId',
  },
}

function getConfig(providerType) {
  return providerConfig[providerType] || null
}

async function requestJson(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    cache: 'no-store',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const error = new Error(data?.message || 'Request failed')
    Object.assign(error, data || {})
    throw error
  }

  return data
}

export function getCustomerBookingConfig(providerType) {
  return getConfig(providerType)
}

export async function getPublicBooking({ providerType, bookingId, accessToken }) {
  const config = getConfig(providerType)
  if (!config || !bookingId) {
    throw new Error('Booking route is unavailable')
  }

  const searchParams = new URLSearchParams()
  if (accessToken) searchParams.set('access', accessToken)

  return requestJson(`${config.bookingBasePath}/public/${bookingId}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`)
}

export async function updatePublicBooking({ providerType, bookingId, accessToken, payload }) {
  const config = getConfig(providerType)
  if (!config || !bookingId) {
    throw new Error('Booking route is unavailable')
  }

  const searchParams = new URLSearchParams()
  if (accessToken) searchParams.set('access', accessToken)

  return requestJson(`${config.bookingBasePath}/public/${bookingId}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`, {
    method: 'PATCH',
    body: JSON.stringify(payload || {}),
  })
}

export async function submitPublicBookingReview({ providerType, bookingId, accessToken, payload }) {
  const config = getConfig(providerType)
  if (!config || !bookingId) {
    throw new Error('Review route is unavailable')
  }

  const searchParams = new URLSearchParams()
  if (accessToken) searchParams.set('access', accessToken)

  return requestJson(`${config.bookingBasePath}/public/${bookingId}/review${searchParams.toString() ? `?${searchParams.toString()}` : ''}`, {
    method: 'POST',
    body: JSON.stringify(payload || {}),
  })
}

export async function getPublicBookingAvailability({ providerType, providerId, date }) {
  const config = getConfig(providerType)
  if (!config || !providerId || !date) {
    return { bookedTimes: [], available: undefined }
  }

  const searchParams = new URLSearchParams({ date })
  searchParams.set(config.providerIdKey, providerId)

  try {
    return await requestJson(`${config.availabilityPath}?${searchParams.toString()}`)
  } catch {
    return { bookedTimes: [], available: undefined }
  }
}
