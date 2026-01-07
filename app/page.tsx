import Image from "next/image";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blejskárna Štatl - ruční myčka aut Brno",
  description: "Poctivá ruční šichta na tvý káře, žádnej šolich!",
  alternates: {
    canonical: "",
  },
};

export default function HomePage() {
  return (
    <div className="page-shell">
      <section className="hero">
        <div className="hero-inner">
          {/* hlavní ilustrace vlevo / nahoře */}
          <Image
            src="/BLEJSKARNA uvod.svg"       
            alt="Blejskárna Štatl ilustrace"
            width={900}
            height={800}
            className="section-image"
          />

          {/* auto vpravo dole */}
          <div className="hero-car-wrapper">
            <Image
              src="/ilustration.svg"    
              alt="Blejskárna auto"
              width={600}
              height={400}
              className="hero-car-image"
            />
          </div>
        </div>
      </section>
    </div>
  );
}