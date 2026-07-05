import type { Metadata } from "next";
import Link from "next/link";
import { HedgeCalculator } from "@/components/calculators/HedgeCalculator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedTools } from "@/components/RelatedTools";
import { CalculatorHero } from "@/components/CalculatorHero";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import { HEDGE_PRESETS } from "@/lib/constants/hedge-presets";
import { MAIN_HEDGE_FAQ, HEDGE_SPECIES_OPTIONS } from "@/lib/calculators/hedge";
import {
  calculatorMetadata,
  jsonLdBreadcrumb,
  jsonLdCalculator,
  jsonLdFAQ,
  SITE_URL,
} from "@/lib/seo";

const calc = getCalculatorBySlug("kalkulator-zywoplotu")!;

export const metadata: Metadata = {
  ...calculatorMetadata(calc),
  description:
    "Najlepszy kalkulator żywopłotu w Polsce. 12 gatunków, wykres wzrostu, kosztorys, harmonogram cięcia i porównanie gatunków. Grab, cis, laurowiśnia, ligustr i więcej.",
  keywords: [
    ...calc.keywords,
    "żywopłot grab kalkulator",
    "ile sadzonek na żywopłot",
    "koszt żywopłotu za metr",
    "wysokość żywopłotu po latach",
    "odstępy sadzenia żywopłot",
    "porównanie gatunków żywopłot",
  ],
};

export default function Page() {
  const breadcrumb = jsonLdBreadcrumb([
    { name: "Strona główna", url: SITE_URL },
    { name: "Kalkulator żywopłotu", url: `${SITE_URL}/kalkulator-zywoplotu` },
  ]);

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdFAQ(MAIN_HEDGE_FAQ)),
        }}
      />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        <Breadcrumbs
          items={[
            { label: "Strona główna", href: "/" },
            { label: "Żywopłot" },
          ]}
        />

        <CalculatorHero
          calc={calc}
          description="Oblicz sadzonki, koszt, wykres wzrostu i czas do pełnej prywatności. 12 gatunków, dwa rzędy, gęstość sadzenia i pełny kosztorys."
        />

        <HedgeCalculator />

        <article className="mt-12 sm:mt-16 border-t border-border pt-8 sm:pt-12 space-y-10 text-muted leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              Jak obliczyć liczbę sadzonek na żywopłot?
            </h2>
            <p>
              Wzór: <strong>⌈długość ÷ odstęp⌉ + 1</strong>. Dla grabu przy 10 m:
              ⌈10 ÷ 0,3⌉ + 1 = 35 sadzonek. Każdy gatunek ma inny zalecany odstęp —
              laurowiśnia co 50 cm, ligustr co 35 cm, bambus co 60 cm.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              Porównanie gatunków żywopłotowych
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-xl overflow-hidden min-w-[600px]">
                <thead className="bg-accent">
                  <tr>
                    <th className="text-left p-3 font-semibold text-primary-dark">Gatunek</th>
                    <th className="text-left p-3 font-semibold text-primary-dark">Odstęp</th>
                    <th className="text-left p-3 font-semibold text-primary-dark">Wzrost/rok</th>
                    <th className="text-left p-3 font-semibold text-primary-dark">Typ</th>
                    <th className="text-left p-3 font-semibold text-primary-dark">Prywatność</th>
                  </tr>
                </thead>
                <tbody>
                  {HEDGE_SPECIES_OPTIONS.slice(0, 8).map((s) => {
                    const hints = s.hint.split(" · ");
                    return (
                      <tr key={s.value} className="border-t border-border">
                        <td className="p-3 font-medium text-foreground">{s.label}</td>
                        <td className="p-3">co 25–60 cm</td>
                        <td className="p-3">{hints[1] ?? "—"}</td>
                        <td className="p-3">{hints[0] ?? "—"}</td>
                        <td className="p-3">3–8 lat</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              Warianty kalkulatora
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {HEDGE_PRESETS.map((p) => (
                <Link
                  key={p.slug}
                  href={`/kalkulator-zywoplotu/${p.slug}`}
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

        <RelatedTools currentSlug="kalkulator-zywoplotu" />
      </div>
    </>
  );
}
