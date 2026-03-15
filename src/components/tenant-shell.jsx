import BarberFooter from '@/components/barber-footer';
import BarberNavbar from '@/components/barbernav';
import HairSpecialistFooter from '@/components/hair-specialist-footer';
import HairSpecialistNavbar from '@/components/hair-specialistnav';
import LashTechnicianFooter from '@/components/lash-technician-footer';
import LashTechnicianNavbar from '@/components/lash-techniciannav';
import MakeupArtistFooter from '@/components/makeup-artist-footer';
import MakeupArtistNavbar from '@/components/makeup-artistnav';
import NailTechnicianFooter from '@/components/nail-technician-footer';
import NailTechnicianNavbar from '@/components/nail-techniciannav';
import InstallAppPrompt from '@/components/install-app-prompt';

function buildInstallPromptCopy(tenant) {
  const name = tenant?.profile?.name || 'StyleVault';

  return {
    appName: name,
    title: `Install ${name}'s booking app`,
    description: 'Book faster, reopen in one tap, and keep appointment reminders close on your Home Screen.',
  };
}

export default function TenantShell({ tenant, children }) {
  if (!tenant?.profile) {
    return children;
  }

  const installPrompt = buildInstallPromptCopy(tenant);

  if (tenant.type === 'hair-specialist') {
    return (
      <>
        <HairSpecialistNavbar hairSpecialist={tenant.profile} />
        <div>{children}</div>
        <HairSpecialistFooter hairSpecialist={tenant.profile} />
        <InstallAppPrompt {...installPrompt} />
      </>
    );
  }

  if (tenant.type === 'nail-technician') {
    return (
      <>
        <NailTechnicianNavbar nailTechnician={tenant.profile} />
        <div>{children}</div>
        <NailTechnicianFooter nailTechnician={tenant.profile} />
        <InstallAppPrompt {...installPrompt} />
      </>
    );
  }

  if (tenant.type === 'lash-technician') {
    return (
      <>
        <LashTechnicianNavbar lashTechnician={tenant.profile} />
        <div>{children}</div>
        <LashTechnicianFooter lashTechnician={tenant.profile} />
        <InstallAppPrompt {...installPrompt} />
      </>
    );
  }

  if (tenant.type === 'makeup-artist') {
    return (
      <>
        <MakeupArtistNavbar makeupArtist={tenant.profile} />
        <div>{children}</div>
        <MakeupArtistFooter makeupArtist={tenant.profile} />
        <InstallAppPrompt {...installPrompt} />
      </>
    );
  }

  return (
    <>
      <BarberNavbar barber={tenant.profile} />
      <div className="min-h-screen bg-orange-50 dark:bg-black">
        {children}
      </div>
      <BarberFooter barber={tenant.profile} />
      <InstallAppPrompt {...installPrompt} />
    </>
  );
}