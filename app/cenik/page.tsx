import Image from "next/image";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ceník",
  alternates: {
    canonical: "/cenik",
  },
};

export default function CenikPage() {
  return (
      <div className="page-shell">
        <Image
          src="/cenik.svg"       // cesta do public/
          alt="Mapa jak k nám"
          width={1000}              // sem dej zhruba šířku
          height={800}              // a výšku (poměr zachová)
          className="section-image"
        />
      </div>
    );
}