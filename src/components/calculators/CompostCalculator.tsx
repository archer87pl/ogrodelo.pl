"use client";

import { useState } from "react";
import { FormField, inputClass, selectClass } from "@/components/FormField";
import { ResultCard, TipsList } from "@/components/ResultCard";
import {
  calculateCompost,
  type ComposterType,
} from "@/lib/calculators/compost";

const THROW_IN = [
  "skoszona trawa (podsuszona)",
  "liście i drobne resztki roślin",
  "fusy z kawy i herbaty",
  "skorupki jajek (rozgniecione)",
  "obierki warzyw i owoców",
  "rozdrobnione gałęzie i karton",
];

const KEEP_OUT = [
  "mięso, ryby i nabiał",
  "chore rośliny",
  "chwasty z nasionami",
  "skórki cytrusów w dużych ilościach",
  "popiół z węgla",
  "resztki gotowanych, tłustych potraw",
];

export function CompostCalculator() {
  const [householdSize, setHouseholdSize] = useState(3);
  const [gardenArea, setGardenArea] = useState(200);
  const [lawnArea, setLawnArea] = useState(100);
  const [kitchenScraps, setKitchenScraps] = useState(true);
  const [composterType, setComposterType] =
    useState<ComposterType>("otwarty");

  const result = calculateCompost({
    householdSize,
    gardenArea,
    lawnArea,
    kitchenScraps,
    composterType,
  });

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
          <h2 className="text-lg font-semibold text-primary-dark">
            Twoje dane
          </h2>
          <FormField label="Liczba domowników" htmlFor="household">
            <input
              id="household"
              type="number"
              min={1}
              max={20}
              value={householdSize}
              onChange={(e) => setHouseholdSize(Number(e.target.value))}
              className={inputClass}
            />
          </FormField>
          <FormField
            label="Powierzchnia ogrodu (m²)"
            htmlFor="garden"
            hint="Rabaty, warzywnik, drzewa i krzewy — bez trawnika"
          >
            <input
              id="garden"
              type="number"
              min={0}
              value={gardenArea}
              onChange={(e) => setGardenArea(Number(e.target.value))}
              className={inputClass}
            />
          </FormField>
          <FormField label="Powierzchnia trawnika (m²)" htmlFor="lawn">
            <input
              id="lawn"
              type="number"
              min={0}
              value={lawnArea}
              onChange={(e) => setLawnArea(Number(e.target.value))}
              className={inputClass}
            />
          </FormField>
          <FormField label="Typ kompostownika" htmlFor="composter-type">
            <select
              id="composter-type"
              value={composterType}
              onChange={(e) =>
                setComposterType(e.target.value as ComposterType)
              }
              className={selectClass}
            >
              <option value="otwarty">Otwarty drewniany</option>
              <option value="termokompostownik">
                Zamknięty termokompostownik
              </option>
              <option value="rotacyjny">Rotacyjny (bębnowy)</option>
            </select>
          </FormField>
          <label className="flex items-center gap-3 cursor-pointer text-sm text-foreground">
            <input
              type="checkbox"
              checked={kitchenScraps}
              onChange={(e) => setKitchenScraps(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary"
            />
            <span>Kompostuję odpady kuchenne</span>
          </label>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="font-semibold text-primary-dark mb-3">
                ✅ Wrzucaj
              </h3>
              <ul className="space-y-2 text-sm text-muted">
                {THROW_IN.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-primary shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-primary-dark mb-3">
                ⛔ Nie wrzucaj
              </h3>
              <ul className="space-y-2 text-sm text-muted">
                {KEEP_OUT.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-primary shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-primary-dark">Wyniki</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <ResultCard
            label="Rekomendowana pojemność"
            value={result.capacityLabel}
            highlight
          />
          <ResultCard
            label="Sugerowane wymiary skrzyni"
            value={result.dimensionsLabel}
          />
          <ResultCard
            label="Gotowy kompost po"
            value={result.readyAfterLabel}
          />
          <ResultCard
            label="Materiał do kompostowania"
            value={result.annualInputLiters}
            unit="l/rok"
          />
          <ResultCard
            label="Ilość kompostu rocznie"
            value={`~${result.compostKgPerYear} kg`}
            unit={`(${result.compostLitersPerYear} l)`}
          />
          <ResultCard
            label="Oszczędność vs kupny kompost"
            value={result.savingsPlnPerYear}
            unit="PLN/rok"
          />
        </div>

        <TipsList tips={result.tips} />
      </div>
    </div>
  );
}
