import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { FlowerMeadowCalculator } from "@/components/calculators/FlowerMeadowCalculator";
import { FLOWER_MEADOW_FAQ } from "@/lib/calculators/flower-meadow";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import { calculatorMetadata } from "@/lib/seo";

const calc = getCalculatorBySlug("kalkulator-laki-kwietnej")!;

export const metadata: Metadata = calculatorMetadata(calc);

export default function Page() {
  return (
    <CalculatorLayout
      calc={calc}
      faqs={FLOWER_MEADOW_FAQ}
      seoContent={
        <>
          <h2>Łąka kwietna zamiast trawnika — ile nasion i ile oszczędzisz?</h2>
          <p>
            Łąka kwietna to coraz popularniejsza alternatywa dla klasycznego
            trawnika: kwitnie od wiosny do jesieni, karmi pszczoły i motyle, a
            przy tym wymaga ułamka pracy i wody. Kalkulator policzy, ile nasion
            potrzebujesz (norma wysiewu to zaledwie 1–2 g/m²), ile zapłacisz za
            założenie oraz ile litrów wody, koszeń i godzin pracy zaoszczędzisz
            rocznie w porównaniu z trawnikiem tej samej wielkości. Jeśli mimo
            wszystko rozważasz klasyczną murawę, porównaj koszty w naszym{" "}
            <Link
              href="/kalkulator-trawnika"
              className="text-primary hover:underline"
            >
              kalkulatorze trawnika
            </Link>
            .
          </p>
          <h3>Jaką mieszankę wybrać?</h3>
          <p>
            Mieszanka jednoroczna (maki, chabry, kosmosy) daje spektakularny
            efekt już po 6–8 tygodniach od siewu, ale wymaga ponownego wysiewu
            co roku. Mieszanka wieloletnia rozwija się wolniej — pełnię
            kwitnienia pokazuje od drugiego roku — za to jest trwała i z
            sezonu na sezon coraz bogatsza. Dostępne są też mieszanki
            specjalne: na cień (pod korony drzew) i na skarpy, gdzie gęsty
            system korzeniowy chroni przed erozją. Terminy kwitnienia
            poszczególnych gatunków sprawdzisz w{" "}
            <Link
              href="/katalog-kwitnienia"
              className="text-primary hover:underline"
            >
              katalogu kwitnienia
            </Link>
            .
          </p>
          <h3>Kiedy i jak siać?</h3>
          <p>
            Najlepsze okna siewu to kwiecień–maj oraz sierpień–wrzesień, przy
            czym mieszanki wieloletnie warto wysiać jesienią — zimowy chłód
            naturalnie stratyfikuje nasiona. Glebę wystarczy płytko przekopać
            lub przejechać glebogryzarką (koszt ok. 2–5 PLN/m²) i zagrabić.
            Nasion nie przykrywaj grubo ziemią, tylko lekko dociśnij. Ponieważ
            wysiewasz bardzo mało — na 100 m² zaledwie 150–200 g — wymieszaj
            nasiona z piaskiem w proporcji 1:10, żeby rozłożyły się
            równomiernie.
          </p>
          <h3>Realne oszczędności: woda, koszenie, czas</h3>
          <p>
            Trawnik pochłania w sezonie około 450 l wody na każdy m² i wymaga
            20–25 koszeń. Ugruntowana łąka kwietna radzi sobie samym deszczem i
            potrzebuje tylko 1–2 pokosów rocznie (koniecznie z zebraniem
            skoszonej biomasy, żeby nie użyźniać gleby). Na 100 m² to ponad
            40 000 l wody, kilkaset złotych i kilka godzin pracy mniej każdego
            roku — a do tego zero nawozów. Łąka przyciąga też ptaki owadożerne;
            zaplanuj dla nich schronienie z pomocą{" "}
            <Link
              href="/kalkulator-budek-legowych"
              className="text-primary hover:underline"
            >
              kalkulatora budek lęgowych
            </Link>
            .
          </p>
        </>
      }
    >
      <FlowerMeadowCalculator />
    </CalculatorLayout>
  );
}
