export type MeadowMixType = "jednoroczna" | "wieloletnia" | "cien" | "skarpy";
export type RainRegion = "suchy" | "przecietny" | "wilgotny";

export interface FlowerMeadowInput {
  area: number;
  mixType: MeadowMixType;
  replacingLawn: boolean;
  rainRegion: RainRegion;
}

export interface FlowerMeadowResult {
  seedGrams: number;
  seedLabel: string;
  seedCost: number;
  soilPrepCost: number;
  sodRemovalCost: number;
  totalSetupCost: number;
  waterSavedLiters: number;
  waterSavedPLN: number;
  mowingsSaved: number;
  timeSavedHours: number;
  fuelSavedPLN: number;
  schedule: { phase: string; detail: string }[];
  tips: string[];
}

interface MixData {
  label: string;
  seedRateGramsPerM2: number;
  pricePerKg: number;
  meadowMowingsPerYear: number;
  sowingWindow: string;
  firstMowing: string;
  yearly: string;
}

export const MEADOW_MIXES: Record<MeadowMixType, MixData> = {
  jednoroczna: {
    label: "Jednoroczna (efekt w 6–8 tyg., wysiew co rok)",
    seedRateGramsPerM2: 2,
    pricePerKg: 250,
    meadowMowingsPerYear: 1,
    sowingWindow: "Kwiecień–maj (po ostatnich przymrozkach)",
    firstMowing: "Po sezonie (październik–listopad), gdy rośliny wysypią nasiona",
    yearly: "Wiosną przekop płytko glebę i wysiej mieszankę ponownie",
  },
  wieloletnia: {
    label: "Wieloletnia (pełnia od 2. roku, trwała)",
    seedRateGramsPerM2: 1.5,
    pricePerKg: 350,
    meadowMowingsPerYear: 2,
    sowingWindow: "Sierpień–wrzesień (najlepiej) lub kwiecień–maj",
    firstMowing: "Czerwiec i wrzesień — koniecznie zbierz pokos!",
    yearly: "2 koszenia rocznie (VI i IX), zawsze usuwaj skoszoną biomasę",
  },
  cien: {
    label: "Na cień (pod drzewa, północna strona)",
    seedRateGramsPerM2: 1.5,
    pricePerKg: 400,
    meadowMowingsPerYear: 2,
    sowingWindow: "Sierpień–wrzesień lub kwiecień–maj",
    firstMowing: "Czerwiec i wrzesień — zbierz pokos",
    yearly: "2 koszenia rocznie, dosiej łyse miejsca wiosną",
  },
  skarpy: {
    label: "Na skarpy (przeciwerozyjna)",
    seedRateGramsPerM2: 2,
    pricePerKg: 300,
    meadowMowingsPerYear: 1,
    sowingWindow: "Kwiecień–maj lub sierpień–wrzesień",
    firstMowing: "Wrzesień — jedno koszenie, zbierz pokos",
    yearly: "1 koszenie rocznie (IX), kontroluj erozję po ulewach",
  },
};

export const RAIN_REGIONS: Record<
  RainRegion,
  { label: string; lawnWaterLitersPerM2: number }
> = {
  suchy: { label: "Suchy (<500 mm/rok, np. Wielkopolska, Kujawy)", lawnWaterLitersPerM2: 550 },
  przecietny: { label: "Przeciętny (500–650 mm/rok)", lawnWaterLitersPerM2: 450 },
  wilgotny: { label: "Wilgotny (>650 mm/rok, np. podgórze)", lawnWaterLitersPerM2: 300 },
};

const SOIL_PREP_PLN_PER_M2 = 3; // przekopanie/glebogryzarka + grabienie: 2–5 PLN/m²
const SOD_REMOVAL_PLN_PER_M2 = 5; // usunięcie darni / głęboka glebogryzarka
const WATER_PRICE_PLN_PER_M3 = 12;
const LAWN_MOWINGS_PER_YEAR = 23; // 20–25× w sezonie
const MOWING_MINUTES_PER_M2 = 0.2; // 100 m² = 20 min na jedno koszenie
const FUEL_PLN_PER_100M2_PER_MOWING = 6;

