import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { SoilBarkCalculator } from "@/components/calculators/SoilBarkCalculator";
import { SOIL_BARK_FAQ } from "@/lib/calculators/soil-bark";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import { calculatorMetadata } from "@/lib/seo";

const calc = getCalculatorBySlug("kalkulator-ziemi-i-kory")!;

export const metadata: Metadata = calculatorMetadata(calc);

export default function Page() {
  return (
    <CalculatorLayout
      calc={calc}
      faqs={SOIL_BARK_FAQ}
      seoContent={
        <>
          <h2>Ile ziemi, kory lub żwiru potrzebujesz? Prosty wzór</h2>
          <p>
            Obliczenie jest zawsze takie samo: powierzchnia (m²) × grubość
            warstwy (m) = objętość (m³). Rabata 20 m² wysypana korą warstwą 5 cm
            to 20 × 0,05 = 1 m³, czyli równo 20 worków po 50 l. Do podniesienia
            terenu o 10 cm na 100 m² działki potrzeba już 10 m³ ziemi — to
            ładunek całej wywrotki i ok. 12 t masy. Kalkulator liczy objętość,
            liczbę worków, wagę i porównuje koszt zakupu w workach z zakupem
            luzem.
          </p>
          <h3>Jaka grubość warstwy dla poszczególnych materiałów?</h3>
          <p>
            Kora sosnowa najlepiej pracuje w warstwie 5 cm — poniżej 3 cm nie
            zatrzyma chwastów, powyżej 8 cm może dusić płytko korzeniące się
            rośliny. Ziemia pod nowy trawnik wymaga 10–15 cm przesiewanej
            warstwy urodzajnej; jeśli planujesz siew, sprawdź też{" "}
            <a href="/kalkulator-trawnika">kalkulator trawnika</a>, który
            policzy ilość nasion i nawozu startowego. Żwir ozdobny układa się
            warstwą 5–8 cm na agrowłókninie, a torf kwaśny pod borówki wymaga
            wymiany gleby na głębokość 20–30 cm. Kompost stosuje się cieniej:
            2–5 cm rocznie w zupełności wystarczy jako nawóz organiczny —
            dokładne dawki policzysz w{" "}
            <a href="/kalkulator-nawozenia">kalkulatorze nawożenia</a>.
          </p>
          <h3>Worki czy luzem — co się bardziej opłaca?</h3>
          <p>
            W 1 m³ mieści się 20 worków po 50 l. Przy cenie 12 PLN za worek
            ziemi ogrodowej metr sześcienny „w workach” kosztuje 240 PLN,
            podczas gdy luzem ta sama ziemia to ok. 90 PLN/m³ plus 100–200 PLN
            za transport wywrotką. Dlatego próg opłacalności zakupu luzem wypada
            zwykle przy 1–1,5 m³. Poniżej tej ilości worki są nie tylko tańsze,
            ale i wygodniejsze — łatwo je rozłożyć po ogrodzie bez taczki i
            łopaty.
          </p>
          <h3>Pamiętaj o wadze i zapasie</h3>
          <p>
            Ziemia waży ok. 1,2 t/m³, żwir nawet 1,65 t/m³, a lekka kora tylko
            0,35 t/m³. Typowa przyczepka samochodowa (750 kg DMC) pomieści więc
            zaledwie pół metra sześciennego ziemi, ale aż 2 m³ kory. Zamawiając
            ziemię lub kompost, dodaj 10–15% zapasu na osiadanie, a korę
            uzupełniaj co 1–2 sezony, bo naturalnie się rozkłada. Jeśli obok
            rabat planujesz też ścieżki lub podjazd, ilość podbudowy i piasku
            policzysz w{" "}
            <a href="/kalkulator-kostki-brukowej">
              kalkulatorze kostki brukowej
            </a>
            .
          </p>
        </>
      }
    >
      <SoilBarkCalculator />
    </CalculatorLayout>
  );
}
