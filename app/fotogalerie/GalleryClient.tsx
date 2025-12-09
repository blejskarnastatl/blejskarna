"use client";

import { useState } from "react";
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
  return (
    <div>
      <RowsPhotoAlbum photos={photos} 
        defaultContainerWidth={1000}  
        onClick={({ index }) => setIndex(index)}
        componentsProps={{
        image: {
          loading: "lazy",
        },
      }}
      />
      {index >= 0 && (
        <Lightbox
          index={index}
          open={index >= 0}
          close={() => setIndex(-1)}
          slides={photos}
          plugins={[Fullscreen, Thumbnails, Zoom]}
        />
      )}
    </div>
  );
}
