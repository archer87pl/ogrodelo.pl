export type ShrubSpecies =
  | "laurowisnia"
  | "tuja"
  | "ostrokrzew"
  | "berberys"
  | "bukszpan"
  | "hortensja"
  | "forsycja"
  | "bez"
  | "pigwowiec"
  | "tawula"
  | "deren"
  | "kalina";

export type SunExposure = "pelne" | "polcień" | "cien";
export type FoundationRisk = "niskie" | "srednie" | "wysokie";
export type ComparisonWinner = "a" | "b" | "tie";

export interface GardenFitScores {
  smallGarden: number;
  largeGarden: number;
  nearHouse: number;
  nearFence: number;
  fastEffect: number;
}

export interface ShrubSpeciesData {
  name: string;
  latinName: string;
  growthPerYearCm: number;
  initialHeightM: number;
  maxHeightM: number;
  maxCrownWidthM: number;
  yearsToFullMaturity: number;
  sun: SunExposure;
  sunLabel: string;
  droughtResistance: number;
  frostZone: string;
  soilRequirements: string;
  rootAggressiveness: number;
  foundationRisk: FoundationRisk;
  shadePercentAtMaturity: number;
  messiness: number;
  messinessLabel: string;
  waterNeed: number;
  maintenanceFrequency: number;
  diseaseSusceptibility: number;
  minDistHouseM: number;
  minDistFenceM: number;
  lifespanYears: number;
  saplingCostPln: number;
  yearsToShade: number;
  yearsToPrivacy: number;
  privacyScreeningRate: number;
  evergreen: boolean;
  hedgeSuitable: boolean;
  flowering: boolean;
  gardenFit: GardenFitScores;
  description: string;
}

export interface HeightPoint {
  years: number;
  heightM: number;
}

export interface ComparisonRow {
  category: string;
  metric: string;
  valueA: string;
  valueB: string;
  rawA?: number;
  rawB?: number;
  higherIsBetter?: boolean;
  winner?: ComparisonWinner;
}

export interface BarMetric {
  label: string;
  valueA: number;
  valueB: number;
  unit?: string;
  higherIsBetter?: boolean;
}

export interface ShrubScatterPoint {
  species: ShrubSpecies;
  name: string;
  waterNeed: number;
  growthPerYearCm: number;
  isA?: boolean;
  isB?: boolean;
}

export interface ShrubComparatorResult {
  speciesA: ShrubSpeciesData;
  speciesB: ShrubSpeciesData;
  slugA: ShrubSpecies;
  slugB: ShrubSpecies;
  heightCurveA: HeightPoint[];
  heightCurveB: HeightPoint[];
  comparisonRows: ComparisonRow[];
  barMetrics: BarMetric[];
  fitScoresA: { label: string; value: number }[];
  fitScoresB: { label: string; value: number }[];
  scatterPoints: ShrubScatterPoint[];
  verdict: string;
  tips: string[];
}

const CURVE_YEARS = [1, 2, 3, 5, 10, 15, 20];

const SUN_LABELS: Record<SunExposure, string> = {
  pelne: "Pełne słońce",
  polcień: "Półcień",
  cien: "Cień",
};

