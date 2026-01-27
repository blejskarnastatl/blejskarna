import Image from "next/image";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Blejskárna Štatl - ruční myčka aut Brno",
  description: "Poctivá ruční šichta na tvý káře, žádnej šolich!",
  alternates: { canonical: "" },
};

export default function HomePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <Image
            src="/BLEJSKARNA uvod.svg"
            alt="Blejskárna Štatl ilustrace"
            width={900}
            height={800}
            className={styles.heroMainImage}
            priority
          />

          <div className={styles.heroCarWrapper}>
            <Image
              src="/ilustration.svg"
              alt="Blejskárna auto"
              width={600}
              height={400}
              className={styles.heroCarImage}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
