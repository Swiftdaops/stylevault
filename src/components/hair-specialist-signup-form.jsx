"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { checkHairSpecialistEmailAvailability, registerHairSpecialist } from '@/lib/hair-specialist-api'
import BrandNameInput from '@/components/brand-name-input'
import { Button } from '@/components/ui/button'
import PasswordInput from '@/components/password-input'
import PhoneNumberInput from '@/components/phone-number-input'
import useEmailAvailability from '@/hooks/use-email-availability'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { buildInternationalPhoneNumber, countryOptions, getCurrencyDisplayForCountry, getCurrencyForCountry, normalizeCountryCode } from '@/lib/profile-options'
import { buildBrandSuggestions, mapSignupRequestErrorToFieldErrors, slugifyBrandName, splitCommaSeparatedValues, validateProviderSignup } from '@/lib/signup-validation'

export default function HairSpecialistSignupForm({ initialCountry = 'CA' }) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [country, setCountry] = useState(normalizeCountryCode(initialCountry, 'CA'))
  const [specialties, setSpecialties] = useState('')
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [brandSuggestions, setBrandSuggestions] = useState([])
  const currency = getCurrencyForCountry(country)
  const currencyDisplay = getCurrencyDisplayForCountry(country)
  const slugPreview = slugifyBrandName(name)

  const values = { name, email, password, confirmPassword, whatsapp, country, location, specialties }
  const validationOptions = { requireLocation: true, requireSpecialties: true }

  const setFieldError = (field, message) => {
    setFieldErrors((current) => {
      const next = { ...current }
      if (message) next[field] = message
      else delete next[field]
      return next
    })
  }

  const validateField = (field, nextValues = values) => {
    const nextError = validateProviderSignup(nextValues, validationOptions)[field] || ''
    setFieldError(field, nextError)
    return !nextError
  }

  const { emailAvailability, checkEmailAvailability, resetEmailAvailability } = useEmailAvailability({
    checkAvailability: checkHairSpecialistEmailAvailability,
    setFieldError,
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setBrandSuggestions([])

    const validationErrors = validateProviderSignup(values, validationOptions)
    setFieldErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) {
      setError('Please fix the highlighted fields and try again.')
      return
    }

    const emailAvailable = await checkEmailAvailability(email)
    if (!emailAvailable) {
      setError('This email address is already registered.')
      return
    }

    setLoading(true)

    try {
      const slug = slugifyBrandName(name || email.split('@')[0] || 'hair-specialist')
      await registerHairSpecialist({
        name,
        email,
        password,
        slug,
        location,
        whatsapp: buildInternationalPhoneNumber(country, whatsapp),
        country,
        currency,
        specialties: splitCommaSeparatedValues(specialties),
      })
      router.push('/hair-specialists/admin')
    } catch (err) {
      const message = err?.message || 'Registration failed'
      const mappedErrors = mapSignupRequestErrorToFieldErrors(message)
      if (Object.keys(mappedErrors).length > 0) {
        setFieldErrors((current) => ({ ...current, ...mappedErrors }))
      }
      if ((mappedErrors.name || err?.field === 'name' || err?.field === 'slug') && name) {
        setBrandSuggestions(Array.isArray(err?.suggestions) && err.suggestions.length > 0 ? err.suggestions : buildBrandSuggestions(name))
      }
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-rose-200/70 bg-white/90 p-6 shadow-sm dark:border-stone-800 dark:bg-black/70">
      <h2 className="mb-4 text-2xl font-semibold">Hair Specialist Sign up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <BrandNameInput
          value={name}
          onChange={(e) => {
            const nextValue = e.target.value
            setName(nextValue)
            setBrandSuggestions([])
            if (fieldErrors.name) validateField('name', { ...values, name: nextValue })
          }}
          onBlur={() => validateField('name')}
          errorText={fieldErrors.name}
          suggestions={brandSuggestions}
          onSelectSuggestion={(suggestion) => {
            setName(suggestion.name)
            setBrandSuggestions([])
            setFieldError('name', '')
          }}
          label="Brand name"
          labelClassName="block text-sm font-medium text-stone-700 dark:text-rose-200"
          inputClassName="rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300 dark:border-stone-700 dark:bg-stone-900"
          previewClassName="mt-1 text-xs text-stone-500 dark:text-rose-300"
          suggestionsClassName="mt-2 flex flex-wrap gap-2"
          suggestionButtonClassName="rounded-full border border-rose-200 px-3 py-1 text-xs font-medium text-stone-700 transition hover:bg-rose-50 dark:border-stone-700 dark:text-rose-200 dark:hover:bg-stone-900"
          slugPreview={slugPreview || 'your-brand-name'}
          placeholder="e.g. Crown & Curls Studio"
        />

        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-rose-200">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => {
              const nextValue = e.target.value
              setEmail(nextValue)
              resetEmailAvailability()
              if (fieldErrors.email) validateField('email', { ...values, email: nextValue })
            }}
            onBlur={async () => {
              const isValid = validateField('email')
              if (isValid) {
                await checkEmailAvailability(email)
              }
            }}
            className="mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300 dark:border-stone-700 dark:bg-stone-900"
            aria-invalid={Boolean(fieldErrors.email)}
          />
          {fieldErrors.email ? <p className="mt-1 text-xs text-destructive">{fieldErrors.email}</p> : null}
          {!fieldErrors.email && emailAvailability.message ? <p className={`mt-1 text-xs ${emailAvailability.available ? 'text-emerald-600' : 'text-stone-500 dark:text-rose-300'}`}>{emailAvailability.message}</p> : null}
        </div>

        <PasswordInput
          label="Password"
          value={password}
          onChange={(e) => {
            const nextValue = e.target.value
            setPassword(nextValue)
            const nextValues = { ...values, password: nextValue }
            if (fieldErrors.password) validateField('password', nextValues)
            if (confirmPassword || fieldErrors.confirmPassword) validateField('confirmPassword', nextValues)
          }}
          onBlur={() => validateField('password')}
          labelClassName="block text-sm font-medium text-stone-700 dark:text-rose-200"
          inputClassName="w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300 dark:border-stone-700 dark:bg-stone-900"
          helpText="Use at least 6 characters."
          errorText={fieldErrors.password}
        />

        <PasswordInput
          label="Confirm password"
          value={confirmPassword}
          onChange={(e) => {
            const nextValue = e.target.value
            setConfirmPassword(nextValue)
            if (fieldErrors.confirmPassword) validateField('confirmPassword', { ...values, confirmPassword: nextValue })
          }}
          onBlur={() => validateField('confirmPassword')}
          labelClassName="block text-sm font-medium text-stone-700 dark:text-rose-200"
          inputClassName="w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300 dark:border-stone-700 dark:bg-stone-900"
          autoComplete="new-password"
          placeholder="Re-enter password"
          errorText={fieldErrors.confirmPassword}
        />

        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-rose-200">Country</label>
          <Select value={country} onValueChange={(nextCountry) => {
            setCountry(nextCountry)
            if (whatsapp || fieldErrors.whatsapp) {
              validateField('whatsapp', { ...values, country: nextCountry })
            }
          }}>
            <SelectTrigger className="mt-1 h-10 w-full rounded-md border border-rose-200 bg-white px-3 dark:border-stone-700 dark:bg-stone-900">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent className="bg-red-50">
              {countryOptions.map((option) => (
                <SelectItem key={option.code} value={option.code} className="bg-red-50">{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <PhoneNumberInput
          country={country}
          value={whatsapp}
          onChange={(e) => {
            const nextValue = e.target.value
            setWhatsapp(nextValue)
            if (fieldErrors.whatsapp) validateField('whatsapp', { ...values, whatsapp: nextValue })
          }}
          onBlur={() => validateField('whatsapp')}
          labelClassName="block text-sm font-medium text-stone-700 dark:text-rose-200"
          wrapperClassName="border-rose-200 dark:border-stone-700 dark:bg-stone-900"
          prefixClassName="bg-rose-50 text-stone-700 dark:border-stone-700 dark:bg-stone-950 dark:text-rose-200"
          inputClassName="bg-white focus:ring-rose-300 dark:bg-stone-900"
          hintClassName="mt-1 text-xs text-stone-500 dark:text-rose-300"
          errorText={fieldErrors.whatsapp}
        />

        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-rose-200">Currency</label>
          <input
            type="text"
            value={currencyDisplay}
            readOnly
            className="mt-1 w-full rounded-md border px-3 py-2 opacity-80 shadow-sm dark:bg-stone-900 dark:border-stone-700"
          />
          <p className="mt-1 text-xs text-stone-500 dark:text-rose-300">Currency updates automatically from the selected country.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-rose-200">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => {
              const nextValue = e.target.value
              setLocation(nextValue)
              if (fieldErrors.location) validateField('location', { ...values, location: nextValue })
            }}
            onBlur={() => validateField('location')}
            className="mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300 dark:border-stone-700 dark:bg-stone-900"
            placeholder="Lagos, Nigeria"
            aria-invalid={Boolean(fieldErrors.location)}
          />
          {fieldErrors.location ? <p className="mt-1 text-xs text-destructive">{fieldErrors.location}</p> : null}
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-rose-200">Specialties</label>
          <input
            type="text"
            value={specialties}
            onChange={(e) => {
              const nextValue = e.target.value
              setSpecialties(nextValue)
              if (fieldErrors.specialties) validateField('specialties', { ...values, specialties: nextValue })
            }}
            onBlur={() => validateField('specialties')}
            className="mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300 dark:border-stone-700 dark:bg-stone-900"
            placeholder="Wig installation, Knotless braids, Silk press"
            aria-invalid={Boolean(fieldErrors.specialties)}
          />
          {fieldErrors.specialties ? <p className="mt-1 text-xs text-destructive">{fieldErrors.specialties}</p> : null}
        </div>

        {error && <div className="text-sm text-destructive">{error}</div>}

        <div className="flex items-center justify-between gap-3">
          <div className="text-sm text-stone-600 dark:text-rose-300">Already have an account? <Link href="/hair-specialists/login" className="text-primary underline">Sign in</Link></div>
          <Button type="submit" disabled={loading}>{loading ? 'Creating…' : 'Create account'}</Button>
        </div>
      </form>
    </div>
  )
}
