import LightboxImage from "../components/LightboxImage";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Jak k nám",
  description: "Dárkové poukazy do Blejskárny - udělejte radost čistým autem.",
  alternates: {
    canonical: "/jak-k-nam",
  },
};

export default function JakKNamPage() {
  return (
    <main className={styles.page}>
      <section className={styles.howto}>
        {/* LEVÝ SLOUPEC */}
        <div className={styles.howtoLeft}>
          <h1 className={styles.howtoTitle}>
            <span className={styles.howtoTitleScribble}>Jak do Blejskárny?</span>
          </h1>

          <ol className={styles.howtoSteps}>
            <li>
              Chytni si čas blejsku na{" "}
              <a className="highlight" href="tel:+420601006076">
                +420&nbsp;601&nbsp;006&nbsp;076
              </a>
              .
            </li>
            <li>Nebo rovnou jeď směr IBC na Příkop 4.</li>
            <li>
              Pokračuj do <span className="highlight">podzemního parkingu</span>{" "}
              za závorou.
            </li>
            <li>
              Řekni, jakej blejsk pak chceš, nebo se domluvíme na specialitce.
            </li>
            <li>My ti řeknem, kdy si káru vyzvednout.</li>
            <li>Hoď nám klíče a běž na kafe nebo kam chceš.</li>
            <li>Vrať se pro nablejskaný fáro.</li>
            <li>
              A až ti bude chybět blejsk,{" "}
              <span className={styles.howtoUnderline}>přijeď zas.</span>
            </li>
          </ol>
        </div>

        {/* PRAVÝ SLOUPEC */}
        <div className={styles.howtoRight}>
          <div className={styles.howtoMapCard}>
            {/* FOTO */}
            <div className={styles.howtoPhoto}>
              <LightboxImage
                src="/jak_do_blejskarny.png"
                alt="Blejskárna Štatl - podzemní garáže IBC"
                width={1200}
                height={800}
                className={styles.howtoPhotoImage}
              />
            </div>

            {/* MAPA */}
            <div className={styles.howtoMapFrame}>
              <iframe
                title="Mapa Blejskárna Štatl"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2607.017495267141!2d16.611466977250085!3d49.20022767138059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47129517b5809c71%3A0xe2d9a5956b919a5!2zQmxlanNrw6FybmEgxaB0YXRs!5e0!3m2!1scs!2scz!4v1765974432089!5m2!1scs!2scz"
              />
            </div>

            {/* META */}
            <div className={styles.howtoMapMeta}>
              <div className={styles.howtoMapLine}>
                <strong>Podzemní garáže IBC Brno</strong>
              </div>
              <div className={styles.howtoMapLine}>Příkop 4, 602 00 Brno</div>

              <a className={styles.howtoCallPill} href="tel:+420601006076">
                Chytni blejsk na 📞+420 601 006 076
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
