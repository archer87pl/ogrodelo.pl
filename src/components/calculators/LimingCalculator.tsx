"use client";

import { useState } from "react";
import { FormField, inputClass, selectClass } from "@/components/FormField";
import { ResultCard, TipsList } from "@/components/ResultCard";
import {
  calculateLiming,
  CROP_LABELS,
  SOIL_LABELS,
  LIME_LABELS,
  type CropType,
  type SoilType,
  type LimeType,
} from "@/lib/calculators/liming";

export function LimingCalculator() {
  const [currentPh, setCurrentPh] = useState(5.5);
  const [crop, setCrop] = useState<CropType>("trawnik");
  const [soil, setSoil] = useState<SoilType>("srednia");
  const [area, setArea] = useState(200);
  const [lime, setLime] = useState<LimeType>("kreda");

  const result = calculateLiming({ currentPh, crop, soil, area, lime });

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
        <h2 className="text-lg font-semibold text-primary-dark">Twoje dane</h2>
        <FormField
          label="Aktualne pH gleby"
          htmlFor="ph"
          hint="Zmierz kwasomierzem lub zbadaj w stacji chemiczno-rolniczej"
        >
          <input
            id="ph"
            type="number"
            min={3.5}
            max={8}
            step={0.1}
            value={currentPh}
            onChange={(e) => setCurrentPh(Number(e.target.value))}
            className={inputClass}
          />
        </FormField>
        <FormField label="Uprawa" htmlFor="crop">
          <select
            id="crop"
            value={crop}
            onChange={(e) => setCrop(e.target.value as CropType)}
            className={selectClass}
          >
            {(Object.keys(CROP_LABELS) as CropType[]).map((key) => (
              <option key={key} value={key}>
                {CROP_LABELS[key]}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Rodzaj gleby" htmlFor="soil">
          <select
            id="soil"
            value={soil}
            onChange={(e) => setSoil(e.target.value as SoilType)}
            className={selectClass}
          >
            {(Object.keys(SOIL_LABELS) as SoilType[]).map((key) => (
              <option key={key} value={key}>
                {SOIL_LABELS[key]}
              </option>
            ))}
          </select>
        </FormField>
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
        <FormField label="Rodzaj wapna" htmlFor="lime">
          <select
            id="lime"
            value={lime}
            onChange={(e) => setLime(e.target.value as LimeType)}
            className={selectClass}
          >
            {(Object.keys(LIME_LABELS) as LimeType[]).map((key) => (
              <option key={key} value={key}>
                {LIME_LABELS[key]}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-primary-dark">Wyniki</h2>

        <div
          className={`rounded-xl border p-5 text-sm leading-relaxed ${
            result.mode === "wapnowanie"
              ? "border-primary bg-accent text-primary-dark"
              : "border-amber-300 bg-amber-50 text-amber-900"
          }`}
        >
          <p className="font-semibold mb-1">
            {result.mode === "wapnowanie" && "Zalecenie: wapnowanie"}
            {result.mode === "nie-wapnuj" && "Zalecenie: nie wapnuj"}
            {result.mode === "zakwaszanie" && "Zalecenie: zakwaszanie zamiast wapnowania"}
          </p>
          <p>{result.verdict}</p>
        </div>

        {result.mode === "wapnowanie" && (
          <div className="grid gap-3 sm:grid-cols-2">
            <ResultCard
              label="Dawka wapna łącznie"
              value={result.limeTotalKg}
              unit="kg"
              highlight
            />
            <ResultCard
              label="Dawka na 100 m²"
              value={result.limePer100m2}
              unit="kg"
            />
            <ResultCard
              label="Worki 25 kg"
              value={result.bags25kg}
              unit="szt."
            />
            <ResultCard label="Szacunkowy koszt" value={result.costPln} unit="PLN" />
            <ResultCard label="Docelowe pH" value={result.targetPhLabel} />
            <ResultCard label="Najlepszy termin" value={result.bestTerm} />
          </div>
        )}

        {result.mode === "zakwaszanie" && (
          <div className="grid gap-3 sm:grid-cols-2">
            <ResultCard
              label="Siarka granulowana"
              value={result.sulfurPerM2}
              unit="g/m²"
              highlight
            />
            <ResultCard
              label="Siarka łącznie"
              value={result.sulfurTotalKg}
              unit="kg"
            />
            <ResultCard label="Docelowe pH" value={result.targetPhLabel} />
            <ResultCard label="Najlepszy termin" value={result.bestTerm} />
          </div>
        )}

        {result.warnings.length > 0 && (
          <div className="rounded-xl border border-amber-300 bg-amber-50 p-5">
            <h3 className="font-semibold text-amber-900 mb-3">⚠️ Uwaga</h3>
            <ul className="space-y-2 text-sm text-amber-900">
              {result.warnings.map((warning, i) => (
                <li key={i} className="flex gap-2">
                  <span className="shrink-0">•</span>
                  {warning}
                </li>
              ))}
            </ul>
          </div>
        )}

        <TipsList tips={result.tips} />
      </div>
    </div>
  );
}
