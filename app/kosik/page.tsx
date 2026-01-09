"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/components/cart";
import { voucherById, VoucherId } from "@/app/data/vouchers";

const NAPRANI_VOUCHER_ID = "PRANI" as VoucherId;

const NAPRANI_MIN = 200;
const NAPRANI_MAX = 10000;
const NAPRANI_STEP = 100;

const czk = new Intl.NumberFormat("cs-CZ", {
  style: "currency",
  currency: "CZK",
  maximumFractionDigits: 0,
});

export default function KosikPage() {
  const { items, setQty, setUnitPrice, removeItem, clear } = useCart();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [delivery, setDelivery] = useState<"email" | "pickup">("email");
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");

  const normalized = useMemo(() => {
    return items.map((it) => {
      const voucher = voucherById[it.voucherId];
      const is_NAPRANI = it.voucherId === NAPRANI_VOUCHER_ID;

      const unitPrice = is_NAPRANI
        ? Math.max(NAPRANI_MIN, Math.min(NAPRANI_MAX, it.unitPriceCzk || NAPRANI_MIN))
        : it.unitPriceCzk;

      const qty = it.qty;

      return {
        cartItemId: it.cartItemId,
        voucherId: it.voucherId,
        title: voucher?.title,
        src: voucher?.src,
        alt: voucher.alt,
        isWish: is_NAPRANI,
        qty,
        unitPriceCzk: unitPrice,
        lineTotalCzk: qty * unitPrice,
      };
    });
  }, [items]);

  const isEmpty = normalized.length === 0;

  const totalQty = useMemo(() => normalized.reduce((s, x) => s + x.qty, 0), [normalized]);
  const totalCzk = useMemo(() => normalized.reduce((s, x) => s + x.lineTotalCzk, 0), [normalized]);

  const nameOk = firstName.trim().length > 0 && lastName.trim().length > 0;
  const emailOk = email.trim().length > 0 && email.includes("@");
  const emailsMatch = email.trim().length > 0 && email.trim() === email2.trim();

  const canSubmit = !isEmpty && nameOk && emailOk && emailsMatch;

  const submit = () => {
    if (!canSubmit) return;

    const order = {
      createdAt: new Date().toISOString(),
      customer: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
      },
      items: normalized.map((x) => ({
        voucherId: x.voucherId,
        title: x.title,
        qty: x.qty,
        unitPriceCzk: x.unitPriceCzk,
        lineTotalCzk: x.lineTotalCzk,
      })),
      totalQty,
      totalCzk,
    };

    localStorage.setItem("lastOrder", JSON.stringify(order));
    clear();
    window.location.href = "/dekujeme";
  };

  return (
    <div className="cart-page">
      <div className="cart-head">
        <h1 className="cart-title">Košík</h1>
      </div>

      <div className="cart-grid">
        {/* LEVÁ: obsah košíku */}
        <section className="cart-card">
          <div className="cart-cardHead">
            <h2>Obsah košíku</h2>
            {!isEmpty && (
              <button type="button" className="cart-linkBtn" onClick={clear}>
                Vyprázdnit
              </button>
            )}
          </div>

          {isEmpty ? (
            <div className="cart-empty">
              <p>Košík je prázdný.</p>
              <Link href="/poukazy" className="cart-primaryLink">
                Přejít na poukazy →
              </Link>
            </div>
          ) : (
            <>
              <ul className="cart-list">
                {normalized.map((it) => (
                  <li key={it.cartItemId} className="cart-row">
                    <div className="cart-itemLeft">
                      {it.src ? (
                        <Image
                          src={it.src}
                          alt={it.alt}
                          width={72}
                          height={72}
                          className="cart-thumb"
                        />
                      ) : (
                        <div className="cart-thumb cart-thumb--placeholder" />
                      )}

                      <div className="cart-itemMeta">
                        <div className="cart-itemTitle">{it.title}</div>

                        {/* ovládání ceny pro PRANI */}
                        {it.isWish && (
                          <div className="cart-wishPrice">
                            <label className="cart-fieldInline">
                              <span>Cena (Kč)</span>
                              <input
                                className="cart-priceInput"
                                type="number"
                                inputMode="numeric"
                                min={NAPRANI_MIN}
                                max={NAPRANI_MAX}
                                step={NAPRANI_STEP}
                                value={it.unitPriceCzk}
                                onChange={(e) => {
                                  const n = Math.floor(Number(e.target.value));
                                  if (!Number.isFinite(n)) return;
                                  const clamped = Math.max(NAPRANI_MIN, Math.min(NAPRANI_MAX, n));
                                  setUnitPrice(it.cartItemId, clamped);
                                }}
                              />
                            </label>
                          </div>
                        )}

                        <button
                          type="button"
                          className="cart-removeBtn"
                          onClick={() => removeItem(it.cartItemId)}
                        >
                          Odebrat
                        </button>
                      </div>
                    </div>

                    <div className="cart-right">
                      <div className="cart-qtyCtl">
                      <button
                        type="button"
                        onClick={() => setQty(it.cartItemId, Math.max(1, it.qty - 1))}
                        aria-label="Snížit množství"
                      >
                        –
                      </button>

                      <input
                        className="cart-qtyInput"
                        inputMode="numeric"
                        value={it.qty}
                        onChange={(e) => {
                          const n = Number(e.target.value);
                          if (!Number.isFinite(n)) return;
                          setQty(it.cartItemId, Math.max(1, Math.floor(n)));
                        }}
                        aria-label="Množství"
                      />

                      <button
                        type="button"
                        onClick={() => setQty(it.cartItemId, it.qty + 1)}
                        aria-label="Zvýšit množství"
                      >
                        +
                      </button>
                    </div>


                      <div className="cart-lineTotal">
                        <span>Mezisoučet</span>
                        <strong>{czk.format(it.lineTotalCzk)}</strong>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="cart-summary">
                <div className="cart-summaryRow">
                  <span>Počet kusů</span>
                  <strong>{totalQty}</strong>
                </div>
                <div className="cart-summaryRow">
                  <span>Celkem</span>
                  <strong>{czk.format(totalCzk)}</strong>
                </div>
              </div>
            </>
          )}
        </section>

        {/* PRAVÁ: údaje + instrukce */}
        <section className="cart-card">
          <div className="cart-cardHead">
            <h2>Kontaktní údaje</h2>
          </div>

          <div className="cart-form">
            <div className="cart-formRow2">
              <label className="cart-field">
                <span>Jméno *</span>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoComplete="given-name"
                />
              </label>

              <label className="cart-field">
                <span>Příjmení *</span>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="family-name"
                />
              </label>
            </div>

            <label className="cart-field">
              <span>E-mail *</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                inputMode="email"
              />
              {!emailOk && email.length > 0 && (
                <div className="cart-fieldError">Zkontroluj prosím e-mail (vypadá neúplně).</div>
              )}
            </label>

            <label className="cart-field">
              <span>E-mail znovu *</span>
              <input
                value={email2}
                onChange={(e) => setEmail2(e.target.value)}
                autoComplete="email"
                inputMode="email"
              />
              {email2.length > 0 && !emailsMatch && (
                <div className="cart-fieldError">E-maily se neshodují.</div>
              )}
            </label>

            <div className="cart-delivery">
              <h3>Doručení poukazu</h3>

              <label className="cart-radio">
                <input
                  type="radio"
                  name="delivery"
                  value="email"
                  checked={delivery === "email"}
                  onChange={() => setDelivery("email")}
                />
                <span>Chci zaslat elektronický voucher na e-mail</span>
              </label>

              <label className="cart-radio">
                <input
                  type="radio"
                  name="delivery"
                  value="pickup"
                  checked={delivery === "pickup"}
                  onChange={() => setDelivery("pickup")}
                />
                <span>Poukaz si vyzvednu v Blejskárně</span>
              </label>
            </div>

            {delivery === "pickup" && (
              <div className="cart-note">
                Poukazy není třeba objednávat dopředu, jsou k dostání přímo v Blejskárně - stačí přijít během otevírací doby, případně zavolat.
              </div>
            )}


            <div className="cart-instructions">
              <h3>Jak to probíhá</h3>
              <ol>
                <li>Vybereš poukaz(y), případně navolíš množství a hodnotu, vyplníš kontakt.</li>
                <li>Po odeslání objednávky ti dorazí mail s QR kódem pro zaplacení.</li>
                <li>{" "}{delivery === "email" ? "Jakmile platbu obdržíme, elektronické poukazy ti doručíme na e-mail."
                    : "Po zaplacení se pro poukazy můžeš stavit kdykoliv během otevírací doby, nebo nám crnknni a nějak se domluvíme."}
                </li>

              </ol>
            </div>

            <button type="button" className="cart-submit" disabled={!canSubmit} onClick={submit}>
              Odeslat objednávku
            </button>

            {!canSubmit && (
              <div className="cart-submitHint">
                Doplň prosím povinná pole a překontroluj shodu e-mailů. Košík nesmí být prázdný.
              </div>
            )}

            <div className="cart-back">
              <Link href="/poukazy">← Zpět na poukazy</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
