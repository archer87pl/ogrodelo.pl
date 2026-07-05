import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { VegetableSowingCalculator } from "@/components/calculators/VegetableSowingCalculator";
import { VEGETABLE_SOWING_FAQ } from "@/lib/calculators/vegetable-sowing";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import { calculatorMetadata } from "@/lib/seo";

const calc = getCalculatorBySlug("kalkulator-siewu-warzyw")!;

export const metadata: Metadata = calculatorMetadata(calc);

export default function Page() {
  return (
    <CalculatorLayout
      calc={calc}
      faqs={VEGETABLE_SOWING_FAQ}
      seoContent={
        <>
          <h2>Ile nasion i rozsady potrzeba na zagon?</h2>
          <p>
            To jedno z pierwszych pytań każdego, kto zakłada warzywnik. Kupując
            nasiona &bdquo;na oko&rdquo;, najczęściej bierzemy ich za dużo —
            albo, co gorsza, za mało i w maju okazuje się, że połowa zagonu
            stoi pusta. Kalkulator siewu warzyw przelicza powierzchnię i
            szerokość zagonu na konkrety: liczbę rzędów, liczbę roślin, gramy
            nasion lub sztuki rozsady oraz orientacyjny plon w kilogramach.
          </p>
          <p>
            Przykład: na zagonie 10 m² o szerokości 1,2 m zmieszczą się 4 rzędy
            marchwi w rozstawie 25 cm. Po przerzedzeniu do 4 cm w rzędzie
            uzyskasz ok. 800 roślin, a do wysiewu wystarczy 8 g nasion. Plon?
            Realnie 30–35 kg korzeni. Dla pomidorów gruntowych te same 10 m²
            oznacza już tylko ok. 28–30 sadzonek w rozstawie 70 × 50 cm — ale
            za to 40–60 kg owoców.
          </p>
          <h3>Siew wprost czy rozsada?</h3>
          <p>
            Warzywa korzeniowe — marchew, pietruszka, burak czy rzodkiewka —
            siejemy zawsze wprost do gruntu, bo źle znoszą przesadzanie.
            Podobnie strączkowe: groch już w marcu, fasolę szparagową dopiero
            po 15 maja. Z rozsady sadzimy natomiast pomidory, kapustę i sałatę,
            a cebulę najprościej uprawiać z dymki wysadzanej w kwietniu.
            Dokładne terminy dla swojego regionu sprawdzisz w naszym{" "}
            <a href="/kalendarz-ogrodnika">kalendarzu ogrodnika</a> — pamiętaj,
            że warzywa ciepłolubne wysiewamy do gruntu dopiero po zimnych
            ogrodnikach.
          </p>
          <h3>Głębokość siewu i rozstawa mają znaczenie</h3>
          <p>
            Najczęstszy błąd początkujących to zbyt głęboki siew drobnych
            nasion. Obowiązuje zasada 2–3-krotności średnicy nasiona: sałatę
            przykrywamy zaledwie 0,5 cm ziemi, marchew 1–1,5 cm, buraki 2–3 cm,
            a groch nawet 4–5 cm. Druga pułapka to zbyt gęste rzędy — rośliny
            konkurują o światło i wodę, a plon spada zamiast rosnąć. Lepiej
            wysiać gęściej w rzędzie i bezlitośnie przerzedzić po wschodach.
          </p>
          <h3>Zaplanuj cały sezon, nie tylko siew</h3>
          <p>
            Liczba roślin to dopiero początek planowania. Gdy znasz obsadę
            zagonu, policz w{" "}
            <a href="/kalkulator-plonow-warzywnika">
              kalkulatorze plonów warzywnika
            </a>
            , ile kilogramów warzyw realnie zbierzesz i czy pokryje to potrzeby
            Twojej rodziny. Warzywnik trzeba też regularnie podlewać — ogórki i
            cukinia potrzebują w upały nawet 20–25 l wody na m² tygodniowo.
            Ile dokładnie i jak często, przeliczysz w{" "}
            <a href="/kalkulator-nawadniania">kalkulatorze nawadniania</a>.
            Dobrze zaplanowany zagon 10–15 m² potrafi od maja do października
            zaopatrywać dwuosobowe gospodarstwo w świeże warzywa praktycznie
            bez przerwy.
          </p>
        </>
      }
    >
      <VegetableSowingCalculator />
    </CalculatorLayout>
  );
}
