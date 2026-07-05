"use client";

import { useState } from "react";
import { FormField, inputClass, selectClass } from "@/components/FormField";
import { ResultCard, TipsList } from "@/components/ResultCard";
import {
  calculateGardenCosts,
  type MowingMethod,
  type WateringMethod,
} from "@/lib/calculators/garden-costs";

const formatPLN = (value: number) => value.toLocaleString("pl-PL");

export function GardenCostsCalculator() {
  const [gardenArea, setGardenArea] = useState(500);
  const [lawnPercent, setLawnPercent] = useState(60);
  const [watering, setWatering] = useState<WateringMethod>("reczne-siec");
  const [mowing, setMowing] = useState<MowingMethod>("spalinowa");
  const [fertilizingPerYear, setFertilizingPerYear] = useState(2);
  const [plantProtection, setPlantProtection] = useState(true);

  const result = calculateGardenCosts({
    gardenArea,
    lawnPercent,
    watering,
    mowing,
    fertilizingPerYear,
    plantProtection,
  });

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
        <h2 className="text-lg font-semibold text-primary-dark">Twoje dane</h2>
        <FormField label="Powierzchnia ogrodu (m²)" htmlFor="garden-area">
          <input
            id="garden-area"
            type="number"
            min={10}
            value={gardenArea}
            onChange={(e) => setGardenArea(Number(e.target.value))}
            className={inputClass}
          />
        </FormField>
        <FormField
          label={`Udział trawnika: ${lawnPercent}% (${Math.round((gardenArea * lawnPercent) / 100)} m²)`}
          htmlFor="lawn-percent"
        >
          <input
            id="lawn-percent"
            type="range"
            min={0}
            max={100}
            step={5}
            value={lawnPercent}
            onChange={(e) => setLawnPercent(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </FormField>
        <FormField label="Podlewanie" htmlFor="watering">
          <select
            id="watering"
            value={watering}
            onChange={(e) => setWatering(e.target.value as WateringMethod)}
            className={selectClass}
          >
            <option value="reczne-siec">Ręczne wodą z sieci</option>
            <option value="automatyczne-siec">Automatyczne z sieci</option>
            <option value="deszczowka-siec">Deszczówka + sieć</option>
          </select>
        </FormField>
        <FormField label="Koszenie" htmlFor="mowing">
          <select
            id="mowing"
            value={mowing}
            onChange={(e) => setMowing(e.target.value as MowingMethod)}
            className={selectClass}
          >
            <option value="spalinowa">Samodzielnie, kosiarka spalinowa</option>
            <option value="elektryczna">
              Samodzielnie, kosiarka elektryczna
            </option>
            <option value="robot">Robot koszący</option>
            <option value="firma">Firma ogrodnicza</option>
          </select>
        </FormField>
        <FormField
          label="Nawożenie (zabiegi w roku)"
          htmlFor="fertilizing"
          hint="Zalecane 2–3 zabiegi rocznie"
        >
          <input
            id="fertilizing"
            type="number"
            min={0}
            max={5}
            value={fertilizingPerYear}
            onChange={(e) => setFertilizingPerYear(Number(e.target.value))}
            className={inputClass}
          />
        </FormField>
        <div className="flex items-center gap-3">
          <input
            id="protection"
            type="checkbox"
            checked={plantProtection}
            onChange={(e) => setPlantProtection(e.target.checked)}
            className="h-4 w-4 rounded border-border accent-primary"
          />
          <label
            htmlFor="protection"
            className="text-sm font-medium text-foreground"
          >
            Środki ochrony roślin i inne drobiazgi
          </label>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-primary-dark">Wyniki</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <ResultCard
            label="Roczny koszt utrzymania"
            value={formatPLN(result.totalCost)}
            unit="PLN"
            highlight
          />
          <ResultCard
            label="Koszt na m² ogrodu"
            value={result.costPerM2.toLocaleString("pl-PL")}
            unit="PLN/m²"
          />
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold text-primary-dark mb-3">
            Podział kosztów
          </h3>
          <div className="space-y-2">
            {result.breakdown.map((row) => (
              <div
                key={row.category}
                className="flex justify-between text-sm border-b border-border/50 pb-2 last:border-0"
              >
                <span className="font-medium">{row.category}</span>
                <span className="text-muted">
                  {formatPLN(row.cost)} PLN ({row.share}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        {result.savings.length > 0 && (
          <div className="rounded-xl border border-primary bg-accent p-5">
            <h3 className="font-semibold text-primary-dark mb-3">
              Gdzie możesz oszczędzić?
            </h3>
            <ul className="space-y-3 text-sm">
              {result.savings.map((s) => (
                <li key={s.text} className="flex flex-col gap-0.5">
                  <span>
                    <span className="font-semibold text-primary-dark">
                      −{formatPLN(s.savings)} PLN/rok
                    </span>{" "}
                    — {s.text}
                  </span>
                  <a
                    href={s.href}
                    className="text-primary underline underline-offset-2 hover:text-primary-dark"
                  >
                    {s.linkLabel} →
                  </a>
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
