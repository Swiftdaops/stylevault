'use client'

import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import RatingStars from '@/components/rating-stars'
import { submitPublicBookingReview } from '@/lib/customer-booking-api'

export default function BookingReviewPanel({
  providerType,
  bookingId,
  accessToken,
  status,
  providerName,
  serviceName,
  initialReview = null,
  panelClassName = '',
  accentClassName = '',
  buttonClassName = '',
  onReviewSaved,
}) {
  const [rating, setRating] = useState(() => Number(initialReview?.rating || 0))
  const [comment, setComment] = useState(() => String(initialReview?.comment || ''))
  const [saving, setSaving] = useState(false)
  const [savedReview, setSavedReview] = useState(initialReview)

  const canReview = status === 'completed' && providerType && bookingId && accessToken
  const hasExistingReview = useMemo(() => Boolean(savedReview?.id || initialReview?.id), [initialReview?.id, savedReview?.id])

  if (!canReview) {
    return null
  }

  const handleSubmit = async () => {
    if (!rating) {
      toast.error('Please choose a star rating first')
      return
    }

    setSaving(true)

    try {
      const result = await submitPublicBookingReview({
        providerType,
        bookingId,
        accessToken,
        payload: {
          rating,
          comment,
        },
      })

      setSavedReview(result?.review || null)
      if (result?.review) {
        setRating(Number(result.review.rating || 0))
        setComment(String(result.review.comment || ''))
      }
      onReviewSaved?.(result)
      toast.success(hasExistingReview ? 'Review updated' : 'Review saved', {
        description: `Thanks for sharing feedback for ${providerName || 'your appointment'}.`,
      })
    } catch (error) {
      toast.error(error?.message || 'Unable to save your review right now')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className={`rounded-2xl border border-black/10 bg-black/5 p-4 dark:border-white/10 dark:bg-white/5 ${panelClassName}`.trim()}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${accentClassName}`.trim()}>Leave a review</p>
          <h3 className="mt-2 text-lg font-semibold">How was your appointment with {providerName || 'your provider'}?</h3>
          <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">
            {serviceName ? `Share feedback for ${serviceName}.` : 'Share a star rating and an optional comment.'}
          </p>
        </div>
        {savedReview?.updatedAt ? (
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
            Review saved
          </span>
        ) : null}
      </div>

      <div className="mt-4 space-y-4">
        <RatingStars
          interactive
          rating={rating}
          onChange={setRating}
          size={22}
          className="items-center"
          valueClassName="text-sm font-medium text-stone-600 dark:text-stone-300"
          showValue={Boolean(rating)}
        />

        <label className="block">
          <span className="mb-2 block text-sm font-medium">Comment (optional)</span>
          <textarea
            value={comment}
            onChange={(event) => setComment(event.target.value.slice(0, 1200))}
            rows={4}
            placeholder="Tell future customers what you liked about the service."
            className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-amber-400 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
          />
        </label>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving || !rating}
            className={`inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${buttonClassName}`.trim()}
          >
            {saving ? 'Saving…' : hasExistingReview ? 'Update review' : 'Save review'}
          </button>
          <span className="text-xs text-stone-500 dark:text-stone-400">Five empty stars turn gold when you click them.</span>
        </div>
      </div>
    </section>
  )
}
