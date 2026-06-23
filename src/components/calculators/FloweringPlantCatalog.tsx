"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  MONTH_LABELS,
  PLANT_CATEGORIES,
  FLOWER_COLORS,
  LIGHT_LABELS,
  FLOWERING_PLANTS_LIST,
  filterFloweringPlants,
  sortPlantsByBloomStart,
  type FloweringCatalogFilters,
  type FlowerColor,
  type PlantCategory,
  type LightNeed,
  type FloweringPlant,
} from "@/lib/constants/flowering-plants";
import type { FloweringCatalogPreset } from "@/lib/constants/flowering-catalog-presets";

interface FloweringPlantCatalogProps {
  preset?: FloweringCatalogPreset;
}

const TRAIT_FILTERS: {
  key: keyof FloweringCatalogFilters;
  label: string;
  icon: string;
}[] = [
  { key: "beeFriendly", label: "Dla pszczół", icon: "🐝" },
  { key: "butterflyFriendly", label: "Dla motyli", icon: "🦋" },
  { key: "honeyPlant", label: "Miododajne", icon: "🍯" },
  { key: "winterBloom", label: "Kwitnienie zimą", icon: "❄️" },
  { key: "ornamentalFruit", label: "Owoce ozdobne", icon: "🍒" },
  { key: "autumnColor", label: "Jesienne liście", icon: "🍂" },
];