export const SHRUBS: Record<ShrubSpecies, ShrubSpeciesData> = {
  laurowisnia: {
    name: "Laurowiśnia",
    latinName: "Prunus laurocerasus",
    growthPerYearCm: 40,
    initialHeightM: 0.4,
    maxHeightM: 4,
    maxCrownWidthM: 2.5,
    yearsToFullMaturity: 8,
    sun: "polcień",
    sunLabel: SUN_LABELS.polcień,
    droughtResistance: 3,
    frostZone: "6a–8b",
    soilRequirements: "Żyzna, przepuszczalna; toleruje cień",
    rootAggressiveness: 2,
    foundationRisk: "niskie",
    shadePercentAtMaturity: 15,
    messiness: 2,
    messinessLabel: "Liście, czarne owoce",
    waterNeed: 3,
    maintenanceFrequency: 2,
    diseaseSusceptibility: 2,
    minDistHouseM: 1.5,
    minDistFenceM: 0.5,
    lifespanYears: 40,
    saplingCostPln: 18,
    yearsToShade: 3,
    yearsToPrivacy: 3,
    privacyScreeningRate: 35,
    evergreen: true,
    hedgeSuitable: true,
    flowering: true,
    gardenFit: { smallGarden: 9, largeGarden: 7, nearHouse: 8, nearFence: 10, fastEffect: 9 },
    description:
      "Zimozielony klasyk na żywopłot — szybki, gęsty, toleruje cień. Popularna alternatywa dla tui.",
  },
  tuja: {
    name: "Tuja",
    latinName: "Thuja occidentalis",
    growthPerYearCm: 35,
    initialHeightM: 0.35,
    maxHeightM: 5,
    maxCrownWidthM: 1.5,
    yearsToFullMaturity: 10,
    sun: "pelne",
    sunLabel: SUN_LABELS.pelne,
    droughtResistance: 3,
    frostZone: "6a–8a",
    soilRequirements: "Przepuszczalna, umiarkowanie wilgotna",
    rootAggressiveness: 2,
    foundationRisk: "niskie",
    shadePercentAtMaturity: 10,
    messiness: 1,
    messinessLabel: "Igły (minimalny)",
    waterNeed: 3,
    maintenanceFrequency: 1,
    diseaseSusceptibility: 4,
    minDistHouseM: 1.5,
    minDistFenceM: 0.5,
    lifespanYears: 50,
    saplingCostPln: 15,
    yearsToShade: 4,
    yearsToPrivacy: 4,
    privacyScreeningRate: 30,
    evergreen: true,
    hedgeSuitable: true,
    flowering: false,
    gardenFit: { smallGarden: 8, largeGarden: 6, nearHouse: 7, nearFence: 9, fastEffect: 8 },
    description:
      "Najpopularniejszy żywopłot w Polsce — ale podatna na chorobę grzybową. Rozważ ostrokrzew lub laurowiśnię.",
  },
  ostrokrzew: {
    name: "Ostrokrzew",
    latinName: "Ilex aquifolium",
    growthPerYearCm: 25,
    initialHeightM: 0.35,
    maxHeightM: 3,
    maxCrownWidthM: 2,
    yearsToFullMaturity: 10,
    sun: "polcień",
    sunLabel: SUN_LABELS.polcień,
    droughtResistance: 4,
    frostZone: "6a–8b",
    soilRequirements: "Żyzna, przepuszczalna; toleruje cień i wiatr",
    rootAggressiveness: 2,
    foundationRisk: "niskie",
    shadePercentAtMaturity: 12,
    messiness: 2,
    messinessLabel: "Liście, czerwone owoce",
    waterNeed: 2,
    maintenanceFrequency: 2,
    diseaseSusceptibility: 1,
    minDistHouseM: 1.5,
    minDistFenceM: 0.5,
    lifespanYears: 80,
    saplingCostPln: 28,
    yearsToShade: 4,
    yearsToPrivacy: 5,
    privacyScreeningRate: 22,
    evergreen: true,
    hedgeSuitable: true,
    flowering: false,
    gardenFit: { smallGarden: 9, largeGarden: 7, nearHouse: 9, nearFence: 10, fastEffect: 6 },
    description:
      "Zdrowa zamiennik tui — kolczaste liście, czerwone jagody zimą. Wolniejszy wzrost, ale bardzo odporny.",
  },
  berberys: {
    name: "Berberys",
    latinName: "Berberis thunbergii",
    growthPerYearCm: 30,
    initialHeightM: 0.25,
    maxHeightM: 1.5,
    maxCrownWidthM: 1.2,
    yearsToFullMaturity: 5,
    sun: "pelne",
    sunLabel: SUN_LABELS.pelne,
    droughtResistance: 5,
    frostZone: "4a–8b",
    soilRequirements: "Praktycznie każda gleba; bardzo odporny",
    rootAggressiveness: 1,
    foundationRisk: "niskie",
    shadePercentAtMaturity: 5,
    messiness: 2,
    messinessLabel: "Liście, drobne owoce",
    waterNeed: 2,
    maintenanceFrequency: 2,
    diseaseSusceptibility: 1,
    minDistHouseM: 0.5,
    minDistFenceM: 0.3,
    lifespanYears: 30,
    saplingCostPln: 12,
    yearsToShade: 5,
    yearsToPrivacy: 4,
    privacyScreeningRate: 25,
    evergreen: false,
    hedgeSuitable: true,
    flowering: true,
    gardenFit: { smallGarden: 10, largeGarden: 5, nearHouse: 10, nearFence: 10, fastEffect: 8 },
    description:
      "Niski, kolorowy krzew — czerwone liście jesienią, kolce odstraszają intruzów. Idealny na mały ogród.",
  },
  bukszpan: {
    name: "Bukszpan",
    latinName: "Buxus sempervirens",
    growthPerYearCm: 15,
    initialHeightM: 0.2,
    maxHeightM: 2,
    maxCrownWidthM: 1.5,
    yearsToFullMaturity: 15,
    sun: "polcień",
    sunLabel: SUN_LABELS.polcień,
    droughtResistance: 3,
    frostZone: "6a–8b",
    soilRequirements: "Żyzna, przepuszczalna, lekko zasadowa",
    rootAggressiveness: 1,
    foundationRisk: "niskie",
    shadePercentAtMaturity: 5,
    messiness: 1,
    messinessLabel: "Minimalny — drobne liście",
    waterNeed: 3,
    maintenanceFrequency: 4,
    diseaseSusceptibility: 4,
    minDistHouseM: 0.5,
    minDistFenceM: 0.3,
    lifespanYears: 100,
    saplingCostPln: 22,
    yearsToShade: 8,
    yearsToPrivacy: 8,
    privacyScreeningRate: 12,
    evergreen: true,
    hedgeSuitable: true,
    flowering: false,
    gardenFit: { smallGarden: 10, largeGarden: 4, nearHouse: 10, nearFence: 9, fastEffect: 3 },
    description:
      "Elegancki żywopłot formowy — wolny wzrost, wymaga regularnego strzyżenia. Podatny na pielistę bukszpanową.",
  },
  hortensja: {
    name: "Hortensja",
    latinName: "Hydrangea macrophylla",
    growthPerYearCm: 25,
    initialHeightM: 0.3,
    maxHeightM: 2,
    maxCrownWidthM: 1.5,
    yearsToFullMaturity: 4,
    sun: "polcień",
    sunLabel: SUN_LABELS.polcień,
    droughtResistance: 2,
    frostZone: "6a–8b",
    soilRequirements: "Wilgotna, kwaśna gleba; nie lubi pełnego słońca",
    rootAggressiveness: 1,
    foundationRisk: "niskie",
    shadePercentAtMaturity: 6,
    messiness: 2,
    messinessLabel: "Kwiaty, liście jesienią",
    waterNeed: 4,
    maintenanceFrequency: 3,
    diseaseSusceptibility: 2,
    minDistHouseM: 0.5,
    minDistFenceM: 0.3,
    lifespanYears: 25,
    saplingCostPln: 25,
    yearsToShade: 4,
    yearsToPrivacy: 5,
    privacyScreeningRate: 18,
    evergreen: false,
    hedgeSuitable: false,
    flowering: true,
    gardenFit: { smallGarden: 10, largeGarden: 5, nearHouse: 9, nearFence: 6, fastEffect: 7 },
    description:
      "Ozdobne kwiaty przez całe lato — wymaga podlewania i ochrony przed mrozem zbiegających pąków.",
  },
  forsycja: {
    name: "Forsycja",
    latinName: "Forsythia × intermedia",
    growthPerYearCm: 45,
    initialHeightM: 0.3,
    maxHeightM: 2.5,
    maxCrownWidthM: 2,
    yearsToFullMaturity: 5,
    sun: "pelne",
    sunLabel: SUN_LABELS.pelne,
    droughtResistance: 4,
    frostZone: "5a–8b",
    soilRequirements: "Przepuszczalna, umiarkowanie żyzna",
    rootAggressiveness: 2,
    foundationRisk: "niskie",
    shadePercentAtMaturity: 8,
    messiness: 2,
    messinessLabel: "Kwiaty wiosną, liście jesienią",
    waterNeed: 2,
    maintenanceFrequency: 2,
    diseaseSusceptibility: 1,
    minDistHouseM: 1,
    minDistFenceM: 0.5,
    lifespanYears: 30,
    saplingCostPln: 20,
    yearsToShade: 3,
    yearsToPrivacy: 4,
    privacyScreeningRate: 30,
    evergreen: false,
    hedgeSuitable: true,
    flowering: true,
    gardenFit: { smallGarden: 8, largeGarden: 6, nearHouse: 8, nearFence: 7, fastEffect: 9 },
    description:
      "Złote kwiaty jako pierwsze w ogrodzie (marzec–kwiecień). Szybki wzrost, ale luźna forma bez cięcia.",
  },
  bez: {
    name: "Bez (lilak)",
    latinName: "Syringa vulgaris",
    growthPerYearCm: 35,
    initialHeightM: 0.4,
    maxHeightM: 4,
    maxCrownWidthM: 2.5,
    yearsToFullMaturity: 8,
    sun: "pelne",
    sunLabel: SUN_LABELS.pelne,
    droughtResistance: 4,
    frostZone: "3a–8b",
    soilRequirements: "Przepuszczalna, wapienna gleba; nie lubi podmokłych",
    rootAggressiveness: 2,
    foundationRisk: "niskie",
    shadePercentAtMaturity: 10,
    messiness: 2,
    messinessLabel: "Kwiaty (intensywny zapach), nasiona",
    waterNeed: 2,
    maintenanceFrequency: 2,
    diseaseSusceptibility: 2,
    minDistHouseM: 2,
    minDistFenceM: 1,
    lifespanYears: 50,
    saplingCostPln: 30,
    yearsToShade: 5,
    yearsToPrivacy: 5,
    privacyScreeningRate: 28,
    evergreen: false,
    hedgeSuitable: false,
    flowering: true,
    gardenFit: { smallGarden: 7, largeGarden: 7, nearHouse: 7, nearFence: 6, fastEffect: 7 },
    description:
      "Pachnące kwiaty w maju — klasyk polskich ogrodów. Może urosnąć do 4 m bez cięcia.",
  },
  pigwowiec: {
    name: "Pigwowiec",
    latinName: "Chaenomeles japonica",
    growthPerYearCm: 30,
    initialHeightM: 0.3,
    maxHeightM: 1.5,
    maxCrownWidthM: 1.5,
    yearsToFullMaturity: 5,
    sun: "pelne",
    sunLabel: SUN_LABELS.pelne,
    droughtResistance: 4,
    frostZone: "5a–8b",
    soilRequirements: "Przepuszczalna; toleruje gleby ubogie",
    rootAggressiveness: 1,
    foundationRisk: "niskie",
    shadePercentAtMaturity: 4,
    messiness: 2,
    messinessLabel: "Kwiaty, jadalne owoce (pigwa)",
    waterNeed: 2,
    maintenanceFrequency: 2,
    diseaseSusceptibility: 2,
    minDistHouseM: 0.5,
    minDistFenceM: 0.3,
    lifespanYears: 30,
    saplingCostPln: 18,
    yearsToShade: 5,
    yearsToPrivacy: 4,
    privacyScreeningRate: 22,
    evergreen: false,
    hedgeSuitable: true,
    flowering: true,
    gardenFit: { smallGarden: 10, largeGarden: 4, nearHouse: 10, nearFence: 8, fastEffect: 7 },
    description:
      "Wczesne kwiaty (marzec), kompaktowy krzew — świetny przy ogrodzeniu i w donicach.",
  },
  tawula: {
    name: "Tawuła",
    latinName: "Spiraea japonica",
    growthPerYearCm: 25,
    initialHeightM: 0.2,
    maxHeightM: 1.2,
    maxCrownWidthM: 1.2,
    yearsToFullMaturity: 4,
    sun: "pelne",
    sunLabel: SUN_LABELS.pelne,
    droughtResistance: 4,
    frostZone: "4a–8b",
    soilRequirements: "Przepuszczalna, umiarkowanie wilgotna",
    rootAggressiveness: 1,
    foundationRisk: "niskie",
    shadePercentAtMaturity: 3,
    messiness: 1,
    messinessLabel: "Kwiaty latem, drobne liście",
    waterNeed: 2,
    maintenanceFrequency: 2,
    diseaseSusceptibility: 1,
    minDistHouseM: 0.5,
    minDistFenceM: 0.3,
    lifespanYears: 20,
    saplingCostPln: 14,
    yearsToShade: 6,
    yearsToPrivacy: 5,
    privacyScreeningRate: 18,
    evergreen: false,
    hedgeSuitable: false,
    flowering: true,
    gardenFit: { smallGarden: 10, largeGarden: 3, nearHouse: 10, nearFence: 7, fastEffect: 6 },
    description:
      "Niski krzew rabatowy z różowymi kwiatami latem. Łatwy w pielęgnacji, nie nadaje się na wysoki żywopłot.",
  },
  deren: {
    name: "Deren",
    latinName: "Cornus sanguinea",
    growthPerYearCm: 30,
    initialHeightM: 0.3,
    maxHeightM: 3,
    maxCrownWidthM: 2,
    yearsToFullMaturity: 6,
    sun: "polcień",
    sunLabel: SUN_LABELS.polcień,
    droughtResistance: 4,
    frostZone: "4a–8b",
    soilRequirements: "Przepuszczalna; toleruje różne gleby",
    rootAggressiveness: 2,
    foundationRisk: "niskie",
    shadePercentAtMaturity: 8,
    messiness: 2,
    messinessLabel: "Liście, białe kwiaty, jagody",
    waterNeed: 2,
    maintenanceFrequency: 2,
    diseaseSusceptibility: 1,
    minDistHouseM: 1.5,
    minDistFenceM: 0.5,
    lifespanYears: 40,
    saplingCostPln: 16,
    yearsToShade: 4,
    yearsToPrivacy: 5,
    privacyScreeningRate: 24,
    evergreen: false,
    hedgeSuitable: true,
    flowering: true,
    gardenFit: { smallGarden: 8, largeGarden: 6, nearHouse: 8, nearFence: 8, fastEffect: 7 },
    description:
      "Czerwone pędy zimą, białe kwiaty wiosną — dekoracyjny krzew żywopłotowy o umiarkowanym wzroście.",
  },
  kalina: {
    name: "Kalina",
    latinName: "Viburnum opulus",
    growthPerYearCm: 35,
    initialHeightM: 0.35,
    maxHeightM: 3,
    maxCrownWidthM: 2.5,
    yearsToFullMaturity: 6,
    sun: "pelne",
    sunLabel: SUN_LABELS.pelne,
    droughtResistance: 3,
    frostZone: "3a–8b",
    soilRequirements: "Wilgotna, żyzna gleba; lubi stanowiska przy wodzie",
    rootAggressiveness: 2,
    foundationRisk: "niskie",
    shadePercentAtMaturity: 10,
    messiness: 2,
    messinessLabel: "Kwiaty, czerwone jagody jesienią",
    waterNeed: 3,
    maintenanceFrequency: 2,
    diseaseSusceptibility: 2,
    minDistHouseM: 1.5,
    minDistFenceM: 0.5,
    lifespanYears: 50,
    saplingCostPln: 20,
    yearsToShade: 4,
    yearsToPrivacy: 4,
    privacyScreeningRate: 28,
    evergreen: false,
    hedgeSuitable: true,
    flowering: true,
    gardenFit: { smallGarden: 8, largeGarden: 6, nearHouse: 8, nearFence: 8, fastEffect: 8 },
    description:
      "Białe kwiaty (maj–czerwiec), czerwone jagody — rodzimy krzew, dobry na żywopłot i dla ptaków.",
  },
};

