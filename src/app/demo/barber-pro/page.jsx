"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock, Scissors } from "lucide-react";
import CrownFadeReviews from "../components/CrownFadeReviews";
import DemoBookingNotice from "../components/DemoBookingNotice";
import DemoBarberServices from "../components/DemoBarberServices";

export default function BarberHero() {
  const [showDemoBookingNotice, setShowDemoBookingNotice] = useState(false);
  const demoNoticeRef = useRef(null);

  useEffect(() => {
    if (showDemoBookingNotice) {
      demoNoticeRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [showDemoBookingNotice]);

  const openDemoBookingNotice = () => {
    if (showDemoBookingNotice) {
      demoNoticeRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      return;
    }

    setShowDemoBookingNotice(true);
  };

  return (
    <>
      <section className="relative overflow-hidden bg-stone-950 text-white">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at top right, rgba(56, 189, 248, 0.18), transparent 32%), linear-gradient(180deg, rgba(12, 10, 9, 0.92), rgba(12, 10, 9, 1))",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid items-center gap-12 lg:min-h-[calc(100vh-8rem)] lg:grid-cols-[minmax(0,1fr)_minmax(420px,540px)]"
          >
            <div className="space-y-6 lg:pr-6">
              <div className="inline-flex items-center rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-sky-300">
                Elite grooming experience
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-xl text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl"
              >
                Crown & Fade Studio
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="max-w-xl text-base leading-7 text-stone-300 sm:text-lg"
              >
                Precision cuts, clean fades, and a premium grooming experience.
                Book your next session with confidence.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col gap-4 sm:flex-row"
              >
                <button
                  onClick={openDemoBookingNotice}
                  className="rounded-full bg-sky-400 px-6 py-3 font-medium text-black transition hover:bg-sky-300"
                >
                  Book Now
                </button>

                <button
                  onClick={() =>
                    document
                      .getElementById("barber-services")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                  className="rounded-full border border-sky-400 px-6 py-3 text-white transition hover:bg-sky-400/10"
                >
                  View Services
                </button>
              </motion.div>

              <div className="grid gap-3 pt-2 text-sm text-stone-300 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-sm">
                  <p className="text-2xl font-semibold text-white">12+</p>
                  <p>Years refining sharp modern cuts</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-sm">
                  <p className="text-2xl font-semibold text-white">5000+</p>
                  <p>Booked appointments with repeat clients</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-sm">
                  <p className="text-2xl font-semibold text-white">5★</p>
                  <p>Premium service, clean atmosphere</p>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="relative mx-auto w-full max-w-xl"
            >
              <div className="absolute -inset-4 -z-10 rounded-4xl bg-sky-500/20 blur-3xl" />

              <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-stone-900/70 p-3 shadow-2xl">
                <div className="relative aspect-4/5 overflow-hidden rounded-3xl border border-white/10 bg-stone-900">
                  <Image
                    src="https://res.cloudinary.com/dnitzkowt/image/upload/v1773867494/qh5pttubqkkkrldyqyyp.jpg"
                    alt="Barber at Crown & Fade Studio"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 540px"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 via-black/20 to-transparent p-5 sm:p-6">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">
                      <Scissors className="h-4 w-4" />
                      Crafted for sharp detail
                    </div>

                  </div>
                </div>

                <div className="mt-4 grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-stone-200 sm:grid-cols-2">
                  <div className="space-y-2">
                    <h3 className="flex items-center gap-2 text-base font-semibold text-white">
                      <Clock className="h-4 w-4 text-sky-300" />
                      Opening Hours
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between gap-4">
                        <span>Mon - Fri</span>
                        <span>9:00 AM - 7:00 PM</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span>Saturday</span>
                        <span>10:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span>Sunday</span>
                        <span>Closed</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between gap-4 rounded-2xl border border-sky-400/20 bg-sky-400/10 p-4">
                    <div>
                      <p className="flex items-center gap-2 text-sm font-semibold text-white">
                        <Calendar className="h-4 w-4 text-sky-300" />
                        Next available
                      </p>
                      <p className="mt-2 text-2xl font-semibold text-white">Today · 2:30 PM</p>
                    </div>
                    <button
                      onClick={openDemoBookingNotice}
                      className="w-full rounded-xl bg-sky-400 py-3 font-medium text-black transition hover:bg-sky-300"
                    >
                      Reserve Appointment
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div ref={demoNoticeRef} className="mt-8">
            <DemoBookingNotice isOpen={showDemoBookingNotice} niche="Barber" />
          </div>
        </div>
      </section>

      <DemoBarberServices />

      <CrownFadeReviews />
    </>
  );
}
