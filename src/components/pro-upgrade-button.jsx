"use client"

import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { CheckCircle2, Crown, MapPin, Sparkles, X } from 'lucide-react'
import { motion } from 'framer-motion'
import PhoneNumberInput from '@/components/phone-number-input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { API_BASE_URL } from '@/lib/api-base'
import { getLocalizedPricing } from '@/lib/pricing'
import { buildInternationalPhoneNumber, countryOptions, normalizeCountryCode } from '@/lib/profile-options'

const PRO_NICHES = [
  'Barber',
  'Hair Specialist',
  'Nail Technician',
  'Lash Technician',
  'Makeup Artist',
]

const PRO_PLANS = ['Pro Monthly', 'Pro Yearly']

const COUNTRY_LABEL_BY_CODE = new Map(countryOptions.map((option) => [option.code, option.label]))
const COUNTRY_CODE_BY_LABEL = new Map(countryOptions.map((option) => [option.label.toLowerCase(), option.code]))

function resolveInitialCountryCode(defaultCountryCode = '', countryLabel = '') {
  const normalizedDefault = String(defaultCountryCode || '').trim().toUpperCase()
  if (normalizedDefault && countryOptions.some((option) => option.code === normalizedDefault)) {
    return normalizedDefault
  }

  const normalizedLabel = String(countryLabel || '').trim().toLowerCase()
  if (normalizedLabel && COUNTRY_CODE_BY_LABEL.has(normalizedLabel)) {
    return COUNTRY_CODE_BY_LABEL.get(normalizedLabel)
  }

  const twoLetterCode = String(countryLabel || '').trim().toUpperCase()
  if (/^[A-Z]{2}$/.test(twoLetterCode) && countryOptions.some((option) => option.code === twoLetterCode)) {
    return twoLetterCode
  }

  return ''
}

function detectBrowserCountryCode(fallback = 'US') {
  if (typeof window === 'undefined') {
    return normalizeCountryCode(fallback, 'US')
  }

  const locales = [navigator.language, ...(navigator.languages || [])].filter(Boolean)

  for (const locale of locales) {
    try {
      const region = new Intl.Locale(locale).region
      if (region && countryOptions.some((option) => option.code === region.toUpperCase())) {
        return region.toUpperCase()
      }
    } catch {
      // Ignore invalid locale values and continue to regex fallback.
    }

    const match = String(locale).match(/[-_]([a-z]{2})\b/i)
    if (match) {
      const region = match[1].toUpperCase()
      if (countryOptions.some((option) => option.code === region)) {
        return region
      }
    }
  }

  return normalizeCountryCode(fallback, 'US')
}

