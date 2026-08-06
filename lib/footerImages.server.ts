import "server-only";

import fs from "fs";
import path from "path";

const FOOTER_DIR = path.join(process.cwd(), "public/images/footer");
const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif)$/i;

/** Reads every image currently in `public/images/footer`. */
export function getAllFooterImages(): string[] {
  if (!fs.existsSync(FOOTER_DIR)) {
    return [];
  }

  return fs
    .readdirSync(FOOTER_DIR)
    .filter((file) => IMAGE_EXT.test(file))
    .sort((a, b) => a.localeCompare(b))
    .map((file) => `/images/footer/${file}`);
}
