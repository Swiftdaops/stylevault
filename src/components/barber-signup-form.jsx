"use client"

import Link from "next/link"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { registerBarber, slugify } from "@/lib/barber-api"
import { Button } from "@/components/ui/button"
import PasswordInput from "@/components/password-input"
import PhoneNumberInput from "@/components/phone-number-input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { countryOptions, getCurrencyForCountry } from "@/lib/profile-options"

export default function BarberSignupForm() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [country, setCountry] = useState("NG")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const currency = getCurrencyForCountry(country)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const slug = slugify(name || email.split('@')[0] || 'barber')
      await registerBarber(name, email, password, slug, whatsapp, country, currency)
      router.push('/barbers/admin')
    } catch (err) {
      setError(err?.message || 'Registration failed')
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
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300 dark:bg-stone-900 dark:border-stone-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-amber-200">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300 dark:bg-stone-900 dark:border-stone-700"
          />
        </div>

        <PasswordInput
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          labelClassName="block text-sm font-medium text-stone-700 dark:text-amber-200"
          inputClassName="w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300 dark:border-stone-700 dark:bg-stone-900"
          helpText="Use at least 6 characters."
        />

        <PasswordInput
          label="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          labelClassName="block text-sm font-medium text-stone-700 dark:text-amber-200"
          inputClassName="w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300 dark:border-stone-700 dark:bg-stone-900"
          autoComplete="new-password"
          placeholder="Re-enter password"
        />

        <PhoneNumberInput
          country={country}
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          labelClassName="block text-sm font-medium text-stone-700 dark:text-amber-200"
          inputClassName="focus:ring-orange-300 dark:border-stone-700 dark:bg-stone-900"
          hintClassName="mt-1 text-xs text-stone-500 dark:text-amber-300"
        />

        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-amber-200">Country</label>
          <Select value={country} onValueChange={setCountry}>
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

        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-amber-200">Currency</label>
          <input
            type="text"
            value={currency}
            readOnly
            className="mt-1 w-full rounded-md border px-3 py-2 opacity-80 shadow-sm dark:bg-stone-900 dark:border-stone-700"
          />
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
