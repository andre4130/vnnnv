import 'server-only';

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import type { GalleryImage } from '@/lib/galleryImages';

export type {
  GalleryImage,
  GalleryOrientation,
  GalleryRow,
  GalleryRowType,
} from '@/lib/galleryImages';
export { packGalleryRows } from '@/lib/galleryImages';

const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif)$/i;
const DUPLICATE_SUFFIX = / \d+\./; // e.g. "PHOTO RIDING_56 2.jpg"

function naturalCompare(a: string, b: string): number {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

function encodePublicPath(folder: string, file: string): string {
  return `/images/${folder}/${encodeURIComponent(file)}`;
}

/** Reads gallery images from `public/images/{folder}` in natural name order. */
export async function getGalleryImages(
  folder: 'product' | 'visual'
): Promise<GalleryImage[]> {
  const dir = path.join(process.cwd(), 'public/images', folder);

  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs
    .readdirSync(dir)
    .filter((file) => IMAGE_EXT.test(file) && !DUPLICATE_SUFFIX.test(file))
    .sort(naturalCompare);

  const images: GalleryImage[] = [];

  for (const file of files) {
    const absolute = path.join(dir, file);
    const meta = await sharp(absolute).metadata();
    const width = meta.width ?? 0;
    const height = meta.height ?? 0;

    if (!width || !height) {
      continue;
    }

    images.push({
      src: encodePublicPath(folder, file),
      width,
      height,
      orientation: width >= height ? 'landscape' : 'portrait',
    });
  }

  return images;
}
