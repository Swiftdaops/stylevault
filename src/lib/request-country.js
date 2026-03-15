import { normalizeCountryCode } from '@/lib/profile-options'

export function getVisitorCountryCode(headersList) {
  const vercelCountry = headersList?.get('x-vercel-ip-country')
  const cloudflareCountry = headersList?.get('cf-ipcountry')

  return normalizeCountryCode(vercelCountry || cloudflareCountry || '', 'CA')
}