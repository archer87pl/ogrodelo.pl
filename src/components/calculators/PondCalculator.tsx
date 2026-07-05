"use client";

import { useState } from "react";
import { FormField, inputClass, selectClass } from "@/components/FormField";
import { ResultCard, TipsList } from "@/components/ResultCard";
import {
  calculatePond,
  POND_SHAPES,
  type PondShape,
} from "@/lib/calculators/pond";

export function PondCalculator() {
  const [length, setLength] = useState(3);
  const [width, setWidth] = useState(2);
  const [depth, setDepth] = useState(1);
  const [shape, setShape] = useState<PondShape>("oval");
  const [hasFish, setHasFish] = useState(false);

  const result = calculatePond({ length, width, depth, shape, hasFish });

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
        <h2 className="text-lg font-semibold text-primary-dark">Twoje dane</h2>
        <FormField label="Długość (m)" htmlFor="pond-length">
          <input
            id="pond-length"
            type="number"
            min={0.5}
            step={0.1}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className={inputClass}
          />
        </FormField>
        <FormField label="Szerokość (m)" htmlFor="pond-width">
          <input
            id="pond-width"
            type="number"
            min={0.5}
            step={0.1}
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className={inputClass}
          />
        </FormField>
        <FormField
          label="Głębokość maksymalna (m)"
          htmlFor="pond-depth"
          hint="Dla ryb zimujących w oczku: min. 0,8–1,0 m"
        >
          <input
            id="pond-depth"
            type="number"
            min={0.2}
            max={3}
            step={0.1}
            value={depth}
            onChange={(e) => setDepth(Number(e.target.value))}
            className={inputClass}
          />
        </FormField>
        <FormField label="Kształt oczka" htmlFor="pond-shape">
          <select
            id="pond-shape"
            value={shape}
            onChange={(e) => setShape(e.target.value as PondShape)}
            className={selectClass}
          >
            {POND_SHAPES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </FormField>
        <label
          htmlFor="pond-fish"
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <input
            id="pond-fish"
            type="checkbox"
            checked={hasFish}
            onChange={(e) => setHasFish(e.target.checked)}
            className="h-5 w-5 rounded border-border accent-primary"
          />
          <span className="text-sm font-medium text-foreground">
            Planuję ryby w oczku
          </span>
        </label>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-primary-dark">Wyniki</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <ResultCard
            label="Objętość wody"
            value={result.volumeLiters.toLocaleString("pl-PL")}
            unit="l"
            highlight
          />
          <ResultCard
            label="Wymiar folii EPDM/PVC"
            value={`${result.linerLength.toLocaleString("pl-PL")} × ${result.linerWidth.toLocaleString("pl-PL")} m`}
            unit={`(${result.linerArea.toLocaleString("pl-PL")} m²)`}
            highlight
          />
          <ResultCard
            label="Wydajność pompy"
            value={result.pumpFlow.toLocaleString("pl-PL")}
            unit="l/h"
          />
          <ResultCard
            label="Rośliny wodne razem"
            value={result.totalPlants}
            unit="szt."
          />
        </div>

        {result.fishWarning && (
          <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
            <span className="font-semibold">⚠️ Ryby w oczku: </span>
            {result.fishWarning}
          </div>
        )}

        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold text-primary-dark mb-3">
            Rośliny wodne wg stref
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm border-b border-border/50 pb-2">
              <span className="font-medium">
                Strefa brzegowa (0–10 cm) — ok. 3 szt/mb
              </span>
              <span className="text-muted">{result.edgePlants} szt.</span>
            </div>
            <div className="flex justify-between text-sm border-b border-border/50 pb-2">
              <span className="font-medium">
                Strefa płytka (10–40 cm) — ok. 2 szt/m²
              </span>
              <span className="text-muted">{result.shallowPlants} szt.</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium">
                Strefa głęboka — lilie wodne, 1 szt/2,5 m²
              </span>
              <span className="text-muted">{result.lilies} szt.</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold text-primary-dark mb-3">
            Kosztorys budowy
          </h3>
          <div className="space-y-2">
            {result.costItems.map((item) => (
              <div
                key={item.label}
                className="flex justify-between text-sm border-b border-border/50 pb-2 last:border-0"
              >
                <span className="font-medium">{item.label}</span>
                <span className="text-muted">
                  ~{item.price.toLocaleString("pl-PL")} PLN
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 space-y-1 border-t border-border pt-3 text-sm">
            <div className="flex justify-between font-semibold text-primary-dark">
              <span>Suma z folią PVC</span>
              <span>~{result.totalPVC.toLocaleString("pl-PL")} PLN</span>
            </div>
            <div className="flex justify-between font-semibold text-primary-dark">
              <span>Suma z folią EPDM</span>
              <span>~{result.totalEPDM.toLocaleString("pl-PL")} PLN</span>
            </div>
          </div>
        </div>

        <TipsList tips={result.tips} />
      </div>
    </div>
  );
}
