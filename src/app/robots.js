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
          '/nail-technicians/admin',
          '/nail-technicians/login',
          '/nail-technicians/register',
          '/lash-technicians/admin',
          '/lash-technicians/login',
          '/lash-technicians/register',
          '/makeup-artists/admin',
          '/makeup-artists/login',
          '/makeup-artists/register',
        ],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: absoluteUrl('/'),
  };
}
