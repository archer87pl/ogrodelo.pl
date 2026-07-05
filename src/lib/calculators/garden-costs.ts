export type WateringMethod =
  | "reczne-siec"
  | "automatyczne-siec"
  | "deszczowka-siec";

export type MowingMethod = "spalinowa" | "elektryczna" | "robot" | "firma";

export interface GardenCostsInput {
  gardenArea: number;
  lawnPercent: number;
  watering: WateringMethod;
  mowing: MowingMethod;
  fertilizingPerYear: number;
  plantProtection: boolean;
}

export interface CostBreakdownRow {
  category: string;
  cost: number;
  share: number;
}

export interface SavingsSuggestion {
  text: string;
  savings: number;
  href: string;
  linkLabel: string;
}

export interface GardenCostsResult {
  totalCost: number;
  costPerM2: number;
  breakdown: CostBreakdownRow[];
  savings: SavingsSuggestion[];
  tips: string[];
}

// Realistyczne stawki 2026 (PLN)
const WATER_PRICE_PER_M3 = 12;
const LAWN_WATER_LITERS_PER_M2: Record<WateringMethod, number> = {
  "reczne-siec": 450, // wąż / zraszacz ręczny, pełny sezon
  "automatyczne-siec": 380, // sterownik podlewa precyzyjniej
  "deszczowka-siec": 450, // to samo zużycie, ale 40% z darmowej deszczówki
};
const RAINWATER_REDUCTION = 0.4;

const FERTILIZER_KG_PER_100M2 = 3; // na jeden zabieg
const FERTILIZER_PRICE_PER_KG = 8;

const FUEL_COST_PER_M2_YEAR = 0.15; // kosiarka spalinowa, ~25 koszeń/rok
const ELECTRIC_COST_PER_M2_YEAR = 0.06; // kosiarka elektryczna, ~25 koszeń/rok
const ROBOT_MIN_COST = 50; // prąd, mały trawnik
const ROBOT_MAX_COST = 100; // prąd, duży trawnik
const COMPANY_RATE_PER_100M2 = 20; // PLN za jedno koszenie (15–25)
const COMPANY_MOWINGS_PER_YEAR = 15;
const COMPANY_MIN_PER_VISIT = 80;

const PROTECTION_COST_PER_M2_YEAR = 1;

function robotCost(lawnArea: number): number {
  return Math.round(
    Math.min(ROBOT_MAX_COST, Math.max(ROBOT_MIN_COST, 50 + lawnArea * 0.05))
  );
}

function mowingCost(method: MowingMethod, lawnArea: number): number {
  if (lawnArea <= 0) return 0;
  switch (method) {
    case "spalinowa":
      return Math.round(lawnArea * FUEL_COST_PER_M2_YEAR);
    case "elektryczna":
      return Math.round(lawnArea * ELECTRIC_COST_PER_M2_YEAR);
    case "robot":
      return robotCost(lawnArea);
    case "firma": {
      const perVisit = Math.max(
        (lawnArea / 100) * COMPANY_RATE_PER_100M2,
        COMPANY_MIN_PER_VISIT
      );
      return Math.round(perVisit * COMPANY_MOWINGS_PER_YEAR);
    }
  }
}

function waterCost(method: WateringMethod, lawnArea: number): number {
  if (lawnArea <= 0) return 0;
  const cubicMeters = (lawnArea * LAWN_WATER_LITERS_PER_M2[method]) / 1000;
  const reduction = method === "deszczowka-siec" ? 1 - RAINWATER_REDUCTION : 1;
  return Math.round(cubicMeters * WATER_PRICE_PER_M3 * reduction);
}

