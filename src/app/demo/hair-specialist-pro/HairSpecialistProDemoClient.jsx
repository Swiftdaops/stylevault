"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import DemoBookingNotice from "../components/DemoBookingNotice"
import DemoHairSpecialistServices from "../components/DemoHairSpecialistServices"
import ReviewSection from "../components/ReviewSection"

export default function HairSpecialistProDemoClient() {
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
            "url('https://res.cloudinary.com/dnitzkowt/image/upload/v1773921830/jpg_mwkyrr.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

        <div className="relative z-10 w-full max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid items-center gap-10 lg:grid-cols-2"
          >
            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold leading-tight md:text-6xl"
              >
                Jennie&apos;s Hairs Collection
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="max-w-md text-lg text-stone-200"
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
                  onClick={() => document.getElementById("mini-shop")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  className="rounded-full bg-red-400 px-6 py-3 font-medium text-black transition hover:bg-red-300"
                >
                  Shop Collection
                </button>

                <button
                  onClick={openDemoBookingNotice}
                  className="rounded-full border border-red-400 px-6 py-3 text-white transition hover:bg-sky-400/10"
                >
                  Book Consultation
                </button>
              </motion.div>

              <div ref={demoNoticeRef}>
                <DemoBookingNotice isOpen={showDemoBookingNotice} niche="Hair Specialist" />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="rounded-2xl border border-red-400/30 bg-white/5 p-6 shadow-xl"
            >
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Why Choose Jennie&apos;s Hairs</h3>

                <ul className="space-y-2 text-sm text-stone-200">
                  <li>✔ Premium quality products</li>
                  <li>✔ Professional styling guides</li>
                  <li>✔ Customer reviews & testimonials</li>
                  <li>✔ Easy online booking</li>
                  <li>✔ Exclusive hair care kits</li>
                </ul>

                <div className="mb-10 pt-4">
                  <button
                    onClick={openDemoBookingNotice}
                    className="w-full rounded-xl bg-pink-500 py-3 font-medium text-black transition hover:bg-pink-300"
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
