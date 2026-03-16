import ProDemoShowcase from '../components/ProDemoShowcase'

export const metadata = {
  title: 'Nail Tech Pro Demo | StyleVault',
  description: 'See what nail technicians unlock on the StyleVault Pro plan with a premium storefront demo.',
}

export default function NailTechProDemoPage() {
  return (
    <ProDemoShowcase
      theme={{
        accentClass: 'from-fuchsia-500 to-pink-500',
        glowClass: 'from-fuchsia-500 to-pink-500',
        rating: '4.96',
        reviewCount: '210+',
      }}
      roleTitle="Studio Gloss Nail Bar"
      shortLabel="Nail Technician Pro"
      heroBadge="Nail tech storefront demo"
      heroTitle="A polished nail storefront that makes every set feel premium before the appointment starts."
      heroDescription="This demo shows how nail technicians can present services beautifully, collect trust-building reviews, accept tips, and turn aftercare into extra revenue with a Pro storefront."
      intro="Nail technicians on Pro get a premium digital storefront with stronger branding, booking control, reviews, tipping, product add-ons, and conversion-focused service presentation."
      stats={[
        { label: 'Monthly bookings', value: '97', note: 'Strong repeat demand' },
        { label: 'Average ticket', value: '$88', note: 'Boosted by add-ons' },
        { label: 'Retail sales', value: '$1.1k', note: 'Aftercare and bundles' },
      ]}
      services={['Gel Manicure', 'Acrylic Full Set', 'Nail Art Add-on', 'Luxury Pedicure']}
      featureHighlights={[
        { icon: 'domain', title: 'Luxury brand presentation', description: 'Own a storefront that feels polished enough for premium manicures, acrylics, and detailed nail art.' },
        { icon: 'bookings', title: 'Controlled booking flow', description: 'Review and confirm requests so your schedule stays clean, profitable, and easy to manage.' },
        { icon: 'reviews', title: 'Trust that drives rebooking', description: 'Display glowing client reviews that help first-time visitors feel confident and repeat clients keep returning.' },
        { icon: 'tips', title: 'Frictionless tipping', description: 'Let happy clients add gratuity directly in the customer journey without extra steps or external links.' },
        { icon: 'shop', title: 'Aftercare and retail shelf', description: 'Sell cuticle oils, press-ons, files, and nail care kits right inside your storefront.' },
        { icon: 'analytics', title: 'Smarter service insights', description: 'See which services, sets, and upsells convert best so you can price and promote with confidence.' },
      ]}
      reviews={[
        { name: 'Zara E.', title: 'Gel manicure client', stars: 5, quote: 'The storefront looked premium and made booking so easy. I trusted it instantly because everything felt clean and detailed.' },
        { name: 'Amina T.', title: 'Acrylic set client', stars: 5, quote: 'I loved seeing reviews, nail art options, and the service menu all in one place before I booked.' },
        { name: 'Brielle N.', title: 'Repeat pedicure client', stars: 5, quote: 'It felt like booking with a real beauty brand, not just sending a message on social media.' },
      ]}
      products={[
        { name: 'Cuticle Glow Oil', price: '$12', category: 'Aftercare', visual: 'Nourishing daily oil', description: 'Promote easy aftercare upsells that support healthier nails between appointments.' },
        { name: 'Gloss Maintenance Kit', price: '$24', category: 'Bundle', visual: 'Oil + file + buffer', description: 'Bundle simple care tools into an add-on clients can purchase with one tap.' },
        { name: 'Press-On Rescue Tabs', price: '$9', category: 'Retail', visual: 'Quick-fix adhesive tabs', description: 'Add affordable retail options that complement press-ons and nail art clients.' },
      ]}
      tipConfig={{
        baseAmount: '$90',
        tipOptions: ['$8', '$15', '$25'],
      }}
    />
  )
}