export function calculateFlowerMeadow(
  input: FlowerMeadowInput
): FlowerMeadowResult {
  const { area, mixType, replacingLawn, rainRegion } = input;
  const mix = MEADOW_MIXES[mixType];
  const region = RAIN_REGIONS[rainRegion];

  const seedGrams = Math.round(area * mix.seedRateGramsPerM2);
  const seedLabel =
    seedGrams >= 1000
      ? `${(seedGrams / 1000).toFixed(seedGrams % 1000 === 0 ? 0 : 1)} kg`
      : `${seedGrams} g`;
  const seedCost = Math.round((seedGrams / 1000) * mix.pricePerKg);

  const soilPrepCost = Math.round(area * SOIL_PREP_PLN_PER_M2);
  const sodRemovalCost = replacingLawn
    ? Math.round(area * SOD_REMOVAL_PLN_PER_M2)
    : 0;
  const totalSetupCost = seedCost + soilPrepCost + sodRemovalCost;

  // Oszczędności vs trawnik na tej samej powierzchni
  const waterSavedLiters = Math.round(area * region.lawnWaterLitersPerM2);
  const waterSavedPLN = Math.round(
    (waterSavedLiters / 1000) * WATER_PRICE_PLN_PER_M3
  );

  const mowingsSaved = LAWN_MOWINGS_PER_YEAR - mix.meadowMowingsPerYear;
  const timeSavedHours =
    Math.round(((mowingsSaved * area * MOWING_MINUTES_PER_M2) / 60) * 10) / 10;
  const fuelSavedPLN = Math.round(
    (mowingsSaved * area * FUEL_PLN_PER_100M2_PER_MOWING) / 100
  );

  return {
    seedGrams,
    seedLabel,
    seedCost,
    soilPrepCost,
    sodRemovalCost,
    totalSetupCost,
    waterSavedLiters,
    waterSavedPLN,
    mowingsSaved,
    timeSavedHours,
    fuelSavedPLN,
    schedule: [
      { phase: "Siew", detail: mix.sowingWindow },
      { phase: "Pierwsze koszenie", detail: mix.firstMowing },
      { phase: "Co roku", detail: mix.yearly },
    ],
    tips: [
      "Nie nawoź — łąki kwietne kwitną najlepiej na ubogiej glebie. Nawóz sprzyja trawom, które zagłuszą kwiaty.",
      "Wymieszaj nasiona z suchym piaskiem w proporcji 1:10 — łatwiej wysiejesz równomiernie tak małą ilość.",
      "Zostaw pas niekoszony przez zimę — to schronienie dla zapylaczy i innych pożytecznych owadów.",
    ],
  };
}

export const FLOWER_MEADOW_FAQ = [
  {
    question: "Ile nasion łąki kwietnej potrzeba na m²?",
    answer:
      "Zaledwie 1–2 g/m² — mieszanki jednoroczne ok. 2 g/m², wieloletnie ok. 1,5 g/m². Na 100 m² wystarczy 150–200 g nasion. To dużo mniej niż przy trawniku (25–35 g/m²), dlatego nasiona miesza się z piaskiem, żeby wysiać je równomiernie.",
  },
  {
    question: "Ile kosztuje założenie łąki kwietnej?",
    answer:
      "Nasiona kosztują 200–400 PLN/kg, czyli przy normie 1,5–2 g/m² to zaledwie 0,30–0,80 PLN/m². Do tego przygotowanie gleby (przekopanie, grabienie) ok. 2–5 PLN/m². Łąka 100 m² to łącznie ok. 250–600 PLN — a jeśli usuwasz istniejącą darń, dolicz ok. 5 PLN/m².",
  },
  {
    question: "Kiedy siać łąkę kwietną?",
    answer:
      "Dwa okna: kwiecień–maj lub sierpień–wrzesień. Mieszanki jednoroczne siej wiosną — zakwitną już po 6–8 tygodniach. Mieszanki wieloletnie najlepiej wysiać jesienią (VIII–IX): nasiona przejdą naturalną stratyfikację zimą, a łąka pokaże pełnię możliwości od 2. roku.",
  },
  {
    question: "Ile wody oszczędza łąka kwietna w porównaniu z trawnikiem?",
    answer:
      "Trawnik potrzebuje ok. 450 l wody na m² w sezonie, a ugruntowana łąka kwietna praktycznie 0 l — radzi sobie samym deszczem. Na 100 m² to ok. 45 000 l rocznie, czyli przy cenie 12 PLN/m³ ponad 500 PLN oszczędności na samej wodzie.",
  },
  {
    question: "Jak często kosić łąkę kwietną?",
    answer:
      "Tylko 1–2 razy w roku: łąkę wieloletnią w czerwcu i wrześniu, jednoroczną raz po sezonie. Trawnik kosisz 20–25 razy w sezonie, więc na 100 m² oszczędzasz ok. 7 godzin pracy rocznie. Ważne: zawsze zbieraj pokos, żeby nie użyźniać gleby.",
  },
];
