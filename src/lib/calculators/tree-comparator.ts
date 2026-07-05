export type TreeSpecies =
  | "dab"
  | "sosna"
  | "brzoza"
  | "wierzba"
  | "lipa"
  | "klon"
  | "buk"
  | "jodla"
  | "olcha"
  | "jesion"
  | "kasztan"
  | "swierk"
  | "modrzew"
  | "topola"
  | "orzech"
  | "akacja"
  | "grab";

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

export interface TreeSpeciesData {
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

export interface ScatterPoint {
  species: TreeSpecies;
  name: string;
  waterNeed: number;
  growthPerYearCm: number;
  isA?: boolean;
  isB?: boolean;
}

export interface TreeComparatorResult {
  speciesA: TreeSpeciesData;
  speciesB: TreeSpeciesData;
  slugA: TreeSpecies;
  slugB: TreeSpecies;
  heightCurveA: HeightPoint[];
  heightCurveB: HeightPoint[];
  comparisonRows: ComparisonRow[];
  barMetrics: BarMetric[];
  fitScoresA: { label: string; value: number }[];
  fitScoresB: { label: string; value: number }[];
  scatterPoints: ScatterPoint[];
  verdict: string;
  tips: string[];
}

const CURVE_YEARS = [1, 2, 3, 5, 10, 15, 20, 30, 40, 50];

const SUN_LABELS: Record<SunExposure, string> = {
  pelne: "Pełne słońce",
  polcień: "Półcień",
  cien: "Cień",
};

export const TREES: Record<TreeSpecies, TreeSpeciesData> = {
  dab: {
    name: "Dąb",
    latinName: "Quercus robur",
    growthPerYearCm: 25,
    initialHeightM: 1.2,
    maxHeightM: 30,
    maxCrownWidthM: 15,
    yearsToFullMaturity: 80,
    sun: "pelne",
    sunLabel: SUN_LABELS.pelne,
    droughtResistance: 4,
    frostZone: "6a–8b",
    soilRequirements: "Żyzna, głęboka, przepuszczalna; toleruje gleby zasadowe",
    rootAggressiveness: 4,
    foundationRisk: "wysokie",
    shadePercentAtMaturity: 45,
    messiness: 4,
    messinessLabel: "Liście, żołędzie, mszyce",
    waterNeed: 2,
    maintenanceFrequency: 2,
    diseaseSusceptibility: 2,
    minDistHouseM: 8,
    minDistFenceM: 4,
    lifespanYears: 500,
    saplingCostPln: 45,
    yearsToShade: 12,
    yearsToPrivacy: 18,
    privacyScreeningRate: 18,
    gardenFit: {
      smallGarden: 2,
      largeGarden: 10,
      nearHouse: 2,
      nearFence: 4,
      fastEffect: 3,
    },
    description:
      "Król polskich drzew — żyje setki lat, ale wolno rośnie i wymaga dużo miejsca. Idealny na dużą działkę z dala od budynków.",
  },
  sosna: {
    name: "Sosna",
    latinName: "Pinus sylvestris",
    growthPerYearCm: 40,
    initialHeightM: 1.0,
    maxHeightM: 35,
    maxCrownWidthM: 8,
    yearsToFullMaturity: 50,
    sun: "pelne",
    sunLabel: SUN_LABELS.pelne,
    droughtResistance: 5,
    frostZone: "3a–8a",
    soilRequirements: "Lekka, piaszczysta lub gliniasta; nie lubi podmokłych gleb",
    rootAggressiveness: 3,
    foundationRisk: "srednie",
    shadePercentAtMaturity: 25,
    messiness: 2,
    messinessLabel: "Igły, szyszki (umiarkowany)",
    waterNeed: 2,
    maintenanceFrequency: 1,
    diseaseSusceptibility: 2,
    minDistHouseM: 5,
    minDistFenceM: 2,
    lifespanYears: 300,
    saplingCostPln: 25,
    yearsToShade: 8,
    yearsToPrivacy: 10,
    privacyScreeningRate: 25,
    gardenFit: {
      smallGarden: 4,
      largeGarden: 9,
      nearHouse: 5,
      nearFence: 6,
      fastEffect: 7,
    },
    description:
      "Szybki wzrost, odporność na mróz i suszę. Iglasta — daje cień przez cały rok, ale słabsze ekranowanie niż szeroka korona liściastych.",
  },
  brzoza: {
    name: "Brzoza",
    latinName: "Betula pendula",
    growthPerYearCm: 60,
    initialHeightM: 1.5,
    maxHeightM: 25,
    maxCrownWidthM: 10,
    yearsToFullMaturity: 30,
    sun: "pelne",
    sunLabel: SUN_LABELS.pelne,
    droughtResistance: 3,
    frostZone: "2a–8a",
    soilRequirements: "Praktycznie każda gleba; lubi wilgotne podłoże",
    rootAggressiveness: 2,
    foundationRisk: "niskie",
    shadePercentAtMaturity: 30,
    messiness: 4,
    messinessLabel: "Liście, nasiona (dużo pyłku wiosną)",
    waterNeed: 3,
    maintenanceFrequency: 2,
    diseaseSusceptibility: 3,
    minDistHouseM: 4,
    minDistFenceM: 2,
    lifespanYears: 80,
    saplingCostPln: 35,
    yearsToShade: 5,
    yearsToPrivacy: 7,
    privacyScreeningRate: 35,
    gardenFit: {
      smallGarden: 5,
      largeGarden: 8,
      nearHouse: 6,
      nearFence: 7,
      fastEffect: 10,
    },
    description:
      "Błyskawiczny wzrost i efekt wizualny — ale krótkowieczna i wymaga regularnego podlewania w suszy.",
  },
  wierzba: {
    name: "Wierzba",
    latinName: "Salix alba",
    growthPerYearCm: 80,
    initialHeightM: 1.5,
    maxHeightM: 28,
    maxCrownWidthM: 12,
    yearsToFullMaturity: 25,
    sun: "pelne",
    sunLabel: SUN_LABELS.pelne,
    droughtResistance: 2,
    frostZone: "4a–8a",
    soilRequirements: "Wilgotna gleba; idealna nad wodą, nie na suchym stanowisku",
    rootAggressiveness: 5,
    foundationRisk: "wysokie",
    shadePercentAtMaturity: 35,
    messiness: 3,
    messinessLabel: "Liście, wiórki gałęzi",
    waterNeed: 5,
    maintenanceFrequency: 4,
    diseaseSusceptibility: 3,
    minDistHouseM: 10,
    minDistFenceM: 5,
    lifespanYears: 60,
    saplingCostPln: 30,
    yearsToShade: 4,
    yearsToPrivacy: 5,
    privacyScreeningRate: 45,
    gardenFit: {
      smallGarden: 3,
      largeGarden: 7,
      nearHouse: 1,
      nearFence: 3,
      fastEffect: 10,
    },
    description:
      "Najszybszy wzrost spośród popularnych drzew, ale agresywne korzenie i ogromne zapotrzebowanie na wodę.",
  },
  lipa: {
    name: "Lipa",
    latinName: "Tilia cordata",
    growthPerYearCm: 30,
    initialHeightM: 1.2,
    maxHeightM: 28,
    maxCrownWidthM: 12,
    yearsToFullMaturity: 60,
    sun: "pelne",
    sunLabel: SUN_LABELS.pelne,
    droughtResistance: 3,
    frostZone: "3a–8a",
    soilRequirements: "Żyzna, wilgotna gleba; toleruje zanieczyszczenia miejskie",
    rootAggressiveness: 3,
    foundationRisk: "srednie",
    shadePercentAtMaturity: 40,
    messiness: 3,
    messinessLabel: "Liście, nektar (pszczoły — plus dla ekologii)",
    waterNeed: 3,
    maintenanceFrequency: 2,
    diseaseSusceptibility: 2,
    minDistHouseM: 6,
    minDistFenceM: 3,
    lifespanYears: 400,
    saplingCostPln: 40,
    yearsToShade: 10,
    yearsToPrivacy: 12,
    privacyScreeningRate: 22,
    gardenFit: {
      smallGarden: 4,
      largeGarden: 9,
      nearHouse: 5,
      nearFence: 6,
      fastEffect: 5,
    },
    description:
      "Klasyczne drzewo alejowe — gęsta korona, długowieczne, dobre do cienia i ekranowania.",
  },
  klon: {
    name: "Klon",
    latinName: "Acer platanoides",
    growthPerYearCm: 35,
    initialHeightM: 1.2,
    maxHeightM: 25,
    maxCrownWidthM: 11,
    yearsToFullMaturity: 50,
    sun: "pelne",
    sunLabel: SUN_LABELS.pelne,
    droughtResistance: 3,
    frostZone: "4a–8a",
    soilRequirements: "Żyzna, umiarkowanie wilgotna; toleruje gleby miejskie",
    rootAggressiveness: 3,
    foundationRisk: "srednie",
    shadePercentAtMaturity: 38,
    messiness: 3,
    messinessLabel: "Liście, skrzydlaki (samooczyszczanie)",
    waterNeed: 3,
    maintenanceFrequency: 2,
    diseaseSusceptibility: 3,
    minDistHouseM: 5,
    minDistFenceM: 3,
    lifespanYears: 200,
    saplingCostPln: 38,
    yearsToShade: 8,
    yearsToPrivacy: 10,
    privacyScreeningRate: 28,
    gardenFit: {
      smallGarden: 5,
      largeGarden: 8,
      nearHouse: 5,
      nearFence: 6,
      fastEffect: 7,
    },
    description:
      "Jesienne barwy, szybki wzrost w młodości. Popularny w ogrodach miejskich i na alejach.",
  },
  buk: {
    name: "Buk",
    latinName: "Fagus sylvatica",
    growthPerYearCm: 30,
    initialHeightM: 1.0,
    maxHeightM: 35,
    maxCrownWidthM: 14,
    yearsToFullMaturity: 70,
    sun: "pelne",
    sunLabel: SUN_LABELS.pelne,
    droughtResistance: 3,
    frostZone: "4a–8a",
    soilRequirements: "Głęboka, przepuszczalna, lekko kwaśna; nie lubi podmokłych",
    rootAggressiveness: 3,
    foundationRisk: "srednie",
    shadePercentAtMaturity: 42,
    messiness: 2,
    messinessLabel: "Liście (zimują na gałęziach — mniej bałaganu jesienią)",
    waterNeed: 3,
    maintenanceFrequency: 2,
    diseaseSusceptibility: 2,
    minDistHouseM: 6,
    minDistFenceM: 3,
    lifespanYears: 300,
    saplingCostPln: 42,
    yearsToShade: 12,
    yearsToPrivacy: 14,
    privacyScreeningRate: 20,
    gardenFit: {
      smallGarden: 3,
      largeGarden: 9,
      nearHouse: 4,
      nearFence: 5,
      fastEffect: 4,
    },
    description:
      "Majestatyczne drzewo liściaste z gęstą koroną. Wolniejszy start, ale imponująca wysokość końcowa.",
  },
  jodla: {
    name: "Jodła",
    latinName: "Abies alba",
    growthPerYearCm: 35,
    initialHeightM: 0.8,
    maxHeightM: 40,
    maxCrownWidthM: 10,
    yearsToFullMaturity: 60,
    sun: "polcień",
    sunLabel: SUN_LABELS.polcień,
    droughtResistance: 2,
    frostZone: "4a–7b",
    soilRequirements: "Wilgotna, kwaśna gleba leśna; nie lubi wiatru i suszy",
    rootAggressiveness: 2,
    foundationRisk: "niskie",
    shadePercentAtMaturity: 30,
    messiness: 2,
    messinessLabel: "Szyszki, igły (umiarkowany)",
    waterNeed: 4,
    maintenanceFrequency: 1,
    diseaseSusceptibility: 3,
    minDistHouseM: 5,
    minDistFenceM: 2,
    lifespanYears: 500,
    saplingCostPln: 50,
    yearsToShade: 10,
    yearsToPrivacy: 12,
    privacyScreeningRate: 22,
    gardenFit: {
      smallGarden: 4,
      largeGarden: 8,
      nearHouse: 6,
      nearFence: 7,
      fastEffect: 5,
    },
    description:
      "Iglasty olbrzym górskich lasów — piękna forma, ale wymaga wilgotnego stanowiska i ochrony przed wiatrem.",
  },
  olcha: {
    name: "Olcha",
    latinName: "Alnus glutinosa",
    growthPerYearCm: 50,
    initialHeightM: 1.2,
    maxHeightM: 22,
    maxCrownWidthM: 9,
    yearsToFullMaturity: 35,
    sun: "pelne",
    sunLabel: SUN_LABELS.pelne,
    droughtResistance: 1,
    frostZone: "3a–8a",
    soilRequirements: "Podmokła gleba, brzegi stawów; naprawia glebę (nitrogen)",
    rootAggressiveness: 3,
    foundationRisk: "srednie",
    shadePercentAtMaturity: 28,
    messiness: 3,
    messinessLabel: "Liście, szyszki",
    waterNeed: 5,
    maintenanceFrequency: 2,
    diseaseSusceptibility: 2,
    minDistHouseM: 5,
    minDistFenceM: 2,
    lifespanYears: 100,
    saplingCostPln: 28,
    yearsToShade: 6,
    yearsToPrivacy: 8,
    privacyScreeningRate: 32,
    gardenFit: {
      smallGarden: 5,
      largeGarden: 7,
      nearHouse: 5,
      nearFence: 6,
      fastEffect: 8,
    },
    description:
      "Idealna na wilgotne stanowiska i brzegi wód. Szybki wzrost, ale nie na suchym podłożu.",
  },
  jesion: {
    name: "Jesion",
    latinName: "Fraxinus excelsior",
    growthPerYearCm: 45,
    initialHeightM: 1.2,
    maxHeightM: 30,
    maxCrownWidthM: 12,
    yearsToFullMaturity: 45,
    sun: "pelne",
    sunLabel: SUN_LABELS.pelne,
    droughtResistance: 3,
    frostZone: "4a–8a",
    soilRequirements: "Żyzna, przepuszczalna; toleruje różne typy gleb",
    rootAggressiveness: 3,
    foundationRisk: "srednie",
    shadePercentAtMaturity: 35,
    messiness: 3,
    messinessLabel: "Liście, nasiona (skrzydlaki)",
    waterNeed: 3,
    maintenanceFrequency: 2,
    diseaseSusceptibility: 4,
    minDistHouseM: 5,
    minDistFenceM: 3,
    lifespanYears: 200,
    saplingCostPln: 35,
    yearsToShade: 7,
    yearsToPrivacy: 9,
    privacyScreeningRate: 30,
    gardenFit: {
      smallGarden: 5,
      largeGarden: 8,
      nearHouse: 5,
      nearFence: 6,
      fastEffect: 8,
    },
    description:
      "Szybki wzrost i szeroka korona, ale podatny na chorobę zgorzeli jesionowca — rozważ odmiany odporne.",
  },
  kasztan: {
    name: "Kasztanowiec",
    latinName: "Aesculus hippocastanum",
    growthPerYearCm: 35,
    initialHeightM: 1.0,
    maxHeightM: 25,
    maxCrownWidthM: 12,
    yearsToFullMaturity: 50,
    sun: "pelne",
    sunLabel: SUN_LABELS.pelne,
    droughtResistance: 3,
    frostZone: "5a–8a",
    soilRequirements: "Żyzna, przepuszczalna gleba; nie lubi suszy i soli",
    rootAggressiveness: 3,
    foundationRisk: "srednie",
    shadePercentAtMaturity: 40,
    messiness: 4,
    messinessLabel: "Duże liście, kasztany, szkodniki (minszczyk)",
    waterNeed: 3,
    maintenanceFrequency: 3,
    diseaseSusceptibility: 4,
    minDistHouseM: 6,
    minDistFenceM: 3,
    lifespanYears: 200,
    saplingCostPln: 40,
    yearsToShade: 8,
    yearsToPrivacy: 10,
    privacyScreeningRate: 28,
    gardenFit: {
      smallGarden: 4,
      largeGarden: 8,
      nearHouse: 4,
      nearFence: 5,
      fastEffect: 6,
    },
    description:
      "Imponująca korona i kwiaty w maju — ale podatny na chorobę i wymaga przestrzeni. Coraz rzadziej sadzony w miastach.",
  },
  swierk: {
    name: "Świerk",
    latinName: "Picea abies",
    growthPerYearCm: 30,
    initialHeightM: 0.6,
    maxHeightM: 40,
    maxCrownWidthM: 8,
    yearsToFullMaturity: 60,
    sun: "pelne",
    sunLabel: SUN_LABELS.pelne,
    droughtResistance: 2,
    frostZone: "3a–7b",
    soilRequirements: "Wilgotna, kwaśna gleba leśna; chronić przed wiatrem",
    rootAggressiveness: 2,
    foundationRisk: "niskie",
    shadePercentAtMaturity: 28,
    messiness: 2,
    messinessLabel: "Igły, szyszki",
    waterNeed: 4,
    maintenanceFrequency: 1,
    diseaseSusceptibility: 3,
    minDistHouseM: 4,
    minDistFenceM: 2,
    lifespanYears: 300,
    saplingCostPln: 35,
    yearsToShade: 12,
    yearsToPrivacy: 14,
    privacyScreeningRate: 20,
    gardenFit: {
      smallGarden: 3,
      largeGarden: 8,
      nearHouse: 5,
      nearFence: 6,
      fastEffect: 4,
    },
    description:
      "Choinkowy klasyk — wolniejszy wzrost niż sosna, ale piękna forma stożkowa. Wymaga wilgotnego podłoża.",
  },
  modrzew: {
    name: "Modrzew",
    latinName: "Larix decidua",
    growthPerYearCm: 45,
    initialHeightM: 0.8,
    maxHeightM: 35,
    maxCrownWidthM: 9,
    yearsToFullMaturity: 50,
    sun: "pelne",
    sunLabel: SUN_LABELS.pelne,
    droughtResistance: 3,
    frostZone: "2a–7b",
    soilRequirements: "Przepuszczalna, umiarkowanie wilgotna; toleruje mróz",
    rootAggressiveness: 2,
    foundationRisk: "niskie",
    shadePercentAtMaturity: 22,
    messiness: 2,
    messinessLabel: "Igły (zrzuca jesienią), szyszki",
    waterNeed: 3,
    maintenanceFrequency: 1,
    diseaseSusceptibility: 2,
    minDistHouseM: 5,
    minDistFenceM: 2,
    lifespanYears: 400,
    saplingCostPln: 45,
    yearsToShade: 8,
    yearsToPrivacy: 10,
    privacyScreeningRate: 28,
    gardenFit: {
      smallGarden: 4,
      largeGarden: 9,
      nearHouse: 6,
      nearFence: 7,
      fastEffect: 7,
    },
    description:
      "Jedyna iglasta tracąca igły na zimę — szybki wzrost, złota jesień. Świetna na większe działki.",
  },
  topola: {
    name: "Topola",
    latinName: "Populus alba",
    growthPerYearCm: 70,
    initialHeightM: 1.5,
    maxHeightM: 28,
    maxCrownWidthM: 11,
    yearsToFullMaturity: 30,
    sun: "pelne",
    sunLabel: SUN_LABELS.pelne,
    droughtResistance: 2,
    frostZone: "3a–8a",
    soilRequirements: "Wilgotna gleba; szybko kolonizuje puste tereny",
    rootAggressiveness: 5,
    foundationRisk: "wysokie",
    shadePercentAtMaturity: 32,
    messiness: 4,
    messinessLabel: "Pułapki nasienne (cotton), liście",
    waterNeed: 4,
    maintenanceFrequency: 3,
    diseaseSusceptibility: 3,
    minDistHouseM: 10,
    minDistFenceM: 5,
    lifespanYears: 70,
    saplingCostPln: 20,
    yearsToShade: 4,
    yearsToPrivacy: 6,
    privacyScreeningRate: 40,
    gardenFit: {
      smallGarden: 2,
      largeGarden: 6,
      nearHouse: 1,
      nearFence: 2,
      fastEffect: 10,
    },
    description:
      "Ekstremalnie szybki wzrost, ale inwazyjne korzenie i krótka żywotność. Raczej na duże tereny, z dala od budynków.",
  },
  orzech: {
    name: "Orzech włoski",
    latinName: "Juglans regia",
    growthPerYearCm: 40,
    initialHeightM: 1.0,
    maxHeightM: 20,
    maxCrownWidthM: 10,
    yearsToFullMaturity: 40,
    sun: "pelne",
    sunLabel: SUN_LABELS.pelne,
    droughtResistance: 3,
    frostZone: "5a–8b",
    soilRequirements: "Głęboka, żyzna gleba; nie sadzić obok innych roślin (juglon)",
    rootAggressiveness: 4,
    foundationRisk: "srednie",
    shadePercentAtMaturity: 38,
    messiness: 4,
    messinessLabel: "Orzechy, liście, allelopatia (juglon)",
    waterNeed: 3,
    maintenanceFrequency: 2,
    diseaseSusceptibility: 3,
    minDistHouseM: 7,
    minDistFenceM: 4,
    lifespanYears: 150,
    saplingCostPln: 55,
    yearsToShade: 7,
    yearsToPrivacy: 9,
    privacyScreeningRate: 30,
    gardenFit: {
      smallGarden: 4,
      largeGarden: 8,
      nearHouse: 4,
      nearFence: 4,
      fastEffect: 7,
    },
    description:
      "Smakowite orzechy i gęsty cień — ale wydziela juglon hamujący wzrost sąsiednich roślin. Wymaga przestrzeni.",
  },
  akacja: {
    name: "Akacja (robinia)",
    latinName: "Robinia pseudoacacia",
    growthPerYearCm: 55,
    initialHeightM: 1.0,
    maxHeightM: 22,
    maxCrownWidthM: 8,
    yearsToFullMaturity: 30,
    sun: "pelne",
    sunLabel: SUN_LABELS.pelne,
    droughtResistance: 5,
    frostZone: "4a–8b",
    soilRequirements: "Toleruje ubogą glebę; fixuje azot, szybko rośnie na pustkach",
    rootAggressiveness: 4,
    foundationRisk: "srednie",
    shadePercentAtMaturity: 25,
    messiness: 3,
    messinessLabel: "Kwiaty (miododajna), strąki, odrostki korzeniowe",
    waterNeed: 2,
    maintenanceFrequency: 3,
    diseaseSusceptibility: 2,
    minDistHouseM: 6,
    minDistFenceM: 3,
    lifespanYears: 80,
    saplingCostPln: 22,
    yearsToShade: 5,
    yearsToPrivacy: 7,
    privacyScreeningRate: 35,
    gardenFit: {
      smallGarden: 4,
      largeGarden: 7,
      nearHouse: 4,
      nearFence: 5,
      fastEffect: 9,
    },
    description:
      "Bardzo odporna na suszę i ubogie gleby. Szybki wzrost, ale wysyła odrostki i wymaga kontroli.",
  },
  grab: {
    name: "Grab",
    latinName: "Carpinus betulus",
    growthPerYearCm: 30,
    initialHeightM: 1.0,
    maxHeightM: 22,
    maxCrownWidthM: 10,
    yearsToFullMaturity: 40,
    sun: "pelne",
    sunLabel: SUN_LABELS.pelne,
    droughtResistance: 4,
    frostZone: "4a–8a",
    soilRequirements: "Żyzna, przepuszczalna; toleruje formowanie i cięcie",
    rootAggressiveness: 2,
    foundationRisk: "niskie",
    shadePercentAtMaturity: 28,
    messiness: 2,
    messinessLabel: "Liście (zimują brązowe — mniej bałaganu niż liściaste opadające)",
    waterNeed: 2,
    maintenanceFrequency: 2,
    diseaseSusceptibility: 1,
    minDistHouseM: 4,
    minDistFenceM: 2,
    lifespanYears: 150,
    saplingCostPln: 12,
    yearsToShade: 8,
    yearsToPrivacy: 10,
    privacyScreeningRate: 28,
    gardenFit: {
      smallGarden: 6,
      largeGarden: 9,
      nearHouse: 7,
      nearFence: 9,
      fastEffect: 6,
    },
    description:
      "Rodzime drzewo i żywopłot w jednym — zdrowe, odporne, liście zimują na gałęziach. Idealny na formowany ekran.",
  },
};

export const TREE_SPECIES_OPTIONS = (
  Object.entries(TREES) as [TreeSpecies, TreeSpeciesData][]
).map(([value, t]) => ({
  value,
  label: t.name,
  hint: `${t.growthPerYearCm} cm/rok · max ${t.maxHeightM} m`,
}));

const FIT_LABELS: Record<keyof GardenFitScores, string> = {
  smallGarden: "Mały ogród",
  largeGarden: "Duży ogród",
  nearHouse: "Przy domu",
  nearFence: "Przy ogrodzeniu",
  fastEffect: "Szybki efekt",
};

function heightAtYear(tree: TreeSpeciesData, years: number): number {
  const growthM = tree.growthPerYearCm / 100;
  const h = tree.initialHeightM + growthM * years;
  return Math.min(Math.round(h * 10) / 10, tree.maxHeightM);
}

function heightAtYears(tree: TreeSpeciesData, years: number[]): HeightPoint[] {
  return years.map((y) => ({ years: y, heightM: heightAtYear(tree, y) }));
}

function pickWinner(
  rawA: number,
  rawB: number,
  higherIsBetter: boolean
): ComparisonWinner {
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

function buildComparisonRows(a: TreeSpeciesData, b: TreeSpeciesData): ComparisonRow[] {
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
      metric: "Wysokość po 20 latach",
      valueA: `${heightAtYear(a, 20)} m`,
      valueB: `${heightAtYear(b, 20)} m`,
      rawA: heightAtYear(a, 20),
      rawB: heightAtYear(b, 20),
      higherIsBetter: true,
    },
    {
      metric: "Wysokość po 50 latach",
      valueA: `${heightAtYear(a, 50)} m`,
      valueB: `${heightAtYear(b, 50)} m`,
      rawA: heightAtYear(a, 50),
      rawB: heightAtYear(b, 50),
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
      metric: "Zacienienie ogrodu (max)",
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
      metric: "Kiedy daje prywatność",
      valueA: `~${a.yearsToPrivacy} lat`,
      valueB: `~${b.yearsToPrivacy} lat`,
      rawA: a.yearsToPrivacy,
      rawB: b.yearsToPrivacy,
      higherIsBetter: false,
    },
    {
      metric: "Tempo zasłaniania sąsiadów",
      valueA: `~${a.privacyScreeningRate} cm/rok`,
      valueB: `~${b.privacyScreeningRate} cm/rok`,
      rawA: a.privacyScreeningRate,
      rawB: b.privacyScreeningRate,
      higherIsBetter: true,
    },
  ];

