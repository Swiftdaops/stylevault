'use client'

import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'

const themeMap = {
  orange: {
    panel: 'rounded-3xl border border-orange-200/70 bg-white/90 p-6 shadow-sm dark:border-stone-800 dark:bg-stone-950/70',
    input: 'mt-2 h-11 w-full rounded-xl border border-orange-200 bg-white/90 px-4 text-sm shadow-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200 dark:border-stone-700 dark:bg-stone-900 dark:focus:border-amber-500 dark:focus:ring-amber-500/20',
    help: 'text-stone-600 dark:text-amber-300',
  },
  rose: {
    panel: 'rounded-3xl border border-rose-200/70 bg-white/90 p-6 shadow-sm dark:border-stone-800 dark:bg-stone-950/70',
    input: 'mt-2 h-11 w-full rounded-xl border border-rose-200 bg-white/90 px-4 text-sm shadow-sm outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-200 dark:border-stone-700 dark:bg-stone-900 dark:focus:border-rose-400 dark:focus:ring-rose-400/20',
    help: 'text-stone-600 dark:text-rose-300',
  },
  fuchsia: {
    panel: 'rounded-3xl border border-fuchsia-200/70 bg-white/90 p-6 shadow-sm dark:border-stone-800 dark:bg-stone-950/70',
    input: 'mt-2 h-11 w-full rounded-xl border border-fuchsia-200 bg-white/90 px-4 text-sm shadow-sm outline-none transition focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-200 dark:border-stone-700 dark:bg-stone-900 dark:focus:border-fuchsia-400 dark:focus:ring-fuchsia-400/20',
    help: 'text-stone-600 dark:text-fuchsia-300',
  },
  violet: {
    panel: 'rounded-3xl border border-violet-200/70 bg-white/90 p-6 shadow-sm dark:border-stone-800 dark:bg-stone-950/70',
    input: 'mt-2 h-11 w-full rounded-xl border border-violet-200 bg-white/90 px-4 text-sm shadow-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200 dark:border-stone-700 dark:bg-stone-900 dark:focus:border-violet-400 dark:focus:ring-violet-400/20',
    help: 'text-stone-600 dark:text-violet-300',
  },
}

export default function ProviderAccountSettings({
  email = '',
  tone = 'orange',
  audienceLabel = 'storefront owner',
  onChangePassword,
}) {
  const theme = themeMap[tone] || themeMap.orange
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const canSubmit = useMemo(() => (
    Boolean(currentPassword && newPassword && confirmPassword && !saving)
  ), [confirmPassword, currentPassword, newPassword, saving])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters.')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.')
      return
    }

    setSaving(true)
    try {
      await onChangePassword?.({ currentPassword, newPassword })
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setSuccess('Password updated successfully.')
    } catch (submitError) {
      setError(submitError?.message || 'Unable to update password.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className={theme.panel}>
      <div className="mb-5">
        <h2 className="text-lg font-semibold">Account settings</h2>
        <p className={`mt-1 text-sm ${theme.help}`}>View the email attached to this ${audienceLabel} account and update the password used to sign in.</p>
      </div>

      <div>
        <label className="block text-sm font-medium">Email address</label>
        <input className={`${theme.input} cursor-not-allowed opacity-70`} value={email || 'No email found'} disabled readOnly />
      </div>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div>
          <label className="block text-sm font-medium">Current password</label>
          <input type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} className={theme.input} autoComplete="current-password" />
        </div>

        <div>
          <label className="block text-sm font-medium">New password</label>
          <input type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} className={theme.input} autoComplete="new-password" />
        </div>

        <div>
          <label className="block text-sm font-medium">Confirm new password</label>
          <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className={theme.input} autoComplete="new-password" />
        </div>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {success ? <p className="text-sm font-medium text-emerald-600">{success}</p> : null}

        <Button type="submit" className="rounded-xl" disabled={!canSubmit}>
          {saving ? 'Updating…' : 'Update password'}
        </Button>
      </form>
    </section>
  )
}
