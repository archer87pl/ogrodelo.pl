"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FormField, inputClass, selectClass } from "@/components/FormField";
import { ResultCard, TipsList } from "@/components/ResultCard";
import { MowerPresetNav } from "@/components/calculators/MowerPresetNav";
import {
  calculateMower,
  SLOPE_OPTIONS,
  OBSTACLE_OPTIONS,
  type SlopeLevel,
  type ObstacleLevel,
} from "@/lib/calculators/mower";
import type { MowerPreset } from "@/lib/constants/mower-presets";

interface MowerCalculatorProps {
  preset?: MowerPreset;
}

export function MowerCalculator({ preset }: MowerCalculatorProps) {
  const d = preset?.defaults ?? {};

  const [area, setArea] = useState(d.area ?? 500);
  const [slope, setSlope] = useState<SlopeLevel>(d.slope ?? "plaski");
  const [obstacles, setObstacles] = useState<ObstacleLevel>(d.obstacles ?? "brak");

  useEffect(() => {
    if (!preset) return;
    const f = preset.defaults;
    if (f.area !== undefined) setArea(f.area);
    if (f.slope !== undefined) setSlope(f.slope);
    if (f.obstacles !== undefined) setObstacles(f.obstacles);
  }, [preset]);

  const result = calculateMower({ area, slope, obstacles });

  return (
    <div className="space-y-8">
      <MowerPresetNav currentSlug={preset?.slug} />

      {preset?.intro && (
        <p className="text-muted leading-relaxed max-w-3xl">{preset.intro}</p>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
          <h2 className="text-lg font-semibold text-primary-dark">Twoje dane</h2>
          <FormField label="Powierzchnia trawnika (m²)" htmlFor="area">
            <input
              id="area"
              type="number"
              min={50}
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className={inputClass}
            />
          </FormField>
          <FormField label="Nachylenie terenu" htmlFor="slope">
            <select
              id="slope"
              value={slope}
              onChange={(e) => setSlope(e.target.value as SlopeLevel)}
              className={selectClass}
            >
              {SLOPE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Przeszkody na trawniku" htmlFor="obstacles">
            <select
              id="obstacles"
              value={obstacles}
              onChange={(e) => setObstacles(e.target.value as ObstacleLevel)}
              className={selectClass}
            >
              {OBSTACLE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-primary-dark">Wyniki</h2>
          <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
            <ResultCard
              label="Koszenie ręczne/rok"
              value={result.manualCostYearly}
              unit="PLN"
            />
            <ResultCard
              label="Usługa firmy/rok"
              value={Math.round(area * 18)}
              unit="PLN"
            />
            <ResultCard
              label="Robot koszący/rok"
              value={result.robotCostYearly}
              unit="PLN"
            />
            <ResultCard
              label="Zwrot inwestycji"
              value={result.paybackYears}
              unit="lat"
              highlight
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-primary-dark">Polecane modele</h3>
            {result.recommendations.map((m) => (
              <div
                key={m.name}
                className="rounded-xl border border-border bg-card p-5"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-foreground">{m.name}</p>
                    <p className="text-sm text-muted">{m.brand}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{m.price} PLN</p>
                    <p className="text-xs text-muted">
                      do {m.maxArea} m² · {m.match}% dopasowanie
                    </p>
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {m.features.map((f) => (
                    <span
                      key={f}
                      className="rounded-full bg-accent px-2 py-0.5 text-xs text-primary-dark"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <TipsList tips={result.tips} />

          <p className="text-xs text-muted">
            Ceny orientacyjne — sprawdź u autoryzowanych dealerów. Powiązane:{" "}
            <Link href="/kalkulator-trawnika" className="text-primary hover:underline">
              zakładanie trawnika
            </Link>
            ,{" "}
            <Link href="/kalkulator-nawozenia" className="text-primary hover:underline">
              nawożenie
            </Link>
            ,{" "}
            <Link href="/kalkulator-nawadniania/trawnik" className="text-primary hover:underline">
              nawadnianie trawnika
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
