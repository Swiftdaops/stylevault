"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import DemoBookingNotice from "../components/DemoBookingNotice"

export default function NailTechHero() {
  const [showDemoBookingNotice, setShowDemoBookingNotice] = useState(false)
  const demoNoticeRef = useRef(null)

  useEffect(() => {
    if (showDemoBookingNotice) {
      demoNoticeRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }
  }, [showDemoBookingNotice])

  const openDemoBookingNotice = () => {
    if (showDemoBookingNotice) {
      demoNoticeRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
      return
    }

    setShowDemoBookingNotice(true)
  }

  return (
    <section
      className="relative min-h-screen w-full flex items-center justify-center bg-stone-950 text-white overflow-hidden"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dnitzkowt/image/upload/v1773877500/nail-tech-demo-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-6xl px-6 w-full">
        <motion.div
          className="grid gap-10 lg:grid-cols-2 items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* LEFT: Text */}
          <div className="space-y-6">
            <motion.h1
              className="text-4xl md:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Luxe Nail Studio
            </motion.h1>

            <motion.p
              className="text-stone-200 text-lg max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Elevate your nail services with a premium storefront that showcases your artistry, styles, and booking options in one polished experience.
            </motion.p>

            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <button
                onClick={openDemoBookingNotice}
                className="px-6 py-3 rounded-full bg-pink-400 text-black font-medium hover:bg-pink-300 transition"
              >
                Book Your Appointment
              </button>

              <button className="px-6 py-3 rounded-full border border-pink-400 text-white hover:bg-pink-400/10 transition">
                View Services
              </button>
            </motion.div>
          </div>

          {/* RIGHT: Glass Card */}
          <motion.div
            className="backdrop-blur-xl bg-white/5 border border-pink-400/30 rounded-2xl p-6 shadow-xl"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <div className="space-y-4">
              <h3 className="text-xl font-medium">Why Clients Choose Luxe Nail Studio</h3>

              <ul className="text-sm text-stone-200 space-y-2">
                <li>✔ Creative nail designs & trends</li>
                <li>✔ Professional polish & gel techniques</li>
                <li>✔ Custom nail art & 3D designs</li>
                <li>✔ Client reviews & testimonials</li>
                <li>✔ Effortless online booking</li>
              </ul>

              <div className="pt-4">
                <button
                  onClick={openDemoBookingNotice}
                  className="w-full py-3 rounded-xl bg-pink-400 text-black font-medium hover:bg-pink-300 transition"
                >
                  Reserve Your Spot
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div ref={demoNoticeRef} className="mt-8">
          <DemoBookingNotice isOpen={showDemoBookingNotice} niche="Nail Technician" />
        </div>
      </div>
    </section>
  )
}