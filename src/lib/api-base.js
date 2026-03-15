function normalizeApiBase(raw) {
  const value = String(raw || '').trim()
  if (!value) return ''

  const stripped = value.replace(/\/+$/, '')
  if (/\/api(\/|$)/i.test(stripped)) return stripped

  return `${stripped}/api`
}

const EXTERNAL_API_BASE_URL = normalizeApiBase(process.env.NEXT_PUBLIC_API_URL)

const API_BASE_URL = typeof window === 'undefined'
  ? (EXTERNAL_API_BASE_URL || '/api')
  : '/api'

const SOCKET_BASE_URL = (EXTERNAL_API_BASE_URL || API_BASE_URL).replace(/\/api\/?$/, '')

export { API_BASE_URL, EXTERNAL_API_BASE_URL, SOCKET_BASE_URL, normalizeApiBase }