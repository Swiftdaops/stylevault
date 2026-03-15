import { API_BASE_URL } from '@/lib/api-base';

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

export async function getNailTechnicians() {
  try {
    const technicians = await fetchJson('/nail-technicians');
    return Array.isArray(technicians) ? technicians : [];
  } catch {
    return [];
  }
}

export async function getNailTechnicianBySlug(slug) {
  const technicians = await getNailTechnicians();
  return technicians.find((technician) => technician.slug === slug) || null;
}

export async function getServicesForNailTechnician(nailTechnicianId) {
  if (!nailTechnicianId) return [];

  try {
    const services = await fetchJson(`/nail-services?nailTechnicianId=${nailTechnicianId}`);
    return Array.isArray(services) ? services : [];
  } catch {
    return [];
  }
}

export async function getNailServiceCatalog() {
  try {
    const items = await fetchJson('/nail-service-catalog');
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

export async function loginNailTechnician(email, password) {
  return authedJson('/nail-auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function getMeNailTechnician() {
  try {
    return await authedJson('/nail-auth/me');
  } catch {
    return null;
  }
}

export async function logoutNailTechnician() {
  try {
    await authedJson('/nail-auth/logout', { method: 'POST' });
  } catch {
    // ignore
  }
}

export async function registerNailTechnician(payload) {
  return authedJson('/nail-auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getMyNailAppointments(query = {}) {
  try {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => value !== undefined && params.set(key, value));
    const url = `/nail-appointments${params.toString() ? `?${params.toString()}` : ''}`;
    return await authedJson(url, { method: 'GET' });
  } catch {
    return [];
  }
}

export async function getNailTechnicianCalendarAppointments(nailTechnicianId) {
  if (!nailTechnicianId) return [];

  try {
    return await fetchJson(`/nail-appointments/calendar?nailTechnicianId=${nailTechnicianId}`);
  } catch {
    return [];
  }
}

export async function getNailTechnicianAvailability(nailTechnicianId, date) {
  if (!nailTechnicianId || !date) return { bookedTimes: [], available: undefined };

  try {
    return await fetchJson(`/nail-appointments/availability?nailTechnicianId=${nailTechnicianId}&date=${date}`);
  } catch {
    return { bookedTimes: [], available: undefined };
  }
}

export async function updateMyNailAppointment(id, payload) {
  return authedJson(`/nail-appointments/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function getMyNailServices() {
  try {
    return await authedJson('/nail-services/manage');
  } catch {
    return [];
  }
}

export async function createMyNailService(payload) {
  return authedJson('/nail-services', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateMyNailService(id, payload) {
  return authedJson(`/nail-services/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function deleteMyNailService(id) {
  return authedJson(`/nail-services/${id}`, {
    method: 'DELETE',
  });
}

export async function getMyNailCustomers() {
  try {
    return await authedJson('/nail-customers');
  } catch {
    return [];
  }
}

export async function updateMyNailCustomer(id, payload) {
  return authedJson(`/nail-customers/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function updateMyNailTechnicianProfile(payload) {
  return authedJson('/nail-technicians', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export { API_BASE_URL };
