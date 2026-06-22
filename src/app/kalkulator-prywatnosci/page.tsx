import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { PrivacyCalculator } from "@/components/calculators/PrivacyCalculator";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import { calculatorMetadata } from "@/lib/seo";

const calc = getCalculatorBySlug("kalkulator-prywatnosci")!;

export const metadata: Metadata = calculatorMetadata(calc);

export default function Page() {
  return (
    <CalculatorLayout
      calc={calc}
      seoContent={
        <>
          <h2>Jak zasłonić widok sąsiada w ogrodzie?</h2>
          <p>
            Prywatność w ogrodzie to jeden z najczęstszych powodów sadzenia
            wysokich roślin. Kalkulator oblicza wymaganą wysokość roślin na
            podstawie wysokości ogrodzenia, odległości od sąsiada i wysokości
            jego budynku.
          </p>
          <h3>Symulacja sezonowa</h3>
          <p>
            Rośliny liściaste zapewniają pełną prywatność latem, ale zimą
            tracą liście. Zimozielone gatunki jak cis, tuja czy laurowiśnia
            chronią przez cały rok.
          </p>
        </>
      }
    >
      <PrivacyCalculator />
    </CalculatorLayout>
  );
}
