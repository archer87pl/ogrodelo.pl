export type GrowthSpecies =
  | "grab"
  | "tui"
  | "laurowisnia"
  | "bambus"
  | "wierzba"
  | "brzoza"
  | "cis"
  | "ostrokrzew"
  | "bukszpan"
  | "ligustr"
  | "berberys"
  | "zywotnik";

export type SaplingSize = "mala" | "srednia" | "duza";

export interface GrowthInput {
  species: GrowthSpecies;
  saplingSize?: SaplingSize;
  targetHeight?: number;
  currentAge?: number;
}

export interface GrowthMilestone {
  years: number;
  height: number;
  crownWidth?: number;
}

export interface HeightMilestone {
  height: number;
  years: number;
  label: string;
}

export interface PruningEntry {
  season: string;
  months: string;
  action: string;
}

export interface SpeciesComparison {
  species: GrowthSpecies;
  name: string;
  growthPerYear: number;
  heightAt5Years: number;
  heightAt10Years: number;
  evergreen: boolean;
}

export interface GrowthResult {
  speciesName: string;
  latinName: string;
  milestones: GrowthMilestone[];
  yearlyHeights: GrowthMilestone[];
  heightMilestones: HeightMilestone[];
  pruningsPerYear: number;
  pruningSchedule: PruningEntry[];
  maxHeight: number;
  growthPerYear: number;
  evergreen: boolean;
  frostZone: string;
  yearsToTarget: number;
  yearsToMax: number;
  crownWidthAt10: number;
  comparisons: SpeciesComparison[];
  tips: string[];
  formula: string;
}

export interface SpeciesGrowth {
  name: string;
  latinName: string;
  growthPerYear: number;
  initialHeight: number;
  maxHeight: number;
  maxCrownWidth: number;
  pruningsPerYear: number;
  evergreen: boolean;
  frostZone: string;
  description: string;
  hedgeSuitable: boolean;
}

const SIZE_FACTOR: Record<SaplingSize, number> = {
  mala: 0.35,
  srednia: 0.6,
  duza: 0.95,
};

