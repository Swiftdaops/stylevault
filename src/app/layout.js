import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import FooterSwitcher from '@/components/footer-switcher'
import { extractTenantSlugFromHost, SITE_URL } from "@/lib/seo";
import { headers } from 'next/headers'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [{ url: '/icon', type: 'image/png' }],
    shortcut: ['/icon'],
    apple: [{ url: '/icon', type: 'image/png' }],
  },
  title: {
    default: "StyleVault | Find the Best Barbers and Hair Specialists Worldwide",
    template: "%s",
  },
  description: "Discover barbers and hair specialists across multiple countries, compare services and pricing, and book appointments online through dedicated storefronts on StyleVault.",
  keywords: [
    "best barbers worldwide",
    "book barber online",
    "best hair specialist",
    "find barber by country",
    "barber booking platform",
  ],
  openGraph: {
    type: "website",
    siteName: "StyleVault",
    url: SITE_URL,
    title: "StyleVault | Find the Best Barbers and Hair Specialists Worldwide",
    description: "Discover barbers and hair specialists across multiple countries, compare services and pricing, and book appointments online through dedicated storefronts on StyleVault.",
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 1200,
        alt: 'StyleVault share image',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StyleVault | Find the Best Barbers and Hair Specialists Worldwide",
    description: "Discover barbers and hair specialists across multiple countries, compare services and pricing, and book appointments online through dedicated storefronts on StyleVault.",
    images: ['/twitter-image'],
  },
};

export default async function RootLayout({ children }) {
	const headersList = await headers()
	const isTenantHost = Boolean(extractTenantSlugFromHost(headersList.get('host') || ''))

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} bg-orange-50 text-stone-950 antialiased dark:bg-stone-950 dark:text-amber-600`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen">
            <Navbar isTenantHost={isTenantHost} />
            <main className={isTenantHost ? undefined : 'pt-16'}>{children}</main>
          </div>
          <FooterSwitcher isTenantHost={isTenantHost} />
        </ThemeProvider>
      </body>
    </html>
  );
}
