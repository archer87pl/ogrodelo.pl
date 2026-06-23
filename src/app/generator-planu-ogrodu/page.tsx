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
} from "@/lib/seo";

const calc = getCalculatorBySlug("generator-planu-ogrodu")!;

export const metadata: Metadata = {
  ...calculatorMetadata(calc),
  description:
    "Darmowy generator planu ogrodu: ankieta 6 kroków, podział na strefy, kosztorys PLN, harmonogram 4 faz i rekomendacje roślin.",
  keywords: [
    ...calc.keywords,
    "plan ogrodu online",
    "projekt ogrodu koszt",
    "jak zaplanować ogród",
    "generator ogrodu",
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
              { name: "Strona główna", url: "https://www.ogrodelo.pl" },
              { name: "Generator planu ogrodu", url: "https://www.ogrodelo.pl/generator-planu-ogrodu" },
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
          description="Wypełnij ankietę — otrzymasz podział na strefy, listę roślin, kosztorys w PLN, harmonogram realizacji i linki do kalkulatorów nawadniania, żywopłotu i drzew."
        />

        <GardenPlanGenerator />

        <article className="mt-12 sm:mt-16 border-t border-border pt-8 sm:pt-12 space-y-10 text-muted leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              Jak działa generator?
            </h2>
            <p>
              Algorytm analizuje powierzchnię, cele (trawnik, warzywa, prywatność…), glebę,
              nasłonecznienie i budżet. Na tej podstawie oblicza proporcje stref, szacuje koszty
              materiałów w PLN i układa harmonogram 4 faz sezonowych. Rekomendacje łączą plan
              z innymi narzędziami Ogrodelo.pl.
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
