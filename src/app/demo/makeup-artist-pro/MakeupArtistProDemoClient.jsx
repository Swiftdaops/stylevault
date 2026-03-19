"use client"

import { useEffect, useRef, useState } from "react"
import MakeupServicesSection from "@/components/makeup-services-section"
import DemoBookingNotice from "../components/DemoBookingNotice"
import ReviewSection from "../components/ReviewSection"
import { motion } from "framer-motion"
import { Sparkles, ArrowRight, Paintbrush } from "lucide-react"

function MakeupHero({ onOpenDemoBookingNotice, showDemoBookingNotice, demoNoticeRef }) {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white dark:bg-slate-900">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://res.cloudinary.com/dnitzkowt/image/upload/v1773935722/makeup_artist_model_ngfjdb.jpg')" }}
      />
      <div className="absolute inset-0 bg-red-100/40 backdrop-blur-md dark:bg-slate-700/80" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-sky-600 shadow-lg backdrop-blur-md dark:bg-slate-800/80 dark:text-sky-400"
          >
            <Sparkles size={14} className="animate-pulse" />
            The Gold Standard of Glam
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl font-black uppercase tracking-tighter text-slate-900 dark:text-white sm:text-8xl lg:text-9xl"
          >
            AURA <br />
            <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent dark:from-red-400 dark:to-red-300">
              BEAUTY
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 max-w-xl text-lg font-medium leading-relaxed text-slate-700 dark:text-slate-200"
          >
            Redefining luxury artistry through luminous skin and precision techniques. Your face is our canvas; your confidence is our masterpiece.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex flex-wrap justify-center gap-4 lg:justify-start"
          >
            <button
              type="button"
              onClick={onOpenDemoBookingNotice}
              className="rounded-full bg-red-900 px-10 py-4 font-black uppercase tracking-widest text-white transition-all hover:scale-105 hover:bg-red-600 dark:bg-red-500 dark:text-slate-900 dark:hover:bg-red-400"
            >
              Book the Look
            </button>
            <button
              type="button"
              onClick={onOpenDemoBookingNotice}
              className="group flex items-center gap-3 rounded-full border border-slate-300 bg-white/20 px-10 py-4 font-black uppercase tracking-widest backdrop-blur-xl transition hover:bg-black dark:border-white/10"
            >
              Portfolio <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          <div ref={demoNoticeRef} className="mt-6 w-full max-w-2xl">
            <DemoBookingNotice isOpen={showDemoBookingNotice} niche="Makeup Artist" />
          </div>

          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="mt-16 flex items-center gap-4 rounded-2xl border border-white/40 bg-white/30 p-4 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-800/40"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500 text-white">
              <Paintbrush />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Certified Artist</p>
              <p className="font-bold">Bridal & Editorial Specialist</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default function MakeupArtistProDemoClient() {
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
      <MakeupHero
        onOpenDemoBookingNotice={openDemoBookingNotice}
        showDemoBookingNotice={showDemoBookingNotice}
        demoNoticeRef={demoNoticeRef}
      />
      <MakeupServicesSection />
      <div className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl pt-16">
          <ReviewSection />
        </div>
      </div>
    </>
  )
}
