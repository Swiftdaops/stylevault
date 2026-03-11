"use client"

import React, { useEffect, useState } from 'react'
import { createMyService, deleteMyService, formatCurrency, getMyServices, updateMyService } from '@/lib/barber-api'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/components/auth-provider'
import ServiceForm from '@/components/admin/service-form'
import { connectBarberSocket } from '@/lib/barber-socket'

export default function ServicesManager() {
  const { barber } = useAuth()
  const [services, setServices] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editingService, setEditingService] = useState(null)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadServices = async () => {
    setLoading(true)
    const data = await getMyServices()
    setServices(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => {
    loadServices()
  }, [])

  useEffect(() => {
    if (!barber?._id) return undefined

    const socket = connectBarberSocket(barber._id)
    const handleUpdate = (payload) => {
      if (payload?.type === 'service' || payload?.type === 'profile') {
        loadServices()
      }
    }

    socket?.on('barber:data-updated', handleUpdate)

    return () => {
      socket?.off('barber:data-updated', handleUpdate)
      socket?.emit('unsubscribe:barber', barber._id)
      socket?.disconnect()
    }
  }, [barber?._id])

  const handleSubmit = async (payload) => {
    setSaving(true)
    setError('')

    try {
      if (editingId) {
        await updateMyService(editingId, payload)
      } else {
        await createMyService(payload)
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
    await deleteMyService(id)
    await loadServices()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Services</h1>
          <p className="text-sm text-stone-600 dark:text-amber-300">Manage the services visible on your booking page.</p>
        </div>
        <Button type="button" onClick={() => { setShowForm((value) => !value); setEditingId(null); setEditingService(null); setError('') }}>
          {showForm ? 'Hide form' : 'Create service'}
        </Button>
      </div>

      {showForm && (
        <ServiceForm
          barber={barber}
          mode={editingId ? 'edit' : 'create'}
          initialValue={editingService}
          onSubmit={handleSubmit}
          onCancel={() => { setShowForm(false); setEditingId(null); setEditingService(null); setError('') }}
          saving={saving}
          error={error}
        />
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="space-y-4">
          {loading && <div className="rounded-xl border border-orange-200/60 bg-white/80 p-5 dark:border-stone-800 dark:bg-black/60">Loading services…</div>}
        </div>

        {/* Create service card with Add image button */}
        <div className="overflow-hidden rounded-xl border border-dashed border-orange-200/60 bg-white/80 p-5 dark:border-stone-800 dark:bg-black/60">
          <div className="aspect-[4/3] mb-4 flex items-center justify-center overflow-hidden bg-orange-100 dark:bg-stone-900">
            <div className="text-center">
              <div className="mb-2 text-sm font-medium text-stone-600 dark:text-amber-300">Create</div>
              <div className="flex items-center justify-center gap-2">
                <Button type="button" onClick={() => { setShowForm(true); setEditingId(null); setEditingService(null); setError('') }}>Create service</Button>
                <Button type="button" variant="outline" onClick={() => { setShowForm(true); setEditingId(null); setEditingService(null); setError('') }}>Add image</Button>
              </div>
            </div>
          </div>
          <div className="text-sm text-stone-600 dark:text-amber-300">Click to open the create form and upload a sample image.</div>
        </div>

        {!loading && services.length === 0 && <div className="rounded-xl border border-dashed border-orange-200/60 bg-white/80 p-5 text-sm dark:border-stone-800 dark:bg-black/60">No services yet.</div>}
        {services.map((service) => (
          <div key={service._id} className="overflow-hidden rounded-xl border border-orange-200/60 bg-white/80 dark:border-stone-800 dark:bg-black/60">
            <div className="aspect-[4/3] overflow-hidden bg-orange-100 dark:bg-stone-900">
              {service.sampleImage || service.catalogId?.image ? (
                <img src={service.sampleImage || service.catalogId?.image} alt={service.name} className="h-full w-full object-cover" />
              ) : null}
            </div>
            <div className="space-y-4 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-1 text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-amber-300">{service.category || service.catalogId?.category || 'Service'}</div>
                  <h2 className="text-lg font-semibold">{service.name}</h2>
                  <div className="mt-1 text-sm text-stone-600 dark:text-amber-300">{formatCurrency(service.price, barber?.currency || 'USD')} • {service.duration} min</div>
                  {service.description && <p className="mt-2 text-sm text-stone-700 dark:text-amber-200">{service.description}</p>}
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-orange-100 px-2 py-1 text-stone-800">{service.bookingsCount || 0} bookings</span>
                    {service.homeServiceAvailable && <span className="rounded-full bg-emerald-100 px-2 py-1 text-emerald-800">Home service</span>}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => handleEdit(service)}>Edit</Button>
                <Button type="button" variant="destructive" onClick={() => handleDelete(service._id)}>Delete</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
