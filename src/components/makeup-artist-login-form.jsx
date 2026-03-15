"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { loginMakeupArtist } from '@/lib/makeup-artist-api'
import { Button } from '@/components/ui/button'

export default function MakeupArtistLoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await loginMakeupArtist(email, password)
      router.push('/makeup-artists/admin')
    } catch (err) {
      setError(err?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-rose-200/70 bg-white/90 p-6 shadow-sm dark:border-stone-800 dark:bg-black/70">
      <h2 className="mb-4 text-2xl font-semibold">Makeup Artist Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-rose-200">Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300 dark:border-stone-700 dark:bg-stone-900" />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-rose-200">Password</label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300 dark:border-stone-700 dark:bg-stone-900" />
        </div>

        {error && <div className="text-sm text-destructive">{error}</div>}

        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</Button>
        </div>
      </form>
    </div>
  )
}
