"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { getMe, loginBarber, logoutBarber } from '@/lib/barber-api'

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
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

export default AuthProvider
