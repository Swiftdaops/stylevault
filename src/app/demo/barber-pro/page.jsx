import ProDemoShowcase from '../components/ProDemoShowcase'

export const metadata = {
  title: 'Barber Pro Demo | StyleVault',
  description: 'See what barbers unlock on the StyleVault Pro plan with a premium storefront demo.',
}

export default function BarberProDemoPage() {
  return (
    <ProDemoShowcase
      theme={{
        accentClass: 'from-orange-500 to-amber-500',
        glowClass: 'from-orange-500 to-amber-500',
        rating: '4.9',
        reviewCount: '180+',
      }}
      roleTitle="Crown & Fade Studio"
      shortLabel="Barber Pro"
      heroBadge="Barber storefront demo"
      heroTitle="A Pro barber page that turns clean cuts into a clean brand."
      heroDescription="This demo shows how a barber on StyleVault Pro can present premium services, earn trust fast, and unlock extra revenue through reviews, tips, and a mini grooming shop."
      intro="Barbers on Pro get a custom-branded storefront, stronger SEO visibility, automated booking communication, reviews that build confidence, easy tipping, a product shelf, and analytics that help them spot growth opportunities."
      stats={[
        { label: 'Monthly bookings', value: '84', note: '+21% after Pro' },
        { label: 'Average review', value: '4.9★', note: 'Trusted social proof' },
        { label: 'Retail revenue', value: '$1.4k', note: 'Mini shop add-on sales' },
      ]}
      services={['Skin Fade', 'Beard Sculpt', 'Kids Cut', 'Hot Towel Shave']}
      featureHighlights={[
        { icon: 'domain', title: 'Custom domain', description: 'Look fully professional with a branded storefront URL that feels like your own shop website.' },
        { icon: 'seo', title: 'SEO storefront', description: 'Rank better for local grooming searches and attract new clients searching by service, city, or style.' },
        { icon: 'bookings', title: 'Automated booking flow', description: 'Let clients request slots, get updates, and manage bookings from a polished customer experience.' },
        { icon: 'reviews', title: 'Verified reviews', description: 'Display client ratings and testimonial cards that reduce hesitation and improve conversion.' },
        { icon: 'tips', title: 'Built-in tips', description: 'Add frictionless gratuity options at checkout so satisfied clients can spend more in one tap.' },
        { icon: 'shop', title: 'Mini grooming shop', description: 'Sell pomades, beard oils, trimmers, and aftercare right from the storefront.' },
      ]}
      reviews={[
        { name: 'Daniel K.', title: 'Weekly client', stars: 5, quote: 'The reviews sold me first, then the booking page made it ridiculously easy to reserve my fade.' },
        { name: 'Emeka T.', title: 'Beard service client', stars: 5, quote: 'The storefront feels premium. I even added beard oil after checkout because the product section looked legit.' },
        { name: 'Chris A.', title: 'New customer', stars: 5, quote: 'I found the shop on Google, checked the ratings, booked online, and tipped straight from the phone.' },
      ]}
      products={[
        { name: 'Matte Pomade', price: '$18', category: 'Styling', visual: 'Premium hold • Matte finish', description: 'A barber-recommended styling product featured right under the service menu.' },
        { name: 'Beard Conditioning Oil', price: '$24', category: 'Beard care', visual: 'Cedar + citrus blend', description: 'Upsell after beard trims to increase average order value.' },
        { name: 'Wave Brush Kit', price: '$30', category: 'Retail bundle', visual: 'Brush + durag + cream', description: 'Bundle products into a simple mini storefront offer.' },
      ]}
      tipConfig={{
        baseAmount: '$45',
        tipOptions: ['$5', '$10', '$15'],
      }}
    />
  )
}
