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

  return <GalleryClient photos={photos} />;
}
