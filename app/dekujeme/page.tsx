"use client";

import styles from "./page.module.css";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FaCircleInfo, FaRegCircleCheck } from "react-icons/fa6";

type LastOrder = {
  createdAt?: string;
  orderId?: string;
  customer?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  };
  delivery?: "email" | "pickup";
  items?: Array<{
    voucherId?: string;
    title?: string;
    qty?: number;
    unitPriceCzk?: number;
  }>;
  payment?: {
    qrUrl?: string;
    account?: string; // např. "2600809857/2010"
    iban?: string;
    bic?: string;
    vs?: string;
    msg?: string;
  };
};

const czk = new Intl.NumberFormat("cs-CZ", {
  style: "currency",
  currency: "CZK",
  maximumFractionDigits: 0,
});

export default function DekujemePage() {
  const [order, setOrder] = useState<LastOrder | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("lastOrder");
      if (!raw) return;
      const parsed = JSON.parse(raw);
      setOrder(parsed);
    } catch {
      setOrder(null);
    }
  }, []);

  const normalizedItems = useMemo(() => {
    const items = Array.isArray(order?.items) ? order!.items! : [];
    return items.map((it) => {
      const qty = Math.max(1, Math.floor(Number(it.qty) || 1));
      const unit = Math.max(0, Math.floor(Number(it.unitPriceCzk) || 0));
      const title = String(it.title || it.voucherId || "Poukaz");
      const line = qty * unit;
      return { title, qty, unit, line };
    });
  }, [order]);

  const totalQty = useMemo(
    () => normalizedItems.reduce((s, x) => s + x.qty, 0),
    [normalizedItems]
  );

  const totalCzk = useMemo(
    () => normalizedItems.reduce((s, x) => s + x.line, 0),
    [normalizedItems]
  );

  const fullName =
    [order?.customer?.firstName, order?.customer?.lastName].filter(Boolean).join(" ") || "—";

  const email = order?.customer?.email || "—";
  const phone = order?.customer?.phone || "";

  const delivery = order?.delivery === "pickup" ? "pickup" : "email";
  const deliveryTitle =
    delivery === "email" ? "Elektronicky na e-mail" : "Vyzvednutí v Blejskárně";

  const payment = order?.payment;
  const qrUrl = payment?.qrUrl;
  const vs = payment?.vs || order?.orderId || "";
  const account = payment?.account || "";
  const iban = payment?.iban || "";

  if (!order) {
    return (
      <div className={styles.wrap}>
        <section className={styles.card}>
          <div className={styles.head}>
            <FaRegCircleCheck className={styles.badge} />
            <div className={styles.headText}>
              <h1 className={styles.title}>Děkujeme!</h1>
              <p className={styles.subtitle}>
                Objednávku jsme v tomto zařízení nenašli. Pokud byla v pořádku odeslaná,
                potvrzení by mělo dorazit na Váš e-mail. Pokud ji nenajdete ani tam,
                vytvořte ji prosím znovu, nebo nám zavolejte a poukazy Vám doručíme ručně.
              </p>
            </div>
          </div>

          <div className={styles.actions}>
            <Link href="/poukazy" className={`${styles.btn} ${styles.btnPrimary}`}>
              ← Zpět na poukazy
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <section className={styles.card}>
        {/* HEADER */}
        <div className={styles.head}>
          <FaRegCircleCheck className={styles.badge} />

          <div className={styles.headText}>
            <h1 className={styles.title}>Děkujeme za objednávku!</h1>

            <div className={styles.orderLine}>
              <span>Objednávka </span>
              <strong>#{order.orderId || "—"}</strong>
            </div>
          </div>
        </div>

        {/* PAYMENT */}
        {qrUrl ? (
          <div className={styles.section}>
            <h2 className={styles.h2}>Platba</h2>

            <div className={styles.payBox}>
              <div className={styles.qrCol}>
                <img className={styles.qr} src={qrUrl} alt="QR platba" />
              </div>

              <div className={styles.payMeta}>
                <div className={styles.payRow}>
                  <span>Částka</span>
                  <strong>{czk.format(totalCzk)}</strong>
                </div>

                {account ? (
                  <div className={styles.payRow}>
                    <span>Číslo účtu</span>
                    <strong>{account}</strong>
                  </div>
                ) : null}

                {iban ? (
                  <div className={styles.payRow}>
                    <span>IBAN</span>
                    <strong>{iban}</strong>
                  </div>
                ) : null}

                {vs ? (
                  <div className={styles.payRow}>
                    <span>Variabilní symbol</span>
                    <strong>{vs}</strong>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}

        {/* ITEMS */}
        <div className={styles.section}>
          <h2 className={styles.h2}>Rekapitulace</h2>

          {/* META */}
          <div className={styles.meta}>
            <div className={styles.metaRow}>
              <span>Jméno</span>
              <strong>{fullName}</strong>
            </div>
            <div className={styles.metaRow}>
              <span>E-mail</span>
              <strong>{email}</strong>
            </div>
            {phone ? (
              <div className={styles.metaRow}>
                <span>Telefon</span>
                <strong>{phone}</strong>
              </div>
            ) : null}
            <div className={styles.metaRow}>
              <span>Doručení</span>
              <strong>{deliveryTitle}</strong>
            </div>
          </div>

          <ul className={styles.items}>
            {normalizedItems.map((x, idx) => (
              <li key={idx} className={styles.itemRow}>
                <div className={styles.itemLeft}>
                  <div className={styles.itemTitle}>{x.title}</div>
                  <div className={styles.itemSub}>
                    {x.qty}× {czk.format(x.unit)}
                  </div>
                </div>
                <div className={styles.itemRight}>{czk.format(x.line)}</div>
              </li>
            ))}
          </ul>

          <div className={styles.totals}>
            <div className={styles.totalRow}>
              <span>Počet kusů</span>
              <strong>{totalQty}</strong>
            </div>
            <div className={`${styles.totalRow} ${styles.totalRowBig}`}>
              <span>Celkem</span>
              <strong>{czk.format(totalCzk)}</strong>
            </div>
          </div>
        </div>

        {/* WHAT NEXT */}
        <div className={styles.section}>
          <div className={styles.next}>
            <p className={styles.nextLine}>
              <FaCircleInfo className={styles.infoIcon} />
              {delivery === "email"
                ? "Jakmile obdržíme platbu, elektronické poukazy ti přistanou do e-mailu."
                : "Jakmile obdržíme platbu, poukaz(y) si můžeš vyzvednout v Blejskárně během otevírací doby."}
            </p>

            <p className={styles.nextMuted}>
              Pokud spěcháš, něco se nepovedlo nebo máš jiný dotaz, neváhej se na nás obrátit.
            </p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className={styles.actions}>
          <Link href="/poukazy" className={`${styles.btn} ${styles.btnGhost}`}>
            ← Vybrat další poukazy
          </Link>
          <Link href="/" className={`${styles.btn} ${styles.btnPrimary}`}>
            Hotovo <FaRegCircleCheck className={styles.btnIcon} />
          </Link>
        </div>
      </section>
    </div>
  );
}