export const SPECIES: Record<GrowthSpecies, SpeciesGrowth> = {
  grab: {
    name: "Grab",
    latinName: "Carpinus betulus",
    growthPerYear: 0.3,
    initialHeight: 0.5,
    maxHeight: 8,
    maxCrownWidth: 4,
    pruningsPerYear: 2,
    evergreen: false,
    frostZone: "6a–8a",
    description: "Polski klasyk na żywopłot. Liście brązowieją zimą na gałęziach.",
    hedgeSuitable: true,
  },
  tui: {
    name: "Tuja",
    latinName: "Thuja occidentalis",
    growthPerYear: 0.35,
    initialHeight: 0.4,
    maxHeight: 6,
    maxCrownWidth: 2,
    pruningsPerYear: 1,
    evergreen: true,
    frostZone: "6a–8a",
    description: "Popularna, ale podatna na chorobę grzybową. Rozważ zamienniki.",
    hedgeSuitable: true,
  },
  laurowisnia: {
    name: "Laurowiśnia",
    latinName: "Prunus laurocerasus",
    growthPerYear: 0.4,
    initialHeight: 0.3,
    maxHeight: 5,
    maxCrownWidth: 3,
    pruningsPerYear: 2,
    evergreen: true,
    frostZone: "6b–8a",
    description: "Szybki zimozielony żywopłot. Lubi wilgotną glebę.",
    hedgeSuitable: true,
  },
  bambus: {
    name: "Bambus",
    latinName: "Phyllostachys",
    growthPerYear: 0.6,
    initialHeight: 0.5,
    maxHeight: 4,
    maxCrownWidth: 2,
    pruningsPerYear: 1,
    evergreen: true,
    frostZone: "7a–8a",
    description: "Najszybszy wzrost w pierwszych latach. Wymaga barier korzeniowych.",
    hedgeSuitable: true,
  },
  wierzba: {
    name: "Wierzba",
    latinName: "Salix",
    growthPerYear: 0.8,
    initialHeight: 0.6,
    maxHeight: 12,
    maxCrownWidth: 8,
    pruningsPerYear: 2,
    evergreen: false,
    frostZone: "6a–8a",
    description: "Rekordzista wzrostu — do 80 cm rocznie. Wymaga przestrzeni.",
    hedgeSuitable: false,
  },
  brzoza: {
    name: "Brzoza",
    latinName: "Betula pendula",
    growthPerYear: 0.5,
    initialHeight: 0.8,
    maxHeight: 15,
    maxCrownWidth: 6,
    pruningsPerYear: 1,
    evergreen: false,
    frostZone: "6a–8a",
    description: "Szybko rosnące drzewo ozdobne z charakterystyczną korą.",
    hedgeSuitable: false,
  },
  cis: {
    name: "Cis",
    latinName: "Taxus baccata",
    growthPerYear: 0.2,
    initialHeight: 0.5,
    maxHeight: 10,
    maxCrownWidth: 4,
    pruningsPerYear: 1,
    evergreen: true,
    frostZone: "6a–8a",
    description: "Wolny, ale wiecznie zielony. Żyje setki lat. Trujący.",
    hedgeSuitable: true,
  },
  ostrokrzew: {
    name: "Ostrokrzew",
    latinName: "Ilex aquifolium",
    growthPerYear: 0.25,
    initialHeight: 0.5,
    maxHeight: 8,
    maxCrownWidth: 3,
    pruningsPerYear: 1,
    evergreen: true,
    frostZone: "6a–8a",
    description: "Zdrowy zamiennik tui. Kolczasty, z jadalnymi owocami.",
    hedgeSuitable: true,
  },
  bukszpan: {
    name: "Bukszpan",
    latinName: "Buxus sempervirens",
    growthPerYear: 0.1,
    initialHeight: 0.3,
    maxHeight: 3,
    maxCrownWidth: 1.5,
    pruningsPerYear: 2,
    evergreen: true,
    frostZone: "6b–8a",
    description: "Wolny wzrost, idealny do niskich form. Wymaga regularnego cięcia.",
    hedgeSuitable: true,
  },
  ligustr: {
    name: "Ligustr",
    latinName: "Ligustrum vulgare",
    growthPerYear: 0.35,
    initialHeight: 0.4,
    maxHeight: 4,
    maxCrownWidth: 2,
    pruningsPerYear: 2,
    evergreen: false,
    frostZone: "6a–8a",
    description: "Szybki, tani żywopłot liściasty. Białe kwiaty latem.",
    hedgeSuitable: true,
  },
  berberys: {
    name: "Berberys Thunberga",
    latinName: "Berberis thunbergii",
    growthPerYear: 0.2,
    initialHeight: 0.3,
    maxHeight: 1.5,
    maxCrownWidth: 1.2,
    pruningsPerYear: 1,
    evergreen: false,
    frostZone: "6a–8a",
    description: "Niski, kolczasty krzew. Kolorowe liście jesienią.",
    hedgeSuitable: true,
  },
  zywotnik: {
    name: "Żywotnik wschodni",
    latinName: "Platycladus orientalis",
    growthPerYear: 0.3,
    initialHeight: 0.5,
    maxHeight: 5,
    maxCrownWidth: 2,
    pruningsPerYear: 1,
    evergreen: true,
    frostZone: "6b–8a",
    description: "Odporniejszy od tui. Gęsty, zimozielony.",
    hedgeSuitable: true,
  },
};

function heightAtYear(
  initial: number,
  growth: number,
  max: number,
  years: number
): number {
  return Math.round(Math.min(initial + growth * years, max) * 10) / 10;
}

function crownAtHeight(height: number, maxHeight: number, maxCrown: number): number {
  return Math.round(Math.min((height / maxHeight) * maxCrown, maxCrown) * 10) / 10;
}

