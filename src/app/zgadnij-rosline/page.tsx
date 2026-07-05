import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { PlantGuessGame } from "@/components/calculators/PlantGuessGame";
import { PLANT_GUESS_FAQ } from "@/lib/calculators/plant-guess";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import { calculatorMetadata } from "@/lib/seo";

const calc = getCalculatorBySlug("zgadnij-rosline")!;

export const metadata: Metadata = calculatorMetadata(calc);

export default function Page() {
  return (
    <CalculatorLayout
      calc={calc}
      faqs={PLANT_GUESS_FAQ}
      description="Codzienna zagadka ogrodnicza — odgadnij roślinę w 6 próbach. Podpowiedzi o kwitnieniu, kolorze i wysokości."
      seoContent={
        <>
          <h2>Codzienna gra dla ogrodników</h2>
          <p>
            Każdego dnia inna roślina z{" "}
            <Link href="/katalog-kwitnienia" className="text-primary hover:underline">
              katalogu kwitnienia
            </Link>
            . Po każdej próbie zobaczysz, które cechy się zgadzają — jak w popularnych grach
            słownych, ale o roślinach. Wracaj jutro po nową zagadkę!
          </p>
        </>
      }
    >
      <PlantGuessGame />
    </CalculatorLayout>
  );
}
