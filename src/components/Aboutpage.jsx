import Link from 'next/link'

export function AboutPlatform() {
  return (
    <section className="bg-orange-50 py-20 dark:bg-stone-950">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:items-center sm:px-6 lg:px-8">
        <div>
          <h2 className="mb-6 text-3xl font-semibold">
            A Platform Built for Modern Beauty Businesses
          </h2>

          <p className="mb-4">
            StyleVault gives professionals the tools they need to run their
            business online. Instead of relying only on phone calls or social
            media messages, barbers, stylists, and nail technicians can create their own digital
            storefront where customers can book appointments and interact with
            their services.
          </p>

          <p>
            Each professional gets a dedicated page where customers can see
            services, prices, reviews, and book appointments instantly.
          </p>
        </div>

        <div className="rounded-xl bg-white p-8 shadow dark:bg-stone-900">
          <h3 className="mb-4 text-xl font-semibold">
            What StyleVault Provides
          </h3>

          <ul className="space-y-3">
            <li>Online booking system</li>
            <li>Personal storefront for each professional</li>
            <li>Customer management tools</li>
            <li>Automated appointment confirmations</li>
            <li>Service listings and pricing</li>
            <li>Product sales through mini barber shops</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export function WhoItsFor() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-6 text-3xl font-semibold">
          Who StyleVault Is For
        </h2>

        <p className="mx-auto mb-12 max-w-3xl">
          StyleVault currently supports three types of professionals in the
          beauty and grooming industry.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-xl border border-stone-200 p-8 dark:border-stone-800">
            <h3 className="mb-3 text-xl font-semibold">
              Barbers
            </h3>

            <p>
              Professional barbers can create their own storefront, list their
              haircut services, manage bookings, and build credibility through
              customer reviews.
            </p>

            <div className="mt-6">
              <Link href="/barbers/register" className="inline-flex items-center rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700">
                Get Started
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-stone-200 p-8 dark:border-stone-800">
            <h3 className="mb-3 text-xl font-semibold">
              Hair Stylists
            </h3>

            <p>
              Hair stylists can showcase their services, accept bookings, and
              sell beauty products directly through their personalized
              StyleVault page.
            </p>

            <div className="mt-6">
              <Link href="/hair-specialists/register" className="inline-flex items-center rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700">
                Get Started
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-stone-200 p-8 dark:border-stone-800">
            <h3 className="mb-3 text-xl font-semibold">
              Nail Technicians
            </h3>

            <p>
              Nail technicians can showcase manicures, pedicures, acrylic sets,
              and nail art services while accepting bookings through their own
              personalized StyleVault page.
            </p>

            <div className="mt-6">
              <Link href="/nail-technicians/register" className="inline-flex items-center rounded-md bg-fuchsia-600 px-4 py-2 text-sm font-medium text-white hover:bg-fuchsia-700">
                Get Started
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-10">
          More professional categories will be added to the platform soon.
        </p>
      </div>
    </section>
  )
}