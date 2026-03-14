export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://stylevault.site';
export const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || new URL(SITE_URL).hostname.replace(/^www\./, '');

const RESERVED_SUBDOMAINS = new Set(['www']);

function normalizePath(path = '/') {
  return path.startsWith('/') ? path : `/${path}`;
}

function normalizeHost(host = '') {
  return String(host || '').trim().toLowerCase().split(':')[0];
}

function buildQueryString(query = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    searchParams.set(key, String(value));
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

function buildTenantFallbackPath(baseSegment, slug, path = '/', query = {}) {
  const pathname = normalizePath(path);
  const basePath = pathname === '/' ? `/${baseSegment}/${slug}` : `/${baseSegment}/${slug}${pathname}`;
  return `${basePath}${buildQueryString(query)}`;
}

function buildTenantSubdomainUrl(slug, path = '/', query = {}) {
  const siteUrl = new URL(SITE_URL);
  const host = `${slug}.${ROOT_DOMAIN}${siteUrl.port ? `:${siteUrl.port}` : ''}`;
  const url = new URL(normalizePath(path), `${siteUrl.protocol}//${host}`);

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    url.searchParams.set(key, String(value));
  });

  return url.toString();
}

function buildMarketplacePath(baseSegment, slug, path = '/', query = {}) {
  if (!slug) return `/${baseSegment}`;

  const pathname = normalizePath(path);
  const basePath = pathname === '/' ? `/${baseSegment}/${slug}` : `/${baseSegment}/${slug}${pathname}`;
  return `${basePath}${buildQueryString(query)}`;
}

export function absoluteUrl(path = '/') {
  return new URL(path, SITE_URL).toString();
}

export function extractTenantSlugFromHost(host = '') {
  const hostname = normalizeHost(host);
  if (!hostname || hostname === ROOT_DOMAIN || RESERVED_SUBDOMAINS.has(hostname)) {
    return null;
  }

  const rootDomainSuffix = `.${ROOT_DOMAIN}`;
  if (hostname.endsWith(rootDomainSuffix)) {
    const subdomain = hostname.slice(0, -rootDomainSuffix.length);
    if (!subdomain || subdomain.includes('.') || RESERVED_SUBDOMAINS.has(subdomain)) {
      return null;
    }
    return subdomain;
  }

  if (hostname.endsWith('.localhost')) {
    const subdomain = hostname.slice(0, -'.localhost'.length);
    if (!subdomain || subdomain.includes('.') || RESERVED_SUBDOMAINS.has(subdomain)) {
      return null;
    }
    return subdomain;
  }

  return null;
}

export function isTenantBrowserHost() {
  if (typeof window === 'undefined') return false;
  return Boolean(extractTenantSlugFromHost(window.location.host));
}

export function getBarberStoreUrl(slug) {
  if (!slug) return '/barbers';

  if (process.env.NODE_ENV !== 'production') {
    return buildTenantFallbackPath('barbers', slug);
  }

  return buildTenantSubdomainUrl(slug);
}

export function getBarberBookingUrl(slug, query = {}) {
  if (!slug) return '/book';

  if (process.env.NODE_ENV !== 'production') {
    return buildTenantFallbackPath('barbers', slug, '/book', query);
  }

  return buildTenantSubdomainUrl(slug, '/book', query);
}

export function getHairSpecialistStoreUrl(slug) {
  if (!slug) return '/hair-specialists';

  if (process.env.NODE_ENV !== 'production') {
    return buildTenantFallbackPath('hair-specialists', slug);
  }

  return buildTenantSubdomainUrl(slug);
}

export function getHairSpecialistBookingUrl(slug, query = {}) {
  if (!slug) return '/book';

  if (process.env.NODE_ENV !== 'production') {
    return buildTenantFallbackPath('hair-specialists', slug, '/book', query);
  }

  return buildTenantSubdomainUrl(slug, '/book', query);
}

export function buildDescription(text, fallback) {
  const value = String(text || fallback || '').trim();
  return value.length > 160 ? `${value.slice(0, 157)}...` : value;
}
