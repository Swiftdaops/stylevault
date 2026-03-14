import { ImageResponse } from 'next/og';
import { brandImageContentType, brandShareSize, renderBrandImage } from '@/lib/brand-image';

export const size = brandShareSize;
export const contentType = brandImageContentType;
export const alt = 'StyleVault brand image';

export default function OpenGraphImage() {
	return new ImageResponse(renderBrandImage(brandShareSize), brandShareSize);
}