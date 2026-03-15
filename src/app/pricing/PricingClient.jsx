"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { API_BASE_URL } from "@/lib/barber-api"

export default function PricingClient({ initialPricing }) {
  const [billing, setBilling] = useState("monthly")
  const { barber } = useAuth()

  const price = {
    monthly: initialPricing?.monthlyDisplay || "$30",
    yearly: initialPricing?.yearlyDisplay || "$100",
  }

  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (barber) {
      setName(barber.name || '')
      setEmail(barber.email || '')
      setWhatsapp(barber.whatsapp || '')
    }
  }, [barber])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const resp = await fetch(`${API_BASE_URL}/pro-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, whatsapp }),
      })

      const data = await resp.json()
      if (!resp.ok) throw new Error(data?.message || 'Request failed')

      // If admin WhatsApp is provided, redirect to WhatsApp chat
      if (data?.adminWhatsApp) {
        const phone = String(data.adminWhatsApp).replace(/\D/g, '')
        const message = `New Pro request from ${name}. Email: ${email}. WhatsApp: ${whatsapp || ''}`
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
        // open WhatsApp in a new tab/window
        window.open(url, '_blank')
      }

      setShowForm(false)
      // Optionally show a toast — here we just clear fields
      setName('')
      setEmail('')
      setWhatsapp('')
    } catch (err) {
      setError(err.message || 'Failed to submit')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="py-20 bg-orange-50 dark:bg-stone-950 text-center">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4 text-stone-900 dark:text-amber-50">StyleVault Pricing</h1>
        <p className="text-sm text-stone-600 dark:text-amber-300 mb-2">Start free and upgrade when your barber business grows.</p>
       

        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setBilling("monthly")}
            aria-pressed={billing === "monthly"}
            className={`px-6 py-2 rounded-full ${billing === "monthly" ? "bg-stone-950 text-white dark:bg-amber-500 dark:text-black" : "bg-gray-200 dark:bg-stone-800"}`}
          >
            Monthly
          </button>

          <button
            onClick={() => setBilling("yearly")}
            aria-pressed={billing === "yearly"}
            className={`px-6 py-2 rounded-full ${billing === "yearly" ? "bg-stone-950 text-white dark:bg-amber-500 dark:text-black" : "bg-gray-200 dark:bg-stone-800"}`}
          >
            Yearly (Save {initialPricing?.yearlySavingsDisplay || '$260'})
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <article className="border rounded-xl p-8 bg-fuchsia-50 dark:bg-stone-900">
            <h2 className="text-2xl font-semibold mb-2 text-stone-900 dark:text-amber-50">Free</h2>
            <p className="text-3xl font-bold mb-6 text-lime-500">{billing === 'monthly' ? '₦0 / month' : '₦0 / year'}</p>
            <ul className="text-left space-y-2 mb-8 text-stone-700 dark:text-amber-200">
              <li>✔ Barber profile page</li>
              <li>✔ Online booking</li>
              <li>✔ Service listing</li>
              <li>✔ Booking calendar</li>
              <li>✔ Email notifications</li>
              <li>✔ Verified badge after 10 satisfied customers</li>
            </ul>
          <button
            className="w-full bg-lime-500 dark:bg-stone-800 py-3 rounded-lg"
            onClick={() => window.location.href = "/get-started"}
          >
            Get Started
          </button>
          </article>

          <article className="border-2 border-black rounded-xl p-8 shadow-lg bg-fuchsia-50 dark:bg-stone-900">
            <h2 className="text-2xl font-semibold mb-2 text-stone-900 dark:text-amber-50">Pro</h2>
            <p className="text-3xl font-bold mb-6 text-lime-500">{price[billing]} {billing === 'monthly' ? '/ month' : '/ year'}</p>
            <p className="mb-6 text-xs text-stone-500 dark:text-amber-300">
              {initialPricing?.countryCode === 'NG'
                ? 'Nigeria pricing applied.'
                : initialPricing?.countryCode === 'US'
                  ? 'United States pricing applied.'
                  : `Equivalent local pricing applied for ${initialPricing?.countryLabel || 'your region'}.`}
            </p>
            <ul className="text-left space-y-2 mb-8 text-stone-700 dark:text-amber-200">
              <li>✔ Everything in Free</li>
              <li>✔ Custom barber domain</li>
              <li>✔ SEO optimization</li>
              <li>✔ Automated email confirmations</li>
              <li>✔ Customer reviews & comments</li>
              <li>✔ Rating system</li>
              <li>✔ Mini barber shop</li>
              <li>✔ Sell hair products</li>
              <li>✔ Advanced analytics</li>
            </ul>
            <button className="w-full bg-stone-950 text-white py-3 rounded-lg dark:bg-amber-500 dark:text-black" onClick={() => setShowForm(true)}>Upgrade to Pro</button>
          </article>
        </div>
      </div>

      {/* Modal form */}
      {showForm ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg dark:bg-stone-900">
            <h3 className="text-lg font-semibold mb-4 text-stone-900 dark:text-amber-50">Request Pro plan</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-sm">Name</label>
                <input className="mt-1 w-full rounded-md border px-3 py-2 dark:bg-stone-800" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div>
                <label className="text-sm">Email</label>
                <input type="email" className="mt-1 w-full rounded-md border px-3 py-2 dark:bg-stone-800" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <label className="text-sm">WhatsApp (optional)</label>
                <input type="tel" className="mt-1 w-full rounded-md border px-3 py-2 dark:bg-stone-800" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
              </div>

              {error ? <div className="text-sm text-red-600">{error}</div> : null}

              <div className="flex items-center justify-end gap-2">
                <button type="button" className="px-4 py-2 rounded-md border" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-md bg-stone-950 text-white" disabled={submitting}>{submitting ? 'Sending…' : 'Send request & WhatsApp'}</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </section>
  )
}
