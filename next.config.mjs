import nextPwa from 'next-pwa'

const withPWA = nextPwa({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: false,
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
