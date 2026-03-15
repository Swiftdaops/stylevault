import { ImageResponse } from 'next/og'
import { brandImageContentType, renderBrandImage } from '@/lib/brand-image'

export const contentType = brandImageContentType

export const size = {
  width: 180,
  height: 180,
}

export default function AppleIcon() {
  return new ImageResponse(renderBrandImage(size), size)
}