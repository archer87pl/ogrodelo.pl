import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { FertilizationCalculator } from "@/components/calculators/FertilizationCalculator";
import { FERTILIZATION_FAQ } from "@/lib/calculators/simple-calculator-faqs";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import { calculatorMetadata } from "@/lib/seo";

const calc = getCalculatorBySlug("kalkulator-nawozenia")!;

export const metadata: Metadata = calculatorMetadata(calc);

export default function Page() {
  return (
    <CalculatorLayout
      calc={calc}
      faqs={FERTILIZATION_FAQ}
      seoContent={
        <>
          <h2>Ile nawozu na trawnik?</h2>
          <p>
            Prawidłowe nawożenie to podstawa pięknego, zielonego trawnika.
            Kalkulator oblicza roczne zapotrzebowanie na nawóz w zależności od
            powierzchni, rodzaju trawnika i wybranego nawozu — mineralnego,
            organicznego, płynnego lub wapniowego.
          </p>
          <h3>Harmonogram nawożenia trawnika</h3>
          <p>
            Najważniejsze zabiegi to nawożenie wiosenne (kwiecień), letnie
            (czerwiec) i jesienne (wrzesień). Trawnik sportowy wymaga
            dodatkowego nawożenia w sierpniu.
          </p>
        </>
      }
    >
      <FertilizationCalculator />
    </CalculatorLayout>
  );
}
