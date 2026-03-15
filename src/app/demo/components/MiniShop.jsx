export default function MiniShop({
  heading = 'Sell products from your storefront',
  description = 'Turn aftercare and retail into extra revenue with a mini product shop.',
  products = [],
  accentClass = 'from-orange-400 to-pink-500',
}) {
  return (
    <section className="rounded-4xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/10 backdrop-blur sm:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className={`inline-flex rounded-full bg-linear-to-r ${accentClass} px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white`}>
            Mini shop
          </div>
          <h2 className="mt-4 text-2xl font-black tracking-tight text-white sm:text-3xl">{heading}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-300 sm:text-base">{description}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-stone-950/70 px-4 py-3 text-sm text-stone-300">
          Product cards, bundles, and upsells fit directly inside the Pro storefront.
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <article key={product.name} className="group rounded-[1.75rem] border border-white/10 bg-stone-950/80 p-5 transition hover:-translate-y-1 hover:border-white/20">
            <div className="flex h-40 items-center justify-center rounded-3xl bg-linear-to-br from-white/10 to-white/5 text-center text-sm font-semibold text-stone-300">
              {product.visual}
            </div>
            <div className="mt-5 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-white">{product.name}</h3>
                <p className="mt-1 text-sm leading-6 text-stone-400">{product.description}</p>
              </div>
              <div className="rounded-full bg-white px-3 py-1 text-sm font-bold text-stone-950">{product.price}</div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-stone-500">
              <span>{product.category}</span>
              <span className="text-emerald-300">In stock</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
