"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { getMe, loginBarber, logoutBarber } from '@/lib/barber-api'
import ProviderPushNotificationPrompt from '@/components/provider-push-notification-prompt'
import ProviderLiveNotifications from '@/components/provider-live-notifications'
import { unregisterPushDeviceToken } from '@/lib/push-notifications'
import { connectBarberSocket, disconnectBarberSocket } from '@/lib/barber-socket'

const AuthContext = createContext({})

export function AuthProvider({ children, protect = true }) {
  const [user, setUser] = useState(null)
  const [barber, setBarber] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    let mounted = true

    async function init() {
      setLoading(true)
      const me = await getMe()
      if (!mounted) return

      if (me && me.user) {
        setUser(me.user)
        setBarber(me.barber || null)
      } else {
        setUser(null)
        setBarber(null)
        if (protect && pathname && pathname.startsWith('/barbers/admin')) {
          router.push('/barbers/login')
        }
      }

      setLoading(false)
    }

    init()
    return () => { mounted = false }
  }, [router, protect, pathname])

  const login = async (email, password) => {
    const res = await loginBarber(email, password)
    setUser(res?.user || null)
    setBarber(res?.barber || null)
    return res
  }

  const logout = async () => {
    try {
      await unregisterPushDeviceToken()
    } catch {
      // ignore push token cleanup failures during logout
    }

    disconnectBarberSocket()

    await logoutBarber()
    setUser(null)
    setBarber(null)
    router.push('/barbers/login')
  }

  const refresh = async () => {
    const me = await getMe()
    setUser(me?.user || null)
    setBarber(me?.barber || null)
  }

  return (
    <AuthContext.Provider value={{ user, barber, loading, login, logout, refresh }}>
      <ProviderPushNotificationPrompt enabled={Boolean(user)} audienceLabel="Barber" />
      <ProviderLiveNotifications
        enabled={Boolean(user && barber?._id)}
        providerId={barber?._id}
        audienceLabel="Barber"
        connectSocket={connectBarberSocket}
        eventName="barber:data-updated"
        appointmentsPath="/barbers/admin/appointments"
      />
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

export default AuthProvider
