import type { Metadata } from "next";
import Link from "next/link";
import {
  FloweringPlantCatalog,
} from "@/components/calculators/FloweringPlantCatalog";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedTools } from "@/components/RelatedTools";
import { CalculatorHero } from "@/components/CalculatorHero";
import { FAQAccordion } from "@/components/FAQAccordion";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import {
  MONTH_LABELS,
  MONTH_LOCATIVE_SLUGS,
  MAIN_FLOWERING_FAQ,
  filterFloweringPlants,
  FLOWERING_PLANTS_LIST,
} from "@/lib/constants/flowering-plants";
import { FLOWERING_PRESETS_UNIQUE } from "@/lib/constants/flowering-catalog-presets";
import {
  calculatorMetadata,
  jsonLdBreadcrumb,
  jsonLdCalculator,
  jsonLdFAQ,
  SITE_URL,
} from "@/lib/seo";

const calc = getCalculatorBySlug("katalog-kwitnienia")!;

export const metadata: Metadata = {
  ...calculatorMetadata(calc),
  description:
    "Katalog roślin kwitnących: filtruj po miesiącu, kolorze, zapachu i pszczołach. Co kwitnie w maju, lipcu lub całe lato? 108 gatunków z tabelą kwitnienia i opisami.",
};

export default function Page() {
  const breadcrumbs = [
    { label: "Strona główna", href: "/" },
    { label: "Katalog kwitnienia" },
  ];

  const featuredPresets = FLOWERING_PRESETS_UNIQUE.filter((p) =>
    [
      "rosliny-kwitnace-w-maju",
      "rosliny-kwitnace-w-lipcu",
      "kwitnace-calym-latem",
      "rosliny-dla-pszczol",
      "biale-kwiaty-do-cienia",
      "drzewa-kwitnace-na-rozowo",
    ].includes(p.slug)
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator(calc)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdBreadcrumb([
              { name: "Strona główna", url: SITE_URL },
              { name: "Katalog kwitnienia", url: `${SITE_URL}/katalog-kwitnienia` },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdFAQ(MAIN_FLOWERING_FAQ)),
        }}
      />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        <Breadcrumbs items={breadcrumbs} />

        <CalculatorHero
          calc={calc}
          description="Wybierz miesiące kwitnienia, kolor i cechy — znajdź drzewa, krzewy i byliny dopasowane do Twojego ogrodu. Tabela kwitnienia I–XII."
        />

        <FloweringPlantCatalog />

        <article className="mt-12 sm:mt-16 border-t border-border pt-8 sm:pt-12 space-y-10 text-muted leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              Popularne wyszukiwania
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {featuredPresets.map((p) => (
                <Link
                  key={p.slug}
                  href={`/katalog-kwitnienia/${p.slug}`}
                  className="rounded-xl border border-border bg-card p-4 hover:border-primary transition-colors group"
                >
                  <p className="font-semibold text-foreground group-hover:text-primary">
                    {p.title.split("—")[0]?.trim()}
                  </p>
                  <p className="text-sm mt-1 line-clamp-2">{p.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              Kwitnienie miesiąc po miesiącu
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {MONTH_LABELS.map((m) => {
                const count = filterFloweringPlants(FLOWERING_PLANTS_LIST, {
                  months: [m.num],
                }).length;
                return (
                  <Link
                    key={m.slug}
                    href={`/katalog-kwitnienia/rosliny-kwitnace-w-${MONTH_LOCATIVE_SLUGS[m.num]}`}
                    className="rounded-xl border border-border bg-card p-4 hover:border-primary transition-colors group flex justify-between items-center"
                  >
                    <span className="font-semibold text-foreground group-hover:text-primary">
                      Co kwitnie w {m.locative}?
                    </span>
                    <span className="text-sm text-muted">{count} gat.</span>
                  </Link>
                );
              })}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">FAQ</h2>
            <FAQAccordion items={MAIN_FLOWERING_FAQ} />
          </section>
        </article>

        <RelatedTools currentSlug="katalog-kwitnienia" />
      </div>
    </>
  );
}
