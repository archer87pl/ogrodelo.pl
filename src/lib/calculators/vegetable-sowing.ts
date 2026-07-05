export type SowingMethod = "siew" | "rozsada";

export interface VegetableSowingData {
  id: string;
  name: string;
  /** Rozstawa między rzędami w cm */
  rowSpacingCm: number;
  /** Rozstawa w rzędzie (po przerzedzeniu / sadzeniu) w cm */
  inRowSpacingCm: number;
  method: SowingMethod;
  /** Etykieta metody, np. "siew wprost", "rozsada", "sadzenie dymki" */
  methodLabel: string;
  /** Termin siewu / sadzenia do gruntu (polski klimat) */
  sowingDate: string;
  /** Norma wysiewu w g/m² — tylko dla siewu wprost */
  seedRateGramsPerM2?: number;
  /** Liczba roślin na m² — tylko dla rozsady / sadzenia */
  plantsPerM2?: number;
  /** Orientacyjny plon w kg/m² */
  yieldKgPerM2: number;
  /** Głębokość siewu w cm */
  sowingDepthCm: number;
  goodCompanions: string[];
  badCompanions: string[];
}

export const VEGETABLES: VegetableSowingData[] = [
  {
    id: "marchew",
    name: "Marchew",
    rowSpacingCm: 25,
    inRowSpacingCm: 4,
    method: "siew",
    methodLabel: "siew wprost",
    sowingDate: "kwiecień – czerwiec",
    seedRateGramsPerM2: 0.8,
    yieldKgPerM2: 3.5,
    sowingDepthCm: 1.5,
    goodCompanions: ["cebula", "por", "groch", "sałata"],
    badCompanions: ["koper", "seler"],
  },
  {
    id: "pietruszka",
    name: "Pietruszka korzeniowa",
    rowSpacingCm: 30,
    inRowSpacingCm: 5,
    method: "siew",
    methodLabel: "siew wprost",
    sowingDate: "marzec – kwiecień",
    seedRateGramsPerM2: 0.6,
    yieldKgPerM2: 2,
    sowingDepthCm: 1.5,
    goodCompanions: ["pomidor", "rzodkiewka", "cebula"],
    badCompanions: ["sałata", "marchew"],
  },
  {
    id: "burak",
    name: "Burak ćwikłowy",
    rowSpacingCm: 30,
    inRowSpacingCm: 8,
    method: "siew",
    methodLabel: "siew wprost",
    sowingDate: "kwiecień – czerwiec",
    seedRateGramsPerM2: 1.8,
    yieldKgPerM2: 3.5,
    sowingDepthCm: 2.5,
    goodCompanions: ["cebula", "sałata", "koper"],
    badCompanions: ["fasola tyczna", "szpinak"],
  },
  {
    id: "rzodkiewka",
    name: "Rzodkiewka",
    rowSpacingCm: 15,
    inRowSpacingCm: 3,
    method: "siew",
    methodLabel: "siew wprost",
    sowingDate: "marzec – wrzesień (siew co 2 tyg.)",
    seedRateGramsPerM2: 2.5,
    yieldKgPerM2: 1.5,
    sowingDepthCm: 1,
    goodCompanions: ["sałata", "marchew", "groch"],
    badCompanions: ["kapusta", "ogórecznik"],
  },
  {
    id: "salata",
    name: "Sałata masłowa",
    rowSpacingCm: 30,
    inRowSpacingCm: 25,
    method: "rozsada",
    methodLabel: "rozsada",
    sowingDate: "sadzenie: kwiecień – sierpień",
    plantsPerM2: 12,
    yieldKgPerM2: 2,
    sowingDepthCm: 0.5,
    goodCompanions: ["rzodkiewka", "marchew", "truskawka"],
    badCompanions: ["pietruszka", "seler"],
  },
  {
    id: "cebula-dymka",
    name: "Cebula z dymki",
    rowSpacingCm: 25,
    inRowSpacingCm: 8,
    method: "rozsada",
    methodLabel: "sadzenie dymki",
    sowingDate: "kwiecień",
    plantsPerM2: 50,
    yieldKgPerM2: 2.5,
    sowingDepthCm: 3,
    goodCompanions: ["marchew", "burak", "sałata"],
    badCompanions: ["fasola", "groch"],
  },
  {
    id: "pomidor",
    name: "Pomidor gruntowy",
    rowSpacingCm: 70,
    inRowSpacingCm: 50,
    method: "rozsada",
    methodLabel: "rozsada",
    sowingDate: "sadzenie po 15 maja (siew na rozsadę: marzec)",
    plantsPerM2: 3,
    yieldKgPerM2: 5,
    sowingDepthCm: 1,
    goodCompanions: ["bazylia", "cebula", "marchew", "pietruszka"],
    badCompanions: ["ziemniak", "koper", "kapusta"],
  },
  {
    id: "ogorek",
    name: "Ogórek gruntowy",
    rowSpacingCm: 100,
    inRowSpacingCm: 15,
    method: "siew",
    methodLabel: "siew wprost",
    sowingDate: "połowa maja – początek czerwca",
    seedRateGramsPerM2: 0.6,
    yieldKgPerM2: 4,
    sowingDepthCm: 2.5,
    goodCompanions: ["koper", "fasola", "sałata", "groch"],
    badCompanions: ["pomidor", "ziemniak"],
  },
  {
    id: "cukinia",
    name: "Cukinia",
    rowSpacingCm: 100,
    inRowSpacingCm: 100,
    method: "siew",
    methodLabel: "siew wprost",
    sowingDate: "połowa maja – początek czerwca",
    seedRateGramsPerM2: 0.3,
    yieldKgPerM2: 6,
    sowingDepthCm: 3,
    goodCompanions: ["fasola", "nasturcja", "cebula"],
    badCompanions: ["ziemniak", "ogórek"],
  },
  {
    id: "fasola",
    name: "Fasola szparagowa",
    rowSpacingCm: 40,
    inRowSpacingCm: 6,
    method: "siew",
    methodLabel: "siew wprost",
    sowingDate: "połowa maja – czerwiec",
    seedRateGramsPerM2: 10,
    yieldKgPerM2: 1.5,
    sowingDepthCm: 3,
    goodCompanions: ["ogórek", "kapusta", "marchew", "cukinia"],
    badCompanions: ["cebula", "czosnek", "groch"],
  },
  {
    id: "groch",
    name: "Groch",
    rowSpacingCm: 30,
    inRowSpacingCm: 4,
    method: "siew",
    methodLabel: "siew wprost",
    sowingDate: "marzec – kwiecień",
    seedRateGramsPerM2: 12,
    yieldKgPerM2: 1,
    sowingDepthCm: 5,
    goodCompanions: ["marchew", "rzodkiewka", "ogórek"],
    badCompanions: ["cebula", "czosnek", "fasola"],
  },
  {
    id: "kapusta",
    name: "Kapusta głowiasta",
    rowSpacingCm: 50,
    inRowSpacingCm: 50,
    method: "rozsada",
    methodLabel: "rozsada",
    sowingDate: "sadzenie: maj (siew na rozsadę: marzec – kwiecień)",
    plantsPerM2: 4,
    yieldKgPerM2: 5,
    sowingDepthCm: 1,
    goodCompanions: ["fasola", "seler", "koper", "burak"],
    badCompanions: ["pomidor", "truskawka", "rzodkiewka"],
  },
];

