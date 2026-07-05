import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { LimingCalculator } from "@/components/calculators/LimingCalculator";
import { LIMING_FAQ } from "@/lib/calculators/liming";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import { calculatorMetadata } from "@/lib/seo";

const calc = getCalculatorBySlug("kalkulator-wapnowania")!;

export const metadata: Metadata = calculatorMetadata(calc);

export default function Page() {
  return (
    <CalculatorLayout
      calc={calc}
      faqs={LIMING_FAQ}
      seoContent={
        <>
          <h2>Wapnowanie gleby — ile wapna i kiedy sypać?</h2>
          <p>
            Większość gleb w Polsce jest zakwaszona — według badań stacji
            chemiczno-rolniczych ponad połowa wymaga wapnowania. Przy pH
            poniżej 5,5 trawa rośnie słabo, a mech i szczaw polny czują się
            doskonale. Kalkulator oblicza dawkę wapna na podstawie aktualnego
            pH, rodzaju gleby i uprawy, przelicza ją na worki 25 kg i podaje
            szacunkowy koszt.
          </p>
          <h3>Jaka dawka wapna na 100 m²?</h3>
          <p>
            Punktem wyjścia są standardowe tabele agronomiczne wyrażone w
            czystym CaO. Aby podnieść pH o 0,5 jednostki, gleba lekka
            piaszczysta potrzebuje ok. 2–3 kg CaO na 100 m², gleba średnia
            3–5 kg, a ciężka gliniasta aż 5–7 kg. Dawkę CaO przelicza się
            potem na formę handlową: dla kredy (węglanu wapnia) mnożymy ją
            przez ok. 1,79, dla dolomitu przez ok. 1,7. Przykład: trawnik
            300 m² na glebie średniej z pH 5,5 potrzebuje ok. 12 kg CaO,
            czyli ok. 21 kg kredy — w praktyce jeden worek 25 kg za ok.
            30 PLN.
          </p>
          <h3>Kiedy wapnować i czego nie łączyć?</h3>
          <p>
            Najlepszy termin to jesień, od września do listopada — wapno ma
            całą zimę na przereagowanie z glebą. Alternatywą jest wczesna
            wiosna, ale zawsze z odstępem minimum 4–6 tygodni od nawożenia
            azotem i obornika, inaczej stracisz nawet połowę azotu w postaci
            amoniaku. Harmonogram nawożenia po wapnowaniu ustawisz w{" "}
            <a href="/kalkulator-nawozenia">kalkulatorze nawożenia</a>. Wapno
            tlenkowe (CaO) to opcja wyłącznie na jesień i wyłącznie na gleby
            ciężkie — na piaskach wypala materię organiczną.
          </p>
          <h3>Nie każdą glebę trzeba wapnować</h3>
          <p>
            Jeśli pH jest już w zakresie docelowym (dla trawnika 6,0–6,5, dla
            warzywnika ok. 6,5), wapnowanie przyniesie więcej szkody niż
            pożytku: przewapnowana gleba blokuje przyswajanie żelaza, manganu
            i fosforu. Z kolei iglaki, różaneczniki i borówki wymagają pH
            4,5–5,5 — przy wyższym odczycie zamiast wapna stosuje się siarkę
            granulowaną w dawce ok. 30–50 g/m². Zakładasz nowy trawnik na
            świeżo wapnowanej glebie? Ilość nasion policzysz w{" "}
            <a href="/kalkulator-trawnika">kalkulatorze trawnika</a>, a
            rozstawy i terminy siewu warzyw na uregulowanym pH sprawdzisz w{" "}
            <a href="/kalkulator-siewu-warzyw">kalkulatorze siewu warzyw</a>.
          </p>
          <p>
            Pamiętaj: dawki większe niż ok. 10–15 kg CaO na 100 m² dziel na
            dwa sezony. pH gleby zmienia się powoli — efekt wapnowania
            zobaczysz w pełni po 6–12 miesiącach, a badanie warto powtarzać
            co 2–3 lata.
          </p>
        </>
      }
    >
      <LimingCalculator />
    </CalculatorLayout>
  );
}
