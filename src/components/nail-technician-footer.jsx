"use client"

import React, { useEffect, useMemo, useRef, useState } from 'react'

export default function NailTechnicianFooter({ nailTechnician }) {
  const name = nailTechnician?.name || nailTechnician?.businessName || nailTechnician?.slug || 'the nail artist'
  const messages = useMemo(() => [
    `Thank you for visiting ${name}'s studio.`,
    'Your beauty appointment means everything to us.',
    'We look forward to your next flawless set.',
    'Whenever you are ready, your next booking is only a click away.',
  ], [name])

  const [displayedText, setDisplayedText] = useState('')
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let cancelled = false

    const startTyping = async () => {
      for (let m = 0; m < messages.length; m++) {
        const msg = messages[m]
        for (let i = 1; i <= msg.length; i++) {
          if (cancelled) return
          setDisplayedText(msg.slice(0, i))
          const ch = msg[i - 1]
          const delay = ch === ',' || ch === '.' ? 80 : 28
          await new Promise((r) => setTimeout(r, delay))
        }
        if (cancelled) return
        await new Promise((r) => setTimeout(r, 800))
      }
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startTyping()
          observer.disconnect()
        }
      })
    }, { threshold: 0.2 })

    observer.observe(el)

    return () => {
      cancelled = true
      observer.disconnect()
    }
  }, [messages])

  return (
    <footer ref={containerRef} className="border-t border-fuchsia-200/60 bg-white/90 py-10 dark:border-stone-800 dark:bg-stone-900/90">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <p className="mb-3 text-center text-sm font-semibold uppercase tracking-[0.22em] text-stone-500 dark:text-fuchsia-300">{name}</p>
        <div className="text-center text-lg font-medium text-stone-700 dark:text-fuchsia-300">
          <span className="inline-block whitespace-pre-wrap">{displayedText}</span>
          <span className="ml-1 inline-block animate-pulse">|</span>
        </div>
      </div>
    </footer>
  )
}
