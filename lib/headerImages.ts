function fileName(src: string): string {
  return src.split("/").pop() ?? src;
}

export function getHeaderImagesForPath(
  pathname: string,
  allImages: readonly string[],
): string[] {
  if (pathname.startsWith("/product")) {
    return allImages.filter((src) =>
      fileName(src).toUpperCase().startsWith("PRODUCT_"),
    );
  }
  if (pathname.startsWith("/visual")) {
    return allImages.filter((src) =>
      fileName(src).toUpperCase().startsWith("VISUAL_"),
    );
  }
  if (pathname.startsWith("/about")) {
    return allImages.filter((src) =>
      fileName(src).toUpperCase().startsWith("ABOUT_"),
    );
  }
  return [...allImages];
}

export function pickRandom(images: readonly string[]): string | null {
  if (images.length === 0) {
    return null;
  }
  const index = Math.floor(Math.random() * images.length);
  return images[index] ?? null;
}
