import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { GardenCostsCalculator } from "@/components/calculators/GardenCostsCalculator";
import { GARDEN_COSTS_FAQ } from "@/lib/calculators/garden-costs";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import { calculatorMetadata } from "@/lib/seo";

const calc = getCalculatorBySlug("kalkulator-kosztow-ogrodu")!;

export const metadata: Metadata = calculatorMetadata(calc);

export default function Page() {
  return (
    <CalculatorLayout
      calc={calc}
      faqs={GARDEN_COSTS_FAQ}
      seoContent={
        <>
          <h2>Ile naprawdę kosztuje utrzymanie ogrodu?</h2>
          <p>
            Ogród wydaje się tani, dopóki nie policzysz wszystkiego razem:
            wody, nawozów, paliwa lub prądu do koszenia oraz środków ochrony
            roślin. Dla typowego ogrodu 500 m² z trawnikiem zajmującym 60%
            powierzchni roczne koszty sięgają 2000–2500 PLN, czyli ok. 4–5
            PLN/m². Kalkulator rozbija tę kwotę na kategorie i pokazuje, która
            pozycja zjada najwięcej — a co ważniejsze, ile konkretnie możesz
            odzyskać.
          </p>
          <h3>Woda — największa pozycja w budżecie</h3>
          <p>
            Trawnik podlewany wodą z sieci potrzebuje ok. 450 litrów na m² w
            ciągu sezonu. Przy cenie ok. 12 PLN/m³ każde 100 m² trawnika to
            ponad 500 PLN rocznie za samo podlewanie. Automatyczne nawadnianie
            ze sterownikiem podlewa precyzyjniej i pozwala zejść do ok. 380
            l/m², ale prawdziwe oszczędności daje deszczówka: zbiornik
            podłączony do rynien pokrywa realnie ok. 40% zapotrzebowania.
            Sprawdź w naszym{" "}
            <a href="/kalkulator-deszczowki">kalkulatorze deszczówki</a>, jaki
            zbiornik pasuje do Twojego dachu — przy 300 m² trawnika zwraca się
            zwykle w 3–4 sezony.
          </p>
          <h3>Koszenie: samodzielnie, robot czy firma?</h3>
          <p>
            Paliwo do kosiarki spalinowej to ok. 0,15 PLN/m² rocznie przy 25
            koszeniach, kosiarka elektryczna schodzi poniżej 0,10 PLN/m². Firma
            ogrodnicza liczy 15–25 PLN za każde 100 m² na jedno koszenie — przy
            15 koszeniach w sezonie to już ok. 3 PLN/m² rocznie, czyli 900–1200
            PLN dla 300 m² trawnika. Robot koszący zużywa prąd za zaledwie
            50–100 PLN rocznie, więc różnica potrafi przekroczyć 1000 PLN co
            roku. Nasz{" "}
            <a href="/kalkulator-robota-koszacego">
              kalkulator robota koszącego
            </a>{" "}
            pomoże Ci dobrać model do wielkości i kształtu trawnika.
          </p>
          <h3>Mniej trawnika, mniejsze rachunki</h3>
          <p>
            Każdy metr trawnika generuje koszty: wodę, nawóz (ok. 3 kg na 100
            m² na zabieg, po ok. 8 PLN/kg) i koszenie. Zamiana choćby 30%
            trawnika na łąkę kwietną obcina te trzy pozycje proporcjonalnie —
            łąkę kosi się 1–2 razy w roku, nie wymaga nawożenia ani podlewania
            po pierwszym sezonie. Zaplanuj taką zamianę w{" "}
            <a href="/kalkulator-laki-kwietnej">kalkulatorze łąki kwietnej</a>{" "}
            i zobacz, ile nasion potrzebujesz. W połączeniu z deszczówką i
            mulczowaniem podczas koszenia realnie zmniejszysz roczny budżet
            ogrodu o 30–40% bez utraty jego uroku.
          </p>
        </>
      }
    >
      <GardenCostsCalculator />
    </CalculatorLayout>
  );
}
