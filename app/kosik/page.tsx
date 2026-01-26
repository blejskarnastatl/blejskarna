"use client";

import styles from "./page.module.css";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/components/cart";
import {
  NAPRANI_MAX,
  NAPRANI_MIN,
  NAPRANI_STEP,
  NAPRANI_VOUCHER_ID,
  voucherById,
} from "@/app/data/vouchers";
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

const DIGITS_RE = /^\d*$/;

function clampWish(n: number) {
  if (!Number.isFinite(n)) return Math.max(NAPRANI_MIN, Math.min(NAPRANI_MAX, NAPRANI_MIN));
  const floored = Math.floor(n);
  return Math.max(NAPRANI_MIN, Math.min(NAPRANI_MAX, floored));
}

export default function KosikPage() {
  const { items, setQty, setUnitPrice, removeItem, clear } = useCart();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [delivery, setDelivery] = useState<"email" | "pickup">("email");
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const [phone, setPhone] = useState("");

  // Souhlas s OP
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [touchedTerms, setTouchedTerms] = useState(false);

  // hodnota „na přání“: draft per položka (commit na blur/enter)
  const [wishDraft, setWishDraft] = useState<Record<string, string>>({});

  // touched / submitAttempted – pro UX
  const [touchedFirstName, setTouchedFirstName] = useState(false);
  const [touchedLastName, setTouchedLastName] = useState(false);
  const [touchedPhone, setTouchedPhone] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedEmail2, setTouchedEmail2] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // init + cleanup draftů pro "na přání"
  useEffect(() => {
    setWishDraft((prev) => {
      const next = { ...prev };

      for (const it of items) {
        if (it.voucherId !== NAPRANI_VOUCHER_ID) continue;
        if (next[it.cartItemId] == null) {
          const initial = Number.isFinite(it.unitPriceCzk)
            ? Math.floor(it.unitPriceCzk as number)
            : NAPRANI_MIN;
          next[it.cartItemId] = String(Math.max(0, initial));
        }
      }

      // odstraň drafty pro smazané položky
      for (const id of Object.keys(next)) {
        if (!items.some((x) => x.cartItemId === id && x.voucherId === NAPRANI_VOUCHER_ID)) {
          delete next[id];
        }
      }

      return next;
    });
  }, [items]);

  const commitWishForItem = (cartItemId: string) => {
    const raw = (wishDraft[cartItemId] ?? "").trim();

    if (raw === "") {
      const v = clampWish(NAPRANI_MIN);
      setWishDraft((p) => ({ ...p, [cartItemId]: String(v) }));
      setUnitPrice(cartItemId, v);
      return v;
    }

    const n = Number(raw);
    const clamped = clampWish(n);

    setWishDraft((p) => ({ ...p, [cartItemId]: String(clamped) }));
    setUnitPrice(cartItemId, clamped);

    return clamped;
  };

  const normalized = useMemo(() => {
    return items.map((it) => {
      const voucher = voucherById[it.voucherId];
      const isWish = it.voucherId === NAPRANI_VOUCHER_ID;

      const unitPrice = isWish
        ? Math.max(NAPRANI_MIN, Math.min(NAPRANI_MAX, Math.floor(it.unitPriceCzk || NAPRANI_MIN)))
        : Math.max(0, Math.floor(it.unitPriceCzk || 0));

      const qty = Math.max(1, Math.floor(it.qty || 1));

      return {
        cartItemId: it.cartItemId,
        voucherId: it.voucherId,
        title: voucher?.title ?? "Poukaz",
        src: voucher?.src ?? "",
        alt: voucher?.alt ?? "Poukaz",
        isWish,
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

  const termsOk = agreeTerms;
  const showTermsError = (touchedTerms || submitAttempted) && !termsOk;

  const canSubmit = !isEmpty && nameOk && phoneOk && emailOk && emailsMatch && termsOk;

  const submit = async () => {
    setSubmitAttempted(true);
    setTouchedTerms(true);

    if (!canSubmit) return;

    // před odesláním commitni všechny wish položky, ať je v košíku jistota clampu
    for (const it of normalized) {
      if (it.isWish) commitWishForItem(it.cartItemId);
    }

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
        alert(
          `Nepodařilo se odeslat objednávku. Zkus to prosím znovu nebo nám zavolej.\nChyba: ${res.status} ${
            data?.error || "Neznámá chyba"
          }`
        );
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

  // UX: po submitAttempted scroll na první chybu (mobil friendly)
  useEffect(() => {
    if (!submitAttempted) return;
    if (canSubmit) return;

    const el =
      document.querySelector(`.${styles.inputError}`) ||
      document.querySelector(`[data-error="true"]`) ||
      document.querySelector(`[data-terms-error="true"]`);
    if (el instanceof HTMLElement) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [submitAttempted, canSubmit]);

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <h1 className={styles.title}>Košík</h1>
      </header>

      <div className={styles.grid}>
        {/* LEVÁ: obsah košíku */}
        <section className={styles.card}>
          <div className={styles.cardHead}>
            <h2 className={styles.cardTitle}>Obsah košíku</h2>
            {!isEmpty && (
              <button type="button" className={styles.linkBtn} onClick={clear}>
                Vyprázdnit
              </button>
            )}
          </div>

          {isEmpty ? (
            <div className={styles.empty}>
              <p>Košík je prázdný.</p>
              <Link href="/poukazy" className={styles.primaryLink}>
                Přejít na poukazy →
              </Link>
            </div>
          ) : (
            <>
              <ul className={styles.list}>
                {normalized.map((it) => (
                  <li key={it.cartItemId} className={styles.row}>
                    <div className={styles.itemLeft}>
                      {it.src ? (
                        <Image
                          src={it.src}
                          alt={it.alt}
                          width={76}
                          height={76}
                          className={styles.thumb}
                        />
                      ) : (
                        <div className={`${styles.thumb} ${styles.thumbPlaceholder}`} />
                      )}

                      <div className={styles.itemMeta}>
                        <div className={styles.itemTitle} title={it.title}>
                          {it.title}
                        </div>

                        {it.isWish && (
                          <div className={styles.wishPrice}>
                            <label className={styles.fieldInline}>
                              <span className={styles.inlineLabel}>Hodnota:</span>

                              <input
                                className={styles.priceInput}
                                type="number"
                                inputMode="numeric"
                                step={NAPRANI_STEP}
                                pattern="[0-9]*"
                                value={wishDraft[it.cartItemId] ?? String(it.unitPriceCzk ?? NAPRANI_MIN)}
                                onChange={(e) => {
                                  const v = e.target.value;
                                  if (!DIGITS_RE.test(v)) return; // jen čísla / prázdné
                                  setWishDraft((p) => ({ ...p, [it.cartItemId]: v }));
                                }}
                                onBlur={() => {
                                  commitWishForItem(it.cartItemId);
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    commitWishForItem(it.cartItemId);
                                    (e.currentTarget as HTMLInputElement).blur();
                                  }
                                }}
                                aria-label="Hodnota poukazu na přání"
                              />

                              <span className={styles.inlineLabel}>Kč</span>
                            </label>
                          </div>
                        )}

                        <button
                          type="button"
                          className={styles.removeBtn}
                          onClick={() => removeItem(it.cartItemId)}
                        >
                          Odebrat
                        </button>
                      </div>
                    </div>

                    <div className={styles.right}>
                      <div className={styles.qtyCtl}>
                        <button
                          type="button"
                          onClick={() => setQty(it.cartItemId, Math.max(1, it.qty - 1))}
                          aria-label="Snížit množství"
                        >
                          –
                        </button>

                        <input
                          className={styles.qtyInput}
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

                      <div className={styles.lineTotal}>
                        <span>Mezisoučet</span>
                        <strong>{czk.format(it.lineTotalCzk)}</strong>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className={styles.summary}>
                <div className={styles.summaryRow}>
                  <span>Počet kusů</span>
                  <strong>{totalQty}</strong>
                </div>
                <div className={styles.summaryRow}>
                  <span>Celkem</span>
                  <strong>{czk.format(totalCzk)}</strong>
                </div>
              </div>
            </>
          )}
        </section>

        {/* PRAVÁ: údaje + instrukce */}
        <section className={styles.card}>
          <div className={styles.cardHead}>
            <h2 className={styles.cardTitle}>Kontaktní údaje</h2>
          </div>

          <div className={styles.form}>
            <div className={styles.formRow2}>
              <label className={styles.field}>
                <span className={styles.labelRow}>
                  Jméno <span className={styles.required}>*</span>
                </span>
                <input
                  className={showFirstNameError ? styles.inputError : ""}
                  data-error={showFirstNameError ? "true" : undefined}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  onBlur={() => setTouchedFirstName(true)}
                  autoComplete="given-name"
                />
                {showFirstNameError && (
                  <div className={styles.fieldError}>
                    {!firstNameCharsOk && fn.length > 0
                      ? "Jméno obsahuje nepovolené znaky."
                      : fn.length === 0
                      ? "Jméno je povinné."
                      : "Jméno je příliš krátké."}
                  </div>
                )}
              </label>

              <label className={styles.field}>
                <span className={styles.labelRow}>
                  Příjmení <span className={styles.required}>*</span>
                </span>
                <input
                  className={showLastNameError ? styles.inputError : ""}
                  data-error={showLastNameError ? "true" : undefined}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  onBlur={() => setTouchedLastName(true)}
                  autoComplete="family-name"
                />
                {showLastNameError && (
                  <div className={styles.fieldError}>
                    {!lastNameCharsOk && ln.length > 0
                      ? "Příjmení obsahuje nepovolené znaky."
                      : ln.length === 0
                      ? "Příjmení je povinné."
                      : "Příjmení je příliš krátké."}
                  </div>
                )}
              </label>
            </div>

            <label className={styles.field}>
              <span className={styles.labelRow}>
                Telefon <span className={styles.required}>*</span>
              </span>
              <input
                className={showPhoneError ? styles.inputError : ""}
                data-error={showPhoneError ? "true" : undefined}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={() => setTouchedPhone(true)}
                autoComplete="tel"
                inputMode="tel"
                placeholder="+420 601 006 076"
              />
              {showPhoneError && <div className={styles.fieldError}>Neplatné telefonní číslo.</div>}
            </label>

            <label className={styles.field}>
              <span className={styles.labelRow}>
                E-mail <span className={styles.required}>*</span>
              </span>
              <input
                className={showEmailError ? styles.inputError : ""}
                data-error={showEmailError ? "true" : undefined}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouchedEmail(true)}
                autoComplete="email"
                inputMode="email"
              />
              {showEmailError && (
                <div className={styles.fieldError}>
                  {e1.length === 0 ? "E-mail je povinný." : "Zkontroluj prosím e-mail (vypadá neúplně)."}
                </div>
              )}
            </label>

            <label className={styles.field}>
              <span className={styles.labelRow}>
                E-mail znovu <span className={styles.required}>*</span>
              </span>
              <input
                className={showEmail2Error ? styles.inputError : ""}
                data-error={showEmail2Error ? "true" : undefined}
                value={email2}
                onChange={(e) => setEmail2(e.target.value)}
                onBlur={() => setTouchedEmail2(true)}
                autoComplete="email"
                inputMode="email"
              />
              {showEmail2Error && (
                <div className={styles.fieldError}>
                  {e2.length === 0 ? "E-mail je povinný." : "E-maily se neshodují."}
                </div>
              )}
            </label>

            <div className={styles.requiredNote}>
              <span className={styles.required}>*</span> Označené pole je povinné.
            </div>

            <div className={styles.delivery}>
              <h3 className={styles.sectionTitle}>Doručení poukazu</h3>

              <label className={styles.radio}>
                <input
                  type="radio"
                  name="delivery"
                  value="email"
                  checked={delivery === "email"}
                  onChange={() => setDelivery("email")}
                />
                <span>Chci zaslat elektronický voucher na e-mail</span>
              </label>

              <label className={styles.radio}>
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
              <div className={styles.note}>
                <FaCircleInfo className={styles.noteIcon} />
                <span>
                  Poukazy není třeba objednávat dopředu, jsou k dostání přímo v Blejskárně. Stačí přijít během
                  otevírací doby, případně zavolat.
                </span>
              </div>
            )}

            <div className={styles.instructions}>
              <h3 className={styles.sectionTitle}>Jak to probíhá</h3>
              <ol className={styles.instructionsList}>
                <li>Vybereš poukaz(y), případně navolíš množství a hodnotu, vyplníš kontakt.</li>
                <li>Po odeslání objednávky ti dorazí mail s QR kódem pro zaplacení.</li>
                <li>
                  {delivery === "email"
                    ? "Jakmile platbu obdržíme, elektronické poukazy ti doručíme na e-mail."
                    : "Po zaplacení se pro poukazy můžeš stavit kdykoliv během otevírací doby, nebo nám crnkni a nějak se domluvíme."}
                </li>
              </ol>
            </div>

            <div
              className={styles.termsRow}
              data-terms-error={showTermsError ? "true" : undefined}
            >
              <label className={styles.termsLabel}>
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  onBlur={() => setTouchedTerms(true)}
                />
                <span>
                  Souhlasím s{" "}
                  <a
                    href="/obchodni-podminky"
                    className={styles.termsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    obchodními podmínkami
                  </a>
                  .
                </span>
              </label>

              {showTermsError && (
                <div className={styles.fieldError}>
                  Pro pokračování je potřeba odsouhlasit obchodní podmínky.
                </div>
              )}
            </div>

            <button type="button" className={styles.submit} disabled={!canSubmit} onClick={submit}>
              Odeslat objednávku
            </button>

            {!canSubmit && (
              <div className={styles.submitHint}>
                Doplň prosím povinná pole, překontroluj shodu e-mailů a odsouhlas podmínky. Košík nesmí být prázdný.
              </div>
            )}

            <div className={styles.back}>
              <Link href="/poukazy">← Zpět na poukazy</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}