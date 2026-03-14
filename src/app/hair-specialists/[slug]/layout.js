import React from 'react'
import HairSpecialistNavbar from '@/components/hair-specialistnav'
import HairSpecialistFooter from '@/components/hair-specialist-footer'
import { getHairSpecialistBySlug } from '@/lib/hair-specialist-api'
import { notFound } from 'next/navigation'

export default async function HairSpecialistLayout({ children, params }) {
  const { slug } = await params
  const hairSpecialist = await getHairSpecialistBySlug(slug)

  if (!hairSpecialist) {
    notFound()
  }

  return (
    <>
      <HairSpecialistNavbar hairSpecialist={hairSpecialist} />
      <div>{children}</div>
      <HairSpecialistFooter hairSpecialist={hairSpecialist} />
    </>
  )
}
