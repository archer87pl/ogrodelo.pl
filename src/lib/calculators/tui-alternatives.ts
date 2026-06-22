export type ClimateZone = "6a" | "6b" | "7a" | "7b" | "8a";
export type GrowthSpeed = "wolny" | "sredni" | "szybki";

export interface TuiAlternativeInput {
  zone: ClimateZone;
  targetHeight: number;
  evergreen: boolean;
  growthSpeed: GrowthSpeed;
}

export interface PlantAlternative {
  name: string;
  latinName: string;
  maxHeight: number;
  growthPerYear: number;
  evergreen: boolean;
  zones: ClimateZone[];
  pros: string[];
  cons: string[];
  matchScore: number;
}

export interface TuiAlternativeResult {
  alternatives: PlantAlternative[];
  tips: string[];
}

const PLANTS: Omit<PlantAlternative, "matchScore">[] = [
  {
    name: "Ostrokrzew kolczasty",
    latinName: "Ilex aquifolium",
    maxHeight: 8,
    growthPerYear: 0.25,
    evergreen: true,
    zones: ["6a", "6b", "7a", "7b", "8a"],
    pros: ["Odporny na mróz", "Jadalne owoce", "Dekoracyjny"],
    cons: ["Kolce", "Wolniejszy wzrost"],
  },
  {
    name: "Żywotnik wschodni",
    latinName: "Thuja orientalis",
    maxHeight: 5,
    growthPerYear: 0.3,
    evergreen: true,
    zones: ["6b", "7a", "7b", "8a"],
    pros: ["Podobny wygląd do tui", "Odporniejszy na choroby", "Gęsty"],
    cons: ["Mniej odporny na mrozy w strefie 6a"],
  },
  {
    name: "Berberys Thunberga",
    latinName: "Berberis thunbergii",
    maxHeight: 1.5,
    growthPerYear: 0.2,
    evergreen: false,
    zones: ["6a", "6b", "7a", "7b", "8a"],
    pros: ["Bardzo odporny", "Kolorowe liście jesienią", "Niski koszt"],
    cons: ["Kolczasty", "Nie zimozielony"],
  },
  {
    name: "Bukszpan",
    latinName: "Buxus sempervirens",
    maxHeight: 3,
    growthPerYear: 0.1,
    evergreen: true,
    zones: ["6b", "7a", "7b", "8a"],
    pros: ["Klasyczny wygląd", "Łatwe formowanie", "Elegancki"],
    cons: ["Wolny wzrost", "Wymaga regularnego cięcia"],
  },
  {
    name: "Ligustr pospolity",
    latinName: "Ligustrum vulgare",
    maxHeight: 4,
    growthPerYear: 0.35,
    evergreen: false,
    zones: ["6a", "6b", "7a", "7b", "8a"],
    pros: ["Szybki wzrost", "Tani", "Gęsty żywopłot"],
    cons: ["Liściasty (nie zimozielony)", "Inwazyjny w niektórych regionach"],
  },
  {
    name: "Mahonia pospolita",
    latinName: "Mahonia aquifolium",
    maxHeight: 1.5,
    growthPerYear: 0.15,
    evergreen: true,
    zones: ["6a", "6b", "7a", "7b", "8a"],
    pros: ["Zimozielony", "Kwiaty wczesną wiosną", "Niski"],
    cons: ["Niska maksymalna wysokość"],
  },
  {
    name: "Cis pospolity",
    latinName: "Taxus baccata",
    maxHeight: 10,
    growthPerYear: 0.2,
    evergreen: true,
    zones: ["6a", "6b", "7a", "7b", "8a"],
    pros: ["Bardzo odporny", "Długowieczny", "Gęsty"],
    cons: ["Wolny wzrost", "Trujący", "Droższy"],
  },
  {
    name: "Grab pospolity",
    latinName: "Carpinus betulus",
    maxHeight: 8,
    growthPerYear: 0.3,
    evergreen: false,
    zones: ["6a", "6b", "7a", "7b", "8a"],
    pros: ["Polski gatunek", "Tani", "Gęsty żywopłot"],
    cons: ["Liściasty", "Opada jesienią"],
  },
  {
    name: "Hortensja bukietowa",
    latinName: "Hydrangea paniculata",
    maxHeight: 2.5,
    growthPerYear: 0.3,
    evergreen: false,
    zones: ["6a", "6b", "7a", "7b", "8a"],
    pros: ["Piękne kwiaty", "Łatwa pielęgnacja", "Dekoracyjna"],
    cons: ["Nie tworzy żywopłotu", "Zimuje bez liści"],
  },
  {
    name: "Pęcherznica kalinolistna",
    latinName: "Physocarpus opulifolius",
    maxHeight: 2,
    growthPerYear: 0.25,
    evergreen: false,
    zones: ["6a", "6b", "7a", "7b", "8a"],
    pros: ["Kolorowe liście", "Odporny", "Szybki"],
    cons: ["Nie zimozielony", "Wymaga cięcia"],
  },
];

const GROWTH_SPEED_RANGE: Record<GrowthSpeed, [number, number]> = {
  wolny: [0, 0.2],
  sredni: [0.15, 0.35],
  szybki: [0.3, 1],
};

export function calculateTuiAlternatives(
  input: TuiAlternativeInput
): TuiAlternativeResult {
  const { zone, targetHeight, evergreen, growthSpeed } = input;
  const [minGrowth, maxGrowth] = GROWTH_SPEED_RANGE[growthSpeed];

  const alternatives = PLANTS.map((plant) => {
    let score = 50;

    if (plant.zones.includes(zone)) score += 20;
    else score -= 30;

    if (evergreen && plant.evergreen) score += 15;
    if (!evergreen && !plant.evergreen) score += 10;
    if (evergreen && !plant.evergreen) score -= 20;

    if (plant.maxHeight >= targetHeight) score += 10;
    else score -= 15;

    if (
      plant.growthPerYear >= minGrowth &&
      plant.growthPerYear <= maxGrowth
    )
      score += 10;

    const heightDiff = Math.abs(plant.maxHeight - targetHeight);
    if (heightDiff < 1) score += 10;

    return { ...plant, matchScore: Math.max(0, Math.min(100, score)) };
  })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 6);

  return {
    alternatives,
    tips: [
      "Tuja padają na chorobę grzybową — wybieraj odmiany odporne lub alternatywy.",
      "Sadź różnorodne gatunki — ogród będzie zdrowszy i bardziej odporny.",
      "Sprawdź strefę mrozoodporności na etykiecie sadzonki.",
    ],
  };
}

export const CLIMATE_ZONE_OPTIONS: { value: ClimateZone; label: string }[] = [
  { value: "6a", label: "Strefa 6a (do -23°C)" },
  { value: "6b", label: "Strefa 6b (do -20°C)" },
  { value: "7a", label: "Strefa 7a (do -17°C)" },
  { value: "7b", label: "Strefa 7b (do -15°C)" },
  { value: "8a", label: "Strefa 8a (do -12°C)" },
];

export const GROWTH_SPEED_OPTIONS: { value: GrowthSpeed; label: string }[] = [
  { value: "wolny", label: "Wolny (do 20 cm/rok)" },
  { value: "sredni", label: "Średni (20–35 cm/rok)" },
  { value: "szybki", label: "Szybki (powyżej 35 cm/rok)" },
];
