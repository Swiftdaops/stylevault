import { ImageResponse } from 'next/og'
import { brandImageContentType, renderBrandImage } from '@/lib/brand-image'

const size = {
  width: 512,
  height: 512,
}

export const contentType = brandImageContentType

export async function GET() {
  return new ImageResponse(renderBrandImage(size), size)
}