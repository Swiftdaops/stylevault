import { ImageResponse } from 'next/og'
import { brandImageContentType, renderBrandImage } from '@/lib/brand-image'

const size = {
  width: 192,
  height: 192,
}

export const contentType = brandImageContentType

export async function GET() {
  return new ImageResponse(renderBrandImage(size), size)
}