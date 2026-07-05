import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { GardenDesigner } from "@/components/garden-designer/GardenDesigner";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import { GARDEN_DESIGNER_FAQ } from "@/lib/calculators/simple-calculator-faqs";
import { calculatorMetadata } from "@/lib/seo";

const calc = getCalculatorBySlug("projektant-ogrodu")!;

export const metadata: Metadata = {
  ...calculatorMetadata(calc),
  description:
    "Darmowy projektant ogrodu: rysuj plan działki na siatce 1 m, przeciągaj dom, ścieżki, ogrodzenie i rośliny. Zapis w przeglądarce i automatyczna lista materiałów w PLN.",
  keywords: [
    ...calc.keywords,
    "rysowanie planu ogrodu",
    "canvas ogrodu",
    "biblioteka obiektów ogrodowych",
    "plan działki 2D",
    "lista zakupów ogród",
    "projekt ogrodu ręcznie",
    "siatka metrowa ogród",
  ],
};

export default function Page() {
  return (
    <CalculatorLayout
      calc={calc}
      faqs={GARDEN_DESIGNER_FAQ}
      description="Narysuj plan działki: dom, ścieżki, ogrodzenie i rośliny. Przeciągaj elementy, zapisz projekt w przeglądarce i wygeneruj listę materiałów."
      seoContent={
        <>
          <h2>Jak korzystać z projektanta ogrodu?</h2>
          <ol>
            <li>Ustaw wymiary działki (np. 20×15 m).</li>
            <li>Wybierz element z biblioteki — dom, altanę, ścieżkę, trawnik, ogrodzenie, drzewo, tuję.</li>
            <li>
              <strong>Umieść</strong> — kliknij na planie (drzewa, dom) lub <strong>przeciągnij prostokąt</strong>{" "}
              (trawnik, ścieżka, rabata).
            </li>
            <li>
              <strong>Ogrodzenie</strong> — klikaj kolejne punkty, potem „Zakończ linię”.
            </li>
            <li>
              Tryb <strong>Wybierz</strong> — przeciągnij element, usuń zaznaczone.
            </li>
            <li>Zapisz projekt — dane trzymamy w przeglądarce (localStorage).</li>
          </ol>
          <p>
            Lista materiałów aktualizuje się na bieżąco: rolawnik, kostka, słupki ogrodzeniowe, sadzonki.
            Pełny kosztorys z rekomendacjami roślin znajdziesz w{" "}
            <Link href="/generator-planu-ogrodu">generatorze planu ogrodu (ankieta)</Link> lub policz żywopłot w{" "}
            <Link href="/kalkulator-zywoplotu">kalkulatorze żywopłotu</Link>.
          </p>
        </>
      }
    >
      <GardenDesigner />
    </CalculatorLayout>
  );
}
