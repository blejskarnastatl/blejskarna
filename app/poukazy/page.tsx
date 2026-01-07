"use client";

import { useCart } from "../components/cart";
import { useState } from "react";
import VoucherCarousel from "../components/VoucherCarousel";
import { vouchers } from "@/app/data/vouchers";


export default function PoukazyPage() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [qty, seCarouselQty] = useState(1);
  const { addItem } = useCart();

  const selected = vouchers[index];

  const addToCart = () => {
    addItem(
      { id: selected.id },
      qty,
    );
    seCarouselQty(1);
  };

  return (
    <div className="page-shell">
      <div className="voucher-carousel">
        <h1 className="voucher-heading">Dárkové lajstra? Máme.</h1>
        <p className="voucher-subtext">
          <a href="tel:+420601006076"> Máš vybráno? Volej 👉📞+420 601 006 076</a>
        </p>

        <VoucherCarousel
          index={index}
          onIndexChange={(i) => {
            setIndex(i);
            seCarouselQty(1); // volitelné: reset množství při přepnutí poukazu
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
            Hodit do košíku 🛒
          </button>
        </div>
      </div>
    </div>
  );
}