import { countryOptions } from '@/lib/profile-options';
import {
	absoluteUrl,
  buildDescription,
  getBarberStoreUrl,
  getHairSpecialistStoreUrl,
  getLashTechnicianStoreUrl,
  getMakeupArtistStoreUrl,
  getNailTechnicianStoreUrl,
} from '@/lib/seo';

const defaultShareImage = absoluteUrl('/opengraph-image');

const countryLabelMap = new Map(countryOptions.map((option) => [option.code, option.label]));

const dayMap = {
  Monday: 'https://schema.org/Monday',
  Tuesday: 'https://schema.org/Tuesday',
  Wednesday: 'https://schema.org/Wednesday',
  Thursday: 'https://schema.org/Thursday',
  Friday: 'https://schema.org/Friday',
  Saturday: 'https://schema.org/Saturday',
  Sunday: 'https://schema.org/Sunday',
};

const typeConfig = {
  barber: {
    businessLabel: 'barber',
    businessPlural: 'barbers',
    schemaType: 'HairSalon',
    catalogName: 'Barber Services',
    defaultDescription: 'Professional barber services available for online booking.',
    defaultKeywords: ['best barber', 'barber near me', 'book haircut online', 'fade haircut booking'],
  },
  'hair-specialist': {
    businessLabel: 'hair specialist',
    businessPlural: 'hair specialists',
    schemaType: 'BeautySalon',
    catalogName: 'Hair Services',
    defaultDescription: 'Professional hair services available for online booking.',
    defaultKeywords: ['best hair stylist', 'wig installation', 'braids near me', 'salon booking online'],
  },
  'nail-technician': {
    businessLabel: 'nail technician',
    businessPlural: 'nail technicians',
    schemaType: 'NailSalon',
    catalogName: 'Nail Services',
    defaultDescription: 'Professional nail services available for online booking.',
    defaultKeywords: ['best nail technician', 'gel nails near me', 'acrylic nail booking', 'pedicure booking online'],
  },
  'lash-technician': {
    businessLabel: 'lash technician',
    businessPlural: 'lash technicians',
    schemaType: 'BeautySalon',
    catalogName: 'Lash Services',
    defaultDescription: 'Professional lash services available for online booking.',
    defaultKeywords: ['best lash technician', 'lash extensions near me', 'hybrid lashes booking', 'volume lashes online'],
  },
  'makeup-artist': {
    businessLabel: 'makeup artist',
    businessPlural: 'makeup artists',
    schemaType: 'BeautySalon',
    catalogName: 'Makeup Services',
    defaultDescription: 'Professional makeup services available for online booking.',
    defaultKeywords: ['best makeup artist', 'bridal makeup near me', 'soft glam booking', 'book makeup online'],
  },
};

function cleanText(value = '') {
  return String(value || '').trim();
}

function compact(value) {
  if (Array.isArray(value)) {
    const next = value.map(compact).filter(Boolean);
    return next.length ? next : undefined;
  }

  if (value && typeof value === 'object') {
    const entries = Object.entries(value)
      .map(([key, nestedValue]) => [key, compact(nestedValue)])
      .filter(([, nestedValue]) => nestedValue !== undefined && nestedValue !== null && nestedValue !== '');

    return entries.length ? Object.fromEntries(entries) : undefined;
  }

  return value;
}