export const SHRUB_SPECIES_OPTIONS = (
  Object.entries(SHRUBS) as [ShrubSpecies, ShrubSpeciesData][]
).map(([value, s]) => ({
  value,
  label: s.name,
  hint: `${s.growthPerYearCm} cm/rok · max ${s.maxHeightM} m`,
}));

const FIT_LABELS: Record<keyof GardenFitScores, string> = {
  smallGarden: "Mały ogród",
  largeGarden: "Duży ogród",
  nearHouse: "Przy domu",
  nearFence: "Przy ogrodzeniu",
  fastEffect: "Szybki efekt",
};

function heightAtYear(shrub: ShrubSpeciesData, years: number): number {
  const growthM = shrub.growthPerYearCm / 100;
  const h = shrub.initialHeightM + growthM * years;
  return Math.min(Math.round(h * 10) / 10, shrub.maxHeightM);
}

function heightAtYears(shrub: ShrubSpeciesData, years: number[]): HeightPoint[] {
  return years.map((y) => ({ years: y, heightM: heightAtYear(shrub, y) }));
}

function pickWinner(rawA: number, rawB: number, higherIsBetter: boolean): ComparisonWinner {
  if (rawA === rawB) return "tie";
  if (higherIsBetter) return rawA > rawB ? "a" : "b";
  return rawA < rawB ? "a" : "b";
}

