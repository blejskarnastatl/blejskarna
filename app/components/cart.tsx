"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Voucher, VoucherId, voucherById } from "@/app/data/vouchers";

const STORAGE_KEY = "blejskarna_cart";
const PRANI_VOUCHER_ID = "PRANI" as VoucherId;

// Interní ID řádku košíku (neukazuje se uživateli)
const makeCartItemId = () => {
  try {
    // moderní prohlížeče
    if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  } catch {}
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export type CartItem = {
  cartItemId: string; 
  voucherId: VoucherId; 
  qty: number;
  unitPriceCzk: number;
};

type CartContextValue = {
  items: CartItem[];
  totalQty: number;

  addItem: (item: { id: VoucherId }, qty: number) => void;
  setQty: (cartItemId: string, qty: number) => void;
  setUnitPrice: (cartItemId: string, unitPriceCzk: number) => void;
  removeItem: (cartItemId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem: CartContextValue["addItem"] = (item, qty = 1) => {
    const voucherId = item.id;

    setItems((prev) => {
      const voucher = voucherById[voucherId];
      const defaultPrice = (voucher as Voucher)?.price ?? 0;

      // 1) Přání: každý kus jako vlastní řádek
      if (voucherId === PRANI_VOUCHER_ID) {
        const n = Math.max(1, Math.floor(qty));

        const newLines = Array.from({ length: n }, () => ({
          cartItemId: makeCartItemId(),
          voucherId,
          qty: 1,
          unitPriceCzk: defaultPrice,
        }));

        return [...prev, ...newLines];
      }

      // 2) Ostatní poukazy: slučuj do jedné řádky (pro stejné voucherId)
      const voucherIndex = prev.findIndex((prevItem) => prevItem.voucherId === voucherId);
      if (voucherIndex === -1) {
        return [
          ...prev,
          {
            cartItemId: makeCartItemId(),
            voucherId,
            qty: Math.max(1, qty),
            unitPriceCzk: defaultPrice,
          },
        ];
      }

      const prevItems = [...prev];
      prevItems[voucherIndex] = { ...prevItems[voucherIndex], qty: prevItems[voucherIndex].qty + Math.max(1, qty) };
      return prevItems;
    });
  };

  const setQty: CartContextValue["setQty"] = (cartItemId, qty) => {
    setItems((prev) =>
      prev
        .map((x) => (x.cartItemId === cartItemId ? { ...x, qty: Math.max(1, qty) } : x))
        .filter((x) => x.qty > 0),
    );
  };

  const setUnitPrice: CartContextValue["setUnitPrice"] = (cartItemId, unitPriceCzk) => {
    setItems((prev) =>
      prev.map((x) =>
        x.cartItemId === cartItemId ? { ...x, unitPriceCzk: Math.max(0, Math.floor(unitPriceCzk)) } : x,
      ),
    );
  };

  const removeItem: CartContextValue["removeItem"] = (cartItemId) => {
    setItems((prev) => prev.filter((x) => x.cartItemId !== cartItemId));
  };

  const clear = () => setItems([]);

  const totalQty = useMemo(() => items.reduce((sum, x) => sum + x.qty, 0), [items]);

  const value: CartContextValue = {
    items,
    totalQty,
    addItem,
    setQty,
    setUnitPrice,
    removeItem,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider />");
  return ctx;
}
