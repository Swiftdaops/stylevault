"use client"

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { useLashTechnicianAuth } from '@/components/lash-technician-auth-provider'
import { connectLashTechnicianSocket } from '@/lib/lash-technician-socket'
import { formatCurrency, getMyLashAppointments, getMyLashCustomers, getMyLashServices } from '@/lib/lash-technician-api'
import { getLashTechnicianStoreUrl } from '@/lib/seo'

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

export default function LashTechnicianDashboard() {
  const router = useRouter()
  const { lashTechnician, loading: authLoading, logout } = useLashTechnicianAuth()
  const [loading, setLoading] = useState(true)
  const [appointments, setAppointments] = useState([])
  const [servicesCount, setServicesCount] = useState(0)
  const [customersCount, setCustomersCount] = useState(0)
  const [copied, setCopied] = useState(false)
  const [selectedDate, setSelectedDate] = useState(undefined)

  const profileUrl = useMemo(() => {
    if (!lashTechnician?.slug) return ''
    return getLashTechnicianStoreUrl(lashTechnician.slug)
  }, [lashTechnician])

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
    if (!lashTechnician) return

    setLoading(true)
    const [appts, services, customers] = await Promise.all([
      getMyLashAppointments(),
      getMyLashServices(),
      getMyLashCustomers(),
    ])

    setAppointments(Array.isArray(appts) ? appts : [])
    setServicesCount(Array.isArray(services) ? services.length : 0)
    setCustomersCount(Array.isArray(customers) ? customers.length : 0)
    setSelectedDate((current) => current || toLocalDate(appts?.[0]?.date) || new Date())
    setLoading(false)
  }, [lashTechnician])

  useEffect(() => {
    let mounted = true

    async function init() {
      if (!lashTechnician) {
        if (!authLoading) router.push('/lash-technicians/login')
        return
      }

      await loadDashboardData()
      if (!mounted) return
    }

    init()
    return () => { mounted = false }
  }, [lashTechnician, authLoading, loadDashboardData, router])

  useEffect(() => {
    if (!lashTechnician?._id) return undefined

    const socket = connectLashTechnicianSocket(lashTechnician._id)
    const handleUpdate = () => loadDashboardData()

    socket?.on('lash-technician:data-updated', handleUpdate)

    return () => {
      socket?.off('lash-technician:data-updated', handleUpdate)
    }
  }, [lashTechnician?._id, loadDashboardData])

  const handleCopy = async () => {
    if (!profileUrl) return
    try {
      await navigator.clipboard.writeText(profileUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // ignore
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
          <h1 className="text-2xl font-bold">Welcome, {lashTechnician?.name || 'Lash Technician'}</h1>
          {lashTechnician?.slug && <div className="text-sm text-stone-600 dark:text-violet-300">Slug: {lashTechnician.slug}</div>}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.push('/')}>Public site</Button>
          <Button variant="destructive" onClick={logout}>Logout</Button>
        </div>
      </div>

      {lashTechnician?.slug && (
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="text-sm text-stone-500 dark:text-violet-300">Profile Link</div>
            <div className="max-w-[60%] truncate rounded-md border border-violet-200/70 bg-white/80 px-3 py-1.5 text-sm text-stone-700 dark:border-stone-800 dark:bg-black/70">
              {profileUrl}
            </div>
          </div>

          <button type="button" onClick={handleCopy} className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium transition-shadow ${copied ? 'border-emerald-200 bg-emerald-100 text-emerald-800 shadow-sm' : 'border-violet-200/70 bg-violet-50 text-stone-900 hover:shadow-sm'}`}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied' : 'Copy link'}
          </button>
        </div>
      )}

      <section className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-violet-200/70 bg-white/90 p-4 dark:border-stone-800 dark:bg-black/70">
          <div className="text-sm text-stone-500 dark:text-violet-300">Upcoming</div>
          <div className="mt-2 text-2xl font-semibold">{appointments.length}</div>
        </div>

        <div className="rounded-lg border border-violet-200/70 bg-white/90 p-4 dark:border-stone-800 dark:bg-black/70">
          <div className="text-sm text-stone-500 dark:text-violet-300">Services</div>
          <div className="mt-2 text-2xl font-semibold">{servicesCount}</div>
        </div>

        <div className="rounded-lg border border-violet-200/70 bg-white/90 p-4 dark:border-stone-800 dark:bg-black/70">
          <div className="text-sm text-stone-500 dark:text-violet-300">Customers</div>
          <div className="mt-2 text-2xl font-semibold">{customersCount}</div>
        </div>

        <div className="rounded-lg border border-violet-200/70 bg-white/90 p-4 dark:border-stone-800 dark:bg-black/70 md:col-span-1">
          <div className="mb-3 text-sm text-stone-500 dark:text-violet-300">Booked dates</div>
          <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} modifiers={{ booked: bookedDates }} modifiersClassNames={{ booked: 'bg-emerald-100 text-emerald-900 font-semibold rounded-md' }} className="rounded-lg border border-transparent p-0" />
        </div>

        <div className="rounded-lg border border-violet-200/70 bg-white/90 p-4 dark:border-stone-800 dark:bg-black/70 md:col-span-2">
          <div className="text-sm text-stone-500 dark:text-violet-300">Next appointments</div>
          <ul className="mt-3 space-y-3">
            {appointments.length === 0 && <li className="text-sm text-stone-600 dark:text-violet-300">No upcoming appointments</li>}

            {appointments.slice(0, 8).map((appointment) => (
              <li key={appointment._id || appointment.id} className="flex items-center justify-between rounded-md p-3 hover:bg-violet-50 dark:hover:bg-stone-900">
                <div>
                  <div className="font-medium">{appointment.service?.name || 'Service'}</div>
                  <div className="text-sm text-stone-600 dark:text-violet-300">{appointment.date} {appointment.time} • {appointment.customerName || appointment.customer?.name}</div>
                </div>
                <div className="text-sm text-stone-700 dark:text-violet-200">{typeof appointment.price === 'number' ? formatCurrency(appointment.price, lashTechnician?.currency || 'USD') : ''}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-violet-200/70 bg-white/90 p-4 dark:border-stone-800 dark:bg-black/70 md:col-span-3">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm text-stone-500 dark:text-violet-300">Selected date schedule</div>
              <div className="mt-1 text-lg font-semibold">{selectedDate ? selectedDate.toDateString() : 'Pick a date'}</div>
            </div>
            <div className="text-sm text-stone-600 dark:text-violet-300">{selectedDateAppointments.length} booking(s)</div>
          </div>

          <ul className="mt-4 space-y-3">
            {selectedDateAppointments.length === 0 && (
              <li className="rounded-md border border-dashed border-violet-200/70 p-4 text-sm text-stone-600 dark:border-stone-800 dark:text-violet-300">No bookings for this date.</li>
            )}

            {selectedDateAppointments.map((appointment) => (
              <li key={appointment._id || appointment.id} className="flex items-center justify-between rounded-md border border-violet-200/70 p-3 dark:border-stone-800">
                <div>
                  <div className="font-medium">{appointment.time} — {appointment.service?.name || 'Service'}</div>
                  <div className="text-sm text-stone-600 dark:text-violet-300">{appointment.customerName} • {appointment.status}</div>
                </div>
                <div className="text-sm text-stone-700 dark:text-violet-200">{formatCurrency(appointment.price, lashTechnician?.currency || 'USD')}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
