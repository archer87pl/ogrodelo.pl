import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { PondCalculator } from "@/components/calculators/PondCalculator";
import { POND_FAQ } from "@/lib/calculators/pond";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import { calculatorMetadata } from "@/lib/seo";

const calc = getCalculatorBySlug("kalkulator-oczka-wodnego")!;

export const metadata: Metadata = calculatorMetadata(calc);

export default function Page() {
  return (
    <CalculatorLayout
      calc={calc}
      faqs={POND_FAQ}
      seoContent={
        <>
          <h2>Jak zaplanować oczko wodne w ogrodzie?</h2>
          <p>
            Oczko wodne to jeden z najbardziej efektownych elementów ogrodu,
            ale jego budowa wymaga konkretnych obliczeń. Kalkulator wyznacza
            objętość wody, wymiar folii, wydajność pompy i liczbę roślin
            wodnych — wystarczy podać długość, szerokość, głębokość i kształt
            zbiornika. Przykład: owalne oczko 3 × 2 m o głębokości 1 m mieści
            ok. 5100 l wody i potrzebuje folii 5,6 × 4,6 m (ok. 26 m²).
          </p>
          <h3>Objętość i folia — najczęstsze błędy</h3>
          <p>
            Objętość liczymy jako długość × szerokość × głębokość ×
            współczynnik kształtu: 1,0 dla prostokątnego, 0,85 dla owalnego i
            0,75 dla nieregularnego. Przy zakupie folii do każdego wymiaru
            trzeba dodać podwójną głębokość oraz ok. 0,6 m zakładu na brzegi —
            pominięcie zakładu to najczęstszy powód, dla którego folia okazuje
            się za mała. Folia PVC 0,5 mm kosztuje ok. 25 PLN/m² i wytrzymuje
            10–15 lat, a EPDM 1,0 mm ok. 45 PLN/m², ale służy 30–40 lat. Pod
            folię zawsze układamy geowłókninę (ok. 6 PLN/m²), która chroni
            przed kamieniami i korzeniami.
          </p>
          <h3>Pompa, filtracja i ryby</h3>
          <p>
            Pompa powinna przepompować całą objętość oczka w 1–2 godziny — dla
            zbiornika 5000 l oznacza to wydajność 2500–5000 l/h. Jeśli
            planujesz ryby, filtracja musi być mocniejsza: pełny obieg w 1
            godzinę plus filtr ciśnieniowy z lampą UV-C. Pamiętaj też o
            głębokości minimum 80–100 cm, aby ryby bezpiecznie przezimowały
            poniżej strefy przemarzania. Uzupełnianie wody w upały warto oprzeć
            na deszczówce — policz jej zapas w naszym{" "}
            <a href="/kalkulator-deszczowki">kalkulatorze deszczówki</a>, bo
            woda deszczowa jest miękka i lepsza dla roślin wodnych niż
            kranówka.
          </p>
          <h3>Rośliny wodne i otoczenie oczka</h3>
          <p>
            Rośliny sadzimy strefowo: w strefie brzegowej ok. 3 sztuki na metr
            bieżący linii brzegowej (kosaciec, knieć błotna), w strefie płytkiej
            10–40 cm ok. 2 sztuki na m² (pałka wodna, strzałka), a w strefie
            głębokiej lilie wodne — 1 sztuka na 2,5 m² lustra wody. Tak
            obsadzone oczko szybciej osiąga równowagę biologiczną i mniej
            zarasta glonami. Rozmieszczenie zbiornika względem tarasu, rabat i
            ścieżek najwygodniej sprawdzić w{" "}
            <a href="/projektant-ogrodu">projektancie ogrodu</a>. Woda
            przyciąga też ptaki i jeże — jeśli chcesz wzmocnić ten efekt,
            zaplanuj dodatkowo schronienia w{" "}
            <a href="/kalkulator-budek-legowych">
              kalkulatorze budek lęgowych
            </a>
            . Całkowity budżet małego oczka 6 m² zamyka się zwykle w 1500–3000
            PLN z folią PVC, a z trwalszą folią EPDM w 2000–3600 PLN.
          </p>
        </>
      }
    >
      <PondCalculator />
    </CalculatorLayout>
  );
}
