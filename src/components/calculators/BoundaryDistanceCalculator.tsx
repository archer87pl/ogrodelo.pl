"use client";

import { useState } from "react";
import Link from "next/link";
import { FormField, inputClass, selectClass } from "@/components/FormField";
import { ResultCard, TipsList } from "@/components/ResultCard";
import { LegalDisclaimer } from "@/components/LegalDisclaimer";
import {
  calculateBoundaryDistance,
  PLANT_CATEGORY_OPTIONS,
  type PlantCategory,
} from "@/lib/calculators/boundary-distance";

function formatMeters(value: number): string {
  return value.toLocaleString("pl-PL", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  });
}

export function BoundaryDistanceCalculator() {
  const [category, setCategory] = useState<PlantCategory>("drzewo-male");
  const [targetHeight, setTargetHeight] = useState(6);
  const [crownWidth, setCrownWidth] = useState(4);
  const [isROD, setIsROD] = useState(false);
  const [nearUtilities, setNearUtilities] = useState(false);

  const result = calculateBoundaryDistance({
    category,
    targetHeight,
    crownWidth,
    isROD,
    nearUtilities,
  });

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
        <h2 className="text-lg font-semibold text-primary-dark">Twoje dane</h2>
        <FormField label="Co sadzisz?" htmlFor="category">
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as PlantCategory)}
            className={selectClass}
          >
            {PLANT_CATEGORY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </FormField>
        <FormField
          label="Docelowa wysokość (m)"
          htmlFor="height"
          hint="Wysokość rośliny po latach, nie w dniu sadzenia"
        >
          <input
            id="height"
            type="number"
            min={0.5}
            max={40}
            step={0.5}
            value={targetHeight}
            onChange={(e) => setTargetHeight(Number(e.target.value))}
            className={inputClass}
          />
        </FormField>
        <FormField
          label="Docelowa szerokość korony (m)"
          htmlFor="crown"
          hint="Sprawdź w opisie odmiany — decyduje o zasięgu gałęzi"
        >
          <input
            id="crown"
            type="number"
            min={0.2}
            max={20}
            step={0.5}
            value={crownWidth}
            onChange={(e) => setCrownWidth(Number(e.target.value))}
            className={inputClass}
          />
        </FormField>
        <div className="space-y-3">
          <label
            htmlFor="rod"
            className="flex items-start gap-3 text-sm text-foreground cursor-pointer"
          >
            <input
              id="rod"
              type="checkbox"
              checked={isROD}
              onChange={(e) => setIsROD(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-primary"
            />
            <span>
              Działka w ROD (Rodzinny Ogród Działkowy)
              <span className="block text-xs text-muted">
                W ROD obowiązują wiążące odległości z regulaminu
              </span>
            </span>
          </label>
          <label
            htmlFor="utilities"
            className="flex items-start gap-3 text-sm text-foreground cursor-pointer"
          >
            <input
              id="utilities"
              type="checkbox"
              checked={nearUtilities}
              onChange={(e) => setNearUtilities(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-primary"
            />
            <span>
              W pobliżu sieci wodociągowej lub gazowej
              <span className="block text-xs text-muted">
                Pokaż informację o odległościach od infrastruktury
              </span>
            </span>
          </label>
        </div>
        <p className="text-xs text-muted">Stan prawny: 2026</p>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-primary-dark">Wyniki</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <ResultCard
            label="Minimalna rozsądna odległość"
            value={formatMeters(result.recommendedDistance)}
            unit="m"
            highlight
          />
          <ResultCard
            label="Odległość bezkonfliktowa"
            value={formatMeters(result.conflictFreeDistance)}
            unit="m"
            highlight
          />
          <ResultCard
            label="Zasięg korony po latach"
            value={formatMeters(result.crownReach)}
            unit="m od pnia"
          />
          <ResultCard
            label={
              result.rodBinding
                ? "Minimum wg regulaminu ROD (wiążące)"
                : "Minimum wg regulaminu ROD (tylko w ROD)"
            }
            value={formatMeters(result.rodMinimum)}
            unit="m"
          />
        </div>

        {result.rodBinding && (
          <div className="rounded-xl border border-primary/40 bg-accent p-5 text-sm text-muted">
            <p className="font-semibold text-primary-dark mb-1">
              Działka w ROD — minimum z regulaminu jest wiążące
            </p>
            <p>
              Regulamin ROD dla kategorii „{result.rodCategoryLabel}” wymaga
              min. {formatMeters(result.rodMinimum)} m od granicy działki.
              Drzewa słabo rosnące i karłowe: min. 2 m, silnie rosnące: min. 3
              m, krzewy ozdobne: min. 1 m.
            </p>
          </div>
        )}

        {result.utilityNote && (
          <div className="rounded-xl border border-border bg-card p-5 text-sm text-muted">
            <p className="font-semibold text-primary-dark mb-1">
              Uwaga na sieci i infrastrukturę
            </p>
            <p>{result.utilityNote}</p>
          </div>
        )}

        <div className="rounded-xl border border-border bg-card p-5 text-sm text-muted space-y-2">
          <p className="font-semibold text-primary-dark">
            Co gdy gałęzie przejdą granicę?
          </p>
          <p>{result.branchesNote}</p>
          <p>
            {result.shadeNote}{" "}
            <Link
              href="/kalkulator-cienia"
              className="text-primary hover:underline"
            >
              Sprawdź kalkulator cienia
            </Link>
            .
          </p>
        </div>

        <div className="rounded-xl border border-border bg-accent/50 p-5">
          <h3 className="font-semibold text-primary-dark mb-3">
            Prawa sąsiada w skrócie (Kodeks cywilny)
          </h3>
          <ul className="space-y-2 text-sm text-muted">
            <li className="flex gap-2">
              <span className="text-primary shrink-0">•</span>
              <span>
                <strong className="text-foreground">Art. 148:</strong> owoce,
                które spadły na działkę sąsiada, należą do sąsiada.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary shrink-0">•</span>
              <span>
                <strong className="text-foreground">Art. 149:</strong> sąsiad
                może wejść na Twoją działkę, aby usunąć zwieszające się z jego
                drzew gałęzie lub owoce — ale odpowiada za wyrządzoną szkodę.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary shrink-0">•</span>
              <span>
                <strong className="text-foreground">Art. 150:</strong> sąsiad
                może wezwać Cię do usunięcia gałęzi i korzeni przechodzących na
                jego grunt, a po bezskutecznym upływie terminu — obciąć je sam.
              </span>
            </li>
          </ul>
        </div>

        <TipsList tips={result.tips} />

        <LegalDisclaimer />
      </div>
    </div>
  );
}
