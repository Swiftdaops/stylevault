import { getBarbers } from '@/lib/barber-api';
import { absoluteUrl } from '@/lib/seo';

export default async function sitemap() {
  const now = new Date();
  const barbers = await getBarbers();

  const staticRoutes = [
    '/',
    '/pricing',
    '/barbers',
    '/book',
  ].map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : 0.8,
  }));

  const barberRoutes = barbers.flatMap((barber) => {
    if (!barber?.slug) return [];

    return [
      {
        url: absoluteUrl(`/barbers/${barber.slug}`),
        lastModified: barber.updatedAt ? new Date(barber.updatedAt) : now,
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: absoluteUrl(`/barbers/${barber.slug}/book`),
        lastModified: barber.updatedAt ? new Date(barber.updatedAt) : now,
        changeFrequency: 'daily',
        priority: 0.8,
      },
    ];
  });

  return [...staticRoutes, ...barberRoutes];
}
