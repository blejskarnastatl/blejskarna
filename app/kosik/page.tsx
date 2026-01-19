"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/components/cart";
import { NAPRANI_MAX, NAPRANI_MIN, NAPRANI_STEP, NAPRANI_VOUCHER_ID, voucherById, VoucherId, vouchers} from "@/app/data/vouchers";
import { FaCircleInfo } from "react-icons/fa6";

const czk = new Intl.NumberFormat("cs-CZ", {
  style: "currency",
  currency: "CZK",
  maximumFractionDigits: 0,
});

function normalizeName(s: string) {
  return s.replace(/\s+/g, " ").trim();
}

// Povolit písmena (včetně diakritiky) + oddělovače mezi částmi jména: mezera / pomlčka / apostrof
const NAME_RE = /^\p{L}+(?:[ '\-]\p{L}+)*$/u;

function hasOnlyAllowedNameChars(s: string) {
  const v = normalizeName(s);
  return v.length === 0 ? true : NAME_RE.test(v);
}

// email
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// telefon – dovolíme +420, mezery, pomlčky; finálně musí mít 9–15 číslic
function normalizePhone(s: string) {
  return s.replace(/[^\d+]/g, "").replace(/^00/, "+");
}
function digitsCount(s: string) {
  return (s.match(/\d/g) || []).length;
}
function isValidPhone(s: string) {
  const v = normalizePhone(s);
  const d = digitsCount(v);
  return v.length > 0 && d >= 9 && d <= 15;
}

export default function KosikPage() {
  const { items, setQty, setUnitPrice, removeItem, clear } = useCart();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [delivery, setDelivery] = useState<"email" | "pickup">("email");
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const [phone, setPhone] = useState("");

  // touched / submitAttempted – pro UX
  const [touchedFirstName, setTouchedFirstName] = useState(false);
  const [touchedLastName, setTouchedLastName] = useState(false);
  const [touchedPhone, setTouchedPhone] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedEmail2, setTouchedEmail2] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

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

  // --- validace jmen ---
  const fn = normalizeName(firstName);
  const ln = normalizeName(lastName);

  const firstNameCharsOk = hasOnlyAllowedNameChars(firstName);
  const lastNameCharsOk = hasOnlyAllowedNameChars(lastName);

  const firstNameLenOk = fn.length >= 2;
  const lastNameLenOk = ln.length >= 2;

  const nameOk = firstNameCharsOk && lastNameCharsOk && firstNameLenOk && lastNameLenOk;

  const showFirstNameError =
    (touchedFirstName || submitAttempted) && (!firstNameCharsOk || !firstNameLenOk);
  const showLastNameError =
    (touchedLastName || submitAttempted) && (!lastNameCharsOk || !lastNameLenOk);

  // --- validace emailu ---
  const e1 = email.trim().toLowerCase();
  const e2 = email2.trim().toLowerCase();

  const emailOk = EMAIL_RE.test(e1);
  const emailsMatch = e1.length > 0 && e1 === e2;

  const showEmailError = (touchedEmail || submitAttempted) && (!emailOk || e1.length === 0);
  const showEmail2Error = (touchedEmail2 || submitAttempted) && (!emailsMatch || e2.length === 0);

  // --- validace telefonu ---
  const phoneOk = isValidPhone(phone);
  const showPhoneError = (touchedPhone || submitAttempted) && !phoneOk;

  const canSubmit = !isEmpty && nameOk && phoneOk && emailOk && emailsMatch;

  const submit = async () => {
    setSubmitAttempted(true);
    if (!canSubmit) return;

    const order = {
      createdAt: new Date().toISOString(),
      customer: {
        firstName: normalizeName(firstName),
        lastName: normalizeName(lastName),
        email: email.trim(),
        phone: phone.trim(),
      },
      delivery,
      items: normalized.map((x) => ({
        voucherId: x.voucherId,
        title: x.title,
        qty: x.qty,
        unitPriceCzk: x.unitPriceCzk,
      })),
    };

    try {
      const res = await fetch("https://blejskarna-order.blejskarnastatl.workers.dev/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.ok) {
        alert(`Nepodařilo se odeslat objednávku. Zkus to prosím znovu nebo nám zavolej.\nChyba: ${res.status} ${data?.error || "Neznámá chyba"}`);
        return;
      }

      localStorage.setItem(
        "lastOrder",
        JSON.stringify({
          ...order,
          orderId: data.orderId,
          payment: data.payment,
          totalCzk: data.totalCzk ?? totalCzk,
        })
      );
      clear();
      window.location.href = "/dekujeme";

    } catch {
      alert("Nepodařilo se odeslat objednávku (chyba připojení). Zkus to prosím znovu.");
    }
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

                        {it.isWish && (
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
                                value={it.unitPriceCzk}
                                onChange={(e) => {
                                  const n = Math.floor(Number(e.target.value));
                                  if (!Number.isFinite(n)) return;
                                  const clamped = Math.max(NAPRANI_MIN, Math.min(NAPRANI_MAX, n));
                                  setUnitPrice(it.cartItemId, clamped);
                                }}
                              />
                              <span>Kč</span>
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
                <span>
                  Jméno <span className="required">*</span>
                </span>
                <input
                  className={showFirstNameError ? "input-error" : ""}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  onBlur={() => setTouchedFirstName(true)}
                  autoComplete="given-name"
                />
                {showFirstNameError && (
                  <div className="cart-fieldError">
                    {!firstNameCharsOk && fn.length > 0
                      ? "Jméno obsahuje nepovolené znaky."
                      : fn.length === 0
                      ? "Jméno je povinné."
                      : "Jméno je příliš krátké."}
                  </div>
                )}
              </label>

              <label className="cart-field">
                <span>
                  Příjmení <span className="required">*</span>
                </span>
                <input
                  className={showLastNameError ? "input-error" : ""}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  onBlur={() => setTouchedLastName(true)}
                  autoComplete="family-name"
                />
                {showLastNameError && (
                  <div className="cart-fieldError">
                    {!lastNameCharsOk && ln.length > 0
                      ? "Příjmení obsahuje nepovolené znaky."
                      : ln.length === 0
                      ? "Příjmení je povinné."
                      : "Příjmení je příliš krátké."}
                  </div>
                )}
              </label>
            </div>

            <label className="cart-field">
              <span>
                Telefon <span className="required">*</span>
              </span>
              <input
                className={showPhoneError ? "input-error" : ""}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={() => setTouchedPhone(true)}
                autoComplete="tel"
                inputMode="tel"
                placeholder="+420 601 006 076"
              />
              {showPhoneError && (
                <div className="cart-fieldError">
                  Neplatné telefonní číslo.
                </div>
              )}
            </label>

            <label className="cart-field">
              <span>
                E-mail <span className="required">*</span>
              </span>
              <input
                className={showEmailError ? "input-error" : ""}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouchedEmail(true)}
                autoComplete="email"
                inputMode="email"
              />
              {showEmailError && (
                <div className="cart-fieldError">
                  {e1.length === 0
                    ? "E-mail je povinný."
                    : "Zkontroluj prosím e-mail (vypadá neúplně)."}
                </div>
              )}
            </label>

            <label className="cart-field">
              <span>
                E-mail znovu <span className="required">*</span>
              </span>
              <input
                className={showEmail2Error ? "input-error" : ""}
                value={email2}
                onChange={(e) => setEmail2(e.target.value)}
                onBlur={() => setTouchedEmail2(true)}
                autoComplete="email"
                inputMode="email"
              />
              {showEmail2Error && (
                <div className="cart-fieldError">
                  {e2.length === 0 ? "E-mail je povinný." : "E-maily se neshodují."}
                </div>
              )}
            </label>

            <div className="cart-requiredNote">
              <span className="required">*</span> Označené pole je povinné.
            </div>

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
                <FaCircleInfo/> Poukazy není třeba objednávat dopředu, jsou k dostání přímo v Blejskárně. Stačí přijít během otevírací doby, případně zavolat.
              </div>
            )}

            <div className="cart-instructions">
              <h3>Jak to probíhá</h3>
              <ol>
                <li>Vybereš poukaz(y), případně navolíš množství a hodnotu, vyplníš kontakt.</li>
                <li>Po odeslání objednávky ti dorazí mail s QR kódem pro zaplacení.</li>
                <li>
                  {" "}
                  {delivery === "email"
                    ? "Jakmile platbu obdržíme, elektronické poukazy ti doručíme na e-mail."
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