  const categories = [
    "Wzrost i rozmiar",
    "Wzrost i rozmiar",
    "Wzrost i rozmiar",
    "Wzrost i rozmiar",
    "Wzrost i rozmiar",
    "Wzrost i rozmiar",
    "Wzrost i rozmiar",
    "Warunki stanowiska",
    "Warunki stanowiska",
    "Warunki stanowiska",
    "Warunki stanowiska",
    "Wpływ na ogród",
    "Wpływ na ogród",
    "Wpływ na ogród",
    "Wpływ na ogród",
    "Woda i utrzymanie",
    "Woda i utrzymanie",
    "Woda i utrzymanie",
    "Praktyczne",
    "Praktyczne",
    "Praktyczne",
    "Praktyczne",
    "Efekt wizualny",
    "Efekt wizualny",
    "Efekt wizualny",
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

function buildBarMetrics(a: TreeSpeciesData, b: TreeSpeciesData): BarMetric[] {
  return [
    {
      label: "Szybkość wzrostu",
      valueA: a.growthPerYearCm,
      valueB: b.growthPerYearCm,
      unit: "cm/rok",
      higherIsBetter: true,
    },
    {
      label: "Wysokość max",
      valueA: a.maxHeightM,
      valueB: b.maxHeightM,
      unit: "m",
      higherIsBetter: true,
    },
    {
      label: "Szerokość korony",
      valueA: a.maxCrownWidthM,
      valueB: b.maxCrownWidthM,
      unit: "m",
      higherIsBetter: true,
    },
    {
      label: "Odporność na suszę",
      valueA: a.droughtResistance,
      valueB: b.droughtResistance,
      unit: "/5",
      higherIsBetter: true,
    },
    {
      label: "Agresywność korzeni",
      valueA: a.rootAggressiveness,
      valueB: b.rootAggressiveness,
      unit: "/5",
      higherIsBetter: false,
    },
  ];
}

function buildFitScores(scores: GardenFitScores) {
  return (Object.keys(FIT_LABELS) as (keyof GardenFitScores)[]).map((key) => ({
    label: FIT_LABELS[key],
    value: scores[key],
  }));
}

function buildVerdict(
  a: TreeSpeciesData,
  b: TreeSpeciesData,
  slugA: TreeSpecies,
  slugB: TreeSpecies
): string {
  const parts: string[] = [];

  if (a.growthPerYearCm > b.growthPerYearCm + 15) {
    parts.push(`${a.name} rośnie wyraźnie szybciej (${a.growthPerYearCm} vs ${b.growthPerYearCm} cm/rok).`);
  } else if (b.growthPerYearCm > a.growthPerYearCm + 15) {
    parts.push(`${b.name} rośnie wyraźnie szybciej (${b.growthPerYearCm} vs ${a.growthPerYearCm} cm/rok).`);
  }

  if (a.lifespanYears > b.lifespanYears * 2) {
    parts.push(`${a.name} żyje znacznie dłużej — inwestycja na pokolenia.`);
  } else if (b.lifespanYears > a.lifespanYears * 2) {
    parts.push(`${b.name} żyje znacznie dłużej — inwestycja na pokolenia.`);
  }

  if (a.minDistHouseM <= 4 && b.minDistHouseM >= 6) {
    parts.push(`${a.name} można posadzić bliżej domu (min. ${a.minDistHouseM} m vs ${b.minDistHouseM} m).`);
  } else if (b.minDistHouseM <= 4 && a.minDistHouseM >= 6) {
    parts.push(`${b.name} można posadzić bliżej domu (min. ${b.minDistHouseM} m vs ${a.minDistHouseM} m).`);
  }

  if (a.waterNeed <= 2 && b.waterNeed >= 4) {
    parts.push(`${a.name} wymaga mniej wody — lepszy wybór na suszę.`);
  } else if (b.waterNeed <= 2 && a.waterNeed >= 4) {
    parts.push(`${b.name} wymaga mniej wody — lepszy wybór na suszę.`);
  }

  if (parts.length === 0) {
    return `${a.name} i ${b.name} to różne strategie: ${a.name} — ${a.description.split("—")[0]?.trim() ?? a.description}; ${b.name} — ${b.description.split("—")[0]?.trim() ?? b.description}`;
  }

  return parts.join(" ");
}

function buildTips(a: TreeSpeciesData, b: TreeSpeciesData): string[] {
  const tips: string[] = [];

  if (a.rootAggressiveness >= 4 || b.rootAggressiveness >= 4) {
    const risky = a.rootAggressiveness >= 4 ? a.name : b.name;
    tips.push(
      `${risky} ma agresywne korzenie — sadzaj min. ${Math.max(a.minDistHouseM, b.minDistHouseM)} m od domu i instalacji.`
    );
  }

  if (a.foundationRisk === "wysokie" || b.foundationRisk === "wysokie") {
    tips.push(
      "Przy wysokim ryzyku dla fundamentów rozważ barierę korzeniową (geomembrana) w promieniu 2 m od budynku."
    );
  }

  if (a.waterNeed >= 4 || b.waterNeed >= 4) {
    const thirsty = a.waterNeed >= b.waterNeed ? a.name : b.name;
    tips.push(
      `${thirsty} potrzebuje wilgotnego stanowiska — podlewaj w pierwszych 3 latach regularnie, zwłaszcza latem.`
    );
  }

  tips.push(
    `Na małej działce lepszy wynik „dopasowania” ma ${a.gardenFit.smallGarden >= b.gardenFit.smallGarden ? a.name : b.name} (${Math.max(a.gardenFit.smallGarden, b.gardenFit.smallGarden)}/10 vs ${Math.min(a.gardenFit.smallGarden, b.gardenFit.smallGarden)}/10).`
  );

  tips.push(
    "Sadzonkę najlepiej posadzić jesienią (październik–listopad) lub wczesną wiosną (marzec–kwiecień)."
  );

  return tips;
}

export function getTreeInfo(species: TreeSpecies): TreeSpeciesData {
  return TREES[species];
}

export function compareTrees(
  speciesA: TreeSpecies,
  speciesB: TreeSpecies
): TreeComparatorResult {
  const a = TREES[speciesA];
  const b = TREES[speciesB];

  const scatterPoints: ScatterPoint[] = (
    Object.entries(TREES) as [TreeSpecies, TreeSpeciesData][]
  ).map(([species, t]) => ({
    species,
    name: t.name,
    waterNeed: t.waterNeed,
    growthPerYearCm: t.growthPerYearCm,
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
    verdict: buildVerdict(a, b, speciesA, speciesB),
    tips: buildTips(a, b),
  };
}

export const MAIN_TREE_FAQ: { question: string; answer: string }[] = [
  {
    question: "Jak porównać dąb i sosnę?",
    answer:
      "Dąb rośnie wolniej (ok. 25 cm/rok), ale żyje setki lat i daje gęsty cień liściasty. Sosna rośnie szybciej (40 cm/rok), jest bardziej odporna na suszę i mróz, ale korona węższa. Dąb wymaga min. 8 m od domu ze względu na korzenie.",
  },
  {
    question: "Które drzewo rośnie najszybciej?",
    answer:
      "Wśród popularnych gatunków wierzba (do 80 cm/rok) i brzoza (do 60 cm/rok) rosną najszybciej. Dąb i buk są znacznie wolniejsze, ale żyją znacznie dłużej.",
  },
  {
    question: "Jak daleko od domu sadzić drzewo?",
    answer:
      "Zależy od gatunku: brzoza i jodła min. 4–5 m, sosna i klon ok. 5 m, dąb i wierzba min. 8–10 m. Im agresywniejsze korzenie, tym większa odległość.",
  },
  {
    question: "Czy szybko rosnące drzewo wymaga więcej wody?",
    answer:
      "Często tak — wierzba i olcha mają wysokie zapotrzebowanie na wodę (5/5), podczas gdy sosna i dąb są bardziej oszczędne (2/5). Wykres „woda vs wzrost” pokazuje ten kompromis.",
  },
  {
    question: "Które drzewo najlepiej zasłania sąsiadów?",
    answer:
      "Szybki efekt daje wierzba i brzoza (prywatność po 5–7 latach). Dąb i buk potrzebują 14–18 lat, ale dają trwalszy, szerszy ekran.",
  },
];

export { CURVE_YEARS, heightAtYear };
