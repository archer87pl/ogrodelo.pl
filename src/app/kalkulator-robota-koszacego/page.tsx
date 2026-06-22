import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { MowerCalculator } from "@/components/calculators/MowerCalculator";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import { calculatorMetadata } from "@/lib/seo";

const calc = getCalculatorBySlug("kalkulator-robota-koszacego")!;

export const metadata: Metadata = calculatorMetadata(calc);

export default function Page() {
  return (
    <CalculatorLayout
      calc={calc}
      seoContent={
        <>
          <h2>Jaki robot koszący wybrać?</h2>
          <p>
            Robot koszący to inwestycja, która zwraca się w 2–4 lata. Kalkulator
            dobiera modele na podstawie powierzchni trawnika, nachylenia terenu
            i liczby przeszkód, a także porównuje koszty z koszeniem ręcznym.
          </p>
          <h3>Opłacalność robota koszącego</h3>
          <p>
            Robot oszczędza ok. 100 godzin rocznie. Przy trawniku 500 m²
            koszenie ręczne kosztuje ok. 7500 PLN rocznie (usługa), a robot —
            ok. 200 PLN (prąd + serwis).
          </p>
        </>
      }
    >
      <MowerCalculator />
    </CalculatorLayout>
  );
}
