"use client"

import React, { useEffect, useRef, useState } from 'react'

export default function HairSpecialistFooter({ hairSpecialist }) {
  const name = hairSpecialist?.name || 'the stylist'
  const messages = [
  `Thank you for visiting ${name}'s salon.`,
  "Your time and trust mean everything to us.",
  "We look forward to welcoming you again soon.",
  "Whenever you are ready, your next appointment is only a click away."
]

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
          // typing speed
          // slightly slower for punctuation
          const ch = msg[i - 1]
          const delay = ch === ',' || ch === '.' ? 80 : 28
          // eslint-disable-next-line no-await-in-loop
          await new Promise((r) => setTimeout(r, delay))
        }
        if (cancelled) return
        // pause between messages
        // eslint-disable-next-line no-await-in-loop
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
  }, [name])

  return (
    <footer ref={containerRef} className="border-t border-rose-200/60 bg-white/90 dark:bg-stone-900/90 dark:border-stone-800 py-10">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center text-lg font-medium text-stone-700 dark:text-rose-300">
          <span className="inline-block whitespace-pre-wrap">{displayedText}</span>
          <span className="inline-block ml-1 animate-pulse">|</span>
        </div>
      </div>
    </footer>
  )
}
