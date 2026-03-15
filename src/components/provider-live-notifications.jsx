"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

function buildAppointmentDescription(payload = {}, audienceLabel = 'Provider') {
  const customerName = payload?.customerName || 'A client'
  const serviceName = payload?.serviceName || 'a service'
  const date = payload?.appointmentDate || ''
  const time = payload?.appointmentTime || ''

  const when = [date, time].filter(Boolean).join(' at ')
  if (when) {
    return `${customerName} booked ${serviceName} on ${when}.`
  }

  return `${customerName} booked ${serviceName} with your ${audienceLabel.toLowerCase()} profile.`
}

export default function ProviderLiveNotifications({
  enabled = false,
  providerId = '',
  audienceLabel = 'Provider',
  connectSocket,
  eventName = '',
  appointmentsPath = '/',
}) {
  const router = useRouter()

  useEffect(() => {
    if (!enabled || !providerId || !eventName || typeof connectSocket !== 'function') {
      return undefined
    }

    const socket = connectSocket(providerId)
    if (!socket) {
      return undefined
    }

    const handleUpdate = (payload) => {
      if (payload?.type !== 'appointment' || payload?.action !== 'created') {
        return
      }

      toast.success('New appointment received', {
        description: buildAppointmentDescription(payload, audienceLabel),
        action: {
          label: 'View',
          onClick: () => router.push(appointmentsPath),
        },
      })
    }

    socket.on(eventName, handleUpdate)

    return () => {
      socket.off(eventName, handleUpdate)
    }
  }, [appointmentsPath, audienceLabel, connectSocket, enabled, eventName, providerId, router])

  return null
}
