import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { TuiAlternativesCalculator } from "@/components/calculators/TuiAlternativesCalculator";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import { calculatorMetadata } from "@/lib/seo";

const calc = getCalculatorBySlug("alternatywy-dla-tui")!;

export const metadata: Metadata = calculatorMetadata(calc);

export default function Page() {
  return (
    <CalculatorLayout
      calc={calc}
      seoContent={
        <>
          <h2>Co posadzić zamiast tui?</h2>
          <p>
            Tuje w Polsce masowo padają na chorobę grzybową (Phytophthora).
            Coraz więcej ogrodników szuka zdrowszych alternatyw. Nasz kalkulator
            dobiera gatunki na podstawie strefy klimatycznej, docelowej
            wysokości, zimozieloności i tempa wzrostu.
          </p>
          <h3>Najlepsze zamienniki tui</h3>
          <p>
            Ostrokrzew kolczasty, cis pospolity i żywotnik wschodni to
            najpopularniejsze zimozielone alternatywy. Dla niższych żywopłotów
            sprawdzi się berberys, ligustr lub bukszpan. Wszystkie są bardziej
            odporne na choroby niż klasyczna tuja smaragdowa.
          </p>
        </>
      }
    >
      <TuiAlternativesCalculator />
    </CalculatorLayout>
  );
}
