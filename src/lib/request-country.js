import { normalizeCountryCode } from '@/lib/profile-options'

export function getRawVisitorCountryCode(headersList, fallback = 'US') {
  const vercelCountry = String(headersList?.get('x-vercel-ip-country') || '').trim().toUpperCase()
  const cloudflareCountry = String(headersList?.get('cf-ipcountry') || '').trim().toUpperCase()
  const fallbackCountry = String(fallback || 'US').trim().toUpperCase()
  const detectedCountry = vercelCountry || cloudflareCountry

  if (/^[A-Z]{2}$/.test(detectedCountry)) {
    return detectedCountry
  }

  return /^[A-Z]{2}$/.test(fallbackCountry) ? fallbackCountry : 'US'
}

export function getVisitorCountryCode(headersList, fallback = 'CA') {
  return normalizeCountryCode(getRawVisitorCountryCode(headersList, fallback), fallback)
}