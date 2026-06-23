import type { Metadata } from "next";
import Link from "next/link";
import { ShrubComparator } from "@/components/calculators/ShrubComparator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedTools } from "@/components/RelatedTools";
import { CalculatorHero } from "@/components/CalculatorHero";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import { SHRUB_PRESETS } from "@/lib/constants/shrub-presets";
import { SHRUB_SPECIES_OPTIONS, MAIN_SHRUB_FAQ } from "@/lib/calculators/shrub-comparator";
import {
  calculatorMetadata,
  jsonLdBreadcrumb,
  jsonLdCalculator,
  jsonLdFAQ,
} from "@/lib/seo";

const calc = getCalculatorBySlug("porownywarka-krzewow")!;

export const metadata: Metadata = {
  ...calculatorMetadata(calc),
  description:
    "Porównaj laurowiśnię, tuię, ostrokrzew, berberys i 8 innych krzewów. Wzrost, żywopłot, choroby, woda — wykresy i tabela parametrów.",
  keywords: [
    ...calc.keywords,
    "laurowiśnia czy tuja",
    "porównanie krzewów",
    "krzew na żywopłot",
    "zamiennik tui krzew",
  ],
};

export default function Page() {
  const breadcrumbs = [
    { label: "Strona główna", href: "/" },
    { label: "Porównywarka krzewów" },
  ];

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
              { name: "Porównywarka krzewów", url: "https://www.ogrodelo.pl/porownywarka-krzewow" },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ(MAIN_SHRUB_FAQ)) }}
      />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        <Breadcrumbs items={breadcrumbs} />

        <CalculatorHero
          calc={calc}
          description="Laurowiśnia vs tuja, berberys vs bukszpan — porównaj 12 krzewów: wzrost, żywopłot, zimozieloność, choroby i koszt. 4 wykresy i pełna tabela."
        />

        <ShrubComparator />

        <article className="mt-12 sm:mt-16 border-t border-border pt-8 sm:pt-12 space-y-10 text-muted leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              Jak porównujemy krzewy?
            </h2>
            <p>
              Skala dostosowana do krzewów ogrodowych (wysokość do 4 m). Uwzględniamy
              zastosowanie na żywopłot, zimozieloność i kwitnienie — parametry kluczowe przy
              wyborze między laurowiśnią, tuią a krzewami ozdobnymi.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">12 gatunków</h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {SHRUB_SPECIES_OPTIONS.map((s) => (
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
              {SHRUB_PRESETS.filter((p) => p.slug.includes("-vs-")).map((p) => (
                <Link
                  key={p.slug}
                  href={`/porownywarka-krzewow/${p.slug}`}
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

        <RelatedTools currentSlug="porownywarka-krzewow" />
      </div>
    </>
  );
}
