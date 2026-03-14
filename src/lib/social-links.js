export const SOCIAL_PLATFORMS = [
  { key: 'whatsapp', label: 'WhatsApp' },
  { key: 'facebook', label: 'Facebook' },
  { key: 'instagram', label: 'Instagram' },
  { key: 'tiktok', label: 'TikTok' },
  { key: 'twitter', label: 'Twitter' },
  { key: 'linkedin', label: 'LinkedIn' },
]

function normalizeWhatsAppUrl(value = '') {
  const trimmed = String(value || '').trim()
  if (!trimmed) return ''
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  const phone = trimmed.replace(/\D/g, '')
  return phone ? `https://wa.me/${phone}` : ''
}

export function normalizeExternalUrl(value = '') {
  const trimmed = String(value || '').trim()
  if (!trimmed) return ''
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed.replace(/^\/+/, '')}`
}

export function normalizeSocialLinks(links = {}) {
  return SOCIAL_PLATFORMS.reduce((result, platform) => {
    const normalized = platform.key === 'whatsapp'
      ? normalizeWhatsAppUrl(links?.[platform.key])
      : normalizeExternalUrl(links?.[platform.key])
    if (normalized) result[platform.key] = normalized
    return result
  }, {})
}

export function getSocialLinksList(links = {}) {
  const normalized = normalizeSocialLinks(links)
  return SOCIAL_PLATFORMS.map((platform) => ({
    ...platform,
    href: normalized[platform.key] || '',
  })).filter((platform) => platform.href)
}