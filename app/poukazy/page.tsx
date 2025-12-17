import VoucherCarousel from "../components/VoucherCarousel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dárkové poukazy",
  description: "Dárkové poukazy do Blejskárny - udělejte radost čistým autem.",
  alternates: {
    canonical: "/poukazy",
  },
};

export default function PoukazyPage() {
  return (
    <div className="page-shell">
      <VoucherCarousel />
    </div>
  );
}
