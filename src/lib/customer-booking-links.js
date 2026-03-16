import { SITE_URL } from '@/lib/seo'

export function withBookingManagerFeedback(manageLink, query = {}) {
  if (!manageLink) return ''

  try {
    const baseOrigin = typeof window !== 'undefined' ? window.location.origin : SITE_URL
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