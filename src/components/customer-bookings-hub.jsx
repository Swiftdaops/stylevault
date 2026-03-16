'use client'

import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { CalendarClock, ExternalLink, MapPin, RefreshCw } from 'lucide-react'
import { getStoredCustomerBookings, subscribeToStoredCustomerBookings } from '@/lib/customer-booking-links'

const themeByProvider = {
  barber: {
    shell: 'bg-orange-50 text-stone-950 dark:bg-black dark:text-amber-500',
    panel: 'border-orange-200/80 bg-white/90 dark:border-stone-800 dark:bg-black/70',
    accent: 'text-amber-600 dark:text-amber-300',
    button: 'border-orange-300 text-stone-900 hover:bg-orange-100 dark:border-stone-700 dark:text-amber-100 dark:hover:bg-stone-900',
  },
  'hair-specialist': {
    shell: 'bg-rose-50 text-stone-950 dark:bg-black dark:text-rose-400',
    panel: 'border-rose-200/80 bg-white/90 dark:border-stone-800 dark:bg-black/70',
    accent: 'text-rose-600 dark:text-rose-300',
    button: 'border-rose-300 text-rose-900 hover:bg-rose-100 dark:border-stone-700 dark:text-rose-100 dark:hover:bg-stone-900',
  },
  'nail-technician': {
    shell: 'bg-fuchsia-50 text-stone-950 dark:bg-black dark:text-fuchsia-400',
    panel: 'border-fuchsia-200/80 bg-white/90 dark:border-stone-800 dark:bg-black/70',
    accent: 'text-fuchsia-600 dark:text-fuchsia-300',
    button: 'border-fuchsia-300 text-fuchsia-900 hover:bg-fuchsia-100 dark:border-stone-700 dark:text-fuchsia-100 dark:hover:bg-stone-900',
  },
  'lash-technician': {
    shell: 'bg-violet-50 text-stone-950 dark:bg-black dark:text-violet-400',
    panel: 'border-violet-200/80 bg-white/90 dark:border-stone-800 dark:bg-black/70',
    accent: 'text-violet-600 dark:text-violet-300',
    button: 'border-violet-300 text-violet-900 hover:bg-violet-100 dark:border-stone-700 dark:text-violet-100 dark:hover:bg-stone-900',
  },
  'makeup-artist': {
    shell: 'bg-rose-50 text-stone-950 dark:bg-black dark:text-rose-400',
    panel: 'border-rose-200/80 bg-white/90 dark:border-stone-800 dark:bg-black/70',
    accent: 'text-rose-600 dark:text-rose-300',
    button: 'border-rose-300 text-rose-900 hover:bg-rose-100 dark:border-stone-700 dark:text-rose-100 dark:hover:bg-stone-900',
  },
}

const providerLabelByType = {
  barber: 'Barber',
  'hair-specialist': 'Hair Specialist',
  'nail-technician': 'Nail Technician',
  'lash-technician': 'Lash Technician',
  'makeup-artist': 'Makeup Artist',
}

function formatAppointment(date = '', time = '') {
  const value = [date, time].filter(Boolean).join(' at ')
  return value || 'Date and time will appear here once saved.'
}

function formatStatus(value = '') {
  const normalizedValue = String(value || 'pending').trim().toLowerCase()
  if (!normalizedValue) return 'Pending'
  return normalizedValue.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())
}

