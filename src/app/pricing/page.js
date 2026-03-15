import { headers } from 'next/headers';
import PricingClient from "./PricingClient";
import { absoluteUrl } from "@/lib/seo";
import { getRawVisitorCountryCode } from '@/lib/request-country';
import { getLocalizedPricing } from '@/lib/pricing';

export const metadata = {
  title: "Global Pricing for Beauty Pros | StyleVault",
  description: "Compare StyleVault pricing with localized Pro plan pricing based on your country. Choose free or Pro plans with booking tools, storefronts, analytics, and online growth features for all beauty niches.",
  keywords: ["beauty business pricing", "global booking platform pricing", "barber pricing", "makeup artist booking platform", "beauty pro software"],
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Global Pricing for Beauty Pros | StyleVault",
    description: "Compare StyleVault pricing with localized Pro plan pricing based on your country. Choose free or Pro plans with booking tools, storefronts, analytics, and online growth features.",
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