"use client";

import { useState, useEffect } from "react";
import { FormField, inputClass, selectClass } from "@/components/FormField";
import { ResultCard, TipsList } from "@/components/ResultCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { SeasonalBarChart } from "@/components/SeasonalBarChart";
import { IrrigationPresetNav } from "@/components/calculators/IrrigationPresetNav";
import {
  calculateIrrigation,
  buildDailyForecast,
  SOIL_OPTIONS,
  PLANT_OPTIONS,
  SUN_OPTIONS,
  SPRINKLER_OPTIONS,
  WIND_OPTIONS,
  MULCH_OPTIONS,
  MAIN_IRRIGATION_FAQ,
  type SoilType,
  type PlantType,
  type SunExposure,
  type SprinklerType,
  type WindExposure,
  type MulchType,
} from "@/lib/calculators/irrigation";
import type { IrrigationPreset } from "@/lib/constants/irrigation-presets";

interface WeatherInfo {
  avgTemp: number;
  totalPrecipitation: number;
  rainyDays: number;
  locationName: string;
  dailyPrecip: number[];
  dailyTemp: number[];
  dayNames: string[];
}

interface IrrigationCalculatorProps {
  preset?: IrrigationPreset;
}

const RECOMMENDATION_STYLES = {
  podlewaj: "bg-green-50 text-green-800 border-green-200",
  pomin: "bg-blue-50 text-blue-800 border-blue-200",
  ogranicz: "bg-amber-50 text-amber-800 border-amber-200",
};

const RECOMMENDATION_LABELS = {
  podlewaj: "Podlewaj",
  pomin: "Pomiń",
  ogranicz: "Ogranicz",
};

