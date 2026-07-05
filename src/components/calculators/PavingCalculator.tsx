"use client";

import { useState } from "react";
import { FormField, inputClass, selectClass } from "@/components/FormField";
import { ResultCard, TipsList } from "@/components/ResultCard";
import {
  calculatePaving,
  PAVING_STONE_TYPES,
  PAVING_USES,
  type PavingStoneType,
  type PavingUse,
} from "@/lib/calculators/paving";

const plnFormat = new Intl.NumberFormat("pl-PL");

export function PavingCalculator() {
  const [area, setArea] = useState(20);
  const [edgeLength, setEdgeLength] = useState(18);
  const [use, setUse] = useState<PavingUse>("sciezka");
  const [stoneType, setStoneType] = useState<PavingStoneType>("betonowa-szara");

  const result = calculatePaving({ area, edgeLength, use, stoneType });

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
        <h2 className="text-lg font-semibold text-primary-dark">Twoje dane</h2>
        <FormField label="Powierzchnia do wybrukowania (m²)" htmlFor="area">
          <input
            id="area"
            type="number"
            min={1}
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
            className={inputClass}
          />
        </FormField>
        <FormField
          label="Obwód do obrzeży (m)"
          htmlFor="edge"
          hint="Długość krawędzi, wzdłuż których staną obrzeża betonowe"
        >
          <input
            id="edge"
            type="number"
            min={0}
            value={edgeLength}
            onChange={(e) => setEdgeLength(Number(e.target.value))}
            className={inputClass}
          />
        </FormField>
        <FormField
          label="Zastosowanie"
          htmlFor="use"
          hint="Decyduje o grubości podbudowy z kruszywa"
        >
          <select
            id="use"
            value={use}
            onChange={(e) => setUse(e.target.value as PavingUse)}
            className={selectClass}
          >
            {PAVING_USES.map((u) => (
              <option key={u.value} value={u.value}>
                {u.label} (podbudowa {u.baseThicknessCm} cm)
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Rodzaj kostki" htmlFor="stone">
          <select
            id="stone"
            value={stoneType}
            onChange={(e) => setStoneType(e.target.value as PavingStoneType)}
            className={selectClass}
          >
            {PAVING_STONE_TYPES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label} (~{s.pricePerM2} PLN/m²)
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-primary-dark">Wyniki</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <ResultCard
            label="Kostka z zapasem +5%"
            value={result.pavingAreaM2}
            unit="m²"
            highlight
          />
          <ResultCard
            label="Koszt materiałów łącznie"
            value={plnFormat.format(result.totalMaterialCost)}
            unit="PLN"
            highlight
          />
          <ResultCard
            label={`Kruszywo na podbudowę (${result.baseThicknessCm} cm)`}
            value={`${result.baseVolumeM3} m³ / ${result.baseTons} t`}
          />
          <ResultCard
            label={`Podsypka cem.-piaskowa (${result.beddingThicknessCm} cm)`}
            value={result.beddingVolumeM3}
            unit="m³"
          />
          <ResultCard
            label="Obrzeża 100 cm"
            value={result.edgeCount}
            unit="szt."
          />
          <ResultCard
            label="Koszt obrzeży"
            value={plnFormat.format(result.edgeCost)}
            unit="PLN"
          />
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold text-primary-dark mb-3">
            Szacunkowy koszt robocizny
          </h3>
          <div className="flex justify-between text-sm">
            <span className="font-medium">
              Ułożenie kostki (120–200 PLN/m²)
            </span>
            <span className="text-muted">
              {plnFormat.format(result.laborCostMin)}–
              {plnFormat.format(result.laborCostMax)} PLN
            </span>
          </div>
          <p className="mt-2 text-xs text-muted">
            Robocizna nie jest wliczona w koszt materiałów powyżej.
          </p>
        </div>

        <TipsList tips={result.tips} />
      </div>
    </div>
  );
}
