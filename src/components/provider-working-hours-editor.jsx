"use client"

import React, { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const DEFAULT_WORKING_HOURS = {
  Monday: ['09:00', '18:00'],
  Tuesday: ['09:00', '18:00'],
  Wednesday: ['09:00', '18:00'],
  Thursday: ['09:00', '18:00'],
  Friday: ['09:00', '18:00'],
  Saturday: ['10:00', '17:00'],
}

const THEME_STYLES = {
  orange: {
    panel: 'rounded-3xl border border-orange-200/70 bg-white/90 p-6 shadow-sm dark:border-stone-800 dark:bg-stone-950/70',
    badge: 'border-orange-200 bg-orange-50 text-orange-700 dark:border-stone-700 dark:bg-stone-900 dark:text-amber-300',
    input: 'border-orange-200 bg-white/90 focus:border-orange-400 focus:ring-orange-200 dark:border-stone-700 dark:bg-stone-900 dark:focus:border-amber-500 dark:focus:ring-amber-500/20',
    muted: 'text-stone-600 dark:text-amber-300',
    soft: 'bg-orange-50/80 dark:bg-stone-900/70',
  },
  rose: {
    panel: 'rounded-3xl border border-rose-200/70 bg-white/90 p-6 shadow-sm dark:border-stone-800 dark:bg-stone-950/70',
    badge: 'border-rose-200 bg-rose-50 text-rose-700 dark:border-stone-700 dark:bg-stone-900 dark:text-rose-300',
    input: 'border-rose-200 bg-white/90 focus:border-rose-400 focus:ring-rose-200 dark:border-stone-700 dark:bg-stone-900 dark:focus:border-rose-400 dark:focus:ring-rose-400/20',
    muted: 'text-stone-600 dark:text-rose-300',
    soft: 'bg-rose-50/80 dark:bg-stone-900/70',
  },
  fuchsia: {
    panel: 'rounded-3xl border border-fuchsia-200/70 bg-white/90 p-6 shadow-sm dark:border-stone-800 dark:bg-stone-950/70',
    badge: 'border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700 dark:border-stone-700 dark:bg-stone-900 dark:text-fuchsia-300',
    input: 'border-fuchsia-200 bg-white/90 focus:border-fuchsia-400 focus:ring-fuchsia-200 dark:border-stone-700 dark:bg-stone-900 dark:focus:border-fuchsia-400 dark:focus:ring-fuchsia-400/20',
    muted: 'text-stone-600 dark:text-fuchsia-300',
    soft: 'bg-fuchsia-50/80 dark:bg-stone-900/70',
  },
  violet: {
    panel: 'rounded-3xl border border-violet-200/70 bg-white/90 p-6 shadow-sm dark:border-stone-800 dark:bg-stone-950/70',
    badge: 'border-violet-200 bg-violet-50 text-violet-700 dark:border-stone-700 dark:bg-stone-900 dark:text-violet-300',
    input: 'border-violet-200 bg-white/90 focus:border-violet-400 focus:ring-violet-200 dark:border-stone-700 dark:bg-stone-900 dark:focus:border-violet-400 dark:focus:ring-violet-400/20',
    muted: 'text-stone-600 dark:text-violet-300',
    soft: 'bg-violet-50/80 dark:bg-stone-900/70',
  },
}

const TIME_OPTIONS = Array.from({ length: 48 }, (_, index) => {
  const hours = String(Math.floor(index / 2)).padStart(2, '0')
  const minutes = index % 2 === 0 ? '00' : '30'
  return `${hours}:${minutes}`
})

function normalizeWorkingHours(workingHours = {}) {
  return WEEKDAYS.reduce((result, day) => {
    const hours = workingHours?.[day]
    if (Array.isArray(hours) && hours.length >= 2 && hours[0] && hours[1]) {
      result[day] = [hours[0], hours[1]]
    }
    return result
  }, {})
}

function buildDraft(workingHours = {}) {
  const normalizedHours = normalizeWorkingHours(workingHours)

  return WEEKDAYS.reduce((result, day) => {
    const fallback = DEFAULT_WORKING_HOURS[day] || ['09:00', '18:00']
    const hours = normalizedHours[day] || fallback

    result[day] = {
      enabled: Boolean(normalizedHours[day]),
      start: hours[0],
      end: hours[1],
    }

    return result
  }, {})
}

function draftToPayload(draft = {}) {
  return WEEKDAYS.reduce((result, day) => {
    const entry = draft?.[day]
    if (!entry?.enabled) return result
    result[day] = [entry.start, entry.end]
    return result
  }, {})
}

export default function ProviderWorkingHoursEditor({ provider, refresh, updateProfile, tone = 'orange' }) {
  const theme = THEME_STYLES[tone] || THEME_STYLES.orange
  const [draft, setDraft] = useState(() => buildDraft(provider?.workingHours))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setDraft(buildDraft(provider?.workingHours))
  }, [provider?.workingHours])

  const currentPayload = useMemo(() => normalizeWorkingHours(provider?.workingHours), [provider?.workingHours])
  const draftPayload = useMemo(() => draftToPayload(draft), [draft])

  const validationMessage = useMemo(() => {
    for (const day of WEEKDAYS) {
      const entry = draft?.[day]
      if (!entry?.enabled) continue
      if (!entry.start || !entry.end) return `Select both opening and closing time for ${day}.`
      if (entry.start >= entry.end) return `${day} closing time must be later than opening time.`
    }
    return ''
  }, [draft])

  const hasChanges = useMemo(() => JSON.stringify(draftPayload) !== JSON.stringify(currentPayload), [currentPayload, draftPayload])

  const updateDay = (day, patch) => {
    setDraft((current) => ({
      ...current,
      [day]: {
        ...current[day],
        ...patch,
      },
    }))
    setSaved(false)
    setError('')
  }

  const handleToggleDay = (day, enabled) => {
    const fallback = DEFAULT_WORKING_HOURS[day] || ['09:00', '18:00']
    updateDay(day, {
      enabled,
      start: draft?.[day]?.start || fallback[0],
      end: draft?.[day]?.end || fallback[1],
    })
  }

  const applyDefaultWeek = () => {
    setDraft(buildDraft(DEFAULT_WORKING_HOURS))
    setSaved(false)
    setError('')
  }

  const clearAll = () => {
    setDraft(buildDraft({}))
    setSaved(false)
    setError('')
  }

  const handleSave = async () => {
    if (validationMessage) {
      setError(validationMessage)
      return
    }

    setSaving(true)
    setError('')
    setSaved(false)

    try {
      await updateProfile({ workingHours: draftPayload })
      await refresh?.()
      setSaved(true)
    } catch (saveError) {
      setError(saveError?.message || 'Failed to save working hours')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className={theme.panel}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${theme.badge}`}>
            Weekly schedule
          </div>
          <h2 className="mt-3 text-xl font-semibold">Working hours</h2>
          <p className={`mt-2 text-sm ${theme.muted}`}>
            Choose the days you are available and set the time range clients can book.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" onClick={applyDefaultWeek}>Apply default week</Button>
          <Button type="button" variant="outline" onClick={clearAll}>Clear all</Button>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {WEEKDAYS.map((day) => {
          const entry = draft?.[day] || { enabled: false, start: '09:00', end: '18:00' }

          return (
            <div key={day} className={`grid gap-3 rounded-2xl border border-black/5 p-4 md:grid-cols-[1.1fr_1fr] ${theme.soft}`}>
              <label className="flex items-center gap-3 text-sm font-medium text-stone-900 dark:text-stone-100">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-stone-300"
                  checked={entry.enabled}
                  onChange={(event) => handleToggleDay(day, event.target.checked)}
                />
                <span>{day}</span>
              </label>

              <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                <Select value={entry.start} onValueChange={(value) => updateDay(day, { start: value })} disabled={!entry.enabled}>
                  <SelectTrigger className={`h-11 w-full rounded-xl border px-4 text-sm shadow-sm outline-none transition focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${theme.input}`}>
                    <SelectValue placeholder="Start time" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_OPTIONS.map((time) => (
                      <SelectItem key={`${day}-start-${time}`} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <span className={`text-center text-sm font-medium ${theme.muted}`}>-</span>

                <Select value={entry.end} onValueChange={(value) => updateDay(day, { end: value })} disabled={!entry.enabled}>
                  <SelectTrigger className={`h-11 w-full rounded-xl border px-4 text-sm shadow-sm outline-none transition focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${theme.input}`}>
                    <SelectValue placeholder="End time" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_OPTIONS.map((time) => (
                      <SelectItem key={`${day}-end-${time}`} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1 text-sm">
          {error ? <p className="text-red-600 dark:text-red-400">{error}</p> : null}
          {saved ? <p className="text-emerald-600 dark:text-emerald-400">Working hours updated.</p> : null}
        </div>

        <Button type="button" onClick={handleSave} disabled={saving || !hasChanges || Boolean(validationMessage)}>
          {saving ? 'Saving...' : 'Save working hours'}
        </Button>
      </div>
    </section>
  )
}