export function calculateGardenCosts(
  input: GardenCostsInput
): GardenCostsResult {
  const gardenArea = Math.max(0, input.gardenArea);
  const lawnPercent = Math.min(100, Math.max(0, input.lawnPercent));
  const fertilizingPerYear = Math.min(
    5,
    Math.max(0, Math.round(input.fertilizingPerYear))
  );
  const lawnArea = (gardenArea * lawnPercent) / 100;

  const water = waterCost(input.watering, lawnArea);
  const fertilizer = Math.round(
    (lawnArea / 100) *
      FERTILIZER_KG_PER_100M2 *
      FERTILIZER_PRICE_PER_KG *
      fertilizingPerYear
  );
  const mowing = mowingCost(input.mowing, lawnArea);
  const protection = input.plantProtection
    ? Math.round(gardenArea * PROTECTION_COST_PER_M2_YEAR)
    : 0;

  const totalCost = water + fertilizer + mowing + protection;
  const share = (cost: number) =>
    totalCost > 0 ? Math.round((cost / totalCost) * 100) : 0;

  const breakdown: CostBreakdownRow[] = [
    { category: "Woda", cost: water, share: share(water) },
    { category: "Nawozy", cost: fertilizer, share: share(fertilizer) },
    { category: "Koszenie", cost: mowing, share: share(mowing) },
    {
      category: "Środki ochrony i inne",
      cost: protection,
      share: share(protection),
    },
  ];

  // Propozycje oszczędności — policzone z danych użytkownika
  const candidates: SavingsSuggestion[] = [];

  if (input.watering !== "deszczowka-siec" && water > 0) {
    candidates.push({
      text: "Zbiornik na deszczówkę (pokrywa ok. 40% podlewania)",
      savings: Math.round(water * RAINWATER_REDUCTION),
      href: "/kalkulator-deszczowki",
      linkLabel: "Dobierz zbiornik",
    });
  }

  if (lawnArea >= 50) {
    const meadowShare = 0.3;
    const meadowSavings = Math.round(
      (water + fertilizer + mowing) * meadowShare
    );
    if (meadowSavings > 0) {
      candidates.push({
        text: `Zamiana 30% trawnika (${Math.round(lawnArea * meadowShare)} m²) na łąkę kwietną`,
        savings: meadowSavings,
        href: "/kalkulator-laki-kwietnej",
        linkLabel: "Zaplanuj łąkę",
      });
    }
  }

  if (input.mowing === "firma" && lawnArea > 0) {
    candidates.push({
      text: "Robot koszący zamiast firmy",
      savings: mowing - robotCost(lawnArea),
      href: "/kalkulator-robota-koszacego",
      linkLabel: "Dobierz robota",
    });
  } else if (input.mowing === "spalinowa" && lawnArea > 0) {
    const diff = mowing - robotCost(lawnArea);
    if (diff > 0) {
      candidates.push({
        text: "Robot koszący zamiast kosiarki spalinowej",
        savings: diff,
        href: "/kalkulator-robota-koszacego",
        linkLabel: "Dobierz robota",
      });
    }
  }

  if (fertilizingPerYear > 2 && fertilizer > 0) {
    candidates.push({
      text: `Ograniczenie nawożenia z ${fertilizingPerYear} do 2 zabiegów rocznie`,
      savings: Math.round((fertilizer / fertilizingPerYear) * (fertilizingPerYear - 2)),
      href: "/kalkulator-nawozenia",
      linkLabel: "Policz dawki",
    });
  }

  if (candidates.length < 3 && water > 0) {
    candidates.push({
      text: "Podlewanie wcześnie rano zamiast w upale (ok. 20% mniej parowania)",
      savings: Math.round(water * 0.2),
      href: "/kalkulator-nawadniania",
      linkLabel: "Zoptymalizuj podlewanie",
    });
  }

  const savings = candidates
    .filter((s) => s.savings > 0)
    .sort((a, b) => b.savings - a.savings)
    .slice(0, 4);

  const tips = [
    `Woda z sieci kosztuje ok. ${WATER_PRICE_PER_M3} PLN/m³ — trawnik potrzebuje ~450 l/m² na sezon, więc każde 100 m² trawnika to nawet ${Math.round((100 * 450 * WATER_PRICE_PER_M3) / 1000)} PLN rocznie za samo podlewanie.`,
    "Koszenie z mulczowaniem zostawia rozdrobnioną trawę na trawniku i zwraca część azotu — możesz ograniczyć nawożenie o 1 zabieg rocznie.",
    "Podnieś wysokość koszenia do 5–6 cm latem: dłuższa trawa lepiej zatrzymuje wilgoć i zmniejsza zużycie wody nawet o 20%.",
  ];

  return {
    totalCost,
    costPerM2: gardenArea > 0 ? Math.round((totalCost / gardenArea) * 100) / 100 : 0,
    breakdown,
    savings,
    tips,
  };
}

export const GARDEN_COSTS_FAQ = [
  {
    question: "Ile kosztuje utrzymanie ogrodu 500 m² rocznie?",
    answer:
      "Przy typowym ogrodzie 500 m² z 60% trawnika (300 m²), ręcznym podlewaniu wodą z sieci i samodzielnym koszeniu kosiarką spalinową roczne koszty to ok. 1620 PLN za wodę (300 m² × 450 l × 12 PLN/m³), ok. 145 PLN za nawozy przy 2 zabiegach, ok. 45 PLN za paliwo i ok. 500 PLN za środki ochrony i drobiazgi — razem ok. 2300 PLN, czyli ~4,6 PLN/m².",
  },
  {
    question: "Co pochłania najwięcej pieniędzy w ogrodzie?",
    answer:
      "Zwykle woda. Trawnik podlewany z sieci potrzebuje ok. 450 l/m² na sezon, co przy cenie ok. 12 PLN/m³ daje ~5,4 PLN/m² rocznie — na 300 m² trawnika to ponad 1600 PLN. Drugą pozycją bywa koszenie przez firmę: 15–25 PLN za 100 m² na jedno koszenie × ok. 15 koszeń to 3 PLN/m² rocznie.",
  },
  {
    question: "Ile można oszczędzić dzięki deszczówce?",
    answer:
      "Zbiornik na deszczówkę pokrywa realnie ok. 40% zapotrzebowania trawnika na wodę. Przy 300 m² trawnika i rachunku za podlewanie ok. 1620 PLN rocznie oszczędzasz ok. 650 PLN każdego roku — zbiornik 2000–3000 l za 2000–2800 PLN zwraca się w 3–4 sezony.",
  },
  {
    question: "Czy robot koszący się opłaca w porównaniu z firmą?",
    answer:
      "Tak, i to szybko. Firma kosi za 15–25 PLN/100 m², co przy 300 m² trawnika i 15 koszeniach daje 900–1200 PLN rocznie. Robot koszący zużywa prąd za 50–100 PLN rocznie, więc oszczędzasz ok. 800–1100 PLN/rok — robot za 3000–4000 PLN zwraca się w 3–4 lata.",
  },
  {
    question: "Ile kosztuje nawożenie trawnika?",
    answer:
      "Na jeden zabieg potrzeba ok. 3 kg nawozu na 100 m², a dobry nawóz do trawnika kosztuje ok. 8 PLN/kg. Jeden zabieg na 300 m² trawnika to więc ok. 72 PLN. Przy zalecanych 2–3 zabiegach rocznie płacisz 145–215 PLN; więcej niż 3 zabiegi rzadko ma sens agrotechniczny.",
  },
];
