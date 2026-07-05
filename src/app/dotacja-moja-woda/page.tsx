import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { MojaWodaCalculator } from "@/components/calculators/MojaWodaCalculator";
import { MOJA_WODA_FAQ } from "@/lib/calculators/moja-woda";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import { calculatorMetadata } from "@/lib/seo";

const calc = getCalculatorBySlug("dotacja-moja-woda")!;

export const metadata: Metadata = calculatorMetadata(calc);

export default function Page() {
  return (
    <CalculatorLayout
      calc={calc}
      faqs={MOJA_WODA_FAQ}
      seoContent={
        <>
          <h2>Program Moja Woda — dotacja na deszczówkę w pigułce</h2>
          <p>
            Moja Woda to program Narodowego Funduszu Ochrony Środowiska i
            Gospodarki Wodnej, który wspiera przydomową retencję. Właściciele
            domów jednorodzinnych mogą otrzymać dofinansowanie do zakupu i
            montażu instalacji zatrzymujących deszczówkę na działce: zbiorników
            naziemnych i podziemnych, oczek wodnych o funkcji retencyjnej oraz
            systemów rozsączających. W ostatniej edycji dotacja pokrywała do
            80% kosztów kwalifikowanych, maksymalnie 6 000 PLN, przy minimalnej
            wartości inwestycji 2 000 PLN i łącznej pojemności retencyjnej co
            najmniej 2 m³. Nabory są ogłaszane okresowo, dlatego przed zakupem
            zbiornika sprawdź aktualne warunki na stronie WFOŚiGW swojego
            województwa.
          </p>
          <h3>Jak działa kalkulator dotacji Moja Woda?</h3>
          <p>
            Kalkulator sprawdza, czy Twoja inwestycja spełnia progi programu, a
            następnie wylicza kwotę dotacji, koszt po dofinansowaniu oraz okres
            zwrotu inwestycji — z dotacją i bez niej. Roczną oszczędność
            szacujemy na podstawie ilości deszczówki możliwej do zebrania z
            dachu (powierzchnia × opady × sprawność ok. 85%) oraz realnego
            zapotrzebowania ogrodu na wodę do podlewania (ok. 450 l/m² na
            sezon), przy cenie wody wodociągowej ok. 12 PLN/m³. Dokładną
            wielkość zbiornika dobierzesz w naszym{" "}
            <Link
              href="/kalkulator-deszczowki"
              className="text-primary hover:underline"
            >
              kalkulatorze deszczówki
            </Link>
            , a potrzeby wodne roślin policzysz w{" "}
            <Link
              href="/kalkulator-nawadniania"
              className="text-primary hover:underline"
            >
              kalkulatorze nawadniania
            </Link>
            .
          </p>
          <h3>Jak złożyć wniosek o dotację?</h3>
          <p>
            Wniosek składa się elektronicznie przez portal beneficjenta
            Wojewódzkiego Funduszu Ochrony Środowiska i Gospodarki Wodnej
            właściwego dla Twojego województwa. Do rozliczenia potrzebne będą
            faktury imienne za zakup i montaż instalacji oraz dokument
            potwierdzający oddanie domu do użytku. Środki w każdej edycji są
            ograniczone i często wyczerpują się przed końcem naboru — warto
            złożyć wniosek jak najwcześniej.
          </p>
          <h3>Czy inwestycja w deszczówkę się opłaca?</h3>
          <p>
            Z dotacją okres zwrotu skraca się nawet kilkukrotnie. Przykładowo
            zbiornik podziemny za 8 000 PLN z dotacją 6 000 PLN kosztuje Cię
            realnie 2 000 PLN — przy oszczędności kilkuset złotych rocznie
            inwestycja zwraca się w kilka sezonów. Deszczówka jest przy tym
            miękka i pozbawiona chloru, więc rośliny podlewane nią rosną
            lepiej. Planując całość wydatków na zagospodarowanie działki,
            skorzystaj też z{" "}
            <Link
              href="/kalkulator-kosztow-ogrodu"
              className="text-primary hover:underline"
            >
              kalkulatora kosztów ogrodu
            </Link>
            , aby zobaczyć zbiornik na deszczówkę na tle pozostałych inwestycji.
          </p>
        </>
      }
    >
      <MojaWodaCalculator />
    </CalculatorLayout>
  );
}
