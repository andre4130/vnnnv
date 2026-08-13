import type { Metadata } from 'next';
import ImageGallery from '@/components/ImageGallery';
import {
  getGalleryImages,
  packGalleryRows,
} from '@/lib/galleryImages.server';

export const metadata: Metadata = {
  title: 'Visual',
  description: 'Visual and photographic work.',
};

export default async function VisualPage() {
  const images = await getGalleryImages('visual');
  const rows = packGalleryRows(images);

  return <ImageGallery rows={rows} />;
}
