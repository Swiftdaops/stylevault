import { SITE_URL } from '@/lib/seo'

const isLocalHost = (hostname = '') => hostname.includes('localhost') || /^\d+\.\d+\.\d+\.\d+$/.test(hostname)

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