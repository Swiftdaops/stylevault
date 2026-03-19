"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"

const servicesList = [
  {
    title: "Wig Revamp & Styling",
    description: "Breath new life into your favorite units with professional cleaning, plucking, and restyling.",
    image: "https://res.cloudinary.com/dnitzkowt/image/upload/v1773873328/%D0%A3%D0%BA%D0%BB%D0%B0%D0%B4%D0%BA%D0%B8_dennuk.jpg",
  },
  {
    title: "Custom Wig Install",
    description: "Flawless, melt-into-skin lace installations tailored to your unique hairline and face shape.",
    image: "https://res.cloudinary.com/dnitzkowt/image/upload/v1773545567/When_y_uc2gp4.jpg",
  },
  {
    title: "Silk Press & Blowouts",
    description: "Get that signature glass-hair finish without compromising the health of your natural curls.",
    image: "https://res.cloudinary.com/dnitzkowt/image/upload/v1773873328/%D0%A3%D0%BA%D0%BB%D0%B0%D0%B4%D0%BA%D0%B8_dennuk.jpg",
  },
  {
    title: "Color Correction & Highlights",
    description: "From subtle balayage to bold transformations, we prioritize hair integrity and vibrant results.",
    image: "https://res.cloudinary.com/dnitzkowt/image/upload/v1773545567/When_y_uc2gp4.jpg",
  },
]

export default function RedesignedServices() {
  return (
    <section id="mini-shop" className="bg-orange-100 text-stone-950 transition-colors duration-500 dark:bg-stone-950 dark:text-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl font-black uppercase tracking-tighter md:text-6xl">
            Signature Services
          </h2>
          <div className="mt-4 h-1.5 w-24 bg-pink-500 mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-12">
          {servicesList.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className={`flex flex-col items-center gap-8 md:flex-row ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image Side */}
              <div className="w-full md:w-1/2">
                <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl border-4 border-white/20 dark:border-stone-800 shadow-2xl">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              </div>

              {/* Text Side */}
              <div className="w-full md:w-1/2 space-y-4 px-4">
                <span className="text-sm font-bold uppercase tracking-widest text-pink-600 dark:text-pink-400">
                  0{index + 1} {"//"}
                </span>
                <h3 className="text-3xl font-bold leading-tight md:text-4xl">
                  {service.title}
                </h3>
                <p className="text-lg opacity-80 leading-relaxed font-medium">
                  {service.description || "Premium styling using industry-leading techniques and high-end products for a lasting finish."}
                </p>
                <div className="pt-4">
                    <button className="group flex items-center gap-2 font-bold uppercase tracking-wider text-sm">
                        View Details 
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Upgrade to Pro Button Section */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="mt-32 flex flex-col items-center rounded-[3rem] bg-stone-900/5 dark:bg-white/5 p-12 text-center border border-white/20 backdrop-blur-sm"
        >
            <Sparkles className="h-10 w-10 text-pink-500 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Want to unlock the full potential?</h3>
            <p className="mb-8 max-w-md opacity-70">
                Get access to advanced analytics, custom branding, and priority booking features.
            </p>
            <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-pink-500 px-10 py-4 font-black uppercase tracking-widest text-white transition-all hover:bg-pink-600 hover:scale-105 active:scale-95 shadow-xl shadow-pink-500/30">
                Upgrade to Pro
            </button>
        </motion.div>
      </div>
    </section>
  )
}