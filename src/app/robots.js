import { absoluteUrl } from '@/lib/seo';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/barbers/admin',
          '/barbers/login',
          '/barbers/register',
          '/hair-specialists/admin',
          '/hair-specialists/login',
          '/hair-specialists/register',
        ],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: absoluteUrl('/'),
  };
}
