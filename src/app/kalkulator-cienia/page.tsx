import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { ShadeCalculator } from "@/components/calculators/ShadeCalculator";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import { calculatorMetadata } from "@/lib/seo";

const calc = getCalculatorBySlug("kalkulator-cienia")!;

export const metadata: Metadata = calculatorMetadata(calc);

export default function Page() {
  return (
    <CalculatorLayout
      calc={calc}
      seoContent={
        <>
          <h2>Jak duży cień rzuca drzewo?</h2>
          <p>
            Planując nasadzenia w ogrodzie, warto wiedzieć, ile cienia rzuca
            drzewo w różnych porach roku. Kalkulator uwzględnia wysokość drzewa,
            szerokość korony i kąt słońca w poszczególnych miesiącach dla
            polskiej szerokości geograficznej.
          </p>
          <h3>Cień sezonowy vs całoroczny</h3>
          <p>
            Drzewa liściaste (klon, brzoza, lipa) dają cień letni — idealny na
            taras. Drzewa iglaste (świerk, sosna) zacieniają cały rok.
          </p>
        </>
      }
    >
      <ShadeCalculator />
    </CalculatorLayout>
  );
}
