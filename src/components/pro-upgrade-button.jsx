"use client"

import { useEffect, useMemo, useState } from 'react'
import { CheckCircle2, Crown, Sparkles, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { API_BASE_URL } from '@/lib/api-base'

const PRO_NICHES = [
  'Barber',
  'Hair Specialist',
  'Nail Technician',
  'Lash Technician',
  'Makeup Artist',
]

const PRO_PLANS = ['Pro Monthly', 'Pro Yearly']

export default function UpgradeToProButton({
  label = 'Upgrade to Pro',
  className = '',
  defaultPlan = 'Pro Monthly',
  defaultNiche = 'Barber',
  countryLabel = 'your location',
  pricing,
  onOpen,
}) {
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState(null)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    country: countryLabel,
    plan: defaultPlan,
    niche: defaultNiche,
  })

  useEffect(() => {
    setFormState((current) => ({
      ...current,
      country: current.country || countryLabel,
      plan: defaultPlan,
      niche: defaultNiche,
    }))
  }, [countryLabel, defaultPlan, defaultNiche])

  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  const whatsappLink = useMemo(() => {
    const raw = String(submitSuccess?.adminWhatsApp || '').replace(/[^\d]/g, '')
    return raw ? `https://wa.me/${raw}` : null
  }, [submitSuccess])

  const currentPlanPrice = useMemo(() => {
    if (!pricing) return null
    return formState.plan === 'Pro Yearly' ? pricing.yearly : pricing.monthly
  }, [formState.plan, pricing])

  const inputClassName = 'mt-2 w-full rounded-2xl border border-white/20 bg-white/70 px-4 py-3 text-sm text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-stone-500 dark:focus:border-amber-400 dark:focus:ring-amber-500/10'

  const handleFieldChange = (field) => (event) => {
    setFormState((current) => ({
      ...current,
      [field]: event.target.value,
    }))
  }

  const openModal = () => {
    onOpen?.()
    setSubmitError('')
    setSubmitSuccess(null)
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
    setSubmitError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch(`${API_BASE_URL}/pro-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          phone: formState.phone,
          whatsapp: formState.phone,
          country: formState.country,
          plan: formState.plan,
          niche: formState.niche,
        }),
      })

      const payload = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(payload?.message || 'Unable to submit your Pro request right now.')
      }

      setSubmitSuccess(payload)
      setFormState((current) => ({
        ...current,
        name: '',
        email: '',
        phone: '',
      }))
    } catch (error) {
      setSubmitError(error.message || 'Unable to submit your Pro request right now.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <button type="button" onClick={openModal} className={className}>
        {label}
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="relative w-full max-w-3xl overflow-hidden rounded-4xl border border-white/30 bg-white/75 shadow-2xl shadow-black/20 backdrop-blur-2xl dark:border-white/10 dark:bg-stone-950/75"
          >
            <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.22),transparent_58%)] dark:bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.16),transparent_58%)]" />

            <button
              type="button"
              onClick={closeModal}
              className="absolute right-5 top-5 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/70 text-stone-900 transition hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
              aria-label="Close Pro form"
            >
              <X size={18} />
            </button>

            <div className="relative grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
              <div className="border-b border-white/30 p-6 dark:border-white/10 sm:p-8 lg:border-b-0 lg:border-r">
                <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-orange-700 dark:border-amber-500/20 dark:bg-white/10 dark:text-amber-300">
                  <Crown size={14} />
                  Premium upgrade
                </div>

                <h3 className="mt-6 text-3xl font-black tracking-tight text-stone-950 dark:text-white">
                  Premium glass Pro request
                </h3>

                <p className="mt-4 text-sm leading-7 text-stone-600 dark:text-stone-300">
                  Send your details and StyleVault can follow up with onboarding for your niche,
                  setup guidance, and Pro activation.
                </p>

                <div className="mt-8 rounded-4xl border border-white/30 bg-white/60 p-5 shadow-lg shadow-orange-100/40 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-black/20">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
                    Selected plan
                  </p>
                  <div className="mt-3 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xl font-black text-stone-950 dark:text-white">{formState.plan}</p>
                      <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">Localized for {countryLabel}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-stone-950 dark:text-white">
                        {currentPlanPrice || 'Custom quote'}
                      </p>
                      <p className="text-xs uppercase tracking-[0.2em] text-orange-600 dark:text-amber-300">
                        {formState.plan === 'Pro Yearly' ? 'per year' : 'per month'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {[
                    'Premium glass look in light and dark mode',
                    'Submit name, email, number, country, plan, and niche',
                    'Fast follow-up for barber, hair, nails, lashes, or makeup',
                  ].map((benefit) => (
                    <div key={benefit} className="flex items-start gap-3 text-sm text-stone-600 dark:text-stone-300">
                      <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-r from-orange-500 to-amber-400 text-white">
                        <CheckCircle2 size={14} />
                      </span>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 sm:p-8">
                {submitSuccess ? (
                  <div className="rounded-4xl border border-emerald-200 bg-emerald-50/90 p-6 dark:border-emerald-500/20 dark:bg-emerald-500/10">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white">
                      <Sparkles size={18} />
                    </div>
                    <h4 className="mt-4 text-2xl font-black text-stone-950 dark:text-white">
                      Pro request submitted
                    </h4>
                    <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-300">
                      Your upgrade request has been sent. StyleVault can now follow up with the best Pro setup for your niche.
                    </p>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      {whatsappLink ? (
                        <a
                          href={whatsappLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                        >
                          Open WhatsApp
                        </a>
                      ) : null}
                      <button
                        type="button"
                        onClick={closeModal}
                        className="inline-flex items-center justify-center rounded-2xl border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-900 transition hover:bg-white dark:border-white/10 dark:text-white dark:hover:bg-white/10"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="grid gap-4">
                    <div>
                      <label className="text-sm font-semibold text-stone-700 dark:text-stone-200">Full name</label>
                      <input
                        required
                        type="text"
                        value={formState.name}
                        onChange={handleFieldChange('name')}
                        placeholder="Enter your name"
                        className={inputClassName}
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-sm font-semibold text-stone-700 dark:text-stone-200">Email</label>
                        <input
                          required
                          type="email"
                          value={formState.email}
                          onChange={handleFieldChange('email')}
                          placeholder="you@example.com"
                          className={inputClassName}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-stone-700 dark:text-stone-200">Phone number</label>
                        <input
                          required
                          type="tel"
                          value={formState.phone}
                          onChange={handleFieldChange('phone')}
                          placeholder="2348012345678"
                          className={inputClassName}
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <label className="text-sm font-semibold text-stone-700 dark:text-stone-200">Country</label>
                        <input
                          required
                          type="text"
                          value={formState.country}
                          onChange={handleFieldChange('country')}
                          placeholder="Nigeria"
                          className={inputClassName}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-stone-700 dark:text-stone-200">Plan</label>
                        <select value={formState.plan} onChange={handleFieldChange('plan')} className={inputClassName}>
                          {PRO_PLANS.map((plan) => (
                            <option key={plan}>{plan}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-stone-700 dark:text-stone-200">Niche</label>
                        <select value={formState.niche} onChange={handleFieldChange('niche')} className={inputClassName}>
                          {PRO_NICHES.map((niche) => (
                            <option key={niche}>{niche}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {submitError ? (
                      <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
                        {submitError}
                      </div>
                    ) : null}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="mt-2 inline-flex items-center justify-center rounded-2xl bg-linear-to-r from-orange-600 to-amber-500 px-5 py-4 text-sm font-bold text-white shadow-lg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {submitting ? 'Submitting request...' : 'Submit Pro request'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </>
  )
}
