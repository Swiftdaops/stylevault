"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import DemoBookingNotice from "../components/DemoBookingNotice"
import DemoHairSpecialistServices from "../components/DemoHairSpecialistServices"
import ReviewSection from "../components/ReviewSection"

export default function JennieHero() {
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
        className="relative min-h-screen w-full flex items-center justify-center bg-stone-950 text-white overflow-hidden"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dnitzkowt/image/upload/v1773906368/Creative_branding_session_w__euphoricstylez_%EF%B8%8F____._._Studio__areafourtwelve__.__saviom.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        <div className="relative z-10 max-w-6xl px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid gap-10 lg:grid-cols-2 items-center"
          >
            {/* LEFT: Text */}
            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold leading-tight"
              >
                Jennie&apos;s Hairs Collection
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-stone-200 text-lg max-w-md"
              >
                Showcase premium hair products, styling expertise, and professional service in a polished, high-end storefront that builds trust from the first click.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex gap-4"
              >
                <button
                  onClick={() => document.getElementById('mini-shop')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="px-6 py-3 rounded-full bg-red-400 text-black font-medium hover:bg-red-300 transition"
                >
                  Shop Collection
                </button>

                <button
                  onClick={openDemoBookingNotice}
                  className="px-6 py-3 rounded-full border border-red-400 text-white hover:bg-sky-400/10 transition"
                >
                  Book Consultation
                </button>
              </motion.div>

              <div ref={demoNoticeRef}>
                <DemoBookingNotice isOpen={showDemoBookingNotice} niche="Hair Specialist" />
              </div>
            </div>

            {/* RIGHT: Glass Card */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className=" bg-white/5 border border-red-400/30 rounded-2xl p-6 shadow-xl"
            >
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Why Choose Jennie&apos;s Hairs</h3>

                <ul className="text-sm text-stone-200 space-y-2">
                  <li>✔ Premium quality products</li>
                  <li>✔ Professional styling guides</li>
                  <li>✔ Customer reviews & testimonials</li>
                  <li>✔ Easy online booking</li>
                  <li>✔ Exclusive hair care kits</li>
                </ul>

                <div className="pt-4">
                  <button
                    onClick={openDemoBookingNotice}
                    className="w-full py-3 rounded-xl bg-pink-500 text-black font-medium hover:bg-pink-300 transition"
                  >
                    Reserve Your Consultation
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <DemoHairSpecialistServices />

      <div className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl pt-16">
          <ReviewSection />
        </div>
      </div>
    </>
  )
}