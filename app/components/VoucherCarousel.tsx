"use client";

import Image from "next/image";
import { useState } from "react";

const vouchers = [
  {
    src: "/poukazy/v1- fest.svg",
    alt: "Dárkový poukaz BASIC",
    title: "BASIC",
  },
  {
    src: "/poukazy/v1- grunt.svg",
    alt: "Dárkový poukaz COMFORT",
    title: "COMFORT",
  },
  {
    src: "/poukazy/v1- mrte.svg",
    alt: "Dárkový poukaz PREMIUM",
    title: "PREMIUM",
  },
  {
    src: "/poukazy/v1 - prani.svg",
    alt: "Dárkový poukaz DELUXE",
    title: "DELUXE",
  },
];

export default function VoucherCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const prev = () => {
    setDirection("left");
    setIndex((prev) => (prev === 0 ? vouchers.length - 1 : prev - 1));
  };

  const next = () => {
    setDirection("right");
    setIndex((prev) => (prev === vouchers.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="voucher-carousel">
      <h2 className="voucher-heading">Dárkové poukazy</h2>

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
            (direction === "right"
              ? "voucher-slide-right"
              : "voucher-slide-left")
          }
        >
          <Image
            src={vouchers[index].src}
            alt={vouchers[index].alt}
            width={800}
            height={500}
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
            className={
              "voucher-dot" + (i === index ? " voucher-dot--active" : "")
            }
            onClick={() => {
              if (i > index) setDirection("right");
              if (i < index) setDirection("left");
              setIndex(i);
            }}
            aria-label={`Zobrazit poukaz ${v.title}`}
          />
        ))}
      </div>
    </div>
  );
}
