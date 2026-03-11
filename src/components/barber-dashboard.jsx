"use client"

import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { getMyAppointments, getMyCustomers, getMyServices, formatCurrency } from "@/lib/barber-api"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { useAuth } from "@/components/auth-provider"
import { connectBarberSocket } from "@/lib/barber-socket"
import { getBarberStoreUrl } from "@/lib/seo"

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

export default function BarberDashboard() {
  const router = useRouter()
  const { barber, loading: authLoading, logout } = useAuth()
  const [loading, setLoading] = useState(true)
  const [appointments, setAppointments] = useState([])
  const [servicesCount, setServicesCount] = useState(0)
  const [customersCount, setCustomersCount] = useState(0)
  const [copied, setCopied] = useState(false)
  const [selectedDate, setSelectedDate] = useState(undefined)

  const profileUrl = useMemo(() => {
    if (!barber?.slug) return ''
    return getBarberStoreUrl(barber.slug)
  }, [barber])

  const bookedDates = useMemo(() => {
    const unique = new Map()
    appointments.forEach((item) => {
      const date = toLocalDate(item.date)
      if (date) unique.set(item.date, date)
    })
    return Array.from(unique.values())
  }, [appointments])

  const selectedDateAppointments = useMemo(() => {
    const key = selectedDate ? toDateKey(selectedDate) : ''
    if (!key) return []
    return appointments.filter((item) => item.date === key)
  }, [appointments, selectedDate])

  const loadDashboardData = useCallback(async () => {
    if (!barber) return

    setLoading(true)
    const [appts, services, customers] = await Promise.all([
      getMyAppointments(),
      getMyServices(),
      getMyCustomers(),
    ])

    setAppointments(Array.isArray(appts) ? appts : [])
    setServicesCount(Array.isArray(services) ? services.length : 0)
    setCustomersCount(Array.isArray(customers) ? customers.length : 0)
    setSelectedDate((current) => current || toLocalDate(appts?.[0]?.date) || new Date())
    setLoading(false)
  }, [barber])

  useEffect(() => {
    let mounted = true

    async function init() {
      if (!barber) {
        if (!authLoading) router.push('/barbers/login')
        return
      }

      await loadDashboardData()
      if (!mounted) return
    }

    init()
    return () => { mounted = false }
  }, [barber, authLoading, loadDashboardData, router])

  useEffect(() => {
    if (!barber?._id) return undefined

    const socket = connectBarberSocket(barber._id)
    const handleUpdate = () => {
      loadDashboardData()
    }

    socket?.on('barber:data-updated', handleUpdate)

    return () => {
      socket?.off('barber:data-updated', handleUpdate)
      socket?.emit('unsubscribe:barber', barber._id)
      socket?.disconnect()
    }
  }, [barber?._id, loadDashboardData])

  const handleLogout = async () => {
    await logout()
  }

  const handleCopy = async () => {
    if (!profileUrl) return
    try {
      await navigator.clipboard.writeText(profileUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch (err) {
      // fallback: create textarea
      try {
        const ta = document.createElement('textarea')
        ta.value = profileUrl
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        ta.remove()
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
      } catch (e) {
        // ignore
      }
    }
  }

  if (loading || authLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">Loading dashboard…</div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {barber?.name || 'Barber'}</h1>
          {barber?.slug && <div className="text-sm text-stone-600 dark:text-amber-300">Slug: {barber.slug}</div>}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.push('/')}>Public site</Button>
          <Button variant="destructive" onClick={handleLogout}>Logout</Button>
        </div>
      </div>

      {/* Shareable profile link */}
      {barber?.slug && (
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="text-sm text-stone-500 dark:text-amber-300">Profile Link</div>
            <div className="truncate rounded-md border px-3 py-1.5 bg-white/80 dark:bg-black/70 border-orange-200/60 dark:border-stone-800 max-w-[60%] text-sm text-stone-700">
              {profileUrl}
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleCopy}
              className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-shadow border ${copied ? 'bg-emerald-100 border-emerald-200 text-emerald-800 shadow-sm' : 'bg-orange-50 border-orange-200/60 text-stone-900 hover:shadow-sm'}`}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied' : 'Copy link'}
            </button>
          </div>
        </div>
      )}

      <section className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-orange-200/60 bg-white/80 p-4 dark:border-stone-800 dark:bg-black/70">
          <div className="text-sm text-stone-500 dark:text-amber-300">Upcoming</div>
          <div className="mt-2 text-2xl font-semibold">{appointments.length}</div>
        </div>

        <div className="rounded-lg border border-orange-200/60 bg-white/80 p-4 dark:border-stone-800 dark:bg-black/70">
          <div className="text-sm text-stone-500 dark:text-amber-300">Services</div>
          <div className="mt-2 text-2xl font-semibold">{servicesCount}</div>
        </div>

        <div className="rounded-lg border border-orange-200/60 bg-white/80 p-4 dark:border-stone-800 dark:bg-black/70">
          <div className="text-sm text-stone-500 dark:text-amber-300">Customers</div>
          <div className="mt-2 text-2xl font-semibold">{customersCount}</div>
        </div>

        <div className="rounded-lg border border-orange-200/60 bg-white/80 p-4 dark:border-stone-800 dark:bg-black/70 md:col-span-1">
          <div className="mb-3 text-sm text-stone-500 dark:text-amber-300">Booked dates</div>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            modifiers={{ booked: bookedDates }}
            modifiersClassNames={{ booked: 'bg-emerald-100 text-emerald-900 font-semibold rounded-md' }}
            className="rounded-lg border border-transparent p-0"
          />
        </div>

        <div className="rounded-lg border border-orange-200/60 bg-white/80 p-4 dark:border-stone-800 dark:bg-black/70 md:col-span-2">
          <div className="text-sm text-stone-500 dark:text-amber-300">Next appointments</div>
          <ul className="mt-3 space-y-3">
            {appointments.length === 0 && (
              <li className="text-sm text-stone-600 dark:text-amber-300">No upcoming appointments</li>
            )}

            {appointments.slice(0, 8).map((a) => (
              <li key={a._id || a.id} className="flex items-center justify-between rounded-md p-3 hover:bg-orange-50 dark:hover:bg-stone-900">
                <div>
                  <div className="font-medium">{a.service?.name || 'Service'}</div>
                  <div className="text-sm text-stone-600 dark:text-amber-300">{a.date} {a.time} • {a.customerName || a.customer?.name}</div>
                </div>
                <div className="text-sm text-stone-700 dark:text-amber-200">{typeof a.price === 'number' ? formatCurrency(a.price) : ''}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-orange-200/60 bg-white/80 p-4 dark:border-stone-800 dark:bg-black/70 md:col-span-3">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm text-stone-500 dark:text-amber-300">Selected date schedule</div>
              <div className="mt-1 text-lg font-semibold">{selectedDate ? selectedDate.toDateString() : 'Pick a date'}</div>
            </div>
            <div className="text-sm text-stone-600 dark:text-amber-300">{selectedDateAppointments.length} booking(s)</div>
          </div>

          <ul className="mt-4 space-y-3">
            {selectedDateAppointments.length === 0 && (
              <li className="rounded-md border border-dashed border-orange-200/60 p-4 text-sm text-stone-600 dark:border-stone-800 dark:text-amber-300">
                No bookings for this date.
              </li>
            )}

            {selectedDateAppointments.map((appointment) => (
              <li key={appointment._id || appointment.id} className="flex items-center justify-between rounded-md border border-orange-200/60 p-3 dark:border-stone-800">
                <div>
                  <div className="font-medium">{appointment.time} — {appointment.service?.name || 'Service'}</div>
                  <div className="text-sm text-stone-600 dark:text-amber-300">{appointment.customerName} • {appointment.status}</div>
                </div>
                <div className="text-sm text-stone-700 dark:text-amber-200">{formatCurrency(appointment.price, barber?.currency || 'USD')}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
