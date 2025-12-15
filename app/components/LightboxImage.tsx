"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";

type Props = Omit<ImageProps, "onClick"> & {
  overlayClassName?: string;
  modalImageClassName?: string;
};

export default function LightboxImage({
  overlayClassName,
  modalImageClassName,
  className,
  ...imgProps
}: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <Image
        {...imgProps}
        className={className}
        style={{ cursor: "zoom-in", ...(imgProps.style ?? {}) }}
        onClick={() => setOpen(true)}
        alt={imgProps.alt || ""}
      />

      {open && (
        <div
          className={overlayClassName ?? "lightbox-overlay"}
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="lightbox-close"
            onClick={() => setOpen(false)}
            aria-label="Zavřít náhled"
          >
            ×
          </button>

          <div className="lightbox-modal" onClick={(e) => e.stopPropagation()}>
            <Image
              {...imgProps}
              className={modalImageClassName ?? "lightbox-image"}
              style={{ height: "auto", width: "100%" }}
              alt={imgProps.alt || ""}
            />
          </div>
        </div>
      )}
    </>
  );
}
