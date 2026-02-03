import fs from "fs";
import path from "path";
import sizeOf from "image-size";

export default function getGalleryPhotos() {
  const galleryPath = path.join(process.cwd(), "public/fotogalerie");

  const files = fs.readdirSync(galleryPath);

  return files
    .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
    .map((file) => {
      const filePath = path.join(galleryPath, file);
      try {
        const dimensions = sizeOf(fs.readFileSync(filePath));
        if (!dimensions || !dimensions.width || !dimensions.height) {
          console.error(`Invalid dimensions for image ${file}`);
          return null;
        }
        return {
          src: `/fotogalerie/${file}`,
          width: dimensions.width,
          height: dimensions.height,
        };
      } catch (error) {
        console.error(`Error processing image ${file}:`, error);
        return null;
      }
    })
    .filter(Boolean);
}