export function calculateGrowth(input: GrowthInput): GrowthResult {
  const {
    species,
    saplingSize = "srednia",
    targetHeight = 2.0,
    currentAge = 0,
  } = input;

  const data = SPECIES[species];
  const initialHeight = SIZE_FACTOR[saplingSize];
  const growth = data.growthPerYear;

  const milestoneYears = [0, 1, 2, 3, 5, 7, 10, 15];
  const milestones: GrowthMilestone[] = milestoneYears.map((years) => {
    const totalYears = years + currentAge;
    const height = heightAtYear(initialHeight, growth, data.maxHeight, totalYears);
    return {
      years,
      height,
      crownWidth: crownAtHeight(height, data.maxHeight, data.maxCrownWidth),
    };
  });

  const yearlyHeights: GrowthMilestone[] = Array.from({ length: 16 }, (_, y) => {
    const totalYears = y + currentAge;
    const height = heightAtYear(initialHeight, growth, data.maxHeight, totalYears);
    return { years: y, height, crownWidth: crownAtHeight(height, data.maxHeight, data.maxCrownWidth) };
  });

  const yearsToTarget = Math.max(
    0,
    Math.ceil((Math.min(targetHeight, data.maxHeight) - initialHeight) / growth) - currentAge
  );

  const yearsToMax = Math.ceil((data.maxHeight - initialHeight) / growth) - currentAge;

  const heightMilestones: HeightMilestone[] = [1.0, 1.5, 2.0, 2.5, 3.0]
    .filter((h) => h <= data.maxHeight)
    .map((h) => ({
      height: h,
      years: Math.max(0, Math.ceil((h - initialHeight) / growth) - currentAge),
      label: h === targetHeight ? "twój cel" : `${h} m`,
    }));

  const pruningSchedule = buildPruningSchedule(data.pruningsPerYear, data.evergreen);
  const comparisons = buildComparisons(species, saplingSize, currentAge);
  const tips = buildTips(species, data, yearsToTarget, targetHeight);

  const formula = `${initialHeight} m + (${(growth * 100).toFixed(0)} cm × lata), max ${data.maxHeight} m`;

  return {
    speciesName: data.name,
    latinName: data.latinName,
    milestones,
    yearlyHeights,
    heightMilestones,
    pruningsPerYear: data.pruningsPerYear,
    pruningSchedule,
    maxHeight: data.maxHeight,
    growthPerYear: growth,
    evergreen: data.evergreen,
    frostZone: data.frostZone,
    yearsToTarget,
    yearsToMax: Math.max(0, yearsToMax),
    crownWidthAt10: milestones.find((m) => m.years === 10)?.crownWidth ?? 0,
    comparisons,
    tips,
    formula,
  };
}

function buildPruningSchedule(
  count: number,
  evergreen: boolean
): PruningEntry[] {
  if (count >= 2) {
    return [
      { season: "Wiosna", months: "Mar–Kwi", action: "Formowanie — usuń martwe pędy, skróć o 1/3" },
      { season: "Lato", months: "Cze–Lip", action: "Cięcie formujące po przyroście wiosennym" },
      ...(!evergreen
        ? [{ season: "Jesień", months: "Wrz", action: "Lekkie cięcie sanitarne" }]
        : []),
    ];
  }
  return [
    { season: "Lato", months: "Lip–Sie", action: "Jedno cięcie formujące rocznie" },
  ];
}

function buildComparisons(
  current: GrowthSpecies,
  saplingSize: SaplingSize,
  currentAge: number
): SpeciesComparison[] {
  return (Object.keys(SPECIES) as GrowthSpecies[])
    .filter((s) => s !== current)
    .map((s) => {
      const r = calculateGrowthCore({ species: s, saplingSize, currentAge });
      const d = SPECIES[s];
      const h5 = r.milestones.find((m) => m.years === 5)?.height ?? 0;
      const h10 = r.milestones.find((m) => m.years === 10)?.height ?? 0;
      return {
        species: s,
        name: d.name,
        growthPerYear: d.growthPerYear,
        heightAt5Years: h5,
        heightAt10Years: h10,
        evergreen: d.evergreen,
      };
    })
    .sort((a, b) => b.growthPerYear - a.growthPerYear)
    .slice(0, 5);
}

