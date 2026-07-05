"use client";

import { useState } from "react";
import { FormField, inputClass, selectClass } from "@/components/FormField";
import { ResultCard, TipsList } from "@/components/ResultCard";
import {
  calculateFlowerMeadow,
  MEADOW_MIXES,
  RAIN_REGIONS,
  type MeadowMixType,
  type RainRegion,
} from "@/lib/calculators/flower-meadow";

export function FlowerMeadowCalculator() {
  const [area, setArea] = useState(100);
  const [mixType, setMixType] = useState<MeadowMixType>("wieloletnia");
  const [replacingLawn, setReplacingLawn] = useState(false);
  const [rainRegion, setRainRegion] = useState<RainRegion>("przecietny");

  const result = calculateFlowerMeadow({
    area,
    mixType,
    replacingLawn,
    rainRegion,
  });

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
        <h2 className="text-lg font-semibold text-primary-dark">Twoje dane</h2>
        <FormField label="Powierzchnia łąki (m²)" htmlFor="area">
          <input
            id="area"
            type="number"
            min={1}
            value={area}
            onChange={(e) => setArea(Math.max(0, Number(e.target.value)))}
            className={inputClass}
          />
        </FormField>
        <FormField label="Rodzaj mieszanki" htmlFor="mix">
          <select
            id="mix"
            value={mixType}
            onChange={(e) => setMixType(e.target.value as MeadowMixType)}
            className={selectClass}
          >
            {(Object.keys(MEADOW_MIXES) as MeadowMixType[]).map((key) => (
              <option key={key} value={key}>
                {MEADOW_MIXES[key].label}
              </option>
            ))}
          </select>
        </FormField>
        <FormField
          label="Region opadowy"
          htmlFor="region"
          hint="Wpływa na oszczędność wody względem trawnika"
        >
          <select
            id="region"
            value={rainRegion}
            onChange={(e) => setRainRegion(e.target.value as RainRegion)}
            className={selectClass}
          >
            {(Object.keys(RAIN_REGIONS) as RainRegion[]).map((key) => (
              <option key={key} value={key}>
                {RAIN_REGIONS[key].label}
              </option>
            ))}
          </select>
        </FormField>
        <div className="flex items-start gap-3">
          <input
            id="replacing"
            type="checkbox"
            checked={replacingLawn}
            onChange={(e) => setReplacingLawn(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-border accent-[var(--color-primary,#16a34a)]"
          />
          <label htmlFor="replacing" className="text-sm text-foreground">
            Zamieniasz istniejący trawnik?
            <span className="block text-xs text-muted">
              Doliczymy koszt usunięcia darni / glebogryzarki (~5 PLN/m²)
            </span>
          </label>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-primary-dark">Wyniki</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <ResultCard
            label="Potrzebne nasiona"
            value={result.seedLabel}
            highlight
          />
          <ResultCard
            label="Koszt założenia łącznie"
            value={result.totalSetupCost}
            unit="PLN"
            highlight
          />
          <ResultCard
            label="Oszczędność wody"
            value={`${result.waterSavedLiters.toLocaleString("pl-PL")} l`}
            unit={`≈ ${result.waterSavedPLN} PLN/rok`}
          />
          <ResultCard
            label="Mniej koszeń"
            value={`${result.mowingsSaved} koszenia mniej`}
            unit="rocznie"
          />
          <ResultCard
            label="Zaoszczędzony czas"
            value={result.timeSavedHours}
            unit="h/rok"
          />
          <ResultCard
            label="Oszczędność na paliwie"
            value={result.fuelSavedPLN}
            unit="PLN/rok"
          />
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold text-primary-dark mb-3">
            Harmonogram łąki kwietnej
          </h3>
          <div className="space-y-2">
            {result.schedule.map((s) => (
              <div
                key={s.phase}
                className="flex justify-between gap-4 text-sm border-b border-border/50 pb-2 last:border-0"
              >
                <span className="font-medium shrink-0">{s.phase}</span>
                <span className="text-muted text-right">{s.detail}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold text-primary-dark mb-3">
            Koszty założenia
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between border-b border-border/50 pb-2">
              <span className="font-medium">Nasiona ({result.seedLabel})</span>
              <span className="text-muted">~{result.seedCost} PLN</span>
            </div>
            <div className="flex justify-between border-b border-border/50 pb-2 last:border-0">
              <span className="font-medium">Przygotowanie gleby</span>
              <span className="text-muted">~{result.soilPrepCost} PLN</span>
            </div>
            {result.sodRemovalCost > 0 && (
              <div className="flex justify-between">
                <span className="font-medium">Usunięcie darni</span>
                <span className="text-muted">~{result.sodRemovalCost} PLN</span>
              </div>
            )}
          </div>
        </div>

        <TipsList tips={result.tips} />
      </div>
    </div>
  );
}
