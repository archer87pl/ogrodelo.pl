"use client";

import { useState } from "react";
import { FormField, inputClass } from "@/components/FormField";
import { ResultCard, TipsList } from "@/components/ResultCard";
import { calculatePrivacy } from "@/lib/calculators/privacy";

export function PrivacyCalculator() {
  const [fenceHeight, setFenceHeight] = useState(1.8);
  const [neighborDistance, setNeighborDistance] = useState(5);
  const [buildingHeight, setBuildingHeight] = useState(6);

  const result = calculatePrivacy({
    fenceHeight,
    neighborDistance,
    buildingHeight,
  });

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
        <h2 className="text-lg font-semibold text-primary-dark">Twoje dane</h2>
        <FormField label="Wysokość ogrodzenia (m)" htmlFor="fence">
          <input
            id="fence"
            type="number"
            min={0.5}
            step={0.1}
            value={fenceHeight}
            onChange={(e) => setFenceHeight(Number(e.target.value))}
            className={inputClass}
          />
        </FormField>
        <FormField label="Odległość od sąsiada (m)" htmlFor="distance">
          <input
            id="distance"
            type="number"
            min={1}
            value={neighborDistance}
            onChange={(e) => setNeighborDistance(Number(e.target.value))}
            className={inputClass}
          />
        </FormField>
        <FormField label="Wysokość budynku sąsiada (m)" htmlFor="building">
          <input
            id="building"
            type="number"
            min={3}
            value={buildingHeight}
            onChange={(e) => setBuildingHeight(Number(e.target.value))}
            className={inputClass}
          />
        </FormField>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-primary-dark">Wyniki</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <ResultCard
            label="Wymagana wysokość roślin"
            value={result.requiredPlantHeight}
            unit="m"
            highlight
          />
          <ResultCard
            label="Zasłonisz widok za"
            value={result.yearsToBlock}
            unit="lat"
            highlight
          />
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold text-primary-dark mb-3">
            Polecane gatunki
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.recommendedSpecies.map((s) => (
              <span
                key={s}
                className="rounded-full bg-accent px-3 py-1 text-sm font-medium text-primary-dark"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold text-primary-dark mb-3">
            🗓️ Symulacja sezonowa
          </h3>
          <div className="space-y-2">
            {result.seasonalSimulation.map((s) => (
              <div
                key={s.season}
                className="flex items-center justify-between text-sm border-b border-border/50 pb-2 last:border-0"
              >
                <span className="font-medium">
                  {s.season} ({s.months})
                </span>
                <span className="text-muted">
                  {s.effectiveHeight} m{" "}
                  {s.blocked ? "✅ zasłonięte" : "⏳ rośnie"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <TipsList tips={result.tips} />
      </div>
    </div>
  );
}
