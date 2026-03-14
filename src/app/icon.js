import { ImageResponse } from 'next/og';
import { brandIconSize, brandImageContentType, renderBrandImage } from '@/lib/brand-image';

export const size = brandIconSize;
export const contentType = brandImageContentType;

export default function Icon() {
	return new ImageResponse(renderBrandImage(brandIconSize), brandIconSize);
}