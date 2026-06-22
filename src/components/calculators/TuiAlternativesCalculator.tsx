"use client";

import { useState } from "react";
import { FormField, inputClass, selectClass } from "@/components/FormField";
import { TipsList } from "@/components/ResultCard";
import {
  calculateTuiAlternatives,
  CLIMATE_ZONE_OPTIONS,
  GROWTH_SPEED_OPTIONS,
  type ClimateZone,
  type GrowthSpeed,
} from "@/lib/calculators/tui-alternatives";

export function TuiAlternativesCalculator() {
  const [zone, setZone] = useState<ClimateZone>("6b");
  const [targetHeight, setTargetHeight] = useState(2);
  const [evergreen, setEvergreen] = useState(true);
  const [growthSpeed, setGrowthSpeed] = useState<GrowthSpeed>("sredni");

  const result = calculateTuiAlternatives({
    zone,
    targetHeight,
    evergreen,
    growthSpeed,
  });

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
        <h2 className="text-lg font-semibold text-primary-dark">Twoje wymagania</h2>
        <FormField label="Strefa klimatyczna" htmlFor="zone">
          <select
            id="zone"
            value={zone}
            onChange={(e) => setZone(e.target.value as ClimateZone)}
            className={selectClass}
          >
            {CLIMATE_ZONE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Docelowa wysokość (m)" htmlFor="height">
          <input
            id="height"
            type="number"
            min={0.5}
            step={0.5}
            value={targetHeight}
            onChange={(e) => setTargetHeight(Number(e.target.value))}
            className={inputClass}
          />
        </FormField>
        <FormField label="Zimozielone?" htmlFor="evergreen">
          <select
            id="evergreen"
            value={evergreen ? "tak" : "nie"}
            onChange={(e) => setEvergreen(e.target.value === "tak")}
            className={selectClass}
          >
            <option value="tak">Tak — całoroczne liście</option>
            <option value="nie">Nie — liściaste</option>
          </select>
        </FormField>
        <FormField label="Tempo wzrostu" htmlFor="speed">
          <select
            id="speed"
            value={growthSpeed}
            onChange={(e) => setGrowthSpeed(e.target.value as GrowthSpeed)}
            className={selectClass}
          >
            {GROWTH_SPEED_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-primary-dark">
          Alternatywy dla tui
        </h2>
        {result.alternatives.map((plant) => (
          <div
            key={plant.name}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-foreground">{plant.name}</p>
                <p className="text-sm italic text-muted">{plant.latinName}</p>
              </div>
              <span className="rounded-full bg-accent px-3 py-1 text-sm font-medium text-primary-dark">
                {plant.matchScore}% dopasowanie
              </span>
            </div>
            <div className="mt-2 flex gap-3 text-xs text-muted">
              <span>max {plant.maxHeight} m</span>
              <span>·</span>
              <span>{(plant.growthPerYear * 100).toFixed(0)} cm/rok</span>
              <span>·</span>
              <span>{plant.evergreen ? "zimozielony" : "liściasty"}</span>
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 text-sm">
              <div>
                <p className="font-medium text-primary text-xs mb-1">Zalety</p>
                <ul className="text-muted space-y-0.5">
                  {plant.pros.map((p) => (
                    <li key={p}>✅ {p}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-xs mb-1 text-muted">Wady</p>
                <ul className="text-muted space-y-0.5">
                  {plant.cons.map((c) => (
                    <li key={c}>⚠️ {c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
        <TipsList tips={result.tips} />
      </div>
    </div>
  );
}
