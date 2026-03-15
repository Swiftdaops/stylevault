import ProDemoShowcase from '../components/ProDemoShowcase'

export const metadata = {
  title: 'Hair Specialist Pro Demo | StyleVault',
  description: 'See what hair specialists unlock on the StyleVault Pro plan with a premium storefront demo.',
}

export default function HairSpecialistProDemoPage() {
  return (
    <ProDemoShowcase
      theme={{
        accentClass: 'from-rose-500 to-fuchsia-500',
        glowClass: 'from-rose-500 to-fuchsia-500',
        rating: '4.98',
        reviewCount: '240+',
      }}
      roleTitle="Maison Texture Studio"
      shortLabel="Hair Specialist Pro"
      heroBadge="Hair specialist storefront demo"
      heroTitle="Showcase texture, color, installs, and premium care like a true salon brand."
      heroDescription="This Pro demo highlights how a hair specialist can combine branding, reviews, booking flow, and retail into one polished storefront that feels elevated from the first click."
      intro="Hair specialists on Pro can present premium service menus, highlight specialty expertise, rank better in search, automate client updates, collect trust-building reviews, accept tips, and sell aftercare products directly online."
      stats={[
        { label: 'Consultation requests', value: '126', note: 'High-intent bookings' },
        { label: 'Repeat client rate', value: '68%', note: 'Strong retention' },
        { label: 'Retail add-ons', value: '$2.8k', note: 'Monthly product sales' },
      ]}
      services={['Silk Press', 'Color Refresh', 'Custom Wig Install', 'Hydration Treatment']}
      featureHighlights={[
        { icon: 'domain', title: 'Branded salon feel', description: 'Own a polished URL and presentation that feels premium enough for color, texture, and install services.' },
        { icon: 'seo', title: 'Search-ready profiles', description: 'Get found for service-specific searches like wig installs, silk press experts, and color specialists.' },
        { icon: 'bookings', title: 'Pre-approval booking flow', description: 'Review appointment requests first, then confirm only the slots that fit your prep time and workload.' },
        { icon: 'analytics', title: 'Better business decisions', description: 'Track what services convert best, which dates fill fastest, and how much revenue comes from add-ons.' },
        { icon: 'reviews', title: 'Client trust at first glance', description: 'Feature authentic feedback from installs, treatments, and repeat maintenance clients.' },
        { icon: 'products', title: 'Aftercare retail shelf', description: 'Promote leave-ins, edge control, serums, and specialty care kits inside the storefront.' },
      ]}
      reviews={[
        { name: 'Mariam S.', title: 'Install client', stars: 5, quote: 'The service page explained everything clearly, and the review section made me trust the booking instantly.' },
        { name: 'Ijeoma N.', title: 'Texture care client', stars: 5, quote: 'It felt like booking a premium studio, not just filling a generic form. The whole page matched the quality.' },
        { name: 'Vanessa P.', title: 'Color client', stars: 5, quote: 'The storefront answered my questions before I even messaged. Then I added aftercare products before checkout.' },
      ]}
      products={[
        { name: 'Hydration Recovery Kit', price: '$38', category: 'Aftercare', visual: 'Mask + serum + mist', description: 'Bundle post-service care products into a premium retail package.' },
        { name: 'Silk Edge Finish', price: '$16', category: 'Styling', visual: 'Light hold • high shine', description: 'A simple upsell that complements styling and install appointments.' },
        { name: 'Color-Safe Maintenance Duo', price: '$28', category: 'Retail duo', visual: 'Shampoo + conditioner', description: 'Drive repeat revenue with products clients already need after every visit.' },
      ]}
      tipConfig={{
        baseAmount: '$120',
        tipOptions: ['$10', '$20', '$30'],
      }}
    />
  )
}
