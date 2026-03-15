export const currencyOptions = [
  { code: 'USD', label: 'US Dollar' },
  { code: 'NGN', label: 'Nigerian Naira' },
  { code: 'GHS', label: 'Ghanaian Cedi' },
  { code: 'KES', label: 'Kenyan Shilling' },
  { code: 'ZAR', label: 'South African Rand' },
  { code: 'GBP', label: 'British Pound' },
  { code: 'EUR', label: 'Euro' },
  { code: 'CAD', label: 'Canadian Dollar' },
  { code: 'AED', label: 'UAE Dirham' },
]

export const countryOptions = [
  { code: 'NG', label: 'Nigeria', currency: 'NGN' },
  { code: 'GH', label: 'Ghana', currency: 'GHS' },
  { code: 'KE', label: 'Kenya', currency: 'KES' },
  { code: 'ZA', label: 'South Africa', currency: 'ZAR' },
  { code: 'GB', label: 'United Kingdom', currency: 'GBP' },
  { code: 'US', label: 'United States', currency: 'USD' },
  { code: 'CA', label: 'Canada', currency: 'CAD' },
  { code: 'AE', label: 'United Arab Emirates', currency: 'AED' },
  { code: 'FR', label: 'France', currency: 'EUR' },
  { code: 'DE', label: 'Germany', currency: 'EUR' },
  { code: 'ES', label: 'Spain', currency: 'EUR' },
  { code: 'IT', label: 'Italy', currency: 'EUR' },
  { code: 'IE', label: 'Ireland', currency: 'EUR' },
  { code: 'NL', label: 'Netherlands', currency: 'EUR' },
  { code: 'BE', label: 'Belgium', currency: 'EUR' },
  { code: 'PT', label: 'Portugal', currency: 'EUR' },
]

const phoneFormatByCountry = {
  NG: { dialCode: '+234', example: '+234 801 234 5678', localMinDigits: 10, localMaxDigits: 10 },
  GH: { dialCode: '+233', example: '+233 24 123 4567', localMinDigits: 9, localMaxDigits: 9 },
  KE: { dialCode: '+254', example: '+254 712 345 678', localMinDigits: 9, localMaxDigits: 9 },
  ZA: { dialCode: '+27', example: '+27 82 123 4567', localMinDigits: 9, localMaxDigits: 9 },
  GB: { dialCode: '+44', example: '+44 7700 900123', localMinDigits: 10, localMaxDigits: 10 },
  US: { dialCode: '+1', example: '+1 (201) 555-0123', localMinDigits: 10, localMaxDigits: 10 },
  CA: { dialCode: '+1', example: '+1 (416) 555-0123', localMinDigits: 10, localMaxDigits: 10 },
  AE: { dialCode: '+971', example: '+971 50 123 4567', localMinDigits: 9, localMaxDigits: 9 },
  FR: { dialCode: '+33', example: '+33 6 12 34 56 78', localMinDigits: 9, localMaxDigits: 9 },
  DE: { dialCode: '+49', example: '+49 1512 3456789', localMinDigits: 10, localMaxDigits: 11 },
  ES: { dialCode: '+34', example: '+34 612 34 56 78', localMinDigits: 9, localMaxDigits: 9 },
  IT: { dialCode: '+39', example: '+39 312 345 6789', localMinDigits: 10, localMaxDigits: 10 },
  IE: { dialCode: '+353', example: '+353 85 123 4567', localMinDigits: 9, localMaxDigits: 9 },
  NL: { dialCode: '+31', example: '+31 6 12345678', localMinDigits: 9, localMaxDigits: 9 },
  BE: { dialCode: '+32', example: '+32 470 12 34 56', localMinDigits: 9, localMaxDigits: 9 },
  PT: { dialCode: '+351', example: '+351 912 345 678', localMinDigits: 9, localMaxDigits: 9 },
}

export function isSupportedCountryCode(value = '') {
  return countryOptions.some((option) => option.code === String(value || '').trim().toUpperCase())
}

export function normalizeCountryCode(value = '', fallback = 'CA') {
  const normalized = String(value || '').trim().toUpperCase()
  if (isSupportedCountryCode(normalized)) return normalized

  const fallbackCode = String(fallback || '').trim().toUpperCase()
  return isSupportedCountryCode(fallbackCode) ? fallbackCode : 'CA'
}

export function isValidCurrencyCode(value = '') {
  return currencyOptions.some((option) => option.code === String(value || '').trim().toUpperCase())
}

export function normalizeCurrencyCode(value = '', fallback = 'USD') {
  const normalized = String(value || '').trim().toUpperCase()
  if (isValidCurrencyCode(normalized)) return normalized
  return isValidCurrencyCode(fallback) ? String(fallback).toUpperCase() : 'USD'
}

export function getCurrencyLabel(currencyCode = '') {
  const option = currencyOptions.find((item) => item.code === normalizeCurrencyCode(currencyCode, ''))
  return option?.label || ''
}

export function getCurrencyForCountry(countryCode = '') {
  const option = countryOptions.find((item) => item.code === normalizeCountryCode(countryCode))
  return option?.currency || 'USD'
}

export function getCurrencyDisplayForCountry(countryCode = '') {
  const currencyCode = getCurrencyForCountry(countryCode)
  const currencyLabel = getCurrencyLabel(currencyCode)

  return currencyLabel ? `${currencyCode} · ${currencyLabel}` : currencyCode
}

export function getPhoneFormat(countryCode = '') {
  const normalized = normalizeCountryCode(countryCode, '')
  return phoneFormatByCountry[normalized] || { dialCode: '', example: '' }
}

export function getPhoneLocalExample(countryCode = '') {
  const { dialCode, example } = getPhoneFormat(countryCode)
  if (!dialCode || !example) return ''

  return example.replace(dialCode, '').trim()
}

export function getPhonePlaceholder(countryCode = '') {
  return getPhoneLocalExample(countryCode) || '801 234 5678'
}

export function getPhoneHint(countryCode = '') {
  const country = countryOptions.find((item) => item.code === normalizeCountryCode(countryCode))
  const { dialCode, example } = getPhoneFormat(countryCode)

  if (country?.label && dialCode && example) {
    return `${dialCode} is added automatically for ${country.label}. Example: ${example}.`
  }

  return 'Choose your country and enter the rest of your WhatsApp number so clients can reach you.'
}

export function buildInternationalPhoneNumber(countryCode = '', localNumber = '') {
  const { dialCode } = getPhoneFormat(countryCode)
  const localDigits = String(localNumber || '').replace(/\D/g, '').replace(/^0+/, '')
  const prefixDigits = String(dialCode || '').replace(/\D/g, '')

  return prefixDigits && localDigits ? `${prefixDigits}${localDigits}` : `${prefixDigits}${localDigits}`.trim()
}

export function buildWhatsAppUrl(value = '') {
  const phone = String(value || '').replace(/\D/g, '')
  return phone ? `https://wa.me/${phone}` : ''
}