import { API_BASE_URL } from '@/lib/api-base';

const STORAGE_KEY = 'stylevault:push-device-token';

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

export const getStoredPushDeviceToken = () => {
  if (typeof window === 'undefined') return '';
  return window.localStorage.getItem(STORAGE_KEY) || '';
};

export const setStoredPushDeviceToken = (token) => {
  if (typeof window === 'undefined') return;

  if (token) {
    window.localStorage.setItem(STORAGE_KEY, token);
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
};

export const registerPushDeviceToken = async (token) => {
  if (!token) return null;

  const result = await authedJson('/notifications/device-token', {
    method: 'POST',
    body: JSON.stringify({ token }),
  });

  setStoredPushDeviceToken(token);
  return result;
};

export const unregisterPushDeviceToken = async (token = getStoredPushDeviceToken()) => {
  if (!token) return null;

  try {
    const result = await authedJson('/notifications/device-token', {
      method: 'DELETE',
      body: JSON.stringify({ token }),
    });

    setStoredPushDeviceToken('');
    return result;
  } catch (error) {
    setStoredPushDeviceToken('');
    throw error;
  }
};
