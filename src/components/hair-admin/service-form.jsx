"use client"

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { API_BASE_URL, getHairServiceCatalog } from '@/lib/hair-specialist-api'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'

const inputClassName = 'mt-2 h-11 w-full rounded-xl border border-rose-200 bg-white/90 px-4 text-sm shadow-sm outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-200 dark:border-stone-700 dark:bg-stone-900 dark:focus:border-rose-400 dark:focus:ring-rose-400/20'
const textareaClassName = 'mt-2 min-h-24 w-full rounded-xl border border-rose-200 bg-white/90 px-4 py-3 text-sm shadow-sm outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-200 dark:border-stone-700 dark:bg-stone-900 dark:focus:border-rose-400 dark:focus:ring-rose-400/20'
const MAX_IMAGE_SIZE_BYTES = 100 * 1024 * 1024
const MAX_IMAGE_SIZE_LABEL = '100MB'

const initialForm = {
  catalogId: '',
  category: '',
  name: '',
  basePrice: '',
  duration: '60',
  description: '',
  sampleImage: '',
  homeServiceAvailable: false,
  materialRequired: false,
  pricingOptionsText: '',
  addOnsText: '',
}

function priceToText(value) {
  return (Number(value || 0) / 100).toFixed(2)
}

function serializePricingOptions(options = []) {
  return options.map((option) => `${option.label}|${priceToText(option.price)}|${option.duration || ''}`).join('\n')
}

function serializeAddOns(options = []) {
  return options.map((option) => `${option.name}|${priceToText(option.price)}|${option.duration || 0}`).join('\n')
}

function parsePricingOptions(text) {
  return String(text || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label = '', price = '', duration = ''] = line.split('|').map((item) => item.trim())
      return {
        label,
        price: Math.round(Number(price || 0) * 100),
        duration: duration ? Number(duration) : undefined,
      }
    })
    .filter((item) => item.label && Number.isFinite(item.price))
}

function parseAddOns(text) {
  return String(text || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name = '', price = '', duration = '0'] = line.split('|').map((item) => item.trim())
      return {
        name,
        price: Math.round(Number(price || 0) * 100),
        duration: Number(duration || 0),
      }
    })
    .filter((item) => item.name && Number.isFinite(item.price))
}

