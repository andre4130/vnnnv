import type { Metadata } from 'next';
import { getGalleryImages, packGalleryRows } from '@/lib/galleryImages.server';
import ImageGallery from '@/components/ImageGallery';

export const metadata: Metadata = {
  title: 'Product',
  description: 'Product photography and design work.',
};

export default async function ProductPage() {
  const images = await getGalleryImages('product');
  const rows = packGalleryRows(images);

  return <ImageGallery rows={rows} />;
}
