import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { LawnCalculator } from "@/components/calculators/LawnCalculator";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import { calculatorMetadata } from "@/lib/seo";

const calc = getCalculatorBySlug("kalkulator-trawnika")!;

export const metadata: Metadata = calculatorMetadata(calc);

export default function Page() {
  return (
    <CalculatorLayout
      calc={calc}
      seoContent={
        <>
          <h2>Ile kosztuje założenie trawnika?</h2>
          <p>
            Zakładanie trawnika od podstaw wymaga nasion, ziemi ogrodowej i
            nawozu startowego. Nasz kalkulator podaje dokładne ilości i
            szacunkowy koszt całej inwestycji.
          </p>
          <h3>Kiedy siać trawnik?</h3>
          <p>
            Najlepszy czas to wrzesień (ciepła gleba, wilgotne powietrze) lub
            kwiecień (szybki start wegetacji). Na 100 m² potrzebujesz ok. 3,5
            kg nasion i 5 m³ ziemi.
          </p>
        </>
      }
    >
      <LawnCalculator />
    </CalculatorLayout>
  );
}
