import React from 'react'
import HairSpecialistNavbar from '@/components/hair-specialistnav'
import HairSpecialistFooter from '@/components/hair-specialist-footer'
import { getHairSpecialistBySlug } from '@/lib/hair-specialist-api'

export default async function HairSpecialistLayout({ children, params }) {
  const hairSpecialist = await getHairSpecialistBySlug(params.slug)

  return (
    <>
      <HairSpecialistNavbar hairSpecialist={hairSpecialist} />
      <div>{children}</div>
      <HairSpecialistFooter hairSpecialist={hairSpecialist} />
    </>
  )
}
