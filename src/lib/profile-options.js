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

export function buildWhatsAppUrl(value = '') {
  const phone = String(value || '').replace(/\D/g, '')
  return phone ? `https://wa.me/${phone}` : ''
}