export default function UpgradeToProButton({
  label = 'Upgrade to Pro',
  className = '',
  defaultPlan = 'Pro Monthly',
  defaultNiche = 'Barber',
  defaultCountryCode = '',
  countryLabel = 'your location',
  pricing,
  onOpen,
}) {
  const resolvedInitialCountryCode = useMemo(
    () => resolveInitialCountryCode(defaultCountryCode, countryLabel),
    [countryLabel, defaultCountryCode],
  )
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState(null)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: resolvedInitialCountryCode,
    plan: defaultPlan,
    niche: defaultNiche,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setFormState((current) => ({
      ...current,
      countryCode: current.countryCode || resolvedInitialCountryCode,
      plan: defaultPlan,
      niche: defaultNiche,
    }))
  }, [defaultPlan, defaultNiche, resolvedInitialCountryCode])

  useEffect(() => {
    if (formState.countryCode) return

    const detectedCountryCode = detectBrowserCountryCode(resolvedInitialCountryCode || 'US')
    setFormState((current) => ({
      ...current,
      countryCode: detectedCountryCode,
    }))
  }, [formState.countryCode, resolvedInitialCountryCode])

  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        setSubmitError('')
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  const whatsappLink = useMemo(() => {
    const raw = String(submitSuccess?.adminWhatsApp || '').replace(/[^\d]/g, '')
    return raw ? `https://wa.me/${raw}` : null
  }, [submitSuccess])

  const selectedCountryCode = useMemo(
    () => normalizeCountryCode(formState.countryCode, resolvedInitialCountryCode || 'US'),
    [formState.countryCode, resolvedInitialCountryCode],
  )

  const selectedCountryLabel = useMemo(
    () => COUNTRY_LABEL_BY_CODE.get(selectedCountryCode) || countryLabel || 'United States',
    [countryLabel, selectedCountryCode],
  )

  const localizedPricing = useMemo(() => {
    if (!selectedCountryCode) return null
    return getLocalizedPricing(selectedCountryCode)
  }, [selectedCountryCode])

  const currentPlanPrice = useMemo(() => {
    if (localizedPricing) {
      return formState.plan === 'Pro Yearly'
        ? localizedPricing.yearlyDisplay
        : localizedPricing.monthlyDisplay
    }

    if (!pricing) return null
    return formState.plan === 'Pro Yearly' ? pricing.yearly : pricing.monthly
  }, [formState.plan, localizedPricing, pricing])

  const inputClassName = 'mt-2 h-12 w-full rounded-2xl border border-white/20 bg-white/70 px-4 text-sm text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-stone-500 dark:focus:border-amber-400 dark:focus:ring-amber-500/10'

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
      const internationalPhone = buildInternationalPhoneNumber(selectedCountryCode, formState.phone)
      const response = await fetch(`${API_BASE_URL}/pro-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          phone: internationalPhone,
          whatsapp: internationalPhone,
          country: selectedCountryLabel,
          countryCode: selectedCountryCode,
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
      setSubmitError(error?.message || 'Unable to submit your Pro request right now.')
    } finally {
      setSubmitting(false)
    }
  }

  const modalContent = open ? (
    <div className="fixed inset-0 z-120 overflow-y-auto bg-black/60 p-3 backdrop-blur-md sm:p-4">
      <div className="min-h-full">
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="relative mx-auto my-3 w-full max-w-4xl overflow-hidden rounded-4xl border border-white/30 bg-white/75 shadow-2xl shadow-black/20 backdrop-blur-2xl dark:border-white/10 dark:bg-stone-950/75"
          >
            <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.22),transparent_58%)] dark:bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.16),transparent_58%)]" />

            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/70 text-stone-900 transition hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 sm:right-5 sm:top-5"
              aria-label="Close Pro form"
            >
              <X size={18} />
            </button>

            <div className="relative grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
              <div className="border-b border-white/30 p-5 dark:border-white/10 sm:p-8 lg:border-b-0 lg:border-r">
                <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-orange-700 dark:border-amber-500/20 dark:bg-white/10 dark:text-amber-300">
                  <Crown size={14} />
                  Premium upgrade
                </div>

                <h3 className="mt-6 text-3xl font-black tracking-tight text-stone-950 dark:text-white">
                  Upgrade to StyleVault Pro
                </h3>

                <p className="mt-4 text-sm leading-7 text-stone-600 dark:text-stone-300">
                  Share your details and the StyleVault admin team will review your application,
                  follow up by email, and help you get your Pro setup live faster.
                </p>

                <div className="mt-6 rounded-4xl border border-white/30 bg-white/60 p-5 shadow-lg shadow-orange-100/40 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-black/20">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-orange-700 dark:text-amber-300">
                    <MapPin size={14} />
                    Detected country
                  </div>
                  <p className="mt-3 text-lg font-black text-stone-950 dark:text-white">{selectedCountryLabel}</p>
                  <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
                    We preselect your country automatically, and you can change it below at any time.
                  </p>
                </div>

                <div className="mt-8 rounded-4xl border border-white/30 bg-white/60 p-5 shadow-lg shadow-orange-100/40 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-black/20">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
                    Selected plan
                  </p>
                  <div className="mt-3 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xl font-black text-stone-950 dark:text-white">{formState.plan}</p>
                      <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">Localized for {selectedCountryLabel}</p>
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
                    'Premium glassmorphism design in both light and dark mode',
                    'Submit your name, email, phone number, country, plan, and niche',
                    'Fast follow-up for barbers, hair specialists, nail techs, lash techs, and makeup artists',
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

              <div className="p-5 sm:p-8">
                {submitSuccess ? (
                  <div className="rounded-4xl border border-emerald-200 bg-emerald-50/90 p-6 dark:border-emerald-500/20 dark:bg-emerald-500/10">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white">
                      <Sparkles size={18} />
                    </div>
                    <h4 className="mt-4 text-2xl font-black text-stone-950 dark:text-white">
                      Pro request submitted
                    </h4>
                    <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-300">
                      Your application has been sent to the StyleVault admin team. We will follow up with the best Pro setup for your niche.
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
                      <PhoneNumberInput
                        country={selectedCountryCode}
                        value={formState.phone}
                        onChange={handleFieldChange('phone')}
                        label="Phone number"
                        labelClassName="text-sm font-semibold text-stone-700 dark:text-stone-200"
                        wrapperClassName="mt-2 border-white/20 bg-white/70 dark:border-white/10 dark:bg-white/5"
                        prefixClassName="border-white/20 bg-white/80 text-stone-700 dark:border-white/10 dark:bg-stone-900/60 dark:text-stone-100"
                        inputClassName="bg-transparent py-3 text-sm text-stone-950 placeholder:text-stone-400 focus:ring-orange-300 dark:text-white dark:placeholder:text-stone-500 dark:focus:ring-amber-300"
                        hintClassName="mt-2 text-xs text-stone-500 dark:text-stone-400"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <label className="text-sm font-semibold text-stone-700 dark:text-stone-200">Country</label>
                        <Select
                          value={selectedCountryCode}
                          onValueChange={(nextCountryCode) => {
                            setFormState((current) => ({
                              ...current,
                              countryCode: nextCountryCode,
                            }))
                          }}
                        >
                          <SelectTrigger className="mt-2 h-12 w-full rounded-2xl border border-white/20 bg-white/70 px-4 text-sm text-stone-950 shadow-none focus:ring-4 focus:ring-orange-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:ring-amber-500/10">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent className="border-white/20 bg-white/95 text-stone-950 backdrop-blur dark:border-white/10 dark:bg-stone-900 dark:text-white">
                            {countryOptions.map((option) => (
                              <SelectItem key={option.code} value={option.code}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-stone-700 dark:text-stone-200">Plan</label>
                        <Select value={formState.plan} onValueChange={(nextPlan) => setFormState((current) => ({ ...current, plan: nextPlan }))}>
                          <SelectTrigger className="mt-2 h-12 w-full rounded-2xl border border-white/20 bg-white/70 px-4 text-sm text-stone-950 shadow-none focus:ring-4 focus:ring-orange-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:ring-amber-500/10">
                            <SelectValue placeholder="Select plan" />
                          </SelectTrigger>
                          <SelectContent className="border-white/20 bg-white/95 text-stone-950 backdrop-blur dark:border-white/10 dark:bg-stone-900 dark:text-white">
                            {PRO_PLANS.map((plan) => (
                              <SelectItem key={plan} value={plan}>
                                {plan}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-stone-700 dark:text-stone-200">Niche</label>
                        <Select value={formState.niche} onValueChange={(nextNiche) => setFormState((current) => ({ ...current, niche: nextNiche }))}>
                          <SelectTrigger className="mt-2 h-12 w-full rounded-2xl border border-white/20 bg-white/70 px-4 text-sm text-stone-950 shadow-none focus:ring-4 focus:ring-orange-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:ring-amber-500/10">
                            <SelectValue placeholder="Select niche" />
                          </SelectTrigger>
                          <SelectContent className="border-white/20 bg-white/95 text-stone-950 backdrop-blur dark:border-white/10 dark:bg-stone-900 dark:text-white">
                            {PRO_NICHES.map((niche) => (
                              <SelectItem key={niche} value={niche}>
                                {niche}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                      {submitting ? 'Submitting application...' : 'Submit Pro application'}
                    </button>

                    <p className="text-center text-xs leading-6 text-stone-500 dark:text-stone-400">
                      Your request goes directly to the StyleVault admin inbox for review and follow-up.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
      </div>
    </div>
  ) : null

  return (
    <>
      <button type="button" onClick={openModal} className={className}>
        {label}
      </button>

      {mounted && modalContent ? createPortal(modalContent, document.body) : null}
    </>
  )
}