function scaleLabel(n: number): string {
  return `${n}/5`;
}

function riskLabel(r: FoundationRisk): string {
  const map: Record<FoundationRisk, string> = {
    niskie: "Niskie",
    srednie: "Średnie",
    wysokie: "Wysokie",
  };
  return map[r];
}

function boolLabel(v: boolean): string {
  return v ? "Tak" : "Nie";
}

function buildComparisonRows(a: ShrubSpeciesData, b: ShrubSpeciesData): ComparisonRow[] {
  const rows: Omit<ComparisonRow, "category">[] = [
    {
      metric: "Roczny przyrost",
      valueA: `${a.growthPerYearCm} cm/rok`,
      valueB: `${b.growthPerYearCm} cm/rok`,
      rawA: a.growthPerYearCm,
      rawB: b.growthPerYearCm,
      higherIsBetter: true,
    },
    {
      metric: "Wysokość po 3 latach",
      valueA: `${heightAtYear(a, 3)} m`,
      valueB: `${heightAtYear(b, 3)} m`,
      rawA: heightAtYear(a, 3),
      rawB: heightAtYear(b, 3),
      higherIsBetter: true,
    },
    {
      metric: "Wysokość po 5 latach",
      valueA: `${heightAtYear(a, 5)} m`,
      valueB: `${heightAtYear(b, 5)} m`,
      rawA: heightAtYear(a, 5),
      rawB: heightAtYear(b, 5),
      higherIsBetter: true,
    },
    {
      metric: "Wysokość po 10 latach",
      valueA: `${heightAtYear(a, 10)} m`,
      valueB: `${heightAtYear(b, 10)} m`,
      rawA: heightAtYear(a, 10),
      rawB: heightAtYear(b, 10),
      higherIsBetter: true,
    },
    {
      metric: "Wysokość po 15 latach",
      valueA: `${heightAtYear(a, 15)} m`,
      valueB: `${heightAtYear(b, 15)} m`,
      rawA: heightAtYear(a, 15),
      rawB: heightAtYear(b, 15),
      higherIsBetter: true,
    },
    {
      metric: "Wysokość po 20 latach",
      valueA: `${heightAtYear(a, 20)} m`,
      valueB: `${heightAtYear(b, 20)} m`,
      rawA: heightAtYear(a, 20),
      rawB: heightAtYear(b, 20),
      higherIsBetter: true,
    },
    {
      metric: "Szerokość korony (max)",
      valueA: `${a.maxCrownWidthM} m`,
      valueB: `${b.maxCrownWidthM} m`,
      rawA: a.maxCrownWidthM,
      rawB: b.maxCrownWidthM,
      higherIsBetter: true,
    },
    {
      metric: "Czas do pełnej wielkości",
      valueA: `~${a.yearsToFullMaturity} lat`,
      valueB: `~${b.yearsToFullMaturity} lat`,
      rawA: a.yearsToFullMaturity,
      rawB: b.yearsToFullMaturity,
      higherIsBetter: false,
    },
    {
      metric: "Zimozielony",
      valueA: boolLabel(a.evergreen),
      valueB: boolLabel(b.evergreen),
    },
    {
      metric: "Nadaje się na żywopłot",
      valueA: boolLabel(a.hedgeSuitable),
      valueB: boolLabel(b.hedgeSuitable),
    },
    {
      metric: "Kwitnienie",
      valueA: boolLabel(a.flowering),
      valueB: boolLabel(b.flowering),
    },
    {
      metric: "Nasłonecznienie",
      valueA: a.sunLabel,
      valueB: b.sunLabel,
    },
    {
      metric: "Odporność na suszę",
      valueA: scaleLabel(a.droughtResistance),
      valueB: scaleLabel(b.droughtResistance),
      rawA: a.droughtResistance,
      rawB: b.droughtResistance,
      higherIsBetter: true,
    },
    {
      metric: "Odporność na mróz (strefa)",
      valueA: a.frostZone,
      valueB: b.frostZone,
    },
    {
      metric: "Wymagania glebowe",
      valueA: a.soilRequirements,
      valueB: b.soilRequirements,
    },
    {
      metric: "Agresywność korzeni",
      valueA: scaleLabel(a.rootAggressiveness),
      valueB: scaleLabel(b.rootAggressiveness),
      rawA: a.rootAggressiveness,
      rawB: b.rootAggressiveness,
      higherIsBetter: false,
    },
    {
      metric: "Ryzyko uszkodzenia fundamentów",
      valueA: riskLabel(a.foundationRisk),
      valueB: riskLabel(b.foundationRisk),
      rawA: a.foundationRisk === "niskie" ? 1 : a.foundationRisk === "srednie" ? 2 : 3,
      rawB: b.foundationRisk === "niskie" ? 1 : b.foundationRisk === "srednie" ? 2 : 3,
      higherIsBetter: false,
    },
    {
      metric: "Zacienienie (przy max wys.)",
      valueA: `~${a.shadePercentAtMaturity}%`,
      valueB: `~${b.shadePercentAtMaturity}%`,
      rawA: a.shadePercentAtMaturity,
      rawB: b.shadePercentAtMaturity,
    },
    {
      metric: "„Bałagan” w ogrodzie",
      valueA: `${scaleLabel(a.messiness)} — ${a.messinessLabel}`,
      valueB: `${scaleLabel(b.messiness)} — ${b.messinessLabel}`,
      rawA: a.messiness,
      rawB: b.messiness,
      higherIsBetter: false,
    },
    {
      metric: "Zapotrzebowanie na wodę",
      valueA: scaleLabel(a.waterNeed),
      valueB: scaleLabel(b.waterNeed),
      rawA: a.waterNeed,
      rawB: b.waterNeed,
      higherIsBetter: false,
    },
    {
      metric: "Częstotliwość pielęgnacji",
      valueA: scaleLabel(a.maintenanceFrequency),
      valueB: scaleLabel(b.maintenanceFrequency),
      rawA: a.maintenanceFrequency,
      rawB: b.maintenanceFrequency,
      higherIsBetter: false,
    },
    {
      metric: "Podatność na choroby",
      valueA: scaleLabel(a.diseaseSusceptibility),
      valueB: scaleLabel(b.diseaseSusceptibility),
      rawA: a.diseaseSusceptibility,
      rawB: b.diseaseSusceptibility,
      higherIsBetter: false,
    },
    {
      metric: "Min. odległość od domu",
      valueA: `${a.minDistHouseM} m`,
      valueB: `${b.minDistHouseM} m`,
      rawA: a.minDistHouseM,
      rawB: b.minDistHouseM,
      higherIsBetter: false,
    },
    {
      metric: "Min. odległość od ogrodzenia",
      valueA: `${a.minDistFenceM} m`,
      valueB: `${b.minDistFenceM} m`,
      rawA: a.minDistFenceM,
      rawB: b.minDistFenceM,
      higherIsBetter: false,
    },
    {
      metric: "Czas życia",
      valueA: `~${a.lifespanYears} lat`,
      valueB: `~${b.lifespanYears} lat`,
      rawA: a.lifespanYears,
      rawB: b.lifespanYears,
      higherIsBetter: true,
    },
    {
      metric: "Koszt sadzonki",
      valueA: `~${a.saplingCostPln} PLN`,
      valueB: `~${b.saplingCostPln} PLN`,
      rawA: a.saplingCostPln,
      rawB: b.saplingCostPln,
      higherIsBetter: false,
    },
    {
      metric: "Kiedy daje cień",
      valueA: `~${a.yearsToShade} lat`,
      valueB: `~${b.yearsToShade} lat`,
      rawA: a.yearsToShade,
      rawB: b.yearsToShade,
      higherIsBetter: false,
    },
    {
      metric: "Kiedy daje prywatność (żywopłot)",
      valueA: `~${a.yearsToPrivacy} lat`,
      valueB: `~${b.yearsToPrivacy} lat`,
      rawA: a.yearsToPrivacy,
      rawB: b.yearsToPrivacy,
      higherIsBetter: false,
    },
    {
      metric: "Tempo zasłaniania",
      valueA: `~${a.privacyScreeningRate} cm/rok`,
      valueB: `~${b.privacyScreeningRate} cm/rok`,
      rawA: a.privacyScreeningRate,
      rawB: b.privacyScreeningRate,
      higherIsBetter: true,
    },
  ];

  const categories = [
    "Wzrost i rozmiar", "Wzrost i rozmiar", "Wzrost i rozmiar", "Wzrost i rozmiar",
    "Wzrost i rozmiar", "Wzrost i rozmiar", "Wzrost i rozmiar", "Wzrost i rozmiar",
    "Gatunek i zastosowanie", "Gatunek i zastosowanie", "Gatunek i zastosowanie",
    "Warunki stanowiska", "Warunki stanowiska", "Warunki stanowiska", "Warunki stanowiska",
    "Wpływ na ogród", "Wpływ na ogród", "Wpływ na ogród", "Wpływ na ogród",
    "Woda i utrzymanie", "Woda i utrzymanie", "Woda i utrzymanie",
    "Praktyczne", "Praktyczne", "Praktyczne", "Praktyczne",
    "Efekt wizualny", "Efekt wizualny", "Efekt wizualny",
  ];

  return rows.map((row, i) => ({
    ...row,
    category: categories[i]!,
    winner:
      row.rawA !== undefined && row.rawB !== undefined && row.higherIsBetter !== undefined
        ? pickWinner(row.rawA, row.rawB, row.higherIsBetter)
        : undefined,
  }));
}

