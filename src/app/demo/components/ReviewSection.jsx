"use client"

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { Star } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

const STAR_COUNT = 5
const TOTAL_STAR_ANIMATION_SECONDS = 15
const STAR_DURATION = 1.2
const STAR_STAGGER = (TOTAL_STAR_ANIMATION_SECONDS - STAR_DURATION) / (STAR_COUNT - 1)
const REVIEW_ROTATION_MS = 4200

const ROUTE_REVIEW_CONFIG = {
  '/demo/barber-pro': {
    heading: 'Crown & Fade — Client Feedback',
    summary: 'Short client notes that reflect the premium cuts, consistent grooming, and calm studio experience.',
    rating: '5.0',
    reviewCount: '200+',
    accentClass: 'from-sky-500 to-cyan-400',
    reviews: [
      { name: 'James Walker', title: 'Fade client', quote: 'Best fade I’ve had in years. Super clean work and great attention to detail.', stars: 5 },
      { name: 'Michael Johnson', title: 'Beard trim client', quote: 'Came in for a beard trim and left looking brand new. Highly recommend.', stars: 5 },
      { name: 'Chris Anderson', title: 'Regular client', quote: 'The barber really knows his craft. Smooth experience from start to finish.', stars: 4 },
      { name: 'David Martinez', title: 'Lineup client', quote: 'Sharp lineup and perfect fade. Exactly what I asked for.', stars: 5 },
      { name: 'Anthony Brown', title: 'Repeat client', quote: 'Great vibe in the shop and even better service. Will definitely be back.', stars: 5 },
      { name: 'Kevin Harris', title: 'Loyal customer', quote: 'Professional and consistent every time. My go-to spot now.', stars: 4 },
      { name: 'Brian Clark', title: 'Haircut client', quote: 'Attention to detail is unmatched. One of the best cuts I’ve had.', stars: 5 },
      { name: 'Jason Lewis', title: 'Walk-in client', quote: 'Quick, clean, and affordable. Can’t ask for more.', stars: 4 },
    ],
  },
  '/demo/hair-specialist-pro': {
    heading: 'Jennie’s Hairs — Client Feedback',
    summary: 'Reviews that reinforce premium installs, texture care, styling quality, and a polished salon experience.',
    rating: '4.98',
    reviewCount: '240+',
    accentClass: 'from-rose-500 to-fuchsia-500',
    reviews: [
      { name: 'Mariam S.', title: 'Install client', quote: 'My install looked flawless, and the whole experience felt premium from consultation to final styling.', stars: 5 },
      { name: 'Ijeoma N.', title: 'Texture care client', quote: 'It felt like booking a real studio brand. The finish, communication, and service quality were excellent.', stars: 5 },
      { name: 'Vanessa P.', title: 'Color client', quote: 'Everything was polished and professional. I trusted the service before I even arrived.', stars: 5 },
      { name: 'Diana K.', title: 'Silk press client', quote: 'My hair looked healthy, sleek, and perfectly styled. The attention to detail stood out immediately.', stars: 4 },
    ],
  },
  '/demo/nail-tech-pro': {
    heading: 'Studio Gloss — Client Feedback',
    summary: 'Trust-building reviews that make every gel set, acrylic appointment, and nail art booking feel premium.',
    rating: '4.96',
    reviewCount: '210+',
    accentClass: 'bg-mauve-500 ',
    reviews: [
      { name: 'Zara E.', title: 'Gel manicure client', quote: 'The storefront looked premium and made booking so easy. I trusted it instantly because everything felt clean and detailed.', stars: 5 },
      { name: 'Amina T.', title: 'Acrylic set client', quote: 'I loved seeing reviews, nail art options, and the service menu all in one place before I booked.', stars: 5 },
      { name: 'Brielle N.', title: 'Repeat pedicure client', quote: 'It felt like booking with a real beauty brand, not just sending a message on social media.', stars: 5 },
    ],
  },
  '/demo/lash-tech-pro': {
    heading: 'Luna Lash — Client Feedback',
    summary: 'Social proof that makes first-time full sets and refill appointments feel safe, polished, and worth booking.',
    rating: '4.97',
    reviewCount: '160+',
    accentClass: 'from-violet-500 to-purple-500',
    reviews: [
      { name: 'Tolu A.', title: 'Hybrid refill client', quote: 'The storefront felt luxe and trustworthy. The reviews made booking super easy for my first visit.', stars: 5 },
      { name: 'Stephanie L.', title: 'Volume set client', quote: 'I loved being able to review the service menu, book fast, and later grab cleanser from the mini shop.', stars: 5 },
      { name: 'Amaka E.', title: 'Repeat client', quote: 'Everything looked polished. It felt like a serious beauty brand, not just a booking link.', stars: 5 },
    ],
  },
  '/demo/makeup-artist-pro': {
    heading: 'Velvet Canvas — Client Feedback',
    summary: 'High-trust client feedback that helps bridal, event, and editorial bookings feel premium from the first click.',
    rating: '5.0',
    reviewCount: '140+',
    accentClass: 'from-pink-500 to-rose-500',
    reviews: [
      { name: 'Chioma R.', title: 'Bride', quote: 'The storefront felt premium and calming. I booked because everything looked clear, luxurious, and trustworthy.', stars: 5 },
      { name: 'Jade M.', title: 'Event glam client', quote: 'I loved seeing real reviews and polished service details before booking. It matched the artist’s quality instantly.', stars: 5 },
      { name: 'Ada O.', title: 'Photoshoot client', quote: 'The whole page looked like a beauty brand website, not a basic booking form. That made the decision easy.', stars: 5 },
    ],
  },
}

