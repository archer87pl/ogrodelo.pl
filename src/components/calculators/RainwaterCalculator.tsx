"use client";

import { useState } from "react";
import { FormField, inputClass } from "@/components/FormField";
import { ResultCard, TipsList } from "@/components/ResultCard";
import { calculateRainwater } from "@/lib/calculators/rainwater";
import { fetchAnnualPrecipForCity } from "@/lib/weather-client";

export function RainwaterCalculator() {
  const [roofArea, setRoofArea] = useState(80);
  const [location, setLocation] = useState("Warszawa");
  const [annualPrecip, setAnnualPrecip] = useState(600);
  const [loading, setLoading] = useState(false);

  const result = calculateRainwater({
    roofArea,
    annualPrecipitation: annualPrecip,
  });

  async function fetchPrecipitation() {
    setLoading(true);
    try {
      const data = await fetchAnnualPrecipForCity(location);
      if (data?.annualPrecipitation) {
        setAnnualPrecip(data.annualPrecipitation);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
        <h2 className="text-lg font-semibold text-primary-dark">Twoje dane</h2>
        <FormField label="Powierzchnia dachu (m²)" htmlFor="roof">
          <input
            id="roof"
            type="number"
            min={10}
            value={roofArea}
            onChange={(e) => setRoofArea(Number(e.target.value))}
            className={inputClass}
          />
        </FormField>
        <FormField label="Lokalizacja" htmlFor="location">
          <div className="flex gap-2">
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={inputClass}
            />
            <button
              type="button"
              onClick={fetchPrecipitation}
              disabled={loading}
              className="shrink-0 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              {loading ? "..." : "Opady"}
            </button>
          </div>
        </FormField>
        <FormField
          label="Roczne opady (mm)"
          htmlFor="precip"
          hint="Pobierz automatycznie lub wpisz ręcznie"
        >
          <input
            id="precip"
            type="number"
            min={200}
            value={annualPrecip}
            onChange={(e) => setAnnualPrecip(Number(e.target.value))}
            className={inputClass}
          />
        </FormField>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-primary-dark">Wyniki</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <ResultCard
            label="Roczna ilość deszczówki"
            value={result.litersPerYear}
            unit="l"
            highlight
          />
          <ResultCard
            label="Rekomendowany zbiornik"
            value={
              result.recommendedTankLiters >= 1000
                ? `${result.recommendedTankLiters / 1000} m³`
                : `${result.recommendedTankLiters} l`
            }
            highlight
          />
          <ResultCard
            label="Wystarczy na podlewanie"
            value={result.wateringDays}
            unit="dni/mies."
          />
          <ResultCard
            label="Sprawność systemu"
            value={result.efficiency}
            unit="%"
          />
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold text-primary-dark mb-3">
            Polecane zbiorniki
          </h3>
          <div className="space-y-2">
            {result.tankOptions.map((t) => (
              <div
                key={t.size}
                className="flex justify-between text-sm border-b border-border/50 pb-2 last:border-0"
              >
                <span className="font-medium">{t.label}</span>
                <span className="text-muted">~{t.price} PLN</span>
              </div>
            ))}
          </div>
        </div>

        <TipsList tips={result.tips} />
      </div>
    </div>
  );
}