function buildBarMetrics(a: ShrubSpeciesData, b: ShrubSpeciesData): BarMetric[] {
  return [
    { label: "Szybkość wzrostu", valueA: a.growthPerYearCm, valueB: b.growthPerYearCm, unit: "cm/rok", higherIsBetter: true },
    { label: "Wysokość max", valueA: a.maxHeightM, valueB: b.maxHeightM, unit: "m", higherIsBetter: true },
    { label: "Szerokość korony", valueA: a.maxCrownWidthM, valueB: b.maxCrownWidthM, unit: "m", higherIsBetter: true },
    { label: "Odporność na suszę", valueA: a.droughtResistance, valueB: b.droughtResistance, unit: "/5", higherIsBetter: true },
    { label: "Odporność na choroby", valueA: 6 - a.diseaseSusceptibility, valueB: 6 - b.diseaseSusceptibility, unit: "/5", higherIsBetter: true },
  ];
}

function buildFitScores(scores: GardenFitScores) {
  return (Object.keys(FIT_LABELS) as (keyof GardenFitScores)[]).map((key) => ({
    label: FIT_LABELS[key],
    value: scores[key],
  }));
}

function buildVerdict(a: ShrubSpeciesData, b: ShrubSpeciesData): string {
  const parts: string[] = [];

  if (a.hedgeSuitable && !b.hedgeSuitable) {
    parts.push(`${a.name} nadaje się na żywopłot, ${b.name} raczej jako krzew ozdobny.`);
  } else if (b.hedgeSuitable && !a.hedgeSuitable) {
    parts.push(`${b.name} nadaje się na żywopłot, ${a.name} raczej jako krzew ozdobny.`);
  }

  if (a.growthPerYearCm > b.growthPerYearCm + 10) {
    parts.push(`${a.name} rośnie szybciej (${a.growthPerYearCm} vs ${b.growthPerYearCm} cm/rok) — szybszy efekt ekranowania.`);
  } else if (b.growthPerYearCm > a.growthPerYearCm + 10) {
    parts.push(`${b.name} rośnie szybciej (${b.growthPerYearCm} vs ${a.growthPerYearCm} cm/rok).`);
  }

  if (a.diseaseSusceptibility <= 2 && b.diseaseSusceptibility >= 4) {
    parts.push(`${a.name} jest zdrowszy i mniej podatny na choroby niż ${b.name}.`);
  } else if (b.diseaseSusceptibility <= 2 && a.diseaseSusceptibility >= 4) {
    parts.push(`${b.name} jest zdrowszy i mniej podatny na choroby niż ${a.name}.`);
  }

  if (a.evergreen && !b.evergreen) {
    parts.push(`${a.name} jest zimozielony — daje prywatność przez cały rok.`);
  } else if (b.evergreen && !a.evergreen) {
    parts.push(`${b.name} jest zimozielony — daje prywatność przez cały rok.`);
  }

  if (parts.length === 0) {
    return `${a.name} i ${b.name} to różne profile: ${a.description.split("—")[0]?.trim() ?? a.description}; ${b.description.split("—")[0]?.trim() ?? b.description}`;
  }
  return parts.join(" ");
}

