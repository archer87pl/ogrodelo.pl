import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { VegetableYieldCalculator } from "@/components/calculators/VegetableYieldCalculator";
import { VEGETABLE_YIELD_FAQ } from "@/lib/calculators/vegetable-yield";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import { calculatorMetadata } from "@/lib/seo";

const calc = getCalculatorBySlug("kalkulator-plonow-warzywnika")!;

export const metadata: Metadata = calculatorMetadata(calc);

export default function Page() {
  return (
    <CalculatorLayout
      calc={calc}
      faqs={VEGETABLE_YIELD_FAQ}
      seoContent={
        <>
          <h2>Ile warzyw zebrane z własnego ogrodu?</h2>
          <p>
            Domowy warzywnik 20–40 m² potrafi dać setki kilogramów plonów i oszczędności
            500–1500 PLN rocznie w sklepie. Kalkulator szacuje plon i wartość rynkową dla
            pomidorów, ogórków, marchewki i innych upraw. Plan siewu i rozstawy znajdziesz w{" "}
            <Link href="/kalkulator-siewu-warzyw" className="text-primary hover:underline">
              kalkulatorze siewu warzyw
            </Link>
            .
          </p>
        </>
      }
    >
      <VegetableYieldCalculator />
    </CalculatorLayout>
  );
}
