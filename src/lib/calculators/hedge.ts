export type HedgeSpecies =
  | "grab"
  | "laurowisnia"
  | "cis"
  | "buk"
  | "ligustr"
  | "bambus"
  | "ostrokrzew"
  | "bukszpan"
  | "zywotnik"
  | "kalina"
  | "deren"
  | "zurawina";

export type HedgeDensity = "normalna" | "gesta";
export type HedgeRows = 1 | 2;
export type SaplingSize = "mala" | "srednia" | "duza";

export interface HedgeInput {
  length: number;
  species: HedgeSpecies;
  density?: HedgeDensity;
  rows?: HedgeRows;
  saplingSize?: SaplingSize;
  targetPrivacyHeight?: number;
}

export interface GrowthMilestone {
  years: number;
  height: number;
  privacyPercent: number;
}

export interface PrivacyMilestone {
  height: number;
  years: number;
  label: string;
}

export interface PruningEntry {
  season: string;
  months: string;
  action: string;
}

export interface CostBreakdown {
  item: string;
  amount: string;
  cost: number;
}

export interface SpeciesComparison {
  species: HedgeSpecies;
  name: string;
  matchScore: number;
  saplingCount: number;
  totalCost: number;
  privacyYears: number;
  evergreen: boolean;
}

export interface HedgeResult {
  saplingCount: number;
  saplingsPerRow: number;
  totalCost: number;
  spacing: number;
  pricePerSapling: number;
  privacyYears: number;
  milestones: GrowthMilestone[];
  privacyMilestones: PrivacyMilestone[];
  pruningSchedule: PruningEntry[];
  costBreakdown: CostBreakdown[];
  maintenanceYearly: number;
  speciesName: string;
  latinName: string;
  evergreen: boolean;
  growthPerYear: number;
  maxHeight: number;
  frostZone: string;
  comparisons: SpeciesComparison[];
  tips: string[];
  formula: string;
}

export interface SpeciesInfo {
  name: string;
  latinName: string;
  spacing: number;
  growthPerYear: number;
  initialHeight: number;
  pricePerSapling: number;
  privacyHeight: number;
  maxHeight: number;
  evergreen: boolean;
  frostZone: string;
  pruningsPerYear: number;
  description: string;
}

const SIZE_FACTOR: Record<SaplingSize, { height: number; price: number }> = {
  mala: { height: 0.35, price: 0.6 },
  srednia: { height: 0.6, price: 1.0 },
  duza: { height: 0.9, price: 1.6 },
};