function buildTips(a: ShrubSpeciesData, b: ShrubSpeciesData): string[] {
  const tips: string[] = [];

  if (a.hedgeSuitable || b.hedgeSuitable) {
    tips.push(
      "Na żywopłot sadź w dwóch rzędach (sąsadka) lub jednym rzędzie co 30–50 cm — zależnie od gatunku i docelowej wysokości."
    );
  }

  if (a.diseaseSusceptibility >= 4 || b.diseaseSusceptibility >= 4) {
    const sick = a.diseaseSusceptibility >= b.diseaseSusceptibility ? a.name : b.name;
    tips.push(`${sick} jest podatny na choroby — zapewnij przewiew i unikaj podlewania liści.`);
  }

  if (a.maintenanceFrequency >= 4 || b.maintenanceFrequency >= 4) {
    const high = a.maintenanceFrequency >= b.maintenanceFrequency ? a.name : b.name;
    tips.push(`${high} wymaga regularnego cięcia formującego — zaplanuj 2–3 strzyżenia rocznie.`);
  }

  tips.push(
    `Na małej działce lepsze dopasowanie: ${a.gardenFit.smallGarden >= b.gardenFit.smallGarden ? a.name : b.name} (${Math.max(a.gardenFit.smallGarden, b.gardenFit.smallGarden)}/10).`
  );

  tips.push("Krzewy najlepiej sadzić jesienią lub wczesną wiosną — unikaj suszy po posadzeniu.");

  return tips;
}

