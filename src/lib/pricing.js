const euroCountries = new Set(['AT', 'BE', 'CY', 'EE', 'FI', 'FR', 'DE', 'GR', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PT', 'SK', 'SI', 'ES', 'AD', 'MC', 'SM', 'VA'])

const explicitCountryCurrency = {
  NG: 'NGN',
  GH: 'GHS',
  KE: 'KES',
  ZA: 'ZAR',
  GB: 'GBP',
  US: 'USD',
  CA: 'CAD',
  AE: 'AED',
  AU: 'AUD',
  NZ: 'NZD',
  JP: 'JPY',
  IN: 'INR',
  CN: 'CNY',
  CH: 'CHF',
  LI: 'CHF',
  SE: 'SEK',
  NO: 'NOK',
  DK: 'DKK',
  BR: 'BRL',
  MX: 'MXN',
  SG: 'SGD',
  HK: 'HKD',
  SA: 'SAR',
  QA: 'QAR',
  KW: 'KWD',
  EG: 'EGP',
  TR: 'TRY',
  PL: 'PLN',
  CZ: 'CZK',
  HU: 'HUF',
  RO: 'RON',
  IL: 'ILS',
  MY: 'MYR',
  TH: 'THB',
  ID: 'IDR',
  PH: 'PHP',
  PK: 'PKR',
  BD: 'BDT',
  CL: 'CLP',
  CO: 'COP',
  PE: 'PEN',
}

const USD_BASE_PRICING = {
  monthly: 30,
  yearly: 100,
}

const NGN_FIXED_PRICING = {
  monthly: 30000,
  yearly: 100000,
}

const currencyRateFromUsd = {
  USD: 1,
  CAD: 1.35,
  GBP: 0.79,
  EUR: 0.92,
  AED: 3.67,
  AUD: 1.53,
  NZD: 1.66,
  GHS: 15.5,
  KES: 129,
  ZAR: 18.2,
  NGN: 1000,
  JPY: 149,
  INR: 83,
  CNY: 7.2,
  CHF: 0.88,
  SEK: 10.4,
  NOK: 10.8,
  DKK: 6.9,
  BRL: 4.97,
  MXN: 16.8,
  SGD: 1.34,
  HKD: 7.8,
  SAR: 3.75,
  QAR: 3.64,
  KWD: 0.31,
  EGP: 50,
  TRY: 36,
  PLN: 3.95,
  CZK: 23.2,
  HUF: 362,
  RON: 4.58,
  ILS: 3.67,
  MYR: 4.47,
  THB: 33.5,
  IDR: 15600,
  PHP: 56,
  PKR: 279,
  BDT: 117,
  CLP: 960,
  COP: 3950,
  PEN: 3.72,
}

const currencyRounding = {
  USD: 1,
  CAD: 1,
  GBP: 1,
  EUR: 1,
  AED: 5,
  AUD: 1,
  NZD: 1,
  GHS: 5,
  KES: 50,
  ZAR: 10,
  NGN: 500,
  JPY: 100,
  INR: 10,
  CNY: 5,
  CHF: 1,
  SEK: 5,
  NOK: 5,
  DKK: 5,
  BRL: 5,
  MXN: 10,
  SGD: 1,
  HKD: 10,
  SAR: 5,
  QAR: 5,
  KWD: 1,
  EGP: 50,
  TRY: 10,
  PLN: 5,
  CZK: 10,
  HUF: 100,
  RON: 5,
  ILS: 5,
  MYR: 5,
  THB: 10,
  IDR: 1000,
  PHP: 5,
  PKR: 50,
  BDT: 50,
  CLP: 100,
  COP: 500,
  PEN: 1,
}

const localeByCountry = {
  NG: 'en-NG',
  GH: 'en-GH',
  KE: 'en-KE',
  ZA: 'en-ZA',
  GB: 'en-GB',
  US: 'en-US',
  CA: 'en-CA',
  AE: 'en-AE',
  FR: 'fr-FR',
  DE: 'de-DE',
  ES: 'es-ES',
  IT: 'it-IT',
  IE: 'en-IE',
  NL: 'nl-NL',
  BE: 'nl-BE',
  PT: 'pt-PT',
  AU: 'en-AU',
  NZ: 'en-NZ',
  JP: 'ja-JP',
  IN: 'en-IN',
  CN: 'zh-CN',
  CH: 'de-CH',
  SE: 'sv-SE',
  NO: 'nb-NO',
  DK: 'da-DK',
  BR: 'pt-BR',
  MX: 'es-MX',
  SG: 'en-SG',
  HK: 'zh-HK',
  SA: 'ar-SA',
  QA: 'ar-QA',
  KW: 'ar-KW',
  EG: 'ar-EG',
  TR: 'tr-TR',
  PL: 'pl-PL',
  CZ: 'cs-CZ',
  HU: 'hu-HU',
  RO: 'ro-RO',
  IL: 'he-IL',
  MY: 'ms-MY',
  TH: 'th-TH',
  ID: 'id-ID',
  PH: 'en-PH',
  PK: 'en-PK',
  BD: 'bn-BD',
  CL: 'es-CL',
  CO: 'es-CO',
  PE: 'es-PE',
}

function normalizePricingCountryCode(value = 'US') {
  const normalized = String(value || 'US').trim().toUpperCase()
  return /^[A-Z]{2}$/.test(normalized) ? normalized : 'US'
}

function getPricingCurrencyForCountry(countryCode = 'US') {
  const normalizedCountry = normalizePricingCountryCode(countryCode)

  if (euroCountries.has(normalizedCountry)) {
    return 'EUR'
  }

  return explicitCountryCurrency[normalizedCountry] || 'USD'
}

function getCountryLabel(countryCode = 'US') {
  try {
    const displayNames = new Intl.DisplayNames(['en'], { type: 'region' })
    return displayNames.of(countryCode) || 'United States'
  } catch {
    return 'United States'
  }
}

function roundEquivalentPrice(amount, currency) {
  const roundingUnit = currencyRounding[currency] || 1
  return Math.max(roundingUnit, Math.round(amount / roundingUnit) * roundingUnit)
}

export function formatPricingAmount(amount, currency = 'USD', countryCode = 'US') {
  const locale = localeByCountry[countryCode] || 'en-US'

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function getLocalizedPricing(countryCode = 'US') {
  const normalizedCountry = normalizePricingCountryCode(countryCode)
  const currency = getPricingCurrencyForCountry(normalizedCountry)
  const rate = currencyRateFromUsd[currency] || 1

  const monthlyAmount = currency === 'NGN'
    ? NGN_FIXED_PRICING.monthly
    : roundEquivalentPrice(USD_BASE_PRICING.monthly * rate, currency)

  const yearlyAmount = currency === 'NGN'
    ? NGN_FIXED_PRICING.yearly
    : roundEquivalentPrice(USD_BASE_PRICING.yearly * rate, currency)

  const monthlyDisplay = formatPricingAmount(monthlyAmount, currency, normalizedCountry)
  const yearlyDisplay = formatPricingAmount(yearlyAmount, currency, normalizedCountry)
  const yearlySavingsAmount = Math.max((monthlyAmount * 12) - yearlyAmount, 0)
  const yearlySavingsDisplay = formatPricingAmount(yearlySavingsAmount, currency, normalizedCountry)

  return {
    countryCode: normalizedCountry,
    countryLabel: getCountryLabel(normalizedCountry),
    currency,
    currencyLabel: currency,
    monthlyAmount,
    yearlyAmount,
    monthlyDisplay,
    yearlyDisplay,
    yearlySavingsAmount,
    yearlySavingsDisplay,
  }
}
