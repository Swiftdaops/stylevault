import { getBarberBySlug } from '@/lib/barber-api';
import { getHairSpecialistBySlug } from '@/lib/hair-specialist-api';

export async function resolveTenantProfileBySlug(slug) {
  const normalizedSlug = String(slug || '').trim().toLowerCase();

  if (!normalizedSlug) {
    return null;
  }

  const [barber, hairSpecialist] = await Promise.all([
    getBarberBySlug(normalizedSlug),
    getHairSpecialistBySlug(normalizedSlug),
  ]);

  if (barber) {
    return {
      type: 'barber',
      profile: barber,
    };
  }

  if (hairSpecialist) {
    return {
      type: 'hair-specialist',
      profile: hairSpecialist,
    };
  }

  return null;
}