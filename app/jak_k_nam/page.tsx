import Image from "next/image";

export default function JakKNamPage() {
  return (
    <div className="page-shell">
      <Image
        src="/jak-k-nam.svg"       // cesta do public/
        alt="Mapa jak k nám"
        width={1100}              // sem dej zhruba šířku
        height={500}              // a výšku (poměr zachová)
        className="section-image"
      />
    </div>
  );
}
