"use client"

import UpgradeToProButton from "@/components/pro-upgrade-button"
import Image from "next/image"
import { motion } from "framer-motion"
import { Palette, Camera, Heart, Sparkles, Star } from "lucide-react"

const makeupServices = [
  {
    title: "Bridal Couture",
    desc: "Long-wear, camera-ready glam designed to look breathtaking in person and under professional lighting.",
    icon: <Heart size={20} />,
    image: "https://res.cloudinary.com/dnitzkowt/image/upload/v1773936161/jpg_6_au7alx.jpg",
  },
  {
    title: "Editorial & Commercial",
    desc: "High-concept artistry for brand campaigns, magazines, and creative runway looks.",
    icon: <Camera size={20} />,
    image: "https://res.cloudinary.com/dnitzkowt/image/upload/v1773936341/Beauty_posing_ideas_iirou0.jpg",
  },
  {
    title: "1-on-1 Masterclass",
    desc: "A personalized session covering product knowledge, skin prep, and the signature Aura glow technique.",
    icon: <Palette size={20} />,
    image: "https://res.cloudinary.com/dnitzkowt/image/upload/v1773936430/makeup_cfdgci.jpg",
  },
]

export default function MakeupServicesSection() {
  return (
    <section className="bg-red-50 py-24 text-slate-900 transition-colors duration-500 dark:bg-red-700 dark:text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-24 flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="text-5xl font-black uppercase tracking-tighter sm:text-7xl">Signature Aura</h2>
            <p className="mt-4 text-xl font-medium opacity-70">Curated services to elevate every occasion.</p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-slate-300 px-6 py-2 dark:border-white/10">
            <Star className="text-yellow-500" fill="currentColor" size={16} />
            <span className="text-sm font-bold uppercase tracking-widest">Top Rated Artist</span>
          </div>
        </div>

        <div className="space-y-32">
          {makeupServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col items-center gap-16 lg:flex-row ${
                index % 2 !== 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="relative w-full lg:w-1/2">
                <div className="absolute -inset-4 rounded-[3rem] bg-sky-400 opacity-20 blur-3xl dark:bg-indigo-500/20" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border-[12px] border-white shadow-2xl dark:border-slate-800">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-1000 hover:scale-110"
                  />
                </div>
              </div>

              <div className="w-full space-y-8 lg:w-1/2">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-900 text-white shadow-xl dark:bg-sky-500 dark:text-slate-900">
                  {service.icon}
                </div>
                <h3 className="text-5xl font-black uppercase tracking-tight sm:text-6xl">
                  {service.title}
                </h3>
                <p className="text-xl font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                  {service.desc}
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-[2px] w-12 bg-sky-500" />
                  <span className="text-sm font-black uppercase tracking-[0.3em] text-sky-600 dark:text-sky-400">
                    Premium Artistry
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-40 rounded-[4rem] bg-slate-900 p-12 text-center text-white shadow-2xl dark:bg-white/5 dark:backdrop-blur-2xl"
        >
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-pink-500/30 bg-pink-500/10">
            <Sparkles className="text-pink-500" size={32} />
          </div>
          <h2 className="text-4xl font-black uppercase tracking-tighter md:text-7xl">Become a Pro Artist</h2>
          <p className="mx-auto mb-12 mt-6 max-w-2xl text-lg font-medium opacity-70">
            Unlock professional-grade booking, client consultation forms, and a luxury digital storefront that reflects your unique aura.
          </p>
          <UpgradeToProButton
            label="Upgrade to Pro"
            defaultNiche="Makeup Artist"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-pink-500 px-12 py-5 text-lg font-black uppercase tracking-[0.2em] text-white shadow-2xl shadow-pink-500/40 transition-all hover:scale-105 hover:bg-pink-600 active:scale-95"
          />
        </motion.div>
      </div>
    </section>
  )
}
