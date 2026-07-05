import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { PetSafePlantsCatalog } from "@/components/calculators/PetSafePlantsCatalog";
import { PET_PLANTS_FAQ } from "@/lib/constants/pet-plants";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import { calculatorMetadata } from "@/lib/seo";

const calc = getCalculatorBySlug("rosliny-bezpieczne-dla-zwierzat")!;

export const metadata: Metadata = calculatorMetadata(calc);

export default function Page() {
  return (
    <CalculatorLayout
      calc={calc}
      faqs={PET_PLANTS_FAQ}
      seoContent={
        <>
          <h2>Bezpieczny ogród dla psa, kota i dziecka</h2>
          <p>
            Wiele popularnych roślin ogrodowych może być toksyczna po zjedzeniu liści lub
            jagód. Filtruj listę według poziomu zagrożenia — od bezpiecznych lawend i grabów
            po wysoko trujące lilie i cis. Szukasz zamiennika tui? Sprawdź{" "}
            <Link href="/alternatywy-dla-tui" className="text-primary hover:underline">
              alternatywy dla tui
            </Link>
            .
          </p>
        </>
      }
    >
      <PetSafePlantsCatalog />
    </CalculatorLayout>
  );
}
