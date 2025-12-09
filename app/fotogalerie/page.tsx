import LoadGalleryPhotos from "./GalleryPhotoLoader";
import GalleryClient from "./GalleryClient";

export default function GaleriePage() {
  const photos = LoadGalleryPhotos();

  return <GalleryClient photos={photos} />;
}
