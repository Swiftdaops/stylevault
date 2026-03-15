"use client"

import React, { useEffect, useMemo, useState, useRef } from 'react'
import { getServiceCatalog, API_BASE_URL } from '@/lib/barber-api'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'

const inputClassName = 'mt-2 h-11 w-full rounded-xl border border-orange-200 bg-white/90 px-4 text-sm shadow-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200 dark:border-stone-700 dark:bg-stone-900 dark:focus:border-amber-500 dark:focus:ring-amber-500/20'
const textareaClassName = 'mt-2 min-h-24 w-full rounded-xl border border-orange-200 bg-white/90 px-4 py-3 text-sm shadow-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200 dark:border-stone-700 dark:bg-stone-900 dark:focus:border-amber-500 dark:focus:ring-amber-500/20'
const MAX_IMAGE_SIZE_BYTES = 100 * 1024 * 1024
const MAX_IMAGE_SIZE_LABEL = '100MB'

const initialForm = {
  catalogId: '',
  category: '',
  name: '',
  price: '',
  duration: '30',
  description: '',
  sampleImage: '',
  homeServiceAvailable: false,
}

export default function ServiceForm({ barber, mode = 'create', initialValue = null, onCancel, onSubmit, saving = false, error = '' }) {
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
      const data = await getServiceCatalog()
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
      price: String((Number(initialValue.price || 0) / 100).toFixed(2)),
      duration: String(initialValue.duration || 30),
      description: initialValue.description || '',
      sampleImage: initialValue.sampleImage || '',
      homeServiceAvailable: Boolean(initialValue.homeServiceAvailable),
    })
  }, [initialValue])

  const selectedCatalogItem = useMemo(
    () => catalog.find((item) => item._id === form.catalogId) || null,
    [catalog, form.catalogId],
  )

  const previewImage = localPreview || form.sampleImage || selectedCatalogItem?.image || ''

  const handleCatalogChange = (value) => {
    const item = catalog.find((entry) => entry._id === value)
    setForm((current) => ({
      ...current,
      catalogId: value,
      category: item?.category || current.category,
      name: item?.name || current.name,
      description: item?.description || current.description,
    }))
  }

  const handleFileChange = async (e) => {
    setUploadError('')
    const file = e.target.files && e.target.files[0]
    if (!file) return

    if (!file.type?.startsWith('image/')) {
      setUploadError('Please choose an image file.')
      e.target.value = ''
      return
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      setUploadError(`Image must be ${MAX_IMAGE_SIZE_LABEL} or smaller.`)
      e.target.value = ''
      return
    }

    // immediate local preview
    try {
      const objectUrl = URL.createObjectURL(file)
      setLocalPreview(objectUrl)
    } catch (err) {
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
      setForm((f) => ({ ...f, sampleImage: data.url }))
      // clear local preview after successful upload
      if (localPreview) {
        try { URL.revokeObjectURL(localPreview) } catch (e) {}
        setLocalPreview('')
      }
    } catch (err) {
      console.error('Upload error', err)
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
      price: Math.round(Number(form.price || 0) * 100),
      duration: Number(form.duration || 0),
      description: form.description,
      sampleImage: form.sampleImage,
      homeServiceAvailable: Boolean(form.homeServiceAvailable),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-orange-200/70 bg-white/90 p-6 shadow-sm dark:border-stone-800 dark:bg-stone-950/70">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-lg font-semibold">{mode === 'edit' ? 'Edit service' : 'Create service'}</div>
          <div className="text-sm text-stone-600 dark:text-amber-300">Select from the professional service catalog and set your own price.</div>
        </div>
        {onCancel && <Button type="button" variant="outline" onClick={onCancel}>Close</Button>}
      </div>

      <div>
        <label className="block text-sm font-medium">Catalog service</label>
        <Select value={form.catalogId} onValueChange={handleCatalogChange}>
          <SelectTrigger className="mt-2 h-11 w-full rounded-xl border-orange-200 bg-white/90 px-4 dark:border-stone-700 dark:bg-stone-900">
            <SelectValue placeholder={loadingCatalog ? 'Loading services…' : 'Select a service template'} />
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
          <div>
            <label className="block text-sm font-medium">Service name</label>
            <input className={inputClassName} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium">Price ({barber?.currency || 'USD'})</label>
              <input type="number" step="0.01" min="0" className={inputClassName} value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} required />
            </div>
            <div>
              <label className="block text-sm font-medium">Duration (min)</label>
              <input type="number" min="5" step="5" className={inputClassName} value={form.duration} onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))} required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea className={textareaClassName} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
          </div>

          <div>
            <label className="block text-sm font-medium">Sample image</label>
            <div className="mt-1 flex items-center gap-3">
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              <Button type="button" className="border-2 border-orange-300 bg-white text-stone-950 hover:bg-orange-50 dark:border-stone-700 dark:bg-stone-900 dark:text-amber-300" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
                {uploading ? 'Uploading…' : previewImage ? 'Change image' : 'Add image'}
              </Button>
              {uploading ? <span className="text-sm text-stone-600">Uploading…</span> : null}
            </div>
            <p className="mt-1 text-xs text-stone-500 dark:text-amber-400">This image is shown on your public barber page. JPG, PNG, WEBP, or SVG up to {MAX_IMAGE_SIZE_LABEL}.</p>
            {uploadError ? <div className="mt-2 text-xs text-red-600">{uploadError}</div> : null}
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.homeServiceAvailable} onChange={(e) => setForm((f) => ({ ...f, homeServiceAvailable: e.target.checked }))} />
            Home service available
          </label>
        </div>

        <div className="space-y-3 rounded-2xl border border-orange-200/60 bg-orange-50/80 p-4 dark:border-stone-800 dark:bg-stone-950">
          <div className="text-sm font-medium">Preview</div>
          <div className="overflow-hidden rounded-lg border border-orange-200/60 bg-white dark:border-stone-800 dark:bg-stone-900">
            {previewImage ? (
              <img src={previewImage} alt={form.name || selectedCatalogItem?.name || 'Service preview'} className="h-40 w-full object-cover" />
            ) : (
              <div className="flex h-40 items-center justify-center text-sm text-stone-500">Add an image</div>
            )}
          </div>
          {selectedCatalogItem?.image && (
            <div className="text-xs text-stone-500 dark:text-amber-400">Template image available; your sample image will override it publicly.</div>
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
