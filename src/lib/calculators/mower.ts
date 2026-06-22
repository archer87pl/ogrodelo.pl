export type SlopeLevel = "plaski" | "lekki" | "sredni" | "stromy";
export type ObstacleLevel = "brak" | "male" | "srednie" | "duzo";

export interface MowerInput {
  area: number;
  slope: SlopeLevel;
  obstacles: ObstacleLevel;
}

export interface MowerRecommendation {
  name: string;
  brand: string;
  maxArea: number;
  price: number;
  features: string[];
  match: number;
}

export interface MowerResult {
  recommendations: MowerRecommendation[];
  manualCostYearly: number;
  robotCostYearly: number;
  paybackYears: number;
  tips: string[];
}

const MOWERS: MowerRecommendation[] = [
  {
    name: "Automower 105",
    brand: "Husqvarna",
    maxArea: 600,
    price: 4500,
    features: ["GPS", "do 25% nachylenia", "cicha praca"],
    match: 0,
  },
  {
    name: "Robomow RX12u",
    brand: "Robomow",
    maxArea: 200,
    price: 2800,
    features: ["kompaktowy", "łatwy w obsłudze", "niski pobór"],
    match: 0,
  },
  {
    name: "Landroid M500",
    brand: "Worx",
    maxArea: 500,
    price: 3200,
    features: ["WiFi", "app mobilna", "stacja ładowania"],
    match: 0,
  },
  {
    name: "Automower 310 Mark II",
    brand: "Husqvarna",
    maxArea: 1000,
    price: 6500,
    features: ["duży teren", "GPS", "obstacle detection"],
    match: 0,
  },
  {
    name: "iMow 422",
    brand: "STIHL",
    maxArea: 800,
    price: 5500,
    features: ["niemiecka jakość", "cichy", "regulacja wysokości"],
    match: 0,
  },
  {
    name: "Ambrogio L250i Elite",
    brand: "Ambrogio",
    maxArea: 3200,
    price: 12000,
    features: ["duże ogrody", "4G", "AI nawigacja"],
    match: 0,
  },
];

const SLOPE_PENALTY: Record<SlopeLevel, number> = {
  plaski: 0,
  lekki: 0.1,
  sredni: 0.3,
  stromy: 0.5,
};

const OBSTACLE_PENALTY: Record<ObstacleLevel, number> = {
  brak: 0,
  male: 0.05,
  srednie: 0.15,
  duzo: 0.3,
};

export function calculateMower(input: MowerInput): MowerResult {
  const { area, slope, obstacles } = input;

  const effectiveArea =
    area * (1 + SLOPE_PENALTY[slope] + OBSTACLE_PENALTY[obstacles]);

  const scored = MOWERS.map((m) => {
    let match = 100;
    if (m.maxArea < effectiveArea) match -= 40;
    if (m.maxArea > effectiveArea * 3) match -= 20;
    if (slope === "stromy" && m.maxArea < 500) match -= 30;
    if (obstacles === "duzo" && !m.features.some((f) => f.includes("obstacle")))
      match -= 15;
    match = Math.max(0, Math.min(100, match));
    return { ...m, match };
  })
    .sort((a, b) => b.match - a.match)
    .slice(0, 3);

  const manualCostYearly = Math.round(area * 0.5 * 30);
  const avgRobotPrice =
    scored.reduce((s, m) => s + m.price, 0) / scored.length;
  const robotCostYearly = Math.round(avgRobotPrice * 0.02 + 100);
  const paybackYears = Math.round(
    avgRobotPrice / (manualCostYearly - robotCostYearly)
  );

  return {
    recommendations: scored,
    manualCostYearly,
    robotCostYearly,
    paybackYears: Math.max(1, paybackYears),
    tips: [
      "Robot koszący oszczędza ok. 100 godzin rocznie.",
      slope === "stromy"
        ? "Na stromym terenie wybierz model z dobrym trakcjonowaniem."
        : "Na płaskim terenie wystarczy model podstawowy.",
      "Przed zakupem sprawdź, czy producent ma serwis w Polsce.",
    ],
  };
}

export const SLOPE_OPTIONS: { value: SlopeLevel; label: string }[] = [
  { value: "plaski", label: "Płaski (0–5%)" },
  { value: "lekki", label: "Lekki (5–15%)" },
  { value: "sredni", label: "Średni (15–25%)" },
  { value: "stromy", label: "Stromy (>25%)" },
];

export const OBSTACLE_OPTIONS: { value: ObstacleLevel; label: string }[] = [
  { value: "brak", label: "Brak przeszkód" },
  { value: "male", label: "Małe (drzewka, kwietniki)" },
  { value: "srednie", label: "Średnie (klomb, ścieżki)" },
  { value: "duzo", label: "Dużo (labirynt ogrodowy)" },
];