export const SPECIES: Record<HedgeSpecies, SpeciesInfo> = {
  grab: {
    name: "Grab",
    latinName: "Carpinus betulus",
    spacing: 0.3,
    growthPerYear: 0.3,
    initialHeight: 0.6,
    pricePerSapling: 12,
    privacyHeight: 1.8,
    maxHeight: 8,
    evergreen: false,
    frostZone: "6a–8a",
    pruningsPerYear: 2,
    description: "Polski klasyk — gęsty, tani, liściasty żywopłot. Liście brązowieją zimą.",
  },
  laurowisnia: {
    name: "Laurowiśnia",
    latinName: "Prunus laurocerasus",
    spacing: 0.5,
    growthPerYear: 0.4,
    initialHeight: 0.4,
    pricePerSapling: 18,
    privacyHeight: 1.8,
    maxHeight: 5,
    evergreen: true,
    frostZone: "6b–8a",
    pruningsPerYear: 2,
    description: "Zimozielona, szybka, lubi wilgotną glebę. Popularna na południu Polski.",
  },
  cis: {
    name: "Cis",
    latinName: "Taxus baccata",
    spacing: 0.4,
    growthPerYear: 0.2,
    initialHeight: 0.5,
    pricePerSapling: 25,
    privacyHeight: 1.8,
    maxHeight: 10,
    evergreen: true,
    frostZone: "6a–8a",
    pruningsPerYear: 1,
    description: "Najtrwalszy żywopłot — żyje 500+ lat. Wolny wzrost, trujący.",
  },
  buk: {
    name: "Buk",
    latinName: "Fagus sylvatica",
    spacing: 0.3,
    growthPerYear: 0.25,
    initialHeight: 0.6,
    pricePerSapling: 14,
    privacyHeight: 1.8,
    maxHeight: 10,
    evergreen: false,
    frostZone: "6a–8a",
    pruningsPerYear: 2,
    description: "Liście zimują brązowe na gałęziach. Elegancki, gęsty, średni wzrost.",
  },
  ligustr: {
    name: "Ligustr",
    latinName: "Ligustrum vulgare",
    spacing: 0.35,
    growthPerYear: 0.35,
    initialHeight: 0.4,
    pricePerSapling: 10,
    privacyHeight: 1.8,
    maxHeight: 4,
    evergreen: false,
    frostZone: "6a–8a",
    pruningsPerYear: 2,
    description: "Szybki, tani, gęsty. Białe kwiaty latem. Liściasty.",
  },
  bambus: {
    name: "Bambus",
    latinName: "Phyllostachys",
    spacing: 0.6,
    growthPerYear: 0.5,
    initialHeight: 0.8,
    pricePerSapling: 35,
    privacyHeight: 2.0,
    maxHeight: 6,
    evergreen: true,
    frostZone: "7a–8a",
    pruningsPerYear: 1,
    description: "Najszybszy wzrost. Wymaga barier korzeniowych i osłoniętego stanowiska.",
  },
  ostrokrzew: {
    name: "Ostrokrzew kolczasty",
    latinName: "Ilex aquifolium",
    spacing: 0.4,
    growthPerYear: 0.25,
    initialHeight: 0.5,
    pricePerSapling: 22,
    privacyHeight: 1.8,
    maxHeight: 8,
    evergreen: true,
    frostZone: "6a–8a",
    pruningsPerYear: 1,
    description: "Zimozielony, kolczasty, jadalne owoce. Świetny zamiennik tui.",
  },
  bukszpan: {
    name: "Bukszpan",
    latinName: "Buxus sempervirens",
    spacing: 0.25,
    growthPerYear: 0.1,
    initialHeight: 0.3,
    pricePerSapling: 15,
    privacyHeight: 1.5,
    maxHeight: 3,
    evergreen: true,
    frostZone: "6b–8a",
    pruningsPerYear: 2,
    description: "Niski, elegancki, idealny do formowania. Wolny wzrost.",
  },
  zywotnik: {
    name: "Żywotnik wschodni",
    latinName: "Platycladus orientalis",
    spacing: 0.45,
    growthPerYear: 0.3,
    initialHeight: 0.5,
    pricePerSapling: 20,
    privacyHeight: 1.8,
    maxHeight: 5,
    evergreen: true,
    frostZone: "6b–8a",
    pruningsPerYear: 1,
    description: "Podobny do tui, odporniejszy na choroby. Gęsty, zimozielony.",
  },
  kalina: {
    name: "Kalina koralowa",
    latinName: "Viburnum opulus",
    spacing: 0.5,
    growthPerYear: 0.3,
    initialHeight: 0.5,
    pricePerSapling: 14,
    privacyHeight: 1.8,
    maxHeight: 4,
    evergreen: false,
    frostZone: "6a–8a",
    pruningsPerYear: 1,
    description: "Kwitnie biało wiosną, czerwone owoce jesienią. Odporny, polski gatunek.",
  },
  deren: {
    name: "Deren świdwy",
    latinName: "Cornus sanguinea",
    spacing: 0.4,
    growthPerYear: 0.35,
    initialHeight: 0.5,
    pricePerSapling: 11,
    privacyHeight: 1.8,
    maxHeight: 3,
    evergreen: false,
    frostZone: "6a–8a",
    pruningsPerYear: 1,
    description: "Czerwone zimowe pędy, szybki wzrost. Dobry na żywopłot liściasty.",
  },
  zurawina: {
    name: "Pęcherznica kalinolistna",
    latinName: "Physocarpus opulifolius",
    spacing: 0.45,
    growthPerYear: 0.25,
    initialHeight: 0.4,
    pricePerSapling: 16,
    privacyHeight: 1.8,
    maxHeight: 2.5,
    evergreen: false,
    frostZone: "6a–8a",
    pruningsPerYear: 2,
    description: "Kolorowe liście (czerwone, fioletowe odmiany). Średni wzrost.",
  },
};

export function calculateHedge(input: HedgeInput): HedgeResult {
  const core = calculateHedgeCore(input);
  const comparisons = buildComparisons(input, input.species);
  return { ...core, comparisons };
}

