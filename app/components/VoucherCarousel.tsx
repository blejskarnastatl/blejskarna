"use client";

import Image from "next/image";
import { vouchers } from "@/app/data/vouchers";
import styles from "../poukazy/VoucherCarousel.module.css";

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

      <div className={styles.frame}>
        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowLeft}`}
          onClick={prev}
          aria-label="Předchozí poukaz"
        >
          ‹
        </button>

        <div
          key={index}
          className={`${styles.imageWrapper} ${
            direction === "right" ? styles.slideRight : styles.slideLeft
          }`}
        >
          <Image
            src={vouchers[index].src}
            alt={vouchers[index].alt}
            width={750}
            height={400}
            className={styles.image}
          />
        </div>

        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowRight}`}
          onClick={next}
          aria-label="Další poukaz"
        >
          ›
        </button>
      </div>

      <div className={styles.dots}>
        {vouchers.map((v, i) => (
          <button
            key={v.title}
            type="button"
            className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
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
