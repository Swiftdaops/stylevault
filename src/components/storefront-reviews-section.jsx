import RatingStars from '@/components/rating-stars'

const themeByTone = {
  orange: {
    shell: 'border-orange-200 bg-white/80 dark:border-stone-800 dark:bg-stone-950/60',
    muted: 'text-stone-600 dark:text-amber-200',
    accent: 'text-stone-500 dark:text-amber-300',
    chip: 'bg-orange-50 dark:bg-stone-900',
  },
  rose: {
    shell: 'border-rose-200 bg-white/80 dark:border-stone-800 dark:bg-stone-950/60',
    muted: 'text-stone-600 dark:text-rose-200',
    accent: 'text-stone-500 dark:text-rose-300',
    chip: 'bg-rose-50 dark:bg-stone-900',
  },
  fuchsia: {
    shell: 'border-fuchsia-200 bg-white/80 dark:border-stone-800 dark:bg-stone-950/60',
    muted: 'text-stone-600 dark:text-fuchsia-200',
    accent: 'text-stone-500 dark:text-fuchsia-300',
    chip: 'bg-fuchsia-50 dark:bg-stone-900',
  },
  violet: {
    shell: 'border-violet-200 bg-white/80 dark:border-stone-800 dark:bg-stone-950/60',
    muted: 'text-stone-600 dark:text-violet-200',
    accent: 'text-stone-500 dark:text-violet-300',
    chip: 'bg-violet-50 dark:bg-stone-900',
  },
}

function formatReviewDate(value) {
  if (!value) return 'Recently'
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return 'Recently'

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(parsed)
}

export default function StorefrontReviewsSection({ providerName, reviewSummary, tone = 'orange' }) {
  const reviews = Array.isArray(reviewSummary?.items) ? reviewSummary.items : []
  const totalReviews = Number(reviewSummary?.totalReviews || 0)

  if (!reviews.length || totalReviews <= 0) {
    return null
  }

  const theme = themeByTone[tone] || themeByTone.orange
  const averageRating = Number(reviewSummary?.averageRating || 0)

  return (
    <section className="space-y-5">
      <div>
        <p className={`text-sm uppercase tracking-[0.2em] ${theme.accent}`}>Reviews</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight">What clients say about {providerName}</h2>
      </div>

      <div className={`rounded-3xl border p-6 shadow-sm ${theme.shell}`}>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className={`text-sm ${theme.muted}`}>Real feedback from completed appointments.</p>
            <div className="mt-3 flex items-center gap-4">
              <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
              <RatingStars rating={averageRating} showValue={false} />
            </div>
          </div>
          <div className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${theme.chip}`}>{totalReviews} review{totalReviews === 1 ? '' : 's'}</div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {reviews.map((review) => (
          <article key={review.id} className={`rounded-3xl border p-5 shadow-sm ${theme.shell}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold">{review.customerName || 'Verified customer'}</h3>
                <p className={`mt-1 text-xs uppercase tracking-[0.18em] ${theme.accent}`}>{formatReviewDate(review.createdAt)}</p>
              </div>
              <RatingStars rating={review.rating} />
            </div>
            {review.serviceName ? <p className={`mt-4 text-xs uppercase tracking-[0.18em] ${theme.accent}`}>{review.serviceName}</p> : null}
            {review.comment ? (
              <p className={`mt-3 text-sm leading-7 ${theme.muted}`}>{review.comment}</p>
            ) : (
              <p className={`mt-3 text-sm leading-7 ${theme.muted}`}>Left a {review.rating}-star rating for this completed appointment.</p>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