const DEFAULT_CONFIG = {
  heading: 'Loved by clients',
  summary: 'Show off trust signals that make your storefront feel premium and reliable.',
  rating: '4.9',
  reviewCount: '120+',
  accentClass: 'from-orange-400 to-pink-500',
  reviews: [],
}

function AnimatedStars({ rating = 5, animated = false, size = 18, className = '' }) {
  return (
    <div className={`flex items-center  gap-1 ${className}`.trim()} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: STAR_COUNT }).map((_, index) => {
        const filled = index < rating

        return (
          <div key={`star-${index}`} className="relative  h-5 w-5">
            <Star className="absolute inset-0 h-full w-full text-white/18" strokeWidth={1.8} size={size} />
            {filled ? (
              <motion.div
                initial={animated ? { opacity: 0, scale: 0.7 } : { opacity: 1, scale: 1 }}
                whileInView={animated ? { opacity: 1, scale: 1 } : undefined}
                viewport={animated ? { once: true, amount: 0.6 } : undefined}
                transition={
                  animated
                    ? {
                        delay: index * STAR_STAGGER,
                        duration: STAR_DURATION,
                        ease: [0.22, 1, 0.36, 1],
                      }
                    : undefined
                }
                className="absolute inset-0"
              >
                <Star
                  className="h-full w-full fill-amber-300 text-amber-300 drop-shadow-[0_0_14px_rgba(252,211,77,0.45)]"
                  strokeWidth={1.8}
                  size={size}
                />
              </motion.div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

function normalizeReviews(reviews = []) {
  return reviews.map((review) => ({
    name: review.name,
    title: review.title || 'Verified client review',
    quote: review.quote || review.text || '',
    stars: review.stars || review.rating || 5,
  }))
}

export default function ReviewSection({
  heading,
  summary,
  rating,
  reviewCount,
  reviews,
  accentClass,
}) {
  const pathname = usePathname()
  const [activeReviewIndex, setActiveReviewIndex] = useState(0)

  const routeConfig = useMemo(
    () => ROUTE_REVIEW_CONFIG[pathname] || DEFAULT_CONFIG,
    [pathname],
  )

  const resolvedReviews = useMemo(
    () => normalizeReviews(reviews?.length ? reviews : routeConfig.reviews),
    [reviews, routeConfig.reviews],
  )

  const resolvedHeading = heading || routeConfig.heading
  const resolvedSummary = summary || routeConfig.summary
  const resolvedRating = rating || routeConfig.rating
  const resolvedReviewCount = reviewCount || routeConfig.reviewCount
  const resolvedAccentClass = accentClass || routeConfig.accentClass

  useEffect(() => {
    setActiveReviewIndex(0)
  }, [pathname, resolvedReviews.length])

  useEffect(() => {
    if (resolvedReviews.length <= 1) {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      setActiveReviewIndex((currentIndex) => (currentIndex + 1) % resolvedReviews.length)
    }, REVIEW_ROTATION_MS)

    return () => window.clearInterval(intervalId)
  }, [resolvedReviews.length])

  if (!resolvedReviews.length) {
    return null
  }

  const activeReview = resolvedReviews[activeReviewIndex]

  return (
    <section className="relative overflow-hidden rounded-4xl bg-stone-700 px-6 py-20 text-white shadow-[0_18px_50px_rgba(2,6,23,0.24)] dark:bg-stone-950 sm:px-8 lg:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent_28%)]" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 rounded-4xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8"
        >
          <p className={`inline-flex rounded-full bg-linear-to-r ${resolvedAccentClass} px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white`}>
            Reviews & ratings
          </p>
          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {resolvedHeading}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-200 sm:text-base">
                {resolvedSummary}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
              <AnimatedStars rating={5} animated className="justify-start" />
              <div className="mt-2 text-3xl font-black text-white">{resolvedRating}</div>
              <p className="mt-1 text-xs uppercase tracking-[0.24em] text-stone-300">
                From {resolvedReviewCount} reviews
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="relative min-h-80">
            <AnimatePresence mode="wait">
              <motion.article
                key={`${activeReview.name}-${activeReviewIndex}`}
                initial={{ opacity: 0, y: 28, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -18, scale: 0.985 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 rounded-4xl border border-white/10 bg-white/8 p-6 shadow-[0_18px_50px_rgba(2,6,23,0.35)] backdrop-blur-xl sm:p-8"
              >
                <div className="flex items-center justify-between gap-4">
                  <AnimatedStars rating={activeReview.stars} className="justify-start" />
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.24em] text-stone-300">
                    {activeReview.stars}.0 rating
                  </span>
                </div>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-100 sm:text-xl">
                  “{activeReview.quote}”
                </p>

                <div className="mt-8 border-t border-white/8 pt-5">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
                    {activeReview.name}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.22em] text-stone-300">
                    {activeReview.title}
                  </p>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          <div className="rounded-4xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8">
            <p className="text-sm uppercase tracking-[0.26em] text-stone-200">
              Live rotation
            </p>
            <p className="mt-3 text-sm leading-7 text-stone-200 sm:text-base">
              Reviews rotate one at a time to keep the section calm, premium, and easy to scan while preserving social proof.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {resolvedReviews.map((review, index) => (
                <button
                  key={`${review.name}-dot`}
                  type="button"
                  onClick={() => setActiveReviewIndex(index)}
                  className={`h-2.5 rounded-full transition ${
                    index === activeReviewIndex
                      ? 'w-10 bg-white shadow-[0_0_18px_rgba(255,255,255,0.28)]'
                      : 'w-2.5 bg-white/20 hover:bg-white/35'
                  }`}
                  aria-label={`Show review from ${review.name}`}
                />
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/8 pt-5 text-sm text-stone-300">
              <span>
                Review {activeReviewIndex + 1} of {resolvedReviews.length}
              </span>
              <span className="text-stone-200">Auto-advances every 4.2s</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
