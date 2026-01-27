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
          {/* GRUNT */}
          <div className={styles.card}>
            <h2 className={styles.title}>
              Blejsk <span className={styles.highlight}>GRUNT</span>
            </h2>

            <ul className={styles.list}>
              <li><strong>nablejskanej vnějšek</strong> (kastla, skla, disky, gumy)</li>
              <li><strong>vycucnutej vnitřek</strong></li>
              <li><strong>setřenej rám futer</strong></li>
              <li><strong>nablejskaný plasty</strong></li>
              <li><strong>voňavej vnitřek</strong></li>
            </ul>

            <div className={styles.price}>1&nbsp;500&nbsp;Kč</div>
          </div>

          {/* FEST */}
          <div className={styles.card}>
            <h2 className={styles.title}>
              Blejsk <span className={styles.highlight}>FEST</span>
            </h2>

            <ul className={styles.list}>
              <li><strong>nablejskanej vnějšek</strong> (kastla, skla, disky, gumy)</li>
              <li><strong>vycucnutej vnitřek</strong></li>
              <li><strong>setřenej rám futer</strong></li>
              <li><strong>nablejskaný plasty</strong></li>
              <li><strong>voňavej vnitřek</strong></li>
              <li><strong>vytepovaný tepichy</strong></li>
            </ul>

            <div className={styles.price}>2&nbsp;000&nbsp;Kč</div>
          </div>

          {/* DO MRTĚ */}
          <div className={styles.card}>
            <h2 className={styles.title}>
              Blejsk <span className={styles.highlight}>DO&nbsp;MRTĚ</span>
            </h2>

            <ul className={styles.list}>
              <li><strong>nablejskanej vnějšek</strong> (kastla, skla, disky, gumy)</li>
              <li><strong>vycucnutej vnitřek</strong></li>
              <li><strong>nablejskanej rám futer</strong></li>
              <li><strong>do hloubky čistý plasty</strong></li>
              <li><strong>voňavej vnitřek</strong></li>
              <li><strong>vytepovaný tepichy</strong></li>
              <li><strong>vytepovaný sedla</strong> (nebo vyčištěná koža)</li>
            </ul>

            <div className={styles.price}>3&nbsp;500&nbsp;Kč</div>
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
