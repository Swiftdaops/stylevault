"use client"

import Link from "next/link"

export default function GetStartedPage() {
  return (

    <main className="min-h-screen bg-orange-50 dark:bg-neutral-950 py-24 px-6">

      <div className="max-w-6xl mx-auto">

        {/* HERO */}

        <div className="text-center mb-16">

          <h1 className="text-5xl font-semibold tracking-tight text-neutral-900 dark:text-white">
            Get Started with StyleVault
          </h1>

          <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            StyleVault helps beauty professionals create their own online
            storefront to manage bookings, customers, and services.
          </p>

        </div>

        {/* CARDS */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-6">

          {/* ABOUT CARD */}

          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-sm border border-neutral-200 dark:border-neutral-800">

            <h2 className="text-xl font-semibold mb-4">
              About StyleVault
            </h2>

            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
              StyleVault is a platform produced and provided by 4TEK.dev.
              It allows professionals in the grooming and beauty industry
              to create their own digital storefront where clients can
              book services and manage appointments online.
            </p>

              <div className="mt-6">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center rounded-lg bg-black text-white px-5 py-3 text-sm font-medium hover:bg-neutral-800 transition"
                >
                  Learn more
                </Link>
              </div>

          </div>

          {/* BARBER CARD */}

          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-sm border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between">

            <div>

              <h2 className="text-xl font-semibold mb-4">
                Get Started as a Barber
              </h2>

              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-6">
                Create your own barber storefront, list your services,
                accept online bookings, and grow your customer base.
              </p>

            </div>

            <Link
              href="/barbers/register"
              className="inline-flex items-center justify-center rounded-lg bg-black text-white px-5 py-3 text-sm font-medium hover:bg-neutral-800 transition"
            >
              Start as Barber
            </Link>

          </div>

          {/* HAIR STYLIST CARD */}

          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-sm border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between">

            <div>

              <h2 className="text-xl font-semibold mb-4">
                Get Started as a Hair Stylist
              </h2>

              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-6">
                Build your own stylist page where clients can discover your
                services, book appointments, and connect with your brand.
              </p>

            </div>

            <Link
              href="/hair-specialists/register"
              className="inline-flex items-center justify-center rounded-lg bg-black text-white px-5 py-3 text-sm font-medium hover:bg-neutral-800 transition"
            >
              Start as Hair Stylist
            </Link>

          </div>

          {/* NAIL TECH CARD */}

          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-sm border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between">

            <div>

              <h2 className="text-xl font-semibold mb-4">
                Get Started as a Nail Technician
              </h2>

              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-6">
                Launch your own nail booking page, list manicures and pedicures,
                accept appointments, and grow your beauty brand online.
              </p>

            </div>

            <Link
              href="/nail-technicians/register"
              className="inline-flex items-center justify-center rounded-lg bg-black text-white px-5 py-3 text-sm font-medium hover:bg-neutral-800 transition"
            >
              Start as Nail Technician
            </Link>

          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-sm border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between">

            <div>

              <h2 className="text-xl font-semibold mb-4">
                Get Started as a Lash Technician
              </h2>

              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-6">
                Launch your own lash booking page, list classic, hybrid, and volume sets,
                accept appointments, and grow your beauty brand online.
              </p>

            </div>

            <Link
              href="/lash-technicians/register"
              className="inline-flex items-center justify-center rounded-lg bg-black text-white px-5 py-3 text-sm font-medium hover:bg-neutral-800 transition"
            >
              Start as Lash Technician
            </Link>

          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-sm border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between">

            <div>

              <h2 className="text-xl font-semibold mb-4">
                Get Started as a Makeup Artist
              </h2>

              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-6">
                Launch your own makeup booking page, list bridal and glam services,
                accept appointments, and grow your beauty brand online.
              </p>

            </div>

            <Link
              href="/makeup-artists/register"
              className="inline-flex items-center justify-center rounded-lg bg-black text-white px-5 py-3 text-sm font-medium hover:bg-neutral-800 transition"
            >
              Start as Makeup Artist
            </Link>

          </div>

        </div>

      </div>

    </main>
  )
}