import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Ceník",
  alternates: {
    canonical: "/cenik",
  },
};

export default function CenikPage() {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <div className={styles.disclaimer}>
          <p>
            <strong>ℹ️ Nový ceník</strong> – Od 1. července 2026 platí nový ceník s vylepšenými službami.
          </p>
        </div>
        <section className={styles.grid}>
          {/* Vložené SVG zabere celý obsah stránky (místo karet i sekce "NA PŘÁNÍ") */}
          <div className={styles.cenikInner}>
            <img
              src="/blejskarna-cedule-komplet.svg"
              alt="Ceník Blejškárna"
              loading="lazy"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
