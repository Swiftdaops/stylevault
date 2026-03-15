"use client"

import Link from "next/link"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { registerBarber, slugify } from "@/lib/barber-api"
import { Button } from "@/components/ui/button"
import PasswordInput from "@/components/password-input"
import PhoneNumberInput from "@/components/phone-number-input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { buildInternationalPhoneNumber, countryOptions, getCurrencyDisplayForCountry, getCurrencyForCountry, normalizeCountryCode } from "@/lib/profile-options"
import { mapSignupRequestErrorToFieldErrors, validateProviderSignup } from "@/lib/signup-validation"

export default function BarberSignupForm({ initialCountry = 'CA' }) {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [country, setCountry] = useState(normalizeCountryCode(initialCountry, 'CA'))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState({})
  const currency = getCurrencyForCountry(country)
  const currencyDisplay = getCurrencyDisplayForCountry(country)

  const values = { name, email, password, confirmPassword, whatsapp, country }

  const setFieldError = (field, message) => {
    setFieldErrors((current) => {
      const next = { ...current }
      if (message) next[field] = message
      else delete next[field]
      return next
    })
  }

  const validateField = (field, nextValues = values) => {
    const nextError = validateProviderSignup(nextValues)[field] || ''
    setFieldError(field, nextError)
    return !nextError
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    const validationErrors = validateProviderSignup(values)
    setFieldErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) {
      setError('Please fix the highlighted fields and try again.')
      return
    }

    setLoading(true)

    try {
      const slug = slugify(name || email.split('@')[0] || 'barber')
      await registerBarber(name, email, password, slug, buildInternationalPhoneNumber(country, whatsapp), country, currency)
      router.push('/barbers/admin')
    } catch (err) {
      const message = err?.message || 'Registration failed'
      const mappedErrors = mapSignupRequestErrorToFieldErrors(message)
      if (Object.keys(mappedErrors).length > 0) {
        setFieldErrors((current) => ({ ...current, ...mappedErrors }))
      }
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-lg border border-orange-200/60 bg-white/80 p-6 shadow-sm dark:border-stone-800 dark:bg-black/70">
      <h2 className="mb-4 text-2xl font-semibold">Barber Sign up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-amber-200">Full name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => {
              const nextValue = e.target.value
              setName(nextValue)
              if (fieldErrors.name) validateField('name', { ...values, name: nextValue })
            }}
            onBlur={() => validateField('name')}
            className="mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300 dark:bg-stone-900 dark:border-stone-700"
            aria-invalid={Boolean(fieldErrors.name)}
          />
          {fieldErrors.name ? <p className="mt-1 text-xs text-destructive">{fieldErrors.name}</p> : null}
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-amber-200">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => {
              const nextValue = e.target.value
              setEmail(nextValue)
              if (fieldErrors.email) validateField('email', { ...values, email: nextValue })
            }}
            onBlur={() => validateField('email')}
            className="mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300 dark:bg-stone-900 dark:border-stone-700"
            aria-invalid={Boolean(fieldErrors.email)}
          />
          {fieldErrors.email ? <p className="mt-1 text-xs text-destructive">{fieldErrors.email}</p> : null}
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
          labelClassName="block text-sm font-medium text-stone-700 dark:text-amber-200"
          inputClassName="w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300 dark:border-stone-700 dark:bg-stone-900"
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
          labelClassName="block text-sm font-medium text-stone-700 dark:text-amber-200"
          inputClassName="w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300 dark:border-stone-700 dark:bg-stone-900"
          autoComplete="new-password"
          placeholder="Re-enter password"
          errorText={fieldErrors.confirmPassword}
        />

        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-amber-200">Country</label>
          <Select value={country} onValueChange={(nextCountry) => {
            setCountry(nextCountry)
            if (whatsapp || fieldErrors.whatsapp) {
              validateField('whatsapp', { ...values, country: nextCountry })
            }
          }}>
            <SelectTrigger className="mt-1 h-10 w-full rounded-md border border-orange-200 bg-white px-3 dark:border-stone-700 dark:bg-stone-900">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent className="bg-orange-50">
              {countryOptions.map((option) => (
                <SelectItem key={option.code} value={option.code} className="bg-orange-50">{option.label}</SelectItem>
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
          labelClassName="block text-sm font-medium text-stone-700 dark:text-amber-200"
          wrapperClassName="border-orange-200 dark:border-stone-700 dark:bg-stone-900"
          prefixClassName="bg-orange-50 text-stone-700 dark:border-stone-700 dark:bg-stone-950 dark:text-amber-200"
          inputClassName="bg-white focus:ring-orange-300 dark:bg-stone-900"
          hintClassName="mt-1 text-xs text-stone-500 dark:text-amber-300"
          errorText={fieldErrors.whatsapp}
        />

        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-amber-200">Currency</label>
          <input
            type="text"
            value={currencyDisplay}
            readOnly
            className="mt-1 w-full rounded-md border px-3 py-2 opacity-80 shadow-sm dark:bg-stone-900 dark:border-stone-700"
          />
          <p className="mt-1 text-xs text-stone-500 dark:text-amber-300">Currency updates automatically from the selected country.</p>
        </div>

        {error && <div className="text-sm text-destructive">{error}</div>}

        <div className="flex items-center justify-between">
          <div className="text-sm text-stone-600 dark:text-amber-300">Already have an account? <Link href="/barbers/login" className="text-primary underline">Sign in</Link></div>
          <Button type="submit" disabled={loading}>{loading ? 'Creating…' : 'Create account'}</Button>
        </div>
      </form>
    </div>
  )
}