export default function CustomerBookingsHub({ tenant = null, initialProviderType = '' }) {
  const [bookings, setBookings] = useState([])
  const providerType = tenant?.type || initialProviderType || 'barber'
  const tenantSlug = String(tenant?.profile?.slug || '').trim().toLowerCase()
  const theme = themeByProvider[providerType] || themeByProvider.barber

  const loadBookings = useCallback(() => {
    setBookings(getStoredCustomerBookings())
  }, [])

  useEffect(() => {
    loadBookings()
    return subscribeToStoredCustomerBookings((nextBookings) => {
      setBookings(Array.isArray(nextBookings) ? nextBookings : [])
    })
  }, [loadBookings])

  const orderedBookings = useMemo(() => {
    if (!tenantSlug) return bookings

    const matching = []
    const remaining = []

    bookings.forEach((booking) => {
      if (booking.providerSlug === tenantSlug) {
        matching.push(booking)
        return
      }

      remaining.push(booking)
    })

    return [...matching, ...remaining]
  }, [bookings, tenantSlug])

  return (
    <section className={`min-h-screen px-4 py-12 ${theme.shell}`}>
      <div className="mx-auto max-w-5xl space-y-6">
        <section className={`rounded-3xl border p-6 shadow-sm ${theme.panel}`}>
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className={`text-sm font-semibold uppercase tracking-[0.2em] ${theme.accent}`}>Customer bookings</p>
              <h1 className="mt-2 text-3xl font-bold">My bookings</h1>
              <p className="mt-2 max-w-2xl text-sm text-stone-600 dark:text-stone-300">
                Saved booking manager links stay on this device, so customers can reopen appointments even after the booking form clears or a booking gets cancelled.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={loadBookings}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${theme.button}`}
              >
                <RefreshCw size={16} />
                Refresh
              </button>
              <Link href="/book" className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold transition ${theme.button}`}>
                Book another appointment
              </Link>
            </div>
          </div>
        </section>

        {orderedBookings.length === 0 ? (
          <section className={`rounded-3xl border border-dashed p-8 text-center shadow-sm ${theme.panel}`}>
            <CalendarClock className={`mx-auto h-10 w-10 ${theme.accent}`} />
            <h2 className="mt-4 text-xl font-semibold">No saved bookings yet</h2>
            <p className="mt-3 text-sm text-stone-600 dark:text-stone-300">
              Once you finish a booking, the manage link is saved here automatically on this device.
            </p>
          </section>
        ) : (
          <div className="grid gap-4">
            {orderedBookings.map((booking) => {
              const isCurrentStorefront = tenantSlug && booking.providerSlug === tenantSlug
              const providerLabel = providerLabelByType[booking.providerType] || 'Booking'

              return (
                <article key={booking.bookingId || booking.manageLink} className={`rounded-3xl border p-5 shadow-sm ${theme.panel}`}>
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${theme.accent} bg-black/5 dark:bg-white/5`}>
                          {providerLabel}
                        </span>
                        <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700 dark:bg-stone-900 dark:text-stone-200">
                          {formatStatus(booking.status)}
                        </span>
                        {isCurrentStorefront ? (
                          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                            Current storefront
                          </span>
                        ) : null}
                      </div>

                      <div>
                        <h2 className="text-xl font-semibold text-stone-950 dark:text-white">
                          {booking.serviceName || 'Booked appointment'}
                        </h2>
                        <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">
                          {booking.providerName || 'StyleVault provider'}
                        </p>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl bg-black/5 px-4 py-3 text-sm dark:bg-white/5">
                          <p className="text-xs uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">Appointment</p>
                          <p className="mt-1 font-medium">{formatAppointment(booking.appointmentDate, booking.appointmentTime)}</p>
                        </div>
                        <div className="rounded-2xl bg-black/5 px-4 py-3 text-sm dark:bg-white/5">
                          <p className="text-xs uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">Saved link</p>
                          <p className="mt-1 break-all font-medium">{booking.manageLink}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                      <a
                        href={booking.manageLink}
                        className={`inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${theme.button}`}
                      >
                        Open booking
                        <ExternalLink size={16} />
                      </a>
                      {booking.storeUrl ? (
                        <a
                          href={booking.storeUrl}
                          className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:bg-stone-100 dark:border-stone-700 dark:text-stone-100 dark:hover:bg-stone-900"
                        >
                          View storefront
                          <MapPin size={16} />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
