import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from '@/components/ui/sonner'
import Navbar from "@/components/navbar";
import FooterSwitcher from '@/components/footer-switcher'
import { extractTenantSlugFromHost, SITE_URL } from "@/lib/seo";
import { resolveTenantProfileBySlug } from '@/lib/tenant';
import { headers } from 'next/headers'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0c0a09',
}

export const metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: 'StyleVault',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'StyleVault',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/icon', sizes: '192x192', type: 'image/png' },
      { url: '/icon', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: ['/icon'],
    apple: [{ url: '/apple-icon', sizes: '180x180', type: 'image/png' }],
  },
  title: {
    default: "StyleVault | Find the Best Barbers, Hair Specialists, Nail Technicians, Lash Technicians and Makeup Artists Worldwide",
    template: "%s",
  },
  description: "Discover barbers, hair specialists, nail technicians, lash technicians, and makeup artists across multiple countries, compare services and pricing, and book appointments online through dedicated storefronts on StyleVault.",
  keywords: [
    "best barbers worldwide",
    "book barber online",
    "best hair specialist",
    "best nail technician",
    "best lash technician",
    "best makeup artist",
    "find barber by country",
    "barber booking platform",
  ],
  openGraph: {
    type: "website",
    siteName: "StyleVault",
    url: SITE_URL,
    title: "StyleVault | Find the Best Barbers, Hair Specialists, Nail Technicians, Lash Technicians and Makeup Artists Worldwide",
    description: "Discover barbers, hair specialists, nail technicians, lash technicians, and makeup artists across multiple countries, compare services and pricing, and book appointments online through dedicated storefronts on StyleVault.",
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
    title: "StyleVault | Find the Best Barbers, Hair Specialists, Nail Technicians, Lash Technicians and Makeup Artists Worldwide",
    description: "Discover barbers, hair specialists, nail technicians, lash technicians, and makeup artists across multiple countries, compare services and pricing, and book appointments online through dedicated storefronts on StyleVault.",
    images: ['/twitter-image'],
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'msapplication-tap-highlight': 'no',
  },
};

export default async function RootLayout({ children }) {
	const headersList = await headers()
	const tenantSlug = extractTenantSlugFromHost(headersList.get('host') || '')
	const tenant = tenantSlug ? await resolveTenantProfileBySlug(tenantSlug) : null
	const isTenantHost = Boolean(tenantSlug)
	const appName = tenant?.profile?.name ? `${tenant.profile.name} Booking App` : 'StyleVault'

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="application-name" content={appName} />
        <meta name="theme-color" content="#0c0a09" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={appName} />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/apple-icon" />
      </head>
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
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
