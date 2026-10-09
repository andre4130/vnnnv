export type GalleryOrientation = 'landscape' | 'portrait';

export type GalleryImage = {
  src: string;
  width: number;
  height: number;
  orientation: GalleryOrientation;
  /** Product letter from `VNNNV_A_1.jpg`-style names; unset for ungrouped galleries. */
  group?: string;
};

export type GalleryRowType = GalleryOrientation | 'mixed';

export type GalleryRow =
  | { type: 'header'; title: string; description: string }
  | { type: GalleryRowType; images: GalleryImage[] };

/** TEXTO_PRODUCTO.pdf blocks in A–G order. */
export const PRODUCT_GROUP_COPY: Record<
  string,
  { title: string; description: string }
> = {
  A: {
    title: 'VANS',
    description:
      'Collaboration on the design of the Vans x Courage Adams clothing collection. Shoes, vest, T-shirt, pants and socks.',
  },
  B: {
    title: 'ETNIES',
    description:
      'Concept development and design of the BMX seat for the ETNIES x FLYBIKES collaboration.',
  },
  C: {
    title: 'ETNIES',
    description: 'Design of Sergio Layos’ signature ETNIES shoe.',
  },
  D: {
    title: 'ETNIES',
    description:
      'Collaboration on the design of Devon Smillie’s signature ETNIES shoe.',
  },
  E: {
    title: 'FLYBIKES',
    description:
      'Concept development and print collection design for Flybikes BMX.',
  },
  F: {
    title: 'FLYBIKES',
    description:
      'Collaboration on creative direction, concept development, and product design for Flybikes BMX.',
  },
  G: {
    title: 'FLYBIKES',
    description:
      'Creative direction, concept development, design and product customization for Flybikes BMX.',
  },
};

/** Matches `VNNNV_A_1.jpg` / `VNNNV_G_12.jpg`, not `PHOTO VISUAL_15_A.jpg`. */
export function parseProductGroup(file: string): string | undefined {
  const match = file.match(/_([A-Z])_\d+\./);
  return match?.[1];
}

/**
 * Packs a flat image list into rows: landscapes alone, portraits in groups of up to 3.
 * A lone portrait followed by a landscape shares one row (1/3 + 2/3).
 */
function packImageRows(images: GalleryImage[]): Extract<
  GalleryRow,
  { images: GalleryImage[] }
>[] {
  const rows: Extract<GalleryRow, { images: GalleryImage[] }>[] = [];
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

function splitByGroup(images: GalleryImage[]): GalleryImage[][] {
  if (images.length === 0) return [];

  const runs: GalleryImage[][] = [];
  let current: GalleryImage[] = [images[0]];

  for (let i = 1; i < images.length; i++) {
    const image = images[i];
    if (image.group === current[0].group) {
      current.push(image);
    } else {
      runs.push(current);
      current = [image];
    }
  }

  runs.push(current);
  return runs;
}

/**
 * Packs images into rows. When consecutive images share a product letter that
 * has copy in PRODUCT_GROUP_COPY, a header row is inserted before that set.
 */
export function packGalleryRows(images: GalleryImage[]): GalleryRow[] {
  const rows: GalleryRow[] = [];

  for (const run of splitByGroup(images)) {
    const letter = run[0]?.group;
    const copy = letter ? PRODUCT_GROUP_COPY[letter] : undefined;

    if (letter && copy) {
      rows.push({
        type: 'header',
        title: copy.title,
        description: copy.description,
      });
    }

    rows.push(...packImageRows(run));
  }

  return rows;
}
