import type { GardenPlanInput, GardenZone } from "@/lib/calculators/garden-plan";

export interface LayoutRect {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface LayoutTree {
  x: number;
  y: number;
  r: number;
}

export interface PlanLayout {
  plotW: number;
  plotL: number;
  /** Odstęp siatki w metrach dobrany do wielkości działki. */
  gridStep: number;
  /** Obrót litery N na kompasie (stopnie) — góra planu = kierunek ekspozycji ogrodu. */
  northAngle: number;
  hedge: LayoutRect[];
  lawn: LayoutRect | null;
  zones: LayoutRect[];
  paths: LayoutRect[];
  trees: LayoutTree[];
  house: LayoutRect;
  terrace: LayoutRect | null;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

function zoneArea(zones: GardenZone[], id: string): number {
  return zones.find((z) => z.id === id)?.areaM2 ?? 0;
}

export function treeCountFor(areaM2: number): number {
  return areaM2 < 200 ? 1 : areaM2 < 500 ? 2 : 3;
}

/**
 * Deterministyczny, schematyczny układ działki: dom przy dolnej krawędzi,
 * taras przy domu, warzywnik i kącik dzikości w głębi, rabata wzdłuż boku,
 * ścieżka od domu w głąb ogrodu, trawnik jako tło.
 * Wszystkie współrzędne w metrach, origin = lewy górny róg działki.
 */
export function buildPlanLayout(input: GardenPlanInput, zones: GardenZone[]): PlanLayout {
  const W = input.plotWidthM;
  const L = input.plotLengthM;

  const wantsHedge =
    input.wantsHedge || input.goals.includes("zywoplot") || input.goals.includes("prywatnosc");

  const hedge: LayoutRect[] = [];
  const t = clamp(Math.min(W, L) * 0.06, 0.5, 1.2);
  if (wantsHedge) {
    hedge.push(
      { id: "zywoplot", x: 0, y: 0, w: W, h: t },
      { id: "zywoplot", x: 0, y: t, w: t, h: L - t },
      { id: "zywoplot", x: W - t, y: t, w: t, h: L - t }
    );
  }

  const inner = wantsHedge
    ? { x: t, y: t, w: W - 2 * t, h: L - t }
    : { x: 0, y: 0, w: W, h: L };

  const rects: LayoutRect[] = [];

  // Taras / strefa relaksu — przy domu, lewy dolny róg.
  const relaksArea = zoneArea(zones, "relaks");
  let terrace: LayoutRect | null = null;
  if (relaksArea > 1) {
    const h = clamp(relaksArea / (inner.w * 0.55), 1.5, inner.h * 0.3);
    const w = clamp(relaksArea / h, 2, inner.w * 0.55);
    terrace = { id: "relaks", x: inner.x, y: inner.y + inner.h - h, w, h };
    rects.push(terrace);
  }

  // Warzywnik — najdalszy, słoneczny róg (prawy górny).
  const vegArea = zoneArea(zones, "warzywnik");
  if (vegArea > 1) {
    const h = clamp(Math.sqrt(vegArea * 0.8), 1.5, inner.h * 0.34);
    const w = clamp(vegArea / h, 2, inner.w * 0.45);
    rects.push({ id: "warzywnik", x: inner.x + inner.w - w, y: inner.y, w, h });
  }

  // Kącik dzikości — lewy górny róg.
  const wildArea = zoneArea(zones, "dziko");
  if (wildArea > 1) {
    const h = clamp(Math.sqrt(wildArea), 1.5, inner.h * 0.34);
    const w = clamp(wildArea / h, 1.5, inner.w * 0.42);
    rects.push({ id: "dziko", x: inner.x, y: inner.y, w, h });
  }

  // Rabata bylinowa — pas wzdłuż prawej krawędzi, między tarasem a warzywnikiem.
  const bedArea = zoneArea(zones, "rabaty");
  if (bedArea > 1) {
    const top = inner.y + inner.h * 0.36;
    const bottom = inner.y + inner.h - (terrace ? terrace.h : 0) - 0.4;
    const availH = Math.max(bottom - top, 1.5);
    const w = clamp(bedArea / availH, 0.8, inner.w * 0.18);
    rects.push({ id: "rabaty", x: inner.x + inner.w - w, y: top, w, h: availH });
  }

  // Ścieżka — od domu w głąb ogrodu, na prawo od tarasu.
  const paths: LayoutRect[] = [];
  if (zoneArea(zones, "sciezki") > 0.5) {
    const pw = clamp(inner.w * 0.06, 0.7, 1.2);
    const px = clamp(
      (terrace ? terrace.x + terrace.w : inner.x) + 0.4,
      inner.x + 0.5,
      inner.x + inner.w * 0.6
    );
    paths.push({ id: "sciezki", x: px, y: inner.y + inner.h * 0.12, w: pw, h: inner.h * 0.88 });
    if (vegArea > 1) {
      // Odnoga do warzywnika.
      paths.push({
        id: "sciezki",
        x: px,
        y: inner.y + inner.h * 0.12,
        w: inner.x + inner.w - px,
        h: pw * 0.8,
      });
    }
  }

  // Drzewa — stałe sloty w części trawnikowej.
  const trees: LayoutTree[] = [];
  if (input.wantsTrees) {
    const r = clamp(Math.min(W, L) * 0.09, 1, 2.4);
    const slots: [number, number][] = [
      [0.34, 0.48],
      [0.72, 0.62],
      [0.22, 0.72],
    ];
    for (const [fx, fy] of slots.slice(0, treeCountFor(input.areaM2))) {
      trees.push({ x: inner.x + inner.w * fx, y: inner.y + inner.h * fy, r });
    }
  }

  const houseW = clamp(inner.w * 0.45, 3, 12);
  const house: LayoutRect = {
    id: "dom",
    x: terrace ? terrace.x : inner.x,
    y: L + 0.6,
    w: houseW,
    h: 3,
  };

  const maxDim = Math.max(W, L);
  const gridStep = maxDim <= 20 ? 1 : maxDim <= 45 ? 2 : 5;

  const northAngle =
    input.exposure === "polnoc" ? 0 : input.exposure === "wschod" ? -90 : input.exposure === "zachod" ? 90 : 180;

  return {
    plotW: W,
    plotL: L,
    gridStep,
    northAngle,
    hedge,
    lawn: { id: "trawnik", ...inner },
    zones: rects,
    paths,
    trees,
    house,
    terrace,
  };
}
