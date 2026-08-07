import 'server-only';

import fs from 'fs';
import path from 'path';

const DESKTOP_HEADER_DIR = path.join(
  process.cwd(),
  'public/images/header/desktop'
);
const MOBILE_HEADER_DIR = path.join(
  process.cwd(),
  'public/images/header/mobile'
);
const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif)$/i;

/** Reads every image currently in `public/images/header`. */
export function getAllHeaderImages({
  isMobile,
}: {
  isMobile: boolean;
}): string[] {
  if (
    isMobile
      ? !fs.existsSync(MOBILE_HEADER_DIR)
      : !fs.existsSync(DESKTOP_HEADER_DIR)
  ) {
    return [];
  }

  return fs
    .readdirSync(isMobile ? MOBILE_HEADER_DIR : DESKTOP_HEADER_DIR)
    .filter((file) => IMAGE_EXT.test(file))
    .sort((a, b) => a.localeCompare(b))
    .map((file) => `/images/header/${isMobile ? 'mobile' : 'desktop'}/${file}`);
}
