"use client";

import { Fragment, useMemo, useState } from "react";
import Link from "next/link";
import { FormField, selectClass } from "@/components/FormField";
import { TipsList } from "@/components/ResultCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { GrowthLineChart } from "@/components/charts/GrowthLineChart";
import { ComparisonBarChart } from "@/components/charts/ComparisonBarChart";
import { ScoreBarChart } from "@/components/charts/ScoreBarChart";
import { WaterGrowthScatter } from "@/components/charts/WaterGrowthScatter";
import { ShrubPresetNav } from "@/components/calculators/ShrubPresetNav";
import {
  compareShrubs,
  SHRUB_SPECIES_OPTIONS,
  MAIN_SHRUB_FAQ,
  type ShrubSpecies,
} from "@/lib/calculators/shrub-comparator";
import { getShrubPairSlug } from "@/lib/constants/shrub-presets";
import type { ShrubPreset } from "@/lib/constants/shrub-presets";

interface ShrubComparatorProps {
  preset?: ShrubPreset;
}

const DEFAULT_A: ShrubSpecies = "laurowisnia";
const DEFAULT_B: ShrubSpecies = "tuja";

export function ShrubComparator({ preset }: ShrubComparatorProps) {
  const d = preset?.defaults ?? {};

  const [speciesA, setSpeciesA] = useState<ShrubSpecies>(d.speciesA ?? DEFAULT_A);
  const [speciesB, setSpeciesB] = useState<ShrubSpecies>(d.speciesB ?? DEFAULT_B);

  const result = useMemo(
    () => compareShrubs(speciesA, speciesB),
    [speciesA, speciesB]
  );

  const pairSlug = getShrubPairSlug(speciesA, speciesB);
  const faqItems = preset
    ? [...preset.faq, ...MAIN_SHRUB_FAQ.slice(0, 3)]
    : MAIN_SHRUB_FAQ;

  const categories = [...new Set(result.comparisonRows.map((r) => r.category))];

  function swapSpecies() {
    setSpeciesA(speciesB);
    setSpeciesB(speciesA);
  }

  return (
    <div className="space-y-8">
      <ShrubPresetNav currentSlug={preset?.slug} />

      {preset?.intro && (
        <p className="text-muted leading-relaxed max-w-3xl">{preset.intro}</p>
      )}

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-4">
            <h2 className="font-semibold text-primary-dark">Wybierz krzewy</h2>

            <FormField label="Krzew A" htmlFor="shrub-a">
              <select
                id="shrub-a"
                className={selectClass}
                value={speciesA}
                onChange={(e) => setSpeciesA(e.target.value as ShrubSpecies)}
              >
                {SHRUB_SPECIES_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label} — {o.hint}
                  </option>
                ))}
              </select>
            </FormField>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={swapSpecies}
                className="rounded-full border border-border px-4 py-1.5 text-sm text-muted hover:border-primary hover:text-primary transition-colors"
                aria-label="Zamień krzewy miejscami"
              >
                ⇄ Zamień
              </button>
            </div>

            <FormField label="Krzew B" htmlFor="shrub-b">
              <select
                id="shrub-b"
                className={selectClass}
                value={speciesB}
                onChange={(e) => setSpeciesB(e.target.value as ShrubSpecies)}
              >
                {SHRUB_SPECIES_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value} disabled={o.value === speciesA}>
                    {o.label} — {o.hint}
                  </option>
                ))}
              </select>
            </FormField>

            {pairSlug && pairSlug !== preset?.slug && (
              <p className="text-xs text-muted">
                Dedykowana strona SEO:{" "}
                <Link
                  href={`/porownywarka-krzewow/${pairSlug}`}
                  className="text-primary hover:underline"
                >
                  {result.speciesA.name} vs {result.speciesB.name}
                </Link>
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-border bg-accent/40 p-5">
            <p className="text-sm font-semibold text-primary-dark mb-2">Werdykt</p>
            <p className="text-sm text-muted leading-relaxed">{result.verdict}</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
            <div>
              <p className="font-semibold text-primary-dark">{result.speciesA.name}</p>
              <p className="text-xs text-muted italic">{result.speciesA.latinName}</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {result.speciesA.evergreen && (
                  <span className="text-xs rounded-full bg-accent px-2 py-0.5 text-primary-dark">Zimozielony</span>
                )}
                {result.speciesA.hedgeSuitable && (
                  <span className="text-xs rounded-full bg-accent px-2 py-0.5 text-primary-dark">Żywopłot</span>
                )}
                {result.speciesA.flowering && (
                  <span className="text-xs rounded-full bg-accent px-2 py-0.5 text-primary-dark">Kwitnący</span>
                )}
              </div>
              <p className="text-sm text-muted mt-2">{result.speciesA.description}</p>
            </div>
            <div className="border-t border-border pt-3">
              <p className="font-semibold text-primary-dark">{result.speciesB.name}</p>
              <p className="text-xs text-muted italic">{result.speciesB.latinName}</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {result.speciesB.evergreen && (
                  <span className="text-xs rounded-full bg-accent px-2 py-0.5 text-primary-dark">Zimozielony</span>
                )}
                {result.speciesB.hedgeSuitable && (
                  <span className="text-xs rounded-full bg-accent px-2 py-0.5 text-primary-dark">Żywopłot</span>
                )}
                {result.speciesB.flowering && (
                  <span className="text-xs rounded-full bg-accent px-2 py-0.5 text-primary-dark">Kwitnący</span>
                )}
              </div>
              <p className="text-sm text-muted mt-2">{result.speciesB.description}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <h2 className="font-semibold text-primary-dark mb-4">
              📈 Wzrost w czasie (1–20 lat)
            </h2>
            <GrowthLineChart
              dataA={result.heightCurveA}
              dataB={result.heightCurveB}
              labelA={result.speciesA.name}
              labelB={result.speciesB.name}
              ariaLabel="Wykres wzrostu wysokości krzewu w czasie"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
              <h2 className="font-semibold text-primary-dark mb-4 text-sm sm:text-base">
                📊 Ranking parametrów
              </h2>
              <ComparisonBarChart
                metrics={result.barMetrics}
                labelA={result.speciesA.name}
                labelB={result.speciesB.name}
              />
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
              <h2 className="font-semibold text-primary-dark mb-4 text-sm sm:text-base">
                💧 Woda vs wzrost
              </h2>
              <WaterGrowthScatter points={result.scatterPoints} />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <h2 className="font-semibold text-primary-dark mb-4">
              🌿 Dopasowanie do warunków (0–10)
            </h2>
            <ScoreBarChart
              scoresA={result.fitScoresA}
              scoresB={result.fitScoresB}
              labelA={result.speciesA.name}
              labelB={result.speciesB.name}
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-border">
          <h2 className="font-semibold text-primary-dark text-lg">
            Tabela porównawcza — wszystkie parametry
          </h2>
          <p className="text-sm text-muted mt-1">
            {result.speciesA.name} vs {result.speciesB.name}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead className="bg-accent">
              <tr>
                <th className="text-left p-3 font-semibold text-primary-dark w-[28%]">Parametr</th>
                <th className="text-left p-3 font-semibold text-primary-dark w-[36%]">
                  {result.speciesA.name}
                </th>
                <th className="text-left p-3 font-semibold text-primary-dark w-[36%]">
                  {result.speciesB.name}
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <Fragment key={cat}>
                  <tr className="bg-accent/50">
                    <td colSpan={3} className="p-2 px-3 text-xs font-bold text-primary-dark uppercase tracking-wide">
                      {cat}
                    </td>
                  </tr>
                  {result.comparisonRows
                    .filter((r) => r.category === cat)
                    .map((row) => (
                      <tr key={row.metric} className="border-t border-border">
                        <td className="p-3 font-medium text-foreground">{row.metric}</td>
                        <td
                          className={`p-3 ${
                            row.winner === "a"
                              ? "bg-primary/10 font-semibold text-primary-dark"
                              : "text-muted"
                          }`}
                        >
                          {row.valueA}
                        </td>
                        <td
                          className={`p-3 ${
                            row.winner === "b"
                              ? "bg-primary/10 font-semibold text-primary-dark"
                              : "text-muted"
                          }`}
                        >
                          {row.valueB}
                        </td>
                      </tr>
                    ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <TipsList tips={result.tips} />
      <FAQAccordion items={faqItems} />
    </div>
  );
}