function calculateHedgeCore(
  input: HedgeInput
): Omit<HedgeResult, "comparisons"> {
  const {
    length,
    species,
    density = "normalna",
    rows = 1,
    saplingSize = "srednia",
    targetPrivacyHeight = 1.8,
  } = input;

  const data = SPECIES[species];
  const sizeFactor = SIZE_FACTOR[saplingSize];

  const spacing =
    density === "gesta" ? data.spacing * 0.75 : data.spacing;
  const saplingsPerRow = Math.ceil(length / spacing) + 1;
  const saplingCount = saplingsPerRow * rows;

  const pricePerSapling = Math.round(data.pricePerSapling * sizeFactor.price);
  const plantCost = saplingCount * pricePerSapling;

  const initialHeight = sizeFactor.height;
  const growthRate = data.growthPerYear;

  const privacyYears = Math.max(
    1,
    Math.ceil((targetPrivacyHeight - initialHeight) / growthRate)
  );

  const yearPoints = [0, 1, 2, 3, 5, 7, 10];
  const milestones: GrowthMilestone[] = yearPoints.map((years) => {
    const height =
      Math.round(
        Math.min(initialHeight + growthRate * years, data.maxHeight) * 10
      ) / 10;
    const privacyPercent = Math.min(
      100,
      Math.round((height / targetPrivacyHeight) * 100)
    );
    return { years, height, privacyPercent };
  });

  const privacyMilestones: PrivacyMilestone[] = [1.0, 1.5, targetPrivacyHeight, 2.0]
    .filter((h) => h <= data.maxHeight + 0.5)
    .map((h) => ({
      height: h,
      years: Math.max(1, Math.ceil((h - initialHeight) / growthRate)),
      label: h === targetPrivacyHeight ? "pełna prywatność" : `${h} m`,
    }));

  const soilCost = Math.round(length * 15);
  const mulchCost = Math.round(length * 8);
  const fertilizerCost = Math.round(saplingCount * 3);
  const totalCost = plantCost + soilCost + mulchCost + fertilizerCost;

  const costBreakdown: CostBreakdown[] = [
    {
      item: "Sadzonki",
      amount: `${saplingCount} szt. × ${pricePerSapling} PLN`,
      cost: plantCost,
    },
    {
      item: "Ziemia kompostowa",
      amount: `${length} mb`,
      cost: soilCost,
    },
    { item: "Mulcz", amount: `${length} mb`, cost: mulchCost },
    {
      item: "Nawóz startowy",
      amount: `${saplingCount} szt.`,
      cost: fertilizerCost,
    },
  ];

  const pruningSchedule = buildPruningSchedule(data.pruningsPerYear, data.evergreen);
  const maintenanceYearly = Math.round(saplingCount * 2 + length * 5);

  const tips = buildTips(species, data, spacing, rows, data.evergreen);

  const formula = `⌈${length} m ÷ ${(spacing * 100).toFixed(0)} cm⌉ + 1 = ${saplingsPerRow} szt./rząd × ${rows} rząd(y) = ${saplingCount} sadzonek`;

  return {
    saplingCount,
    saplingsPerRow,
    totalCost,
    spacing,
    pricePerSapling,
    privacyYears,
    milestones,
    privacyMilestones,
    pruningSchedule,
    costBreakdown,
    maintenanceYearly,
    speciesName: data.name,
    latinName: data.latinName,
    evergreen: data.evergreen,
    growthPerYear: growthRate,
    maxHeight: data.maxHeight,
    frostZone: data.frostZone,
    tips,
    formula,
  };
}

function buildPruningSchedule(
  pruningsPerYear: number,
  evergreen: boolean
): PruningEntry[] {
  if (pruningsPerYear >= 2) {
    return [
      {
        season: "Wiosna",
        months: "Mar–Kwi",
        action: "Pierwsze formowanie — usuń sucha gałęzie, skróć o 1/3",
      },
      {
        season: "Lato",
        months: "Cze–Lip",
        action: "Drugie cięcie formujące — utrzymaj kształt",
      },
      ...(evergreen
        ? []
        : [
            {
              season: "Jesień",
              months: "Wrz",
              action: "Lekkie cięcie po okresie wegetacji",
            },
          ]),
    ];
  }
  return [
    {
      season: "Lato",
      months: "Lip–Sie",
      action: "Jedno cięcie formujące po przyroście wiosennym",
    },
  ];
}

