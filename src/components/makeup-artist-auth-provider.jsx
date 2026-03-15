"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { getMeMakeupArtist, loginMakeupArtist, logoutMakeupArtist } from '@/lib/makeup-artist-api'
import ProviderPushNotificationPrompt from '@/components/provider-push-notification-prompt'
import ProviderLiveNotifications from '@/components/provider-live-notifications'
import { unregisterPushDeviceToken } from '@/lib/push-notifications'
import { connectMakeupArtistSocket, disconnectMakeupArtistSocket } from '@/lib/makeup-artist-socket'

const MakeupArtistAuthContext = createContext({})

export function MakeupArtistAuthProvider({ children, protect = true }) {
  const [user, setUser] = useState(null)
  const [makeupArtist, setMakeupArtist] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    let mounted = true

    async function init() {
      setLoading(true)
      const me = await getMeMakeupArtist()
      if (!mounted) return

      if (me && me.user) {
        setUser(me.user)
        setMakeupArtist(me.makeupArtist || null)
      } else {
        setUser(null)
        setMakeupArtist(null)
        if (protect && pathname && pathname.startsWith('/makeup-artists/admin')) {
          router.push('/makeup-artists/login')
        }
      }

      setLoading(false)
    }

    init()
    return () => { mounted = false }
  }, [pathname, protect, router])

  const login = async (email, password) => {
    const res = await loginMakeupArtist(email, password)
    setUser(res?.user || null)
    setMakeupArtist(res?.makeupArtist || null)
    return res
  }

  const logout = async () => {
    try {
      await unregisterPushDeviceToken()
    } catch {
      // ignore push token cleanup failures during logout
    }

    disconnectMakeupArtistSocket()

    await logoutMakeupArtist()
    setUser(null)
    setMakeupArtist(null)
    router.push('/makeup-artists/login')
  }

  const refresh = async () => {
    const me = await getMeMakeupArtist()
    setUser(me?.user || null)
    setMakeupArtist(me?.makeupArtist || null)
  }

  return (
    <MakeupArtistAuthContext.Provider value={{ user, makeupArtist, loading, login, logout, refresh }}>
      <ProviderPushNotificationPrompt enabled={Boolean(user)} audienceLabel="Makeup Artist" />
      <ProviderLiveNotifications
        enabled={Boolean(user && makeupArtist?._id)}
        providerId={makeupArtist?._id}
        audienceLabel="Makeup Artist"
        connectSocket={connectMakeupArtistSocket}
        eventName="makeup-artist:data-updated"
        appointmentsPath="/makeup-artists/admin/appointments"
      />
      {children}
    </MakeupArtistAuthContext.Provider>
  )
}

export function useMakeupArtistAuth() {
  return useContext(MakeupArtistAuthContext)
}

export default MakeupArtistAuthProvider
