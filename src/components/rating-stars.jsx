import { Star } from 'lucide-react'

const STAR_COUNT = 5

function clamp(value) {
  return Math.max(0, Math.min(STAR_COUNT, Number(value) || 0))
}

export default function RatingStars({
  rating = 0,
  interactive = false,
  onChange,
  size = 18,
  className = '',
  showValue = false,
  valueClassName = '',
  filledClassName = 'text-amber-400',
  emptyClassName = 'text-stone-300',
  buttonClassName = '',
}) {
  const normalizedRating = clamp(rating)

  return (
    <div className={`flex items-center gap-2 ${className}`.trim()} aria-label={`${normalizedRating} out of 5 stars`}>
      <div className="flex items-center gap-1">
        {Array.from({ length: STAR_COUNT }).map((_, index) => {
          const starValue = index + 1

          if (interactive) {
            const filled = starValue <= Math.round(normalizedRating)

            return (
              <button
                key={`star-${starValue}`}
                type="button"
                onClick={() => onChange?.(starValue)}
                className={`rounded-full p-0.5 transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400/60 ${buttonClassName}`.trim()}
                aria-label={`Rate ${starValue} star${starValue === 1 ? '' : 's'}`}
              >
                <Star
                  size={size}
                  strokeWidth={1.8}
                  className={filled ? filledClassName : emptyClassName}
                  fill={filled ? 'currentColor' : 'none'}
                />
              </button>
            )
          }

          const fillWidth = `${Math.max(0, Math.min(1, normalizedRating - index)) * 100}%`

          return (
            <span key={`star-${starValue}`} className="relative inline-flex h-5 w-5" aria-hidden="true">
              <Star size={size} strokeWidth={1.8} className={emptyClassName} fill="none" />
              <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: fillWidth }}>
                <Star size={size} strokeWidth={1.8} className={filledClassName} fill="currentColor" />
              </span>
            </span>
          )
        })}
      </div>
      {showValue ? <span className={valueClassName}>{normalizedRating.toFixed(1)}</span> : null}
    </div>
  )
}
