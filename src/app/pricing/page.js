import PricingClient from "./PricingClient";
import { absoluteUrl } from "@/lib/seo";

export const metadata = {
  title: "Pricing for Barbers in Nigeria | StyleVault",
  description: "Compare StyleVault pricing for barbers in Nigeria. Choose free or pro plans with booking tools, SEO pages, analytics, and online growth features.",
  keywords: ["barber pricing nigeria", "book haircut online", "barber booking platform"],
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Pricing for Barbers in Nigeria | StyleVault",
    description: "Compare StyleVault pricing for barbers in Nigeria. Choose free or pro plans with booking tools, SEO pages, analytics, and online growth features.",
    url: absoluteUrl('/pricing'),
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "StyleVault Plans",
  description: "Pricing plans for StyleVault barber management platform.",
  itemListElement: [
    {
      "@type": "Offer",
      name: "Pro Monthly",
      price: "30000",
      priceCurrency: "NGN",
      url: absoluteUrl('/pricing'),
    },
    {
      "@type": "Offer",
      name: "Pro Yearly",
      price: "100000",
      priceCurrency: "NGN",
      url: absoluteUrl('/pricing'),
    },
  ],
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PricingClient />
    </>
  );
}