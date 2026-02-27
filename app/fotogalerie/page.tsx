import dynamic from "next/dynamic";
import LoadGalleryPhotos from "./GalleryPhotoLoader";

const GalleryClient = dynamic(() => import("./GalleryClient"), {
  ssr: false,
});

export default function GaleriePage() {
  const photos = LoadGalleryPhotos();
  const validPhotos = photos.filter((photo) => photo !== null);

  return <GalleryClient photos={validPhotos} />;
}
