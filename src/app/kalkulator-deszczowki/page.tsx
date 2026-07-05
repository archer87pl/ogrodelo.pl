import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { RainwaterCalculator } from "@/components/calculators/RainwaterCalculator";
import { RAINWATER_FAQ } from "@/lib/calculators/simple-calculator-faqs";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import { calculatorMetadata } from "@/lib/seo";

const calc = getCalculatorBySlug("kalkulator-deszczowki")!;

export const metadata: Metadata = calculatorMetadata(calc);

export default function Page() {
  return (
    <CalculatorLayout
      calc={calc}
      faqs={RAINWATER_FAQ}
      seoContent={
        <>
          <h2>Jaki zbiornik na deszczówkę wybrać?</h2>
          <p>
            Zbieranie deszczówki to ekologiczne i ekonomiczne rozwiązanie.
            Kalkulator oblicza roczną ilość wody, którą możesz zebrać z dachu,
            oraz rekomenduje odpowiednią wielkość zbiornika.
          </p>
          <h3>Ile deszczówki zbierzesz rocznie?</h3>
          <p>
            Wzór jest prosty: powierzchnia dachu × roczne opady × sprawność
            systemu (ok. 85%). W Polsce roczne opady wynoszą 500–700 mm w
            zależności od regionu.
          </p>
        </>
      }
    >
      <RainwaterCalculator />
    </CalculatorLayout>
  );
}
