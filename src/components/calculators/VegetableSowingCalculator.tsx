"use client";

import { useState } from "react";
import { FormField, inputClass, selectClass } from "@/components/FormField";
import { ResultCard, TipsList } from "@/components/ResultCard";
import { calculateSowing, VEGETABLES } from "@/lib/calculators/vegetable-sowing";

export function VegetableSowingCalculator() {
  const [vegetableId, setVegetableId] = useState("marchew");
  const [areaM2, setAreaM2] = useState(10);
  const [bedWidthM, setBedWidthM] = useState(1.2);

  const result = calculateSowing({ vegetableId, areaM2, bedWidthM });
  const veg = result.vegetable;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
          <h2 className="text-lg font-semibold text-primary-dark">
            Twoje dane
          </h2>
          <FormField label="Warzywo" htmlFor="vegetable">
            <select
              id="vegetable"
              value={vegetableId}
              onChange={(e) => setVegetableId(e.target.value)}
              className={selectClass}
            >
              {VEGETABLES.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Powierzchnia zagonu (m²)" htmlFor="area">
            <input
              id="area"
              type="number"
              min={0.5}
              step={0.5}
              value={areaM2}
              onChange={(e) => setAreaM2(Number(e.target.value))}
              className={inputClass}
            />
          </FormField>
          <FormField
            label="Szerokość zagonu (m)"
            htmlFor="bed-width"
            hint="Typowy zagon ma 1,2 m — wygodnie sięgniesz do środka z obu stron"
          >
            <input
              id="bed-width"
              type="number"
              min={0.3}
              max={3}
              step={0.1}
              value={bedWidthM}
              onChange={(e) => setBedWidthM(Number(e.target.value))}
              className={inputClass}
            />
          </FormField>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold text-primary-dark mb-3">
            {veg.name} — karta uprawy
          </h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between gap-4 border-b border-border/50 pb-2">
              <dt className="text-muted">Rozstawa rzędów</dt>
              <dd className="font-medium text-right">{veg.rowSpacingCm} cm</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-border/50 pb-2">
              <dt className="text-muted">Rozstawa w rzędzie</dt>
              <dd className="font-medium text-right">
                {veg.inRowSpacingCm} cm
              </dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-border/50 pb-2">
              <dt className="text-muted">Metoda</dt>
              <dd className="font-medium text-right">{veg.methodLabel}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-border/50 pb-2">
              <dt className="text-muted">Termin</dt>
              <dd className="font-medium text-right">{veg.sowingDate}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-border/50 pb-2">
              <dt className="text-muted">
                {veg.method === "siew" ? "Norma wysiewu" : "Liczba roślin"}
              </dt>
              <dd className="font-medium text-right">
                {veg.method === "siew"
                  ? `${veg.seedRateGramsPerM2} g/m²`
                  : `${veg.plantsPerM2} szt./m²`}
              </dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-border/50 pb-2">
              <dt className="text-muted">Orientacyjny plon</dt>
              <dd className="font-medium text-right">
                {veg.yieldKgPerM2} kg/m²
              </dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-border/50 pb-2">
              <dt className="text-muted">Dobre sąsiedztwo</dt>
              <dd className="font-medium text-right">
                {veg.goodCompanions.join(", ")}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Unikaj sąsiedztwa</dt>
              <dd className="font-medium text-right">
                {veg.badCompanions.join(", ")}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-primary-dark">Wyniki</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <ResultCard
            label="Liczba roślin łącznie"
            value={result.totalPlants}
            unit="szt."
            highlight
          />
          <ResultCard
            label={
              veg.method === "siew"
                ? "Potrzebne nasiona"
                : veg.methodLabel === "sadzenie dymki"
                  ? "Potrzebna dymka (z zapasem 10%)"
                  : "Potrzebna rozsada (z zapasem 10%)"
            }
            value={
              veg.method === "siew"
                ? (result.seedGrams ?? 0).toLocaleString("pl-PL")
                : (result.seedlingCount ?? 0)
            }
            unit={veg.method === "siew" ? "g" : "szt."}
            highlight
          />
          <ResultCard
            label={`Liczba rzędów (zagon ${result.bedLengthM.toLocaleString("pl-PL")} m dł.)`}
            value={result.rowCount}
          />
          <ResultCard
            label="Szacunkowy plon"
            value={result.estimatedYieldKg.toLocaleString("pl-PL")}
            unit="kg"
          />
          <ResultCard label="Termin siewu / sadzenia" value={result.sowingDate} />
          <ResultCard
            label="Głębokość siewu"
            value={result.sowingDepthCm.toLocaleString("pl-PL")}
            unit="cm"
          />
        </div>

        <TipsList tips={result.tips} />
      </div>
    </div>
  );
}
