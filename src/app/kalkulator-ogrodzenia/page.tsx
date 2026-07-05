import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { FenceCalculator } from "@/components/calculators/FenceCalculator";
import { FENCE_FAQ } from "@/lib/calculators/fence";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import { calculatorMetadata } from "@/lib/seo";

const calc = getCalculatorBySlug("kalkulator-ogrodzenia")!;

export const metadata: Metadata = calculatorMetadata(calc);

export default function Page() {
  return (
    <CalculatorLayout
      calc={calc}
      faqs={FENCE_FAQ}
      seoContent={
        <>
          <h2>Ile kosztuje ogrodzenie działki w 2026 roku?</h2>
          <p>
            Ogrodzenie 100-metrowej działki to wydatek od ok. 12 000 PLN
            (siatka pleciona) do ponad 75 000 PLN (gabiony). Najczęściej
            wybierany kompromis — panele 3D z ocynku malowane proszkowo —
            zamyka się w 18 000–22 000 PLN z furtką, bramą dwuskrzydłową i
            montażem. Kalkulator liczy dokładną liczbę paneli, słupków oraz
            koszt materiałów i robocizny dla pięciu popularnych technologii,
            dzięki czemu porównasz je na jednym ekranie.
          </p>
          <h3>Jak policzyć liczbę paneli i słupków?</h3>
          <p>
            Standardowy panel ogrodzeniowy ma 2,5 m szerokości. Od całkowitej
            długości ogrodzenia odejmij światło furtki (ok. 1 m) i bramy
            (ok. 4 m), a wynik podziel przez 2,5 i zaokrąglij w górę — dla
            95 m wypełnienia wychodzi 38 paneli. Słupków potrzebujesz zawsze
            o jeden więcej niż przęseł, a przy każdej furtce i bramie dolicz
            dodatkowe, wzmocnione słupki (przy bramie min. 80×80 mm,
            betonowane na głębokość 80–100 cm).
          </p>
          <h3>Panele, siatka czy sztachety — co wybrać?</h3>
          <p>
            Siatka pleciona (ok. 120–130 PLN/mb z montażem) to najtańsza
            opcja na granice boczne i tylne, ale nie daje prywatności ani
            sztywności. Panel 3D (ok. 180–220 PLN/mb) jest bezobsługowy przez
            25–30 lat, a panel 2D z podwójnych prętów poziomych — jeszcze
            sztywniejszy, za ok. 220–280 PLN/mb. Sztachety drewniane
            (ok. 300–350 PLN/mb) wyglądają naturalnie, lecz wymagają
            malowania co 3–4 lata. Jeśli zależy Ci na osłonie od sąsiadów,
            tańszą i zieloną alternatywą dla pełnego płotu może być żywopłot
            — jego koszt policzysz w{" "}
            <a href="/kalkulator-zywoplotu">kalkulatorze żywopłotu</a>, a
            wysokość osłony dobierzesz w{" "}
            <a href="/kalkulator-prywatnosci">kalkulatorze prywatności</a>.
          </p>
          <h3>Formalności i nasadzenia przy granicy</h3>
          <p>
            Ogrodzenie do 2,2 m wysokości stawiasz bez zgłoszenia i
            pozwolenia. Wyższe wymaga zgłoszenia do starostwa, które ma
            21 dni na wniesienie sprzeciwu. Pamiętaj też, że płot w osi
            granicy wymaga zgody sąsiada — bez niej całość musi stanąć na
            Twojej działce. Jeżeli wzdłuż ogrodzenia planujesz drzewa lub
            krzewy, sprawdź wymagane odstępy w narzędziu{" "}
            <a href="/odleglosc-sadzenia-od-granicy">
              odległość sadzenia od granicy
            </a>{" "}
            — unikniesz sporów i przycinania gałęzi po latach. Do kosztorysu
            warto doliczyć podmurówkę prefabrykowaną (70–100 PLN/mb), która
            chroni panele przed korozją i ułatwia koszenie przy płocie.
          </p>
        </>
      }
    >
      <FenceCalculator />
    </CalculatorLayout>
  );
}
