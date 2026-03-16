import { SITE_URL } from '@/lib/seo'

export const metadata = {
  title: 'Privacy Policy | StyleVault',
  description: 'Learn what information StyleVault collects, how booking and account data is used, and how to contact us about privacy requests.',
  alternates: {
    canonical: '/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | StyleVault',
    description: 'StyleVault privacy policy for website visitors, customers, and beauty professionals using our booking platform.',
    url: `${SITE_URL}/privacy-policy`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | StyleVault',
    description: 'How StyleVault collects, uses, and protects personal information.',
  },
}

const sections = [
  {
    title: 'Who we are',
    body: [
      'StyleVault is a booking and storefront platform for barbers, hair specialists, nail technicians, lash technicians, and makeup artists.',
      'This policy applies to stylevault.site, related StyleVault pages, and tenant storefronts hosted on StyleVault subdomains.',
    ],
  },
  {
    title: 'Information we collect',
    body: [
      'We may collect information you submit directly, such as your name, email address, phone number, booking details, selected services, appointment dates, and business details.',
      'We may also collect technical data such as browser type, device information, approximate location by country, IP-based request data, and page usage analytics to operate and improve the platform.',
    ],
  },
  {
    title: 'How we use information',
    body: [
      'We use personal information to process bookings, send confirmations and reminders, manage customer support, review Pro upgrade requests, protect the platform from abuse, and improve our services.',
      'We may use limited analytics and advertising measurement tools to understand site performance and campaign effectiveness.',
    ],
  },
  {
    title: 'What we do not ask for',
    body: [
      'StyleVault does not ask customers or business owners to provide passwords, banking PINs, crypto wallet keys, or similar secret credentials through ads or landing pages.',
      'If you receive a suspicious message claiming to be from StyleVault and requesting sensitive credentials, do not respond and contact us immediately.',
    ],
  },
  {
    title: 'Sharing of information',
    body: [
      'We may share data with service providers that help us operate the platform, such as hosting, analytics, email delivery, cloud storage, and notification services.',
      'We may also share booking details with the storefront owner or service provider selected by the customer so the appointment can be delivered and managed.',
    ],
  },
  {
    title: 'Cookies and analytics',
    body: [
      'StyleVault may use cookies, local storage, and similar technologies for security, authentication, preferences, performance, and analytics.',
      'You can control many browser-level cookie settings through your browser or device preferences.',
    ],
  },
  {
    title: 'Data retention',
    body: [
      'We keep information for as long as needed to provide the service, maintain business records, resolve disputes, comply with legal obligations, and enforce our policies.',
      'Retention periods may vary depending on the type of account, booking activity, and applicable legal requirements.',
    ],
  },
  {
    title: 'Your choices',
    body: [
      'You may contact us to request access, correction, or deletion of personal information we control, subject to legal or operational requirements.',
      'You may opt out of marketing messages by using unsubscribe options where available or by contacting us directly.',
    ],
  },
  {
    title: 'Contact us',
    body: [
      'For privacy or data protection questions, contact StyleVault at hello@stylevault.site.',
      'If you believe someone is impersonating StyleVault or using our branding in a misleading way, contact us immediately so we can investigate.',
    ],
  },
]

export default function PrivacyPolicyPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'StyleVault Privacy Policy',
    url: `${SITE_URL}/privacy-policy`,
    description: 'Privacy policy for StyleVault website visitors, customers, and beauty professionals.',
  }

  return (
    <main className="min-h-screen bg-orange-50 px-4 py-12 text-stone-950 dark:bg-black dark:text-white sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-orange-200/70 bg-white/90 p-6 shadow-sm dark:border-stone-800 dark:bg-stone-950/90 sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-orange-600 dark:text-amber-300">Legal</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-sm leading-7 text-stone-600 dark:text-stone-300">
          Last updated: March 16, 2026. This page explains how StyleVault collects, uses, shares, and protects information
          from website visitors, customers booking appointments, and beauty professionals using the platform.
        </p>

        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <section key={section.title} className="rounded-3xl border border-orange-100 bg-orange-50/60 p-5 dark:border-stone-800 dark:bg-stone-900/70">
              <h2 className="text-xl font-bold text-stone-950 dark:text-white">{section.title}</h2>
              <div className="mt-3 space-y-3 text-sm leading-7 text-stone-700 dark:text-stone-300">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}