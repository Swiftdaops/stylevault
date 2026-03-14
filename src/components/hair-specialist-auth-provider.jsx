"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { getMeHairSpecialist, loginHairSpecialist, logoutHairSpecialist } from '@/lib/hair-specialist-api'

const HairSpecialistAuthContext = createContext({})

export function HairSpecialistAuthProvider({ children, protect = true }) {
  const [user, setUser] = useState(null)
  const [hairSpecialist, setHairSpecialist] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    let mounted = true

    async function init() {
      setLoading(true)
      const me = await getMeHairSpecialist()
      if (!mounted) return

      if (me && me.user) {
        setUser(me.user)
        setHairSpecialist(me.hairSpecialist || null)
      } else {
        setUser(null)
        setHairSpecialist(null)
        if (protect && pathname && pathname.startsWith('/hair-specialists/admin')) {
          router.push('/hair-specialists/login')
        }
      }

      setLoading(false)
    }

    init()
    return () => { mounted = false }
  }, [pathname, protect, router])

  const login = async (email, password) => {
    const res = await loginHairSpecialist(email, password)
    setUser(res?.user || null)
    setHairSpecialist(res?.hairSpecialist || null)
    return res
  }

  const logout = async () => {
    await logoutHairSpecialist()
    setUser(null)
    setHairSpecialist(null)
    router.push('/hair-specialists/login')
  }

  const refresh = async () => {
    const me = await getMeHairSpecialist()
    setUser(me?.user || null)
    setHairSpecialist(me?.hairSpecialist || null)
  }

  return (
    <HairSpecialistAuthContext.Provider value={{ user, hairSpecialist, loading, login, logout, refresh }}>
      {children}
    </HairSpecialistAuthContext.Provider>
  )
}

export function useHairSpecialistAuth() {
  return useContext(HairSpecialistAuthContext)
}

export default HairSpecialistAuthProvider
