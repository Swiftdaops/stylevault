import { headers } from 'next/headers';
import PricingClient from "./PricingClient";
import { absoluteUrl } from "@/lib/seo";
import { getRawVisitorCountryCode } from '@/lib/request-country';
import { getLocalizedPricing } from '@/lib/pricing';

export const metadata = {
  title: "Global Pricing for Barbers | StyleVault",
  description: "Compare StyleVault pricing with localized Pro plan pricing based on your country. Choose free or pro plans with booking tools, SEO pages, analytics, and online growth features.",
  keywords: ["barber pricing", "global barber pricing", "book haircut online", "barber booking platform"],
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Global Pricing for Barbers | StyleVault",
    description: "Compare StyleVault pricing with localized Pro plan pricing based on your country. Choose free or pro plans with booking tools, SEO pages, analytics, and online growth features.",
    url: absoluteUrl('/pricing'),
  },
};

export default async function PricingPage() {
  const visitorCountry = getRawVisitorCountryCode(await headers(), 'US');
  const pricing = getLocalizedPricing(visitorCountry);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "StyleVault Plans",
    description: `Pricing plans for StyleVault in ${pricing.countryLabel}.`,
    itemListElement: [
      {
        "@type": "Offer",
        name: "Pro Monthly",
        price: String(pricing.monthlyAmount),
        priceCurrency: pricing.currency,
        eligibleRegion: pricing.countryCode,
        url: absoluteUrl('/pricing'),
      },
      {
        "@type": "Offer",
        name: "Pro Yearly",
        price: String(pricing.yearlyAmount),
        priceCurrency: pricing.currency,
        eligibleRegion: pricing.countryCode,
        url: absoluteUrl('/pricing'),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PricingClient initialPricing={pricing} />
    </>
  );
}