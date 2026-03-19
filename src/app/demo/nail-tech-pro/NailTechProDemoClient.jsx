"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import DemoBookingNotice from "../components/DemoBookingNotice"
import DemoNailServices from "../components/DemoNailServices"
import ReviewSection from "../components/ReviewSection"

export default function NailTechProDemoClient() {
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
    <>
      <section
        className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-stone-950 text-white"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dnitzkowt/image/upload/v1773574325/LASH_MASTER_hvouog.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 mt-10 w-full max-w-6xl px-6">
          <motion.div
            className="grid items-center gap-10 lg:grid-cols-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              <motion.h1
                className="text-4xl font-bold leading-tight md:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Luxe Nail Studio
              </motion.h1>

              <motion.p
                className="max-w-md text-lg text-stone-200"
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
                  className="rounded-full bg-pink-400 px-6 py-3 font-medium text-black transition hover:bg-pink-300"
                >
                  Book Your Appointment
                </button>

                <button
                  onClick={() => document.getElementById("nail-services")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  className="rounded-full border border-pink-400 px-6 py-3 text-white transition hover:bg-pink-400/10"
                >
                  View Services
                </button>
              </motion.div>
            </div>

            <motion.div
              className="rounded-2xl border border-pink-400/30 bg-white/5 p-6 shadow-xl backdrop-blur-xl"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Why Clients Choose Luxe Nail Studio</h3>

                <ul className="space-y-2 text-sm text-stone-200">
                  <li>✔ Creative nail designs & trends</li>
                  <li>✔ Professional polish & gel techniques</li>
                  <li>✔ Custom nail art & 3D designs</li>
                  <li>✔ Client reviews & testimonials</li>
                  <li>✔ Effortless online booking</li>
                </ul>

                <div className="pt-4">
                  <button
                    onClick={openDemoBookingNotice}
                    className="w-full rounded-xl bg-pink-400 py-3 font-medium text-black transition hover:bg-pink-300"
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

      <DemoNailServices />
      <div className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl pt-16">
          <ReviewSection />
        </div>
      </div>
    </>
  )
}
