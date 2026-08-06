import "server-only";

import fs from "fs";
import path from "path";

const HEADER_DIR = path.join(process.cwd(), "public/images/header");
const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif)$/i;

/** Reads every image currently in `public/images/header`. */
export function getAllHeaderImages(): string[] {
  if (!fs.existsSync(HEADER_DIR)) {
    return [];
  }

  return fs
    .readdirSync(HEADER_DIR)
    .filter((file) => IMAGE_EXT.test(file))
    .sort((a, b) => a.localeCompare(b))
    .map((file) => `/images/header/${file}`);
}