export function getShrubInfo(species: ShrubSpecies): ShrubSpeciesData {
  return SHRUBS[species];
}

export function compareShrubs(
  speciesA: ShrubSpecies,
  speciesB: ShrubSpecies
): ShrubComparatorResult {
  const a = SHRUBS[speciesA];
  const b = SHRUBS[speciesB];

  const scatterPoints: ShrubScatterPoint[] = (
    Object.entries(SHRUBS) as [ShrubSpecies, ShrubSpeciesData][]
  ).map(([species, s]) => ({
    species,
    name: s.name,
    waterNeed: s.waterNeed,
    growthPerYearCm: s.growthPerYearCm,
    isA: species === speciesA,
    isB: species === speciesB,
  }));

  return {
    speciesA: a,
    speciesB: b,
    slugA: speciesA,
    slugB: speciesB,
    heightCurveA: heightAtYears(a, CURVE_YEARS),
    heightCurveB: heightAtYears(b, CURVE_YEARS),
    comparisonRows: buildComparisonRows(a, b),
    barMetrics: buildBarMetrics(a, b),
    fitScoresA: buildFitScores(a.gardenFit),
    fitScoresB: buildFitScores(b.gardenFit),
    scatterPoints,
    verdict: buildVerdict(a, b),
    tips: buildTips(a, b),
  };
}