export function getVegetableById(id: string): VegetableSowingData {
  return VEGETABLES.find((v) => v.id === id) ?? VEGETABLES[0];
}

export interface SowingInput {
  vegetableId: string;
  /** Powierzchnia zagonu w m² */
  areaM2: number;
  /** Szerokość zagonu w m */
  bedWidthM: number;
}

export interface SowingResult {
  vegetable: VegetableSowingData;
  /** Liczba rzędów na szerokości zagonu */
  rowCount: number;
  /** Długość zagonu w m (wyliczona z powierzchni i szerokości) */
  bedLengthM: number;
  /** Łączna liczba roślin po przerzedzeniu / posadzeniu */
  totalPlants: number;
  /** Ilość nasion w gramach (siew wprost) */
  seedGrams?: number;
  /** Liczba sztuk rozsady / dymki z 10% zapasem */
  seedlingCount?: number;
  sowingDate: string;
  estimatedYieldKg: number;
  sowingDepthCm: number;
  tips: string[];
}

export function calculateSowing(input: SowingInput): SowingResult {
  const vegetable = getVegetableById(input.vegetableId);

  const areaM2 =
    Number.isFinite(input.areaM2) && input.areaM2 > 0 ? input.areaM2 : 1;
  const bedWidthM =
    Number.isFinite(input.bedWidthM) && input.bedWidthM > 0
      ? input.bedWidthM
      : 1.2;

  const bedLengthM = areaM2 / bedWidthM;

  const rowCount = Math.max(
    1,
    Math.floor((bedWidthM * 100) / vegetable.rowSpacingCm)
  );
  const plantsPerRow = Math.max(
    1,
    Math.floor((bedLengthM * 100) / vegetable.inRowSpacingCm)
  );
  const totalPlants = rowCount * plantsPerRow;

  const seedGrams =
    vegetable.method === "siew" && vegetable.seedRateGramsPerM2 !== undefined
      ? Math.max(0.1, Math.round(areaM2 * vegetable.seedRateGramsPerM2 * 10) / 10)
      : undefined;

  const seedlingCount =
    vegetable.method === "rozsada"
      ? Math.ceil(totalPlants * 1.1)
      : undefined;

  const estimatedYieldKg =
    Math.round(areaM2 * vegetable.yieldKgPerM2 * 10) / 10;

  return {
    vegetable,
    rowCount,
    bedLengthM: Math.round(bedLengthM * 10) / 10,
    totalPlants,
    seedGrams,
    seedlingCount,
    sowingDate: vegetable.sowingDate,
    estimatedYieldKg,
    sowingDepthCm: vegetable.sowingDepthCm,
    tips: [
      "Sałatę i rzodkiewkę wysiewaj sukcesywnie co 2 tygodnie — zamiast jednego dużego zbioru będziesz mieć świeże warzywa przez cały sezon.",
      "Stosuj płodozmian: nie uprawiaj warzyw z tej samej rodziny (np. kapusta i rzodkiewka) na tym samym zagonie częściej niż co 3–4 lata.",
      "Siew wprost zawsze wysiewaj gęściej, a po wzejściu przerzedzaj do docelowej rozstawy — u marchwi do ok. 4 cm w rzędzie.",
    ],
  };
}

