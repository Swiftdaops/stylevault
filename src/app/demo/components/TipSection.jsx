export default function TipSection({
  heading = 'Make tipping effortless',
  description = 'Pro gives customers a polished way to add gratitude at checkout.',
  providerName = 'Your storefront',
  baseAmount = '$85',
  tipOptions = ['$5', '$10', '$20'],
  accentClass = 'from-orange-400 to-pink-500',
}) {
  return (
    <section className="rounded-4xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/10 backdrop-blur sm:p-8">
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <div className={`inline-flex rounded-full bg-linear-to-r ${accentClass} px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white`}>
            Tip section
          </div>
          <h2 className="mt-4 text-2xl font-black tracking-tight text-white sm:text-3xl">{heading}</h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-stone-300 sm:text-base">{description}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {tipOptions.map((tip, index) => (
              <div
                key={tip}
                className={`rounded-2xl border px-4 py-3 text-center text-sm font-semibold transition ${
                  index === 1
                    ? 'border-emerald-400/60 bg-emerald-500/10 text-emerald-300'
                    : 'border-white/10 bg-stone-950/70 text-stone-200'
                }`}
              >
                {tip}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-4xl border border-white/10 bg-stone-950/80 p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-400">Checkout preview</div>
              <div className="mt-2 text-xl font-bold text-white">Support {providerName}</div>
            </div>
            <div className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Tip enabled
            </div>
          </div>

          <div className="mt-6 space-y-4 text-sm text-stone-300">
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <span>Service total</span>
              <span className="font-semibold text-white">{baseAmount}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3">
              <span>Suggested tip</span>
              <span className="font-semibold text-emerald-300">{tipOptions[1] || '$10'}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base">
              <span className="font-semibold text-white">Estimated total</span>
              <span className="font-black text-white">{baseAmount} + {tipOptions[1] || '$10'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
