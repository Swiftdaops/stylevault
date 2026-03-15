import {
  countryOptions,
  getPhoneFormat,
  normalizeCountryCode,
} from '@/lib/profile-options'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function normalizedDigits(value = '') {
  return String(value || '').replace(/\D/g, '').replace(/^0+/, '')
}

function getCountryLabel(countryCode = '') {
  return countryOptions.find((option) => option.code === normalizeCountryCode(countryCode, 'CA'))?.label || 'selected country'
}

export function splitCommaSeparatedValues(value = '') {
  return String(value || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

export function validateWhatsappNumber(countryCode = '', localNumber = '') {
  const digits = normalizedDigits(localNumber)

  if (!digits) return 'Enter your WhatsApp number.'

  const { localMinDigits = 0, localMaxDigits = 20 } = getPhoneFormat(countryCode)
  const countryLabel = getCountryLabel(countryCode)

  if (digits.length < localMinDigits || digits.length > localMaxDigits) {
    return `Enter a valid WhatsApp number for ${countryLabel}.`
  }

  return ''
}

export function validateProviderSignup(values, options = {}) {
  const errors = {}
  const {
    name = '',
    email = '',
    password = '',
    confirmPassword = '',
    whatsapp = '',
    country = 'CA',
    location = '',
    specialties = '',
  } = values || {}

  if (!String(name).trim()) errors.name = 'Enter your full name.'

  if (!String(email).trim()) errors.email = 'Enter your email address.'
  else if (!EMAIL_PATTERN.test(String(email).trim())) errors.email = 'Enter a valid email address.'

  if (!String(password)) errors.password = 'Enter a password.'
  else if (String(password).length < 6) errors.password = 'Password must be at least 6 characters.'

  if (!String(confirmPassword)) errors.confirmPassword = 'Confirm your password.'
  else if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match.'

  const whatsappError = validateWhatsappNumber(country, whatsapp)
  if (whatsappError) errors.whatsapp = whatsappError

  if (options.requireLocation && !String(location).trim()) {
    errors.location = 'Enter your location.'
  }

  if (options.requireSpecialties && splitCommaSeparatedValues(specialties).length === 0) {
    errors.specialties = 'Add at least one specialty.'
  }

  return errors
}

export function mapSignupRequestErrorToFieldErrors(message = '') {
  const normalized = String(message || '').toLowerCase()
  const errors = {}

  if (!normalized) return errors

  if (normalized.includes('email')) errors.email = message
  if (normalized.includes('password')) errors.password = message
  if (normalized.includes('confirm')) errors.confirmPassword = message
  if (normalized.includes('whatsapp') || normalized.includes('phone') || normalized.includes('number')) errors.whatsapp = message
  if (normalized.includes('location')) errors.location = message
  if (normalized.includes('special')) errors.specialties = message
  if (normalized.includes('name')) errors.name = message

  return errors
}