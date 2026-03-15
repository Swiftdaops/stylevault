"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { getMeLashTechnician, loginLashTechnician, logoutLashTechnician } from '@/lib/lash-technician-api'
import ProviderPushNotificationPrompt from '@/components/provider-push-notification-prompt'
import ProviderLiveNotifications from '@/components/provider-live-notifications'
import { unregisterPushDeviceToken } from '@/lib/push-notifications'
import { connectLashTechnicianSocket, disconnectLashTechnicianSocket } from '@/lib/lash-technician-socket'

const LashTechnicianAuthContext = createContext({})

export function LashTechnicianAuthProvider({ children, protect = true }) {
  const [user, setUser] = useState(null)
  const [lashTechnician, setLashTechnician] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    let mounted = true

    async function init() {
      setLoading(true)
      const me = await getMeLashTechnician()
      if (!mounted) return

      if (me && me.user) {
        setUser(me.user)
        setLashTechnician(me.lashTechnician || null)
      } else {
        setUser(null)
        setLashTechnician(null)
        if (protect && pathname && pathname.startsWith('/lash-technicians/admin')) {
          router.push('/lash-technicians/login')
        }
      }

      setLoading(false)
    }

    init()
    return () => { mounted = false }
  }, [pathname, protect, router])

  const login = async (email, password) => {
    const res = await loginLashTechnician(email, password)
    setUser(res?.user || null)
    setLashTechnician(res?.lashTechnician || null)
    return res
  }

  const logout = async () => {
    try {
      await unregisterPushDeviceToken()
    } catch {
      // ignore push token cleanup failures during logout
    }

    disconnectLashTechnicianSocket()

    await logoutLashTechnician()
    setUser(null)
    setLashTechnician(null)
    router.push('/lash-technicians/login')
  }

  const refresh = async () => {
    const me = await getMeLashTechnician()
    setUser(me?.user || null)
    setLashTechnician(me?.lashTechnician || null)
  }

  return (
    <LashTechnicianAuthContext.Provider value={{ user, lashTechnician, loading, login, logout, refresh }}>
      <ProviderPushNotificationPrompt enabled={Boolean(user)} audienceLabel="Lash Technician" />
      <ProviderLiveNotifications
        enabled={Boolean(user && lashTechnician?._id)}
        providerId={lashTechnician?._id}
        audienceLabel="Lash Technician"
        connectSocket={connectLashTechnicianSocket}
        eventName="lash-technician:data-updated"
        appointmentsPath="/lash-technicians/admin/appointments"
      />
      {children}
    </LashTechnicianAuthContext.Provider>
  )
}

export function useLashTechnicianAuth() {
  return useContext(LashTechnicianAuthContext)
}

export default LashTechnicianAuthProvider
