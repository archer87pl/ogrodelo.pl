"use client";

import { useState } from "react";
import { FormField, inputClass, selectClass } from "@/components/FormField";
import { ResultCard, TipsList } from "@/components/ResultCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { HedgePresetNav } from "@/components/calculators/HedgePresetNav";
import {
  calculateHedge,
  HEDGE_SPECIES_OPTIONS,
  DENSITY_OPTIONS,
  ROWS_OPTIONS,
  SAPLING_SIZE_OPTIONS,
  MAIN_HEDGE_FAQ,
  getSpeciesInfo,
  type HedgeSpecies,
  type HedgeDensity,
  type HedgeRows,
  type SaplingSize,
} from "@/lib/calculators/hedge";
import type { HedgePreset } from "@/lib/constants/hedge-presets";

interface HedgeCalculatorProps {
  preset?: HedgePreset;
}

export function HedgeCalculator({ preset }: HedgeCalculatorProps) {
  const d = preset?.defaults ?? {};

  const [length, setLength] = useState(d.length ?? 10);
  const [species, setSpecies] = useState<HedgeSpecies>(d.species ?? "grab");
  const [density, setDensity] = useState<HedgeDensity>("normalna");
  const [rows, setRows] = useState<HedgeRows>(1);
  const [saplingSize, setSaplingSize] = useState<SaplingSize>("srednia");
  const [targetHeight, setTargetHeight] = useState(1.8);
  const [showFormula, setShowFormula] = useState(false);

  const speciesInfo = getSpeciesInfo(species);

  const result = calculateHedge({
    length,
    species,
    density,
    rows,
    saplingSize,
    targetPrivacyHeight: targetHeight,
  });

  const faqItems = preset
    ? [...preset.faq, ...MAIN_HEDGE_FAQ.slice(0, 3)]
    : MAIN_HEDGE_FAQ;

  const maxMilestoneHeight = Math.max(...result.milestones.map((m) => m.height));

  return (
    <div className="space-y-8">
      <HedgePresetNav currentSlug={preset?.slug} />

      {preset?.intro && (
        <p className="text-muted leading-relaxed max-w-3xl">{preset.intro}</p>
      )}

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Form */}
        <div className="lg:col-span-2 space-y-5">
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-5">
            <h2 className="text-lg font-semibold text-primary-dark">Parametry żywopłotu</h2>

            <FormField label="Długość żywopłotu (m)" htmlFor="length">
              <input
                id="length"
                type="number"
                min={1}
                step={0.5}
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className={inputClass}
              />
            </FormField>

            <FormField label="Gatunek" htmlFor="species">
              <select
                id="species"
                value={species}
                onChange={(e) => setSpecies(e.target.value as HedgeSpecies)}
                className={selectClass}
              >
                {HEDGE_SPECIES_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-muted mt-1">
                {HEDGE_SPECIES_OPTIONS.find((o) => o.value === species)?.hint}
              </p>
            </FormField>

            <div className="rounded-xl bg-accent/60 p-4 text-sm">
              <p className="font-medium text-primary-dark italic">
                {speciesInfo.latinName}
              </p>
              <p className="mt-1 text-muted text-xs leading-relaxed">
                {speciesInfo.description}
              </p>
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-card px-2 py-0.5 border border-border">
                  {speciesInfo.evergreen ? "🌲 Zimozielony" : "🍂 Liściasty"}
                </span>
                <span className="rounded-full bg-card px-2 py-0.5 border border-border">
                  Strefa {speciesInfo.frostZone}
                </span>
                <span className="rounded-full bg-card px-2 py-0.5 border border-border">
                  max {speciesInfo.maxHeight} m
                </span>
              </div>
            </div>

            <FormField label="Gęstość sadzenia" htmlFor="density">
              <select
                id="density"
                value={density}
                onChange={(e) => setDensity(e.target.value as HedgeDensity)}
                className={selectClass}
              >
                {DENSITY_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Układ sadzenia" htmlFor="rows">
              <select
                id="rows"
                value={rows}
                onChange={(e) => setRows(Number(e.target.value) as HedgeRows)}
                className={selectClass}
              >
                {ROWS_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Wielkość sadzonek" htmlFor="size">
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

            <FormField
              label="Docelowa wysokość prywatności (m)"
              htmlFor="target"
              hint="Standardowa prywatność to 1,8 m"
            >
              <input
                id="target"
                type="number"
                min={1}
                max={4}
                step={0.1}
                value={targetHeight}
                onChange={(e) => setTargetHeight(Number(e.target.value))}
                className={inputClass}
              />
            </FormField>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-3 space-y-6">
          <h2 className="text-lg font-semibold text-primary-dark">Wyniki</h2>

          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
            <ResultCard
              label="Liczba sadzonek"
              value={result.saplingCount}
              unit="szt."
              highlight
            />
            <ResultCard
              label="Na jeden rząd"
              value={result.saplingsPerRow}
              unit="szt."
            />
            <ResultCard
              label="Odstęp sadzenia"
              value={(result.spacing * 100).toFixed(0)}
              unit="cm"
            />
            <ResultCard
              label="Koszt całkowity"
              value={result.totalCost}
              unit="PLN"
              highlight
            />
            <ResultCard
              label="Cena za sadzonkę"
              value={result.pricePerSapling}
              unit="PLN"
            />
            <ResultCard
              label="Pełna prywatność za"
              value={result.privacyYears}
              unit="lat"
              highlight
            />
          </div>

          {/* Growth chart */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold text-primary-dark mb-1">
              Wykres wzrostu — {result.speciesName}
            </h3>
            <p className="text-xs text-muted mb-4">
              Wysokość (m) i % prywatności w kolejnych latach
            </p>
            <div className="flex items-end gap-1.5 sm:gap-2 h-36 sm:h-44">
              {result.milestones.map((m) => {
                const heightPct =
                  maxMilestoneHeight > 0
                    ? (m.height / maxMilestoneHeight) * 100
                    : 0;
                return (
                  <div
                    key={m.years}
                    className="flex-1 flex flex-col items-center gap-1 min-w-0"
                    title={`${m.years} lat: ${m.height} m (${m.privacyPercent}% prywatności)`}
                  >
                    <span className="text-[10px] sm:text-xs font-medium text-primary-dark">
                      {m.height}m
                    </span>
                    <div
                      className="w-full rounded-t-md bg-primary/70 transition-all relative group"
                      style={{ height: `${Math.max(heightPct, 4)}%` }}
                    >
                      <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] text-muted opacity-0 group-hover:opacity-100 whitespace-nowrap hidden sm:block">
                        {m.privacyPercent}%
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-xs text-muted">
                      {m.years === 0 ? "start" : `${m.years}l`}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 flex items-center gap-4 text-xs text-muted">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-sm bg-primary/70 inline-block" />
                Wysokość (m)
              </span>
              <span>
                Wzrost: {(result.growthPerYear * 100).toFixed(0)} cm/rok · max{" "}
                {result.maxHeight} m
              </span>
            </div>
          </div>

          {/* Privacy timeline */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold text-primary-dark mb-3">
              Kiedy osiągniesz wysokość?
            </h3>
            <div className="space-y-2">
              {result.privacyMilestones.map((m) => (
                <div
                  key={m.height}
                  className="flex items-center justify-between text-sm border-b border-border/50 pb-2 last:border-0"
                >
                  <span className="font-medium">
                    {m.height} m
                    {m.label === "pełna prywatność" && (
                      <span className="ml-1 text-primary text-xs">
                        (prywatność)
                      </span>
                    )}
                  </span>
                  <span className="text-muted">
                    za <strong className="text-foreground">{m.years} lat</strong>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Cost breakdown */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold text-primary-dark mb-3">
              Kosztorys inwestycji
            </h3>
            <div className="space-y-2">
              {result.costBreakdown.map((b) => (
                <div
                  key={b.item}
                  className="flex justify-between text-sm border-b border-border/50 pb-2 last:border-0"
                >
                  <span>
                    {b.item}{" "}
                    <span className="text-muted text-xs">({b.amount})</span>
                  </span>
                  <span className="font-medium shrink-0 ml-2">{b.cost} PLN</span>
                </div>
              ))}
              <div className="flex justify-between text-sm font-semibold pt-1">
                <span>Razem</span>
                <span className="text-primary">{result.totalCost} PLN</span>
              </div>
            </div>
            <p className="text-xs text-muted mt-2">
              Utrzymanie roczne: ~{result.maintenanceYearly} PLN (cięcie, nawóz,
              podlewanie)
            </p>
          </div>

          {/* Pruning schedule */}
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

          {/* Species comparison */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold text-primary-dark mb-3">
              Porównanie z innymi gatunkami
            </h3>
            <div className="overflow-x-auto -mx-1">
              <table className="w-full text-sm min-w-[480px]">
                <thead>
                  <tr className="text-left text-muted border-b border-border">
                    <th className="pb-2 pr-3 font-medium">Gatunek</th>
                    <th className="pb-2 pr-3 font-medium">Sadzonki</th>
                    <th className="pb-2 pr-3 font-medium">Koszt</th>
                    <th className="pb-2 pr-3 font-medium">Prywatność</th>
                    <th className="pb-2 font-medium">Typ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50 bg-accent/40">
                    <td className="py-2 pr-3 font-semibold text-primary-dark">
                      {result.speciesName} ✓
                    </td>
                    <td className="py-2 pr-3">{result.saplingCount}</td>
                    <td className="py-2 pr-3">{result.totalCost} PLN</td>
                    <td className="py-2 pr-3">{result.privacyYears} lat</td>
                    <td className="py-2">
                      {result.evergreen ? "Zimoziel." : "Liściasty"}
                    </td>
                  </tr>
                  {result.comparisons.map((c) => (
                    <tr key={c.species} className="border-b border-border/50 last:border-0">
                      <td className="py-2 pr-3">{c.name}</td>
                      <td className="py-2 pr-3">{c.saplingCount}</td>
                      <td className="py-2 pr-3">{c.totalCost} PLN</td>
                      <td className="py-2 pr-3">{c.privacyYears} lat</td>
                      <td className="py-2">
                        {c.evergreen ? "Zimoziel." : "Liściasty"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Formula */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold text-primary-dark mb-2">
              Obliczenie liczby sadzonek
            </h3>
            <p className="text-sm text-muted font-mono bg-accent/50 p-3 rounded-lg break-all">
              {result.formula}
            </p>
            <button
              type="button"
              onClick={() => setShowFormula(!showFormula)}
              className="mt-2 text-xs text-primary hover:text-primary-dark transition-colors"
            >
              {showFormula ? "Ukryj wyjaśnienie" : "Jak to liczymy? →"}
            </button>
            {showFormula && (
              <p className="mt-2 text-xs text-muted leading-relaxed">
                Dzielimy długość żywopłotu przez zalecany odstęp dla gatunku,
                zaokrąglamy w górę i dodajemy 1 sadzonkę na zamknięcie rzędu.
                Przy dwóch rzędach (szachownica) liczba podwaja się — efekt
                gęstości uzyskasz o 1–2 lata szybciej.
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
