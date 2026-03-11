"use client"

import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { getBarberAvailability, getBarberCalendarAppointments } from '@/lib/barber-api'
import { connectBarberSocket } from '@/lib/barber-socket'

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

function parseTime(value) {
  const [hours = 0, minutes = 0] = String(value).split(':').map(Number)
  return (hours * 60) + minutes
}

function formatTime(totalMinutes) {
  const hours = String(Math.floor(totalMinutes / 60)).padStart(2, '0')
  const minutes = String(totalMinutes % 60).padStart(2, '0')
  return `${hours}:${minutes}`
}

function buildSlots(hoursRange, interval = 30) {
  if (!Array.isArray(hoursRange) || hoursRange.length < 2) return []

  const start = parseTime(hoursRange[0])
  const end = parseTime(hoursRange[1])
  const slots = []

  for (let current = start; current < end; current += interval) {
    slots.push(formatTime(current))
  }

  return slots
}

export default function LiveBarberCalendar({ barber }) {
  const [appointments, setAppointments] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [bookedTimes, setBookedTimes] = useState([])
  const [loading, setLoading] = useState(true)

  const selectedDateKey = useMemo(() => toDateKey(selectedDate), [selectedDate])

  const bookedDates = useMemo(() => {
    const dates = new Map()

    appointments.forEach((item) => {
      const date = toLocalDate(item.date)
      if (date) dates.set(item.date, date)
    })

    return Array.from(dates.values())
  }, [appointments])

  const weekdayLabel = useMemo(
    () => selectedDate?.toLocaleDateString('en-US', { weekday: 'long' }) || '',
    [selectedDate],
  )

  const workingHours = barber?.workingHours?.[weekdayLabel] || []
  const allSlots = useMemo(() => buildSlots(workingHours, 30), [workingHours])
  const availableSlots = useMemo(
    () => allSlots.filter((slot) => !bookedTimes.includes(slot)),
    [allSlots, bookedTimes],
  )

  const loadAppointments = async () => {
    if (!barber?._id) return
    const data = await getBarberCalendarAppointments(barber._id)
    setAppointments(Array.isArray(data) ? data : [])
  }

  const loadAvailability = async (dateKey) => {
    if (!barber?._id || !dateKey) return
    const result = await getBarberAvailability(barber._id, dateKey)
    setBookedTimes(Array.isArray(result?.bookedTimes) ? result.bookedTimes : [])
  }

  useEffect(() => {
    let mounted = true

    async function init() {
      setLoading(true)
      await loadAppointments()
      await loadAvailability(toDateKey(new Date()))
      if (mounted) setLoading(false)
    }

    init()
    return () => { mounted = false }
  }, [barber?._id])

  useEffect(() => {
    loadAvailability(selectedDateKey)
  }, [selectedDateKey, barber?._id])

  useEffect(() => {
    if (!barber?._id) return undefined

    const socket = connectBarberSocket(barber._id)
    const handleUpdate = () => {
      loadAppointments()
      loadAvailability(selectedDateKey)
    }

    socket?.on('barber:data-updated', handleUpdate)

    return () => {
      socket?.off('barber:data-updated', handleUpdate)
      socket?.emit('unsubscribe:barber', barber._id)
      socket?.disconnect()
    }
  }, [barber?._id, selectedDateKey])

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <div className="rounded-3xl border border-orange-200 bg-white/80 p-6 shadow-sm dark:border-stone-800 dark:bg-stone-950/60">
        <p className="text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-amber-300">Live availability</p>
        <h3 className="mt-2 text-2xl font-bold tracking-tight">Pick a day to see open time slots</h3>
        <p className="mt-2 text-sm text-stone-600 dark:text-amber-200">Booked dates update in real time when new appointments are created or changed.</p>

        <div className="mt-5">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(value) => value && setSelectedDate(value)}
            modifiers={{ booked: bookedDates }}
            modifiersClassNames={{ booked: 'bg-orange-100 text-stone-900 font-semibold rounded-md' }}
            className="rounded-lg border border-transparent p-0"
          />
        </div>
      </div>

      <div className="rounded-3xl border border-orange-200 bg-white/80 p-6 shadow-sm dark:border-stone-800 dark:bg-stone-950/60">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-amber-300">Selected date</p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight">{selectedDate.toDateString()}</h3>
            <p className="mt-2 text-sm text-stone-600 dark:text-amber-200">{workingHours.length >= 2 ? `${workingHours[0]} - ${workingHours[1]}` : 'This barber is not available on this day.'}</p>
          </div>

          <Link
            href={`/barbers/${barber.slug}/book?date=${selectedDateKey}`}
            className="inline-flex rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 dark:bg-amber-500 dark:text-black dark:hover:bg-amber-400"
          >
            Book this date
          </Link>
        </div>

        <div className="mt-6">
          <p className="text-sm font-medium text-stone-700 dark:text-amber-200">Available time slots</p>

          {loading ? (
            <div className="mt-3 text-sm text-stone-600 dark:text-amber-200">Loading calendar…</div>
          ) : availableSlots.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {availableSlots.map((slot) => (
                <Link
                  key={slot}
                  href={`/barbers/${barber.slug}/book?date=${selectedDateKey}&time=${encodeURIComponent(slot)}`}
                  aria-label={`Book ${selectedDate.toDateString()} at ${slot}`}
                  className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm text-emerald-800 transition hover:scale-105 hover:shadow-sm dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300"
                >
                  {slot}
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-3 rounded-2xl border border-dashed border-orange-300 bg-orange-50 px-4 py-4 text-sm text-stone-600 dark:border-stone-700 dark:bg-stone-900 dark:text-amber-200">
              No open time slots for this date yet.
            </div>
          )}

          {bookedTimes.length > 0 && (
            <div className="mt-5">
              <p className="text-sm font-medium text-stone-700 dark:text-amber-200">Booked times</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {bookedTimes.map((slot) => (
                  <span key={slot} className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs text-stone-700 dark:border-stone-700 dark:bg-stone-900 dark:text-amber-200">
                    {slot}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
