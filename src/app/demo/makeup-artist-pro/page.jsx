import ProDemoShowcase from '../components/ProDemoShowcase'

export const metadata = {
  title: 'Makeup Artist Pro Demo | StyleVault',
  description: 'See what makeup artists unlock on the StyleVault Pro plan with a premium storefront demo.',
}

export default function MakeupArtistProDemoPage() {
  return (
    <ProDemoShowcase
      theme={{
        accentClass: 'from-pink-500 to-rose-500',
        glowClass: 'from-pink-500 to-rose-500',
        rating: '5.0',
        reviewCount: '140+',
      }}
      roleTitle="Velvet Canvas Beauty"
      shortLabel="Makeup Artist Pro"
      heroBadge="Makeup artist storefront demo"
      heroTitle="Make every bridal, editorial, and glam booking feel premium before the first brush stroke."
      heroDescription="This demo shows how makeup artists can turn a visual brand into a polished digital storefront with stronger trust, premium positioning, and smarter monetization."
      intro="Makeup artists on Pro can position themselves like premium beauty brands with custom storefront presentation, search visibility, review-driven trust, booking control, tip options, and product upsells for beauty essentials."
      stats={[
        { label: 'Bridal leads', value: '34', note: 'High-value inquiries' },
        { label: 'Average booking value', value: '$185', note: 'Higher-ticket services' },
        { label: 'Beauty retail sales', value: '$1.2k', note: 'Monthly add-on revenue' },
      ]}
      services={['Soft Glam', 'Bridal Preview', 'Event Makeup', 'Editorial Beat']}
      featureHighlights={[
        { icon: 'domain', title: 'Premium beauty branding', description: 'Create a storefront that feels editorial, polished, and worthy of bridal or event clients.' },
        { icon: 'seo', title: 'Better niche discovery', description: 'Show up for searches tied to bridal makeup, event glam, photoshoots, and city-specific services.' },
        { icon: 'reviews', title: 'Trust for high-ticket clients', description: 'Feature rave reviews that help premium clients feel confident enough to book without hesitation.' },
        { icon: 'bookings', title: 'Controlled appointment approval', description: 'Accept requests first so you can manage prep time, travel, and premium bookings more carefully.' },
        { icon: 'tips', title: 'Post-appointment gratuity', description: 'Let happy clients add a tip immediately after service with a polished, integrated checkout moment.' },
        { icon: 'shop', title: 'Beauty retail built in', description: 'Sell lip kits, setting sprays, touch-up essentials, and curated bundles inside the storefront.' },
      ]}
      reviews={[
        { name: 'Chioma R.', title: 'Bride', stars: 5, quote: 'The storefront felt premium and calming. I booked because everything looked clear, luxurious, and trustworthy.' },
        { name: 'Jade M.', title: 'Event glam client', stars: 5, quote: 'I loved seeing real reviews and polished service details before booking. It matched the artist’s quality instantly.' },
        { name: 'Ada O.', title: 'Photoshoot client', stars: 5, quote: 'The whole page looked like a beauty brand website, not a basic booking form. That made the decision easy.' },
      ]}
      products={[
        { name: 'Touch-Up Lip Kit', price: '$22', category: 'Retail', visual: 'Lip liner + mini gloss', description: 'Offer easy event-day add-ons that complement your makeup services.' },
        { name: 'Longwear Setting Spray', price: '$18', category: 'Aftercare', visual: 'Humidity-resistant finish', description: 'A natural upsell for bridal and long-event clients.' },
        { name: 'Bridal Prep Bundle', price: '$42', category: 'Bundle', visual: 'Mist + blot + lip touch-up', description: 'Package beauty essentials into a Pro storefront bundle for bigger basket sizes.' },
      ]}
      tipConfig={{
        baseAmount: '$150',
        tipOptions: ['$10', '$25', '$40'],
      }}
    />
  )
}
