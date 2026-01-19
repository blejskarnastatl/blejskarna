"use client";

import { useCart} from "../components/cart";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import VoucherCarousel from "../components/VoucherCarousel";
import { NAPRANI_MAX, NAPRANI_MIN, NAPRANI_STEP, NAPRANI_VOUCHER_ID, VoucherId, vouchers} from "@/app/data/vouchers";
import { FaCartPlus, FaRegCheckCircle, FaShoppingCart, FaTimes } from "react-icons/fa";

const czk = new Intl.NumberFormat("cs-CZ", {
  style: "currency",
  currency: "CZK",
  maximumFractionDigits: 0,
});

export default function PoukazyPage() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [qty, seCarouselQty] = useState(1);
  const [wishValue, setWishValue] = useState(NAPRANI_MIN);
  const { addItem } = useCart();

  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selected = vouchers[index];

  const is_NAPRANI = selected.id === NAPRANI_VOUCHER_ID;

  const unitPriceCzk = useMemo(() => {
    if (is_NAPRANI) {
      const n = Math.floor(Number(wishValue) || NAPRANI_MIN);
      return Math.max(NAPRANI_MIN, Math.min(NAPRANI_MAX, n));
    }
    const price = Number(selected?.price ?? 0);
    return Number.isFinite(price) ? Math.max(0, Math.floor(price)) : 0;
  }, [selected, is_NAPRANI, wishValue]);


  const addToCart = () => {
    addItem({ id: selected.id, unitPrice:unitPriceCzk }, qty);
    seCarouselQty(1);
    setIsModalOpen(true);
  };

  // ESC zavře modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // zamknout scroll při otevřeném modalu
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  return (
    <div className="page-shell">
      <div className="voucher-carousel">
        <h1 className="voucher-heading">Dárkové lajstra? Máme.</h1>
        <strong>Všechny poukazy je možné zakoupit přímo v Blejskárně i bez objednání.</strong>

        <div className="voucher-howto">
          <ol className="voucher-howtoList">
            <li>Naklikáš si poukazy <strong>do košíku</strong>.</li>
            <li>V košíku na sebe vyplníš kontakt, zvolíš způsob doručení a odešleš objednávku.</li>
            <li>Na e-mail ti přijde potvrzení s <strong>QR kódem pro platbu</strong>.
            </li>
            <li>
              Po přijetí platby{" "}
              <strong>voucher pošleme e-mailem</strong> nebo bude připravený <strong>k vyzvednutí v Blejskárně</strong>, podle toho, co sis zvolil.
            </li>
          </ol>
        </div>

        <VoucherCarousel
          index={index}
          onIndexChange={(i) => {
          setIndex(i);
          seCarouselQty(1);
          if (vouchers[i].id === NAPRANI_VOUCHER_ID) setWishValue(NAPRANI_MIN);
          }}
          direction={direction}
          onDirectionChange={setDirection}
        />

        <div className="voucher-actions">

          {unitPriceCzk > 0 && !is_NAPRANI &&(
            <div className="voucher-pricePill" aria-label="Cena">
              <strong>{czk.format(unitPriceCzk)}</strong>
            </div>
          )}

          {is_NAPRANI && (
            <div className="cart-wishPrice">
              <label className="cart-fieldInline">
                <span>Hodnota:</span>
                <input
                  className="cart-priceInput"
                  type="number"
                  inputMode="numeric"
                  min={NAPRANI_MIN}
                  max={NAPRANI_MAX}
                  step={NAPRANI_STEP}
                  value={unitPriceCzk}
                  onChange={(e) => {
                    const n = Math.floor(Number(e.target.value));
                    if (!Number.isFinite(n)) return;
                    const clamped = Math.max(NAPRANI_MIN, Math.min(NAPRANI_MAX, n));
                    setWishValue(clamped)
                  }}
                />
                <span>Kč</span>
              </label>
            </div>
          )}

          <div className="voucher-qty">
            <button type="button" onClick={() => seCarouselQty((q) => Math.max(1, q - 1))}>
              −
            </button>
            <span className="voucher-qtyNumber">{qty}</span>
            <button type="button" onClick={() => seCarouselQty((q) => q + 1)}>
              +
            </button>
          </div>

          <button type="button" className="voucher-addBtn" onClick={addToCart}>
            <FaCartPlus /> Do košíku
          </button>
        </div>
      </div>

      {/* ✅ MODAL */}
      {isModalOpen && (
        <div className="cart-modalOverlay" onClick={() => setIsModalOpen(false)}>
          <div className="cart-modalCard" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="cart-modalClose"
              onClick={() => setIsModalOpen(false)}
              aria-label="Zavřít"
            >
              <FaTimes />
            </button>

            <div className="cart-modalHead">
              <div className="cart-modalIcon">
                <FaShoppingCart />
              </div>

              <div>
                <h3 className="cart-modalTitle">
                  <FaRegCheckCircle className="icon" /> Přidáno do košíku
                </h3>
              </div>
            </div>

            <div className="cart-modalActions">
              <button
                type="button"
                className="cart-modalBtn cart-modalBtn--ghost"
                onClick={() => setIsModalOpen(false)}
              >
                Pokračovat v nákupu
              </button>

              <button
                type="button"
                className="cart-modalBtn cart-modalBtn--primary"
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
