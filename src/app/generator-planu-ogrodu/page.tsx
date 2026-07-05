import type { Metadata } from "next";
import Link from "next/link";
import { GardenPlanGenerator } from "@/components/calculators/GardenPlanGenerator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedTools } from "@/components/RelatedTools";
import { CalculatorHero } from "@/components/CalculatorHero";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import { GARDEN_PLAN_PRESETS } from "@/lib/constants/garden-plan-presets";
import { MAIN_GARDEN_PLAN_FAQ } from "@/lib/calculators/garden-plan";
import {
  calculatorMetadata,
  jsonLdBreadcrumb,
  jsonLdCalculator,
  jsonLdFAQ,
  SITE_URL,
} from "@/lib/seo";

const calc = getCalculatorBySlug("generator-planu-ogrodu")!;

export const metadata: Metadata = {
  ...calculatorMetadata(calc),
  description:
    "Darmowy generator planu ogrodu z rysunkiem działki 2D: strefy, kosztorys PLN, lista zakupów, kalendarz pielęgnacji 12 miesięcy i harmonogram 4 faz. Wydrukuj lub udostępnij plan.",
  keywords: [
    ...calc.keywords,
    "plan ogrodu online",
    "projekt ogrodu koszt",
    "jak zaplanować ogród",
    "generator ogrodu",
    "projekt ogrodu online za darmo",
    "rozplanowanie ogrodu",
    "plan zagospodarowania działki ogród",
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCalculator(calc)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdBreadcrumb([
              { name: "Strona główna", url: SITE_URL },
              { name: "Generator planu ogrodu", url: `${SITE_URL}/generator-planu-ogrodu` },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ(MAIN_GARDEN_PLAN_FAQ)) }}
      />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        <Breadcrumbs
          items={[
            { label: "Strona główna", href: "/" },
            { label: "Generator planu" },
          ]}
        />

        <CalculatorHero
          calc={calc}
          description="Wypełnij ankietę — otrzymasz rysunek działki 2D z rozmieszczeniem stref, listę roślin i zakupów z ilościami, kosztorys w PLN, kalendarz pielęgnacji na 12 miesięcy i harmonogram realizacji. Plan wydrukujesz jako PDF lub udostępnisz linkiem."
        />

        <GardenPlanGenerator />

        <article className="mt-12 sm:mt-16 border-t border-border pt-8 sm:pt-12 space-y-10 text-muted leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              Jak działa generator?
            </h2>
            <p>
              Algorytm analizuje wymiary działki, ekspozycję względem stron świata, cele (trawnik,
              warzywa, prywatność…), glebę, nasłonecznienie i budżet. Na tej podstawie rysuje
              schematyczny plan 2D w skali z rozmieszczeniem stref, oblicza ich proporcje, szacuje
              koszty materiałów w PLN, tworzy listę zakupów z konkretnymi ilościami oraz układa
              harmonogram 4 faz i kalendarz pielęgnacji na cały rok. Rekomendacje łączą plan
              z innymi narzędziami Ogrodelo.pl.
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              <li>🗺️ Rysunek działki 2D w skali — strefy, ścieżka, żywopłot, drzewa</li>
              <li>🛒 Lista zakupów z ilościami: nasiona, sadzonki, kora, grządki</li>
              <li>📅 Kalendarz pielęgnacji 12 miesięcy dopasowany do planu</li>
              <li>🔗 Link do udostępnienia planu i wydruk do PDF</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              Wolisz rysować plan?
            </h2>
            <p>
              Użyj{" "}
              <Link href="/projektant-ogrodu" className="text-primary font-medium hover:underline">
                projektanta ogrodu
              </Link>{" "}
              — przeciągnij dom, ścieżki, ogrodzenie i rośliny na siatce, zapisz projekt i wygeneruj
              listę materiałów.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              Gotowe scenariusze
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {GARDEN_PLAN_PRESETS.filter((p) => p.slug !== "ankieta").map((p) => (
                <Link
                  key={p.slug}
                  href={`/generator-planu-ogrodu/${p.slug}`}
                  className="rounded-xl border border-border bg-card p-4 hover:border-primary transition-colors group"
                >
                  <p className="font-semibold text-foreground group-hover:text-primary">
                    {p.title}
                  </p>
                  <p className="text-sm mt-1 line-clamp-2">{p.description}</p>
                </Link>
              ))}
            </div>
          </section>
        </article>

        <RelatedTools currentSlug="generator-planu-ogrodu" />
      </div>
    </>
  );
}
