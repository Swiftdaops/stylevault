"use client"

import React, { useEffect, useState } from 'react'
import { useAuth } from '@/components/auth-provider'
import { updateMyBarberProfile } from '@/lib/barber-api'
import { Button } from '@/components/ui/button'

export default function ProfileManager() {
  const { barber, refresh } = useAuth()
  const [form, setForm] = useState({
    name: '',
    bio: '',
    location: '',
    profileImage: '',
    currency: 'USD',
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!barber) return
    setForm({
      name: barber.name || '',
      bio: barber.bio || '',
      location: barber.location || '',
      profileImage: barber.profileImage || '',
      currency: barber.currency || 'USD',
    })
  }, [barber])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setSaved(false)
    await updateMyBarberProfile(form)
    await refresh()
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-sm text-stone-600 dark:text-amber-300">Update your public barber profile.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-orange-200/60 bg-white/80 p-5 dark:border-stone-800 dark:bg-black/60 max-w-3xl">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input className="mt-1 w-full rounded-md border px-3 py-2 dark:bg-stone-900" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
          </div>
          <div>
            <label className="block text-sm font-medium">Slug</label>
            <input className="mt-1 w-full rounded-md border px-3 py-2 opacity-70 dark:bg-stone-900" value={barber?.slug || ''} disabled />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Bio</label>
          <textarea className="mt-1 min-h-28 w-full rounded-md border px-3 py-2 dark:bg-stone-900" value={form.bio} onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))} />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="block text-sm font-medium">Location</label>
            <input className="mt-1 w-full rounded-md border px-3 py-2 dark:bg-stone-900" value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-medium">Currency</label>
            <input className="mt-1 w-full rounded-md border px-3 py-2 dark:bg-stone-900" value={form.currency} onChange={(e) => setForm((f) => ({ ...f, currency: e.target.value.toUpperCase() }))} maxLength={3} />
          </div>
          <div>
            <label className="block text-sm font-medium">Subscription</label>
            <input className="mt-1 w-full rounded-md border px-3 py-2 opacity-70 dark:bg-stone-900" value={barber?.subscriptionPlan || ''} disabled />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Profile image URL</label>
          <input className="mt-1 w-full rounded-md border px-3 py-2 dark:bg-stone-900" value={form.profileImage} onChange={(e) => setForm((f) => ({ ...f, profileImage: e.target.value }))} />
        </div>

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save profile'}</Button>
          {saved && <span className="text-sm text-emerald-700">Saved</span>}
        </div>
      </form>
    </div>
  )
}
