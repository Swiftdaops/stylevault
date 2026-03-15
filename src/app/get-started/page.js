"use client"

import Link from "next/link"

const startCards = [
  {
    href: "/about",
    ariaLabel: "Learn about StyleVault",
    title: "About StyleVault",
    description:
      "StyleVault is a platform produced and provided by 4TEK.dev. It allows professionals in the grooming and beauty industry to create their own digital storefront where clients can book services and manage appointments online.",
    cta: "Learn more",
    image:
      "https://placehold.co/1200x1600/fff7ed/7c2d12?text=StyleVault",
    overlay: "bg-white/45 dark:bg-black/50",
  },
  {
    href: "/barbers/register",
    ariaLabel: "Start as Barber",
    title: "Get Started as a Barber",
    description:
      "Create your own barber storefront, list your services, accept online bookings, and grow your customer base.",
    cta: "Start as Barber",
    image:
      "https://res.cloudinary.com/dnitzkowt/image/upload/v1773545564/Chaps_Co_Barbershop_on_Instagram__All_heroes_wear_capes__chapsandcobarbershop_KeepItHandsome_ewwk4w.jpg",
    overlay: "bg-white/30 dark:bg-black/40",
  },
  {
    href: "/hair-specialists/register",
    ariaLabel: "Start as Hair Stylist",
    title: "Get Started as a Hair Stylist",
    description:
      "Build your own stylist page where clients can discover your services, book appointments, and connect with your brand.",
    cta: "Start as Hair Stylist",
    image:
      "https://res.cloudinary.com/dnitzkowt/image/upload/v1773545567/When_y_uc2gp4.jpg",
    overlay: "bg-white/35 dark:bg-black/45",
  },
  {
    href: "/nail-technicians/register",
    ariaLabel: "Start as Nail Technician",
    title: "Get Started as a Nail Technician",
    description:
      "Launch your own nail booking page, list manicures and pedicures, accept appointments, and grow your beauty brand online.",
    cta: "Start as Nail Technician",
    image:
      "https://res.cloudinary.com/dnitzkowt/image/upload/v1773574960/Professional_Manicure_Process_Step_by_Step_Nail_Care_Inspiration_es8rop.jpg",
    overlay: "bg-white/35 dark:bg-black/45",
  },
  {
    href: "/lash-technicians/register",
    ariaLabel: "Start as Lash Technician",
    title: "Get Started as a Lash Technician",
    description:
      "Launch your own lash booking page, list classic, hybrid, and volume sets, accept appointments, and grow your beauty brand online.",
    cta: "Start as Lash Technician",
    image:
      "https://res.cloudinary.com/dnitzkowt/image/upload/v1773574325/LASH_MASTER_hvouog.jpg",
    overlay: "bg-white/35 dark:bg-black/45",
  },
  {
    href: "/makeup-artists/register",
    ariaLabel: "Start as Makeup Artist",
    title: "Get Started as a Makeup Artist",
    description:
      "Launch your own makeup booking page, list bridal and glam services, accept appointments, and grow your beauty brand online.",
    cta: "Start as Makeup Artist",
    image:
      "https://res.cloudinary.com/dnitzkowt/image/upload/v1773574318/q3bs23hkql7gl8q1c4g0.jpg",
    overlay: "bg-white/35 dark:bg-black/45",
  },
]

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
          {startCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              aria-label={card.ariaLabel}
              className="group relative block h-full overflow-hidden rounded-2xl border-2 border-neutral-200 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-neutral-800"
            >
              <div
                className="absolute inset-0 scale-105 bg-cover bg-center transition duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url('${card.image}')` }}
                aria-hidden="true"
              />
              <div className={`absolute inset-0 ${card.overlay}`} aria-hidden="true" />

              <div className="relative flex h-full min-h-96 flex-col justify-between p-8 text-left">
                <div>
                  <h2 className="mb-4 text-xl font-semibold text-neutral-900 dark:text-white">
                    {card.title}
                  </h2>

                  <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-200">
                    {card.description}
                  </p>
                </div>

                <span className="inline-flex w-fit items-center justify-center rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition group-hover:bg-neutral-800">
                  {card.cta}
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>

    </main>
  )
}