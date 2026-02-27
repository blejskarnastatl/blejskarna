import LoadGalleryPhotos from "./GalleryPhotoLoader";
import GalleryClient from "./GalleryClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fotogalerie | Blejskárna ŠTATL",
  alternates: {
    canonical: "/fotogalerie",
  },
};

export default function GalleryPage() {
  const photos = LoadGalleryPhotos();
  return <GalleryClient photos={photos} />;
}
