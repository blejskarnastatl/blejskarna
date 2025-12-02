"use client";

import Image from "next/image";

const navLinks = [
  { href: "/", label: "O nás" },
  { href: "/jak_k_nam", label: "Jak k nám" },
  { href: "/cenik", label: "Ceník" },
  { href: "/poukazy", label: "Dárkové poukazy" },
];

export default function NavBar() {
  return (
    <header className="site-nav-wrapper">
      <div className="site-nav">
        <div className="nav-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Image
            src="/LOGO-blejskarna.svg"
            alt="Blejskárna logo"
            width={200}
            height={200}
          />
        </div>

        <nav className="nav-menu">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav-pill">
              {link.label}
            </a>
          ))}
          {}
          <a
            href="tel:+420 601 006 076"
            className="nav-pill nav-pill--highlight"
          >
            Chytni blejsk 📞 +420 601 006 076
          </a>
        </nav>
      </div>
    </header>
  );
}
