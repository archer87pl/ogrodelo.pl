import type { Metadata } from "next";
import Link from "next/link";
import { IrrigationCalculator } from "@/components/calculators/IrrigationCalculator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CalculatorHero } from "@/components/CalculatorHero";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import {
  calculatorMetadata,
  jsonLdBreadcrumb,
  jsonLdCalculator,
  jsonLdFAQ,
} from "@/lib/seo";
import { MAIN_IRRIGATION_FAQ } from "@/lib/calculators/irrigation";
import { IRRIGATION_PRESETS } from "@/lib/constants/irrigation-presets";

const calc = getCalculatorBySlug("kalkulator-nawadniania")!;

export const metadata: Metadata = {
  ...calculatorMetadata(calc),
  description:
    "Najdokładniejszy darmowy kalkulator nawadniania ogrodu w Polsce. Litry, mm, harmonogram, pogoda, koszt wody i zbiornik na deszczówkę — z obliczeniami krok po kroku.",
  keywords: [
    ...calc.keywords,
    "ile wody na trawnik",
    "kalkulator podlewania trawnika",
    "mm wody na ogród",
    "harmonogram podlewania",
    "koszt podlewania ogrodu",
    "nawadnianie kroplujące kalkulator",
  ],
};

export default function Page() {
  const breadcrumb = jsonLdBreadcrumb([
    { name: "Strona główna", url: "https://ogrodelo.pl" },
    { name: "Kalkulator nawadniania", url: "https://ogrodelo.pl/kalkulator-nawadniania" },
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
          __html: JSON.stringify(jsonLdFAQ(MAIN_IRRIGATION_FAQ)),
        }}
      />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        <Breadcrumbs
          items={[
            { label: "Strona główna", href: "/" },
            { label: "Nawadnianie" },
          ]}
        />

        <CalculatorHero
          calc={calc}
          description="Oblicz ile litrów wody, mm opadu i minut podlewania potrzebuje Twój ogród. Uwzględniamy glebę, rośliny, mulcz, wiatr, sezon i prognozę pogody z Twojego miasta."
        />

        <IrrigationCalculator />

        <article className="mt-16 border-t border-border pt-12 space-y-10 text-muted leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              Jak działa kalkulator nawadniania?
            </h2>
            <p>
              Kalkulator opiera się na normach ogrodniczych stosowanych w Polsce: zapotrzebowanie
              bazowe w litrach na m² tygodniowo (trawnik 25, kwiaty 30, warzywa 35, krzewy 20,
              drzewa 15), skorygowane o współczynniki gleby, nasłonecznienia, wiatru, mulczu,
              sezonu i aktualnej pogody. Wynik uwzględnia sprawność systemu nawadniania — kroplówka
              traci tylko 10% wody, zraszacz rotacyjny ok. 25%.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              Przelicznik: litry, mm i m³
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="font-semibold text-foreground">1 mm = 1 litr / m²</p>
                <p className="text-sm mt-1">25 mm na 100 m² = 2500 litrów tygodniowo</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="font-semibold text-foreground">1 m³ = 1000 litrów</p>
                <p className="text-sm mt-1">Przy 5,5 PLN/m³ → 2500 l kosztuje 13,75 PLN</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="font-semibold text-foreground">Trawnik: 25–35 mm/tydz.</p>
                <p className="text-sm mt-1">W upały do 35 mm, wiosną ok. 15–20 mm</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              Warianty kalkulatora
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {IRRIGATION_PRESETS.map((p) => (
                <Link
                  key={p.slug}
                  href={`/kalkulator-nawadniania/${p.slug}`}
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

          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              Typ gleby a podlewanie
            </h2>
            <p>
              <strong>Piasek</strong> — niska retencja, woda spływa głęboko. Podlewaj 4× w tygodniu
              krótkimi sesjami. Współczynnik ×1,4 w kalkulatorze.
            </p>
            <p className="mt-2">
              <strong>Glina</strong> — wysoka retencja, ryzyko przelewania i chorób grzybowych.
              Podlewaj 2× w tygodniu, dłużej. Współczynnik ×0,8.
            </p>
            <p className="mt-2">
              <strong>Próchnica</strong> — optymalna struktura, współczynnik ×1,0. Podlewaj 3× w tygodniu.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              Systemy nawadniania — porównanie
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
                <thead className="bg-accent">
                  <tr>
                    <th className="text-left p-3 font-semibold text-primary-dark">System</th>
                    <th className="text-left p-3 font-semibold text-primary-dark">Sprawność</th>
                    <th className="text-left p-3 font-semibold text-primary-dark">Przepływ</th>
                    <th className="text-left p-3 font-semibold text-primary-dark">Najlepsze do</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-3">Kroplujące</td>
                    <td className="p-3">90%</td>
                    <td className="p-3">4 l/min</td>
                    <td className="p-3">Warzywnik, krzewy, rabaty</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3">Zraszacz rotacyjny</td>
                    <td className="p-3">75%</td>
                    <td className="p-3">12 l/min</td>
                    <td className="p-3">Trawnik, duże powierzchnie</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3">Deszczownica</td>
                    <td className="p-3">70%</td>
                    <td className="p-3">8 l/min</td>
                    <td className="p-3">Delikatne rośliny, szklarnie</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </article>
      </div>
    </>
  );
}
