"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Scissors, Sparkles, Zap, ShieldCheck } from "lucide-react"
import UpgradeToProButton from "@/components/pro-upgrade-button"

const barberServices = [
  {
    title: "The Signature Fade",
    desc: "Seamless transitions from skin to length. Includes precision edge-up and cold-compress finish.",
    icon: <Zap size={20} />,
    image: "https://res.cloudinary.com/dnitzkowt/image/upload/v1773867494/qh5pttubqkkkrldyqyyp.jpg",
  },
  {
    title: "Traditional Hot Shave",
    desc: "Straight-razor grooming with essential oil steaming and post-shave skin therapy.",
    icon: <ShieldCheck size={20} />,
    image: "https://res.cloudinary.com/dnitzkowt/image/upload/v1773870515/man_in_the_barbershop__Cute_black_man_makes_a_haircut_in_the_African_salon._Hair_style_ticisu.jpg",
  },
  {
    title: "Beard Sculpting",
    desc: "Anatomical shaping tailored to your jawline. Finished with premium beard butter and steam.",
    icon: <Scissors size={20} />,
    image: "https://res.cloudinary.com/dnitzkowt/image/upload/v1773871353/Full_image_picture_for_wall_3_mpfx0x.jpg",
  },
]

export default function BarberServices() {
  return (
    <section
      id="barber-services"
      className="bg-transparent py-24 text-gray-300 transition-colors dark:bg-stone-950 dark:text-white"
    >
      <div className="mx-auto max-w-7xl px-6">
        
        <div className="mb-20 space-y-4 text-center">
          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-6xl">Mastering the Craft</h2>
          <p className="mx-auto max-w-2xl text-lg font-medium opacity-70">
            Every service is a blueprint for confidence. Explore our technical grooming menu.
          </p>
        </div>

        <div className="space-y-32">
          {barberServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col items-center gap-12 lg:flex-row ${
                index % 2 !== 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image with Sharp Offset Border */}
              <div className="relative w-full lg:w-1/2">
                <div className="absolute -bottom-6 -right-6 h-full w-full rounded-2xl border-2 border-dashed border-stone-400 dark:border-sky-500/30" />
                <div className="relative aspect-video overflow-hidden rounded-2xl border-4 border-white shadow-2xl dark:border-stone-800">
                  <Image src={service.image} alt={service.title} fill className="object-cover" />
                </div>
              </div>

              {/* Text Side */}
              <div className="w-full space-y-6 lg:w-1/2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-stone-900 text-white dark:bg-sky-500 dark:text-black">
                  {service.icon}
                </div>
                <h3 className="text-4xl font-black uppercase tracking-tight">{service.title}</h3>
                <p className="text-xl leading-relaxed opacity-80">{service.desc}</p>
                <ul className="space-y-2 font-bold text-sky-600 dark:text-sky-400">
                  <li className="flex items-center gap-2">/ 45 Minute Duration</li>
                  <li className="flex items-center gap-2">/ Premium Aftercare Included</li>
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hot Pink Upgrade Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-32 rounded-[3rem] bg-stone-900 p-12 text-center text-white dark:bg-white/5 dark:backdrop-blur-xl"
        >
          <Sparkles className="mx-auto mb-6 text-blue-500" size={48} />
          <h2 className="mb-4 text-3xl font-black uppercase tracking-tighter sm:text-5xl">Take Your Brand Pro</h2>
          <p className="mx-auto mb-10 max-w-xl text-lg opacity-70">
            Unlock advanced booking, custom SMS alerts, and personalized client profiles with our Pro Barber suite.
          </p>
          <UpgradeToProButton
            defaultNiche="Barber"
            className="rounded-full bg-yellow-800 px-12 py-5 text-lg font-black uppercase tracking-[0.2em] text-white shadow-2xl shadow-pink-500/40 transition hover:bg-pink-600 hover:scale-105 active:scale-95"
          />
        </motion.div>

      </div>
    </section>
  )
}