export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://stylevault.store';

export function absoluteUrl(path = '/') {
  return new URL(path, SITE_URL).toString();
}

export function buildDescription(text, fallback) {
  const value = String(text || fallback || '').trim();
  return value.length > 160 ? `${value.slice(0, 157)}...` : value;
}