export function FloweringPlantCatalog({ preset }: FloweringPlantCatalogProps) {
  const initial = preset?.filters ?? {};

  const [selectedMonths, setSelectedMonths] = useState<number[]>(initial.months ?? []);
  const [monthsMatch, setMonthsMatch] = useState<"any" | "all">(
    initial.monthsMatch ?? "any"
  );
  const [selectedColors, setSelectedColors] = useState<FlowerColor[]>(
    initial.colors ?? []
  );
  const [selectedCategories, setSelectedCategories] = useState<PlantCategory[]>(
    initial.categories ?? []
  );
  const [scent, setScent] = useState<"any" | "scented" | "none">(
    initial.scent ?? "any"
  );
  const [traits, setTraits] = useState<Partial<Record<keyof FloweringCatalogFilters, boolean>>>(
    () => ({
      beeFriendly: initial.beeFriendly,
      butterflyFriendly: initial.butterflyFriendly,
      honeyPlant: initial.honeyPlant,
      winterBloom: initial.winterBloom,
      ornamentalFruit: initial.ornamentalFruit,
      autumnColor: initial.autumnColor,
    })
  );

  useEffect(() => {
    if (!preset) return;
    const f = preset.filters;
    setSelectedMonths(f.months ?? []);
    setMonthsMatch(f.monthsMatch ?? "any");
    setSelectedColors(f.colors ?? []);
    setSelectedCategories(f.categories ?? []);
    setScent(f.scent ?? "any");
    setTraits({
      beeFriendly: f.beeFriendly,
      butterflyFriendly: f.butterflyFriendly,
      honeyPlant: f.honeyPlant,
      winterBloom: f.winterBloom,
      ornamentalFruit: f.ornamentalFruit,
      autumnColor: f.autumnColor,
    });
  }, [preset]);

  const activeFilters: FloweringCatalogFilters = useMemo(
    () => ({
      months: selectedMonths.length ? selectedMonths : undefined,
      monthsMatch,
      colors: selectedColors.length ? selectedColors : undefined,
      categories: selectedCategories.length ? selectedCategories : undefined,
      scent: scent === "any" ? undefined : scent,
      beeFriendly: traits.beeFriendly || undefined,
      butterflyFriendly: traits.butterflyFriendly || undefined,
      honeyPlant: traits.honeyPlant || undefined,
      winterBloom: traits.winterBloom || undefined,
      ornamentalFruit: traits.ornamentalFruit || undefined,
      autumnColor: traits.autumnColor || undefined,
      light: preset?.filters.light,
    }),
    [selectedMonths, monthsMatch, selectedColors, selectedCategories, scent, traits, preset]
  );

  const results = useMemo(
    () => sortPlantsByBloomStart(filterFloweringPlants(FLOWERING_PLANTS_LIST, activeFilters)),
    [activeFilters]
  );

  const toggleMonth = (num: number) => {
    setSelectedMonths((prev) =>
      prev.includes(num) ? prev.filter((m) => m !== num) : [...prev, num]
    );
  };

  const toggleColor = (c: FlowerColor) => {
    setSelectedColors((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  const toggleCategory = (c: PlantCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  const toggleTrait = (key: keyof FloweringCatalogFilters) => {
    setTraits((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const resetFilters = () => {
    setSelectedMonths([]);
    setMonthsMatch("any");
    setSelectedColors([]);
    setSelectedCategories([]);
    setScent("any");
    setTraits({});
  };

  return (
    <div className="space-y-8">
      {preset?.intro && (
        <p className="text-muted leading-relaxed max-w-3xl">{preset.intro}</p>
      )}

      <div className="rounded-2xl border border-border bg-card p-4 sm:p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-primary-dark">Filtry katalogu</h2>
          <button
            type="button"
            onClick={resetFilters}
            className="text-sm text-primary font-medium hover:underline"
          >
            Wyczyść filtry
          </button>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground mb-3">
            Kiedy ma kwitnąć?
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
            {MONTH_LABELS.map((m) => (
              <button
                key={m.num}
                type="button"
                onClick={() => toggleMonth(m.num)}
                className={`rounded-lg px-2 py-2 text-xs sm:text-sm font-medium transition-colors ${
                  selectedMonths.includes(m.num)
                    ? "bg-primary text-white"
                    : "border border-border bg-background text-muted hover:border-primary"
                }`}
              >
                {m.name}
              </button>
            ))}
          </div>
          {selectedMonths.length > 1 && (
            <label className="mt-3 flex items-center gap-2 text-sm text-muted cursor-pointer">
              <input
                type="checkbox"
                checked={monthsMatch === "all"}
                onChange={(e) => setMonthsMatch(e.target.checked ? "all" : "any")}
                className="rounded border-border text-primary"
              />
              Kwitnie we <strong className="text-foreground">wszystkich</strong> zaznaczonych
              miesiącach
            </label>
          )}
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground mb-3">Kolor kwiatów</p>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(FLOWER_COLORS) as FlowerColor[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => toggleColor(c)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium border transition-colors ${
                  selectedColors.includes(c)
                    ? "border-primary bg-primary/10 text-primary-dark"
                    : "border-border bg-background text-muted hover:border-primary"
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full border border-border/60 shrink-0"
                  style={{ backgroundColor: FLOWER_COLORS[c].hex }}
                />
                {FLOWER_COLORS[c].label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground mb-3">Rodzaj rośliny</p>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(PLANT_CATEGORIES) as PlantCategory[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => toggleCategory(c)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium border transition-colors ${
                  selectedCategories.includes(c)
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-background text-muted hover:border-primary"
                }`}
              >
                {PLANT_CATEGORIES[c].icon} {PLANT_CATEGORIES[c].label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground mb-3">Zapach</p>
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["any", "Wszystkie"],
                ["scented", "Pachnące"],
                ["none", "Bez zapachu"],
              ] as const
            ).map(([val, label]) => (
              <button
                key={val}
                type="button"
                onClick={() => setScent(val)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium border transition-colors ${
                  scent === val
                    ? "border-primary-dark bg-primary-dark text-white"
                    : "border-border bg-background text-muted"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground mb-3">Dodatkowe cechy</p>
          <div className="flex flex-wrap gap-2">
            {TRAIT_FILTERS.map(({ key, label, icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => toggleTrait(key)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium border transition-colors ${
                  traits[key]
                    ? "border-primary bg-accent text-primary-dark"
                    : "border-border bg-background text-muted hover:border-primary"
                }`}
              >
                {icon} {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <p className="text-sm text-muted mb-4">
          Znaleziono <strong className="text-foreground">{results.length}</strong>{" "}
          {results.length === 1 ? "roślinę" : results.length < 5 ? "rośliny" : "roślin"}
        </p>

        {results.length === 0 ? (
          <p className="text-muted text-sm rounded-xl border border-border bg-card p-6 text-center">
            Brak roślin dla tych filtrów. Spróbuj odznaczyć miesiące lub cechy.
          </p>
        ) : (
          <>
            <div className="overflow-x-auto rounded-2xl border border-border hidden sm:block">
              <table className="w-full text-sm min-w-[720px]">
                <thead className="bg-accent">
                  <tr>
                    <th className="text-left p-3 font-semibold text-primary-dark sticky left-0 bg-accent z-10 min-w-[160px]">
                      Roślina
                    </th>
                    {MONTH_LABELS.map((m) => (
                      <th
                        key={m.num}
                        className={`p-2 text-center font-semibold text-xs w-10 ${
                          selectedMonths.includes(m.num)
                            ? "text-primary bg-primary/10"
                            : "text-muted"
                        }`}
                        title={m.name}
                      >
                        {m.short}
                      </th>
                    ))}
                    <th className="text-left p-3 font-semibold text-primary-dark min-w-[80px]">
                      Kolor
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((plant) => (
                    <tr
                      key={plant.id}
                      className="border-t border-border hover:bg-accent/30 transition-colors"
                    >
                      <td className="p-3 sticky left-0 bg-card z-10">
                        <p className="font-medium text-foreground">{plant.name}</p>
                        <p className="text-xs text-muted">
                          {PLANT_CATEGORIES[plant.category].icon}{" "}
                          {PLANT_CATEGORIES[plant.category].label} · {plant.height}
                        </p>
                      </td>
                      {MONTH_LABELS.map((m) => {
                        const intensity = plant.bloomMonths[m.num];
                        return (
                          <td
                            key={m.num}
                            className={`p-2 text-center ${
                              selectedMonths.includes(m.num) ? "bg-primary/5" : ""
                            }`}
                          >
                            {intensity ? (
                              <span
                                className={intensity === "peak" ? "text-base" : "text-sm opacity-70"}
                                title={intensity === "peak" ? "Szczyt" : "Kwitnienie"}
                              >
                                🌸
                              </span>
                            ) : (
                              <span className="text-muted/30">·</span>
                            )}
                          </td>
                        );
                      })}
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1">
                          {plant.colors.slice(0, 3).map((c) => (
                            <span
                              key={c}
                              className="inline-block w-4 h-4 rounded-full border border-border/60"
                              style={{ backgroundColor: FLOWER_COLORS[c].hex }}
                              title={FLOWER_COLORS[c].label}
                            />
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <FloweringPlantDetails plants={results} />
          </>
        )}
      </div>
    </div>
  );
}

export function FloweringPlantDetails({ plants }: { plants: FloweringPlant[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 mt-6 sm:mt-8">
      {plants.map((plant) => {
        const cat = PLANT_CATEGORIES[plant.category];
        const bloomNums = Object.keys(plant.bloomMonths).map(Number).sort((a, b) => a - b);
        return (
          <article
            key={plant.id}
            className="rounded-xl border border-border bg-card p-4 sm:p-5"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-semibold text-foreground">{plant.name}</h3>
                <p className="text-xs text-muted italic">{plant.latinName}</p>
              </div>
              <span className="text-xs bg-accent px-2 py-0.5 rounded-full shrink-0">
                {cat.icon} {cat.label}
              </span>
            </div>
            <p className="text-sm text-muted leading-relaxed">{plant.description}</p>
            <div className="mt-3 overflow-x-auto">
              <div className="flex gap-0.5 min-w-max">
                {MONTH_LABELS.map((m) => {
                  const intensity = plant.bloomMonths[m.num];
                  return (
                    <div
                      key={m.num}
                      className={`w-7 text-center text-xs py-1 rounded ${
                        intensity ? "bg-primary/15" : "bg-accent/50 text-muted/40"
                      }`}
                      title={m.name}
                    >
                      {intensity ? "🌸" : m.short}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {bloomNums.map((num) => {
                const label = MONTH_LABELS.find((x) => x.num === num);
                const peak = plant.bloomMonths[num] === "peak";
                return (
                  <span
                    key={num}
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      peak ? "bg-primary/15 text-primary font-medium" : "bg-accent text-muted"
                    }`}
                  >
                    {label?.name}
                  </span>
                );
              })}
            </div>
            <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted">
              {plant.beeFriendly && <span>🐝 pszczoły</span>}
              {plant.butterflyFriendly && <span>🦋 motyle</span>}
              {plant.scent !== "none" && <span>👃 pachnące</span>}
              {plant.light.map((l) => (
                <span key={l}>{LIGHT_LABELS[l]}</span>
              ))}
            </div>
            {plant.relatedLink && (
              <Link
                href={plant.relatedLink.href}
                className="inline-block mt-3 text-sm text-primary font-medium hover:underline"
              >
                {plant.relatedLink.label} →
              </Link>
            )}
          </article>
        );
      })}
    </div>
  );
}
