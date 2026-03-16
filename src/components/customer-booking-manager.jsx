'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { getPublicBooking, getPublicBookingAvailability, updatePublicBooking } from '@/lib/customer-booking-api'
import { buildICS, downloadICS, buildGoogleCalendarUrl, parseDateTime } from '@/lib/calendar'
import { syncStoredCustomerBookingFromPayload } from '@/lib/customer-booking-links'

const themeMap = {
  barber: {
    panel: 'border-orange-200/70 bg-white/90 dark:border-stone-800 dark:bg-black/70',
    accent: 'text-amber-600 dark:text-amber-300',
    badge: 'bg-orange-100 text-stone-900',
  },
  'hair-specialist': {
    panel: 'border-rose-200/70 bg-white/90 dark:border-stone-800 dark:bg-black/70',
    accent: 'text-rose-600 dark:text-rose-300',
    badge: 'bg-rose-100 text-stone-900',
  },
  'nail-technician': {
    panel: 'border-fuchsia-200/70 bg-white/90 dark:border-stone-800 dark:bg-black/70',
    accent: 'text-fuchsia-600 dark:text-fuchsia-300',
    badge: 'bg-fuchsia-100 text-stone-900',
  },
  'lash-technician': {
    panel: 'border-violet-200/70 bg-white/90 dark:border-stone-800 dark:bg-black/70',
    accent: 'text-violet-600 dark:text-violet-300',
    badge: 'bg-violet-100 text-stone-900',
  },
  'makeup-artist': {
    panel: 'border-rose-200/70 bg-white/90 dark:border-stone-800 dark:bg-black/70',
    accent: 'text-rose-600 dark:text-rose-300',
    badge: 'bg-rose-100 text-stone-900',
  },
}

