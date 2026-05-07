import type { Metadata } from "next";
import "./globals.css";
import styles from "./layout.module.css";

import NavBar from "./components/NavBar";
import Image from "next/image";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import "react-photo-album/rows.css";
import { CartProvider } from "./components/cart";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blejskárna Štatl - ruční myčka aut Brno",
  description: "Poctivá ruční šichta na tvý káře, žádnej šolich!",
  icons: {
    icon: "/LOGO-blejskarna.ico",
    shortcut: "/LOGO-blejskarna.ico",
    apple: "/LOGO-blejskarna.ico",
  },
  metadataBase: new URL("https://blejskarna.cz"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body className={styles.body}>
        <CartProvider>
          <NavBar />

          <main className={`${styles.container} ${styles.main}`}>
            {children}
          </main>

          <footer className={styles.footer}>
            <div className={`${styles.container} ${styles.footerInner}`}>
              <div className={styles.footerLogo}>
                <Image
                  src="/Logo-blejskarna.png"
                  alt="Blejskárna logo"
                  width={120}
                  height={120}
                />
              </div>

              <div className={styles.footerInfo}>
                <h3>Blejskárna ŠTATL</h3>
                <p>Příkop 4, 602 00 Brno-střed Zábrdovice</p>
                <p>IČO: 02267918 &nbsp; | &nbsp; DIČ: CZ02267918</p>
                <p>
                  <Link href="mailto:blejskarnastatl@gmail.com">
                    ✉️ blejskarnastatl@gmail.com
                  </Link>
                </p>
                <p>
                  <Link href="tel:+420601006076">📞+420 601 006 076</Link>
                </p>
              </div>

              <div className={styles.footerLinks}>
                <h4>Hoď čučku</h4>

                <a
                  href="https://www.facebook.com/blejskarna.statl/"
                  className={styles.footerLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaFacebookF /> Facebook
                </a>

                <a
                  href="https://www.instagram.com/blejskarna_statl"
                  className={styles.footerLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaInstagram /> Instagram
                </a>

                <a
                  href="https://en.firmy.cz/company/13862522-blejskarna-statl-brno-zabrdovice.html"
                  className={styles.footerLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  Firmy.cz
                </a>
              </div>

                            <div className={styles.footerHours}>
                <h4>Otvíračka</h4>

               <p>
                  Po-Pá - 7-17
                </p>

               <p>
                  So - Dle domluvy
                </p>

                <p>
                  Ne - Zavřeno
                </p>
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
