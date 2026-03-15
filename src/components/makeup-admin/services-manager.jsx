"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useMakeupArtistAuth } from '@/components/makeup-artist-auth-provider'
import { connectMakeupArtistSocket } from '@/lib/makeup-artist-socket'
import { createMyMakeupService, deleteMyMakeupService, formatCurrency, getMyMakeupServices, updateMyMakeupService } from '@/lib/makeup-artist-api'
import MakeupServiceForm from '@/components/makeup-admin/service-form'

export default function MakeupServicesManager() {
  const { makeupArtist } = useMakeupArtistAuth()
  const [services, setServices] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editingService, setEditingService] = useState(null)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadServices = async () => {
    setLoading(true)
    const data = await getMyMakeupServices()
    setServices(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => {
    loadServices()
  }, [])

  useEffect(() => {
    if (!makeupArtist?._id) return undefined

    const socket = connectMakeupArtistSocket(makeupArtist._id)
    const handleUpdate = (payload) => {
      if (payload?.type === 'service' || payload?.type === 'profile') {
        loadServices()
      }
    }

    socket?.on('makeup-artist:data-updated', handleUpdate)

    return () => {
      socket?.off('makeup-artist:data-updated', handleUpdate)
    }
  }, [makeupArtist?._id])

  const handleSubmit = async (payload) => {
    setSaving(true)
    setError('')

    try {
      if (editingId) {
        await updateMyMakeupService(editingId, payload)
      } else {
        await createMyMakeupService(payload)
      }

      setEditingId(null)
      setEditingService(null)
      setShowForm(false)
      await loadServices()
    } catch (err) {
      setError(err?.message || 'Failed to save service')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (service) => {
    setEditingId(service._id)
    setEditingService(service)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    await deleteMyMakeupService(id)
    await loadServices()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Services</h1>
          <p className="text-sm text-stone-600 dark:text-rose-300">Manage the makeup services visible on your booking page.</p>
        </div>
        <Button type="button" onClick={() => { setShowForm((value) => !value); setEditingId(null); setEditingService(null); setError('') }}>
          {showForm ? 'Hide form' : 'Create service'}
        </Button>
      </div>

      {showForm && (
        <MakeupServiceForm makeupArtist={makeupArtist} mode={editingId ? 'edit' : 'create'} initialValue={editingService} onSubmit={handleSubmit} onCancel={() => { setShowForm(false); setEditingId(null); setEditingService(null) }} saving={saving} error={error} />
      )}

      <div className="space-y-4">
        {loading && <div className="rounded-xl border border-rose-200/70 bg-white/90 p-5 dark:border-stone-800 dark:bg-black/60">Loading services…</div>}
        {!loading && services.length === 0 && <div className="rounded-xl border border-dashed border-rose-200/70 bg-white/90 p-5 text-sm dark:border-stone-800 dark:bg-black/60">No services created yet.</div>}

        {services.map((service) => (
          <article key={service._id} className="rounded-xl border border-rose-200/70 bg-white/90 p-5 dark:border-stone-800 dark:bg-black/60">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-semibold">{service.name}</h2>
                  {service.category ? <span className="rounded-full bg-rose-100 px-2 py-1 text-xs text-stone-800">{service.category}</span> : null}
                </div>
                <p className="text-sm text-stone-600 dark:text-rose-300">{service.description || 'No description added yet.'}</p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-stone-100 px-2 py-1 text-stone-800">{service.duration} min</span>
                  <span className="rounded-full bg-stone-100 px-2 py-1 text-stone-800">{formatCurrency(service.price, makeupArtist?.currency || 'USD')}</span>
                  {service.pricingOptions?.length ? <span className="rounded-full bg-stone-100 px-2 py-1 text-stone-800">{service.pricingOptions.length} pricing option(s)</span> : null}
                  {service.addOns?.length ? <span className="rounded-full bg-stone-100 px-2 py-1 text-stone-800">{service.addOns.length} add-on(s)</span> : null}
                  {service.homeServiceAvailable ? <span className="rounded-full bg-emerald-100 px-2 py-1 text-emerald-800">Home service</span> : null}
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => handleEdit(service)}>Edit</Button>
                <Button type="button" variant="destructive" onClick={() => handleDelete(service._id)}>Delete</Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
