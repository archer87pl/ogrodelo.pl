"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { FormField, inputClass, selectClass } from "@/components/FormField";
import { ResultCard, TipsList } from "@/components/ResultCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { SeasonalBarChart } from "@/components/SeasonalBarChart";
import { GardenPlanPresetNav } from "@/components/calculators/GardenPlanPresetNav";
import { GardenPlanVisualization } from "@/components/calculators/GardenPlanVisualization";
import {
  generateGardenPlan,
  getDefaultGardenPlanInput,
  derivePlotDims,
  GARDEN_GOAL_OPTIONS,
  SOIL_OPTIONS,
  SUN_OPTIONS,
  BUDGET_OPTIONS,
  MAINTENANCE_OPTIONS,
  EXPOSURE_OPTIONS,
  MAIN_GARDEN_PLAN_FAQ,
  type GardenGoal,
  type GardenPlanInput,
  type SoilType,
  type SunLevel,
  type BudgetLevel,
  type MaintenanceLevel,
  type SlopeLevel,
  type Exposure,
} from "@/lib/calculators/garden-plan";
import type { GardenPlanPreset } from "@/lib/constants/garden-plan-presets";

interface GardenPlanGeneratorProps {
  preset?: GardenPlanPreset;
}

const STEPS = [
  { id: 1, title: "Działka", icon: "📐" },
  { id: 2, title: "Cele", icon: "🎯" },
  { id: 3, title: "Warunki", icon: "☀️" },
  { id: 4, title: "Styl życia", icon: "👨‍👩‍👧" },
  { id: 5, title: "Elementy", icon: "🛠️" },
  { id: 6, title: "Plan", icon: "📋" },
];

const DRAFT_KEY = "ogrodelo:garden-plan:draft:v1";

function estimateHedgeLength(widthM: number, lengthM: number): number {
  // Żywopłot zwykle wzdłuż 3 granic (bez frontu przy domu).
  return Math.max(5, Math.round(2 * lengthM + widthM));
}

function inputToParams(input: GardenPlanInput): URLSearchParams {
  const p = new URLSearchParams();
  p.set("a", String(input.areaM2));
  p.set("w", String(input.plotWidthM));
  p.set("l", String(input.plotLengthM));
  p.set("ex", input.exposure);
  if (input.goals.length) p.set("g", input.goals.join("."));
  p.set("so", input.soil);
  p.set("su", input.sun);
  p.set("sp", input.slope);
  p.set("b", input.budget);
  p.set("m", input.maintenance);
  const flags: [string, boolean][] = [
    ["pe", input.hasPets],
    ["ch", input.hasChildren],
    ["ir", input.wantsIrrigation],
    ["rw", input.wantsRainwater],
    ["he", input.wantsHedge],
    ["tr", input.wantsTrees],
    ["ve", input.wantsVegetableBed],
  ];
  for (const [k, v] of flags) if (v) p.set(k, "1");
  if (input.wantsHedge && input.hedgeLengthM > 0) p.set("hl", String(input.hedgeLengthM));
  return p;
}

function pickOption<T extends string>(raw: string | null, allowed: readonly T[], fallback: T): T {
  return allowed.includes(raw as T) ? (raw as T) : fallback;
}

