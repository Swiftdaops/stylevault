import { absoluteUrl } from '@/lib/seo'

const defaultRobots = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    maxSnippet: -1,
    maxImagePreview: 'large',
    maxVideoPreview: -1,
  },
}

export function buildPageMetadata({
  title,
  description,
  path = '/',
  keywords = [],
  robots = defaultRobots,
}) {
  return {
    title,
    description,
    ...(keywords.length ? { keywords } : {}),
    alternates: {
      canonical: path,
    },
    robots,
    openGraph: {
      type: 'website',
      siteName: 'StyleVault',
      title,
      description,
      url: absoluteUrl(path),
      images: [
        {
          url: absoluteUrl('/opengraph-image'),
          width: 1200,
          height: 1200,
          alt: 'StyleVault share image',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteUrl('/twitter-image')],
    },
  }
}
