import type { Metadata } from "next";
import Link from "next/link";
import { TreeComparator } from "@/components/calculators/TreeComparator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CalculatorHero } from "@/components/CalculatorHero";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import { TREE_PRESETS } from "@/lib/constants/tree-presets";
import { TREE_SPECIES_OPTIONS, MAIN_TREE_FAQ } from "@/lib/calculators/tree-comparator";
import {
  calculatorMetadata,
  jsonLdBreadcrumb,
  jsonLdCalculator,
  jsonLdFAQ,
} from "@/lib/seo";

const calc = getCalculatorBySlug("porownywarka-drzew")!;

export const metadata: Metadata = {
  ...calculatorMetadata(calc),
  description:
    "Porównaj dąb, sosnę, kasztanowiec, modrzew i 12 innych drzew. Wzrost na 50 lat, woda, korzenie, cień, koszt sadzonki — wykresy i tabela parametrów.",
  keywords: [
    ...calc.keywords,
    "dąb czy sosna",
    "porównanie drzew ogrodowych",
    "które drzewo do ogrodu",
    "dab vs sosna",
    "szybkość wzrostu drzew",
  ],
};

export default function Page() {
  const breadcrumbs = [
    { label: "Strona główna", href: "/" },
    { label: "Porównywarka drzew" },
  ];

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
              { name: "Strona główna", url: "https://ogrodelo.pl" },
              { name: "Porównywarka drzew", url: "https://ogrodelo.pl/porownywarka-drzew" },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdFAQ(MAIN_TREE_FAQ)),
        }}
      />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        <Breadcrumbs items={breadcrumbs} />

        <CalculatorHero
          calc={calc}
          description="Dąb vs sosna, kasztan vs lipa, modrzew vs sosna — porównaj 16 drzew: wzrost, wodę, korzenie, cień i koszt. 4 wykresy, pełna tabela 25+ parametrów."
        />

        <TreeComparator />

        <article className="mt-12 sm:mt-16 border-t border-border pt-8 sm:pt-12 space-y-10 text-muted leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              Jak porównujemy drzewa?
            </h2>
            <p>
              Dane oparte na średnich wartościach dla polskiego klimatu (strefy 6–8).
              Wzrost liczymy od wysokości sadzonki w wieku 2–3 lat. Wysokość po latach:
              <strong> sadzonka + (przyrost × lata)</strong>, z ograniczeniem do maksimum gatunku.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              Dostępne gatunki
            </h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {TREE_SPECIES_OPTIONS.map((s) => (
                <div
                  key={s.value}
                  className="rounded-xl border border-border bg-card px-4 py-3 text-sm"
                >
                  <span className="font-semibold text-foreground">{s.label}</span>
                  <span className="text-muted"> — {s.hint}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              Popularne porównania
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {TREE_PRESETS.filter((p) => p.slug.includes("-vs-")).map((p) => (
                <Link
                  key={p.slug}
                  href={`/porownywarka-drzew/${p.slug}`}
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
      </div>
    </>
  );
}