function buildComparisons(
  input: HedgeInput,
  currentSpecies: HedgeSpecies
): SpeciesComparison[] {
  const allSpecies = Object.keys(SPECIES) as HedgeSpecies[];

  return allSpecies
    .filter((s) => s !== currentSpecies)
    .map((s) => {
      const r = calculateHedgeCore({ ...input, species: s });
      const data = SPECIES[s];
      let score = 50;
      if (r.privacyYears <= 4) score += 15;
      if (r.totalCost < 500) score += 10;
      if (data.evergreen) score += 10;
      if (data.growthPerYear >= 0.3) score += 10;
      return {
        species: s,
        name: data.name,
        matchScore: Math.min(100, score),
        saplingCount: r.saplingCount,
        totalCost: r.totalCost,
        privacyYears: r.privacyYears,
        evergreen: data.evergreen,
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 4);
}

function buildTips(
  species: HedgeSpecies,
  data: SpeciesInfo,
  spacing: number,
  rows: HedgeRows,
  evergreen: boolean
): string[] {
  const tips: string[] = [
    `Sadź co ${(spacing * 100).toFixed(0)} cm${rows === 2 ? " w dwóch rzędach (szachownica)" : ""} dla gęstego żywopłotu.`,
    `${data.name} rośnie ok. ${(data.growthPerYear * 100).toFixed(0)} cm rocznie — max ${data.maxHeight} m.`,
    evergreen
      ? "Zimozielony — pełna prywatność przez cały rok."
      : "Liściasty — zimą przez liście prześwituje światło.",
  ];

  if (species === "bambus")
    tips.push("Bambus: obowiązkowa bariera korzeniowa głęboka na 60 cm.");
  if (species === "cis")
    tips.push("Cis jest trujący — nie sadź przy placach zabaw.");
  if (species === "laurowisnia")
    tips.push("Laurowiśnia: chron przed mrozem w pierwszych latach na wietrze.");
  if (species === "bukszpan")
    tips.push("Bukszpan: idealny do niskich żywopłotów do 1,5 m.");

  tips.push("Pierwsze 2 lata podlewaj regularnie — korzenie się umacniają.");
  return tips;
}

export const HEDGE_SPECIES_OPTIONS: {
  value: HedgeSpecies;
  label: string;
  hint: string;
}[] = (Object.keys(SPECIES) as HedgeSpecies[]).map((key) => ({
  value: key,
  label: SPECIES[key].name,
  hint: `${SPECIES[key].evergreen ? "Zimozielony" : "Liściasty"} · ${(SPECIES[key].growthPerYear * 100).toFixed(0)} cm/rok`,
}));

export const DENSITY_OPTIONS: { value: HedgeDensity; label: string }[] = [
  { value: "normalna", label: "Normalna gęstość" },
  { value: "gesta", label: "Gęsta (sadzę bliżej)" },
];

export const ROWS_OPTIONS: { value: HedgeRows; label: string }[] = [
  { value: 1, label: "Jeden rząd" },
  { value: 2, label: "Dwa rzędy (szybsza prywatność)" },
];

export const SAPLING_SIZE_OPTIONS: { value: SaplingSize; label: string }[] = [
  { value: "mala", label: "Mała (30–40 cm) — taniej" },
  { value: "srednia", label: "Średnia (60–80 cm)" },
  { value: "duza", label: "Duża (100–120 cm) — szybciej rośnie" },
];

export const MAIN_HEDGE_FAQ = [
  {
    question: "Ile sadzonek na 10 metrów żywopłotu?",
    answer:
      "Zależy od gatunku. Grab (co 30 cm): 35 szt. Laurowiśnia (co 50 cm): 21 szt. Ligustr (co 35 cm): 30 szt. Kalkulator liczy dokładnie dla każdego gatunku.",
  },
  {
    question: "Jak daleko sadzić żywopłot?",
    answer:
      "Grab i buk: co 25–30 cm. Ligustr: co 30–35 cm. Laurowiśnia: co 40–50 cm. Bambus: co 50–60 cm. Im gęściej sadzisz, tym szybciej uzyskasz pełny żywopłot.",
  },
  {
    question: "Kiedy żywopłot zapewni pełną prywatność?",
    answer:
      "Przy docelowej wysokości 180 cm: ligustr i bambus 3–4 lata, grab i laurowiśnia 4–5 lat, buk 5–6 lat, cis 6–8 lat. Duże sadzonki skracają czas o 1–2 lata.",
  },
  {
    question: "Ile kosztuje żywopłot na 20 metrów?",
    answer:
      "Grab: ok. 500–800 PLN (sadzonki + ziemia). Laurowiśnia: 700–1200 PLN. Cis: 1000–1800 PLN. Ceny zależą od wielkości sadzonek i gęstości sadzenia.",
  },
  {
    question: "Jaki żywopłot rośnie najszybciej?",
    answer:
      "Bambus (50 cm/rok) i ligustr (35 cm/rok). Najszybsze zimozielone: laurowiśnia (40 cm/rok). Najszybszy liściasty do prywatności: ligustr.",
  },
  {
    question: "Kiedy sadzić żywopłot?",
    answer:
      "Najlepiej jesienią (październik–listopad) lub wczesną wiosną (marzec–kwiecień). Unikaj sadzenia w upały i mrozy.",
  },
];

export function getSpeciesName(species: HedgeSpecies): string {
  return SPECIES[species].name;
}

export function getSpeciesInfo(species: HedgeSpecies): SpeciesInfo {
  return SPECIES[species];
}
