"use client";

import Image from "next/image";
import { useState } from "react";

const vouchers = [
  {
    src: "/poukazy/v1- fest.svg",
    alt: "Dárkový poukaz FEST",
    title: "FEST",
  },
  {
    src: "/poukazy/v1- grunt.svg",
    alt: "Dárkový poukaz GRUNT",
    title: "GRUNT",
  },
  {
    src: "/poukazy/v1- mrte.svg",
    alt: "Dárkový poukaz DO MRTĚ",
    title: "DO MRTĚ",
  },
  {
    src: "/poukazy/v1 - prani.svg",
    alt: "Dárkový poukaz NA PŘÁNÍ",
    title: "NA PŘÁNÍ",
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
      <h1 className="voucher-heading">Dárkové lajstra? Máme.</h1>
      <p className="voucher-subtext">
        <a href="tel:+420601006076"> Máš vybráno? Volej 👉📞+420 601 006 076</a>
      </p>
       {/* 🔥 skrytý preloader – načte všechny 4 obrázky hned po otevření stránky */}
      <div aria-hidden="true" style={{ height: 0, overflow: "hidden" }}>
        {vouchers.map((v) => (
          <Image
            key={v.src}
            src={v.src}
            alt=""
            width={10}
            height={10}
            priority={v.src === vouchers[0].src} // první poukaz má prioritu
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
            (direction === "right"
              ? "voucher-slide-right"
              : "voucher-slide-left")
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
