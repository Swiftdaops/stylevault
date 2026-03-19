"use client"

import { useEffect, useMemo, useState } from "react"
import { usePathname } from "next/navigation"
import { Search, ShoppingBag, Plus } from "lucide-react"

const SHOP_CONFIG_BY_ROUTE = {
  "/demo/barber-pro": {
    heading: "Barber Retail Shelf",
    description: "Keep clients fresh between appointments with premium shaving, fade, and beard essentials.",
    accentClass: "from-sky-500 to-cyan-400",
    products: [
      {
        id: 1,
        name: "Cooling Shave Cream",
        description: "Rich lather for smooth razor glide and a clean post-shave finish.",
        price: "$18",
        category: "Shave care",
        visual: "🪒",
        inStock: true,
      },
      {
        id: 2,
        name: "Cordless Fade Clippers",
        description: "Precision clipper kit for lineup maintenance and clean home touch-ups.",
        price: "$95",
        category: "Tools",
        visual: "✂️",
        inStock: true,
      },
      {
        id: 3,
        name: "Signature Beard Oil",
        description: "Lightweight conditioning oil for shine, softness, and beard health.",
        price: "$16",
        category: "Beard care",
        visual: "🧴",
        inStock: true,
      },
      {
        id: 4,
        name: "Matte Texture Paste",
        description: "Strong hold styling paste built for crops, fades, and textured finishes.",
        price: "$14",
        category: "Styling",
        visual: "💈",
        inStock: true,
      },
    ],
  },
  "/demo/hair-specialist-pro": {
    heading: "Haircare Edit",
    description: "Showcase salon-grade aftercare, install tools, and maintenance staples for repeat revenue.",
    accentClass: "from-rose-500 to-fuchsia-500",
    products: [
      {
        id: 5,
        name: "Wig Revamp Care Kit",
        description: "Restore bounce, softness, and shine with a complete maintenance bundle.",
        price: "$32",
        category: "Haircare",
        visual: "✨",
        inStock: true,
      },
      {
        id: 6,
        name: "Hydration Repair Mask",
        description: "Deep treatment for silk presses, color care, and textured hair recovery.",
        price: "$24",
        category: "Treatment",
        visual: "🫧",
        inStock: true,
      },
      {
        id: 7,
        name: "Lace Melt Essentials",
        description: "Secure installs with wrap bands, melt spray, and lace-safe finishing tools.",
        price: "$28",
        category: "Install tools",
        visual: "🎀",
        inStock: true,
      },
      {
        id: 8,
        name: "Edge Finish Serum",
        description: "Smooth, glossy finishing serum for clean edges and polished styling.",
        price: "$12",
        category: "Styling",
        visual: "🌿",
        inStock: true,
      },
    ],
  },
  "/demo/nail-tech-pro": {
    heading: "Nail Studio Shop",
    description: "Offer polish, prep, and finishing products that extend every set beyond the appointment.",
    accentClass: "from-fuchsia-500 to-pink-500",
    products: [
      {
        id: 9,
        name: "Cuticle Glow Oil",
        description: "Daily nourishing oil to keep nails healthy and polished between fills.",
        price: "$12",
        category: "Aftercare",
        visual: "💅",
        inStock: true,
      },
      {
        id: 10,
        name: "Gel Polish Trio",
        description: "Top-selling salon shades for quick touch-ups and matching sets.",
        price: "$20",
        category: "Polish",
        visual: "🎨",
        inStock: true,
      },
      {
        id: 11,
        name: "Portable UV Lamp",
        description: "Compact cure lamp for at-home sealing and press-on application.",
        price: "$38",
        category: "Tools",
        visual: "💡",
        inStock: true,
      },
      {
        id: 12,
        name: "Prep & Finish Set",
        description: "Dehydrator, primer, and top coat combo for longer-lasting wear.",
        price: "$26",
        category: "Prep kit",
        visual: "🧰",
        inStock: true,
      },
    ],
  },
  "/demo/lash-tech-pro": {
    heading: "Lash Retail & Tools",
    description: "Sell lash-safe aftercare and pro tools that support retention, fills, and home care.",
    accentClass: "from-violet-500 to-purple-500",
    products: [
      {
        id: 13,
        name: "Foaming Lash Cleanser",
        description: "Gentle cleanser that keeps extensions clean without breaking retention.",
        price: "$14",
        category: "Aftercare",
        visual: "🫧",
        inStock: true,
      },
      {
        id: 14,
        name: "Precision Lash Tweezer Set",
        description: "Curved and isolation tweezers for crisp pickup and fast placement.",
        price: "$30",
        category: "Tools",
        visual: "🪄",
        inStock: true,
      },
      {
        id: 15,
        name: "Volume Lash Tray",
        description: "Soft matte fibers in mixed lengths for custom volume sets.",
        price: "$22",
        category: "Lash trays",
        visual: "👁️",
        inStock: true,
      },
      {
        id: 16,
        name: "Retention Sealant",
        description: "Protective coating that helps extensions stay glossy and locked in longer.",
        price: "$16",
        category: "Retention",
        visual: "💜",
        inStock: true,
      },
    ],
  },
  "/demo/makeup-artist-pro": {
    heading: "Pro Makeup Edit",
    description: "Feature artist-approved tools, finishing products, and beauty essentials clients can buy instantly.",
    accentClass: "from-pink-500 to-rose-500",
    products: [
      {
        id: 17,
        name: "Pro Brush Set",
        description: "Face and eye brushes for bridal glam, soft glam, and editorial finishes.",
        price: "$45",
        category: "Brushes",
        visual: "🖌️",
        inStock: true,
      },
      {
        id: 18,
        name: "Glass Skin Primer",
        description: "Hydrating prep primer that creates a smooth, radiant makeup base.",
        price: "$18",
        category: "Prep",
        visual: "💧",
        inStock: true,
      },
      {
        id: 19,
        name: "Soft Matte Setting Spray",
        description: "Long-wear finishing mist for events, shoots, and full-day glam.",
        price: "$20",
        category: "Finish",
        visual: "🌸",
        inStock: true,
      },
      {
        id: 20,
        name: "Beauty Sponge Duo",
        description: "Precision blending sponges for foundation, contour, and concealer work.",
        price: "$10",
        category: "Tools",
        visual: "🩷",
        inStock: true,
      },
    ],
  },
}

