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

        {/* Logo vlevo */}
        <div className="nav-logo">
          <Image
            src="/LOGO-blejskarna.svg"
            alt="Blejskárna logo"
            width={200}
            height={200}
          />
        </div>

        {/* Pravá část: telefon + menu */}
        <div className="nav-phone">
          <a
            href="tel:+420601006076"
            className="nav-pill nav-pill--highlight"
          >
            Chytni blejsk 📞 +420 601 006 076
          </a>

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
