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

export async function getLashTechnicians() {
  try {
    const technicians = await fetchJson('/lash-technicians');
    return Array.isArray(technicians) ? technicians : [];
  } catch {
    return [];
  }
}

export async function getLashTechnicianBySlug(slug) {
  const technicians = await getLashTechnicians();
  return technicians.find((technician) => technician.slug === slug) || null;
}

export async function getServicesForLashTechnician(lashTechnicianId) {
  if (!lashTechnicianId) return [];

  try {
    const services = await fetchJson(`/lash-services?lashTechnicianId=${lashTechnicianId}`);
    return Array.isArray(services) ? services : [];
  } catch {
    return [];
  }
}

export async function getLashServiceCatalog() {
  try {
    const items = await fetchJson('/lash-service-catalog');
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

export async function loginLashTechnician(email, password) {
  return authedJson('/lash-auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function getMeLashTechnician() {
  try {
    return await authedJson('/lash-auth/me');
  } catch {
    return null;
  }
}

export async function logoutLashTechnician() {
  try {
    await authedJson('/lash-auth/logout', { method: 'POST' });
  } catch {
    // ignore
  }
}

export async function registerLashTechnician(payload) {
  return authedJson('/lash-auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getMyLashAppointments(query = {}) {
  try {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => value !== undefined && params.set(key, value));
    const url = `/lash-appointments${params.toString() ? `?${params.toString()}` : ''}`;
    return await authedJson(url, { method: 'GET' });
  } catch {
    return [];
  }
}

export async function getLashTechnicianCalendarAppointments(lashTechnicianId) {
  if (!lashTechnicianId) return [];

  try {
    return await fetchJson(`/lash-appointments/calendar?lashTechnicianId=${lashTechnicianId}`);
  } catch {
    return [];
  }
}

export async function getLashTechnicianAvailability(lashTechnicianId, date) {
  if (!lashTechnicianId || !date) return { bookedTimes: [], available: undefined };

  try {
    return await fetchJson(`/lash-appointments/availability?lashTechnicianId=${lashTechnicianId}&date=${date}`);
  } catch {
    return { bookedTimes: [], available: undefined };
  }
}

export async function updateMyLashAppointment(id, payload) {
  return authedJson(`/lash-appointments/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function getMyLashServices() {
  try {
    return await authedJson('/lash-services/manage');
  } catch {
    return [];
  }
}

export async function createMyLashService(payload) {
  return authedJson('/lash-services', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateMyLashService(id, payload) {
  return authedJson(`/lash-services/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function deleteMyLashService(id) {
  return authedJson(`/lash-services/${id}`, {
    method: 'DELETE',
  });
}

export async function getMyLashCustomers() {
  try {
    return await authedJson('/lash-customers');
  } catch {
    return [];
  }
}

export async function updateMyLashCustomer(id, payload) {
  return authedJson(`/lash-customers/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function updateMyLashTechnicianProfile(payload) {
  return authedJson('/lash-technicians', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export { API_BASE_URL };
