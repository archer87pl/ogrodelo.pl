"use client";

import { useState } from "react";
import { FormField, inputClass } from "@/components/FormField";
import { ResultCard, TipsList } from "@/components/ResultCard";
import { calculateShade } from "@/lib/calculators/shade";

export function ShadeCalculator() {
  const [treeHeight, setTreeHeight] = useState(8);
  const [crownWidth, setCrownWidth] = useState(6);

  const result = calculateShade({ treeHeight, crownWidth });

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
        <h2 className="text-lg font-semibold text-primary-dark">Twoje dane</h2>
        <FormField label="Wysokość drzewa (m)" htmlFor="height">
          <input
            id="height"
            type="number"
            min={2}
            value={treeHeight}
            onChange={(e) => setTreeHeight(Number(e.target.value))}
            className={inputClass}
          />
        </FormField>
        <FormField label="Szerokość korony (m)" htmlFor="crown">
          <input
            id="crown"
            type="number"
            min={1}
            value={crownWidth}
            onChange={(e) => setCrownWidth(Number(e.target.value))}
            className={inputClass}
          />
        </FormField>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-primary-dark">Wyniki</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <ResultCard
            label="Maks. powierzchnia cienia"
            value={result.maxShadeArea}
            unit="m²"
            highlight
          />
          <ResultCard
            label="Min. powierzchnia cienia"
            value={result.minShadeArea}
            unit="m²"
          />
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold text-primary-dark mb-4">
            Cień w poszczególnych miesiącach
          </h3>
          <div className="space-y-2">
            {result.monthlyShade.map((m) => (
              <div key={m.month} className="flex items-center gap-3">
                <span className="w-20 text-sm font-medium shrink-0">
                  {m.month}
                </span>
                <div className="flex-1 h-6 bg-accent rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary/60 rounded-full transition-all"
                    style={{
                      width: `${(m.shadeArea / result.maxShadeArea) * 100}%`,
                    }}
                  />
                </div>
                <span className="w-16 text-sm text-muted text-right shrink-0">
                  {m.shadeArea} m²
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
