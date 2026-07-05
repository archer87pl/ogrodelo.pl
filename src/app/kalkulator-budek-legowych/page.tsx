import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { BirdhouseCalculator } from "@/components/calculators/BirdhouseCalculator";
import { BIRDHOUSES_FAQ } from "@/lib/calculators/birdhouses";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import { calculatorMetadata } from "@/lib/seo";

const calc = getCalculatorBySlug("kalkulator-budek-legowych")!;

export const metadata: Metadata = calculatorMetadata(calc);

export default function Page() {
  return (
    <CalculatorLayout
      calc={calc}
      faqs={BIRDHOUSES_FAQ}
      seoContent={
        <>
          <h2>Ile budek lęgowych na działkę?</h2>
          <p>
            Ptaki są terytorialne — budki tego samego typu (ten sam rozmiar otworu) powinny
            wisieć co najmniej 30 m od siebie. Na typowej działce 600–1000 m² zmieści się
            zwykle 1–3 budki różnych typów, bo różne gatunki nie konkurują o to samo
            terytorium. Kalkulator uwzględnia powierzchnię, liczbę wysokich drzew, otoczenie
            (miasto vs wieś) i obecność kota.
          </p>
        </>
      }
    >
      <BirdhouseCalculator />
    </CalculatorLayout>
  );
}
