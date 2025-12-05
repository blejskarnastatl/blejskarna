import Image from "next/image";

export default function HomePage() {
  return (
    <div className="page-shell">
      <section className="hero">
        <div className="hero-inner">
          {/* hlavní ilustrace vlevo / nahoře */}
          <Image
            src="/BLEJSKARNA uvod.svg"       // přejmenuj podle sebe
            alt="Blejskárna Štatl ilustrace"
            width={900}
            height={800}
            className="section-image"
          />

          {/* auto vpravo dole */}
          <div className="hero-car-wrapper">
            <Image
              src="/ilustration.svg"     // přejmenuj podle sebe
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