function paramsToInput(sp: URLSearchParams): GardenPlanInput | null {
  const a = Number(sp.get("a"));
  if (!Number.isFinite(a) || a < 10 || a > 20000) return null;
  const base = getDefaultGardenPlanInput({ areaM2: a });

  const w = Number(sp.get("w"));
  const l = Number(sp.get("l"));
  const goalValues = GARDEN_GOAL_OPTIONS.map((o) => o.value);
  const goals = (sp.get("g") ?? "")
    .split(".")
    .filter((g): g is GardenGoal => goalValues.includes(g as GardenGoal));
  const hl = Number(sp.get("hl"));

  return {
    ...base,
    areaM2: a,
    plotWidthM: Number.isFinite(w) && w >= 2 && w <= 500 ? w : base.plotWidthM,
    plotLengthM: Number.isFinite(l) && l >= 2 && l <= 500 ? l : base.plotLengthM,
    exposure: pickOption(sp.get("ex"), EXPOSURE_OPTIONS.map((o) => o.value), "poludnie"),
    goals,
    soil: pickOption(sp.get("so"), SOIL_OPTIONS.map((o) => o.value), "prochnica"),
    sun: pickOption(sp.get("su"), SUN_OPTIONS.map((o) => o.value), "pelne"),
    slope: pickOption(sp.get("sp"), ["plaski", "lekki", "stromy"] as const, "plaski"),
    budget: pickOption(sp.get("b"), BUDGET_OPTIONS.map((o) => o.value), "sredni"),
    maintenance: pickOption(sp.get("m"), MAINTENANCE_OPTIONS.map((o) => o.value), "umiarkowana"),
    hasPets: sp.get("pe") === "1",
    hasChildren: sp.get("ch") === "1",
    wantsIrrigation: sp.get("ir") === "1",
    wantsRainwater: sp.get("rw") === "1",
    wantsHedge: sp.get("he") === "1",
    wantsTrees: sp.get("tr") === "1",
    wantsVegetableBed: sp.get("ve") === "1",
    hedgeLengthM: Number.isFinite(hl) && hl > 0 && hl <= 1000 ? hl : base.hedgeLengthM,
  };
}

