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

  const slides = photos.map(photo => ({
    src: photo.src,
    alt: photo.title || "Gallery image",
  }));

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <RowsPhotoAlbum
        photos={photos}
        breakpoints={[300, 600, 900, 1200]}
        onClick={({ index }) => setIndex(index)}
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
