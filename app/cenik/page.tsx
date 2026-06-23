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
