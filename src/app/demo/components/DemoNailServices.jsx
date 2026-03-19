"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Gem, Palette, Sparkles, Waves } from "lucide-react"
import UpgradeToProButton from "@/components/pro-upgrade-button"

const nailServices = [
  {
    title: "Signature Gel Manicure",
    description: "A glossy, chip-resistant manicure with detailed cuticle prep, shaping, and a flawless salon finish.",
    icon: <Sparkles size={20} />,
    image: "https://res.cloudinary.com/dnitzkowt/image/upload/v1773923682/jpg_4_abyist.jpg",
    details: ["75 min experience", "Strengthening base included"],
  },
  {
    title: "Sculpted Acrylic Set",
    description: "Custom-shaped acrylic extensions tailored for clean structure, durability, and a soft luxury look.",
    icon: <Gem size={20} />,
    image: "https://res.cloudinary.com/dnitzkowt/image/upload/v1773923895/Nail_artist_at_work_with_luxury_details_idheka.jpg",
    details: ["Custom length & shape", "Refill-ready finish"],
  },
  {
    title: "Luxury Spa Pedicure",
    description: "Refresh tired feet with exfoliation, hydration, massage, and polished finishing touches for total relaxation.",
    icon: <Waves size={20} />,
    image: "https://res.cloudinary.com/dnitzkowt/image/upload/v1773923999/jpg_5_tkkfaw.jpg",
    details: ["Hot towel ritual", "Heel smoothing treatment"],
  },
  {
    title: "Custom Nail Art Design",
    description: "From chrome accents to hand-drawn details, create statement sets that match your mood, event, or brand aesthetic.",
    icon: <Palette size={20} />,
    image: "https://res.cloudinary.com/dnitzkowt/image/upload/v1773923842/nailsbysoftthang_xijvlp.jpg",
    details: ["Trend-led design options", "Perfect for events & content"],
  },
]

export default function DemoNailServices() {
  return (
    <section
      id="nail-services"
      className="bg-linear-to-b from-stone-950 via-[#24111a] to-stone-950 px-4 py-24 text-white sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/20 bg-pink-400/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.28em] text-pink-200">
            <Sparkles className="h-3.5 w-3.5" />
            Nail service menu
          </span>
          <h2 className="mt-6 text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl">
            Signature Nail Experiences
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-pink-50/70 sm:text-lg">
            Showcase your most-booked manicures, pedicures, extensions, and nail art services in a polished layout clients can browse instantly.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {nailServices.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="group overflow-hidden rounded-4xl border border-white/10 bg-white/5 shadow-2xl shadow-black/20 backdrop-blur-sm"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-stone-950/20 to-transparent" />
                <div className="absolute left-5 top-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-black/35 text-pink-200 backdrop-blur-md">
                  {service.icon}
                </div>
              </div>

              <div className="space-y-5 p-6 sm:p-7">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-stone-300 sm:text-base">
                    {service.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {service.details.map((detail) => (
                    <span
                      key={detail}
                      className="rounded-full border border-pink-400/20 bg-pink-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-pink-100"
                    >
                      {detail}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 rounded-[2.5rem] border border-pink-400/15 bg-white/5 p-10 text-center backdrop-blur-xl sm:p-14"
        >
          <Sparkles className="mx-auto mb-6 h-10 w-10 text-pink-300" />
          <h3 className="text-3xl font-black tracking-tight sm:text-4xl">Turn your nail portfolio into a booking machine</h3>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-pink-50/70 sm:text-base">
            Unlock premium booking flows, stronger branding, custom service showcases, and product sales tools with the full Pro experience.
          </p>
          <div className="mt-8 flex justify-center">
            <UpgradeToProButton
              defaultNiche="Nail Technician"
              className="inline-flex items-center justify-center rounded-full bg-pink-400 px-10 py-4 text-sm font-black uppercase tracking-[0.24em] text-black shadow-xl shadow-pink-500/30 transition hover:bg-pink-300 hover:scale-105 active:scale-95"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}