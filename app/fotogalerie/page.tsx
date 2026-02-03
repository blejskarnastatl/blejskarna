import LoadGalleryPhotos from "./GalleryPhotoLoader";
import GalleryClient from "./GalleryClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fotogalerie | Blejskárna ŠTATL",
  alternates: {
    canonical: "/fotogalerie",
  },
};

export default function GaleriePage() {
  const photos = LoadGalleryPhotos();
  const validPhotos = photos.filter((photo) => photo !== null);
  console.log('Photos loaded:', validPhotos.length);
  return <GalleryClient photos={validPhotos} />;
}
