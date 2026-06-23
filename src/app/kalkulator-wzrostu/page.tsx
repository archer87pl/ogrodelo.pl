import type { Metadata } from "next";
import Link from "next/link";
import { GrowthCalculator } from "@/components/calculators/GrowthCalculator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedTools } from "@/components/RelatedTools";
import { CalculatorHero } from "@/components/CalculatorHero";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import { GROWTH_PRESETS } from "@/lib/constants/growth-presets";
import { MAIN_GROWTH_FAQ, GROWTH_SPECIES_OPTIONS } from "@/lib/calculators/growth";
import {
  calculatorMetadata,
  jsonLdBreadcrumb,
  jsonLdCalculator,
  jsonLdFAQ,
} from "@/lib/seo";

const calc = getCalculatorBySlug("kalkulator-wzrostu")!;

export const metadata: Metadata = {
  ...calculatorMetadata(calc),
  description:
    "Kalkulator wzrostu 12 gatunków: grab, tuja, laurowiśnia, cis, bambus i więcej. Wykres wysokości, porównanie, harmonogram cięcia — za darmo.",
  keywords: [
    ...calc.keywords,
    "ile rośnie tuja",
    "wysokość grabu po latach",
    "wzrost laurowiśni",
    "porównanie wzrostu roślin",
    "ile rośnie wierzba",
  ],
};

export default function Page() {
  const breadcrumbs = [
    { label: "Strona główna", href: "/" },
    { label: "Wzrost roślin" },
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
              { name: "Strona główna", url: "https://www.ogrodelo.pl" },
              { name: "Kalkulator wzrostu", url: "https://www.ogrodelo.pl/kalkulator-wzrostu" },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdFAQ(MAIN_GROWTH_FAQ)),
        }}
      />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        <Breadcrumbs items={breadcrumbs} />

        <CalculatorHero
          calc={calc}
          description="Sprawdź wysokość po latach, wykres wzrostu, szerokość korony i porównaj 12 gatunków. Grab, tuja, cis, bambus — z harmonogramem cięcia."
        />

        <GrowthCalculator />

        <article className="mt-12 sm:mt-16 border-t border-border pt-8 sm:pt-12 space-y-10 text-muted leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              Jak obliczamy wzrost roślin?
            </h2>
            <p>
              Wzór: <strong>wysokość = sadzonka + (tempo wzrostu × lata)</strong>,
              z ograniczeniem do maksymalnej wysokości gatunku. Dane oparte na
              średnich wartościach dla polskiego klimatu w ogrodzie domowym.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              Tempo wzrostu — ranking
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-xl overflow-hidden min-w-[500px]">
                <thead className="bg-accent">
                  <tr>
                    <th className="text-left p-3 font-semibold text-primary-dark">Gatunek</th>
                    <th className="text-left p-3 font-semibold text-primary-dark">cm/rok</th>
                    <th className="text-left p-3 font-semibold text-primary-dark">Max wys.</th>
                    <th className="text-left p-3 font-semibold text-primary-dark">Typ</th>
                  </tr>
                </thead>
                <tbody>
                  {[...GROWTH_SPECIES_OPTIONS]
                    .sort((a, b) => {
                      const ga = parseInt(a.hint.split("·")[1] ?? "0");
                      const gb = parseInt(b.hint.split("·")[1] ?? "0");
                      return gb - ga;
                    })
                    .map((s) => (
                      <tr key={s.value} className="border-t border-border">
                        <td className="p-3 font-medium text-foreground">{s.label}</td>
                        <td className="p-3">{s.hint.split("·")[1]?.trim() ?? "—"}</td>
                        <td className="p-3">{s.hint.split("·")[2]?.trim() ?? "—"}</td>
                        <td className="p-3">{s.hint.split("·")[0]?.trim() ?? "—"}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              Kalkulator wg gatunku
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {GROWTH_PRESETS.map((p) => (
                <Link
                  key={p.slug}
                  href={`/kalkulator-wzrostu/${p.slug}`}
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

        <RelatedTools currentSlug="kalkulator-wzrostu" />
      </div>
    </>
  );
}
