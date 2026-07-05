"use client";

import { useState } from "react";
import { inputClass } from "@/components/FormField";
import { ResultCard, TipsList } from "@/components/ResultCard";
import {
  VEGETABLE_CROPS,
  TYPICAL_GARDEN_PRESET,
  calculateVegetableYield,
} from "@/lib/calculators/vegetable-yield";

interface CropState {
  checked: boolean;
  areaM2: number;
}

const DEFAULT_AREA = 2;

function initialState(): Record<string, CropState> {
  const state: Record<string, CropState> = {};
  for (const crop of VEGETABLE_CROPS) {
    state[crop.id] = { checked: false, areaM2: DEFAULT_AREA };
  }
  return state;
}

function formatPln(value: number): string {
  return value.toLocaleString("pl-PL");
}

export function VegetableYieldCalculator() {
  const [crops, setCrops] = useState<Record<string, CropState>>(initialState);

  const result = calculateVegetableYield(
    VEGETABLE_CROPS.filter((c) => crops[c.id]?.checked).map((c) => ({
      cropId: c.id,
      areaM2: crops[c.id].areaM2,
    }))
  );

  function toggleCrop(id: string) {
    setCrops((prev) => ({
      ...prev,
      [id]: { ...prev[id], checked: !prev[id].checked },
    }));
  }

  function setArea(id: string, areaM2: number) {
    setCrops((prev) => ({
      ...prev,
      [id]: { ...prev[id], areaM2 },
    }));
  }

  function applyPreset() {
    setCrops(() => {
      const state = initialState();
      for (const [id, area] of Object.entries(TYPICAL_GARDEN_PRESET)) {
        state[id] = { checked: true, areaM2: area };
      }
      return state;
    });
  }

  const anySelected = result.rows.length > 0;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h2 className="text-lg font-semibold text-primary-dark">
            Co uprawiasz?
          </h2>
          <button
            type="button"
            onClick={applyPreset}
            className="rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
          >
            Typowy warzywnik 20 m²
          </button>
        </div>

        <div className="space-y-2">
          {VEGETABLE_CROPS.map((crop) => {
            const state = crops[crop.id];
            return (
              <div
                key={crop.id}
                className="flex items-center gap-3 border-b border-border/50 pb-2 last:border-0"
              >
                <label className="flex flex-1 items-center gap-2.5 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={state.checked}
                    onChange={() => toggleCrop(crop.id)}
                    className="h-4 w-4 accent-[var(--color-primary,#16a34a)]"
                  />
                  <span>
                    <span className="font-medium text-foreground">
                      {crop.name}
                    </span>{" "}
                    <span className="text-xs text-muted">
                      ({crop.yieldRangeLabel})
                    </span>
                  </span>
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min={0.5}
                    step={0.5}
                    value={state.areaM2}
                    disabled={!state.checked}
                    onChange={(e) => setArea(crop.id, Number(e.target.value))}
                    aria-label={`Powierzchnia uprawy: ${crop.name} (m²)`}
                    className={`${inputClass} w-20 px-3 py-1.5 text-sm disabled:opacity-40`}
                  />
                  <span className="text-xs text-muted">m²</span>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-sm text-muted">
          Łączna powierzchnia:{" "}
          <span className="font-semibold text-foreground">
            {result.totalAreaM2.toLocaleString("pl-PL")} m²
          </span>
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-primary-dark">Wyniki</h2>

        {anySelected ? (
          <>
            <div className="rounded-2xl border border-primary bg-accent p-6 text-center">
              <p className="text-sm text-muted">
                Twój warzywnik oszczędza rocznie
              </p>
              <p className="mt-1 text-4xl font-bold text-primary-dark">
                ~{formatPln(result.savingsPln)} PLN
              </p>
              <p className="mt-1 text-xs text-muted">
                wartość plonów w cenach sklepowych minus koszty uprawy
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <ResultCard
                label="Łączny plon"
                value={result.totalYieldKg.toLocaleString("pl-PL")}
                unit="kg/rok"
                highlight
              />
              <ResultCard
                label="Wartość plonów (ceny sklepowe)"
                value={formatPln(result.totalValuePln)}
                unit="PLN"
              />
              <ResultCard
                label="Koszty (nasiona, rozsada, nawozy)"
                value={formatPln(result.totalCostPln)}
                unit="PLN"
              />
              <ResultCard
                label="Zwrot na 1 m²"
                value={result.returnPerM2Pln.toLocaleString("pl-PL")}
                unit="PLN/m²"
              />
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-semibold text-primary-dark mb-3">
                Plon i wartość według upraw
              </h3>
              <div className="space-y-2">
                {result.rows.map((row) => (
                  <div
                    key={row.crop.id}
                    className="flex justify-between gap-2 text-sm border-b border-border/50 pb-2 last:border-0"
                  >
                    <span className="font-medium">
                      {row.crop.name}{" "}
                      <span className="font-normal text-muted">
                        ({row.areaM2.toLocaleString("pl-PL")} m²)
                      </span>
                    </span>
                    <span className="text-muted whitespace-nowrap">
                      {row.yieldKg.toLocaleString("pl-PL", {
                        maximumFractionDigits: 1,
                      })}{" "}
                      kg · ~{Math.round(row.valuePln)} PLN
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted">
            Zaznacz warzywa, które uprawiasz (lub użyj przycisku „Typowy
            warzywnik 20 m²”), aby zobaczyć plony i oszczędności.
          </div>
        )}

        <TipsList tips={result.tips} />
      </div>
    </div>
  );
}
