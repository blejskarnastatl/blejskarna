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
          {/* vložené SVG zabere místo karet a bude spanovat celý grid */}
          <div className={styles.cenikInner}>
            <img
              src="/blejskarna-cedule-komplet.svg"
              alt="Ceník Blejškárna"
              loading="lazy"
            />
          </div>
        </section>

        {/* NA PŘÁNÍ */}
        <section className={styles.customBox}>
          <h2 className={styles.title}>
            Blejsk <span className={styles.highlight}>NA&nbsp;PŘÁNÍ</span>
          </h2>

          <p>
            Chceš vosk, ozon, keramiku nebo odstranit folie?<br />
            Rozleštit lucerny nebo celou kastlu?
          </p>

          <p className={styles.customHighlight}>
            Řekni a nahodíme blejsk podle tebe.
          </p>
        </section>
      </div>
    </main>
  );
}
