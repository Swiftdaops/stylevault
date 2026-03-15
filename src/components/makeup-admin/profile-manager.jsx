"use client"

import React, { useMemo, useRef, useState } from 'react'
import { ExternalLink, ImagePlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProviderAccountSettings from '@/components/provider-account-settings'
import { useMakeupArtistAuth } from '@/components/makeup-artist-auth-provider'
import { changeMakeupArtistPassword, updateMyMakeupArtistProfile, API_BASE_URL } from '@/lib/makeup-artist-api'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { buildWhatsAppUrl, currencyOptions, normalizeCurrencyCode } from '@/lib/profile-options'
import { getSocialLinksList, normalizeSocialLinks, SOCIAL_PLATFORMS } from '@/lib/social-links'

const inputClassName = 'mt-2 h-11 w-full rounded-xl border border-rose-200 bg-white/90 px-4 text-sm shadow-sm outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-200 dark:border-stone-700 dark:bg-stone-900 dark:focus:border-rose-400 dark:focus:ring-rose-400/20'
const textareaClassName = 'mt-2 min-h-32 w-full rounded-xl border border-rose-200 bg-white/90 px-4 py-3 text-sm shadow-sm outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-200 dark:border-stone-700 dark:bg-stone-900 dark:focus:border-rose-400 dark:focus:ring-rose-400/20'
const panelClassName = 'rounded-3xl border border-rose-200/70 bg-white/90 p-6 shadow-sm dark:border-stone-800 dark:bg-stone-950/70'

function buildSocialState(currentLinks = {}, existingLinks = {}) {
  return SOCIAL_PLATFORMS.reduce((result, platform) => {
    result[platform.key] = currentLinks?.[platform.key] ?? existingLinks?.[platform.key] ?? ''
    return result
  }, {})
}

export default function MakeupProfileManager() {
  const { makeupArtist, refresh, user } = useMakeupArtistAuth()
  const [overrides, setOverrides] = useState({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [localPreview, setLocalPreview] = useState('')
  const fileInputRef = useRef(null)

  const form = useMemo(() => ({
    name: overrides.name ?? makeupArtist?.name ?? '',
    bio: overrides.bio ?? makeupArtist?.bio ?? '',
    location: overrides.location ?? makeupArtist?.location ?? '',
    whatsapp: overrides.whatsapp ?? makeupArtist?.whatsapp ?? '',
    profileImage: overrides.profileImage ?? makeupArtist?.profileImage ?? '',
    currency: normalizeCurrencyCode(overrides.currency ?? makeupArtist?.currency ?? 'USD'),
    specialties: overrides.specialties ?? (makeupArtist?.specialties || []).join(', '),
    socialLinks: buildSocialState(overrides.socialLinks, makeupArtist?.socialLinks),
  }), [makeupArtist, overrides])

  const socialLinks = useMemo(() => getSocialLinksList(form.socialLinks), [form.socialLinks])
  const previewImage = localPreview || form.profileImage || ''

  const setField = (key, value) => {
    setOverrides((current) => {
      const next = { ...current, [key]: value }
      if (key === 'whatsapp') {
        next.socialLinks = {
          ...buildSocialState(current.socialLinks, makeupArtist?.socialLinks),
          whatsapp: buildWhatsAppUrl(value),
        }
      }
      return next
    })
  }

  const setSocialField = (key, value) => {
    setOverrides((current) => ({
      ...current,
      socialLinks: {
        ...buildSocialState(current.socialLinks, makeupArtist?.socialLinks),
        [key]: value,
      },
    }))
  }

  const handleFileChange = async (event) => {
    setUploadError('')
    const file = event.target.files && event.target.files[0]
    if (!file) return

    try {
      const objectUrl = URL.createObjectURL(file)
      setLocalPreview(objectUrl)
    } catch {
      setLocalPreview('')
    }

    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('image', file)

      const resp = await fetch(`${API_BASE_URL}/uploads/image`, {
        method: 'POST',
        body: fd,
        credentials: 'include',
      })

      if (!resp.ok) {
        const body = await resp.json().catch(() => ({}))
        throw new Error(body?.message || 'Upload failed')
      }

      const data = await resp.json()
      setField('profileImage', data.url)
      if (localPreview) {
        try { URL.revokeObjectURL(localPreview) } catch {}
        setLocalPreview('')
      }
    } catch (error) {
      setUploadError(error.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    setSaved(false)
    setUploadError('')

    try {
      await updateMyMakeupArtistProfile({
        ...form,
        currency: normalizeCurrencyCode(form.currency),
        specialties: form.specialties.split(',').map((item) => item.trim()).filter(Boolean),
        socialLinks: normalizeSocialLinks({ ...form.socialLinks, whatsapp: form.whatsapp }),
      })
      await refresh()
      setOverrides({})
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (error) {
      setUploadError(error.message || 'Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <span className="inline-flex w-fit rounded-full border border-rose-300/80 bg-rose-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-rose-700 dark:border-stone-700 dark:bg-stone-900 dark:text-rose-300">Public storefront profile</span>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="mt-2 text-sm text-stone-600 dark:text-rose-300">Make your makeup storefront feel polished with a strong bio, image, specialties, and social links clients can tap instantly.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid max-w-6xl gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <section className={panelClassName}>
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">Basic details</h2>
                <p className="mt-1 text-sm text-stone-600 dark:text-rose-300">These details power the headline section of your public makeup storefront.</p>
              </div>
              <div className="rounded-full border border-rose-200 px-3 py-1 text-xs text-stone-600 dark:border-stone-700 dark:text-rose-300">/{makeupArtist?.slug || 'your-slug'}</div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input className={inputClassName} value={form.name} onChange={(event) => setField('name', event.target.value)} required />
              </div>
              <div>
                <label className="block text-sm font-medium">Slug</label>
                <input className={`${inputClassName} cursor-not-allowed opacity-70`} value={makeupArtist?.slug || ''} disabled />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium">Bio</label>
              <textarea className={textareaClassName} value={form.bio} onChange={(event) => setField('bio', event.target.value)} placeholder="Tell clients about your signature beauty looks, makeup style, and what makes your artistry special." />
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div>
                <label className="block text-sm font-medium">Location</label>
                <input className={inputClassName} value={form.location} onChange={(event) => setField('location', event.target.value)} placeholder="Abuja, Nigeria" />
              </div>
              <div>
                <label className="block text-sm font-medium">WhatsApp</label>
                <input className={inputClassName} value={form.whatsapp} onChange={(event) => setField('whatsapp', event.target.value)} placeholder="2348012345678" />
              </div>
              <div>
                <label className="block text-sm font-medium">Currency</label>
                <Select value={form.currency} onValueChange={(value) => setField('currency', value)}>
                  <SelectTrigger className="mt-2 h-11 w-full rounded-xl border-rose-200 bg-white/90 px-4 dark:border-stone-700 dark:bg-stone-900">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent className="bg-rose-50">
                    {currencyOptions.map((option) => (
                      <SelectItem key={option.code} value={option.code} className="bg-rose-50">{option.code} — {option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-3 lg:col-span-1">
                <label className="block text-sm font-medium">Subscription</label>
                <input className={`${inputClassName} cursor-not-allowed opacity-70`} value={makeupArtist?.subscriptionPlan || ''} disabled />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium">Specialties</label>
              <input className={inputClassName} value={form.specialties} onChange={(event) => setField('specialties', event.target.value)} placeholder="Bridal glam, Soft glam, Editorial beauty" />
              <p className="mt-2 text-xs text-stone-500 dark:text-rose-400">Separate specialties with commas.</p>
            </div>
          </section>

          <section className={panelClassName}>
            <div className="mb-5">
              <h2 className="text-lg font-semibold">Social links</h2>
              <p className="mt-1 text-sm text-stone-600 dark:text-rose-300">Add your Facebook, Instagram, TikTok, Twitter, and LinkedIn profiles so clients can follow your work and contact your brand easily.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {SOCIAL_PLATFORMS.map((platform) => {
                const href = socialLinks.find((item) => item.key === platform.key)?.href || ''
                return (
                  <div key={platform.key}>
                    <label className="block text-sm font-medium">{platform.label}</label>
                    <div className="mt-2 flex gap-2">
                      <input className={`${inputClassName} mt-0 ${platform.key === 'whatsapp' ? 'opacity-70' : ''}`} value={platform.key === 'whatsapp' ? buildWhatsAppUrl(form.whatsapp) : form.socialLinks[platform.key]} onChange={(event) => platform.key === 'whatsapp' ? setField('whatsapp', event.target.value) : setSocialField(platform.key, event.target.value)} placeholder={platform.key === 'whatsapp' ? 'Auto-generated from WhatsApp number' : `${platform.label.toLowerCase()}.com/yourhandle`} readOnly={platform.key === 'whatsapp'} />
                      <a href={href || undefined} target="_blank" rel="noreferrer" aria-disabled={!href} className={`inline-flex h-11 min-w-11 items-center justify-center rounded-xl border px-3 transition ${href ? 'border-rose-200 bg-rose-50 text-stone-950 hover:bg-rose-100 dark:border-stone-700 dark:bg-stone-900 dark:text-rose-300 dark:hover:bg-stone-800' : 'pointer-events-none border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-800 dark:bg-stone-900/60 dark:text-stone-500'}`}>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className={panelClassName}>
            <div className="mb-5">
              <h2 className="text-lg font-semibold">Profile image</h2>
              <p className="mt-1 text-sm text-stone-600 dark:text-rose-300">Upload a clean portrait or brand image for a stronger storefront first impression.</p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-rose-200 bg-rose-50/70 dark:border-stone-800 dark:bg-stone-900/70">
              {previewImage ? (
                <img src={previewImage} alt="Makeup artist profile preview" className="aspect-4/5 w-full object-cover" />
              ) : (
                <div className="flex aspect-4/5 items-center justify-center px-6 text-center text-sm text-stone-500 dark:text-rose-300">Upload a storefront image or paste an image URL below.</div>
              )}
            </div>

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            <div className="mt-4 flex flex-wrap gap-3">
              <Button type="button" className="rounded-xl border-2 border-rose-300 bg-white text-stone-950 hover:bg-rose-50 dark:border-stone-700 dark:bg-stone-900 dark:text-rose-300" onClick={() => fileInputRef.current?.click()}>
                <ImagePlus className="mr-2 h-4 w-4" />
                {uploading ? 'Uploading…' : previewImage ? 'Change image' : 'Upload image'}
              </Button>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium">Profile image URL</label>
              <input className={inputClassName} value={form.profileImage} onChange={(event) => setField('profileImage', event.target.value)} placeholder="https://..." />
            </div>
            {uploadError ? <p className="mt-3 text-sm text-red-600">{uploadError}</p> : null}
          </section>

          <section className={panelClassName}>
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Quick preview</h2>
              <p className="mt-1 text-sm text-stone-600 dark:text-rose-300">See the contact and social touchpoints your clients will click on your public page.</p>
            </div>

            <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-4 dark:border-stone-800 dark:bg-stone-900/60">
              <div className="text-lg font-semibold">{form.name || 'Your makeup brand'}</div>
              <p className="mt-1 text-sm text-stone-600 dark:text-rose-300">{form.location || 'Add your location'} · {makeupArtist?.slug || 'your-slug'}</p>
              {form.whatsapp ? <p className="mt-1 text-sm text-stone-600 dark:text-rose-300">WhatsApp: {form.whatsapp}</p> : null}
              <p className="mt-3 text-sm text-stone-700 dark:text-rose-200">{form.bio || 'Your bio will appear here on your public storefront.'}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {String(form.specialties || '').split(',').map((item) => item.trim()).filter(Boolean).slice(0, 4).map((item) => (
                  <span key={item} className="rounded-full border border-rose-200 bg-white px-3 py-1 text-xs font-medium dark:border-stone-700 dark:bg-stone-950">{item}</span>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {socialLinks.length ? socialLinks.map((platform) => (
                  <a key={platform.key} href={platform.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white px-3 py-2 text-xs font-medium text-stone-950 transition hover:bg-rose-100 dark:border-stone-700 dark:bg-stone-950 dark:text-rose-300 dark:hover:bg-stone-800">
                    {platform.label}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )) : <span className="text-xs text-stone-500 dark:text-rose-300">Add social links to show clickable profile buttons.</span>}
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <Button type="submit" className="rounded-xl" disabled={saving}>{saving ? 'Saving…' : 'Save profile'}</Button>
              {saved ? <span className="text-sm font-medium text-emerald-700">Saved</span> : null}
            </div>
          </section>

          <ProviderAccountSettings
            email={user?.email || ''}
            tone="rose"
            audienceLabel="makeup artist"
            onChangePassword={changeMakeupArtistPassword}
          />
        </div>
      </form>
    </div>
  )
}
