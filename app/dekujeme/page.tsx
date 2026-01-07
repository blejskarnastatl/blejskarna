"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DekujemePage() {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const raw = localStorage.getItem("lastOrder");
    if (raw) setOrder(JSON.parse(raw));
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "1rem" }}>
      <h1>Děkujeme!</h1>
      <p>Objednávka byla uložena (test workflow).</p>

      {order ? (
        <div
          style={{
            background: "rgba(255,255,255,0.92)",
            borderRadius: 16,
            padding: 16,
            marginTop: 12,
          }}
        >
          <div>
            <strong>Jméno:</strong> {order.customer.firstName} {order.customer.lastName}
          </div>
          <div>
            <strong>E-mail:</strong> {order.customer.email}
          </div>

          <div style={{ marginTop: 10 }}>
            <strong>Položky:</strong>
          </div>
          <ul>
            {order.items.map((it: any, idx: number) => (
              <li key={idx}>
                {it.title} — {it.qty}× {it.unitPriceCzk} Kč = <strong>{it.lineTotalCzk} Kč</strong>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: 10 }}>
            <strong>Celkem:</strong> {order.totalCzk} Kč
          </div>
        </div>
      ) : (
        <p style={{ opacity: 0.8 }}>Žádná uložená objednávka.</p>
      )}

      <div style={{ marginTop: 16 }}>
        <Link href="/poukazy">← Zpět na poukazy</Link>
      </div>
    </div>
  );
}
