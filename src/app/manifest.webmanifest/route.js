import { headers } from 'next/headers'
import { extractTenantSlugFromHost, SITE_URL } from '@/lib/seo'
import { resolveTenantProfileBySlug } from '@/lib/tenant'

function buildOrigin(host, protocol) {
  return `${protocol}://${host}`
}

function buildManifest({ origin, tenant }) {
  const profileName = tenant?.profile?.name?.trim()
  const appName = profileName ? `${profileName} Booking App` : 'StyleVault'
  const shortName = profileName ? profileName.slice(0, 12) : 'StyleVault'
  const description = profileName
    ? `Book with ${profileName}, reopen in one tap, and stay on top of appointments with StyleVault.`
    : 'Book beauty professionals instantly with dedicated storefronts on StyleVault.'

  return {
    id: `${origin}/`,
    name: appName,
    short_name: shortName,
    description,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    display_override: ['standalone', 'minimal-ui'],
    orientation: 'portrait',
    background_color: '#fff7ed',
    theme_color: '#0c0a09',
    lang: 'en',
    categories: ['beauty', 'lifestyle', 'shopping'],
    icons: [
      {
        src: '/icon',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icon',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  }
}

export async function GET() {
  const headersList = await headers()
  const siteUrl = new URL(SITE_URL)
  const host = headersList.get('x-forwarded-host') || headersList.get('host') || siteUrl.host
  const protocol = headersList.get('x-forwarded-proto') || siteUrl.protocol.replace(':', '')
  const tenantSlug = extractTenantSlugFromHost(host)
  const tenant = tenantSlug ? await resolveTenantProfileBySlug(tenantSlug) : null
  const manifest = buildManifest({
    origin: buildOrigin(host, protocol),
    tenant,
  })

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: {
      'Content-Type': 'application/manifest+json; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  })
}