export function IrrigationCalculator({ preset }: IrrigationCalculatorProps) {
  const d = preset?.defaults ?? {};

  const [location, setLocation] = useState("Warszawa");
  const [area, setArea] = useState(d.area ?? 100);
  const [soil, setSoil] = useState<SoilType>(d.soil ?? "prochnica");
  const [plants, setPlants] = useState<PlantType>(d.plants ?? "trawnik");
  const [sun, setSun] = useState<SunExposure>(d.sun ?? "pelne");
  const [sprinkler, setSprinkler] = useState<SprinklerType>(d.sprinkler ?? "rotacyjny");
  const [wind, setWind] = useState<WindExposure>(d.wind ?? "brak");
  const [mulch, setMulch] = useState<MulchType>(d.mulch ?? "brak");
  const [waterPrice, setWaterPrice] = useState(5.5);
  const [weather, setWeather] = useState<WeatherInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [showFormula, setShowFormula] = useState(false);
  const [weatherFetched, setWeatherFetched] = useState(false);

  useEffect(() => {
    if (!weatherFetched) {
      fetchWeather();
      setWeatherFetched(true);
    }
  }, [weatherFetched]);

  const weatherFactor = weather
    ? weather.totalPrecipitation > 25
      ? 0.65
      : weather.totalPrecipitation > 15
        ? 0.8
        : weather.avgTemp > 28
          ? 1.35
          : weather.avgTemp > 23
            ? 1.15
            : 1.0
    : 1.0;

  const result = calculateIrrigation({
    area,
    soil,
    plants,
    sun,
    sprinkler,
    wind,
    mulch,
    weatherFactor,
    waterPricePerM3: waterPrice,
  });

  const dailyForecast =
    weather?.dailyPrecip && weather?.dayNames
      ? buildDailyForecast(weather.dailyPrecip, weather.dailyTemp, weather.dayNames)
      : null;

  const faqItems = preset
    ? [...preset.faq, ...MAIN_IRRIGATION_FAQ.slice(0, 2)]
    : MAIN_IRRIGATION_FAQ;

  async function fetchWeather() {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/weather?city=${encodeURIComponent(location)}`
      );
      if (res.ok) {
        const data = await res.json();
        setWeather(data);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <IrrigationPresetNav currentSlug={preset?.slug} />

      {preset?.intro && (
        <p className="text-muted leading-relaxed max-w-3xl">{preset.intro}</p>
      )}

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Form */}
        <div className="lg:col-span-2 space-y-5">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
            <h2 className="text-lg font-semibold text-primary-dark">
              Parametry ogrodu
            </h2>

            <FormField
              label="Lokalizacja"
              htmlFor="location"
              hint="Pogoda wpływa na zapotrzebowanie — wpisz miasto w Polsce"
            >
              <div className="flex gap-2">
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
                  className={inputClass}
                  placeholder="np. Wrocław"
                />
                <button
                  type="button"
                  onClick={fetchWeather}
                  disabled={loading}
                  className="shrink-0 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-dark transition-colors disabled:opacity-50"
                >
                  {loading ? "…" : "🌤️"}
                </button>
              </div>
            </FormField>

            {weather && (
              <div className="rounded-xl bg-accent p-4 text-sm space-y-2">
                <p className="font-medium text-primary-dark">
                  Prognoza: {weather.locationName}
                </p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-xs text-muted">Śr. temp.</p>
                    <p className="font-semibold">{weather.avgTemp}°C</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted">Opady 7 dni</p>
                    <p className="font-semibold">{weather.totalPrecipitation} mm</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted">Dni deszczowe</p>
                    <p className="font-semibold">{weather.rainyDays}</p>
                  </div>
                </div>
                {weatherFactor !== 1 && (
                  <p className="text-xs text-primary-dark">
                    Korekta pogodowa: ×{weatherFactor} (
                    {weatherFactor < 1 ? "mniej podlewania" : "więcej podlewania"})
                  </p>
                )}
              </div>
            )}

            <FormField label="Powierzchnia (m²)" htmlFor="area" hint="Cała powierzchnia do podlewania">
              <input
                id="area"
                type="number"
                min={1}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className={inputClass}
              />
            </FormField>

            <FormField label="Rodzaj roślin" htmlFor="plants">
              <select
                id="plants"
                value={plants}
                onChange={(e) => setPlants(e.target.value as PlantType)}
                className={selectClass}
              >
                {PLANT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-muted mt-1">
                {PLANT_OPTIONS.find((o) => o.value === plants)?.hint}
              </p>
            </FormField>

            <FormField label="Typ gleby" htmlFor="soil">
              <select
                id="soil"
                value={soil}
                onChange={(e) => setSoil(e.target.value as SoilType)}
                className={selectClass}
              >
                {SOIL_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-muted mt-1">
                {SOIL_OPTIONS.find((o) => o.value === soil)?.hint}
              </p>
            </FormField>

            <FormField label="Nasłonecznienie" htmlFor="sun">
              <select
                id="sun"
                value={sun}
                onChange={(e) => setSun(e.target.value as SunExposure)}
                className={selectClass}
              >
                {SUN_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="System nawadniania" htmlFor="sprinkler">
              <select
                id="sprinkler"
                value={sprinkler}
                onChange={(e) => setSprinkler(e.target.value as SprinklerType)}
                className={selectClass}
              >
                {SPRINKLER_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-muted mt-1">
                {SPRINKLER_OPTIONS.find((o) => o.value === sprinkler)?.hint}
              </p>
            </FormField>

            <FormField label="Ekspozycja na wiatr" htmlFor="wind">
              <select
                id="wind"
                value={wind}
                onChange={(e) => setWind(e.target.value as WindExposure)}
                className={selectClass}
              >
                {WIND_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Mulczowanie" htmlFor="mulch">
              <select
                id="mulch"
                value={mulch}
                onChange={(e) => setMulch(e.target.value as MulchType)}
                className={selectClass}
              >
                {MULCH_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Cena wody (PLN/m³)" htmlFor="price" hint="Średnio 5–8 PLN w Polsce">
              <input
                id="price"
                type="number"
                min={1}
                step={0.1}
                value={waterPrice}
                onChange={(e) => setWaterPrice(Number(e.target.value))}
                className={inputClass}
              />
            </FormField>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-3 space-y-6">
          <h2 className="text-lg font-semibold text-primary-dark">Wyniki</h2>

          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
            <ResultCard
              label="Tygodniowo"
              value={result.litersPerWeek.toLocaleString("pl-PL")}
              unit="l"
              highlight
            />
            <ResultCard
              label="Dziennie"
              value={result.litersPerDay.toLocaleString("pl-PL")}
              unit="l"
            />
            <ResultCard
              label="Mm / tydzień"
              value={result.mmPerWeek}
              unit="mm"
              highlight
            />
            <ResultCard
              label="Czas dziennie"
              value={result.minutesPerDay}
              unit="min"
            />
            <ResultCard
              label="Sesja podlewania"
              value={result.minutesPerSession}
              unit="min"
            />
            <ResultCard
              label="Mm / sesja"
              value={result.mmPerSession}
              unit="mm"
            />
            <ResultCard
              label="Koszt miesięczny"
              value={result.waterCostMonthly}
              unit="PLN"
            />
            <ResultCard
              label="Koszt roczny"
              value={result.waterCostYearly}
              unit="PLN"
            />
            <ResultCard
              label="Zbiornik deszczówki"
              value={result.rainTankLiters >= 1000
                ? `${(result.rainTankLiters / 1000).toFixed(1)} m³`
                : `${result.rainTankLiters} l`}
              highlight
            />
          </div>

          {/* Breakdown */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold text-primary-dark mb-3">
              Składowe obliczenia
            </h3>
            <div className="space-y-2">
              {result.breakdown.map((b) => (
                <div
                  key={b.label}
                  className="flex justify-between text-sm border-b border-border/50 pb-2 last:border-0"
                >
                  <span className="font-medium">{b.label}</span>
                  <span className="text-muted text-right">{b.effect}</span>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setShowFormula(!showFormula)}
              className="mt-3 text-xs text-primary hover:text-primary-dark transition-colors"
            >
              {showFormula ? "Ukryj wzór" : "Pokaż wzór matematyczny →"}
            </button>
            {showFormula && (
              <p className="mt-2 text-xs text-muted font-mono bg-accent p-3 rounded-lg break-all">
                {result.formula} = {result.litersPerWeek} l/tydz.
              </p>
            )}
          </div>

          {/* 7-day forecast */}
          {dailyForecast && (
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-semibold text-primary-dark mb-3">
                Prognoza podlewania — 7 dni
              </h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {dailyForecast.map((d) => (
                  <div
                    key={d.day}
                    className={`flex items-center justify-between rounded-lg border px-3 py-2 text-sm ${RECOMMENDATION_STYLES[d.recommendation]}`}
                  >
                    <div>
                      <p className="font-medium">{d.day}</p>
                      <p className="text-xs opacity-80">{d.reason}</p>
                    </div>
                    <span className="font-semibold text-xs shrink-0 ml-2">
                      {RECOMMENDATION_LABELS[d.recommendation]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Seasonal chart */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold text-primary-dark mb-4">
              Zapotrzebowanie w ciągu roku
            </h3>
            <SeasonalBarChart
              data={result.monthlyNeeds.map((m) => ({
                label: m.month.slice(0, 3),
                value: m.litersPerWeek,
                sublabel: `${m.mmPerWeek} mm`,
                active: m.active,
              }))}
              unit="l/tydz."
              hint="Słupki pokazują litry tygodniowo. Zimą zapotrzebowanie spada — podlewasz tylko w ciepłe dni. Aktualny miesiąc podświetlony."
            />
          </div>

          {/* Schedule */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold text-primary-dark mb-3">
              Harmonogram nawadniania
            </h3>
            <div className="space-y-2">
              {result.schedule.map((s, i) => (
                <div
                  key={i}
                  className={`flex justify-between text-sm border-b border-border/50 pb-2 last:border-0 ${
                    s.skip ? "opacity-60" : ""
                  }`}
                >
                  <span className="font-medium shrink-0 mr-4">{s.day}</span>
                  <span className="text-muted text-right">
                    {s.action}
                    {s.duration && (
                      <span className="block text-xs text-primary">{s.duration}</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Savings */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-accent/50 p-4 text-sm">
              <p className="font-semibold text-primary-dark">Oszczędność z mulczem</p>
              <p className="text-2xl font-bold text-primary mt-1">
                −{result.savingsWithMulch} l/tydz.
              </p>
              <p className="text-xs text-muted mt-1">Kora 5 cm pod roślinami</p>
            </div>
            <div className="rounded-xl border border-border bg-accent/50 p-4 text-sm">
              <p className="font-semibold text-primary-dark">Oszczędność z kroplówką</p>
              <p className="text-2xl font-bold text-primary mt-1">
                −{result.savingsWithDrip} l/tydz.
              </p>
              <p className="text-xs text-muted mt-1">vs zraszacz rotacyjny</p>
            </div>
          </div>

          <TipsList tips={result.tips} />
        </div>
      </div>

      <FAQAccordion items={faqItems} />
    </div>
  );
}
