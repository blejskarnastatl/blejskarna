
import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/NavBar";
import Image from "next/image";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import "react-photo-album/rows.css";
import { CartProvider } from "./components/cart";

export const metadata: Metadata = {
  title: "Blejskárna Štatl - ruční myčka aut Brno",
  description: "Poctivá ruční šichta na tvý káře, žádnej šolich!",
  icons: {
    icon: '/LOGO-blejskarna.ico',
    shortcut: '/LOGO-blejskarna.ico',
    apple: '/LOGO-blejskarna.ico',
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
      <body className="page-bg min-h-screen flex flex-col">
        <CartProvider>
          <NavBar />

          <main className="page-shell flex-grow">
            {children}
          </main>

          <footer className="footer">
            <div className="footer-inner">

              {/* Logo vlevo */}
              <div className="footer-logo">
                <Image
                  src="/Logo-blejskarna.png"
                  alt="Blejskárna logo"
                  width={120}
                  height={120}
                />
              </div>

              {/* Střed - informace */}
              <div className="footer-info">
                <h3>Blejskárna ŠTATL</h3>
                <p>Příkop 4, 602 00 Brno-střed Zábrdovice</p>
                <p>IČO: 02267918 &nbsp; | &nbsp; DIČ: CZ02267918</p>
                <p>
                  <a href="mailto:blejskarnastatl@gmail.com">✉️ blejskarnastatl@gmail.com</a>
                </p>
                <p>
                  <a href="tel:+420601006076">📞+420 601 006 076</a>
                </p>
              </div>

              {/* Pravý sloupek */}
              <div className="footer-links">
                <h4>Hoď čučku</h4>

                <a
                  href="https://www.facebook.com/blejskarna.statl/"
                  className="footer-link"
                  target="_blank"
                >
                  <FaFacebookF /> Facebook
                </a>

                <a
                  href="https://www.instagram.com/blejskarna_statl"
                  className="footer-link"
                  target="_blank"
                >
                  <FaInstagram /> Instagram
                </a>

                <a
                  href="https://en.firmy.cz/company/13862522-blejskarna-statl-brno-zabrdovice.html"
                  className="footer-link"
                  target="_blank"
                >
                  Firmy.cz
                </a>
              </div>

            </div>
          </footer>
        </CartProvider>
      </body>

    </html>
  );
}