const DEFAULT_SHOP_CONFIG = {
  heading: "Shop the Vault",
  description: "Take the salon experience home with premium aftercare products.",
  accentClass: "from-orange-500 to-amber-400",
  products: [],
}

export default function MiniShop({
  heading,
  description,
  accentClass,
}) {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")

  const routeConfig = useMemo(
    () => SHOP_CONFIG_BY_ROUTE[pathname] || DEFAULT_SHOP_CONFIG,
    [pathname],
  )

  useEffect(() => {
    setSearchQuery("")
  }, [pathname])

  if (pathname === "/demo") {
    return null
  }

  const resolvedHeading = heading || routeConfig.heading
  const resolvedDescription = description || routeConfig.description
  const resolvedAccentClass = accentClass || routeConfig.accentClass
  const products = routeConfig.products

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <section className="relative overflow-hidden rounded-4xl border border-stone-200 bg-stone-800 p-6 mt-15 mb-15 shadow-xl shadow-stone-200/50 dark:border-white/10 dark:bg-stone-950/80 dark:shadow-black/50 sm:p-10">
      {/* Background Accent */}
      <div className={`pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-linear-to-br ${resolvedAccentClass} opacity-10 blur-3xl`} />

      <div className="relative mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-3">
            <span className={`flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br ${resolvedAccentClass} text-white shadow-lg`}>
              <ShoppingBag size={14} strokeWidth={3} />
            </span>
            <span className="text-xs font-black uppercase tracking-widest text-stone-500 dark:text-stone-400">
              Mini Shop
            </span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-stone-900 dark:text-white sm:text-4xl">
            {resolvedHeading}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
            {resolvedDescription}
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