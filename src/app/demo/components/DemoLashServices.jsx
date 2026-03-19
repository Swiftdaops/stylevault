"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Eye, Sparkles, Droplets, Heart, ArrowRight } from "lucide-react"
import DemoBookingNotice from "./DemoBookingNotice"

const lashServices = [
  {
    title: "Classic Silk Set",
    desc: "A meticulous 1:1 application for a natural, effortless look. Perfect for daily elegance and first-timers.",
    icon: <Eye size={20} />,
    image: "https://res.cloudinary.com/dnitzkowt/image/upload/v1773910293/Beauty_para_lashstudiouy____closeup_beauty_retouch_highend_lashes_photographer_uruguay_qhblpy.jpg",
  },
  {
    title: "Mega Volume Glam",
    desc: "Hand-crafted fans applied to every healthy natural lash. Created for maximum drama and high-impact density.",
    icon: <Sparkles size={20} />,
    image: "https://res.cloudinary.com/dnitzkowt/image/upload/v1773910097/__22_sad1nt.jpg",
  },
  {
    title: "Lash Lift & Keratin Tint",
    desc: "The 'no-extension' extension. We curl and darken your natural lashes from the root for a 6-8 week maintenance-free glow.",
    icon: <Droplets size={20} />,
    image: "https://res.cloudinary.com/dnitzkowt/image/upload/v1773910147/Lashlifting_mecajb.jpg",
  },
]

export default function LashTechServices() {
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
    <section className="bg-[#9D8189] py-24 text-white transition-colors duration-500 dark:bg-stone-950">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-pink-200 opacity-80">The Art of the Gaze</span>
          <h2 className="mt-4 text-5xl font-extralight uppercase tracking-tighter sm:text-7xl">
            Lush <span className="font-serif italic">Pretty</span> Lash
          </h2>
          <div className="mt-6 h-px w-32 bg-white/30 mx-auto" />
        </motion.div>

        {/* Services List */}
        <div className="space-y-40">
          {lashServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`flex flex-col items-center gap-16 lg:flex-row ${
                index % 2 !== 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image Side - Curved "Eye-Shape" Masking */}
              <div className="relative w-full lg:w-3/5">
                <div className="group relative aspect-video overflow-hidden rounded-[4rem] rounded-tr-none rounded-bl-none border border-white/20 shadow-2xl">
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-pink-900/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                {/* Decorative Element */}
                <div className="absolute -top-6 -left-6 hidden h-24 w-24 items-center justify-center rounded-full bg-white/10 backdrop-blur-md lg:flex">
                  <Heart className="text-pink-200" fill="currentColor" size={32} />
                </div>
              </div>

              {/* Text Side */}
              <div className="w-full space-y-6 lg:w-2/5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
                  {service.icon}
                </div>
                <h3 className="text-4xl font-light tracking-tight md:text-5xl">
                  {service.title}
                </h3>
                <p className="text-lg leading-relaxed text-pink-50 font-light italic">
                  &ldquo;{service.desc}&rdquo;
                </p>
                
                <div className="flex items-center gap-8 pt-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-pink-200">Price From</p>
                    <p className="text-2xl font-bold">$120</p>
                  </div>
                  <div className="h-10 w-px bg-white/20" />
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-pink-200">Duration</p>
                    <p className="text-2xl font-bold">2.5 hrs</p>
                  </div>
                </div>

                <button
                  onClick={openDemoBookingNotice}
                  className="group mt-8 flex items-center gap-3 text-sm font-bold uppercase tracking-widest transition-all hover:gap-5"
                >
                  Secure Booking <ArrowRight size={18} className="text-pink-300" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div ref={demoNoticeRef} className="mt-12">
          <DemoBookingNotice isOpen={showDemoBookingNotice} niche="Lash Technician" />
        </div>

        {/* Upgrade to Pro CTA */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="mt-40 rounded-[4rem] bg-stone-950/40 p-16 text-center border border-white/10 backdrop-blur-2xl"
        >
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-pink-500/20 mb-8 border border-pink-500/30">
                <Sparkles className="text-pink-400" size={32} />
            </div>
            <h2 className="text-4xl font-bold mb-6 tracking-tighter md:text-6xl">Elevate Your Studio</h2>
            <p className="mb-12 max-w-xl mx-auto text-pink-100/70 text-lg font-light">
                Manage your lash inventory, send automatic aftercare SMS, and showcase your portfolio with Pro.
            </p>
            <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-pink-500 px-12 py-5 font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-pink-600 hover:scale-105 shadow-2xl shadow-pink-500/50">
                Upgrade to Pro
            </button>
        </motion.div>
      </div>
    </section>
  )
}