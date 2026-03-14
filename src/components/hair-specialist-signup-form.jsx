"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { registerHairSpecialist, slugify } from '@/lib/hair-specialist-api'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { countryOptions, getCurrencyForCountry } from '@/lib/profile-options'

export default function HairSpecialistSignupForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [country, setCountry] = useState('NG')
  const [specialties, setSpecialties] = useState('')
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const currency = getCurrencyForCountry(country)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const slug = slugify(name || email.split('@')[0] || 'hair-specialist')
      await registerHairSpecialist({
        name,
        email,
        password,
        slug,
        location,
        whatsapp,
        country,
        currency,
        specialties: specialties.split(',').map((item) => item.trim()).filter(Boolean),
      })
      router.push('/hair-specialists/admin')
    } catch (err) {
      setError(err?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-rose-200/70 bg-white/90 p-6 shadow-sm dark:border-stone-800 dark:bg-black/70">
      <h2 className="mb-4 text-2xl font-semibold">Hair Specialist Sign up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-rose-200">Full name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300 dark:border-stone-700 dark:bg-stone-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-rose-200">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300 dark:border-stone-700 dark:bg-stone-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-rose-200">Password</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300 dark:border-stone-700 dark:bg-stone-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-rose-200">WhatsApp number</label>
          <input
            type="tel"
            required
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className="mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300 dark:border-stone-700 dark:bg-stone-900"
            placeholder="2348012345678"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-rose-200">Country</label>
          <Select value={country} onValueChange={setCountry}>
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

        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-rose-200">Currency</label>
          <input
            type="text"
            value={currency}
            readOnly
            className="mt-1 w-full rounded-md border px-3 py-2 opacity-80 shadow-sm dark:bg-stone-900 dark:border-stone-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-rose-200">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300 dark:border-stone-700 dark:bg-stone-900"
            placeholder="Lagos, Nigeria"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-rose-200">Specialties</label>
          <input
            type="text"
            value={specialties}
            onChange={(e) => setSpecialties(e.target.value)}
            className="mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300 dark:border-stone-700 dark:bg-stone-900"
            placeholder="Wig installation, Knotless braids, Silk press"
          />
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
