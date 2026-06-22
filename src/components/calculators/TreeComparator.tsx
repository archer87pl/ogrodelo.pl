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
import { TreePresetNav } from "@/components/calculators/TreePresetNav";
import {
  compareTrees,
  TREE_SPECIES_OPTIONS,
  MAIN_TREE_FAQ,
  type TreeSpecies,
} from "@/lib/calculators/tree-comparator";
import { getPairSlug } from "@/lib/constants/tree-presets";
import type { TreePreset } from "@/lib/constants/tree-presets";

interface TreeComparatorProps {
  preset?: TreePreset;
}

const DEFAULT_A: TreeSpecies = "dab";
const DEFAULT_B: TreeSpecies = "sosna";

export function TreeComparator({ preset }: TreeComparatorProps) {
  const d = preset?.defaults ?? {};

  const [speciesA, setSpeciesA] = useState<TreeSpecies>(d.speciesA ?? DEFAULT_A);
  const [speciesB, setSpeciesB] = useState<TreeSpecies>(d.speciesB ?? DEFAULT_B);

  const result = useMemo(
    () => compareTrees(speciesA, speciesB),
    [speciesA, speciesB]
  );

  const pairSlug = getPairSlug(speciesA, speciesB);
  const faqItems = preset
    ? [...preset.faq, ...MAIN_TREE_FAQ.slice(0, 3)]
    : MAIN_TREE_FAQ;

  const categories = [...new Set(result.comparisonRows.map((r) => r.category))];

  function swapSpecies() {
    setSpeciesA(speciesB);
    setSpeciesB(speciesA);
  }

  return (
    <div className="space-y-8">
      <TreePresetNav currentSlug={preset?.slug} />

      {preset?.intro && (
        <p className="text-muted leading-relaxed max-w-3xl">{preset.intro}</p>
      )}

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-4">
            <h2 className="font-semibold text-primary-dark">Wybierz drzewa</h2>

            <FormField label="Drzewo A" htmlFor="tree-a">
              <select
                id="tree-a"
                className={selectClass}
                value={speciesA}
                onChange={(e) => setSpeciesA(e.target.value as TreeSpecies)}
              >
                {TREE_SPECIES_OPTIONS.map((o) => (
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
                aria-label="Zamień drzewa miejscami"
              >
                ⇄ Zamień
              </button>
            </div>

            <FormField label="Drzewo B" htmlFor="tree-b">
              <select
                id="tree-b"
                className={selectClass}
                value={speciesB}
                onChange={(e) => setSpeciesB(e.target.value as TreeSpecies)}
              >
                {TREE_SPECIES_OPTIONS.map((o) => (
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
                  href={`/porownywarka-drzew/${pairSlug}`}
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
              <p className="text-sm text-muted mt-1">{result.speciesA.description}</p>
            </div>
            <div className="border-t border-border pt-3">
              <p className="font-semibold text-primary-dark">{result.speciesB.name}</p>
              <p className="text-xs text-muted italic">{result.speciesB.latinName}</p>
              <p className="text-sm text-muted mt-1">{result.speciesB.description}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <h2 className="font-semibold text-primary-dark mb-4">
              📈 Wzrost w czasie (1–50 lat)
            </h2>
            <GrowthLineChart
              dataA={result.heightCurveA}
              dataB={result.heightCurveB}
              labelA={result.speciesA.name}
              labelB={result.speciesB.name}
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
              🌳 Dopasowanie do warunków (0–10)
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
            {result.speciesA.name} vs {result.speciesB.name} — zaznaczone wygrywające wartości
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead className="bg-accent">
              <tr>
                <th className="text-left p-3 font-semibold text-primary-dark w-[28%]">
                  Parametr
                </th>
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
