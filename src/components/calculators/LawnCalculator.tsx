"use client";

import { useState } from "react";
import { FormField, inputClass } from "@/components/FormField";
import { ResultCard, TipsList } from "@/components/ResultCard";
import { calculateLawn } from "@/lib/calculators/lawn";

export function LawnCalculator() {
  const [area, setArea] = useState(50);
  const result = calculateLawn({ area });

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
        <h2 className="text-lg font-semibold text-primary-dark">Twoje dane</h2>
        <FormField label="Powierzchnia (m²)" htmlFor="area">
          <input
            id="area"
            type="number"
            min={1}
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
            className={inputClass}
          />
        </FormField>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-primary-dark">Wyniki</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <ResultCard label="Nasiona" value={result.seedKg} unit="kg" />
          <ResultCard label="Ziemia" value={result.soilM3} unit="m³" />
          <ResultCard label="Nawóz" value={result.fertilizerKg} unit="kg" />
          <ResultCard
            label="Koszt całkowity"
            value={result.totalCost}
            unit="PLN"
            highlight
          />
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold text-primary-dark mb-3">
            Szczegółowy kosztorys
          </h3>
          <div className="space-y-2">
            {result.breakdown.map((b) => (
              <div
                key={b.item}
                className="flex justify-between text-sm border-b border-border/50 pb-2 last:border-0"
              >
                <span>
                  {b.item}{" "}
                  <span className="text-muted">({b.amount})</span>
                </span>
                <span className="font-medium">{b.cost} PLN</span>
              </div>
            ))}
          </div>
        </div>

        <TipsList tips={result.tips} />
      </div>
    </div>
  );
}
