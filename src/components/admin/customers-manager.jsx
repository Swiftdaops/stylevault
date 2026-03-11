"use client"

import React, { useEffect, useState } from 'react'
import { getMyCustomers, updateMyCustomer } from '@/lib/barber-api'
import { Button } from '@/components/ui/button'

export default function CustomersManager() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [draft, setDraft] = useState({ name: '', phone: '' })

  const loadCustomers = async () => {
    setLoading(true)
    const data = await getMyCustomers()
    setCustomers(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => {
    loadCustomers()
  }, [])

  const startEdit = (customer) => {
    setEditingId(customer._id)
    setDraft({ name: customer.name || '', phone: customer.phone || '' })
  }

  const save = async () => {
    await updateMyCustomer(editingId, draft)
    setEditingId(null)
    await loadCustomers()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Customers</h1>
        <p className="text-sm text-stone-600 dark:text-amber-300">Only your own customers appear here.</p>
      </div>

      <div className="space-y-4">
        {loading && <div className="rounded-xl border border-orange-200/60 bg-white/80 p-5 dark:border-stone-800 dark:bg-black/60">Loading customers…</div>}
        {!loading && customers.length === 0 && <div className="rounded-xl border border-dashed border-orange-200/60 bg-white/80 p-5 text-sm dark:border-stone-800 dark:bg-black/60">No customers yet.</div>}

        {customers.map((customer) => (
          <div key={customer._id} className="rounded-xl border border-orange-200/60 bg-white/80 p-5 dark:border-stone-800 dark:bg-black/60">
            <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-center">
              <div>
                <div className="font-semibold">{customer.name}</div>
                <div className="text-sm text-stone-600 dark:text-amber-300">{customer.email}</div>
                <div className="mt-2 text-xs text-stone-500 dark:text-amber-400">Visits: {customer.visitHistory?.length || 0}</div>
              </div>

              {editingId === customer._id ? (
                <div className="grid gap-2 md:grid-cols-2">
                  <input className="rounded-md border px-3 py-2 dark:bg-stone-900" value={draft.name} onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))} />
                  <input className="rounded-md border px-3 py-2 dark:bg-stone-900" value={draft.phone} onChange={(e) => setDraft((d) => ({ ...d, phone: e.target.value }))} placeholder="Phone number" />
                </div>
              ) : (
                <div className="text-sm text-stone-700 dark:text-amber-200">{customer.phone || 'No phone number set'}</div>
              )}

              <div className="flex gap-2 justify-end">
                {editingId === customer._id ? (
                  <>
                    <Button type="button" onClick={save}>Save</Button>
                    <Button type="button" variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
                  </>
                ) : (
                  <Button type="button" variant="outline" onClick={() => startEdit(customer)}>Edit</Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
