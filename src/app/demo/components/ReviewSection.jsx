import { Star } from 'lucide-react'

export default function ReviewSection({
  heading = 'Loved by clients',
  summary = 'Show off trust signals that make your storefront feel premium and reliable.',
  rating = '4.9',
  reviewCount = '120+',
  reviews = [],
  accentClass = 'from-orange-400 to-pink-500',
}) {
  return (
    <section className="rounded-4xl border border-stone-200 bg-white/90 p-6 shadow-2xl shadow-orange-100/50 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-black/10 sm:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className={`inline-flex rounded-full bg-linear-to-r ${accentClass} px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white`}>
            Reviews & ratings
          </div>
          <h2 className="mt-4 text-2xl font-black tracking-tight text-stone-950 dark:text-white sm:text-3xl">{heading}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600 dark:text-stone-300 sm:text-base">{summary}</p>
        </div>

        <div className="rounded-3xl border border-stone-200 bg-stone-50 px-6 py-5 text-center dark:border-white/10 dark:bg-black/20">
          <div className="flex justify-center gap-1 text-amber-400">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <div className="mt-2 text-3xl font-black text-stone-950 dark:text-white">{rating}</div>
          <div className="text-xs uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">From {reviewCount} reviews</div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {reviews.map((review) => (
          <article key={`${review.name}-${review.title}`} className="rounded-3xl border border-stone-200 bg-stone-50 p-5 dark:border-white/10 dark:bg-stone-950/70">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-semibold text-stone-950 dark:text-white">{review.name}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">{review.title}</div>
              </div>
              <div className="flex gap-1 text-amber-400">
                {Array.from({ length: review.stars || 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" />
                ))}
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-stone-600 dark:text-stone-300">“{review.quote}”</p>
          </article>
        ))}
      </div>
    </section>
  )
}
