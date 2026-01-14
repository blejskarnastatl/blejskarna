"use client";

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
    [normalizedItems],
  );

  const totalCzk = useMemo(
    () => normalizedItems.reduce((s, x) => s + x.line, 0),
    [normalizedItems],
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
      <div className="page-shell">
        <div className="thanks-wrap">
          <section className="thanks-card">
            <div className="thanks-head">
              <div className="thanks-badge">
                <FaRegCircleCheck />
              </div>
              <div>
                <h1 className="thanks-title">Děkujeme!</h1>
                <p className="thanks-subtitle">
                  Objednávku jsme v tomto zařízení nenašli. Pokud byla v pořádku odeslaná, potvrzení by mělo dorazit na Váš e-mail.
                  Pokud ji nenajdete ani tam, vytvořte ji prosím znovu, nebo nám zavolejte a poukazy Vám doručíme ručně.
                </p>
              </div>
            </div>

            <div className="thanks-actions">
              <Link href="/poukazy" className="thanks-btn thanks-btn--primary">
                 ← Zpět na poukazy
              </Link>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="thanks-wrap">
        <section className="thanks-card">
          {/* HEADER */}
          <div className="thanks-head">
            
            <FaRegCircleCheck className="thanks-badge"/>

            <div className="thanks-headText">
              <h1 className="thanks-title">Děkujeme za objednávku!</h1>

              <div className="thanks-orderLine">
                <span>Objednávka </span>
                <strong>#{order.orderId || "—"}</strong>
              </div>
            </div>
          </div>

          {/* PAYMENT */}
          {qrUrl ? (
            <div className="thanks-section">
              <h2 className="thanks-h2">Platba</h2>

              <div className="thanks-payBox">
                <div className="thanks-qrCol">
                  <img className="thanks-qr" src={qrUrl} alt="QR platba" />
                </div>

                <div className="thanks-payMeta">
                  <div className="thanks-payRow">
                    <span>Částka</span>
                    <strong>{czk.format(totalCzk)}</strong>
                  </div>
                  {account ? (
                    <div className="thanks-payRow">
                      <span>Číslo účtu</span>
                      <strong>{account}</strong>
                    </div>
                  ) : null}
                  {iban ? (
                    <div className="thanks-payRow">
                      <span>IBAN</span>
                      <strong>{iban}</strong>
                    </div>
                  ) : null}
                  {vs ? (
                    <div className="thanks-payRow">
                      <span>Variabilní symbol</span>
                      <strong>{vs}</strong>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}

          {/* ITEMS */}
          <div className="thanks-section">
            <h2 className="thanks-h2">Rekapitulace</h2>

            {/* META */}
            <div className="thanks-meta">
              <div className="thanks-metaRow">
                <span>Jméno</span>
                <strong>{fullName}</strong>
              </div>
              <div className="thanks-metaRow">
                <span>E-mail</span>
                <strong>{email}</strong>
              </div>
              {phone ? (
                <div className="thanks-metaRow">
                  <span>Telefon</span>
                  <strong>{phone}</strong>
                </div>
              ) : null}
              <div className="thanks-metaRow">
                <span>Doručení</span>
                <strong>{deliveryTitle}</strong>
              </div>
            </div>

            <ul className="thanks-items">
              {normalizedItems.map((x, idx) => (
                <li key={idx} className="thanks-itemRow">
                  <div className="thanks-itemLeft">
                    <div className="thanks-itemTitle">{x.title}</div>
                    <div className="thanks-itemSub">
                      {x.qty}× {czk.format(x.unit)}
                    </div>
                  </div>
                  <div className="thanks-itemRight">{czk.format(x.line)}</div>
                </li>
              ))}
            </ul>

            <div className="thanks-totals">
              <div className="thanks-totalRow">
                <span>Počet kusů</span>
                <strong>{totalQty}</strong>
              </div>
              <div className="thanks-totalRow thanks-totalRow--big">
                <span>Celkem</span>
                <strong>{czk.format(totalCzk)}</strong>
              </div>
            </div>
          </div>

          {/* WHAT NEXT */}
          <div className="thanks-section">
            <div className="thanks-next">
              <p>
                <FaCircleInfo className="thanks-infoIcon"/>
                {delivery === "email"
                  ? "Jakmile obdržíme platbu, elektronické poukazy ti přistanou do e-mailu."
                  : "Jakmile obdržíme platbu, poukaz(y) si můžeš vyzvednout v Blejskárně během otevírací doby."}
              </p>

              <p className="thanks-nextMuted">
                Pokud spěcháš, něco se nepovedlo nebo máš jiný dotaz, neváhej se na nás obrátit. 
              </p>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="thanks-actions">
            <Link href="/poukazy" className="thanks-btn thanks-btn--ghost">
              ← Vybrat další poukazy
            </Link>
            <Link href="/" className="thanks-btn thanks-btn--primary">
              Hotovo <FaRegCircleCheck/>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
