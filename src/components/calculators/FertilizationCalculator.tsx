"use client";

import { useState } from "react";
import { FormField, inputClass, selectClass } from "@/components/FormField";
import { ResultCard, TipsList } from "@/components/ResultCard";
import {
  calculateFertilization,
  LAWN_TYPE_OPTIONS,
  FERTILIZER_OPTIONS,
  type LawnType,
  type FertilizerType,
} from "@/lib/calculators/fertilization";

export function FertilizationCalculator() {
  const [area, setArea] = useState(100);
  const [lawnType, setLawnType] = useState<LawnType>("ozdobny");
  const [fertilizer, setFertilizer] = useState<FertilizerType>("mineralny");

  const result = calculateFertilization({ area, lawnType, fertilizer });

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
        <h2 className="text-lg font-semibold text-primary-dark">Twoje dane</h2>
        <FormField label="Powierzchnia trawnika (m²)" htmlFor="area">
          <input
            id="area"
            type="number"
            min={1}
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
            className={inputClass}
          />
        </FormField>
        <FormField label="Rodzaj trawnika" htmlFor="lawn">
          <select
            id="lawn"
            value={lawnType}
            onChange={(e) => setLawnType(e.target.value as LawnType)}
            className={selectClass}
          >
            {LAWN_TYPE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Rodzaj nawozu" htmlFor="fertilizer">
          <select
            id="fertilizer"
            value={fertilizer}
            onChange={(e) => setFertilizer(e.target.value as FertilizerType)}
            className={selectClass}
          >
            {FERTILIZER_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-primary-dark">Wyniki</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <ResultCard
            label="Ilość nawozu (rocznie)"
            value={result.kgNeeded}
            unit="kg"
            highlight
          />
          <ResultCard
            label="Szacowany koszt"
            value={result.totalCost}
            unit="PLN"
            highlight
          />
          <ResultCard
            label="Zabiegi rocznie"
            value={result.applicationsPerYear}
            unit="×"
          />
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold text-primary-dark mb-3">
            📅 Harmonogram nawożenia
          </h3>
          <div className="space-y-2">
            {result.schedule.map((s) => (
              <div
                key={s.month}
                className="flex justify-between text-sm border-b border-border/50 pb-2 last:border-0"
              >
                <span className="font-medium">{s.month}</span>
                <span className="text-muted text-right">
                  {s.action} — {s.amount}
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
