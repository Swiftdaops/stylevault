import { absoluteUrl } from '@/lib/seo';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/my-bookings',
          '/bookings/',
          '/barbers/admin',
          '/barbers/login',
          '/barbers/register',
          '/barbers/*/bookings/',
          '/hair-specialists/admin',
          '/hair-specialists/login',
          '/hair-specialists/register',
          '/hair-specialists/*/bookings/',
          '/nail-technicians/admin',
          '/nail-technicians/login',
          '/nail-technicians/register',
          '/nail-technicians/*/bookings/',
          '/lash-technicians/admin',
          '/lash-technicians/login',
          '/lash-technicians/register',
          '/lash-technicians/*/bookings/',
          '/makeup-artists/admin',
          '/makeup-artists/login',
          '/makeup-artists/register',
          '/makeup-artists/*/bookings/',
        ],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: absoluteUrl('/'),
  };
}
