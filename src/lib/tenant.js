import { getBarberBySlug } from '@/lib/barber-api';
import { getHairSpecialistBySlug } from '@/lib/hair-specialist-api';
import { getLashTechnicianBySlug } from '@/lib/lash-technician-api';
import { getMakeupArtistBySlug } from '@/lib/makeup-artist-api';
import { getNailTechnicianBySlug } from '@/lib/nail-technician-api';

export async function resolveTenantProfileBySlug(slug) {
  const normalizedSlug = String(slug || '').trim().toLowerCase();

  if (!normalizedSlug) {
    return null;
  }

  const [barber, hairSpecialist, nailTechnician, lashTechnician, makeupArtist] = await Promise.all([
    getBarberBySlug(normalizedSlug),
    getHairSpecialistBySlug(normalizedSlug),
    getNailTechnicianBySlug(normalizedSlug),
    getLashTechnicianBySlug(normalizedSlug),
    getMakeupArtistBySlug(normalizedSlug),
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

  if (nailTechnician) {
    return {
      type: 'nail-technician',
      profile: nailTechnician,
    };
  }

  if (lashTechnician) {
    return {
      type: 'lash-technician',
      profile: lashTechnician,
    };
  }

  if (makeupArtist) {
    return {
      type: 'makeup-artist',
      profile: makeupArtist,
    };
  }

  return null;
}