export const VEGETABLE_SOWING_FAQ = [
  {
    question: "Ile nasion marchwi potrzeba na 1 m² zagonu?",
    answer:
      "Norma wysiewu marchwi to około 0,5–1 g nasion na 1 m² (w 1 g mieści się ok. 700–900 nasion). Wysiewamy gęściej w rzędach co 25 cm, a po wzejściu przerzedzamy siewki do 3–4 cm w rzędzie. Po przerzedzeniu na 1 m² zostaje ok. 100 roślin, które dadzą 3–4 kg korzeni.",
  },
  {
    question: "Kiedy siać warzywa do gruntu w polskim klimacie?",
    answer:
      "Najwcześniej, bo już w marcu, wysiewamy groch, pietruszkę i rzodkiewkę. W kwietniu przychodzi czas na marchew, buraki i sadzenie cebuli z dymki. Warzywa ciepłolubne — fasolę szparagową, ogórki i cukinię — siejemy dopiero po 15 maja, gdy minie ryzyko przymrozków (tzw. zimni ogrodnicy i zimna Zośka). Wtedy też sadzimy rozsadę pomidorów gruntowych.",
  },
  {
    question: "Ile rozsady pomidorów potrzebuję na 10 m²?",
    answer:
      "Pomidory gruntowe sadzimy w rozstawie ok. 70 × 50 cm, czyli niecałe 3 rośliny na 1 m². Na zagon o powierzchni 10 m² potrzeba więc ok. 28–30 sadzonek (licząc 10% zapasu). Przy plonie 4–6 kg z 1 m² zbierzesz z takiego zagonu 40–60 kg pomidorów.",
  },
  {
    question: "Jak głęboko siać nasiona warzyw?",
    answer:
      "Obowiązuje zasada: głębokość siewu to 2–3-krotność średnicy nasiona. Drobne nasiona sałaty i marchwi siejemy płytko, na 0,5–1,5 cm. Średnie — buraki i ogórki — na 2–3 cm. Duże nasiona fasoli siejemy na ok. 3 cm, a grochu nawet na 4–5 cm. Zbyt głęboki siew drobnych nasion to najczęstsza przyczyna słabych wschodów.",
  },
  {
    question: "Jakiego plonu mogę się spodziewać z warzywnika 10 m²?",
    answer:
      "Plon zależy od gatunku: z 10 m² zbierzesz orientacyjnie 15 kg rzodkiewki, 20 kg pietruszki, 35 kg marchwi lub buraków, 40–50 kg ogórków gruntowych, ok. 50 kg pomidorów i nawet 60 kg cukinii. Warzywa strączkowe dają mniej masy — ok. 10 kg grochu i 15 kg fasoli szparagowej — ale za to wzbogacają glebę w azot.",
  },
];
