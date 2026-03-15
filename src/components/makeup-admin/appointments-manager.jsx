"use client"

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { useMakeupArtistAuth } from '@/components/makeup-artist-auth-provider'
import { connectMakeupArtistSocket } from '@/lib/makeup-artist-socket'
import { formatCurrency, getMyMakeupAppointments, updateMyMakeupAppointment } from '@/lib/makeup-artist-api'

function toLocalDate(dateString) {
  if (!dateString) return null
  const [year, month, day] = String(dateString).split('-').map(Number)
  if (!year || !month || !day) return null
  return new Date(year, month - 1, day, 12, 0, 0)
}

function toDateKey(value) {
  if (!(value instanceof Date)) return ''
  const year = value.getFullYear()
  const month = String(value.getMonth() + 1).padStart(2, '0')
  const day = String(value.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export default function MakeupAppointmentsManager() {
  const { makeupArtist } = useMakeupArtistAuth()
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [selectedDate, setSelectedDate] = useState(undefined)
  const [editingId, setEditingId] = useState(null)
  const [draft, setDraft] = useState({ date: '', time: '', status: 'pending' })

  const loadAppointments = useCallback(async () => {
    setLoading(true)
    const data = await getMyMakeupAppointments()
    setAppointments(Array.isArray(data) ? data : [])
    setSelectedDate(toLocalDate(data?.[0]?.date) || new Date())
    setLoading(false)
  }, [])

  useEffect(() => {
    loadAppointments()
  }, [loadAppointments])

  useEffect(() => {
    if (!makeupArtist?._id) return undefined

    const socket = connectMakeupArtistSocket(makeupArtist._id)
    const handleUpdate = (payload) => {
      if (payload?.type === 'appointment' || payload?.type === 'customer' || payload?.type === 'profile') {
        loadAppointments()
      }
    }

    socket?.on('makeup-artist:data-updated', handleUpdate)

    return () => {
      socket?.off('makeup-artist:data-updated', handleUpdate)
    }
  }, [makeupArtist?._id, loadAppointments])

  const filteredAppointments = useMemo(() => {
    const dateKey = selectedDate ? toDateKey(selectedDate) : ''

    return appointments.filter((item) => {
      const matchesStatus = filter === 'all' ? true : item.status === filter
      const matchesDate = dateKey ? item.date === dateKey : true
      return matchesStatus && matchesDate
    })
  }, [appointments, filter, selectedDate])

  const bookedDates = useMemo(() => {
    const dates = new Map()
    appointments.forEach((item) => {
      const value = toLocalDate(item.date)
      if (value) dates.set(item.date, value)
    })
    return Array.from(dates.values())
  }, [appointments])

  const startEdit = (appointment) => {
    setEditingId(appointment._id)
    setDraft({ date: appointment.date, time: appointment.time, status: appointment.status })
  }

  const saveEdit = async () => {
    await updateMyMakeupAppointment(editingId, draft)
    setEditingId(null)
    await loadAppointments()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Appointments</h1>
          <p className="text-sm text-stone-600 dark:text-rose-300">View and update only your own makeup bookings.</p>
        </div>

        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-md border px-3 py-2 dark:bg-stone-900">
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
        <div className="rounded-xl border border-rose-200/70 bg-white/90 p-5 dark:border-stone-800 dark:bg-black/60">
          <div className="mb-3 flex items-center justify-between gap-4">
            <div>
              <div className="text-lg font-semibold">Booking calendar</div>
              <div className="text-sm text-stone-600 dark:text-rose-300">Booked dates are highlighted.</div>
            </div>
            <Button type="button" variant="outline" onClick={() => setSelectedDate(new Date())}>Today</Button>
          </div>

          <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} modifiers={{ booked: bookedDates }} modifiersClassNames={{ booked: 'bg-emerald-100 text-emerald-900 font-semibold rounded-md' }} className="rounded-lg border border-transparent p-0" />

          <div className="mt-4 rounded-lg border border-rose-200/70 bg-rose-50/80 p-3 text-sm text-stone-700 dark:border-stone-800 dark:bg-stone-950 dark:text-rose-200">
            <div className="font-medium">Selected day</div>
            <div className="mt-1">{selectedDate ? selectedDate.toDateString() : 'Pick a date from the calendar'}</div>
            <div className="mt-2 text-xs text-stone-500 dark:text-rose-400">{filteredAppointments.length} appointment(s) match your current filters.</div>
          </div>
        </div>

        <div className="space-y-4">
          {loading && <div className="rounded-xl border border-rose-200/70 bg-white/90 p-5 dark:border-stone-800 dark:bg-black/60">Loading appointments…</div>}
          {!loading && filteredAppointments.length === 0 && <div className="rounded-xl border border-dashed border-rose-200/70 bg-white/90 p-5 text-sm dark:border-stone-800 dark:bg-black/60">No appointments found for the selected filters.</div>}

          {filteredAppointments.map((appointment) => (
            <div key={appointment._id} className="rounded-xl border border-rose-200/70 bg-white/90 p-5 dark:border-stone-800 dark:bg-black/60">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{appointment.service?.name || 'Service'} — {appointment.customerName}</h2>
                  <div className="mt-1 text-sm text-stone-600 dark:text-rose-300">{appointment.customerEmail}</div>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-rose-100 px-2 py-1 text-stone-800">{appointment.date}</span>
                    <span className="rounded-full bg-rose-100 px-2 py-1 text-stone-800">{appointment.time}</span>
                    <span className="rounded-full bg-rose-100 px-2 py-1 text-stone-800">{appointment.status}</span>
                    {appointment.selectedPricingOption ? <span className="rounded-full bg-stone-100 px-2 py-1 text-stone-800">{appointment.selectedPricingOption}</span> : null}
                    {appointment.selectedAddOns?.length ? <span className="rounded-full bg-stone-100 px-2 py-1 text-stone-800">{appointment.selectedAddOns.length} add-on(s)</span> : null}
                  </div>
                </div>

                <div className="text-sm font-medium">{formatCurrency(appointment.price, makeupArtist?.currency || 'USD')}</div>
              </div>

              {editingId === appointment._id ? (
                <div className="mt-4 grid gap-3 md:grid-cols-4">
                  <input type="date" className="rounded-md border px-3 py-2 dark:bg-stone-900" value={draft.date} onChange={(e) => setDraft((current) => ({ ...current, date: e.target.value }))} />
                  <input type="time" className="rounded-md border px-3 py-2 dark:bg-stone-900" value={draft.time} onChange={(e) => setDraft((current) => ({ ...current, time: e.target.value }))} />
                  <select className="rounded-md border px-3 py-2 dark:bg-stone-900" value={draft.status} onChange={(e) => setDraft((current) => ({ ...current, status: e.target.value }))}>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <div className="flex gap-2">
                    <Button type="button" onClick={saveEdit}>Save</Button>
                    <Button type="button" variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <div className="mt-4">
                  <Button type="button" variant="outline" onClick={() => startEdit(appointment)}>Edit appointment</Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
