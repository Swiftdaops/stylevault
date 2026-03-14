import { ImageResponse } from 'next/og';
import { brandImageContentType, brandShareSize, renderBrandImage } from '@/lib/brand-image';

export const size = brandShareSize;
export const contentType = brandImageContentType;
export const alt = 'StyleVault share image';

export default function TwitterImage() {
	return new ImageResponse(renderBrandImage(brandShareSize), brandShareSize);
}