import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { TreeRemovalCalculator } from "@/components/calculators/TreeRemovalCalculator";
import { TREE_REMOVAL_FAQ } from "@/lib/calculators/tree-removal";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import { calculatorMetadata } from "@/lib/seo";

const calc = getCalculatorBySlug("wycinka-drzewa")!;

export const metadata: Metadata = calculatorMetadata(calc);

export default function Page() {
  return (
    <CalculatorLayout
      calc={calc}
      faqs={TREE_REMOVAL_FAQ}
      seoContent={
        <>
          <h2>Wycinka drzewa na własnej działce — jakie przepisy obowiązują?</h2>
          <p>
            Zasady usuwania drzew i krzewów reguluje ustawa o ochronie przyrody
            (art. 83–83f). To, czy potrzebujesz zgłoszenia, zezwolenia, czy
            możesz wyciąć drzewo bez żadnych formalności, zależy od trzech
            rzeczy: kto wycina i w jakim celu, jaki to gatunek oraz jaki jest
            obwód pnia mierzony na wysokości 5 cm nad ziemią. Kalkulator
            powyżej prowadzi Cię przez te pytania i pokazuje gotowy werdykt
            wraz z listą kroków do wykonania. Stan prawny: 2026.
          </p>
          <h3>Progi obwodu pnia — kiedy wycinka bez formalności?</h3>
          <p>
            Drzewo można usunąć bez zgłoszenia i zezwolenia, jeśli obwód pnia
            na wysokości 5 cm nad ziemią nie przekracza progu dla danej grupy
            gatunkowej: 80 cm dla topoli, wierzby, klonu jesionolistnego i
            klonu srebrzystego; 65 cm dla kasztanowca zwyczajnego, robinii
            akacjowej i platanu klonolistnego; 50 cm dla pozostałych gatunków.
            Drzewa owocowe są zwolnione z formalności niezależnie od obwodu
            (o ile nie rosną na nieruchomości wpisanej do rejestru zabytków),
            a krzewy — gdy ich skupisko nie przekracza 25 m² powierzchni.
          </p>
          <h3>Zgłoszenie wycinki — procedura dla osoby prywatnej</h3>
          <p>
            Jeśli jesteś osobą prywatną, drzewo rośnie na Twojej działce, a
            wycinka nie ma związku z działalnością gospodarczą, powyżej progu
            obwodu wystarczy bezpłatne zgłoszenie do wójta, burmistrza lub
            prezydenta miasta. Urząd ma 21 dni na oględziny drzewa, a po nich
            14 dni na wniesienie sprzeciwu. Brak sprzeciwu to milcząca zgoda —
            wycinkę musisz jednak przeprowadzić w ciągu 6 miesięcy od oględzin.
            Uwaga: jeżeli w ciągu 5 lat od oględzin wystąpisz o pozwolenie na
            budowę związane z działalnością gospodarczą w miejscu usuniętego
            drzewa, organ naliczy opłatę z mocą wsteczną.
          </p>
          <h3>Zezwolenie i opłaty dla firm</h3>
          <p>
            Gdy wycinka jest związana z działalnością gospodarczą, konieczne
            jest zezwolenie oraz opłata liczona jako obwód pnia na wysokości
            130 cm pomnożony przez stawkę zależną od gatunku — od kilkunastu do
            ponad 200 zł za centymetr. Za samowolną wycinkę grozi
            administracyjna kara pieniężna w wysokości dwukrotności należnej
            opłaty, dlatego zawsze warto najpierw sprawdzić formalności.
            Pamiętaj też o okresie lęgowym ptaków (1 marca – 15 października):
            jeśli w koronie są gniazda, wycinkę zaplanuj poza sezonem.
          </p>
          <h3>Zaplanuj co dalej — nowe drzewo zamiast wyciętego</h3>
          <p>
            Po wycince często warto posadzić nowe drzewo w lepszym miejscu.
            Sprawdź w naszym narzędziu{" "}
            <a href="/odleglosc-sadzenia-od-granicy">
              odległość sadzenia od granicy działki
            </a>
            , aby uniknąć sporów z sąsiadem, porównaj gatunki w{" "}
            <a href="/porownywarka-drzew">porównywarce drzew</a> pod kątem
            tempa wzrostu i docelowej wysokości, a w{" "}
            <a href="/kalkulator-cienia">kalkulatorze cienia</a> zobacz, jak
            nowe drzewo będzie zacieniać dom i taras w kolejnych latach.
          </p>
        </>
      }
    >
      <TreeRemovalCalculator />
    </CalculatorLayout>
  );
}
