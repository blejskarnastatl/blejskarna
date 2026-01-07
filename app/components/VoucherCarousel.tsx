"use client";

import Image from "next/image";
import { vouchers } from "@/app/data/vouchers";


export default function VoucherCarousel({
  index,
  onIndexChange,
  direction,
  onDirectionChange,
}: {
  index: number;
  onIndexChange: (nextIndex: number) => void;
  direction: "left" | "right";
  onDirectionChange: (dir: "left" | "right") => void;
}) {
  const prev = () => {
    onDirectionChange("left");
    onIndexChange(index === 0 ? vouchers.length - 1 : index - 1);
  };

  const next = () => {
    onDirectionChange("right");
    onIndexChange(index === vouchers.length - 1 ? 0 : index + 1);
  };

  return (
    <div>
      {/* preloader */}
      <div aria-hidden="true" style={{ height: 0, overflow: "hidden" }}>
        {vouchers.map((v) => (
          <Image
            key={v.src}
            src={v.src}
            alt=""
            width={10}
            height={10}
            priority={v.src === vouchers[0].src}
          />
        ))}
      </div>

      <div className="voucher-frame">
        <button
          type="button"
          className="voucher-arrow voucher-arrow--left"
          onClick={prev}
          aria-label="Předchozí poukaz"
        >
          ‹
        </button>

        <div
          key={index}
          className={
            "voucher-image-wrapper " +
            (direction === "right" ? "voucher-slide-right" : "voucher-slide-left")
          }
        >
          <Image
            src={vouchers[index].src}
            alt={vouchers[index].alt}
            width={750}
            height={400}
            className="voucher-image"
          />
        </div>

        <button
          type="button"
          className="voucher-arrow voucher-arrow--right"
          onClick={next}
          aria-label="Další poukaz"
        >
          ›
        </button>
      </div>

      <div className="voucher-dots">
        {vouchers.map((v, i) => (
          <button
            key={v.title}
            type="button"
            className={"voucher-dot" + (i === index ? " voucher-dot--active" : "")}
            onClick={() => {
              if (i > index) onDirectionChange("right");
              if (i < index) onDirectionChange("left");
              onIndexChange(i);
            }}
            aria-label={`Zobrazit poukaz ${v.title}`}
          />
        ))}
      </div>
    </div>
  );
}
