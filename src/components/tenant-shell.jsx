import BarberFooter from '@/components/barber-footer';
import BarberNavbar from '@/components/barbernav';
import HairSpecialistFooter from '@/components/hair-specialist-footer';
import HairSpecialistNavbar from '@/components/hair-specialistnav';

export default function TenantShell({ tenant, children }) {
  if (!tenant?.profile) {
    return children;
  }

  if (tenant.type === 'hair-specialist') {
    return (
      <>
        <HairSpecialistNavbar hairSpecialist={tenant.profile} />
        <div>{children}</div>
        <HairSpecialistFooter hairSpecialist={tenant.profile} />
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
    </>
  );
}