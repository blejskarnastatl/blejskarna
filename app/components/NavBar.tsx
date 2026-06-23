"use client";

import styles from "./NavBar.module.css";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./cart";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "O nás" },
  { href: "/jak_k_nam", label: "Jak k nám" },
  { href: "/fotogalerie", label: "Galerie" },
  { href: "/cenik", label: "Ceník" },
];

export default function NavBar() {
  const { totalQty } = useCart();

  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const qty = mounted ? totalQty : 0;

  const [menuOpen, setMenuOpen] = useState(false);

  // zavření menu na Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  // (volitelné) zamknout scroll pozadí při otevřeném menu
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <header className={styles.siteNavWrapper}>
      <div className={styles.siteNav}>
        <div className={styles.navLogo}>
          <Image
            src="/LOGO-blejskarna.svg"
            alt="Blejskárna logo"
            width={200}
            height={200}
            priority
          />
        </div>

        <div className={styles.navPhone}>
          <div className={styles.navTopRow}>
            <a
              href="tel:+420601006076"
              className={`${styles.navPill} ${styles.navPillHighlight}`}
            >
              <span className={styles.phoneText}>Chytni blejsk </span>
              <span className={styles.phoneNumber}>📞+420 601 006 076</span>
            </a>

            <div className={styles.topActions}>
              <button
                type="button"
                className={styles.menuButton}
                aria-label={menuOpen ? "Zavřít menu" : "Otevřít menu"}
                aria-expanded={menuOpen}
                aria-controls="main-menu"
                onClick={() => setMenuOpen((v) => !v)}
              >
                <span className={styles.menuIcon} aria-hidden="true">
                  ☰
                </span>
              </button>
            </div>
          </div>

          {menuOpen && (
            <button
              type="button"
              className={styles.backdrop}
              aria-label="Zavřít menu"
              onClick={() => setMenuOpen(false)}
            />
          )}

          <nav
            id="main-menu"
            className={`${styles.navMenu} ${menuOpen ? styles.navMenuOpen : ""}`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={styles.navPill}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
