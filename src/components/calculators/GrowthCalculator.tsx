"use client";

import { useState } from "react";
import { FormField, inputClass, selectClass } from "@/components/FormField";
import { ResultCard, TipsList } from "@/components/ResultCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { SeasonalBarChart } from "@/components/SeasonalBarChart";
import { GrowthPresetNav } from "@/components/calculators/GrowthPresetNav";
import {
  calculateGrowth,
  GROWTH_SPECIES_OPTIONS,
  SAPLING_SIZE_OPTIONS,
  MAIN_GROWTH_FAQ,
  getSpeciesInfo,
  type GrowthSpecies,
  type SaplingSize,
} from "@/lib/calculators/growth";
import type { GrowthPreset } from "@/lib/constants/growth-presets";

interface GrowthCalculatorProps {
  preset?: GrowthPreset;
}

export function GrowthCalculator({ preset }: GrowthCalculatorProps) {
  const d = preset?.defaults ?? {};

  const [species, setSpecies] = useState<GrowthSpecies>(d.species ?? "grab");
  const [saplingSize, setSaplingSize] = useState<SaplingSize>("srednia");
  const [targetHeight, setTargetHeight] = useState(d.targetHeight ?? 2.0);
  const [currentAge, setCurrentAge] = useState(0);
  const [showFormula, setShowFormula] = useState(false);

  const speciesInfo = getSpeciesInfo(species);
  const result = calculateGrowth({
    species,
    saplingSize,
    targetHeight,
    currentAge,
  });

  const faqItems = preset
    ? [...preset.faq, ...MAIN_GROWTH_FAQ.slice(0, 3)]
    : MAIN_GROWTH_FAQ;

  return (
    <div className="space-y-8">
      <GrowthPresetNav currentSlug={preset?.slug} />

      {preset?.intro && (
        <p className="text-muted leading-relaxed max-w-3xl">{preset.intro}</p>
      )}

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-5">
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-5">
            <h2 className="text-lg font-semibold text-primary-dark">Parametry</h2>

            <FormField label="Gatunek rośliny" htmlFor="species">
              <select
                id="species"
                value={species}
                onChange={(e) => setSpecies(e.target.value as GrowthSpecies)}
                className={selectClass}
              >
                {GROWTH_SPECIES_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-muted mt-1">
                {GROWTH_SPECIES_OPTIONS.find((o) => o.value === species)?.hint}
              </p>
            </FormField>

            <div className="rounded-xl bg-accent/60 p-4 text-sm">
              <p className="font-medium italic text-primary-dark">
                {speciesInfo.latinName}
              </p>
              <p className="mt-1 text-xs text-muted leading-relaxed">
                {speciesInfo.description}
              </p>
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-card px-2 py-0.5 border border-border">
                  {speciesInfo.evergreen ? "🌲 Zimozielony" : "🍂 Liściasty"}
                </span>
                <span className="rounded-full bg-card px-2 py-0.5 border border-border">
                  Strefa {speciesInfo.frostZone}
                </span>
                {speciesInfo.hedgeSuitable && (
                  <span className="rounded-full bg-card px-2 py-0.5 border border-border">
                    ✂️ Na żywopłot
                  </span>
                )}
              </div>
            </div>

            <FormField label="Wielkość sadzonki" htmlFor="size">
              <select
                id="size"
                value={saplingSize}
                onChange={(e) => setSaplingSize(e.target.value as SaplingSize)}
                className={selectClass}
              >
                {SAPLING_SIZE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Docelowa wysokość (m)" htmlFor="target">
              <input
                id="target"
                type="number"
                min={0.5}
                max={15}
                step={0.1}
                value={targetHeight}
                onChange={(e) => setTargetHeight(Number(e.target.value))}
                className={inputClass}
              />
            </FormField>

            <FormField
              label="Wiek rośliny dziś (lata)"
              htmlFor="age"
              hint="Jeśli roślina już rośnie — wpisz aktualny wiek"
            >
              <input
                id="age"
                type="number"
                min={0}
                max={50}
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                className={inputClass}
              />
            </FormField>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <h2 className="text-lg font-semibold text-primary-dark">
            Wzrost: {result.speciesName}
          </h2>

          <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
            {result.milestones
              .filter((m) => m.years > 0)
              .slice(0, 4)
              .map((m) => (
                <ResultCard
                  key={m.years}
                  label={`Po ${m.years} ${m.years === 1 ? "roku" : "latach"}`}
                  value={m.height}
                  unit="m"
                  highlight={m.years === 5}
                />
              ))}
          </div>

          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
            <ResultCard
              label="Wzrost roczny"
              value={(result.growthPerYear * 100).toFixed(0)}
              unit="cm"
              highlight
            />
            <ResultCard
              label={`Cel ${targetHeight} m za`}
              value={result.yearsToTarget}
              unit="lat"
            />
            <ResultCard
              label="Maks. wysokość"
              value={result.maxHeight}
              unit="m"
            />
            <ResultCard
              label="Korona po 10 latach"
              value={result.crownWidthAt10}
              unit="m"
            />
            <ResultCard
              label="Do maks. wysokości"
              value={result.yearsToMax}
              unit="lat"
            />
            <ResultCard
              label="Cięcia rocznie"
              value={result.pruningsPerYear}
              unit="×"
            />
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold text-primary-dark mb-4">
              Wykres wzrostu wysokości
            </h3>
            <SeasonalBarChart
              data={result.milestones.map((m) => ({
                label: m.years === 0 ? "start" : `${m.years}l`,
                value: m.height,
                sublabel: m.crownWidth ? `korona ${m.crownWidth}m` : undefined,
                active: m.years === 5,
              }))}
              unit="m"
              ariaLabel={`Wykres wzrostu ${result.speciesName}`}
              hint={`Wzór: ${result.formula}. Słupki pokazują wysokość w metrach.`}
            />
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold text-primary-dark mb-3">
              Kiedy osiągniesz wysokość?
            </h3>
            <div className="space-y-2">
              {result.heightMilestones.map((m) => (
                <div
                  key={m.height}
                  className="flex justify-between text-sm border-b border-border/50 pb-2 last:border-0"
                >
                  <span className="font-medium">
                    {m.height} m
                    {m.label === "twój cel" && (
                      <span className="text-primary text-xs ml-1">(cel)</span>
                    )}
                  </span>
                  <span className="text-muted">
                    za <strong className="text-foreground">{m.years} lat</strong>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 overflow-x-auto">
            <h3 className="font-semibold text-primary-dark mb-3">
              Porównanie z innymi gatunkami
            </h3>
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="text-left text-muted border-b border-border">
                  <th className="pb-2 pr-3 font-medium">Gatunek</th>
                  <th className="pb-2 pr-3 font-medium">cm/rok</th>
                  <th className="pb-2 pr-3 font-medium">Po 5 latach</th>
                  <th className="pb-2 pr-3 font-medium">Po 10 latach</th>
                  <th className="pb-2 font-medium">Typ</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50 bg-accent/40">
                  <td className="py-2 pr-3 font-semibold text-primary-dark">
                    {result.speciesName} ✓
                  </td>
                  <td className="py-2 pr-3">
                    {(result.growthPerYear * 100).toFixed(0)}
                  </td>
                  <td className="py-2 pr-3">
                    {result.milestones.find((m) => m.years === 5)?.height} m
                  </td>
                  <td className="py-2 pr-3">
                    {result.milestones.find((m) => m.years === 10)?.height} m
                  </td>
                  <td className="py-2">
                    {result.evergreen ? "Zimoziel." : "Liściasty"}
                  </td>
                </tr>
                {result.comparisons.map((c) => (
                  <tr key={c.species} className="border-b border-border/50 last:border-0">
                    <td className="py-2 pr-3">{c.name}</td>
                    <td className="py-2 pr-3">{(c.growthPerYear * 100).toFixed(0)}</td>
                    <td className="py-2 pr-3">{c.heightAt5Years} m</td>
                    <td className="py-2 pr-3">{c.heightAt10Years} m</td>
                    <td className="py-2">{c.evergreen ? "Zimoziel." : "Liściasty"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold text-primary-dark mb-3">
              Harmonogram cięcia
            </h3>
            <div className="space-y-2">
              {result.pruningSchedule.map((p) => (
                <div
                  key={p.season}
                  className="flex flex-col sm:flex-row sm:justify-between text-sm border-b border-border/50 pb-2 last:border-0 gap-1"
                >
                  <span className="font-medium">
                    {p.season}{" "}
                    <span className="text-muted font-normal">({p.months})</span>
                  </span>
                  <span className="text-muted sm:text-right sm:max-w-[55%]">
                    {p.action}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <button
              type="button"
              onClick={() => setShowFormula(!showFormula)}
              className="text-sm font-semibold text-primary-dark hover:text-primary transition-colors"
            >
              {showFormula ? "Ukryj wzór wzrostu" : "Pokaż wzór wzrostu →"}
            </button>
            {showFormula && (
              <p className="mt-2 text-xs text-muted font-mono bg-accent/50 p-3 rounded-lg">
                wysokość = {result.formula}
              </p>
            )}
          </div>

          <TipsList tips={result.tips} />
        </div>
      </div>

      <FAQAccordion items={faqItems} />
    </div>
  );
}
