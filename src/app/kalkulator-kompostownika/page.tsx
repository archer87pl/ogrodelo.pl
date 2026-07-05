import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { CompostCalculator } from "@/components/calculators/CompostCalculator";
import { COMPOST_FAQ } from "@/lib/calculators/compost";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import { calculatorMetadata } from "@/lib/seo";

const calc = getCalculatorBySlug("kalkulator-kompostownika")!;

export const metadata: Metadata = calculatorMetadata(calc);

export default function Page() {
  return (
    <CalculatorLayout
      calc={calc}
      faqs={COMPOST_FAQ}
      seoContent={
        <>
          <h2>Jak dobrać wielkość kompostownika?</h2>
          <p>
            Zbyt mały kompostownik przepełnia się już w połowie sezonu, a zbyt
            duży nie nagrzewa się prawidłowo i rozkład trwa dłużej. Punktem
            wyjścia jest ilość materiału, którą realnie wytwarzasz w ciągu
            roku: odpady kuchenne to ok. 0,5–1 l na osobę dziennie, skoszona
            trawa daje ok. 1–2 l z m² trawnika rocznie, a liście i resztki
            roślinne ok. 2 l z każdego m² ogrodu. Dla 3-osobowej rodziny z
            trawnikiem 100 m² i ogrodem 200 m² wychodzi ok. 1400 l materiału
            rocznie.
          </p>
          <p>
            Nie potrzebujesz jednak skrzyni o takiej objętości. Pryzma osiada w
            trakcie rozkładu i traci ok. połowę objętości, więc wystarczy
            kompostownik o pojemności ok. 50% rocznego wsadu — w tym przykładzie
            600–800 l, czyli skrzynia ok. 0,9 × 0,9 × 0,9 m. Typowe pojemności
            dostępne w sklepach to 400, 600, 800, 1000 i 1600 l.
          </p>
          <h3>Otwarty, termokompostownik czy rotacyjny?</h3>
          <p>
            Otwarta drewniana skrzynia jest najtańsza (od ok. 150–300 PLN lub
            za darmo z palet), ale kompostowanie trwa w niej 12–24 miesiące.
            Zamknięty termokompostownik z tworzywa utrzymuje wyższą temperaturę
            i skraca proces do 6–8 miesięcy. Kompostownik rotacyjny (bębnowy)
            pozwala uzyskać gotowy kompost nawet w 2–3 miesiące, ale ma
            zwykle mniejszą pojemność i sprawdza się przy małych ogrodach.
          </p>
          <h3>Co zyskujesz na własnym kompoście?</h3>
          <p>
            Z rocznego wsadu zostaje ok. 30% objętości dojrzałego kompostu.
            Przeciętny ogród daje więc 300–500 l własnego nawozu rocznie — przy
            cenie kupnego kompostu workowanego ok. 1,5 PLN/l to 450–750 PLN
            oszczędności każdego sezonu. Dojrzały kompost stosuj w dawce 2–5
            l/m² wiosną; dokładne dawki dla poszczególnych roślin policzysz w{" "}
            <a href="/kalkulator-nawozenia">kalkulatorze nawożenia</a>.
          </p>
          <p>
            Kompost to też najlepszy start dla warzywnika — grządki zasilone
            jesienią są gotowe do wiosennych siewów, które zaplanujesz w{" "}
            <a href="/kalkulator-siewu-warzyw">kalkulatorze siewu warzyw</a>.
            A jeśli zakładasz nowe rabaty i potrzebujesz policzyć, ile podłoża
            dokupić, sprawdź{" "}
            <a href="/kalkulator-ziemi-i-kory">kalkulator ziemi i kory</a>.
          </p>
          <h3>Trzy zasady udanego kompostu</h3>
          <p>
            Po pierwsze: mieszaj materiały zielone z brązowymi w proporcji ok.
            1:2 — sama trawa gnije, same liście rozkładają się latami. Po
            drugie: przerzucaj pryzmę co 4–6 tygodni, żeby ją napowietrzyć. Po
            trzecie: pilnuj wilgotności wyciśniętej gąbki — w upały podlej
            pryzmę, w deszczowe tygodnie przykryj ją, a proces będzie
            przebiegał bez zapachów i bez przestojów.
          </p>
        </>
      }
    >
      <CompostCalculator />
    </CalculatorLayout>
  );
}