export function GardenPlanGenerator({ preset }: GardenPlanGeneratorProps) {
  const defaults = getDefaultGardenPlanInput(preset?.defaults);

  const [step, setStep] = useState(1);
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const hydrated = useRef(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const [areaM2, setAreaM2] = useState(defaults.areaM2);
  const [plotWidthM, setPlotWidthM] = useState(defaults.plotWidthM);
  const [plotLengthM, setPlotLengthM] = useState(defaults.plotLengthM);
  const [exposure, setExposure] = useState<Exposure>(defaults.exposure);
  const [goals, setGoals] = useState<GardenGoal[]>(defaults.goals);
  const [soil, setSoil] = useState<SoilType>(defaults.soil);
  const [sun, setSun] = useState<SunLevel>(defaults.sun);
  const [slope, setSlope] = useState<SlopeLevel>(defaults.slope);
  const [budget, setBudget] = useState<BudgetLevel>(defaults.budget);
  const [maintenance, setMaintenance] = useState<MaintenanceLevel>(defaults.maintenance);
  const [hasPets, setHasPets] = useState(defaults.hasPets);
  const [hasChildren, setHasChildren] = useState(defaults.hasChildren);
  const [wantsIrrigation, setWantsIrrigation] = useState(defaults.wantsIrrigation);
  const [wantsRainwater, setWantsRainwater] = useState(defaults.wantsRainwater);
  const [wantsHedge, setWantsHedge] = useState(defaults.wantsHedge);
  const [wantsTrees, setWantsTrees] = useState(defaults.wantsTrees);
  const [wantsVegetableBed, setWantsVegetableBed] = useState(defaults.wantsVegetableBed);
  const [hedgeLengthM, setHedgeLengthM] = useState(
    defaults.hedgeLengthM || estimateHedgeLength(defaults.plotWidthM, defaults.plotLengthM)
  );

  const input: GardenPlanInput = useMemo(
    () => ({
      areaM2,
      plotWidthM,
      plotLengthM,
      exposure,
      goals,
      soil,
      sun,
      slope,
      budget,
      maintenance,
      hasPets,
      hasChildren,
      wantsIrrigation,
      wantsRainwater,
      wantsHedge,
      wantsTrees,
      wantsVegetableBed,
      hedgeLengthM: wantsHedge ? hedgeLengthM : 0,
    }),
    [
      areaM2,
      plotWidthM,
      plotLengthM,
      exposure,
      goals,
      soil,
      sun,
      slope,
      budget,
      maintenance,
      hasPets,
      hasChildren,
      wantsIrrigation,
      wantsRainwater,
      wantsHedge,
      wantsTrees,
      wantsVegetableBed,
      hedgeLengthM,
    ]
  );

  function applyInput(i: GardenPlanInput) {
    setAreaM2(i.areaM2);
    setPlotWidthM(i.plotWidthM);
    setPlotLengthM(i.plotLengthM);
    setExposure(i.exposure);
    setGoals(i.goals);
    setSoil(i.soil);
    setSun(i.sun);
    setSlope(i.slope);
    setBudget(i.budget);
    setMaintenance(i.maintenance);
    setHasPets(i.hasPets);
    setHasChildren(i.hasChildren);
    setWantsIrrigation(i.wantsIrrigation);
    setWantsRainwater(i.wantsRainwater);
    setWantsHedge(i.wantsHedge);
    setWantsTrees(i.wantsTrees);
    setWantsVegetableBed(i.wantsVegetableBed);
    if (i.hedgeLengthM > 0) setHedgeLengthM(i.hedgeLengthM);
  }

  // Plan z linku (?a=...) lub wersja robocza z przeglądarki.
  useEffect(() => {
    try {
      const sp = new URLSearchParams(window.location.search);
      const fromUrl = sp.has("a") ? paramsToInput(sp) : null;
      if (fromUrl) {
        applyInput(fromUrl);
        setStep(6);
        setGenerated(true);
      } else if (!preset) {
        const raw = window.localStorage.getItem(DRAFT_KEY);
        if (raw) {
          const draft = JSON.parse(raw) as Partial<GardenPlanInput>;
          if (typeof draft.areaM2 === "number") {
            applyInput({ ...getDefaultGardenPlanInput(), ...draft });
          }
        }
      }
    } catch {
      // Uszkodzony draft/link — startujemy od domyślnych wartości.
    }
    hydrated.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Autozapis wersji roboczej.
  useEffect(() => {
    if (!hydrated.current || preset) return;
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(input));
    } catch {
      // localStorage niedostępny (tryb prywatny) — pomijamy autozapis.
    }
  }, [input, preset]);

  const result = useMemo(
    () => (generated ? generateGardenPlan(input) : null),
    [generated, input]
  );

  const faqItems = preset
    ? [...preset.faq, ...MAIN_GARDEN_PLAN_FAQ.slice(0, 3)]
    : MAIN_GARDEN_PLAN_FAQ;

  function toggleGoal(g: GardenGoal) {
    setGoals((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );
  }

  function nextStep() {
    if (step < 6) setStep(step + 1);
    else {
      setGenerated(true);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    }
  }

  function prevStep() {
    if (step > 1) {
      setStep(step - 1);
      if (step === 6) setGenerated(false);
    }
  }

  function syncHedge(w: number, l: number) {
    if (!wantsHedge) setHedgeLengthM(estimateHedgeLength(w, l));
  }

  function handleAreaChange(val: number) {
    setAreaM2(val);
    if (val > 0) {
      const ratio = plotLengthM > 0 ? plotWidthM / plotLengthM : 4 / 3;
      const dims =
        ratio > 0.1 && ratio < 10
          ? (() => {
              const w = Math.max(2, Math.round(Math.sqrt(val * ratio) * 2) / 2);
              const l = Math.max(2, Math.round((val / w) * 2) / 2);
              return { w, l };
            })()
          : derivePlotDims(val);
      setPlotWidthM(dims.w);
      setPlotLengthM(dims.l);
      syncHedge(dims.w, dims.l);
    }
  }

  function handleWidthChange(val: number) {
    setPlotWidthM(val);
    if (val > 0 && plotLengthM > 0) {
      setAreaM2(Math.round(val * plotLengthM));
      syncHedge(val, plotLengthM);
    }
  }

  function handleLengthChange(val: number) {
    setPlotLengthM(val);
    if (val > 0 && plotWidthM > 0) {
      setAreaM2(Math.round(plotWidthM * val));
      syncHedge(plotWidthM, val);
    }
  }

  async function copyShareLink() {
    const url = `${window.location.origin}/generator-planu-ogrodu?${inputToParams(input).toString()}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt("Skopiuj link do planu:", url);
    }
  }

  const zoneChartData =
    result?.zones.map((z) => ({
      label: z.icon + " " + z.name.split(" ")[0]!,
      value: z.areaM2,
      sublabel: `${z.percent}%`,
    })) ?? [];

  const scoreItems = result
    ? [
        { label: "Ekologia", value: result.scores.sustainability },
        { label: "Niska pielęgnacja", value: result.scores.lowMaintenance },
        { label: "Przyjazny rodzinie", value: result.scores.familyFriendly },
        { label: "Bioróżnorodność", value: result.scores.biodiversity },
      ]
    : [];

  const shoppingTotal = result?.shopping.reduce((s, i) => s + i.total, 0) ?? 0;

  return (
    <div className="space-y-8">
      <div className="print:hidden">
        <GardenPlanPresetNav currentSlug={preset?.slug} />
      </div>

      {preset?.intro && (
        <p className="text-muted leading-relaxed max-w-3xl print:hidden">{preset.intro}</p>
      )}

      {/* Progress */}
      <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 print:hidden">
        <div className="flex justify-between gap-1 mb-3">
          {STEPS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                if (s.id < step || generated) {
                  setStep(s.id);
                  if (s.id < 6) setGenerated(false);
                }
              }}
              className={`flex-1 text-center py-2 rounded-lg text-xs sm:text-sm transition-colors ${
                step === s.id
                  ? "bg-primary text-white font-semibold"
                  : s.id < step
                    ? "bg-accent text-primary-dark hover:bg-accent/80"
                    : "text-muted"
              }`}
            >
              <span className="hidden sm:inline">{s.icon} </span>
              {s.title}
            </button>
          ))}
        </div>
        <div className="h-1.5 bg-accent rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((step - 1) / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-8 print:border-0 print:p-0">
        {step === 1 && (
          <div className="space-y-6 max-w-lg">
            <h2 className="text-xl font-bold text-primary-dark">📐 Twoja działka</h2>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Szerokość" htmlFor="plot-w" hint="wzdłuż domu">
                <div className="flex items-center gap-2">
                  <input
                    id="plot-w"
                    type="number"
                    min={2}
                    max={500}
                    step={0.5}
                    className={inputClass}
                    value={plotWidthM}
                    onChange={(e) => handleWidthChange(Number(e.target.value))}
                  />
                  <span className="text-muted shrink-0">m</span>
                </div>
              </FormField>
              <FormField label="Długość" htmlFor="plot-l" hint="w głąb ogrodu">
                <div className="flex items-center gap-2">
                  <input
                    id="plot-l"
                    type="number"
                    min={2}
                    max={500}
                    step={0.5}
                    className={inputClass}
                    value={plotLengthM}
                    onChange={(e) => handleLengthChange(Number(e.target.value))}
                  />
                  <span className="text-muted shrink-0">m</span>
                </div>
              </FormField>
            </div>
            <FormField
              label="Powierzchnia ogrodu"
              htmlFor="area"
              hint="Możesz też wpisać samą powierzchnię — wymiary dopasują się automatycznie"
            >
              <div className="flex items-center gap-2">
                <input
                  id="area"
                  type="number"
                  min={30}
                  max={5000}
                  className={inputClass}
                  value={areaM2}
                  onChange={(e) => handleAreaChange(Number(e.target.value))}
                />
                <span className="text-muted shrink-0">m²</span>
              </div>
            </FormField>
            <div className="rounded-xl bg-accent/50 p-4 text-sm text-muted">
              <p>
                <strong className="text-foreground">Szacowany żywopłot (3 granice):</strong>{" "}
                ~{estimateHedgeLength(plotWidthM, plotLengthM)} mb
              </p>
              <p className="mt-1">
                <strong className="text-foreground">Profil:</strong>{" "}
                {areaM2 < 150
                  ? "mały ogród miejski"
                  : areaM2 < 400
                    ? "średni ogród rodzinny"
                    : areaM2 < 800
                      ? "duży ogród działkowy"
                      : "rozległa posesja"}
              </p>
            </div>
            <FormField
              label="W którą stronę świata wychodzi ogród?"
              htmlFor="exposure"
              hint={EXPOSURE_OPTIONS.find((o) => o.value === exposure)?.hint}
            >
              <select
                id="exposure"
                className={selectClass}
                value={exposure}
                onChange={(e) => setExposure(e.target.value as Exposure)}
              >
                {EXPOSURE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </FormField>
            <FormField label="Nachylenie terenu" htmlFor="slope">
              <select
                id="slope"
                className={selectClass}
                value={slope}
                onChange={(e) => setSlope(e.target.value as SlopeLevel)}
              >
                <option value="plaski">Płaski</option>
                <option value="lekki">Lekkie nachylenie</option>
                <option value="stromy">Stromy stok</option>
              </select>
            </FormField>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-primary-dark">🎯 Co chcesz osiągnąć?</h2>
            <p className="text-sm text-muted">Zaznacz wszystkie ważne cele — plan dostosuje proporcje stref.</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {GARDEN_GOAL_OPTIONS.map((g) => (
                <label
                  key={g.value}
                  className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition-colors ${
                    goals.includes(g.value)
                      ? "border-primary bg-accent"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={goals.includes(g.value)}
                    onChange={() => toggleGoal(g.value)}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="font-medium text-foreground">{g.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 max-w-lg">
            <h2 className="text-xl font-bold text-primary-dark">☀️ Warunki stanowiska</h2>
            <FormField label="Typ gleby" htmlFor="soil">
              <select
                id="soil"
                className={selectClass}
                value={soil}
                onChange={(e) => setSoil(e.target.value as SoilType)}
              >
                {SOIL_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </FormField>
            <p className="text-xs text-muted -mt-4">
              {SOIL_OPTIONS.find((o) => o.value === soil)?.hint}
            </p>
            <FormField label="Nasłonecznienie" htmlFor="sun">
              <select
                id="sun"
                className={selectClass}
                value={sun}
                onChange={(e) => setSun(e.target.value as SunLevel)}
              >
                {SUN_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </FormField>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 max-w-lg">
            <h2 className="text-xl font-bold text-primary-dark">👨‍👩‍👧 Styl życia i budżet</h2>
            <FormField label="Budżet na realizację" htmlFor="budget">
              <select
                id="budget"
                className={selectClass}
                value={budget}
                onChange={(e) => setBudget(e.target.value as BudgetLevel)}
              >
                {BUDGET_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label} — {o.hint}
                  </option>
                ))}
              </select>
            </FormField>
            <FormField label="Czas na pielęgnację" htmlFor="maintenance">
              <select
                id="maintenance"
                className={selectClass}
                value={maintenance}
                onChange={(e) => setMaintenance(e.target.value as MaintenanceLevel)}
              >
                {MAINTENANCE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </FormField>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasChildren}
                  onChange={(e) => setHasChildren(e.target.checked)}
                  className="rounded border-border text-primary"
                />
                <span>Mam małe dzieci (bezpieczne rośliny, strefa zabaw)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasPets}
                  onChange={(e) => setHasPets(e.target.checked)}
                  className="rounded border-border text-primary"
                />
                <span>Mam psy/koty (unikamy toksycznych roślin)</span>
              </label>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6 max-w-lg">
            <h2 className="text-xl font-bold text-primary-dark">🛠️ Elementy ogrodu</h2>
            <div className="space-y-3">
              {[
                { val: wantsHedge, set: setWantsHedge, label: "Żywopłot / ekran prywatności" },
                { val: wantsTrees, set: setWantsTrees, label: "Drzewa (cień, dekoracja)" },
                { val: wantsVegetableBed, set: setWantsVegetableBed, label: "Grządki warzywne" },
                { val: wantsIrrigation, set: setWantsIrrigation, label: "Automatyczne nawadnianie" },
                { val: wantsRainwater, set: setWantsRainwater, label: "Zbiornik na deszczówkę" },
              ].map((item) => (
                <label key={item.label} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.val}
                    onChange={(e) => item.set(e.target.checked)}
                    className="rounded border-border text-primary"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
            {wantsHedge && (
              <FormField label="Długość żywopłotu" htmlFor="hedge-len">
                <div className="flex items-center gap-2">
                  <input
                    id="hedge-len"
                    type="number"
                    min={5}
                    max={500}
                    className={inputClass}
                    value={hedgeLengthM}
                    onChange={(e) => setHedgeLengthM(Number(e.target.value))}
                  />
                  <span className="text-muted">mb</span>
                </div>
              </FormField>
            )}
          </div>
        )}

        {step === 6 && !generated && (
          <div className="space-y-6 text-center max-w-md mx-auto py-8">
            <h2 className="text-xl font-bold text-primary-dark">Gotowy do wygenerowania planu?</h2>
            <p className="text-muted">
              Na podstawie ankiety przygotujemy rysunek działki 2D, podział na strefy, kosztorys,
              listę zakupów, harmonogram 4 faz i kalendarz pielęgnacji na 12 miesięcy.
            </p>
            <ul className="text-left text-sm text-muted space-y-2">
              <li>✓ Działka: {plotWidthM} × {plotLengthM} m ({areaM2} m²)</li>
              <li>✓ Cele: {goals.length || "uniwersalny"}</li>
              <li>✓ Budżet: {BUDGET_OPTIONS.find((b) => b.value === budget)?.label}</li>
            </ul>
          </div>
        )}

        {step === 6 && generated && result && (
          <div className="space-y-10" ref={resultsRef}>
            <div className="rounded-xl bg-accent/60 border border-primary/20 p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-primary-dark mb-1">
                    {result.profileLabel} · {plotWidthM} × {plotLengthM} m · {areaM2} m²
                  </p>
                  <p className="text-muted leading-relaxed">{result.summary}</p>
                </div>
                <div className="flex gap-2 shrink-0 print:hidden">
                  <button
                    type="button"
                    onClick={copyShareLink}
                    className="rounded-full border border-primary px-4 py-1.5 text-sm font-medium text-primary hover:bg-accent transition-colors"
                  >
                    {copied ? "✓ Skopiowano!" : "🔗 Kopiuj link do planu"}
                  </button>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="rounded-full border border-border px-4 py-1.5 text-sm font-medium text-muted hover:border-primary hover:text-primary transition-colors"
                  >
                    🖨️ Drukuj / PDF
                  </button>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <ResultCard
                label="Koszt (min.)"
                value={result.totalMin.toLocaleString("pl-PL")}
                unit="PLN"
                highlight
              />
              <ResultCard
                label="Koszt (max.)"
                value={result.totalMax.toLocaleString("pl-PL")}
                unit="PLN"
              />
              <ResultCard
                label="Utrzymanie / rok"
                value={result.yearlyMaintenance.toLocaleString("pl-PL")}
                unit="PLN"
              />
              <ResultCard
                label="Woda / tydzień"
                value={result.irrigationLitersWeek}
                unit="l"
              />
            </div>

            <div>
              <h3 className="font-semibold text-primary-dark text-lg mb-1">
                🗺️ Plan Twojej działki
              </h3>
              <p className="text-sm text-muted mb-4">
                Schematyczne rozmieszczenie stref w skali — punkt wyjścia do własnego projektu.
              </p>
              <GardenPlanVisualization layout={result.layout} zones={result.zones} />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <h3 className="font-semibold text-primary-dark mb-4">Podział na strefy</h3>
                <SeasonalBarChart
                  data={zoneChartData}
                  unit="m²"
                  ariaLabel="Wykres podziału ogrodu na strefy"
                />
              </div>
              <div>
                <h3 className="font-semibold text-primary-dark mb-4">Ocena planu</h3>
                <div className="space-y-3">
                  {scoreItems.map((s) => (
                    <div key={s.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-foreground">{s.label}</span>
                        <span className="font-medium text-primary-dark">{s.value}/100</span>
                      </div>
                      <div className="h-2.5 bg-accent rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${s.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-primary-dark text-lg">Strefy ogrodu</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {result.zones.map((z) => (
                  <div
                    key={z.id}
                    className="rounded-xl border border-border p-4 hover:border-primary/40 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-foreground">
                        {z.icon} {z.name}
                      </p>
                      <span className="text-sm font-medium text-primary whitespace-nowrap">
                        {z.areaM2} m²
                      </span>
                    </div>
                    <p className="text-sm text-muted mt-2">{z.description}</p>
                    <ul className="mt-2 text-xs text-muted space-y-0.5">
                      {z.plants.map((p) => (
                        <li key={p}>• {p}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {(wantsHedge || goals.includes("zywoplot")) && (
              <div className="rounded-xl border border-border bg-accent/30 p-4">
                <p className="font-semibold text-primary-dark">Rekomendowany żywopłot</p>
                <p className="text-sm text-muted mt-1">{result.hedgeSpecies}</p>
              </div>
            )}

            {wantsTrees && result.treeSuggestions.length > 0 && (
              <div className="rounded-xl border border-border p-4">
                <p className="font-semibold text-primary-dark mb-2">Propozycje drzew</p>
                <ul className="text-sm text-muted space-y-1">
                  {result.treeSuggestions.map((t) => (
                    <li key={t}>🌳 {t}</li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h3 className="font-semibold text-primary-dark text-lg mb-4">
                Harmonogram realizacji (4 fazy)
              </h3>
              <div className="space-y-4">
                {result.phases.map((ph) => (
                  <div
                    key={ph.phase}
                    className="rounded-xl border border-border p-4 sm:p-5 border-l-4 border-l-primary"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-semibold text-foreground">
                        Faza {ph.phase}: {ph.title}
                      </p>
                      <span className="text-sm font-medium text-primary">
                        ~{ph.estimatedCost.toLocaleString("pl-PL")} PLN
                      </span>
                    </div>
                    <p className="text-xs text-muted mt-1">{ph.season}</p>
                    <ul className="mt-3 text-sm text-muted space-y-1">
                      {ph.tasks.map((t) => (
                        <li key={t}>• {t}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border overflow-hidden">
              <div className="p-5 border-b border-border bg-accent/40">
                <h3 className="font-semibold text-primary-dark text-lg">Kosztorys szczegółowy</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[560px]">
                  <thead className="bg-accent">
                    <tr>
                      <th className="text-left p-3 font-semibold">Kategoria</th>
                      <th className="text-left p-3 font-semibold">Pozycja</th>
                      <th className="text-left p-3 font-semibold">Ilość</th>
                      <th className="text-right p-3 font-semibold">Koszt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.costs.map((c, i) => (
                      <tr key={i} className={`border-t border-border ${c.optional ? "opacity-70" : ""}`}>
                        <td className="p-3 text-muted">{c.category}</td>
                        <td className="p-3">
                          {c.item}
                          {c.optional && (
                            <span className="ml-1 text-xs text-muted">(opcja)</span>
                          )}
                        </td>
                        <td className="p-3 text-muted">{c.quantity}</td>
                        <td className="p-3 text-right font-medium">
                          {c.total.toLocaleString("pl-PL")} PLN
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-primary bg-accent/50 font-semibold">
                      <td colSpan={3} className="p-3 text-primary-dark">
                        Razem (zakres)
                      </td>
                      <td className="p-3 text-right text-primary-dark">
                        {result.totalMin.toLocaleString("pl-PL")} –{" "}
                        {result.totalMax.toLocaleString("pl-PL")} PLN
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {result.shopping.length > 0 && (
              <div className="rounded-2xl border border-border overflow-hidden">
                <div className="p-5 border-b border-border bg-accent/40">
                  <h3 className="font-semibold text-primary-dark text-lg">🛒 Lista zakupów</h3>
                  <p className="text-sm text-muted mt-1">
                    Konkretne ilości do centrum ogrodniczego — ceny orientacyjne dla wybranego budżetu.
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm min-w-[560px]">
                    <thead className="bg-accent">
                      <tr>
                        <th className="text-left p-3 font-semibold">Produkt</th>
                        <th className="text-left p-3 font-semibold">Ilość</th>
                        <th className="text-right p-3 font-semibold">Cena jedn.</th>
                        <th className="text-right p-3 font-semibold">Razem</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.shopping.map((item, i) => (
                        <tr key={i} className={`border-t border-border ${item.optional ? "opacity-70" : ""}`}>
                          <td className="p-3">
                            <span className="font-medium text-foreground">
                              {item.name}
                              {item.optional && <span className="ml-1 text-xs text-muted">(opcja)</span>}
                            </span>
                            <span className="block text-xs text-muted mt-0.5">{item.detail}</span>
                          </td>
                          <td className="p-3 text-muted whitespace-nowrap">{item.quantity}</td>
                          <td className="p-3 text-right text-muted whitespace-nowrap">
                            {item.unitCost.toLocaleString("pl-PL")} PLN
                          </td>
                          <td className="p-3 text-right font-medium whitespace-nowrap">
                            {item.total.toLocaleString("pl-PL")} PLN
                          </td>
                        </tr>
                      ))}
                      <tr className="border-t-2 border-primary bg-accent/50 font-semibold">
                        <td colSpan={3} className="p-3 text-primary-dark">
                          Orientacyjna wartość koszyka
                        </td>
                        <td className="p-3 text-right text-primary-dark whitespace-nowrap">
                          {shoppingTotal.toLocaleString("pl-PL")} PLN
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div>
              <h3 className="font-semibold text-primary-dark text-lg mb-1">
                📅 Kalendarz pielęgnacji — 12 miesięcy
              </h3>
              <p className="text-sm text-muted mb-4">
                Zadania dopasowane do elementów Twojego planu.
              </p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {result.monthlyCalendar.map((mo) => (
                  <div key={mo.month} className="rounded-xl border border-border p-4">
                    <p className="font-semibold text-primary-dark text-sm mb-2">{mo.month}</p>
                    <ul className="text-xs text-muted space-y-1.5">
                      {mo.tasks.map((t) => (
                        <li key={t} className="flex gap-1.5">
                          <span className="text-primary shrink-0">•</span>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="print:hidden">
              <h3 className="font-semibold text-primary-dark text-lg mb-4">
                Rekomendacje i powiązane narzędzia
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {result.recommendations.map((r) => (
                  <div
                    key={r.title}
                    className="rounded-xl border border-border p-4 hover:border-primary transition-colors"
                  >
                    <p className="font-semibold text-foreground">{r.title}</p>
                    <p className="text-sm text-muted mt-1">{r.description}</p>
                    {r.link && (
                      <Link
                        href={r.link}
                        className="inline-block mt-2 text-sm text-primary hover:underline font-medium"
                      >
                        Otwórz narzędzie →
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-border print:hidden">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            className="rounded-full border border-border px-5 py-2 text-sm font-medium text-muted hover:border-primary hover:text-primary disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            ← Wstecz
          </button>
          {step < 6 ? (
            <button
              type="button"
              onClick={nextStep}
              className="rounded-full bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
            >
              Dalej →
            </button>
          ) : !generated ? (
            <button
              type="button"
              onClick={nextStep}
              className="rounded-full bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
            >
              Generuj plan 🌿
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setGenerated(false);
                setStep(1);
                try {
                  window.localStorage.removeItem(DRAFT_KEY);
                } catch {
                  // brak dostępu do localStorage — nic do wyczyszczenia
                }
              }}
              className="rounded-full border border-primary px-6 py-2 text-sm font-medium text-primary hover:bg-accent transition-colors"
            >
              Nowa ankieta
            </button>
          )}
        </div>
      </div>

      {generated && <TipsList tips={result?.tips ?? []} />}
      <div className="print:hidden">
        <FAQAccordion items={faqItems} />
      </div>
    </div>
  );
}
