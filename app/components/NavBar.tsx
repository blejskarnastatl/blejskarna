"use client";

import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "./cart";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "O nás" },
  { href: "/jak_k_nam", label: "Jak k nám" },
  { href: "/fotogalerie", label: "Galerie" },
  { href: "/cenik", label: "Ceník" },
  { href: "/poukazy", label: "Dárkové poukazy" },
];

export default function NavBar() {
  const { totalQty } = useCart();

  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const qty = mounted ? totalQty : 0;

  return (
    <header className="site-nav-wrapper">
      <div className="site-nav">
        <div className="nav-logo">
          <Image
            src="/LOGO-blejskarna.svg"
            alt="Blejskárna logo"
            width={200}
            height={200}
          />
        </div>

        <div className="nav-phone">
          <div className="nav-topRow">
            <a href="tel:+420601006076" className="nav-pill nav-pill--highlight">
              Chytni blejsk 📞+420 601 006 076
            </a>

            <Link href="/kosik" className="cart-pill" aria-label="Košík">
              <FaShoppingCart />
              <span
                className="cart-badge"
                style={{ display: qty > 0 ? "inline-flex" : "none" }}
                suppressHydrationWarning
              >
                {qty}
              </span>
            </Link>
          </div>

          <nav className="nav-menu">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-pill">
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
