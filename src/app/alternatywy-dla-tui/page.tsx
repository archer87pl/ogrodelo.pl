import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { TuiAlternativesCalculator } from "@/components/calculators/TuiAlternativesCalculator";
import { TUI_ALTERNATIVES_FAQ } from "@/lib/calculators/simple-calculator-faqs";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import { calculatorMetadata } from "@/lib/seo";

const calc = getCalculatorBySlug("alternatywy-dla-tui")!;

export const metadata: Metadata = calculatorMetadata(calc);

export default function Page() {
  return (
    <CalculatorLayout
      calc={calc}
      faqs={TUI_ALTERNATIVES_FAQ}
      seoContent={
        <>
          <h2>Co posadzić zamiast tui?</h2>
          <p>
            Tuje w Polsce masowo padają na chorobę grzybową (Phytophthora).
            Coraz więcej ogrodników szuka zdrowszych alternatyw. Porównaj{" "}
            <Link href="/porownywarka-krzewow/laurowisnia-vs-tuja" className="text-primary hover:underline">
              laurowiśnię z tuią
            </Link>{" "}
            i{" "}
            <Link href="/porownywarka-krzewow/tuja-vs-ostrokrzew" className="text-primary hover:underline">
              tuię z ostrokrzewem
            </Link>
            , a następnie policz koszt żywopłotu w{" "}
            <Link href="/kalkulator-zywoplotu" className="text-primary hover:underline">
              kalkulatorze żywopłotu
            </Link>
            .
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
