"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { getMeNailTechnician, loginNailTechnician, logoutNailTechnician } from '@/lib/nail-technician-api'
import ProviderPushNotificationPrompt from '@/components/provider-push-notification-prompt'
import ProviderLiveNotifications from '@/components/provider-live-notifications'
import { unregisterPushDeviceToken } from '@/lib/push-notifications'
import { connectNailTechnicianSocket, disconnectNailTechnicianSocket } from '@/lib/nail-technician-socket'

const NailTechnicianAuthContext = createContext({})

export function NailTechnicianAuthProvider({ children, protect = true }) {
  const [user, setUser] = useState(null)
  const [nailTechnician, setNailTechnician] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    let mounted = true

    async function init() {
      setLoading(true)
      const me = await getMeNailTechnician()
      if (!mounted) return

      if (me && me.user) {
        setUser(me.user)
        setNailTechnician(me.nailTechnician || null)
      } else {
        setUser(null)
        setNailTechnician(null)
        if (protect && pathname && pathname.startsWith('/nail-technicians/admin')) {
          router.push('/nail-technicians/login')
        }
      }

      setLoading(false)
    }

    init()
    return () => { mounted = false }
  }, [pathname, protect, router])

  const login = async (email, password) => {
    const res = await loginNailTechnician(email, password)
    setUser(res?.user || null)
    setNailTechnician(res?.nailTechnician || null)
    return res
  }

  const logout = async () => {
    try {
      await unregisterPushDeviceToken()
    } catch {
      // ignore push token cleanup failures during logout
    }

    disconnectNailTechnicianSocket()

    await logoutNailTechnician()
    setUser(null)
    setNailTechnician(null)
    router.push('/nail-technicians/login')
  }

  const refresh = async () => {
    const me = await getMeNailTechnician()
    setUser(me?.user || null)
    setNailTechnician(me?.nailTechnician || null)
  }

  return (
    <NailTechnicianAuthContext.Provider value={{ user, nailTechnician, loading, login, logout, refresh }}>
      <ProviderPushNotificationPrompt enabled={Boolean(user)} audienceLabel="Nail Technician" />
      <ProviderLiveNotifications
        enabled={Boolean(user && nailTechnician?._id)}
        providerId={nailTechnician?._id}
        audienceLabel="Nail Technician"
        connectSocket={connectNailTechnicianSocket}
        eventName="nail-technician:data-updated"
        appointmentsPath="/nail-technicians/admin/appointments"
      />
      {children}
    </NailTechnicianAuthContext.Provider>
  )
}

export function useNailTechnicianAuth() {
  return useContext(NailTechnicianAuthContext)
}

export default NailTechnicianAuthProvider
