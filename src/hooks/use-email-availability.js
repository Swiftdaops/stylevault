'use client'

import { useRef, useState } from 'react'

const INITIAL_STATUS = {
  checking: false,
  available: null,
  message: '',
}

export function useEmailAvailability({ checkAvailability, setFieldError }) {
  const requestIdRef = useRef(0)
  const [emailAvailability, setEmailAvailability] = useState(INITIAL_STATUS)

  const resetEmailAvailability = () => {
    requestIdRef.current += 1
    setEmailAvailability(INITIAL_STATUS)
  }

  const checkEmailAvailability = async (email) => {
    const normalizedEmail = String(email || '').trim().toLowerCase()
    if (!normalizedEmail) {
      resetEmailAvailability()
      return true
    }

    const requestId = requestIdRef.current + 1
    requestIdRef.current = requestId
    setEmailAvailability({ checking: true, available: null, message: 'Checking email address…' })

    try {
      const result = await checkAvailability(normalizedEmail)
      if (requestId !== requestIdRef.current) {
        return Boolean(result?.available)
      }

      if (result?.available) {
        setFieldError?.('email', '')
        setEmailAvailability({ checking: false, available: true, message: result?.message || 'Email is available.' })
        return true
      }

      const message = result?.message || 'This email is already registered.'
      setFieldError?.('email', message)
      setEmailAvailability({ checking: false, available: false, message })
      return false
    } catch {
      if (requestId === requestIdRef.current) {
        setEmailAvailability(INITIAL_STATUS)
      }
      return true
    }
  }

  return {
    emailAvailability,
    checkEmailAvailability,
    resetEmailAvailability,
  }
}

export default useEmailAvailability
