import { API_BASE_URL } from '@/lib/api-base'

async function requestJson(path) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error('Request failed')
  }

  return response.json()
}

export async function getReviewsForProvider({ providerType, providerSlug, providerId, limit = 6 } = {}) {
  if (!providerType || (!providerSlug && !providerId)) {
    return {
      providerType: providerType || '',
      providerSlug: providerSlug || '',
      providerId: providerId || '',
      totalReviews: 0,
      averageRating: 0,
      items: [],
    }
  }

  const searchParams = new URLSearchParams({ providerType })
  if (providerSlug) searchParams.set('providerSlug', providerSlug)
  if (providerId) searchParams.set('providerId', providerId)
  if (limit) searchParams.set('limit', String(limit))

  try {
    return await requestJson(`/reviews?${searchParams.toString()}`)
  } catch {
    return {
      providerType,
      providerSlug: providerSlug || '',
      providerId: providerId || '',
      totalReviews: 0,
      averageRating: 0,
      items: [],
    }
  }
}