export default function HairServiceForm({ hairSpecialist, mode = 'create', initialValue = null, onCancel, onSubmit, saving = false, error = '' }) {
  const [catalog, setCatalog] = useState([])
  const [loadingCatalog, setLoadingCatalog] = useState(true)
  const [form, setForm] = useState(initialForm)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [localPreview, setLocalPreview] = useState('')
  const fileInputRef = useRef(null)

  useEffect(() => {
    async function loadCatalog() {
      setLoadingCatalog(true)
      const data = await getHairServiceCatalog()
      setCatalog(Array.isArray(data) ? data : [])
      setLoadingCatalog(false)
    }

    loadCatalog()
  }, [])

  useEffect(() => {
    if (!initialValue) {
      setForm(initialForm)
      return
    }

    setForm({
      catalogId: initialValue.catalogId?._id || initialValue.catalogId || '',
      category: initialValue.category || initialValue.catalogId?.category || '',
      name: initialValue.name || '',
      basePrice: priceToText(initialValue.basePrice || initialValue.price || 0),
      duration: String(initialValue.duration || 60),
      description: initialValue.description || '',
      sampleImage: initialValue.sampleImage || '',
      homeServiceAvailable: Boolean(initialValue.homeServiceAvailable),
      materialRequired: Boolean(initialValue.materialRequired),
      pricingOptionsText: serializePricingOptions(initialValue.pricingOptions),
      addOnsText: serializeAddOns(initialValue.addOns),
    })
  }, [initialValue])

  const selectedCatalogItem = useMemo(
    () => catalog.find((item) => item._id === form.catalogId) || null,
    [catalog, form.catalogId],
  )

  const previewImage = localPreview || form.sampleImage || selectedCatalogItem?.image || ''

  const categoryOptions = useMemo(() => {
    const values = new Set(catalog.map((item) => item.category).filter(Boolean))
    if (form.category) values.add(form.category)
    return Array.from(values)
  }, [catalog, form.category])

  const handleCatalogChange = (value) => {
    const item = catalog.find((entry) => entry._id === value)
    setForm((current) => ({
      ...current,
      catalogId: value,
      category: item?.category || current.category,
      name: item?.name || current.name,
      description: item?.description || current.description,
      sampleImage: current.sampleImage || item?.image || '',
    }))
  }

  const handleFileChange = async (event) => {
    setUploadError('')
    const file = event.target.files && event.target.files[0]
    if (!file) return

    if (!file.type?.startsWith('image/')) {
      setUploadError('Please choose an image file.')
      event.target.value = ''
      return
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      setUploadError(`Image must be ${MAX_IMAGE_SIZE_LABEL} or smaller.`)
      event.target.value = ''
      return
    }

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
      setForm((current) => ({ ...current, sampleImage: data.url }))
      if (localPreview) {
        try { URL.revokeObjectURL(localPreview) } catch {}
        setLocalPreview('')
      }
    } catch (err) {
      setUploadError(err.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await onSubmit({
      catalogId: form.catalogId || undefined,
      category: form.category,
      name: form.name,
      basePrice: Math.round(Number(form.basePrice || 0) * 100),
      duration: Number(form.duration || 0),
      description: form.description,
      sampleImage: form.sampleImage,
      homeServiceAvailable: Boolean(form.homeServiceAvailable),
      materialRequired: Boolean(form.materialRequired),
      pricingOptions: parsePricingOptions(form.pricingOptionsText),
      addOns: parseAddOns(form.addOnsText),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-rose-200/70 bg-white/90 p-6 shadow-sm dark:border-stone-800 dark:bg-stone-950/70">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-lg font-semibold">{mode === 'edit' ? 'Edit service' : 'Create service'}</div>
          <div className="text-sm text-stone-600 dark:text-rose-300">Add salon services, pricing tiers, and add-ons for your booking page.</div>
        </div>
        {onCancel && <Button type="button" variant="outline" onClick={onCancel}>Close</Button>}
      </div>

      <div>
        <label className="block text-sm font-medium">Catalog service</label>
        <Select value={form.catalogId} onValueChange={handleCatalogChange}>
          <SelectTrigger className="mt-2 h-11 w-full rounded-xl border-rose-200 bg-white/90 px-4 dark:border-stone-700 dark:bg-stone-900">
            <SelectValue placeholder={loadingCatalog ? 'Loading services…' : 'Optional: select a service template'} />
          </SelectTrigger>
          <SelectContent className="bg-red-50">
            {catalog.map((item) => (
              <SelectItem key={item._id} value={item._id} className="bg-red-50">{item.category} — {item.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium">Service name</label>
                <input className={inputClassName} value={form.name} onChange={(e) => setForm((current) => ({ ...current, name: e.target.value }))} required />
            </div>
            <div>
              <label className="block text-sm font-medium">Category</label>
              <Select value={form.category} onValueChange={(v) => setForm((current) => ({ ...current, category: v }))}>
                <SelectTrigger className="mt-2 h-11 w-full rounded-xl border-rose-200 bg-white/90 px-4 dark:border-stone-700 dark:bg-stone-900">
                  <SelectValue placeholder="Select or enter a category" />
                </SelectTrigger>
                <SelectContent className="bg-red-50">
                  {categoryOptions.map((option) => (
                    <SelectItem key={option} value={option} className="bg-red-50">{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium">Starting price ({hairSpecialist?.currency || 'USD'})</label>
              <input type="number" step="0.01" min="0" className={inputClassName} value={form.basePrice} onChange={(e) => setForm((current) => ({ ...current, basePrice: e.target.value }))} required />
            </div>
            <div>
              <label className="block text-sm font-medium">Duration (min)</label>
              <input type="number" min="5" step="5" className={inputClassName} value={form.duration} onChange={(e) => setForm((current) => ({ ...current, duration: e.target.value }))} required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea className={textareaClassName} value={form.description} onChange={(e) => setForm((current) => ({ ...current, description: e.target.value }))} />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium">Pricing options</label>
              <textarea
                className={`${textareaClassName} min-h-28 text-sm`}
                value={form.pricingOptionsText}
                onChange={(e) => setForm((current) => ({ ...current, pricingOptionsText: e.target.value }))}
                placeholder="Shoulder Length|120.00|180\nWaist Length|160.00|240"
              />
              <p className="mt-1 text-xs text-stone-500 dark:text-rose-400">Format: Label|Price|Duration minutes</p>
            </div>
            <div>
              <label className="block text-sm font-medium">Add-ons</label>
              <textarea
                className={`${textareaClassName} min-h-28 text-sm`}
                value={form.addOnsText}
                onChange={(e) => setForm((current) => ({ ...current, addOnsText: e.target.value }))}
                placeholder="Hair Wash|15.00|15\nScalp Treatment|20.00|20"
              />
              <p className="mt-1 text-xs text-stone-500 dark:text-rose-400">Format: Name|Price|Extra minutes</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Sample image</label>
            <div className="mt-1 flex items-center gap-3">
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              <Button type="button" className="border-2 border-rose-300 bg-white text-stone-950 hover:bg-rose-50 dark:border-stone-700 dark:bg-stone-900 dark:text-rose-300" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
                {uploading ? 'Uploading…' : previewImage ? 'Change image' : 'Add image'}
              </Button>
              {uploading ? <span className="text-sm text-stone-600">Uploading…</span> : null}
            </div>
            <p className="mt-1 text-xs text-stone-500 dark:text-rose-400">This image is shown on your public salon page. JPG, PNG, WEBP, or SVG up to {MAX_IMAGE_SIZE_LABEL}.</p>
            {uploadError ? <div className="mt-2 text-xs text-red-600">{uploadError}</div> : null}
          </div>

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.homeServiceAvailable} onChange={(e) => setForm((current) => ({ ...current, homeServiceAvailable: e.target.checked }))} />
              Home service available
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.materialRequired} onChange={(e) => setForm((current) => ({ ...current, materialRequired: e.target.checked }))} />
              Client materials required
            </label>
          </div>
        </div>

        <div className="space-y-3 rounded-2xl border border-rose-200/70 bg-rose-50/80 p-4 dark:border-stone-800 dark:bg-stone-950">
          <div className="text-sm font-medium">Preview</div>
          <div className="overflow-hidden rounded-lg border border-rose-200/70 bg-white dark:border-stone-800 dark:bg-stone-900">
            {previewImage ? (
              <img src={previewImage} alt={form.name || selectedCatalogItem?.name || 'Service preview'} className="h-40 w-full object-cover" />
            ) : (
              <div className="flex h-40 items-center justify-center text-sm text-stone-500">Add an image</div>
            )}
          </div>
          {selectedCatalogItem?.image && (
            <div className="text-xs text-stone-500 dark:text-rose-400">Template image available; your sample image will override it publicly.</div>
          )}
        </div>
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}

      <div className="flex gap-2">
        <Button type="submit" disabled={saving}>{saving ? 'Saving…' : mode === 'edit' ? 'Update service' : 'Create service'}</Button>
        {onCancel && <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  )
}