export default function CustomerBookingManager({ bookingId, tenant = null, initialProviderType = '', initialAccessToken = '' }) {
  const searchParams = useSearchParams()
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [draft, setDraft] = useState({ date: '', time: '', status: 'pending' })
  const [bookedTimes, setBookedTimes] = useState([])

  const providerType = initialProviderType || tenant?.type || searchParams.get('provider') || ''
  const accessToken = initialAccessToken || searchParams.get('access') || ''
  const bookingCreated = searchParams.get('created') === '1'
  const emailStatus = searchParams.get('email') || ''
  const theme = themeMap[providerType] || themeMap.barber
  const managerDisplayUrl = useMemo(() => {
    try {
      if (!booking?.manageLink) return ''
      const url = new URL(booking.manageLink)
      return `${url.host}${url.pathname}`
    } catch {
      return ''
    }
  }, [booking?.manageLink])

  const loadBooking = useCallback(async () => {
    if (!bookingId || !providerType || !accessToken) {
      setLoading(false)
      setError('This booking link is missing required details.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const data = await getPublicBooking({ providerType, bookingId, accessToken })
      setBooking(data)
      setDraft({
        date: data?.appointment?.date || '',
        time: data?.appointment?.time || '',
        status: data?.appointment?.status || 'pending',
      })
    } catch (loadError) {
      setError(loadError?.message || 'Unable to load this booking right now.')
    } finally {
      setLoading(false)
    }
  }, [accessToken, bookingId, providerType])

  useEffect(() => {
    loadBooking()
  }, [loadBooking])

  useEffect(() => {
    async function loadAvailability() {
      const providerId = booking?.appointment?.provider?.id
      if (!providerId || !draft.date || !providerType) {
        setBookedTimes([])
        return
      }

      const availability = await getPublicBookingAvailability({
        providerType,
        providerId,
        date: draft.date,
      })

      const nextBookedTimes = Array.isArray(availability?.bookedTimes) ? availability.bookedTimes : []
      const withoutCurrentTime = nextBookedTimes.filter((time) => !(draft.date === booking?.appointment?.date && time === booking?.appointment?.time))
      setBookedTimes(withoutCurrentTime)
    }

    loadAvailability()
  }, [booking?.appointment?.date, booking?.appointment?.provider?.id, booking?.appointment?.time, draft.date, providerType])

  const appointment = booking?.appointment
  const provider = appointment?.provider
  const service = appointment?.service

  useEffect(() => {
    if (!booking?.manageLink) return
    syncStoredCustomerBookingFromPayload(booking)
  }, [booking])

  const canSave = useMemo(() => (
    Boolean(booking?.appointment?.canCustomerEdit) && !saving && draft.date && draft.time
  ), [booking?.appointment?.canCustomerEdit, draft.date, draft.time, saving])

  const bookingLockedMessage = appointment?.status === 'pending'
    ? `${provider?.name || 'This provider'} has not confirmed this booking yet. Once it is confirmed, you will be able to update or cancel it from this page.`
    : appointment?.status === 'cancelled'
      ? 'This booking has been cancelled and can no longer be changed.'
      : 'This booking is completed and can no longer be changed.'

  const handleSave = async () => {
    if (!canSave) return
    if (bookedTimes.includes(draft.time)) {
      setError('That time is already booked. Please choose another slot.')
      return
    }

    setSaving(true)
    setError('')

    try {
      const updated = await updatePublicBooking({
        providerType,
        bookingId,
        accessToken,
        payload: draft,
      })

      setBooking(updated)
      setDraft({
        date: updated?.appointment?.date || '',
        time: updated?.appointment?.time || '',
        status: updated?.appointment?.status || 'pending',
      })
      toast.success('Booking updated', {
        description: updated?.appointment?.status === 'cancelled'
          ? 'Your booking has been cancelled.'
          : 'Your booking changes were saved.',
      })
    } catch (saveError) {
      setError(saveError?.message || 'Unable to update this booking.')
    } finally {
      setSaving(false)
    }
  }

  const handleSetReminder = useCallback(() => {
    if (!appointment) {
      toast.error('Booking details not loaded')
      return
    }

    const start = parseDateTime(appointment?.date, appointment?.time)
    if (!start) {
      toast.error('Booking date/time not available')
      return
    }

    const durationMinutes = Number(appointment?.duration || appointment?.length || service?.duration || 60)
    const end = new Date(start.getTime() + durationMinutes * 60000)

    const title = `${service?.name || 'Appointment'} with ${provider?.name || 'StyleVault'}`
    const description = `Booking reference: ${bookingId}`
    const location = provider?.location || ''
    const uid = `stylevault-${bookingId}@stylevault.app`

    try {
      const ics = buildICS({ uid, title, description, location, startDate: start, endDate: end, alarmMinutes: 30 })
      downloadICS(ics, `stylevault-booking-${bookingId}.ics`)

      if (typeof window !== 'undefined' && window.confirm('Open Google Calendar to add this event there as well?')) {
        const url = buildGoogleCalendarUrl({ title, details: description, location, start, end })
        window.open(url, '_blank')
      }

      toast.success('Reminder file downloaded to your device')
    } catch (err) {
      toast.error('Unable to create calendar reminder')
    }
  }, [appointment, bookingId, provider, service])

  if (loading) {
    return <div className={`rounded-3xl border p-6 shadow-sm ${theme.panel}`}>Loading booking…</div>
  }

  if (error && !booking) {
    return <div className={`rounded-3xl border p-6 shadow-sm ${theme.panel}`}><p className="text-sm text-red-600">{error}</p></div>
  }

  return (
    <div className="space-y-6">
      {bookingCreated ? (
        <section className={`rounded-3xl border p-4 shadow-sm ${theme.panel}`}>
          <p className={`text-sm font-semibold uppercase tracking-[0.2em] ${theme.accent}`}>Booking received</p>
          <p className="mt-2 text-sm text-stone-700 dark:text-stone-200">
            {emailStatus === 'pending'
              ? 'Your booking was saved successfully. Email delivery is still pending, but you can manage this appointment from this page right now.'
              : 'Your booking was saved successfully. A booking email was sent, and you can manage this appointment from this page right now.'}
          </p>
        </section>
      ) : null}

      <section className={`rounded-3xl border p-6 shadow-sm ${theme.panel}`}>
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <p className={`text-sm font-semibold uppercase tracking-[0.2em] ${theme.accent}`}>Booking manager</p>
            <h1 className="mt-2 text-3xl font-bold">{service?.name || 'Appointment'} with {provider?.name || 'StyleVault'}</h1>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">Review your booking, change the date or time, or cancel it from this page.</p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className={`rounded-full px-3 py-1 font-medium ${theme.badge}`}>{appointment?.status || 'pending'}</span>
            {provider?.label ? <span className="rounded-full bg-stone-100 px-3 py-1 font-medium text-stone-800 dark:bg-stone-900 dark:text-stone-200">{provider.label}</span> : null}
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className={`rounded-3xl border p-6 shadow-sm ${theme.panel}`}>
          <h2 className="text-lg font-semibold">Booking details</h2>
          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">Customer</dt>
              <dd className="mt-1 text-sm font-medium">{appointment?.customerName}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">Email</dt>
              <dd className="mt-1 text-sm font-medium">{appointment?.customerEmail}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">Current date</dt>
              <dd className="mt-1 text-sm font-medium">{appointment?.date}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">Current time</dt>
              <dd className="mt-1 text-sm font-medium">{appointment?.time}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">Location</dt>
              <dd className="mt-1 text-sm font-medium">{provider?.location || 'Not provided'}</dd>
            </div>
            {managerDisplayUrl ? (
              <div className="sm:col-span-2">
                <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">Booking manager link</dt>
                <dd className="mt-1 text-sm font-medium">
                  <a href={booking.manageLink} className="text-primary underline underline-offset-4">
                    {managerDisplayUrl}
                  </a>
                </dd>
              </div>
            ) : null}
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">Price</dt>
              <dd className="mt-1 text-sm font-medium">{typeof appointment?.price === 'number' ? new Intl.NumberFormat('en-US', { style: 'currency', currency: provider?.currency || 'USD', maximumFractionDigits: 2 }).format(appointment.price / 100) : '—'}</dd>
            </div>
            {appointment?.selectedPricingOption ? (
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">Pricing option</dt>
                <dd className="mt-1 text-sm font-medium">{appointment.selectedPricingOption}</dd>
              </div>
            ) : null}
            {appointment?.selectedAddOns?.length ? (
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">Add-ons</dt>
                <dd className="mt-1 text-sm font-medium">{appointment.selectedAddOns.join(', ')}</dd>
              </div>
            ) : null}
          </dl>

          <div className="mt-6 flex flex-wrap gap-3 items-center">
            {booking?.storeUrl ? (
              <Link href={booking.storeUrl} className="text-sm font-medium text-primary underline underline-offset-4">Back to storefront</Link>
            ) : null}

            <Button type="button" className="ml-2 rounded-xl" onClick={handleSetReminder} disabled={!appointment?.date || !appointment?.time}>
              Set reminder
            </Button>
          </div>
        </section>

        <section className={`rounded-3xl border p-6 shadow-sm ${theme.panel}`}>
          <h2 className="text-lg font-semibold">Update booking</h2>
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">Need to move this booking? Pick a new date or time, or cancel it.</p>

          {!appointment?.canCustomerEdit ? (
            <div className="mt-5 rounded-2xl border border-dashed border-stone-300 p-4 text-sm text-stone-600 dark:border-stone-700 dark:text-stone-300">{bookingLockedMessage}</div>
          ) : (
            <div className="mt-5 space-y-4">
              <div>
                <label className="block text-sm font-medium">Date</label>
                <input type="date" className="mt-2 h-11 w-full rounded-xl border border-stone-200 bg-white px-4 text-sm dark:border-stone-700 dark:bg-stone-900" value={draft.date} onChange={(event) => setDraft((current) => ({ ...current, date: event.target.value }))} />
              </div>

              <div>
                <label className="block text-sm font-medium">Time</label>
                <input type="time" className="mt-2 h-11 w-full rounded-xl border border-stone-200 bg-white px-4 text-sm dark:border-stone-700 dark:bg-stone-900" value={draft.time} onChange={(event) => setDraft((current) => ({ ...current, time: event.target.value }))} />
                {bookedTimes.length ? <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">Booked times on this day: {bookedTimes.join(', ')}</p> : null}
              </div>

              <div>
                <label className="block text-sm font-medium">Status</label>
                <select className="mt-2 h-11 w-full rounded-xl border border-stone-200 bg-white px-4 text-sm dark:border-stone-700 dark:bg-stone-900" value={draft.status} onChange={(event) => setDraft((current) => ({ ...current, status: event.target.value }))}>
                  <option value="confirmed">Keep booking confirmed</option>
                  <option value="cancelled">Cancel booking</option>
                </select>
              </div>

              {error ? <p className="text-sm text-red-600">{error}</p> : null}

              <Button type="button" className="rounded-xl" disabled={!canSave} onClick={handleSave}>
                {saving ? 'Saving…' : draft.status === 'cancelled' ? 'Cancel booking' : 'Save changes'}
              </Button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
