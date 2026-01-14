"use client";

import { useCart } from "../components/cart";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import VoucherCarousel from "../components/VoucherCarousel";
import { vouchers } from "@/app/data/vouchers";
import { FaCartPlus, FaCheck, FaCheckCircle, FaRegCheckCircle, FaShoppingCart, FaTimes } from "react-icons/fa";

export default function PoukazyPage() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [qty, seCarouselQty] = useState(1);
  const { addItem } = useCart();

  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const selected = vouchers[index];

  const addToCart = () => {
    addItem({ id: selected.id }, qty);
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

  // volitelně: zamknout scroll při otevřeném modalu
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
        <p className="voucher-subtext">
          <a href="tel:+420601006076">Máš vybráno? Volej 👉📞+420 601 006 076</a>
        </p>

        <VoucherCarousel
          index={index}
          onIndexChange={(i) => {
            setIndex(i);
            seCarouselQty(1);
          }}
          direction={direction}
          onDirectionChange={setDirection}
        />

        <div className="voucher-actions">
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
                <h3 className="cart-modalTitle"><FaRegCheckCircle className="icon"/> Přidáno do košíku</h3>
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