function calculateGrowthCore(input: GrowthInput): Pick<GrowthResult, "milestones"> {
  const data = SPECIES[input.species];
  const initialHeight = SIZE_FACTOR[input.saplingSize ?? "srednia"];
  const years = [0, 1, 2, 3, 5, 7, 10, 15];
  return {
    milestones: years.map((y) => ({
      years: y,
      height: heightAtYear(initialHeight, data.growthPerYear, data.maxHeight, y + (input.currentAge ?? 0)),
    })),
  };
}

function buildTips(
  species: GrowthSpecies,
  data: SpeciesGrowth,
  yearsToTarget: number,
  targetHeight: number
): string[] {
  const tips = [
    `${data.name} rośnie ok. ${(data.growthPerYear * 100).toFixed(0)} cm rocznie — maks. ${data.maxHeight} m.`,
    data.evergreen
      ? "Zimozielona — zachowuje okrywę przez cały rok."
      : "Liściasta — zimą bez liści, ale szybszy wzrost.",
    `Cel ${targetHeight} m osiągniesz za ok. ${yearsToTarget} lat.`,
  ];
  if (species === "tui")
    tips.push("Tuja: rozważ ostrokrzew lub żywotnik — odporniejsze na choroby.");
  if (species === "wierzba")
    tips.push("Wierzba: silny korzeniowy — nie sadź blisko fundamentów.");
  if (data.hedgeSuitable)
    tips.push("Nadaje się na żywopłot — formuj 2× rocznie dla gęstości.");
  return tips;
}

export const GROWTH_SPECIES_OPTIONS = (
  Object.keys(SPECIES) as GrowthSpecies[]
).map((key) => ({
  value: key,
  label: SPECIES[key].name,
  hint: `${SPECIES[key].evergreen ? "Zimozielony" : "Liściasty"} · ${(SPECIES[key].growthPerYear * 100).toFixed(0)} cm/rok · max ${SPECIES[key].maxHeight} m`,
}));

export const SAPLING_SIZE_OPTIONS: { value: SaplingSize; label: string }[] = [
  { value: "mala", label: "Mała sadzonka (30–40 cm)" },
  { value: "srednia", label: "Średnia sadzonka (60–80 cm)" },
  { value: "duza", label: "Duża sadzonka (100–120 cm)" },
];

export const MAIN_GROWTH_FAQ = [
  {
    question: "Ile rośnie tuja rocznie?",
    answer:
      "Tuja rośnie ok. 30–40 cm rocznie w dobrych warunkach. Po 5 latach osiąga 2–2,5 m, po 10 latach 3,5–4 m. Obecnie wiele odmian pada na chorobę grzybową.",
  },
  {
    question: "Ile rośnie grab na żywopłot?",
    answer:
      "Grab rośnie ok. 25–35 cm rocznie. Z sadzonki 60 cm pełny żywopłot 180 cm uzyskasz w 4–5 lat. Liście brązowieją zimą na gałęziach.",
  },
  {
    question: "Która roślina rośnie najszybciej?",
    answer:
      "Wierzba — do 80 cm rocznie. Wśród żywopłotów: bambus (60 cm) i ligustr (35 cm). Najwolniejszy: bukszpan (10 cm/rok).",
  },
  {
    question: "Kiedy przycinać żywopłot?",
    answer:
      "Dwa razy: wiosną (marzec–kwiecień) i latem (czerwiec–lipiec). Unikaj cięcia w mrozy i upały.",
  },
  {
    question: "Jak wysoka będzie laurowiśnia po 5 latach?",
    answer:
      "Z sadzonki 60 cm: ok. 2,5 m. Laurowiśnia to jeden z najszybszych zimozielonych żywopłotów — ok. 40 cm rocznie.",
  },
  {
    question: "Czy cis rośnie szybko?",
    answer:
      "Nie — cis to ok. 20 cm rocznie. Ale żyje setki lat i tworzy bardzo gęsty, zimozielony żywopłot. Inwestycja długoterminowa.",
  },
];

export function getSpeciesInfo(species: GrowthSpecies): SpeciesGrowth {
  return SPECIES[species];
}
