"use client"

import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { connectHairSpecialistSocket } from '@/lib/hair-specialist-socket'
import { getHairSpecialistAvailability, getHairSpecialistCalendarAppointments } from '@/lib/hair-specialist-api'
import { getHairSpecialistBookingUrl } from '@/lib/seo'

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

export default function LiveHairSpecialistCalendar({ hairSpecialist }) {
  const [appointments, setAppointments] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
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

  const specialistWorkingHours = hairSpecialist?.workingHours
  const workingHours = useMemo(() => specialistWorkingHours?.[weekdayLabel] || [], [specialistWorkingHours, weekdayLabel])
  const allSlots = useMemo(() => buildSlots(workingHours, 30), [workingHours])
  const availableSlots = useMemo(
    () => allSlots.filter((slot) => !bookedTimes.includes(slot)),
    [allSlots, bookedTimes],
  )

  useEffect(() => {
    setSelectedDate((currentValue) => currentValue || new Date())
  }, [])

  useEffect(() => {
    let mounted = true

    async function init() {
      if (!hairSpecialist?._id) {
        if (mounted) setLoading(false)
        return
      }

      setLoading(true)
      const initialDate = selectedDate || new Date()
      const initialDateKey = toDateKey(initialDate)
      const [appointmentsData, availabilityData] = await Promise.all([
        getHairSpecialistCalendarAppointments(hairSpecialist._id),
        getHairSpecialistAvailability(hairSpecialist._id, initialDateKey),
      ])

      if (!mounted) return

      setSelectedDate((currentValue) => currentValue || initialDate)
      setAppointments(Array.isArray(appointmentsData) ? appointmentsData : [])
      setBookedTimes(Array.isArray(availabilityData?.bookedTimes) ? availabilityData.bookedTimes : [])
      setLoading(false)
    }

    init()
    return () => { mounted = false }
  }, [hairSpecialist?._id])

  useEffect(() => {
    let mounted = true

    async function syncAvailability() {
      if (!hairSpecialist?._id || !selectedDateKey) return

      const result = await getHairSpecialistAvailability(hairSpecialist._id, selectedDateKey)
      if (!mounted) return

      setBookedTimes(Array.isArray(result?.bookedTimes) ? result.bookedTimes : [])
    }

    syncAvailability()
    return () => { mounted = false }
  }, [hairSpecialist?._id, selectedDateKey])

  useEffect(() => {
    if (!hairSpecialist?._id) return undefined

    async function refreshCalendar() {
      const [appointmentsData, availabilityData] = await Promise.all([
        getHairSpecialistCalendarAppointments(hairSpecialist._id),
        getHairSpecialistAvailability(hairSpecialist._id, selectedDateKey),
      ])

      setAppointments(Array.isArray(appointmentsData) ? appointmentsData : [])
      setBookedTimes(Array.isArray(availabilityData?.bookedTimes) ? availabilityData.bookedTimes : [])
    }

    const socket = connectHairSpecialistSocket(hairSpecialist._id)
    const handleUpdate = () => refreshCalendar()

    socket?.on('hair-specialist:data-updated', handleUpdate)

    return () => {
      socket?.off('hair-specialist:data-updated', handleUpdate)
    }
  }, [hairSpecialist?._id, selectedDateKey])

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <div className="rounded-3xl border border-rose-200 bg-white/80 p-6 shadow-sm dark:border-stone-800 dark:bg-stone-950/60">
        <p className="text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-rose-300">Live availability</p>
        <h3 className="mt-2 text-2xl font-bold tracking-tight">Pick a day to see open salon slots</h3>
        <p className="mt-2 text-sm text-stone-600 dark:text-rose-200">Booked dates update in real time when appointments are created or changed.</p>

        <div className="mt-5">
          <Calendar
            mode="single"
            selected={selectedDate || undefined}
            onSelect={(value) => value && setSelectedDate(value)}
            modifiers={{ booked: bookedDates }}
            modifiersClassNames={{ booked: 'bg-rose-100 text-stone-900 font-semibold rounded-md' }}
            className="rounded-lg border border-transparent p-0"
          />
        </div>
      </div>

      <div className="rounded-3xl border border-rose-200 bg-white/80 p-6 shadow-sm dark:border-stone-800 dark:bg-stone-950/60">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-rose-300">Selected date</p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight">{selectedDate ? selectedDate.toDateString() : 'Loading date…'}</h3>
            <p className="mt-2 text-sm text-stone-600 dark:text-rose-200">{workingHours.length >= 2 ? `${workingHours[0]} - ${workingHours[1]}` : 'This stylist is not available on this day.'}</p>
          </div>

          <Link
            href={getHairSpecialistBookingUrl(hairSpecialist.slug, selectedDateKey ? { date: selectedDateKey } : {})}
            className="inline-flex rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 dark:bg-rose-400 dark:text-black dark:hover:bg-rose-300"
          >
            Book this date
          </Link>
        </div>

        <div className="mt-6">
          <p className="text-sm font-medium text-stone-700 dark:text-rose-200">Available time slots</p>

          {loading ? (
            <div className="mt-3 text-sm text-stone-600 dark:text-rose-200">Loading calendar…</div>
          ) : availableSlots.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {availableSlots.map((slot) => (
                <Link
                  key={slot}
                  href={getHairSpecialistBookingUrl(hairSpecialist.slug, { date: selectedDateKey, time: slot })}
                  aria-label={`Book ${selectedDate ? selectedDate.toDateString() : 'selected date'} at ${slot}`}
                  className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm text-emerald-800 transition hover:scale-105 hover:shadow-sm dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300"
                >
                  {slot}
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-3 rounded-2xl border border-dashed border-rose-300 bg-rose-50 px-4 py-4 text-sm text-stone-600 dark:border-stone-700 dark:bg-stone-900 dark:text-rose-200">
              No open time slots for this date yet.
            </div>
          )}

          {bookedTimes.length > 0 && (
            <div className="mt-5">
              <p className="text-sm font-medium text-stone-700 dark:text-rose-200">Booked times</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {bookedTimes.map((slot) => (
                  <span key={slot} className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs text-stone-700 dark:border-stone-700 dark:bg-stone-900 dark:text-rose-200">
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
