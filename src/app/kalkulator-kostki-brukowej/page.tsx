import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { PavingCalculator } from "@/components/calculators/PavingCalculator";
import { PAVING_FAQ } from "@/lib/calculators/paving";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import { calculatorMetadata } from "@/lib/seo";

const calc = getCalculatorBySlug("kalkulator-kostki-brukowej")!;

export const metadata: Metadata = calculatorMetadata(calc);

export default function Page() {
  return (
    <CalculatorLayout
      calc={calc}
      faqs={PAVING_FAQ}
      seoContent={
        <>
          <h2>Ile kostki brukowej potrzeba na ścieżkę, taras lub podjazd?</h2>
          <p>
            Podstawowa zasada brukarska: do zmierzonej powierzchni zawsze
            doliczaj 5% zapasu na docinki przy krawędziach i ewentualne
            uszkodzenia. Na ścieżkę o powierzchni 20 m² kupujesz więc 21 m²
            kostki, a na podjazd 50 m² — 52,5 m². Kalkulator robi to
            automatycznie i od razu wycenia materiał: kostka betonowa szara
            6 cm kosztuje ok. 45 PLN/m², kolorowa ok. 65 PLN/m², behaton ok.
            50 PLN/m², a kostka granitowa ok. 220 PLN/m² (ceny 2026).
          </p>
          <h3>Podbudowa — fundament trwałej nawierzchni</h3>
          <p>
            To grubość podbudowy, a nie sama kostka, decyduje o tym, czy
            nawierzchnia po kilku latach się nie zapadnie. Pod ścieżkę pieszą
            wystarczy 15 cm zagęszczonego kruszywa łamanego 0–31,5 mm, pod
            taras 20 cm, a pod podjazd samochodowy 30–40 cm. Kruszywo kupuje
            się na tony: 1 m³ waży ok. 1,7 t i kosztuje ok. 150 PLN z dostawą.
            Na podjazd 50 m² z podbudową 35 cm potrzeba ok. 17,5 m³, czyli
            blisko 30 ton. Jeśli przy okazji wykopu zostaje Ci urobek do
            zagospodarowania, sprawdź{" "}
            <a href="/kalkulator-ziemi-i-kory">kalkulator ziemi i kory</a> —
            policzy, ile ziemi wywieźć lub rozplantować na rabatach.
          </p>
          <h3>Podsypka i obrzeża — o tym często się zapomina</h3>
          <p>
            Między podbudową a kostką układa się 3–5 cm podsypki
            cementowo-piaskowej (proporcja 1:4). Na 20 m² to ok. 0,8 m³
            materiału za ok. 220 PLN. Krawędzie nawierzchni zabezpieczają
            obrzeża betonowe 100 × 20 × 6 cm — liczba sztuk równa się długości
            krawędzi w metrach, a jedna sztuka kosztuje ok. 14 PLN. Obrzeża
            osadza się na półsuchym betonie, zanim ułożysz pierwszą kostkę.
          </p>
          <h3>Koszt całkowity: materiały plus robocizna</h3>
          <p>
            Materiały to zwykle mniej niż połowa budżetu. Robocizna brukarska
            w 2026 roku kosztuje 120–200 PLN/m² — przy podjeździe 50 m² to
            dodatkowe 6 000–10 000 PLN. Układając ścieżkę samodzielnie,
            zaoszczędzisz sporo, ale wypożycz zagęszczarkę (ok. 100 PLN/doba)
            i pamiętaj o spadku 1–2% od domu. Zanim zamówisz materiały,
            rozrysuj przebieg ścieżek w{" "}
            <a href="/projektant-ogrodu">projektancie ogrodu</a> — łatwiej
            policzysz powierzchnię i obwód. A jeśli razem z podjazdem planujesz
            nowe ogrodzenie, wyceni je{" "}
            <a href="/kalkulator-ogrodzenia">kalkulator ogrodzenia</a>.
          </p>
        </>
      }
    >
      <PavingCalculator />
    </CalculatorLayout>
  );
}
