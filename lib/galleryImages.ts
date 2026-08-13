export type GalleryOrientation = 'landscape' | 'portrait';

export type GalleryImage = {
  src: string;
  width: number;
  height: number;
  orientation: GalleryOrientation;
};

export type GalleryRowType = GalleryOrientation | 'mixed';

export type GalleryRow = {
  type: GalleryRowType;
  images: GalleryImage[];
};

/**
 * Packs images into rows: landscapes alone, portraits in groups of up to 3.
 * A lone portrait followed by a landscape shares one row (1/3 + 2/3).
 */
export function packGalleryRows(images: GalleryImage[]): GalleryRow[] {
  const rows: GalleryRow[] = [];
  let portraits: GalleryImage[] = [];

  const flushPortraits = () => {
    if (portraits.length === 0) return;
    rows.push({ type: 'portrait', images: portraits });
    portraits = [];
  };

  for (const image of images) {
    if (image.orientation === 'landscape') {
      if (portraits.length === 1) {
        rows.push({ type: 'mixed', images: [portraits[0], image] });
        portraits = [];
        continue;
      }

      flushPortraits();
      rows.push({ type: 'landscape', images: [image] });
      continue;
    }

    portraits.push(image);
    if (portraits.length === 3) {
      flushPortraits();
    }
  }

  flushPortraits();
  return rows;
}
