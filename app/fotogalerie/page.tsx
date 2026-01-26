import LoadGalleryPhotos from "./GalleryPhotoLoader";
import GalleryClient from "./GalleryClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fotogalerie",
  alternates: {
    canonical: "/fotogalerie",
  },
};

export default function GaleriePage() {
  const photos = LoadGalleryPhotos();
<<<<<<< HEAD
  const validPhotos = photos.filter((photo) => photo !== null);
  console.log('Photos loaded:', validPhotos.length);
=======
  console.log('Photos loaded:', photos.length);
>>>>>>> 36c68820ba1a41fc0a0d1f69da5107ed0132d2d2

  return <GalleryClient photos={validPhotos} />;
}
