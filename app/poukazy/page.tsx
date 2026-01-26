"use client";

import styles from "./page.module.css";
import { useCart } from "../components/cart";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import VoucherCarousel from "../components/VoucherCarousel";
import {
  NAPRANI_MAX,
  NAPRANI_MIN,
  NAPRANI_STEP,
  NAPRANI_VOUCHER_ID,
  vouchers,
} from "@/app/data/vouchers";
import {
  FaCartPlus,
  FaCheckCircle,
  FaRegCheckCircle,
  FaShoppingCart,
  FaTimes,
} from "react-icons/fa";

const czk = new Intl.NumberFormat("cs-CZ", {
  style: "currency",
  currency: "CZK",
  maximumFractionDigits: 0,
});

// jen číslice (povolíme i prázdné během psaní)
const DIGITS_RE = /^\d*$/;

function clampWish(n: number) {
  if (!Number.isFinite(n)) return NAPRANI_MIN;
  const floored = Math.floor(n);
  return Math.max(NAPRANI_MIN, Math.min(NAPRANI_MAX, floored));
}

export default function Page() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [qty, setCarouselQty] = useState(1);

  // místo wishValue číslo držíme draft jako string (aby šlo psát bez přepisování)
  const [wishDraft, setWishDraft] = useState<string>(String(NAPRANI_MIN));

  const { addItem } = useCart();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selected = vouchers[index];
  const isNapranI = selected.id === NAPRANI_VOUCHER_ID;

  const commitWishDraft = () => {
    if (wishDraft.trim() === "") {
      setWishDraft(String(NAPRANI_MIN));
      return NAPRANI_MIN;
    }

    const n = Number(wishDraft);
    const clamped = clampWish(n);
    setWishDraft(String(clamped));
    return clamped;
  };

  // Cena pro zobrazení / košík
  const unitPriceCzk = useMemo(() => {
    if (isNapranI) {
      // během psaní neclampujeme, ale potřebujeme číslo pro výpočet:
      // - pokud je prázdné / NaN => 0 (ať se nezobrazuje nesmysl)
      // - při addToCart stejně commitneme
      const raw = wishDraft.trim();
      if (raw === "") return 0;
      const n = Number(raw);
      return Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 0;
    }

    const price = Number(selected?.price ?? 0);
    return Number.isFinite(price) ? Math.max(0, Math.floor(price)) : 0;
  }, [selected, isNapranI, wishDraft]);

  const addToCart = () => {
    // při přidání do košíku chci mít jistotu clampu pro "na přání"
    const finalUnitPrice = isNapranI ? commitWishDraft() : unitPriceCzk;

    addItem({ id: selected.id, unitPrice: finalUnitPrice }, qty);
    setCarouselQty(1);
    setIsModalOpen(true);
  };

  // ESC zavře modal
  useEffect(() => {
    if (!isModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isModalOpen]);

  // zamknout scroll při otevřeném modalu
  useEffect(() => {
    if (!isModalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isModalOpen]);

  return (
    <div className={styles.page}>
      <div className={styles.voucherCarousel}>
        <h1 className={styles.voucherHeading}>Dárkové lajstra? Máme.</h1>

        <div className={styles.voucherHowto}>
          <h2 className={styles.voucherSubHeading}>
            <FaCheckCircle className={styles.subHeadingIcon} /> Všechny poukazy je možné
            zakoupit přímo v Blejskárně i bez objednání.
          </h2>

          <ol className={styles.voucherHowtoList}>
            <li>
              Naklikáš si poukazy <strong>do košíku</strong>.
            </li>
            <li>
              V košíku na sebe vyplníš kontakt, zvolíš způsob doručení a odešleš objednávku.
            </li>
            <li>
              Na e-mail ti přijde potvrzení s <strong>QR kódem pro platbu</strong>.
            </li>
            <li>
              Po přijetí platby <strong>voucher pošleme e-mailem</strong> nebo bude připravený{" "}
              <strong>k vyzvednutí v Blejskárně</strong>, podle toho, co si zvolíš.
            </li>
          </ol>
        </div>

        <VoucherCarousel
          index={index}
          onIndexChange={(i) => {
            setIndex(i);
            setCarouselQty(1);

            // při přepnutí na "na přání" nastav default 200
            if (vouchers[i].id === NAPRANI_VOUCHER_ID) {
              setWishDraft(String(NAPRANI_MIN));
            }
          }}
          direction={direction}
          onDirectionChange={setDirection}
        />

        <div className={styles.voucherActions}>
          {unitPriceCzk > 0 && !isNapranI && (
            <div className={styles.voucherPricePill} aria-label="Cena">
              <strong>{czk.format(unitPriceCzk)}</strong>
            </div>
          )}

          {isNapranI && (
            <div className={styles.wishPrice} aria-label="Hodnota poukazu">
              <label className={styles.fieldInline}>
                <span>Hodnota:</span>

                <input
                  className={styles.priceInput}
                  type="number"
                  inputMode="numeric"
                  step={NAPRANI_STEP}
                  pattern="[0-9]*"
                  // nepoužíváme min/max tady, protože clamp děláme až při commit
                  // a během psaní nechceme přepisovat.
                  value={wishDraft}
                  onChange={(e) => {
                    const v = e.target.value;
                    // povolit jen číslice (a prázdné)
                    if (!DIGITS_RE.test(v)) return;
                    setWishDraft(v);
                  }}
                  onBlur={() => {
                    commitWishDraft();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      commitWishDraft();
                      (e.currentTarget as HTMLInputElement).blur();
                    }
                  }}
                />

                <span>Kč</span>
              </label>
            </div>
          )}

          <div className={styles.voucherQty}>
            <button
              type="button"
              onClick={() => setCarouselQty((q) => Math.max(1, q - 1))}
              aria-label="Snížit množství"
            >
              −
            </button>

            <span className={styles.voucherQtyNumber}>{qty}</span>

            <button
              type="button"
              onClick={() => setCarouselQty((q) => q + 1)}
              aria-label="Zvýšit množství"
            >
              +
            </button>
          </div>

          <button type="button" className={styles.voucherAddBtn} onClick={addToCart}>
            <FaCartPlus /> Do košíku
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.modalClose}
              onClick={() => setIsModalOpen(false)}
              aria-label="Zavřít"
            >
              <FaTimes />
            </button>

            <div className={styles.modalHead}>
              <div className={styles.modalIcon}>
                <FaShoppingCart />
              </div>

              <h3 className={styles.modalTitle}>
                <FaRegCheckCircle className={styles.modalTitleIcon} />
                Přidáno do košíku
              </h3>
            </div>

            <div className={styles.modalActions}>
              <button
                type="button"
                className={`${styles.modalBtn} ${styles.modalBtnGhost}`}
                onClick={() => setIsModalOpen(false)}
              >
                Pokračovat v nákupu
              </button>

              <button
                type="button"
                className={`${styles.modalBtn} ${styles.modalBtnPrimary}`}
                onClick={() => router.push("/kosik")}
              >
                Přejít do košíku
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
