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
  title: {
    default: "StyleVault | Book Barbers Online in Nigeria",
    template: "%s",
  },
  description: "Discover barbers in Nigeria, compare grooming services, and book haircuts online through dedicated barber pages on StyleVault.",
  keywords: [
    "barber in nigeria",
    "barber in anambra",
    "book haircut online",
    "skin fade barber",
    "barber booking platform",
  ],
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "StyleVault",
    url: SITE_URL,
    title: "StyleVault | Book Barbers Online in Nigeria",
    description: "Discover barbers in Nigeria, compare grooming services, and book haircuts online through dedicated barber pages on StyleVault.",
  },
  twitter: {
    card: "summary_large_image",
    title: "StyleVault | Book Barbers Online in Nigeria",
    description: "Discover barbers in Nigeria, compare grooming services, and book haircuts online through dedicated barber pages on StyleVault.",
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
