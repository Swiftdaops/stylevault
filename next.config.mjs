import nextPwa from 'next-pwa'

const isDevelopment = process.env.NODE_ENV !== 'production'
const rawApiTarget = String(process.env.NEXT_PUBLIC_API_URL || '').trim()

function normalizeApiTarget(value) {
  if (!value) return ''

  const stripped = value.replace(/\/+$/, '')
  if (/\/api(\/|$)/i.test(stripped)) return stripped

  return `${stripped}/api`
}

const proxiedApiTarget = normalizeApiTarget(rawApiTarget)

const withPWA = nextPwa({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: isDevelopment,
  mode: 'production',
  cacheOnFrontEndNav: true,
  dynamicStartUrl: true,
  fallbacks: {
    document: '/_offline',
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async rewrites() {
    if (!proxiedApiTarget || proxiedApiTarget.startsWith('/')) {
      return []
    }

    return [
      {
        source: '/api/:path*',
        destination: `${proxiedApiTarget}/:path*`,
      },
    ]
  },
}

export default withPWA(nextConfig)
