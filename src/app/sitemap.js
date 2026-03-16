import { getBarbers } from '@/lib/barber-api';
import { getHairSpecialists } from '@/lib/hair-specialist-api';
import { getLashTechnicians } from '@/lib/lash-technician-api';
import { getMakeupArtists } from '@/lib/makeup-artist-api';
import { getNailTechnicians } from '@/lib/nail-technician-api';
import { absoluteUrl } from '@/lib/seo';

export default async function sitemap() {
  const now = new Date();
  const [barbers, hairSpecialists, nailTechnicians, lashTechnicians, makeupArtists] = await Promise.all([getBarbers(), getHairSpecialists(), getNailTechnicians(), getLashTechnicians(), getMakeupArtists()]);

  const staticRoutes = [
    '/',
    '/about',
    '/get-started',
    '/pricing',
    '/privacy-policy',
    '/barbers',
    '/hair-specialists',
    '/nail-technicians',
    '/lash-technicians',
    '/makeup-artists',
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

  const hairSpecialistRoutes = hairSpecialists.flatMap((hairSpecialist) => {
    if (!hairSpecialist?.slug) return [];

    return [
      {
        url: absoluteUrl(`/hair-specialists/${hairSpecialist.slug}`),
        lastModified: hairSpecialist.updatedAt ? new Date(hairSpecialist.updatedAt) : now,
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: absoluteUrl(`/hair-specialists/${hairSpecialist.slug}/book`),
        lastModified: hairSpecialist.updatedAt ? new Date(hairSpecialist.updatedAt) : now,
        changeFrequency: 'daily',
        priority: 0.8,
      },
    ];
  });

  const nailTechnicianRoutes = nailTechnicians.flatMap((nailTechnician) => {
    if (!nailTechnician?.slug) return [];

    return [
      {
        url: absoluteUrl(`/nail-technicians/${nailTechnician.slug}`),
        lastModified: nailTechnician.updatedAt ? new Date(nailTechnician.updatedAt) : now,
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: absoluteUrl(`/nail-technicians/${nailTechnician.slug}/book`),
        lastModified: nailTechnician.updatedAt ? new Date(nailTechnician.updatedAt) : now,
        changeFrequency: 'daily',
        priority: 0.8,
      },
    ];
  });

  const lashTechnicianRoutes = lashTechnicians.flatMap((lashTechnician) => {
    if (!lashTechnician?.slug) return [];

    return [
      {
        url: absoluteUrl(`/lash-technicians/${lashTechnician.slug}`),
        lastModified: lashTechnician.updatedAt ? new Date(lashTechnician.updatedAt) : now,
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: absoluteUrl(`/lash-technicians/${lashTechnician.slug}/book`),
        lastModified: lashTechnician.updatedAt ? new Date(lashTechnician.updatedAt) : now,
        changeFrequency: 'daily',
        priority: 0.8,
      },
    ];
  });

  const makeupArtistRoutes = makeupArtists.flatMap((makeupArtist) => {
    if (!makeupArtist?.slug) return [];

    return [
      {
        url: absoluteUrl(`/makeup-artists/${makeupArtist.slug}`),
        lastModified: makeupArtist.updatedAt ? new Date(makeupArtist.updatedAt) : now,
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: absoluteUrl(`/makeup-artists/${makeupArtist.slug}/book`),
        lastModified: makeupArtist.updatedAt ? new Date(makeupArtist.updatedAt) : now,
        changeFrequency: 'daily',
        priority: 0.8,
      },
    ];
  });

  return [...staticRoutes, ...barberRoutes, ...hairSpecialistRoutes, ...nailTechnicianRoutes, ...lashTechnicianRoutes, ...makeupArtistRoutes];
}
