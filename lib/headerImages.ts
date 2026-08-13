function fileName(src: string): string {
  return src.split('/').pop() ?? src;
}

export function getHeaderImagesForPath(
  pathname: string,
  allImages: readonly string[]
): string[] {
  if (pathname.startsWith('/product')) {
    return allImages.filter((src) =>
      fileName(src).toUpperCase().startsWith('PRODUCT_')
    );
  }
  if (pathname.startsWith('/visual')) {
    return allImages.filter((src) =>
      fileName(src).toUpperCase().startsWith('VISUAL_')
    );
  }
  if (pathname.startsWith('/about')) {
    return allImages.filter((src) =>
      fileName(src).toUpperCase().startsWith('ABOUT_')
    );
  }
  // Home (`/`) and any unmatched routes use HOME_* only.
  return allImages.filter((src) =>
    fileName(src).toUpperCase().startsWith('HOME_')
  );
}

export function pickRandom(images: readonly string[]): string | null {
  if (images.length === 0) {
    return null;
  }
  const index = Math.floor(Math.random() * images.length);
  return images[index] ?? null;
}

export function pickNextBackground(
  pathname: string,
  images: readonly string[],
  current: string | null
): string | null {
  const pool = getHeaderImagesForPath(pathname, images);
  if (pool.length === 0) {
    return null;
  }

  if (current && pool.length > 1) {
    const alternatives = pool.filter((src) => src !== current);
    return pickRandom(alternatives.length > 0 ? alternatives : pool);
  }

  return pickRandom(pool);
}
