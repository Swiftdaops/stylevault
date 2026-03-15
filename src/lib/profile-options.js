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
  NG: { dialCode: '+234', example: '+234 801 234 5678' },
  GH: { dialCode: '+233', example: '+233 24 123 4567' },
  KE: { dialCode: '+254', example: '+254 712 345 678' },
  ZA: { dialCode: '+27', example: '+27 82 123 4567' },
  GB: { dialCode: '+44', example: '+44 7700 900123' },
  US: { dialCode: '+1', example: '+1 (201) 555-0123' },
  CA: { dialCode: '+1', example: '+1 (416) 555-0123' },
  AE: { dialCode: '+971', example: '+971 50 123 4567' },
  FR: { dialCode: '+33', example: '+33 6 12 34 56 78' },
  DE: { dialCode: '+49', example: '+49 1512 3456789' },
  ES: { dialCode: '+34', example: '+34 612 34 56 78' },
  IT: { dialCode: '+39', example: '+39 312 345 6789' },
  IE: { dialCode: '+353', example: '+353 85 123 4567' },
  NL: { dialCode: '+31', example: '+31 6 12345678' },
  BE: { dialCode: '+32', example: '+32 470 12 34 56' },
  PT: { dialCode: '+351', example: '+351 912 345 678' },
}

export function isValidCurrencyCode(value = '') {
  return currencyOptions.some((option) => option.code === String(value || '').trim().toUpperCase())
}

export function normalizeCurrencyCode(value = '', fallback = 'USD') {
  const normalized = String(value || '').trim().toUpperCase()
  if (isValidCurrencyCode(normalized)) return normalized
  return isValidCurrencyCode(fallback) ? String(fallback).toUpperCase() : 'USD'
}

export function getCurrencyForCountry(countryCode = '') {
  const option = countryOptions.find((item) => item.code === String(countryCode || '').trim().toUpperCase())
  return option?.currency || 'USD'
}

export function getPhoneFormat(countryCode = '') {
  const normalized = String(countryCode || '').trim().toUpperCase()
  return phoneFormatByCountry[normalized] || { dialCode: '', example: '' }
}

export function getPhonePlaceholder(countryCode = '') {
  return getPhoneFormat(countryCode).example || 'Include country code, for example +234 801 234 5678'
}

export function getPhoneHint(countryCode = '') {
  const country = countryOptions.find((item) => item.code === String(countryCode || '').trim().toUpperCase())
  const { dialCode, example } = getPhoneFormat(countryCode)

  if (country?.label && dialCode && example) {
    return `Use ${country.label}'s WhatsApp format with country code ${dialCode}, for example ${example}.`
  }

  return 'Use your full WhatsApp number with the correct country code so clients can reach you.'
}

export function buildWhatsAppUrl(value = '') {
  const phone = String(value || '').replace(/\D/g, '')
  return phone ? `https://wa.me/${phone}` : ''
}