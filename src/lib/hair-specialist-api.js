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

export async function getHairSpecialists() {
  try {
    const specialists = await fetchJson('/hair-specialists');
    return Array.isArray(specialists) ? specialists : [];
  } catch {
    return [];
  }
}

export async function getHairSpecialistBySlug(slug) {
  const specialists = await getHairSpecialists();
  return specialists.find((specialist) => specialist.slug === slug) || null;
}

export async function getServicesForHairSpecialist(hairSpecialistId) {
  if (!hairSpecialistId) return [];

  try {
    const services = await fetchJson(`/hair-services?hairSpecialistId=${hairSpecialistId}`);
    return Array.isArray(services) ? services : [];
  } catch {
    return [];
  }
}

export async function getHairServiceCatalog() {
  try {
    const items = await fetchJson('/hair-service-catalog');
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

export async function loginHairSpecialist(email, password) {
  return authedJson('/hair-auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function getMeHairSpecialist() {
  try {
    return await authedJson('/hair-auth/me');
  } catch {
    return null;
  }
}

export async function logoutHairSpecialist() {
  try {
    await authedJson('/hair-auth/logout', { method: 'POST' });
  } catch {
    // ignore
  }
}

export async function registerHairSpecialist(payload) {
  return authedJson('/hair-auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getMyHairAppointments(query = {}) {
  try {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => value !== undefined && params.set(key, value));
    const url = `/hair-appointments${params.toString() ? `?${params.toString()}` : ''}`;
    return await authedJson(url, { method: 'GET' });
  } catch {
    return [];
  }
}

export async function getHairSpecialistCalendarAppointments(hairSpecialistId) {
  if (!hairSpecialistId) return [];

  try {
    return await fetchJson(`/hair-appointments/calendar?hairSpecialistId=${hairSpecialistId}`);
  } catch {
    return [];
  }
}

export async function getHairSpecialistAvailability(hairSpecialistId, date) {
  if (!hairSpecialistId || !date) return { bookedTimes: [], available: undefined };

  try {
    return await fetchJson(`/hair-appointments/availability?hairSpecialistId=${hairSpecialistId}&date=${date}`);
  } catch {
    return { bookedTimes: [], available: undefined };
  }
}

export async function updateMyHairAppointment(id, payload) {
  return authedJson(`/hair-appointments/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function getMyHairServices() {
  try {
    return await authedJson('/hair-services/manage');
  } catch {
    return [];
  }
}

export async function createMyHairService(payload) {
  return authedJson('/hair-services', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateMyHairService(id, payload) {
  return authedJson(`/hair-services/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function deleteMyHairService(id) {
  return authedJson(`/hair-services/${id}`, {
    method: 'DELETE',
  });
}

export async function getMyHairCustomers() {
  try {
    return await authedJson('/hair-customers');
  } catch {
    return [];
  }
}

export async function updateMyHairCustomer(id, payload) {
  return authedJson(`/hair-customers/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function updateMyHairSpecialistProfile(payload) {
  return authedJson('/hair-specialists', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export { API_BASE_URL };
