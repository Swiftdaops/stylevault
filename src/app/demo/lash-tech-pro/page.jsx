import ProDemoShowcase from '../components/ProDemoShowcase'

export const metadata = {
  title: 'Lash Tech Pro Demo | StyleVault',
  description: 'See what lash techs unlock on the StyleVault Pro plan with a premium storefront demo.',
}

export default function LashTechProDemoPage() {
  return (
    <ProDemoShowcase
      theme={{
        accentClass: 'from-violet-500 to-purple-500',
        glowClass: 'from-violet-500 to-purple-500',
        rating: '4.97',
        reviewCount: '160+',
      }}
      roleTitle="Luna Lash Atelier"
      shortLabel="Lash Tech Pro"
      heroBadge="Lash tech storefront demo"
      heroTitle="A lash storefront designed to look as detailed and luxurious as the final set."
      heroDescription="Show every client that your lash brand is premium before they even book. Pro helps lash techs present services beautifully, build trust, and monetize more than appointments alone."
      intro="Lash techs on Pro get a polished storefront with branded presentation, discoverability, reviews, appointment management, tipping, and a mini shop for cleansers, brushes, and retention-friendly aftercare."
      stats={[
        { label: 'New lash clients', value: '52', note: 'Booked this month' },
        { label: 'Refill retention', value: '74%', note: 'Repeat refill clients' },
        { label: 'Add-on revenue', value: '$980', note: 'Retail + tips combined' },
      ]}
      services={['Classic Full Set', 'Hybrid Refill', 'Wispy Volume', 'Lash Bath Add-on']}
      featureHighlights={[
        { icon: 'domain', title: 'Luxury presentation', description: 'Create a premium online feel with a branded page that matches the aesthetic of your lash business.' },
        { icon: 'reviews', title: 'Retention-driving reviews', description: 'Let first-time visitors read real client experiences before they book their first full set or refill.' },
        { icon: 'bookings', title: 'Cleaner booking workflow', description: 'Keep your schedule controlled with request-based bookings that you can confirm on your terms.' },
        { icon: 'tips', title: 'Simple tipping moments', description: 'Make gratuity feel natural after an appointment without sending clients to a separate app.' },
        { icon: 'shop', title: 'Aftercare product shelf', description: 'Sell lash cleansers, spoolies, sealants, and touch-up products directly inside your storefront.' },
        { icon: 'analytics', title: 'Clear service performance', description: 'See which sets, fills, and add-ons convert best so you can price and promote more effectively.' },
      ]}
      reviews={[
        { name: 'Tolu A.', title: 'Hybrid refill client', stars: 5, quote: 'The storefront felt luxe and trustworthy. The reviews made booking super easy for my first visit.' },
        { name: 'Stephanie L.', title: 'Volume set client', stars: 5, quote: 'I loved being able to review the service menu, book fast, and later grab cleanser from the mini shop.' },
        { name: 'Amaka E.', title: 'Repeat client', stars: 5, quote: 'Everything looked polished. It felt like a serious beauty brand, not just a booking link.' },
      ]}
      products={[
        { name: 'Foaming Lash Cleanser', price: '$14', category: 'Aftercare', visual: 'Gentle foaming wash', description: 'Feature retention-friendly care products clients should use between fills.' },
        { name: 'Crystal Lash Sealant', price: '$19', category: 'Retention', visual: 'Retention support formula', description: 'A clean upsell for clients who want their sets to last longer.' },
        { name: 'Lash Care Mini Kit', price: '$26', category: 'Bundle', visual: 'Cleanser + brush + pouch', description: 'Turn a low-cost aftercare bundle into easy extra revenue.' },
      ]}
      tipConfig={{
        baseAmount: '$95',
        tipOptions: ['$8', '$15', '$25'],
      }}
    />
  )
}
