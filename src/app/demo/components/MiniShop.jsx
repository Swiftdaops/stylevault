"use client"

import { useState } from "react"
import { Search, ShoppingBag, Plus } from "lucide-react"

const DEMO_PRODUCTS = [
  {
    id: 1,
    name: "Premium Beard Oil",
    description: "Organic blend for a soft, hydrated beard.",
    price: "₦5,500",
    category: "Grooming",
    visual: "🧴",
    inStock: true,
  },
  {
    id: 2,
    name: "Wig Revamp & Care Kit",
    description: "Complete care package to restore shine and bounce.",
    price: "₦12,000",
    category: "Haircare",
    visual: "✨",
    inStock: true,
  },
  {
    id: 3,
    name: "Matte Styling Paste",
    description: "Strong hold with a natural, no-shine finish.",
    price: "₦4,000",
    category: "Styling",
    visual: "💈",
    inStock: true,
  },
  {
    id: 4,
    name: "Edge Control Gel",
    description: "24-hour hold without flaking or white residue.",
    price: "₦3,500",
    category: "Styling",
    visual: "🌿",
    inStock: true,
  }
];

export default function MiniShop({
  heading = 'Shop the Vault',
  description = 'Take the salon experience home with premium aftercare products.',
  accentClass = 'from-orange-500 to-amber-400',
}) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = DEMO_PRODUCTS.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <section className="relative rounded-[2.5rem] border border-stone-200 bg-white p-6 shadow-xl shadow-stone-200/50 dark:border-white/10 dark:bg-stone-950/80 dark:shadow-black/50 sm:p-10 overflow-hidden">
      {/* Background Accent */}
      <div className={`absolute -top-24 -right-24 h-64 w-64 rounded-full bg-linear-to-br ${accentClass} opacity-10 blur-3xl pointer-events-none`} />

      <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-8">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-3">
            <span className={`flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br ${accentClass} text-white shadow-lg`}>
              <ShoppingBag size={14} strokeWidth={3} />
            </span>
            <span className="text-xs font-black uppercase tracking-widest text-stone-500 dark:text-stone-400">
              Mini Shop
            </span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-stone-900 dark:text-white sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
            {description}
          </p>
        </div>

        {/* Mini Search Bar */}
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-stone-400">
            <Search size={16} strokeWidth={2.5} />
          </div>
          <input
            type="text"
            className="w-full rounded-2xl border border-stone-200 bg-stone-50 py-3 pl-11 pr-4 text-sm font-medium text-stone-900 placeholder-stone-400 outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 dark:border-stone-800 dark:bg-stone-900 dark:text-white dark:focus:border-amber-500 dark:focus:ring-amber-500/10"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Horizontal Scrollable Product Shelf */}
      <div className="relative -mx-6 px-6 sm:-mx-10 sm:px-10">
        <div className="flex gap-5 overflow-x-auto pb-8 pt-2 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <article 
                key={product.id} 
                className="group relative flex w-72 shrink-0 snap-start flex-col rounded-3xl border border-stone-200 bg-white p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-500/10 dark:border-white/10 dark:bg-stone-900/50"
              >
                {/* Visual Area */}
                <div className="flex h-48 w-full items-center justify-center rounded-2xl bg-stone-50 text-5xl transition-transform duration-300 group-hover:scale-[1.02] dark:bg-stone-800/50">
                  {product.visual}
                </div>

                {/* Content Area */}
                <div className="mt-5 flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-bold text-stone-900 dark:text-white line-clamp-1">
                      {product.name}
                    </h3>
                  </div>
                  <p className="mt-1 text-sm text-stone-500 dark:text-stone-400 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="mt-auto pt-6 flex items-center justify-between">
                    <div className="text-lg font-black text-stone-900 dark:text-white">
                      {product.price}
                    </div>
                    {/* Add to Cart Button (Prep for 3-click checkout) */}
                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-stone-900 transition-colors hover:bg-orange-500 hover:text-white dark:bg-stone-800 dark:text-white dark:hover:bg-amber-500 dark:hover:text-stone-950">
                      <Plus size={20} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>

                {/* Badge */}
                <div className="absolute top-8 left-8 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-stone-900 shadow-sm dark:bg-stone-900/90 dark:text-white">
                  {product.category}
                </div>
              </article>
            ))
          ) : (
            <div className="flex w-full items-center justify-center py-12 text-stone-500">
              No products found for "{searchQuery}"
            </div>
          )}
        </div>
      </div>
      
      {/* CSS to hide scrollbar but keep functionality */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}} />
    </section>
  )
}