"use client";

import { useState } from "react";
import { FormField, inputClass, selectClass } from "@/components/FormField";
import { ResultCard, TipsList } from "@/components/ResultCard";
import {
  calculateFence,
  FENCE_TYPES,
  getFenceType,
  type FenceType,
} from "@/lib/calculators/fence";

const pln = new Intl.NumberFormat("pl-PL");

export function FenceCalculator() {
  const [length, setLength] = useState(100);
  const [wickets, setWickets] = useState(1);
  const [gates, setGates] = useState(1);
  const [fenceType, setFenceType] = useState<FenceType>("panel3d");

  const result = calculateFence({ length, wickets, gates, fenceType });
  const type = getFenceType(fenceType);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
        <h2 className="text-lg font-semibold text-primary-dark">Twoje dane</h2>
        <FormField
          label="Długość ogrodzenia (m)"
          htmlFor="fence-length"
          hint="Łączny obwód do ogrodzenia, razem z furtkami i bramami"
        >
          <input
            id="fence-length"
            type="number"
            min={1}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className={inputClass}
          />
        </FormField>
        <FormField label="Liczba furtek" htmlFor="fence-wickets">
          <input
            id="fence-wickets"
            type="number"
            min={0}
            value={wickets}
            onChange={(e) => setWickets(Number(e.target.value))}
            className={inputClass}
          />
        </FormField>
        <FormField label="Liczba bram wjazdowych" htmlFor="fence-gates">
          <input
            id="fence-gates"
            type="number"
            min={0}
            value={gates}
            onChange={(e) => setGates(Number(e.target.value))}
            className={inputClass}
          />
        </FormField>
        <FormField
          label="Rodzaj ogrodzenia"
          htmlFor="fence-type"
          hint={`Przęsło/moduł: ${type.spanWidth.toLocaleString("pl-PL")} m, materiał ok. ${type.materialPerM} PLN/mb`}
        >
          <select
            id="fence-type"
            value={fenceType}
            onChange={(e) => setFenceType(e.target.value as FenceType)}
            className={selectClass}
          >
            {FENCE_TYPES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-primary-dark">Wyniki</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <ResultCard
            label="Liczba paneli / przęseł"
            value={result.panels}
            unit="szt."
            highlight
          />
          <ResultCard
            label="Koszt materiałów"
            value={pln.format(result.materialCost)}
            unit="PLN"
            highlight
          />
          <ResultCard label="Liczba słupków" value={result.posts} unit="szt." />
          <ResultCard
            label="Koszt z robocizną"
            value={pln.format(result.totalCost)}
            unit="PLN"
          />
          <ResultCard
            label="Koszt za metr bieżący"
            value={pln.format(result.costPerMeter)}
            unit="PLN/mb"
          />
          <ResultCard
            label="Długość wypełnienia"
            value={result.netLength.toLocaleString("pl-PL")}
            unit="m"
          />
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold text-primary-dark mb-3">
            Porównanie rodzajów ogrodzeń ({length} m, z robocizną)
          </h3>
          <div className="space-y-2">
            {result.comparison.map((c) => (
              <div
                key={c.id}
                className="flex justify-between text-sm border-b border-border/50 pb-2 last:border-0"
              >
                <span
                  className={
                    c.id === fenceType ? "font-semibold text-primary-dark" : "font-medium"
                  }
                >
                  {c.label}
                </span>
                <span className="text-muted">
                  ~{pln.format(c.totalCost)} PLN
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