function dedupeStrings(values = []) {
  const seen = new Set();

  return values.filter((value) => {
    const text = cleanText(value);
    if (!text) return false;

    const key = text.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function getCountryName(countryCode = '') {
  return countryLabelMap.get(cleanText(countryCode).toUpperCase()) || '';
}

function getLocationContext(profile = {}) {
  const location = cleanText(profile.location);
  const countryCode = cleanText(profile.country).toUpperCase();
  const countryName = getCountryName(countryCode);
  const normalizedLocation = location.toLowerCase();
  const shouldAppendCountry = countryName && !normalizedLocation.includes(countryName.toLowerCase());
  const areaParts = dedupeStrings([location, shouldAppendCountry ? countryName : '']);
  const areaLabel = areaParts.join(', ');

  return {
    areaLabel,
    countryCode,
    countryName,
    location,
  };
}

function getStoreUrl(type, slug) {
  if (type === 'hair-specialist') return getHairSpecialistStoreUrl(slug);
  if (type === 'nail-technician') return getNailTechnicianStoreUrl(slug);
  if (type === 'lash-technician') return getLashTechnicianStoreUrl(slug);
  if (type === 'makeup-artist') return getMakeupArtistStoreUrl(slug);
  return getBarberStoreUrl(slug);
}

function getProfileImage(profile = {}, services = []) {
  return (
    profile.profileImage ||
    services.find((service) => service?.sampleImage || service?.catalogId?.image)?.sampleImage ||
    services.find((service) => service?.sampleImage || service?.catalogId?.image)?.catalogId?.image ||
    defaultShareImage
  );
}

function getServiceNames(services = [], limit = 4) {
  return dedupeStrings(services.map((service) => service?.name).filter(Boolean)).slice(0, limit);
}

function getSpecialties(profile = [], type) {
  if (type !== 'hair-specialist' && type !== 'nail-technician' && type !== 'lash-technician' && type !== 'makeup-artist') return [];
  return dedupeStrings(profile?.specialties || []);
}

function getPhoneNumber(profile = {}) {
  const raw = profile.whatsapp || profile.phone || profile.contactPhone || '';
  const digits = String(raw).replace(/\D/g, '');
  return digits ? `+${digits}` : undefined;
}

function toMajorAmount(value) {
  const amount = Number(value);
  if (!Number.isFinite(amount)) return undefined;
  return amount / 100;
}

function formatCurrencyAmount(value, currency = 'USD') {
  if (!Number.isFinite(value)) return undefined;

  try {
    return new Intl.NumberFormat('en', {
      style: 'currency',
      currency,
      maximumFractionDigits: value % 1 === 0 ? 0 : 2,
    }).format(value);
  } catch {
    return `${currency} ${value}`;
  }
}

function buildPriceRange(services = [], currency = 'USD') {
  const prices = services
    .map((service) => toMajorAmount(service?.price ?? service?.amount ?? service?.basePrice))
    .filter((price) => Number.isFinite(price));

  if (!prices.length) return undefined;

  const min = Math.min(...prices);
  const max = Math.max(...prices);
  if (min === max) return formatCurrencyAmount(min, currency);

  return `${formatCurrencyAmount(min, currency)} - ${formatCurrencyAmount(max, currency)}`;
}

function buildOpeningHours(workingHours = {}) {
  return compact(
    Object.entries(workingHours || {}).map(([day, hours]) => {
      if (!Array.isArray(hours) || hours.length < 2) return undefined;

      const opens = cleanText(hours[0]);
      const closes = cleanText(hours[hours.length - 1]);
      if (!opens || !closes || !dayMap[day]) return undefined;

      return {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: dayMap[day],
        opens,
        closes,
      };
    })
  );
}

function buildKeywords({ type, name, areaLabel, countryName, serviceNames, specialties }) {
  const config = typeConfig[type] || typeConfig.barber;
  const locationKeywords = [
    areaLabel ? `best ${config.businessLabel} in ${areaLabel}` : '',
    countryName ? `best ${config.businessLabel} in ${countryName}` : '',
    areaLabel ? `${config.businessLabel} near ${areaLabel}` : '',
    countryName ? `${config.businessPlural} in ${countryName}` : '',
    areaLabel ? `book ${config.businessLabel} in ${areaLabel}` : '',
  ];

  const serviceKeywords = serviceNames.flatMap((serviceName) => [
    serviceName,
    areaLabel ? `${serviceName} in ${areaLabel}` : '',
    countryName ? `${serviceName} in ${countryName}` : '',
  ]);

  return dedupeStrings([
    `${name} ${config.businessLabel}`,
    ...config.defaultKeywords,
    ...locationKeywords,
    ...serviceKeywords,
    ...specialties,
    'StyleVault',
  ]).slice(0, 18);
}

export function buildTenantMetadata({ type = 'barber', profile = {}, services = [] } = {}) {
  const config = typeConfig[type] || typeConfig.barber;
  const name = cleanText(profile.name) || 'StyleVault Professional';
  const { areaLabel, countryCode, countryName, location } = getLocationContext(profile);
  const image = getProfileImage(profile, services);
  const storeUrl = getStoreUrl(type, profile.slug);
  const serviceNames = getServiceNames(services);
  const specialties = getSpecialties(profile, type);
  const placeSuffix = areaLabel ? ` in ${areaLabel}` : countryName ? ` in ${countryName}` : '';
  const serviceSnippet = dedupeStrings([...serviceNames, ...specialties]).slice(0, 3).join(', ');
  const description = buildDescription(
    profile.bio,
    `${name} is a ${config.businessLabel}${placeSuffix}. Browse ${serviceSnippet || config.defaultDescription.toLowerCase()} with live availability, pricing, and direct online booking on StyleVault.`
  );
  const title = `${name} | Best ${config.businessLabel}${placeSuffix} | Book Online | StyleVault`;
  const keywords = buildKeywords({ type, name, areaLabel, countryName, serviceNames, specialties });

  return compact({
    title,
    description,
    keywords,
    category: type === 'barber' ? 'Barbering' : 'Beauty',
    alternates: {
      canonical: storeUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      type: 'website',
      title,
      description,
      url: storeUrl,
      siteName: 'StyleVault',
      images: image
        ? [
            {
              url: image,
              alt: `${name}${placeSuffix ? placeSuffix : ''}`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description,
      images: image ? [image] : undefined,
    },
    other: {
      'geo.region': countryCode || undefined,
      'geo.placename': areaLabel || location || countryName || undefined,
      'business:contact_data:locality': location || undefined,
      'business:contact_data:country_name': countryName || undefined,
    },
  });
}

export function buildTenantStructuredData({ type = 'barber', profile = {}, services = [] } = {}) {
  const config = typeConfig[type] || typeConfig.barber;
  const { areaLabel, countryCode, countryName, location } = getLocationContext(profile);
  const image = getProfileImage(profile, services);
  const serviceNames = getServiceNames(services, 8);
  const specialties = getSpecialties(profile, type);
  const priceRange = buildPriceRange(services, profile.currency || 'USD');
  const sameAs = dedupeStrings(Object.values(profile.socialLinks || {}));
  const openingHours = buildOpeningHours(profile.workingHours);
  const url = getStoreUrl(type, profile.slug);
  const offers = compact(
    services.slice(0, 10).map((service) => {
      const price = toMajorAmount(service?.price ?? service?.amount ?? service?.basePrice);

      return {
        '@type': 'Offer',
        price: Number.isFinite(price) ? String(price) : undefined,
        priceCurrency: profile.currency || 'USD',
        availability: 'https://schema.org/InStock',
        itemOffered: {
          '@type': 'Service',
          name: service?.name,
          description: service?.description || config.defaultDescription,
        },
      };
    })
  );

  return compact({
    '@context': 'https://schema.org',
    '@type': config.schemaType,
    '@id': url,
    url,
    name: cleanText(profile.name),
    description: buildDescription(profile.bio, config.defaultDescription),
    image,
    telephone: getPhoneNumber(profile),
    priceRange,
    address: {
      '@type': 'PostalAddress',
      addressLocality: location || areaLabel || undefined,
      addressCountry: countryCode || countryName || undefined,
    },
    areaServed: areaLabel || countryName || undefined,
    openingHoursSpecification: openingHours,
    sameAs,
    currenciesAccepted: profile.currency || undefined,
    knowsAbout: dedupeStrings([...specialties, ...serviceNames]),
    hasOfferCatalog: offers
      ? {
          '@type': 'OfferCatalog',
          name: config.catalogName,
          itemListElement: offers,
        }
      : undefined,
  });
}