export const MAIN_SHRUB_FAQ: { question: string; answer: string }[] = [
  {
    question: "Laurowiśnia czy tuja — co lepsze na żywopłot?",
    answer:
      "Laurowiśnia rośnie szybciej (40 vs 35 cm/rok), toleruje cień i jest zdrowsza. Tuja tańsza, ale podatna na chorobę grzybową. Ostrokrzew to najzdrowsza zimozielona alternatywa, ale wolniejszy.",
  },
  {
    question: "Który krzew rośnie najszybciej?",
    answer:
      "Forsycja i laurowiśnia (40–45 cm/rok) wśród popularnych krzewów. Bukszpan najwolniejszy (15 cm/rok), ale idealny do formowania.",
  },
  {
    question: "Jak daleko od ogrodzenia sadzić krzewy?",
    answer:
      "Na żywopłot: 30–50 cm od ogrodzenia (korona rośnie po obu stronach). Pojedynczy duży krzew (bez): min. 1,5–2 m od płotu.",
  },
  {
    question: "Który krzew na mały ogród?",
    answer:
      "Berberys, tawuła, pigwowiec i hortensja — niskie, kompaktowe, wysokie dopasowanie do małej przestrzeni (10/10 w naszym rankingu).",
  },
  {
    question: "Zimozielony krzew zamiast tui?",
    answer:
      "Ostrokrzew (zdrowy, kolczasty), laurowiśnia (szybki, gęsty) lub berberys (niski, odporny). Wszystkie dostępne w porównywarce.",
  },
];

export { CURVE_YEARS as SHRUB_CURVE_YEARS, heightAtYear as shrubHeightAtYear };
