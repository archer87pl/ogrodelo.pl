import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { BoundaryDistanceCalculator } from "@/components/calculators/BoundaryDistanceCalculator";
import { BOUNDARY_DISTANCE_FAQ } from "@/lib/calculators/boundary-distance";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import { calculatorMetadata } from "@/lib/seo";

const calc = getCalculatorBySlug("odleglosc-sadzenia-od-granicy")!;

export const metadata: Metadata = calculatorMetadata(calc);

const linkClass = "text-primary hover:underline";

export default function Page() {
  return (
    <CalculatorLayout
      calc={calc}
      faqs={BOUNDARY_DISTANCE_FAQ}
      seoContent={
        <>
          <h2>Jak daleko od granicy działki sadzić drzewa i krzewy?</h2>
          <p>
            Wbrew powszechnemu przekonaniu polskie prawo nie podaje jednej,
            sztywnej odległości sadzenia drzew i krzewów od granicy działki.
            Kodeks cywilny reguluje stosunki sąsiedzkie ogólnie: art. 144 KC
            zakazuje tzw. immisji, czyli zakłócania korzystania z nieruchomości
            sąsiednich ponad przeciętną miarę, a art. 148–150 KC rozstrzygają,
            co dzieje się z owocami, gałęziami i korzeniami, które przekroczą
            granicę. W praktyce oznacza to, że drzewo możesz posadzić nawet
            tuż przy płocie — ale wszystkie skutki tej decyzji (obcięte
            gałęzie, spory, zacienienie) poniesiesz sam. Dlatego nasz
            kalkulator wyznacza odległość praktyczną: taką, przy której korona
            dorosłej rośliny nie przekroczy granicy, a ryzyko konfliktu z
            sąsiadem będzie minimalne.
          </p>
          <h3>Wyjątek: Rodzinne Ogrody Działkowe i infrastruktura</h3>
          <p>
            Zupełnie inaczej wygląda sytuacja na działce w ROD. Regulamin
            Rodzinnych Ogrodów Działkowych zawiera konkretne, wiążące
            działkowca minimalne odległości od granicy działki: drzewa słabo
            rosnące i karłowe należy sadzić co najmniej 2 m od granicy, drzewa
            silnie rosnące co najmniej 3 m, a krzewy ozdobne co najmniej 1 m.
            Drugi wyjątek to sieci i infrastruktura — od wodociągu czy
            gazociągu zwyczajowo zachowuje się 1,5–2 m, aby korzenie nie
            uszkodziły przewodów, a ewentualna naprawa sieci nie wymagała
            wycinki. Przed sadzeniem większych drzew warto sprawdzić przebieg
            instalacji na mapie zasadniczej działki.
          </p>
          <h3>Gałęzie, korzenie i owoce za granicą działki</h3>
          <p>
            Kodeks cywilny precyzyjnie dzieli prawa sąsiadów. Owoce, które
            spadły na grunt sąsiada, stają się jego własnością (art. 148 KC).
            Sąsiad może też wejść na Twoją działkę, aby usunąć zwieszające się
            z jego drzew gałęzie i owoce (art. 149 KC). Najważniejszy w
            praktyce jest art. 150 KC: jeśli gałęzie lub korzenie Twojego
            drzewa przejdą na grunt sąsiada, ten może wyznaczyć Ci termin na
            ich usunięcie, a po jego bezskutecznym upływie obciąć je
            samodzielnie i zachować dla siebie. Właśnie dlatego warto sadzić z
            zapasem — odległość „bezkonfliktowa” z kalkulatora zakłada, że
            korona nigdy nie sięgnie granicy. Pamiętaj też, że usunięcie
            dorosłego drzewa bywa sformalizowane — zanim chwycisz za piłę,
            sprawdź nasze narzędzie{" "}
            <Link href="/wycinka-drzewa" className={linkClass}>
              wycinka drzewa — zgłoszenie czy zezwolenie
            </Link>
            .
          </p>
          <h3>Żywopłot przy granicy i cień na działce sąsiada</h3>
          <p>
            Żywopłot formowany, regularnie przycinany do 2 m, można prowadzić
            już 0,5 m od ogrodzenia — to najpopularniejsze rozwiązanie na
            granicy działek. Liczbę sadzonek, rozstaw i koszt policzysz w{" "}
            <Link href="/kalkulator-zywoplotu" className={linkClass}>
              kalkulatorze żywopłotu
            </Link>
            . Z wyższymi nasadzeniami uważaj na zacienienie: rząd wysokich tui
            czy dorodny klon potrafi na wiele godzin dziennie pozbawić słońca
            warzywnik sąsiada, a uporczywe zacienienie może zostać uznane za
            immisję z art. 144 KC. Zanim posadzisz wysoką roślinę przy
            granicy, oszacuj długość rzucanego cienia w{" "}
            <Link href="/kalkulator-cienia" className={linkClass}>
              kalkulatorze cienia
            </Link>{" "}
            — zimą, przy nisko wiszącym słońcu, cień bywa kilkukrotnie dłuższy
            niż wysokość drzewa.
          </p>
          <p>
            Najlepszym zabezpieczeniem pozostaje jednak zwykła rozmowa z
            sąsiadem przed sadzeniem i krótkie potwierdzenie ustaleń na
            piśmie. Stan prawny: 2026.
          </p>
        </>
      }
    >
      <BoundaryDistanceCalculator />
    </CalculatorLayout>
  );
}
