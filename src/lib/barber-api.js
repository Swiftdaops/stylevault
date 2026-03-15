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

export async function getBarbers() {
  try {
    const barbers = await fetchJson('/barbers');
    return Array.isArray(barbers) ? barbers : [];
  } catch {
    return [];
  }
}

export async function getBarberBySlug(slug) {
  const barbers = await getBarbers();
  return barbers.find((barber) => barber.slug === slug) || null;
}

export async function getServicesForBarber(barberId) {
  if (!barberId) return [];

  try {
    const services = await fetchJson(`/services?barberId=${barberId}`);
    return Array.isArray(services) ? services : [];
  } catch {
    return [];
  }
}

export async function getServiceCatalog() {
  try {
    const items = await fetchJson('/service-catalog');
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

export async function loginBarber(email, password) {
  return authedJson('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function getMe() {
  try {
    return await authedJson('/auth/me');
  } catch {
    return null;
  }
}

export async function logoutBarber() {
  try {
    await authedJson('/auth/logout', { method: 'POST' });
  } catch (e) {
    // ignore
  }
}

export async function registerBarber(name, email, password, slug, whatsapp, country, currency) {
  return authedJson('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, slug, whatsapp, country, currency }),
  });
}

export { API_BASE_URL };

export async function getMyAppointments(query = {}) {
  try {
    const base = API_BASE_URL || '/api';
    const params = new URLSearchParams();
    Object.entries(query).forEach(([k, v]) => v !== undefined && params.set(k, v));
    const url = `${base}/appointments${params.toString() ? `?${params.toString()}` : ''}`;

    const res = await fetch(url, {
      credentials: 'include',
      cache: 'no-store',
    });

    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function getBarberCalendarAppointments(barberId) {
  if (!barberId) return [];

  try {
    return await fetchJson(`/appointments/calendar?barberId=${barberId}`);
  } catch {
    return [];
  }
}

export async function getBarberAvailability(barberId, date) {
  if (!barberId || !date) return { bookedTimes: [], available: undefined };

  try {
    return await fetchJson(`/appointments/availability?barberId=${barberId}&date=${date}`);
  } catch {
    return { bookedTimes: [], available: undefined };
  }
}

export async function updateMyAppointment(id, payload) {
  return authedJson(`/appointments/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function getMyServices() {
  try {
    return await authedJson('/services/manage');
  } catch {
    return [];
  }
}

export async function createMyService(payload) {
  return authedJson('/services', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateMyService(id, payload) {
  return authedJson(`/services/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function deleteMyService(id) {
  return authedJson(`/services/${id}`, {
    method: 'DELETE',
  });
}

export async function getMyCustomers() {
  try {
    return await authedJson('/customers');
  } catch {
    return [];
  }
}

export async function updateMyCustomer(id, payload) {
  return authedJson(`/customers/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function updateMyBarberProfile(payload) {
  return authedJson('/barbers', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}