import nextPwa from 'next-pwa'

const isDevelopment = process.env.NODE_ENV !== 'production'

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
}

export default withPWA(nextConfig)
