"use client";

import { useState, useEffect } from "react";
import { RowsPhotoAlbum, Photo } from "react-photo-album";

import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

interface GalleryClientProps {
  photos: Photo[];
}

export default function GalleryClient({ photos }: GalleryClientProps) {
  const [index, setIndex] = useState(-1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const slides = photos.map(photo => ({
    src: photo.src,
    alt: photo.title || "Gallery image",
  }));

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <RowsPhotoAlbum 
        photos={photos} 
        defaultContainerWidth={1000}  
        onClick={({ index }) => setIndex(index)}
        componentsProps={{
          image: {
            loading: "eager",
          },
        }}
      />
      
      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Fullscreen, Thumbnails, Zoom]}
      />
    </div>
  );
}