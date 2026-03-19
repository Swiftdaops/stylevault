"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import DemoBookingNotice from "../components/DemoBookingNotice"
import DemoLashServices from "../components/DemoLashServices"
import ReviewSection from "../components/ReviewSection"

export default function LashTechProDemoClient() {
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
            "url('https://res.cloudinary.com/dnitzkowt/image/upload/v1773874778/__21_zgnzz6.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 w-full max-w-6xl px-6">
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
                Lush Pretty Lash
              </motion.h1>

              <motion.p
                className="max-w-md text-lg text-stone-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Elevate your lash game with premium extensions, lifts, and care that leave every client feeling confident and radiant.
              </motion.p>

              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <button
                  onClick={openDemoBookingNotice}
                  className="rounded-full bg-rose-400 px-6 py-3 font-medium text-black transition hover:bg-rose-300"
                >
                  Book Your Lash Appointment
                </button>

                <button
                  onClick={() => document.getElementById("lash-services")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  className="rounded-full border border-rose-400 px-6 py-3 text-white transition hover:bg-rose-400/10"
                >
                  View Services
                </button>
              </motion.div>
            </div>

            <motion.div
              className="rounded-2xl border border-rose-400/30 bg-white/5 p-6 shadow-xl backdrop-blur-xl"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Why Clients Love Lush Pretty Lash</h3>

                <ul className="space-y-2 text-sm text-stone-200">
                  <li>✔ Premium lash extensions & lifts</li>
                  <li>✔ Certified lash technicians</li>
                  <li>✔ Customized lash designs</li>
                  <li>✔ Client reviews & testimonials</li>
                  <li>✔ Easy online booking</li>
                </ul>

                <div className="pt-4">
                  <button
                    onClick={openDemoBookingNotice}
                    className="w-full rounded-xl bg-rose-400 py-3 font-medium text-black transition hover:bg-rose-300"
                  >
                    Reserve Appointment
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div ref={demoNoticeRef} className="mt-8">
            <DemoBookingNotice isOpen={showDemoBookingNotice} niche="Lash Technician" />
          </div>
        </div>
      </section>

      <DemoLashServices />
      <ReviewSection />
    </>
  )
}
