function normalizeApiBase(raw) {
  const val = String(raw || '').trim();
  if (!val) return '';
  const stripped = val.replace(/\/+$/, '');
  if (/\/api(\/|$)/i.test(stripped)) return stripped;
  return `${stripped}/api`;
}

const API_BASE_URL = normalizeApiBase(process.env.NEXT_PUBLIC_API_URL) || '/api';

async function fetchJson(path) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Request failed for ${path}`);
  }

  return response.json();
}

async function authedJson(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: 'include',
    cache: 'no-store',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error?.message || 'Request failed');
  }

  return response.json();
}

export function formatCurrency(value, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format((Number(value) || 0) / 100);
}

export function slugify(value = '') {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function getMakeupArtists() {
  try {
    const artists = await fetchJson('/makeup-artists');
    return Array.isArray(artists) ? artists : [];
  } catch {
    return [];
  }
}

export async function getMakeupArtistBySlug(slug) {
  const artists = await getMakeupArtists();
  return artists.find((artist) => artist.slug === slug) || null;
}

export async function getServicesForMakeupArtist(makeupArtistId) {
  if (!makeupArtistId) return [];

  try {
    const services = await fetchJson(`/makeup-services?makeupArtistId=${makeupArtistId}`);
    return Array.isArray(services) ? services : [];
  } catch {
    return [];
  }
}

export async function getMakeupServiceCatalog() {
  try {
    const items = await fetchJson('/makeup-service-catalog');
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

export async function loginMakeupArtist(email, password) {
  return authedJson('/makeup-auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function getMeMakeupArtist() {
  try {
    return await authedJson('/makeup-auth/me');
  } catch {
    return null;
  }
}

export async function logoutMakeupArtist() {
  try {
    await authedJson('/makeup-auth/logout', { method: 'POST' });
  } catch {
    // ignore
  }
}

export async function registerMakeupArtist(payload) {
  return authedJson('/makeup-auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getMyMakeupAppointments(query = {}) {
  try {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => value !== undefined && params.set(key, value));
    const url = `/makeup-appointments${params.toString() ? `?${params.toString()}` : ''}`;
    return await authedJson(url, { method: 'GET' });
  } catch {
    return [];
  }
}

export async function getMakeupArtistCalendarAppointments(makeupArtistId) {
  if (!makeupArtistId) return [];

  try {
    return await fetchJson(`/makeup-appointments/calendar?makeupArtistId=${makeupArtistId}`);
  } catch {
    return [];
  }
}

export async function getMakeupArtistAvailability(makeupArtistId, date) {
  if (!makeupArtistId || !date) return { bookedTimes: [], available: undefined };

  try {
    return await fetchJson(`/makeup-appointments/availability?makeupArtistId=${makeupArtistId}&date=${date}`);
  } catch {
    return { bookedTimes: [], available: undefined };
  }
}

export async function updateMyMakeupAppointment(id, payload) {
  return authedJson(`/makeup-appointments/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function getMyMakeupServices() {
  try {
    return await authedJson('/makeup-services/manage');
  } catch {
    return [];
  }
}

export async function createMyMakeupService(payload) {
  return authedJson('/makeup-services', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateMyMakeupService(id, payload) {
  return authedJson(`/makeup-services/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function deleteMyMakeupService(id) {
  return authedJson(`/makeup-services/${id}`, {
    method: 'DELETE',
  });
}

export async function getMyMakeupCustomers() {
  try {
    return await authedJson('/makeup-customers');
  } catch {
    return [];
  }
}

export async function updateMyMakeupCustomer(id, payload) {
  return authedJson(`/makeup-customers/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function updateMyMakeupArtistProfile(payload) {
  return authedJson('/makeup-artists', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export { API_BASE_URL };
